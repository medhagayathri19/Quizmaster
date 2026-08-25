/**
 * ============================================================================
 * QuizMaster – Interactive Quiz Platform JavaScript Application Logic
 * Architecture: Pure Vanilla JS (ES6+), Event-Driven, Fully Offline
 * Storage: HTML5 localStorage for Leaderboard, History, Streaks, Achievements
 * Suitable for: College Mini-Project & Viva Demonstration
 * ============================================================================
 */

// Strict Mode Execution
"use strict";

/* ============================================================================
   1. QUESTION DATABASE (35 Detailed Sample Questions Across All Categories)
   ============================================================================ */
const QUESTION_BANK = [
  // --- PROGRAMMING ---
  {
    id: 1,
    category: "Programming",
    difficulty: "Easy",
    question: "Which keyword is used to declare a block-scoped variable in modern JavaScript?",
    options: ["var", "let", "const", "both let and const"],
    correctAnswer: 3,
    explanation: "'let' and 'const' were introduced in ES6 to provide block-scoped variable declarations, whereas 'var' is function-scoped."
  },
  {
    id: 2,
    category: "Programming",
    difficulty: "Medium",
    question: "What will `console.log(typeof NaN)` output in JavaScript?",
    options: ["undefined", "null", "number", "NaN"],
    correctAnswer: 2,
    explanation: "In JavaScript, NaN (Not-a-Number) is technically a numeric data type, so `typeof NaN` returns 'number'."
  },
  {
    id: 3,
    category: "Programming",
    difficulty: "Hard",
    question: "In Python, which built-in data structure is mutable and ordered?",
    options: ["Tuple", "Set", "List", "Frozenset"],
    correctAnswer: 2,
    explanation: "Lists in Python are ordered sequences that can be modified (mutable). Tuples are immutable, and Sets are unordered."
  },
  {
    id: 4,
    category: "Programming",
    difficulty: "Easy",
    question: "Which symbol is used for single-line comments in Python?",
    options: ["//", "/*", "#", "--"],
    correctAnswer: 2,
    explanation: "Python uses the hash symbol '#' for single-line comments, whereas JavaScript and C++ use '//'."
  },
  {
    id: 5,
    category: "Programming",
    difficulty: "Medium",
    question: "Which Java OOP principle allows a subclass to provide a specific implementation of a method already defined in its parent class?",
    options: ["Encapsulation", "Method Overriding", "Abstraction", "Method Overloading"],
    correctAnswer: 1,
    explanation: "Method Overriding allows a child class to provide a specific implementation of a method defined in its superclass."
  },
  {
    id: 6,
    category: "Programming",
    difficulty: "Hard",
    question: "What is the time complexity of searching an element in a balanced Binary Search Tree (BST)?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
    correctAnswer: 2,
    explanation: "Searching in a balanced BST halves the search space at each step, giving it an O(log n) time complexity."
  },

  // --- WEB DEVELOPMENT ---
  {
    id: 7,
    category: "Web Development",
    difficulty: "Easy",
    question: "Which HTML5 semantic tag represents the primary navigational links of a webpage?",
    options: ["<header>", "<section>", "<nav>", "<aside>"],
    correctAnswer: 2,
    explanation: "The `<nav>` tag defines a block of major navigation links in HTML5."
  },
  {
    id: 8,
    category: "Web Development",
    difficulty: "Medium",
    question: "Which CSS Flexbox property controls alignment along the cross-axis?",
    options: ["justify-content", "align-items", "flex-direction", "flex-wrap"],
    correctAnswer: 1,
    explanation: "`align-items` defines how flex items are aligned along the cross-axis, while `justify-content` controls the main axis."
  },
  {
    id: 9,
    category: "Web Development",
    difficulty: "Hard",
    question: "Which HTTP status code indicates '304 Not Modified' for client side caching?",
    options: ["200 OK", "304 Not Modified", "401 Unauthorized", "503 Service Unavailable"],
    correctAnswer: 1,
    explanation: "HTTP 304 informs the client browser that the requested resource has not been modified since the last fetch."
  },
  {
    id: 10,
    category: "Web Development",
    difficulty: "Easy",
    question: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"],
    correctAnswer: 1,
    explanation: "CSS stands for Cascading Style Sheets, describing how HTML elements are formatted visually."
  },
  {
    id: 11,
    category: "Web Development",
    difficulty: "Medium",
    question: "Which DOM method adds a specified event listener to an element without overwriting existing listeners?",
    options: ["element.attachEvent()", "element.addEventListener()", "element.on()", "element.bindEvent()"],
    correctAnswer: 1,
    explanation: "`addEventListener()` attaches an event handler without replacing previous handlers registered on the element."
  },
  {
    id: 12,
    category: "Web Development",
    difficulty: "Hard",
    question: "Which web browser feature allows asynchronous data fetching without reloading the entire web page?",
    options: ["CSS Animations", "Fetch API / AJAX", "DOM Parser", "Cookie Storage"],
    correctAnswer: 1,
    explanation: "The Fetch API and AJAX allow web applications to make asynchronous HTTP requests to servers without full page refreshes."
  },

  // --- COMPUTER SCIENCE ---
  {
    id: 13,
    category: "Computer Science",
    difficulty: "Easy",
    question: "What is the smallest unit of digital data in computer systems?",
    options: ["Byte", "Bit", "Nibble", "Word"],
    correctAnswer: 1,
    explanation: "A bit (binary digit) is the smallest unit of data in computing, holding a value of either 0 or 1. 8 bits make a Byte."
  },
  {
    id: 14,
    category: "Computer Science",
    difficulty: "Medium",
    question: "Which data structure operates on a First-In, First-Out (FIFO) policy?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correctAnswer: 1,
    explanation: "A Queue operates on a FIFO basis (the first element added is the first removed), whereas a Stack is LIFO."
  },
  {
    id: 15,
    category: "Computer Science",
    difficulty: "Hard",
    question: "Which operating system scheduling algorithm can cause the 'Convoy Effect'?",
    options: ["First-Come, First-Served (FCFS)", "Round Robin", "Shortest Job First (SJF)", "Priority Scheduling"],
    correctAnswer: 0,
    explanation: "FCFS scheduling causes the Convoy Effect when a long CPU-bound process delays several shorter I/O-bound processes behind it."
  },
  {
    id: 16,
    category: "Computer Science",
    difficulty: "Medium",
    question: "What is the primary function of an Operating System's kernel?",
    options: ["Rendering graphics", "Managing hardware resources and memory", "Compiling user code", "Formatting disks"],
    correctAnswer: 1,
    explanation: "The kernel is the core component of an OS that manages CPU, memory, devices, and communication between software and hardware."
  },
  {
    id: 17,
    category: "Computer Science",
    difficulty: "Hard",
    question: "In TCP/IP networking, which port is standard for HTTPS encrypted traffic?",
    options: ["80", "21", "443", "8080"],
    correctAnswer: 2,
    explanation: "Port 443 is used for secure HTTPS web traffic. Port 80 is used for unencrypted HTTP."
  },

  // --- SCIENCE ---
  {
    id: 18,
    category: "Science",
    difficulty: "Easy",
    question: "What is the chemical symbol for Gold in the periodic table?",
    options: ["Ag", "Au", "Fe", "Gd"],
    correctAnswer: 1,
    explanation: "The symbol 'Au' for gold originates from the Latin word 'Aurum', meaning shining dawn."
  },
  {
    id: 19,
    category: "Science",
    difficulty: "Medium",
    question: "Which organelle is known as the powerhouse of the eukaryotic cell?",
    options: ["Ribosome", "Nucleus", "Mitochondria", "Golgi Apparatus"],
    correctAnswer: 2,
    explanation: "Mitochondria generate ATP (adenosine triphosphate), supplying chemical energy needed for biological cellular processes."
  },
  {
    id: 20,
    category: "Science",
    difficulty: "Hard",
    question: "What is the approximate speed of light in a vacuum?",
    options: ["3 x 10^8 meters per second", "3 x 10^5 meters per second", "1.5 x 10^8 meters per second", "3 x 10^6 meters per second"],
    correctAnswer: 0,
    explanation: "The speed of light in vacuum is approximately 299,792,458 m/s (roughly 3 x 10^8 m/s)."
  },
  {
    id: 21,
    category: "Science",
    difficulty: "Easy",
    question: "Which planet in our solar system is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    explanation: "Mars appears red due to the abundance of iron oxide (rust) on its surface."
  },
  {
    id: 22,
    category: "Science",
    difficulty: "Medium",
    question: "What is Newton's Second Law of Motion represented mathematically?",
    options: ["F = m * a", "E = m * c^2", "V = I * R", "P = F / A"],
    correctAnswer: 0,
    explanation: "Newton's Second Law states that Force (F) equals Mass (m) multiplied by Acceleration (a)."
  },

  // --- GENERAL KNOWLEDGE ---
  {
    id: 23,
    category: "General Knowledge",
    difficulty: "Easy",
    question: "Which is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3,
    explanation: "The Pacific Ocean is the largest and deepest ocean on Earth, covering over 30% of the planet's surface."
  },
  {
    id: 24,
    category: "General Knowledge",
    difficulty: "Medium",
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
    correctAnswer: 1,
    explanation: "William Shakespeare wrote the tragic romance 'Romeo and Juliet' early in his literary career."
  },
  {
    id: 25,
    category: "General Knowledge",
    difficulty: "Hard",
    question: "What is the capital city of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correctAnswer: 2,
    explanation: "Canberra was selected as Australia's capital in 1908 as a compromise between rival cities Sydney and Melbourne."
  },
  {
    id: 26,
    category: "General Knowledge",
    difficulty: "Easy",
    question: "How many continents are there on planet Earth?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
    explanation: "Earth has 7 recognized continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia."
  },

  // --- TECHNOLOGY ---
  {
    id: 27,
    category: "Technology",
    difficulty: "Easy",
    question: "What does 'CPU' stand for in computer hardware?",
    options: ["Central Processing Unit", "Computer Power Unit", "Central Program Utility", "Core Processing Control"],
    correctAnswer: 0,
    explanation: "CPU stands for Central Processing Unit, often called the main processor or brain of a computer."
  },
  {
    id: 28,
    category: "Technology",
    difficulty: "Medium",
    question: "Which artificial intelligence company developed ChatGPT?",
    options: ["Google", "Microsoft", "OpenAI", "Meta"],
    correctAnswer: 2,
    explanation: "OpenAI developed and released ChatGPT based on its Generative Pre-trained Transformer (GPT) language models."
  },
  {
    id: 29,
    category: "Technology",
    difficulty: "Hard",
    question: "Which cryptographic algorithm is widely used to secure asymmetric public-key data encryption?",
    options: ["AES-256", "RSA", "SHA-256", "MD5"],
    correctAnswer: 1,
    explanation: "RSA (Rivest–Shamir–Adleman) is an asymmetric public-key cryptosystem used for secure digital signatures and key exchange."
  },
  {
    id: 30,
    category: "Technology",
    difficulty: "Easy",
    question: "Which tech company created the Android operating system for smartphones?",
    options: ["Apple", "Google", "Samsung", "Nokia"],
    correctAnswer: 1,
    explanation: "Google acquired Android Inc. in 2005 and leads the open-source development of the Android mobile OS."
  },
  {
    id: 31,
    category: "Programming",
    difficulty: "Medium",
    question: "Which method removes the last element from an array in JavaScript?",
    options: ["shift()", "pop()", "unshift()", "slice()"],
    correctAnswer: 1,
    explanation: "The `pop()` method mutates an array by removing its last element and returning that element."
  },
  {
    id: 32,
    category: "Web Development",
    difficulty: "Easy",
    question: "Which HTML attribute specifies an alternate text for an image if it fails to load?",
    options: ["title", "alt", "src", "description"],
    correctAnswer: 1,
    explanation: "The `alt` attribute provides alternative text for accessibility (screen readers) and fallback image display."
  },
  {
    id: 33,
    category: "Computer Science",
    difficulty: "Easy",
    question: "What is the binary representation of the decimal number 10?",
    options: ["1001", "1010", "1100", "1110"],
    correctAnswer: 1,
    explanation: "Decimal 10 converts to binary 1010 (8x1 + 4x0 + 2x1 + 1x0 = 10)."
  },
  {
    id: 34,
    category: "Science",
    difficulty: "Medium",
    question: "Which gas makes up the majority of Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
    correctAnswer: 2,
    explanation: "Nitrogen constitutes approximately 78% of Earth's atmospheric volume, followed by Oxygen at 21%."
  },
  {
    id: 35,
    category: "Technology",
    difficulty: "Medium",
    question: "What does 'RAM' stand for in memory specifications?",
    options: ["Read Access Memory", "Random Access Memory", "Rapid Application Module", "Realtime Access Memory"],
    correctAnswer: 1,
    explanation: "RAM stands for Random Access Memory, providing high-speed volatile storage for active CPU instructions."
  }
];

