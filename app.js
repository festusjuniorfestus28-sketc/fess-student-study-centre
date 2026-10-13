const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const toast = (message) => {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => el.classList.remove("show"), 3200);
};
$("#year").textContent = new Date().getFullYear();

$("#menuToggle").addEventListener("click", () => {
  const nav = $("#mainNav");
  const open = nav.classList.toggle("open");
  $("#menuToggle").setAttribute("aria-expanded", String(open));
});
$$('#mainNav a').forEach(link => link.addEventListener("click", () => {
  $("#mainNav").classList.remove("open");
  $("#menuToggle").setAttribute("aria-expanded", "false");
}));

function filterSubjects() {
  const term = $("#resourceSearch").value.trim().toLowerCase();
  const level = $("#levelFilter").value;
  $$(".subject-card").forEach(card => {
    const matchesText = (card.dataset.subject + " " + card.textContent).toLowerCase().includes(term);
    const matchesLevel = level === "all" || card.dataset.level === "all" || card.dataset.level === level;
    card.hidden = !(matchesText && matchesLevel);
  });
}
$("#resourceSearch").addEventListener("input", filterSubjects);
$("#levelFilter").addEventListener("change", filterSubjects);

// Starter question banks. Each subject contains a smaller verified-by-design seed set;
// the app cycles and shuffles these to provide 50-question sessions, with repetitions
// possible until a larger curriculum-reviewed bank is added.
const subjectQuestions = {
  "Mathematics": [
    {q:"What is 7 × 8?", options:["56","54","64","48"], answer:0, explain:"7 multiplied by 8 equals 56."},
    {q:"What is 25% of 80?", options:["10","15","20","25"], answer:2, explain:"25% is one quarter; one quarter of 80 is 20."},
    {q:"Solve: x + 9 = 15", options:["x = 4","x = 5","x = 6","x = 7"], answer:2, explain:"Subtract 9 from both sides: x = 6."},
    {q:"What is 3/4 written as a decimal?", options:["0.25","0.5","0.75","1.25"], answer:2, explain:"3 divided by 4 equals 0.75."},
    {q:"What is the perimeter of a square with side 5 cm?", options:["10 cm","15 cm","20 cm","25 cm"], answer:2, explain:"A square has four equal sides: 4 × 5 = 20 cm."},
    {q:"What is 144 ÷ 12?", options:["10","11","12","14"], answer:2, explain:"12 × 12 = 144."},
    {q:"Which is a prime number?", options:["9","15","17","21"], answer:2, explain:"17 has exactly two positive factors: 1 and 17."},
    {q:"What is the area of a rectangle 6 cm by 4 cm?", options:["10 cm²","20 cm²","24 cm²","28 cm²"], answer:2, explain:"Area = length × width = 6 × 4 = 24 cm²."},
    {q:"Simplify 2a + 3a.", options:["5","5a","6a","a5"], answer:1, explain:"Like terms add: 2a + 3a = 5a."},
    {q:"How many degrees are in a right angle?", options:["45°","90°","180°","360°"], answer:1, explain:"A right angle measures 90 degrees."}
  ],
  "English": [
    {q:"Which word is a verb?", options:["Quickly","Happiness","Write","Blue"], answer:2, explain:"A verb expresses an action or state; write is an action."},
    {q:"Choose the correct sentence.", options:["She go to school.","She goes to school.","She going school.","She gone to school."], answer:1, explain:"With 'she' in the simple present, use 'goes'."},
    {q:"What is the main idea of a paragraph?", options:["The longest word","The central point","The last punctuation mark","The title only"], answer:1, explain:"The main idea is the central point the paragraph communicates."},
    {q:"What is the plural of 'child'?", options:["Childs","Childes","Children","Childrens"], answer:2, explain:"The irregular plural of child is children."},
    {q:"Which punctuation ends a direct question?", options:["Full stop","Comma","Question mark","Colon"], answer:2, explain:"A direct question ends with a question mark."},
    {q:"Choose the adjective: 'The bright sun rose.'", options:["The","Bright","Sun","Rose"], answer:1, explain:"Bright describes the noun sun."},
    {q:"Which word is closest in meaning to 'begin'?", options:["Finish","Start","Forget","Close"], answer:1, explain:"Start is a synonym of begin."},
    {q:"Which is a complete sentence?", options:["Because it rained","Running across the field","The learners studied quietly.","After the lesson"], answer:2, explain:"It expresses a complete thought with a subject and verb."},
    {q:"What is the past tense of 'teach'?", options:["Teached","Taught","Teaching","Teaches"], answer:1, explain:"The past tense of teach is taught."},
    {q:"A person who writes books is an...", options:["Author","Audience","Actor","Editor only"], answer:0, explain:"An author writes a book or other text."}
  ],
  "Computer Studies": [
    {q:"Which device is used to type text?", options:["Monitor","Keyboard","Speaker","Projector"], answer:1, explain:"A keyboard is an input device used to type."},
    {q:"What does CPU commonly stand for?", options:["Central Processing Unit","Computer Power Utility","Control Program User","Central Print Unit"], answer:0, explain:"CPU stands for Central Processing Unit."},
    {q:"Which is a strong password practice?", options:["Use 12345","Reuse one password everywhere","Use a long unique password","Share it with friends"], answer:2, explain:"Use a long, unique password for each important account."},
    {q:"Which device displays visual output?", options:["Monitor","Mouse","Microphone","Scanner"], answer:0, explain:"A monitor displays visual output."},
    {q:"Which is an example of software?", options:["Keyboard","Operating system","Monitor","Cable"], answer:1, explain:"An operating system is software."},
    {q:"What is the internet?", options:["A global network of networks","A single keyboard","A type of printer","A folder only"], answer:0, explain:"The internet connects networks around the world."},
    {q:"Which key commonly creates a space between words?", options:["Shift","Spacebar","Esc","Tab only"], answer:1, explain:"The spacebar inserts a space."},
    {q:"Which is used to store files long-term?", options:["SSD","CPU fan","Mouse pad","Speaker"], answer:0, explain:"An SSD is a storage device."},
    {q:"What should you do with a suspicious email link?", options:["Click it immediately","Share your password","Avoid clicking and verify the sender","Forward it to everyone"], answer:2, explain:"Avoid suspicious links and verify the message through a trusted channel."},
    {q:"What is a spreadsheet commonly used for?", options:["Calculations and tables","Washing clothes","Printing photos only","Cooling a computer"], answer:0, explain:"Spreadsheets organize data and perform calculations."}
  ],
  "Business Studies": [
    {q:"What is a business?", options:["An activity that provides goods or services","Only a school subject","A type of weather","A banknote"], answer:0, explain:"Businesses provide goods or services, often to earn income."},
    {q:"Why do businesses keep records?", options:["To hide sales","To track transactions and performance","To avoid planning","To replace customers"], answer:1, explain:"Records help track transactions and support decisions."},
    {q:"Who buys goods or services?", options:["A customer","A supplier only","A machine","A ledger"], answer:0, explain:"A customer purchases goods or services."},
    {q:"What is a budget?", options:["A plan for income and spending","A customer complaint","A business logo","A product label"], answer:0, explain:"A budget plans expected income and expenditure."},
    {q:"Which is an example of a service?", options:["Haircut","Bag of maize","Book","Chair"], answer:0, explain:"A haircut is a service provided to a customer."},
    {q:"What is profit?", options:["Income minus expenses when positive","All money borrowed","Only rent paid","The number of workers"], answer:0, explain:"Profit occurs when revenue exceeds expenses."},
    {q:"Advertising mainly helps a business to...", options:["Inform and attract customers","Hide its products","Stop all sales","Remove its records"], answer:0, explain:"Advertising informs potential customers about goods or services."},
    {q:"A supplier usually...", options:["Provides goods or materials","Buys only from customers","Writes school exams","Sets the weather"], answer:0, explain:"Suppliers provide goods, materials or services to businesses."},
    {q:"Why is customer service important?", options:["It helps meet customer needs and build trust","It always increases prices","It removes product quality","It avoids communication"], answer:0, explain:"Good service supports satisfaction and long-term trust."},
    {q:"Which is a fixed business cost?", options:["Monthly rent under a fixed lease","Packaging for each item sold","Commission per sale","Raw material per product"], answer:0, explain:"Rent is commonly a fixed cost over the agreed period."}
  ],
  "Accounting": [
    {q:"Which document lists money received and paid?", options:["A map","A cash book","A timetable","A dictionary"], answer:1, explain:"A cash book records cash receipts and payments."},
    {q:"Assets are generally...", options:["Resources owned or controlled","Only debts owed","Only expenses","Sales targets"], answer:0, explain:"Assets are resources owned or controlled by an entity."},
    {q:"If income is greater than expenses, the result is a...", options:["Loss","Profit","Liability","Discount"], answer:1, explain:"Income greater than expenses results in a profit."},
    {q:"A liability is...", options:["An amount owed","Cash in hand only","A sales discount","An owner's drawing only"], answer:0, explain:"A liability is an obligation or amount owed."},
    {q:"Which statement shows financial position at a point in time?", options:["Statement of financial position","Shopping list","Timetable","Advertisement"], answer:0, explain:"The statement of financial position reports assets, liabilities and equity at a date."},
    {q:"What is a source document?", options:["Evidence of a transaction","A business slogan","A school timetable","A forecast only"], answer:0, explain:"Invoices and receipts provide evidence of transactions."},
    {q:"Capital introduced by the owner increases...", options:["Owner's equity","Rent expense","Sales returns only","A liability automatically"], answer:0, explain:"Owner investment increases owner's equity."},
    {q:"A receipt is usually evidence that...", options:["Payment was received","A product was designed","A staff member was hired","A loan was cancelled"], answer:0, explain:"A receipt acknowledges that payment has been received."},
    {q:"Which account normally records sales of goods?", options:["Sales account","Drawings account","Rent expense only","Cash shortage only"], answer:0, explain:"Sales records revenue from selling goods."},
    {q:"What is a debtor in basic accounting?", options:["A person or entity that owes the business","A person the business owes","An item of equipment","A type of expense"], answer:0, explain:"A debtor owes money to the business."}
  ],
  "History": [
    {q:"What do historians mainly study?", options:["Past human events","Only future predictions","Chemical reactions","Planetary weather"], answer:0, explain:"History investigates and interprets past human events."},
    {q:"Which is a primary source?", options:["A diary written at the time","A modern summary only","A fictional story about the past","A recent opinion with no evidence"], answer:0, explain:"A diary created at the time can be a primary source."},
    {q:"Why compare historical sources?", options:["To avoid evidence","To check perspectives and reliability","To make dates disappear","To change every fact"], answer:1, explain:"Comparing sources helps evaluate evidence and differing perspectives."},
    {q:"A timeline shows events in...", options:["Chronological order","Alphabetical order only","Random order","Size order"], answer:0, explain:"A timeline places events in time order."},
    {q:"What is archaeology?", options:["Study of past societies through material remains","Study of weather forecasts","Study of modern accounting","Study of grammar"], answer:0, explain:"Archaeology studies past people through material evidence."},
    {q:"Why are dates important in history?", options:["They help place events in time","They prove every story is true","They replace all sources","They remove context"], answer:0, explain:"Dates help establish chronology and context."},
    {q:"Oral history may include...", options:["Recorded memories and interviews","Only mathematical formulas","Only maps","Only computer code"], answer:0, explain:"Oral history preserves memories through spoken accounts."},
    {q:"A historical source should be evaluated for...", options:["Origin, purpose and reliability","Its colour only","Its page size only","Its price only"], answer:0, explain:"Origin, purpose and reliability help assess evidence."},
    {q:"Which is a secondary source?", options:["A later textbook analysis","A letter written during an event","An original photograph from the event","A diary from the period"], answer:0, explain:"A later analysis interprets primary evidence."},
    {q:"Why study history?", options:["To understand change and continuity over time","To predict every event exactly","To avoid evidence","To memorise without context only"], answer:0, explain:"History helps explain how societies change and what persists."}
  ],
  "Geography": [
    {q:"What does a map scale help you find?", options:["Distance on the ground","A person's age","The price of food","A word's meaning"], answer:0, explain:"A map scale relates map distance to real-world distance."},
    {q:"Which instrument measures temperature?", options:["Barometer","Thermometer","Compass","Rain gauge"], answer:1, explain:"A thermometer measures temperature."},
    {q:"Which is a natural resource?", options:["Sunlight","Plastic chair","Mobile app","Notebook"], answer:0, explain:"Sunlight is a naturally occurring resource."},
    {q:"Which direction is opposite east?", options:["North","South","West","North-east"], answer:2, explain:"West is opposite east on a compass."},
    {q:"A river's source is...", options:["Where it begins","Where it enters the sea only","A mountain's summit always","A bridge"], answer:0, explain:"The source is the starting point of a river."},
    {q:"Weather describes atmospheric conditions over...", options:["A short period","Millions of years only","A country's entire history","A rock layer only"], answer:0, explain:"Weather refers to short-term atmospheric conditions."},
    {q:"Climate is the average weather pattern over...", options:["A long period","One minute","A single gust only","One cloud only"], answer:0, explain:"Climate describes patterns over many years."},
    {q:"Which is a renewable energy source?", options:["Wind","Coal","Petroleum","Natural gas"], answer:0, explain:"Wind is naturally replenished."},
    {q:"Population density compares population with...", options:["Land area","Rainfall colour","Road names","Time zones only"], answer:0, explain:"Population density is population per unit of land area."},
    {q:"Contour lines on a map commonly show...", options:["Elevation","Population language","Currency","Temperature only"], answer:0, explain:"Contour lines join places of equal elevation."}
  ],
  "Biology": [
    {q:"Which subject studies living organisms?", options:["Geography","Biology","Accounting","History"], answer:1, explain:"Biology is the study of living organisms."},
    {q:"Which structure controls many cell activities?", options:["Nucleus","Shoelace","Cloud","Compass"], answer:0, explain:"The nucleus contains genetic material and helps control cell activities."},
    {q:"Plants use sunlight during...", options:["Photosynthesis","Evaporation only","Rusting","Condensation"], answer:0, explain:"Plants use light energy during photosynthesis."},
    {q:"Which gas do plants take in for photosynthesis?", options:["Carbon dioxide","Helium","Neon","Hydrogen only"], answer:0, explain:"Plants use carbon dioxide and water to make sugars during photosynthesis."},
    {q:"Which organ pumps blood around the human body?", options:["Heart","Lung","Stomach","Kidney"], answer:0, explain:"The heart pumps blood through the circulatory system."},
    {q:"Which is a producer in a food chain?", options:["Green plant","Lion","Mushroom only","Eagle"], answer:0, explain:"Green plants make their own food using light energy."},
    {q:"The basic unit of life is the...", options:["Cell","Organ system","Planet","Rock"], answer:0, explain:"The cell is the basic structural and functional unit of life."},
    {q:"Which process releases energy from food in cells?", options:["Respiration","Condensation","Filtration only","Freezing"], answer:0, explain:"Cellular respiration releases usable energy from food molecules."},
    {q:"Which is a vertebrate?", options:["Fish","Earthworm","Snail","Jellyfish"], answer:0, explain:"Fish have a backbone and are vertebrates."},
    {q:"An ecosystem includes organisms and...", options:["Their physical environment","Only one animal","Only water molecules","Only the soil colour"], answer:0, explain:"An ecosystem includes living communities and their physical environment."}
  ],
  "Physical Science": [
    {q:"What is the SI unit of force?", options:["Joule","Newton","Watt","Metre"], answer:1, explain:"Force is measured in newtons."},
    {q:"Water freezes at about what temperature at standard pressure?", options:["0°C","10°C","50°C","100°C"], answer:0, explain:"Water freezes at 0°C at standard pressure."},
    {q:"Which is a form of energy transfer?", options:["Heat","Mass only","Colour only","Shape only"], answer:0, explain:"Heat is energy transferred because of a temperature difference."},
    {q:"What is the SI unit of electric current?", options:["Ampere","Volt","Ohm","Watt"], answer:0, explain:"Electric current is measured in amperes."},
    {q:"Which particle has a negative charge?", options:["Electron","Proton","Neutron","Nucleus as a whole"], answer:0, explain:"Electrons carry a negative electric charge."},
    {q:"Which state of matter has a fixed volume but no fixed shape?", options:["Liquid","Solid","Gas","Plasma only"], answer:0, explain:"A liquid takes the shape of its container while keeping a fixed volume."},
    {q:"Speed is calculated as...", options:["Distance ÷ time","Time ÷ distance","Mass × temperature","Force ÷ colour"], answer:0, explain:"Average speed equals distance travelled divided by time taken."},
    {q:"Which gas is needed for ordinary combustion?", options:["Oxygen","Helium","Neon","Argon only"], answer:0, explain:"Oxygen supports ordinary combustion."},
    {q:"A material that allows current to flow easily is a...", options:["Conductor","Insulator","Vacuum only","Magnet only"], answer:0, explain:"Conductors allow electric charge to move easily."},
    {q:"Which instrument measures electric current?", options:["Ammeter","Thermometer","Ruler","Barometer"], answer:0, explain:"An ammeter measures electric current."}
  ]
};


