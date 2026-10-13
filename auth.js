
(() => {
  const $ = (selector) => document.querySelector(selector);

  const status = (message) => {
    const el = $("#accountStatus");
    if (el) el.textContent = message;
  };

  const premium = (message) => {
    const el = $("#premiumStatus");
    if (el) el.textContent = message;
  };

  if (
    !window.supabase ||
    !window.FESS_SUPABASE_URL ||
    !window.FESS_SUPABASE_PUBLISHABLE_KEY ||
    window.FESS_SUPABASE_PUBLISHABLE_KEY.includes("PASTE_YOUR")
  ) {
    status("Please check your Supabase URL and publishable key.");
    premium("Premium purchases are not enabled yet.");
    return;
  }

  const client = window.supabase.createClient(
    window.FESS_SUPABASE_URL,
    window.FESS_SUPABASE_PUBLISHABLE_KEY
  );

  let currentUser = null;

  async function loadQuizHistory() {
    const history = $("#quizHistoryList");
    if (!history || !currentUser) return;

    history.textContent = "Loading quiz history...";

    const { data, error } = await client
      .from("quiz_attempts")
      .select("*")
      .eq("user_id", currentUser.id)
      .order("completed_at", { ascending: false });

    if (error) {
      history.textContent =
        "Could not load quiz history: " + error.message;
      return;
    }

    if (!data || data.length === 0) {
      history.textContent = "No quiz attempts saved yet.";
      return;
    }

    history.replaceChildren();

    data.forEach((attempt) => {
      const item = document.createElement("div");
      const title = document.createElement("h3");
      const details = document.createElement("p");

      title.textContent =
        attempt.quiz_title ||
        attempt.quiz_name ||
        "Practice quiz";

      const score = attempt.score ?? 0;
      const total =
        attempt.total_questions ?? attempt.total_marks ?? 0;

      details.textContent =
        `Score: ${score}/${total} · ` +
        (attempt.completed_at
          ? new Date(attempt.completed_at).toLocaleString()
          : "Date unavailable");

      item.append(title, details);
      history.appendChild(item);
    });
  }

  async function refreshSession() {
    const { data, error } = await client.auth.getSession();

    if (error) {
      status("Could not check sign-in status: " + error.message);
      return;
    }

    currentUser = data.session?.user ?? null;

    if ($("#signInBtn")) {
      $("#signInBtn").hidden = !!currentUser;
    }

    if ($("#signOutBtn")) {
      $("#signOutBtn").hidden = !currentUser;
    }

    if ($("#signUpBtn")) {
      $("#signUpBtn").hidden = !!currentUser;
    }

    if ($("#authName")) {
      $("#authName").disabled = !!currentUser;
    }

    if ($("#authEmail")) {
      $("#authEmail").disabled = !!currentUser;
    }

    if ($("#authPassword")) {
      $("#authPassword").disabled = !!currentUser;
    }

    status(
      currentUser
        ? "Signed in as " + currentUser.email
        : "Not signed in."
    );

    premium(
      currentUser
        ? "You are signed in. Premium access can be checked here."
        : "Sign in to check your premium access."
    );

    const historyStatus = $("#quizHistoryStatus");

    if (currentUser) {
      if (historyStatus) {
        historyStatus.textContent =
          "Your saved practice quizzes and exam scores:";
      }

      await loadQuizHistory();
    } else {
      if (historyStatus) {
        historyStatus.textContent =
          "Sign in to view your quiz history.";
      }

      const history = $("#quizHistoryList");
      if (history) history.replaceChildren();
    }
  }

  const form = $("#authForm");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = $("#authEmail")?.value.trim();
      const password = $("#authPassword")?.value;

      if (!email || !password) {
        status("Enter your email and password.");
        return;
      }

      const { error } = await client.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        status("Sign-in failed: " + error.message);
        return;
      }

      await refreshSession();
    });
  }

  const signUpButton = $("#signUpBtn");

  if (signUpButton) {
    signUpButton.addEventListener("click", async () => {
      const email = $("#authEmail")?.value.trim();
      const password = $("#authPassword")?.value;

      if (!email || !password) {
        status("Enter your email and password first.");
        return;
      }

      const { error } = await client.auth.signUp({
        email,
        password
      });

      if (error) {
        status("Sign-up failed: " + error.message);
        return;
      }

      status("Check your email to confirm your account.");
    });
  }

  const signOutButton = $("#signOutBtn");

  if (signOutButton) {
    signOutButton.addEventListener("click", async () => {
      const { error } = await client.auth.signOut();

      if (error) {
        status("Sign-out failed: " + error.message);
        return;
      }

      await refreshSession();
    });
  }

  client.auth.onAuthStateChange(() => {
    // Run session checks after the authentication callback finishes.
    setTimeout(() => {
      refreshSession();
    }, 0);
  });

  refreshSession();

  window.FessStudyAccount = {
    async saveQuizResult(result) {
      const { data: { user }, error: userError } =
        await client.auth.getUser();

      if (userError || !user) {
        return {
          saved: false,
          reason: "Please sign in before saving quiz results."
        };
      }

      const { error } = await client
        .from("quiz_attempts")
        .insert({
          user_id: user.id,
          quiz_title: result.title || "Practice quiz",
          score: result.score,
          total_questions: result.total
        });

      if (error) {
        return { saved: false, reason: error.message };
      }

      await refreshSession();
      return { saved: true };
    }
  };
  
})();