/* ============================================================================
   2. APPLICATION STATE MANAGEMENT
   ============================================================================ */
const AppState = {
  // Current Quiz Configuration & Session Data
  playerName: "",
  category: "All",
  difficulty: "All",
  questionCount: 10,

  // Active Quiz State
  activeQuestions: [],
  currentIndex: 0,
  score: 0,
  correctCount: 0,
  wrongCount: 0,
  unansweredCount: 0,
  speedBonusTotal: 0,
  
  // Timer State
  questionTimeLimit: 30, // seconds per question
  timeRemaining: 30,
  timerInterval: null,
  quizStartTime: null,
  totalTimeSpentSeconds: 0,
  questionStartTime: null,

  // Choices & Attempt History for Review
  userChoices: [], // Array storing { questionObj, userIndex, isCorrect, isUnanswered, timeTaken }

  // Persistent User Data (Loaded from localStorage)
  leaderboard: [],
  history: [],
  streak: { count: 0, lastQuizDate: null },
  achievements: {
    firstQuiz: false,
    perfectScore: false,
    streak5: false,
    score90: false,
    complete10: false
  },
  theme: "dark"
};

/* ============================================================================
   3. DOM ELEMENT REFERENCES
   ============================================================================ */
const DOM = {
  // Toast & Nav
  toastContainer: document.getElementById("toast-container"),
  navStreakBadge: document.getElementById("nav-streak-badge"),
  navStreakCount: document.getElementById("nav-streak-count"),
  themeToggleBtn: document.getElementById("theme-toggle-btn"),
  hamburgerBtn: document.getElementById("hamburger-btn"),
  navMenu: document.getElementById("nav-menu"),
  navButtons: document.querySelectorAll(".nav-btn"),
  screens: document.querySelectorAll(".view-screen"),
  brandLogo: document.getElementById("brand-logo"),

  // Home Screen Elements
  playerNameInput: document.getElementById("player-name-input"),
  categoryCards: document.querySelectorAll(".category-card"),
  difficultyPills: document.querySelectorAll("#difficulty-group .pill-btn"),
  questionCountPills: document.querySelectorAll("#question-count-group .pill-btn"),
  startQuizBtn: document.getElementById("start-quiz-btn"),

  // Quiz Screen Elements
  currentQuestionNum: document.getElementById("current-question-num"),
  totalQuestionsNum: document.getElementById("total-questions-num"),
  quizCatTag: document.getElementById("quiz-cat-tag"),
  quizDiffTag: document.getElementById("quiz-diff-tag"),
  timerBox: document.getElementById("timer-box"),
  timerDisplay: document.getElementById("timer-display"),
  liveScoreVal: document.getElementById("live-score-val"),
  quizProgressBar: document.getElementById("quiz-progress-bar"),
  questionText: document.getElementById("question-text"),
  optionsContainer: document.getElementById("options-container"),
  explanationBox: document.getElementById("explanation-box"),
  feedbackIcon: document.getElementById("feedback-icon"),
  feedbackTitle: document.fieldTitle || document.getElementById("feedback-title"),
  explanationText: document.getElementById("explanation-text"),
  quitQuizBtn: document.getElementById("quit-quiz-btn"),
  nextBtn: document.getElementById("next-btn"),

  // Result Screen Elements
  resultEmoji: document.getElementById("result-emoji"),
  resultMessage: document.getElementById("result-message"),
  scoreProgressCircle: document.getElementById("score-progress-circle"),
  resultPercentage: document.getElementById("result-percentage"),
  resScore: document.getElementById("res-score"),
  resCorrect: document.getElementById("res-correct"),
  resWrong: document.getElementById("res-wrong"),
  resUnanswered: document.getElementById("res-unanswered"),
  resTime: document.getElementById("res-time"),
  resSpeedBonus: document.getElementById("res-speed-bonus"),
  retryQuizBtn: document.getElementById("retry-quiz-btn"),
  reviewAnswersBtn: document.getElementById("review-answers-btn"),
  newQuizBtn: document.getElementById("new-quiz-btn"),
  homeBtn: document.getElementById("home-btn"),

  // Review Screen Elements
  reviewCardsList: document.getElementById("review-cards-list"),
  backToResultsBtn: document.getElementById("back-to-results-btn"),

  // Leaderboard Elements
  leaderboardTbody: document.getElementById("leaderboard-tbody"),
  emptyLeaderboard: document.getElementById("empty-leaderboard"),
  clearLeaderboardBtn: document.getElementById("clear-leaderboard-btn"),

  // History Elements
  historyList: document.getElementById("history-list"),
  emptyHistory: document.getElementById("empty-history"),
  clearHistoryBtn: document.getElementById("clear-history-btn"),

  // Stats Dashboard Elements
  statTotalQuizzes: document.getElementById("stat-total-quizzes"),
  statAvgScore: document.getElementById("stat-avg-score"),
  statBestScore: document.getElementById("stat-best-score"),
  statTotalQuestions: document.getElementById("stat-total-questions"),
  statOverallAccuracy: document.getElementById("stat-overall-accuracy"),
  statBestCategory: document.getElementById("stat-best-category"),
  categoryStatsList: document.getElementById("category-stats-list"),

  // Badges Elements
  badgesGrid: document.getElementById("badges-grid"),
  unlockedBadgesCount: document.getElementById("unlocked-badges-count")
};