// Expanded question bank: each fact creates several differently worded questions.
// This keeps every session free of duplicate question text while the bank grows.
const extraFacts = {
  "Mathematics": [
    ["fraction", "a part of a whole", "3/4 of a pizza"], ["ratio", "a comparison of quantities by division", "2 red counters for every 3 blue counters"],
    ["mean", "the sum of values divided by the number of values", "the average of 4, 6 and 8 is 6"], ["median", "the middle value after ordering data", "the median of 2, 5 and 9 is 5"],
    ["mode", "the value that occurs most often", "in 2, 3, 3, 7 the mode is 3"], ["perimeter", "the total distance around a shape", "adding all four sides of a rectangle"],
    ["area", "the amount of surface inside a 2D shape", "length multiplied by width for a rectangle"], ["volume", "the space occupied by a 3D object", "length multiplied by width and height for a cuboid"],
    ["prime number", "a whole number greater than 1 with exactly two factors", "13 has factors 1 and 13 only"], ["factor", "a number that divides another number exactly", "6 is a factor of 24"],
    ["multiple", "a result of multiplying a number by a whole number", "20 is a multiple of 5"], ["percentage", "a quantity expressed out of one hundred", "35% means 35 out of 100"],
    ["variable", "a symbol that represents a value", "x in the equation x + 4 = 9"], ["equation", "a mathematical statement that two expressions are equal", "3x = 12"],
    ["acute angle", "an angle smaller than 90 degrees", "a 35-degree angle"], ["obtuse angle", "an angle greater than 90 but less than 180 degrees", "a 120-degree angle"],
    ["mean proportional scale", "a relationship used to compare map or drawing distances", "1 cm representing 5 km on a map"], ["probability", "a measure of how likely an event is", "a fair coin has a 1 in 2 chance of landing heads"],
    ["integer", "a whole number that may be positive, negative or zero", "-3, 0 and 8"], ["decimal", "a number written using a decimal point", "2.75"]
  ],
  "English": [
    ["noun", "a word naming a person, place, thing or idea", "teacher, Windhoek, book or honesty"], ["verb", "a word expressing an action or state", "run, think or seem"],
    ["adjective", "a word that describes a noun", "bright in 'a bright light'"], ["adverb", "a word that modifies a verb, adjective or another adverb", "quickly in 'she ran quickly'"],
    ["pronoun", "a word used instead of a noun", "they in 'they arrived'"], ["preposition", "a word showing a relationship such as place or time", "under in 'under the table'"],
    ["conjunction", "a word that joins words or clauses", "but in 'small but strong'"], ["synonym", "a word with a similar meaning to another word", "happy and joyful"],
    ["antonym", "a word with the opposite meaning", "hot and cold"], ["prefix", "letters added to the beginning of a word", "un- in 'unhappy'"],
    ["suffix", "letters added to the end of a word", "-less in 'careless'"], ["past tense", "a verb form referring to an earlier time", "'walked' in 'I walked home'"],
    ["direct speech", "the exact words spoken by someone", "Mia said, 'I am ready.'"], ["simile", "a comparison using 'like' or 'as'", "'as brave as a lion'"],
    ["metaphor", "a comparison that describes one thing as another", "'Time is a thief'"], ["alliteration", "repetition of the same starting sound in nearby words", "'wild winds whistle'"],
    ["main idea", "the central point of a text or paragraph", "the key message supported by details"], ["inference", "a conclusion drawn from clues and knowledge", "guessing it rained because the ground is wet"],
    ["formal language", "language suited to official or professional situations", "'Dear Sir or Madam' in a formal letter"], ["paragraph", "a group of sentences about one main point", "sentences developing one topic together"]
  ],
  "Computer Studies": [
    ["input device", "hardware used to enter data into a computer", "a keyboard or mouse"], ["output device", "hardware that presents processed information", "a monitor or printer"],
    ["operating system", "software that manages hardware and applications", "Windows or Linux"], ["application software", "a program designed for user tasks", "a word processor"],
    ["RAM", "temporary working memory used while programs run", "memory that is cleared when power is switched off"], ["backup", "a separate copy of data kept for recovery", "a copy of schoolwork on an external drive"],
    ["phishing", "a trick used to steal information through fake messages or sites", "an email pretending to be a bank"], ["malware", "software designed to harm or misuse a system", "a computer virus"],
    ["database", "an organised collection of related data", "a searchable list of learners and marks"], ["spreadsheet", "software that organises data in rows and columns and can calculate", "a workbook containing a budget"],
    ["algorithm", "a clear sequence of steps for solving a problem", "instructions for sorting numbers"], ["variable in programming", "a named place used to hold a value", "score = 10"],
    ["browser", "software used to access websites", "Firefox or Chrome"], ["URL", "the address of a resource on the web", "the address typed into a browser bar"],
    ["cloud storage", "saving files on remote internet-connected servers", "storing documents in an online drive"], ["two-factor authentication", "sign-in protection requiring two different kinds of proof", "a password plus a one-time code"],
    ["LAN", "a network connecting devices in a limited area", "computers connected within one school"], ["bit", "the smallest basic unit of digital data", "a value of 0 or 1"],
    ["copyright", "legal protection for an original creative work", "permission rules for copying an author's work"], ["digital footprint", "the trail of information a person leaves online", "posts, comments and searches linked to an account"]
  ],
  "Business Studies": [
    ["entrepreneur", "a person who starts and organises a business and takes risks", "someone opening a small bakery"], ["market research", "collecting information about customers and competitors", "asking shoppers which products they need"],
    ["target market", "the group of customers a business aims to serve", "students buying affordable stationery"], ["revenue", "money earned from sales before expenses are deducted", "selling 20 items at N$10 each earns N$200 revenue"],
    ["profit", "the amount left when total expenses are subtracted from revenue", "N$500 revenue minus N$350 costs gives N$150 profit"], ["loss", "the amount by which expenses exceed revenue", "N$400 costs and N$300 revenue create a N$100 loss"],
    ["fixed cost", "a cost that stays broadly the same over a period", "monthly shop rent"], ["variable cost", "a cost that changes with output or sales", "ingredients used for each loaf of bread"],
    ["customer service", "help and support given to customers before or after a sale", "politely resolving a complaint"], ["advertising", "communication intended to inform or persuade potential customers", "a poster promoting a new service"],
    ["competition", "rivalry between businesses serving similar customer needs", "two shops selling similar products"], ["supply", "the amount sellers are willing and able to offer for sale", "farmers bringing vegetables to market"],
    ["demand", "the amount buyers are willing and able to purchase", "customers wanting more fresh bread"], ["budget", "a plan for expected income and spending", "planning monthly household expenses"],
    ["cash flow", "the movement of money into and out of a business", "tracking customer payments and supplier bills"], ["ethics", "principles about right and fair behaviour", "giving honest product information"],
    ["sole trader", "a business owned by one person", "one person running a small repair shop"], ["partnership", "a business owned by two or more people under an agreement", "two people operating a design studio"],
    ["wholesaler", "a business that sells goods in bulk to retailers or other buyers", "a supplier selling cartons to shops"], ["retailer", "a business that sells goods to final consumers", "a local shop selling food to households"]
  ],
  "Accounting": [
    ["asset", "a resource owned or controlled that has value", "cash, equipment or inventory"], ["liability", "an obligation or amount a business owes", "an unpaid supplier bill"],
    ["equity", "the owner's residual interest after liabilities are deducted from assets", "assets of N$8,000 minus liabilities of N$3,000 gives N$5,000 equity"], ["capital", "money or resources invested by the owner", "the owner deposits N$2,000 to start a business"],
    ["drawings", "cash or goods taken by the owner for personal use", "the owner withdraws cash for personal shopping"], ["revenue", "income earned from normal business activities", "fees earned by a repair service"],
    ["expense", "a cost incurred while running a business", "electricity used by a shop"], ["invoice", "a document requesting payment for goods or services supplied", "a supplier sends a bill with amounts due"],
    ["receipt", "a document acknowledging that payment was received", "a shop gives proof after a customer pays"], ["creditor", "a person or business to whom money is owed", "a supplier awaiting payment"],
    ["debtor", "a person or business that owes money to the business", "a customer who bought on credit"], ["ledger", "a collection of accounts used to classify transactions", "accounts for cash, sales and rent"],
    ["journal", "a book of original entry where transactions are first recorded", "recording a transaction before posting it to ledger accounts"], ["trial balance", "a list of ledger balances used to check debit and credit totals", "checking that total debits equal total credits"],
    ["depreciation", "the allocation of an asset's depreciable cost over its useful life", "spreading a vehicle's cost over the years it is used"], ["inventory", "goods held for sale or materials used in production", "unsold notebooks in a stationery shop"],
    ["bank reconciliation", "a comparison of the cash book and bank statement to explain differences", "checking for bank fees or unpresented cheques"], ["double entry", "a system recording each transaction with equal debit and credit amounts", "debiting equipment and crediting cash for a cash purchase"],
    ["gross profit", "sales less the cost of goods sold", "sales of N$900 less cost of goods sold of N$500 gives N$400 gross profit"], ["net profit", "profit remaining after other expenses are deducted", "gross profit minus rent, wages and other expenses"]
  ],
  "History": [
    ["chronology", "the arrangement of events in the order they happened", "placing events from earliest to latest on a timeline"], ["primary source", "evidence created by someone present or close to an event", "a letter written during the event"],
    ["secondary source", "a later account that interprets or explains past events", "a modern history textbook"], ["oral history", "historical information gathered through spoken memories and interviews", "recording an elder's account of community life"],
    ["archaeology", "the study of past people through material remains", "examining pottery found at an old settlement"], ["bias", "a tendency to present a person or issue from a particular viewpoint", "a report praising only one side of a conflict"],
    ["cause", "a factor that helps bring about an event", "a shortage of resources contributing to a protest"], ["consequence", "a result or effect of an event", "new laws introduced after a conflict"],
    ["continuity", "features that remain similar over time", "a community continuing a long-standing festival"], ["change", "a difference that develops over time", "transport changing from carts to buses"],
    ["migration", "movement of people from one place to another", "families moving to a town for work"], ["colonisation", "the process by which an outside power establishes control over a territory", "a foreign power imposing administration on a region"],
    ["independence", "self-government free from another country's rule", "a country managing its own national affairs"], ["nationalism", "identification with and support for a nation and its political interests", "people organising to seek self-rule"],
    ["primary evidence", "original material used to investigate a historical question", "an official record from the period being studied"], ["historical interpretation", "an explanation of the meaning or significance of past events", "a historian explaining why a policy had consequences"],
    ["trade route", "a path used to transport goods between places", "a caravan path linking markets"], ["settlement", "a place where people establish a community", "a village growing near a reliable water source"],
    ["revolution", "a major and often rapid political or social change", "a movement that replaces an existing government"], ["treaty", "a formal agreement between political groups or states", "two countries signing an agreement about borders"]
  ],
  "Geography": [
    ["latitude", "angular distance north or south of the Equator", "a place located at 20 degrees south"], ["longitude", "angular distance east or west of the Prime Meridian", "a location at 17 degrees east"],
    ["equator", "the imaginary line at zero degrees latitude", "the line dividing Earth into Northern and Southern Hemispheres"], ["scale", "the relationship between map distance and ground distance", "1 cm on a map representing 10 km on the ground"],
    ["contour line", "a line joining points of equal height on a map", "lines showing the shape of a hill"], ["weather", "the condition of the atmosphere over a short period", "rain and wind experienced today"],
    ["climate", "the average pattern of weather over a long period", "long-term rainfall patterns in a region"], ["erosion", "the wearing away and transport of soil or rock", "a river carrying sediment downstream"],
    ["weathering", "the breakdown of rock in place", "rock cracking as water freezes in a gap"], ["watershed", "an area of land draining into a river system", "land where rainwater flows toward the same river"],
    ["tributary", "a smaller river or stream flowing into a larger river", "a stream joining a main river"], ["delta", "a landform made from deposited sediment near a river mouth", "branching channels forming at a river's mouth"],
    ["population density", "the number of people living per unit of land area", "people per square kilometre"], ["urbanisation", "the growth in the share of people living in towns and cities", "more families moving from rural areas to a city"],
    ["renewable resource", "a resource naturally replenished on a human timescale", "sunlight used to generate electricity"], ["desertification", "land degradation in dry areas that become less productive", "overgrazed land losing vegetation and soil"],
    ["drought", "a prolonged period of unusually low rainfall", "months with much less rain than normal"], ["irrigation", "the artificial supply of water to crops or land", "using pipes or channels to water a field"],
    ["import", "a good or service brought into a country from elsewhere", "a country buying machinery from abroad"], ["export", "a good or service sold to another country", "a country selling fish to overseas markets"]
  ],
  "Biology": [
    ["photosynthesis", "the process by which plants use light to make sugars from carbon dioxide and water", "a green plant using sunlight to make food"], ["respiration", "the process cells use to release energy from food molecules", "muscle cells releasing energy from glucose"],
    ["habitat", "the natural place where an organism lives", "a pond where frogs live"], ["adaptation", "a feature that helps an organism survive or reproduce", "a cactus having spines that reduce water loss"],
    ["producer", "an organism that makes its own organic food", "grass in a food chain"], ["consumer", "an organism that obtains energy by eating other organisms", "a zebra eating grass"],
    ["decomposer", "an organism that breaks down dead material and waste", "fungi breaking down fallen leaves"], ["food chain", "a sequence showing how energy passes between organisms", "grass eaten by a grasshopper that is eaten by a bird"],
    ["ecosystem", "living organisms interacting with one another and their physical environment", "plants, animals, water and soil in a wetland"], ["cell membrane", "a boundary that controls movement of substances into and out of a cell", "a selectively permeable outer layer of a cell"],
    ["nucleus", "a cell structure containing genetic material and controlling many activities", "the part of a typical animal cell containing chromosomes"], ["chlorophyll", "the green pigment that absorbs light for photosynthesis", "the pigment in leaves that captures light energy"],
    ["pollination", "the transfer of pollen from an anther to a stigma", "an insect carrying pollen between flowers"], ["fertilisation", "the joining of male and female gametes", "a sperm cell fusing with an egg cell"],
    ["vertebrate", "an animal that has a backbone", "a frog, bird or fish"], ["invertebrate", "an animal without a backbone", "an earthworm or insect"],
    ["pathogen", "a microorganism or agent that can cause disease", "a bacterium causing an infection"], ["vaccine", "a preparation that trains the immune system to recognise a pathogen", "a vaccination helping the body respond to a disease"],
    ["transpiration", "the loss of water vapour from plant surfaces, especially leaves", "water vapour leaving a leaf through stomata"], ["homeostasis", "the regulation of internal conditions within suitable limits", "the body sweating to help control temperature"]
  ],
  "Physical Science": [
    ["force", "a push or pull that can change motion or shape", "pushing a trolley"], ["speed", "distance travelled divided by time taken", "150 metres in 30 seconds equals 5 metres per second"],
    ["acceleration", "the rate at which velocity changes with time", "a car increasing its speed each second"], ["mass", "a measure of the amount of matter in an object", "a package having a mass of 2 kilograms"],
    ["weight", "the gravitational force acting on an object", "a mass being pulled toward Earth by gravity"], ["density", "mass divided by volume", "a substance with 20 g in 5 cm³ has density 4 g/cm³"],
    ["conduction", "transfer of thermal energy through particles or collisions", "a metal spoon warming in hot tea"], ["convection", "heat transfer by movement of a fluid", "warm air rising in a room"],
    ["radiation", "energy transfer by electromagnetic waves", "heat from the Sun reaching Earth"], ["evaporation", "the change of a liquid into gas at its surface", "a puddle slowly drying in warm weather"],
    ["condensation", "the change of a gas into a liquid", "water droplets forming on a cold glass"], ["element", "a pure substance made of one type of atom", "copper"],
    ["compound", "a substance containing two or more elements chemically bonded", "water made from hydrogen and oxygen"], ["mixture", "two or more substances physically combined, not chemically bonded", "sand mixed with salt"],
    ["atom", "the smallest unit of an element that retains its chemical identity", "one atom of carbon"], ["proton", "a positively charged particle in an atomic nucleus", "a particle with charge +1"],
    ["neutron", "an electrically neutral particle found in most atomic nuclei", "a particle with no net electric charge"], ["series circuit", "a circuit with one path for current", "two bulbs connected in a single loop"],
    ["parallel circuit", "a circuit with more than one path for current", "two bulbs on separate branches"], ["reflection", "the bouncing back of a wave from a surface", "light bouncing off a mirror"]
  ]
};

