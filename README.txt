FESS'S STUDENT STUDY CENTRE — UPDATED STARTER

FEATURES
- Student-only app (business section removed)
- Nine subject tiles: Mathematics, English, Computer Studies, Business Studies,
  Accounting, History, Geography, Biology, Physical Science
- Subject search and level selector
- Sample quick quiz
- Configurable 10, 20 or 50 question sessions
- Practice quiz and timed exam modes
- Primary, Junior Secondary and Senior Secondary selectors
- Score percentage, elapsed time, answer review and retake
- Responsive layout and a starter web-app manifest

OPEN THE APP
1. Extract this ZIP.
2. Open the fess-student-study-centre folder.
3. Double-click index.html.
4. Scroll to Test Centre; choose subject, level, mode and question count.

IMPORTANT
This is a front-end prototype. Scores are not saved to an online account.
The current subject banks contain 10 seed questions per subject; to create 50-question
sessions, questions repeat in shuffled order. It is not yet a full 50-unique-question
bank and is not an official examination system. The question bank must be expanded and
reviewed against the relevant Namibian curriculum before being used for formal assessment.
Timed exams use 72 seconds per question as a configurable starter default.

NEXT STEPS
1. Test the updated interface.
2. Build and review larger, level-specific question banks with unique questions.
3. Add secure login and save progress online.
4. Add admin question management and official-resource sourcing.
5. Deploy online and finish phone installation configuration.


QUESTION BANK UPDATE
The expanded starter contains many differently worded questions across all nine subjects. A session selects questions without repeating the same question text inside that session. Some generated variants revisit the same underlying concept, and content is not yet an officially reviewed Namibian curriculum bank. Scores are currently stored only for the active session and are not synced online.


SUPABASE ACCOUNT CONNECTION (STARTER)
1. Open supabase-config.js in Notepad or a code editor.
2. Replace PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE with the project's publishable key.
   Keep the quotes around the key. Never use a secret or service_role key.
3. For reliable login redirects and email confirmation, host the website on HTTPS and
   add its URL under Supabase Authentication > URL Configuration.
4. This starter adds sign-up/sign-in and attempts to save quiz results for signed-in users.
5. Do not accept or mark payments as successful from the browser. Premium access must
   only be activated by trusted server-side payment verification.
6. Before launch, verify Supabase RLS policies, authentication email settings, hosting,
   privacy policy, and payment provider requirements.
7. Supabase CDN access requires an internet connection; opening via file:// may limit
   authentication redirects. Test from a local web server or deployed HTTPS site.