/* ============================================================================
   4. INITIALIZATION & STORAGE LOADERS
   ============================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

/**
 * Initializes app configuration, theme, streak, storage items, and event listeners.
 */
function initApp() {
  // 1. Load LocalStorage Data
  loadThemePreference();
  loadLeaderboard();
  loadQuizHistory();
  loadStreakData();
  loadAchievements();

  // 2. Attach Event Listeners
  setupNavigationListeners();
  setupHomeScreenListeners();
  setupQuizScreenListeners();
  setupResultScreenListeners();
  setupDashboardListeners();

  // 3. Render Initial Dashboard Views
  updateStreakUI();
  renderLeaderboardUI();
  renderHistoryUI();
  renderStatisticsUI();
  renderBadgesUI();

  showNotification("Welcome to QuizMaster! Pick a category to get started.", "info", "⚡");
}

/* ============================================================================
   5. NAVIGATION & THEME LOGIC
   ============================================================================ */
function setupNavigationListeners() {
  // Navigation Tab Switching
  DOM.navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetScreen = btn.getAttribute("data-target");
      switchScreen(targetScreen);

      // Close mobile menu if open
      DOM.navMenu.classList.remove("mobile-open");
    });
  });

  // Logo returns home
  DOM.brandLogo.addEventListener("click", () => switchScreen("home-screen"));

  // Theme Toggle Button
  DOM.themeToggleBtn.addEventListener("click", toggleDarkMode);

  // Mobile Hamburger Menu
  DOM.hamburgerBtn.addEventListener("click", () => {
    DOM.navMenu.classList.toggle("mobile-open");
  });
}