function buildExpandedQuestions(subject, facts) {
  const definitions = facts.map(f => f[1]);
  const examples = facts.map(f => f[2]);
  const built = [];
  facts.forEach((fact, index) => {
    const [concept, meaning, example] = fact;
    const otherMeanings = definitions.filter((_, i) => i !== index);
    const otherExamples = examples.filter((_, i) => i !== index);
    const variants = [
      { q: `In ${subject}, what does “${concept}” mean?`, correct: meaning, distractors: otherMeanings, explain: `${concept}: ${meaning}.` },
      { q: `Which option is an example of “${concept}”?`, correct: example, distractors: otherExamples, explain: `${example} is an example of ${concept}.` },
      { q: `Choose the accurate statement about “${concept}”.`, correct: `${concept[0].toUpperCase()}${concept.slice(1)} means ${meaning}.`, distractors: otherMeanings.map(d => `${concept[0].toUpperCase()}${concept.slice(1)} means ${d}.`), explain: `${concept}: ${meaning}.` }
    ];
    variants.forEach((v, variantIndex) => {
      const wrongs = shuffle(v.distractors.filter(d => d !== v.correct)).slice(0, 3);
      const options = shuffle([v.correct, ...wrongs]);
      built.push({ q: v.q, options, answer: options.indexOf(v.correct), explain: v.explain });
    });
  });
  return built;
}
Object.entries(extraFacts).forEach(([subject, facts]) => {
  subjectQuestions[subject] = [...subjectQuestions[subject], ...buildExpandedQuestions(subject, facts)];
});