/**
 * Switches the active view screen in the single page layout.
 * @param {string} screenId 
 */
function switchScreen(screenId) {
  DOM.screens.forEach(screen => {
    screen.classList.remove("active-screen");
  });

  const activeScreen = document.getElementById(screenId);
  if (activeScreen) {
    activeScreen.classList.add("active-screen");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Update Nav Buttons Active State
  DOM.navButtons.forEach(btn => {
    if (btn.getAttribute("data-target") === screenId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Refresh statistics if switching to stats or badges tab
  if (screenId === "stats-screen") renderStatisticsUI();
  if (screenId === "badges-screen") renderBadgesUI();
  if (screenId === "leaderboard-screen") renderLeaderboardUI();
  if (screenId === "history-screen") renderHistoryUI();
}

/**
 * Toggles Light/Dark mode and updates localStorage.
 */
function toggleDarkMode() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  
  document.documentElement.setAttribute("data-theme", newTheme);
  AppState.theme = newTheme;
  localStorage.setItem("quizmaster_theme", newTheme);

  showNotification(`Switched to ${newTheme.toUpperCase()} mode`, "info", newTheme === "dark" ? "🌙" : "☀️");
}

function loadThemePreference() {
  const savedTheme = localStorage.getItem("quizmaster_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  AppState.theme = savedTheme;
}

/* ============================================================================
   6. HOME SCREEN & QUIZ CONFIGURATION LOGIC
   ============================================================================ */
function setupHomeScreenListeners() {
  // Category Card Selection
  DOM.categoryCards.forEach(card => {
    card.addEventListener("click", () => {
      DOM.categoryCards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      AppState.category = card.getAttribute("data-category");
    });
  });

  // Difficulty Pill Selection
  DOM.difficultyPills.forEach(pill => {
    pill.addEventListener("click", () => {
      DOM.difficultyPills.forEach(p => p.classList.remove("selected"));
      pill.classList.add("selected");
      AppState.difficulty = pill.getAttribute("data-difficulty");
    });
  });

  // Question Count Pill Selection
  DOM.questionCountPills.forEach(pill => {
    pill.addEventListener("click", () => {
      DOM.questionCountPills.forEach(p => p.classList.remove("selected"));
      pill.classList.add("selected");
      AppState.questionCount = parseInt(pill.getAttribute("data-count"), 10);
    });
  });

  // Start Quiz CTA
  DOM.startQuizBtn.addEventListener("click", startQuiz);
}

/* ============================================================================
   7. QUIZ ENGINE (Start, Load Question, Answer Choice, Timer, Finish)
   ============================================================================ */

/**
 * Validates player input, picks & shuffles questions, resets state, and starts quiz.
 */
function startQuiz() {
  const nameVal = DOM.playerNameInput.value.trim();
  if (!nameVal) {
    showNotification("Please enter your player name before starting!", "error", "⚠️");
    DOM.playerNameInput.focus();
    return;
  }
  AppState.playerName = nameVal;

  // Filter Questions based on Category and Difficulty
  let filtered = QUESTION_BANK.filter(q => {
    const matchCategory = AppState.category === "All" || q.category === AppState.category;
    const matchDifficulty = AppState.difficulty === "All" || q.difficulty === AppState.difficulty;
    return matchCategory && matchDifficulty;
  });

  // Fallback if not enough specific filtered questions exist
  if (filtered.length === 0) {
    showNotification("No exact questions found for this combination. Loading all mixed questions instead!", "warning", "ℹ️");
    filtered = [...QUESTION_BANK];
  }

  // Shuffle Questions (Fisher-Yates Shuffle)
  const shuffled = shuffleArray(filtered);

  // Slice to selected count
  AppState.activeQuestions = shuffled.slice(0, AppState.questionCount);

  // Reset Quiz Counters
  AppState.currentIndex = 0;
  AppState.score = 0;
  AppState.correctCount = 0;
  AppState.wrongCount = 0;
  AppState.unansweredCount = 0;
  AppState.speedBonusTotal = 0;
  AppState.userChoices = [];
  AppState.quizStartTime = new Date();

  // Switch Screen to Quiz View
  switchScreen("quiz-screen");
  showNotification(`Quiz Started! Good luck, ${AppState.playerName}!`, "success", "🚀");

  // Load First Question
  loadQuestion();
}

/**
 * Loads the current question into the Quiz DOM.
 */
function loadQuestion() {
  const q = AppState.activeQuestions[AppState.currentIndex];

  // Update Tracker UI
  DOM.currentQuestionNum.textContent = AppState.currentIndex + 1;
  DOM.totalQuestionsNum.textContent = AppState.activeQuestions.length;
  DOM.quizCatTag.textContent = q.category;
  DOM.quizDiffTag.textContent = q.difficulty;
  DOM.quizDiffTag.className = `badge-tag diff-tag ${q.difficulty.toLowerCase()}`;
  DOM.liveScoreVal.textContent = AppState.score;

  // Update Progress Bar %
  const progressPercent = ((AppState.currentIndex) / AppState.activeQuestions.length) * 100;
  DOM.quizProgressBar.style.width = `${progressPercent}%`;

  // Render Heading & Options
  DOM.questionText.textContent = q.question;
  DOM.optionsContainer.innerHTML = "";
  DOM.explanationBox.classList.add("hidden");
  DOM.explanationBox.className = "explanation-card hidden";
  DOM.nextBtn.disabled = true;

  const prefixes = ["A", "B", "C", "D"];

  q.options.forEach((optText, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-card";
    btn.innerHTML = `
      <span class="option-prefix">${prefixes[index]}</span>
      <span class="option-text">${escapeHTML(optText)}</span>
    `;

    btn.addEventListener("click", () => selectAnswer(index));
    DOM.optionsContainer.appendChild(btn);
  });

  // Record question start time for speed bonus calculation
  AppState.questionStartTime = Date.now();

  // Start Question Timer (30s)
  startTimer();
}

/**
 * Option selection handler.
 * @param {number} selectedIndex 
 */
function selectAnswer(selectedIndex) {
  // Stop Timer
  stopTimer();

  const q = AppState.activeQuestions[AppState.currentIndex];
  const optionButtons = DOM.optionsContainer.querySelectorAll(".option-card");
  const timeTakenSeconds = Math.round((Date.now() - AppState.questionStartTime) / 1000);

  // Disable all option buttons to prevent multiple selections
  optionButtons.forEach(btn => btn.classList.add("disabled"));

  const isCorrect = (selectedIndex === q.correctAnswer);

  // Highlight correct / wrong choices visually
  optionButtons.forEach((btn, idx) => {
    if (idx === q.correctAnswer) {
      btn.classList.add("correct");
    } else if (idx === selectedIndex && !isCorrect) {
      btn.classList.add("wrong");
    }
  });

  // Calculate Base Points & Speed Bonus
  let pointsAwarded = 0;
  let bonusEarned = 0;

  if (isCorrect) {
    pointsAwarded = 10;
    
    // Quick Speed Bonus: Answered under 10 seconds => +5 extra bonus points!
    if (timeTakenSeconds <= 10) {
      bonusEarned = 5;
      AppState.speedBonusTotal += bonusEarned;
      showNotification(`⚡ Speed Bonus! +5 Extra Points!`, "warning", "🔥");
    }

    AppState.score += (pointsAwarded + bonusEarned);
    AppState.correctCount++;
    showNotification("Correct Answer! +10 Points", "success", "✅");
  } else {
    AppState.wrongCount++;
    showNotification("Incorrect Answer!", "error", "❌");
  }

  // Update Live Score Display
  DOM.liveScoreVal.textContent = AppState.score;

  // Record User Choice in State
  AppState.userChoices.push({
    questionObj: q,
    userIndex: selectedIndex,
    isCorrect: isCorrect,
    isUnanswered: false,
    timeTaken: timeTakenSeconds
  });

  // Show Educational Explanation Banner
  DOM.explanationText.textContent = q.explanation;
  DOM.explanationBox.classList.remove("hidden");
  DOM.explanationBox.classList.add(isCorrect ? "correct-border" : "wrong-border");
  DOM.feedbackIcon.textContent = isCorrect ? "🎉" : "💡";
  DOM.feedbackTitle.textContent = isCorrect ? "Spot On!" : "Explanation";

  // Enable Next Question Button
  DOM.nextBtn.disabled = false;
  DOM.nextBtn.focus();
}

/**
 * Handles question countdown timeout (30 seconds elapsed).
 */
function handleTimeOut() {
  const q = AppState.activeQuestions[AppState.currentIndex];
  const optionButtons = DOM.optionsContainer.querySelectorAll(".option-card");

  // Disable options
  optionButtons.forEach(btn => btn.classList.add("disabled"));

  // Highlight correct answer in green
  optionButtons.forEach((btn, idx) => {
    if (idx === q.correctAnswer) {
      btn.classList.add("correct");
    }
  });

  AppState.unansweredCount++;
  showNotification("Time's up! Question marked as unanswered.", "warning", "⏰");

  // Record unanswered state
  AppState.userChoices.push({
    questionObj: q,
    userIndex: -1,
    isCorrect: false,
    isUnanswered: true,
    timeTaken: AppState.questionTimeLimit
  });

  // Display explanation
  DOM.explanationText.textContent = `Time expired! ${q.explanation}`;
  DOM.explanationBox.classList.remove("hidden");
  DOM.explanationBox.classList.add("wrong-border");
  DOM.feedbackIcon.textContent = "⏰";
  DOM.feedbackTitle.textContent = "Time Expired";

  DOM.nextBtn.disabled = false;
}

/**
 * Advances to the next question or finishes quiz if reached end.
 */
function nextQuestion() {
  AppState.currentIndex++;

  if (AppState.currentIndex < AppState.activeQuestions.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
}

function setupQuizScreenListeners() {
  DOM.nextBtn.addEventListener("click", nextQuestion);

  DOM.quitQuizBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to quit this quiz? Your current progress will be lost.")) {
      stopTimer();
      switchScreen("home-screen");
      showNotification("Quiz cancelled.", "info", "🚪");
    }
  });
}

/* ============================================================================
   8. TIMER SYSTEM
   ============================================================================ */
function startTimer() {
  stopTimer(); // Clear existing interval if any

  AppState.timeRemaining = AppState.questionTimeLimit;
  updateTimerUI();

  DOM.timerBox.classList.remove("timer-warning");

  AppState.timerInterval = setInterval(() => {
    AppState.timeRemaining--;
    updateTimerUI();

    // Trigger Warning Animation when time remaining < 10 seconds
    if (AppState.timeRemaining <= 10 && AppState.timeRemaining > 0) {
      DOM.timerBox.classList.add("timer-warning");
    }

    if (AppState.timeRemaining <= 0) {
      stopTimer();
      handleTimeOut();
    }
  }, 1000);
}

function stopTimer() {
  if (AppState.timerInterval) {
    clearInterval(AppState.timerInterval);
    AppState.timerInterval = null;
  }
}

function updateTimerUI() {
  DOM.timerDisplay.textContent = `${AppState.timeRemaining}s`;
}

/* ============================================================================
   9. RESULT & SCORING CALCULATIONS
   ============================================================================ */
function finishQuiz() {
  stopTimer();

  // Total time taken in seconds
  const endTime = new Date();
  const diffMs = endTime - AppState.quizStartTime;
  AppState.totalTimeSpentSeconds = Math.round(diffMs / 1000);

  // Fill Progress Bar to 100%
  DOM.quizProgressBar.style.width = "100%";

  // Calculate Accuracy Percentage
  const total = AppState.activeQuestions.length;
  const accuracyPercent = Math.round((AppState.correctCount / total) * 100);

  // Render Result Screen Data
  DOM.resultPercentage.textContent = `${accuracyPercent}%`;
  DOM.resScore.textContent = `${AppState.score} pts`;
  DOM.resCorrect.textContent = AppState.correctCount;
  DOM.resWrong.textContent = AppState.wrongCount;
  DOM.resUnanswered.textContent = AppState.unansweredCount;
  DOM.resTime.textContent = formatDuration(AppState.totalTimeSpentSeconds);
  DOM.resSpeedBonus.textContent = `+${AppState.speedBonusTotal} pts`;

  // Circular SVG Dashoffset Animation
  const strokeDashoffset = 440 - (440 * accuracyPercent) / 100;
  DOM.scoreProgressCircle.style.strokeDashoffset = strokeDashoffset;

  // Motivational Headline & Emojis
  let message = "";
  let emoji = "🎉";

  if (accuracyPercent >= 90) {
    emoji = "🏆";
    message = "Excellent! You're a true Quiz Master!";
  } else if (accuracyPercent >= 70) {
    emoji = "🎉";
    message = "Great job! Keep improving!";
  } else if (accuracyPercent >= 50) {
    emoji = "👍";
    message = "Good effort! You can do even better.";
  } else {
    emoji = "📚";
    message = "Keep practicing. You'll improve!";
  }

  DOM.resultEmoji.textContent = emoji;
  DOM.resultMessage.textContent = message;

  // Save Results to LocalStorage & Check Badges/Streak
  saveScoreToLeaderboard(accuracyPercent);
  saveQuizHistoryRecord(accuracyPercent);
  updateStreakOnCompletion();
  checkAchievementsOnCompletion(accuracyPercent);

  // Switch to Results Screen
  switchScreen("result-screen");
  showNotification("Quiz Completed! Check out your stats below.", "success", "🎉");
}

function setupResultScreenListeners() {
  DOM.retryQuizBtn.addEventListener("click", () => {
    startQuiz();
  });

  DOM.reviewAnswersBtn.addEventListener("click", () => {
    renderAnswerReviewUI();
    switchScreen("review-screen");
  });

  DOM.newQuizBtn.addEventListener("click", () => {
    switchScreen("home-screen");
  });

  DOM.homeBtn.addEventListener("click", () => {
    switchScreen("home-screen");
  });

  DOM.backToResultsBtn.addEventListener("click", () => {
    switchScreen("result-screen");
  });
}

/* ============================================================================
   10. ANSWER REVIEW SCREEN RENDERER
   ============================================================================ */
function renderAnswerReviewUI() {
  DOM.reviewCardsList.innerHTML = "";

  AppState.userChoices.forEach((item, index) => {
    const q = item.questionObj;
    const card = document.createElement("div");

    let statusClass = "is-wrong";
    let statusBadgeText = "Incorrect";
    let statusBadgeClass = "wrong";

    if (item.isCorrect) {
      statusClass = "is-correct";
      statusBadgeText = "Correct";
      statusBadgeClass = "correct";
    } else if (item.isUnanswered) {
      statusClass = "is-unanswered";
      statusBadgeText = "Unanswered";
      statusBadgeClass = "unanswered";
    }

    let optionsMarkup = "";
    const prefixes = ["A", "B", "C", "D"];

    q.options.forEach((opt, optIdx) => {
      let rowClass = "review-option-row";
      let icon = "";

      if (optIdx === q.correctAnswer) {
        rowClass += " correct-pick";
        icon = " ✅ (Correct Answer)";
      }
      
      if (optIdx === item.userIndex && !item.isCorrect) {
        rowClass += " user-pick";
        icon = " ❌ (Your Choice)";
      } else if (optIdx === item.userIndex && item.isCorrect) {
        icon = " 🌟 (Your Choice)";
      }

      optionsMarkup += `
        <div class="${rowClass}">
          <strong>${prefixes[optIdx]}:</strong> ${escapeHTML(opt)} <span>${icon}</span>
        </div>
      `;
    });

    card.className = `review-card ${statusClass}`;
    card.innerHTML = `
      <div class="review-card-header">
        <span class="question-tracker">Question ${index + 1} of ${AppState.userChoices.length}</span>
        <span class="review-status-tag ${statusBadgeClass}">${statusBadgeText}</span>
      </div>
      <div class="review-question-text">${index + 1}. ${escapeHTML(q.question)}</div>
      <div class="review-options-summary">${optionsMarkup}</div>
      <div class="explanation-card ${item.isCorrect ? 'correct-border' : 'wrong-border'}">
        <div class="explanation-header">💡 Explanation:</div>
        <div class="explanation-text">${escapeHTML(q.explanation)}</div>
      </div>
    `;

    DOM.reviewCardsList.appendChild(card);
  });
}

/* ============================================================================
   11. LEADERBOARD & LOCAL STORAGE PERSISTENCE
   ============================================================================ */
function saveScoreToLeaderboard(accuracyPercent) {
  const record = {
    id: Date.now(),
    name: AppState.playerName || "Anonymous",
    category: AppState.category,
    difficulty: AppState.difficulty,
    score: AppState.score,
    accuracy: accuracyPercent,
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  };

  AppState.leaderboard.push(record);

  // Sort descending by score, then accuracy
  AppState.leaderboard.sort((a, b) => b.score - a.score || b.accuracy - a.accuracy);

  // Keep top 10 scores
  AppState.leaderboard = AppState.leaderboard.slice(0, 10);

  localStorage.setItem("quizmaster_leaderboard", JSON.stringify(AppState.leaderboard));
  renderLeaderboardUI();
}

function loadLeaderboard() {
  const saved = localStorage.getItem("quizmaster_leaderboard");
  if (saved) {
    try {
      AppState.leaderboard = JSON.parse(saved);
    } catch (e) {
      AppState.leaderboard = [];
    }
  }
}

function renderLeaderboardUI() {
  DOM.leaderboardTbody.innerHTML = "";

  if (AppState.leaderboard.length === 0) {
    DOM.emptyLeaderboard.classList.remove("hidden");
    document.getElementById("leaderboard-table").classList.add("hidden");
    return;
  }

  DOM.emptyLeaderboard.classList.add("hidden");
  document.getElementById("leaderboard-table").classList.remove("hidden");

  AppState.leaderboard.forEach((item, index) => {
    const tr = document.createElement("tr");

    let rankBadge = `${index + 1}`;
    if (index === 0) rankBadge = `<span class="rank-badge rank-1">🥇</span>`;
    else if (index === 1) rankBadge = `<span class="rank-badge rank-2">🥈</span>`;
    else if (index === 2) rankBadge = `<span class="rank-badge rank-3">🥉</span>`;

    tr.innerHTML = `
      <td>${rankBadge}</td>
      <td><strong>${escapeHTML(item.name)}</strong></td>
      <td>${escapeHTML(item.category)}</td>
      <td><span class="badge-tag diff-tag ${item.difficulty.toLowerCase()}">${item.difficulty}</span></td>
      <td><strong>${item.score} pts</strong></td>
      <td class="color-success"><strong>${item.accuracy}%</strong></td>
      <td>${item.date}</td>
    `;

    DOM.leaderboardTbody.appendChild(tr);
  });
}

function setupDashboardListeners() {
  DOM.clearLeaderboardBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear the high score leaderboard?")) {
      AppState.leaderboard = [];
      localStorage.removeItem("quizmaster_leaderboard");
      renderLeaderboardUI();
      showNotification("Leaderboard cleared.", "info", "🗑️");
    }
  });

  DOM.clearHistoryBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear your quiz history?")) {
      AppState.history = [];
      localStorage.removeItem("quizmaster_history");
      renderHistoryUI();
      renderStatisticsUI();
      showNotification("Quiz history cleared.", "info", "🗑️");
    }
  });
}

/* ============================================================================
   12. QUIZ HISTORY LOGIC
   ============================================================================ */
function saveQuizHistoryRecord(accuracyPercent) {
  const historyItem = {
    id: Date.now(),
    date: new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
    category: AppState.category,
    difficulty: AppState.difficulty,
    score: AppState.score,
    totalQuestions: AppState.activeQuestions.length,
    correct: AppState.correctCount,
    accuracy: accuracyPercent,
    timeSpent: formatDuration(AppState.totalTimeSpentSeconds)
  };

  AppState.history.unshift(historyItem); // Add to beginning of history list
  
  // Keep last 30 quiz attempts
  if (AppState.history.length > 30) AppState.history.pop();

  localStorage.setItem("quizmaster_history", JSON.stringify(AppState.history));
  renderHistoryUI();
}

function loadQuizHistory() {
  const saved = localStorage.getItem("quizmaster_history");
  if (saved) {
    try {
      AppState.history = JSON.parse(saved);
    } catch (e) {
      AppState.history = [];
    }
  }
}

function renderHistoryUI() {
  DOM.historyList.innerHTML = "";

  if (AppState.history.length === 0) {
    DOM.emptyHistory.classList.remove("hidden");
    return;
  }

  DOM.emptyHistory.classList.add("hidden");

  AppState.history.forEach(item => {
    const card = document.createElement("div");
    card.className = "history-item-card";

    let icon = "🌐";
    if (item.category === "Programming") icon = "💻";
    else if (item.category === "Science") icon = "🔬";
    else if (item.category === "Computer Science") icon = "🧠";
    else if (item.category === "General Knowledge") icon = "💡";
    else if (item.category === "Technology") icon = "🚀";

    card.innerHTML = `
      <div class="history-item-main">
        <div class="history-cat-icon">${icon}</div>
        <div>
          <div class="history-title">${escapeHTML(item.category)} (${item.difficulty})</div>
          <div class="history-date">📅 ${item.date} • ⏱️ ${item.timeSpent}</div>
        </div>
      </div>
      <div class="history-stats">
        <div>
          <div class="history-title">${item.score} pts</div>
          <div class="history-date">${item.correct} / ${item.totalQuestions} Correct</div>
        </div>
        <div class="streak-badge" style="background:var(--color-success-bg); color:var(--color-success); border-color:var(--color-success-border)">
          ${item.accuracy}%
        </div>
      </div>
    `;

    DOM.historyList.appendChild(card);
  });
}