let questions = [];
let questionIndex = 0;
let answers = [];
let selectedAnswer = null;
let testFinished = false;
let timerHandle = null;
let secondsRemaining = 0;
let testStartTime = null;

function shuffle(array) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
function makeQuestionSet(subject, count) {
  const bank = subjectQuestions[subject] || subjectQuestions.Mathematics;
  // Never repeat a question within one quiz or exam.
  const result = shuffle(bank).slice(0, Math.min(count, bank.length));
  return result.map(q => ({...q, options: q.options.slice(), answer: q.answer}));
}
function stopTimer() {
  if (timerHandle) clearInterval(timerHandle);
  timerHandle = null;
}
function startTimer() {
  stopTimer();
  const isTimed = $("#testMode").value === "timed";
  if (!isTimed) {
    $("#testTimer").textContent = "Practice mode";
    $("#testTimer").className = "";
    return;
  }
  // Approx. 1.2 minutes per question; 50 questions = 60 minutes.
  secondsRemaining = questions.length * 72;
  $("#testTimer").className = "timer-active";
  updateTimerText();
  timerHandle = setInterval(() => {
    secondsRemaining--;
    updateTimerText();
    if (secondsRemaining <= 0) {
      stopTimer();
      finishTest(true);
    }
  }, 1000);
}
function updateTimerText() {
  const m = Math.floor(Math.max(0, secondsRemaining) / 60).toString().padStart(2, "0");
  const s = (Math.max(0, secondsRemaining) % 60).toString().padStart(2, "0");
  $("#testTimer").textContent = `Time left ${m}:${s}`;
}
function startTest() {
  stopTimer();
  const subject = $("#testSubject").value;
  const requestedCount = Number($("#testCount").value);
  questions = makeQuestionSet(subject, requestedCount);
  const count = questions.length;
  if (count < requestedCount) toast(`This subject currently has ${count} unique questions available.`);
  questionIndex = 0;
  answers = Array(count).fill(null);
  selectedAnswer = null;
  testFinished = false;
  testStartTime = Date.now();
  $("#testQuestion").hidden = false;
  $("#testResult").hidden = true;
  renderQuestion();
  startTimer();
}
function renderQuestion() {
  const q = questions[questionIndex];
  $("#testProgress").textContent = `Question ${questionIndex + 1} of ${questions.length}`;
  $("#testPrompt").textContent = q.q;
  $("#testStatus").textContent = "Choose an answer to continue.";
  $("#nextQuestion").disabled = true;
  $("#nextQuestion").textContent = questionIndex === questions.length - 1 ? "Finish test" : "Next question";
  $("#testOptions").innerHTML = "";
  q.options.forEach((label, i) => {
    const button = document.createElement("button");
    button.textContent = label;
    button.addEventListener("click", () => selectAnswer(i));
    $("#testOptions").appendChild(button);
  });
}
function selectAnswer(index) {
  if (selectedAnswer !== null || testFinished) return;
  selectedAnswer = index;
  answers[questionIndex] = index;
  const q = questions[questionIndex];
  $$("#testOptions button").forEach((button, i) => {
    button.disabled = true;
    if (i === index) button.classList.add("selected");
  });
  $("#testStatus").textContent = $("#testMode").value === "practice"
    ? (index === q.answer ? "Correct — well done!" : "Answer selected. Review the explanation at the end.")
    : "Answer saved. Continue when you're ready.";
  $("#nextQuestion").disabled = false;
}
function nextQuestion() {
  if (selectedAnswer === null) return;
  if (questionIndex < questions.length - 1) {
    questionIndex++;
    selectedAnswer = null;
    renderQuestion();
  } else {
    finishTest(false);
  }
}
function finishTest(timeUp = false) {
  if (testFinished) return;
  testFinished = true;
  stopTimer();
  const correct = questions.reduce((sum, q, i) => sum + (answers[i] === q.answer ? 1 : 0), 0);
  const percent = Math.round((correct / questions.length) * 100);
  const elapsed = Math.round((Date.now() - testStartTime) / 1000);
  $("#testQuestion").hidden = true;
  $("#testResult").hidden = false;
  $("#testTimer").className = timeUp ? "timer-ended" : "";
  $("#resultTitle").textContent = timeUp ? "Time is up" : (percent >= 70 ? "Well done!" : "Keep practising!");
  $("#resultScore").textContent = `You scored ${correct} out of ${questions.length} (${percent}%). Subject: ${$("#testSubject").value} · Level: ${$("#testLevel").value} · Mode: ${$("#testMode").value === "timed" ? "Timed exam" : "Practice quiz"}. ${timeUp ? "The timer expired." : `Time used: ${Math.floor(elapsed/60)}m ${elapsed%60}s.`}`;

  if (window.FessStudyAccount) {
    window.FessStudyAccount.saveQuizResult({
      subject: $("#testSubject").value,
      level: $("#testLevel").value,
      title: $("#testMode").value === "timed" ? "Timed exam" : "Practice quiz",
      score: correct,
      total: questions.length
    }).then(result => {
      if (result.saved) toast("Result saved to your account.");
      else if (result.reason) toast(result.reason);
    
}).catch(error => {
  console.error("Quiz history save failed:", error);
  alert("Quiz history save failed: " + error.message);
});

  }
  $("#resultReview").innerHTML = "";
  questions.forEach((q, i) => {
    const row = document.createElement("div");
    row.className = "review-line";
    const title = document.createElement("strong");
    title.textContent = `${i + 1}. ${q.q}`;
    const detail = document.createElement("span");
    detail.textContent = `${answers[i] === q.answer ? "Correct" : (answers[i] === null ? "Not answered" : "Incorrect")} · Correct answer: ${q.options[q.answer]}. ${q.explain}`;
    row.append(title, detail);
    $("#resultReview").appendChild(row);
  });
}
$("#nextQuestion").addEventListener("click", nextQuestion);
$("#retakeTest").addEventListener("click", startTest);
["#testSubject", "#testLevel", "#testMode", "#testCount"].forEach(sel => $(sel).addEventListener("change", startTest));

$$(".subject-card").forEach(card => card.addEventListener("click", () => {
  $("#testSubject").value = card.dataset.subject;
  startTest();
  $("#tests").scrollIntoView({ behavior: "smooth" });
}));

$("#quizOptions").addEventListener("click", event => {
  const button = event.target.closest("button[data-correct]");
  if (!button) return;
  $$("#quizOptions button").forEach(option => {
    option.disabled = true;
    if (option.dataset.correct === "true") option.classList.add("correct");
  });
  if (button.dataset.correct === "true") {
    $("#quizFeedback").textContent = "Correct! Biology is the study of living organisms.";
  } else {
    button.classList.add("incorrect");
    $("#quizFeedback").textContent = "Not quite. The correct answer is Biology.";
  }
});
startTest();
document.querySelectorAll('a[href="#home"]').forEach(link => {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    const home = document.getElementById("home");
    if (home) {
      home.hidden = false;
      home.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    document.getElementById("testResult").hidden = true;
    document.getElementById("testQuestion").hidden = false;
  });
});
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js")
      .then(() => console.log("Service Worker registered"))
      .catch(error => console.log("Service Worker error:", error));
  });
}