/* ============================================================================
   13. STREAK SYSTEM LOGIC
   ============================================================================ */
function loadStreakData() {
  const saved = localStorage.getItem("quizmaster_streak");
  if (saved) {
    try {
      AppState.streak = JSON.parse(saved);
    } catch (e) {
      AppState.streak = { count: 0, lastQuizDate: null };
    }
  }
}

function updateStreakOnCompletion() {
  const today = new Date().toDateString();
  const lastDate = AppState.streak.lastQuizDate;

  if (!lastDate) {
    // First quiz ever
    AppState.streak.count = 1;
  } else if (lastDate === today) {
    // Played another quiz today -> Streak count remains same
  } else {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (yesterday.toDateString() === lastDate) {
      // Consecutive day play! increment streak
      AppState.streak.count++;
      showNotification(`🔥 ${AppState.streak.count} Day Streak Achieved! Keep it up!`, "warning", "🔥");
    } else {
      // Streak broken, reset to 1
      AppState.streak.count = 1;
    }
  }

  AppState.streak.lastQuizDate = today;
  localStorage.setItem("quizmaster_streak", JSON.stringify(AppState.streak));
  updateStreakUI();
}

function updateStreakUI() {
  DOM.navStreakCount.textContent = AppState.streak.count;
}

/* ============================================================================
   14. BADGES & ACHIEVEMENTS SYSTEM
   ============================================================================ */
const BADGES_DEFINITION = [
  {
    id: "firstQuiz",
    icon: "🏆",
    title: "First Steps",
    description: "Complete your very first quiz on QuizMaster."
  },
  {
    id: "perfectScore",
    icon: "🎯",
    title: "Bullseye",
    description: "Achieve a 100% accuracy score on any quiz."
  },
  {
    id: "streak5",
    icon: "🔥",
    title: "On Fire",
    description: "Build a consecutive streak of 5 daily quiz sessions."
  },
  {
    id: "score90",
    icon: "⭐",
    title: "Quiz Genius",
    description: "Score 90% or higher on any medium/hard quiz."
  },
  {
    id: "complete10",
    icon: "📚",
    title: "Knowledge Scholar",
    description: "Complete 10 total quiz sessions."
  }
];

function loadAchievements() {
  const saved = localStorage.getItem("quizmaster_achievements");
  if (saved) {
    try {
      AppState.achievements = JSON.parse(saved);
    } catch (e) {
      AppState.achievements = {};
    }
  }
}

function checkAchievementsOnCompletion(accuracyPercent) {
  let newlyUnlocked = false;

  // 1. First Quiz
  if (!AppState.achievements.firstQuiz) {
    AppState.achievements.firstQuiz = true;
    unlockBadgeNotification("First Steps", "🏆");
    newlyUnlocked = true;
  }

  // 2. 100% Accuracy
  if (!AppState.achievements.perfectScore && accuracyPercent === 100) {
    AppState.achievements.perfectScore = true;
    unlockBadgeNotification("Bullseye", "🎯");
    newlyUnlocked = true;
  }

  // 3. Score 90%+
  if (!AppState.achievements.score90 && accuracyPercent >= 90) {
    AppState.achievements.score90 = true;
    unlockBadgeNotification("Quiz Genius", "⭐");
    newlyUnlocked = true;
  }

  // 4. Streak 5
  if (!AppState.achievements.streak5 && AppState.streak.count >= 5) {
    AppState.achievements.streak5 = true;
    unlockBadgeNotification("On Fire", "🔥");
    newlyUnlocked = true;
  }

  // 5. Complete 10 Quizzes
  if (!AppState.achievements.complete10 && AppState.history.length >= 10) {
    AppState.achievements.complete10 = true;
    unlockBadgeNotification("Knowledge Scholar", "📚");
    newlyUnlocked = true;
  }

  if (newlyUnlocked) {
    localStorage.setItem("quizmaster_achievements", JSON.stringify(AppState.achievements));
    renderBadgesUI();
  }
}

function unlockBadgeNotification(title, icon) {
  showNotification(`🎉 Badge Unlocked: "${title}"!`, "success", icon);
}

function renderBadgesUI() {
  DOM.badgesGrid.innerHTML = "";
  let unlockedCount = 0;

  BADGES_DEFINITION.forEach(b => {
    const isUnlocked = AppState.achievements[b.id] === true;
    if (isUnlocked) unlockedCount++;

    const card = document.createElement("div");
    card.className = `badge-card ${isUnlocked ? "unlocked" : "locked"}`;
    card.innerHTML = `
      <div class="badge-icon">${b.icon}</div>
      <div class="badge-title">${escapeHTML(b.title)}</div>
      <div class="badge-desc">${escapeHTML(b.description)}</div>
      <span class="badge-status-tag">${isUnlocked ? "✓ Unlocked" : "🔒 Locked"}</span>
    `;

    DOM.badgesGrid.appendChild(card);
  });

  DOM.unlockedBadgesCount.textContent = unlockedCount;
}

/* ============================================================================
   15. STATISTICS DASHBOARD CALCULATIONS
   ============================================================================ */
function renderStatisticsUI() {
  const history = AppState.history;

  if (history.length === 0) {
    DOM.statTotalQuizzes.textContent = "0";
    DOM.statAvgScore.textContent = "0%";
    DOM.statBestScore.textContent = "0%";
    DOM.statTotalQuestions.textContent = "0";
    DOM.statOverallAccuracy.textContent = "0%";
    DOM.statBestCategory.textContent = "N/A";
    DOM.categoryStatsList.innerHTML = `<div class="empty-state">No statistics available yet. Take a quiz to view performance graphs!</div>`;
    return;
  }

  const totalQuizzes = history.length;
  let sumAccuracy = 0;
  let bestAcc = 0;
  let totalQuestionsAnswered = 0;
  let totalCorrect = 0;

  const categoryMap = {}; // Tracks { total: 0, correct: 0 } per category

  history.forEach(h => {
    sumAccuracy += h.accuracy;
    if (h.accuracy > bestAcc) bestAcc = h.accuracy;

    totalQuestionsAnswered += h.totalQuestions;
    totalCorrect += h.correct;

    if (!categoryMap[h.category]) {
      categoryMap[h.category] = { totalQuestions: 0, correct: 0 };
    }
    categoryMap[h.category].totalQuestions += h.totalQuestions;
    categoryMap[h.category].correct += h.correct;
  });

  const avgAccuracy = Math.round(sumAccuracy / totalQuizzes);
  const overallAccuracy = Math.round((totalCorrect / totalQuestionsAnswered) * 100);

  // Find Most Successful Category
  let topCategory = "N/A";
  let topCatAcc = -1;

  Object.keys(categoryMap).forEach(cat => {
    const catAcc = Math.round((categoryMap[cat].correct / categoryMap[cat].totalQuestions) * 100);
    if (catAcc > topCatAcc) {
      topCatAcc = catAcc;
      topCategory = cat;
    }
  });

  // Update Metric Cards
  DOM.statTotalQuizzes.textContent = totalQuizzes;
  DOM.statAvgScore.textContent = `${avgAccuracy}%`;
  DOM.statBestScore.textContent = `${bestAcc}%`;
  DOM.statTotalQuestions.textContent = totalQuestionsAnswered;
  DOM.statOverallAccuracy.textContent = `${overallAccuracy}%`;
  DOM.statBestCategory.textContent = topCategory;

  // Render Category Breakdown Bars
  DOM.categoryStatsList.innerHTML = "";
  Object.keys(categoryMap).forEach(cat => {
    const cData = categoryMap[cat];
    const catPercent = Math.round((cData.correct / cData.totalQuestions) * 100);

    const row = document.createElement("div");
    row.className = "cat-stat-row";
    row.innerHTML = `
      <div class="cat-stat-header">
        <span>${escapeHTML(cat)}</span>
        <span>${catPercent}% (${cData.correct}/${cData.totalQuestions})</span>
      </div>
      <div class="cat-stat-bar-bg">
        <div class="cat-stat-bar-fill" style="width: ${catPercent}%;"></div>
      </div>
    `;

    DOM.categoryStatsList.appendChild(row);
  });
}

/* ============================================================================
   16. TOAST NOTIFICATION UTILITY SYSTEM
   ============================================================================ */
/**
 * Triggers a non-blocking toast notification.
 * @param {string} message 
 * @param {string} type ('success' | 'error' | 'warning' | 'info')
 * @param {string} icon 
 */
function showNotification(message, type = "info", icon = "ℹ️") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-message">${escapeHTML(message)}</span>
  `;

  DOM.toastContainer.appendChild(toast);

  // Auto Dismiss Toast after 3.5 Seconds
  setTimeout(() => {
    toast.classList.add("toast-out");
    toast.addEventListener("animationend", () => {
      toast.remove();
    });
  }, 3500);
}

/* ============================================================================
   17. UTILITY FUNCTIONS
   ============================================================================ */
/**
 * Fisher-Yates Array Shuffle Algorithm.
 * @param {Array} array 
 * @returns {Array} Shuffled clone
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Formats seconds into human readable duration (e.g. 2m 15s or 45s).
 * @param {number} totalSeconds 
 * @returns {string}
 */
function formatDuration(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;

  if (mins > 0) {
    return `${mins}m ${secs}s`;
  }
  return `${secs}s`;
}

/**
 * Prevents XSS script injection when rendering dynamic user text.
 * @param {string} str 
 * @returns {string}
 */
function escapeHTML(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
