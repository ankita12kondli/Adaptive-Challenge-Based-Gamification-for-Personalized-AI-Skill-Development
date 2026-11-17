// ========================================================
// SkillSpring AI - Kids AI Learning Zone (15 Games & 15 Concepts)
// 15 Concepts & Games for 1st to 8th Standard Students
// Easy, Medium, Advanced levels with Badges & Stars
// ========================================================

const KIDS_GAMES_CATALOG = [
  // 1. What is Artificial Intelligence?
  {
    id: "ai_or_not",
    worldId: 1,
    title: "AI or Not AI? 🤖",
    subtitle: "What is Artificial Intelligence?",
    concept: "Introduction to AI",
    difficulty: "Easy",
    icon: "🤖",
    color: "#4f46e5",
    description: "Look at each object and tap: Is it powered by AI or Not AI?",
    items: [
      { name: "Smart Speaker (Alexa / Siri)", icon: "🔊", isAI: true, explanation: "Uses AI speech recognition to understand and answer you!" },
      { name: "Pocket Calculator", icon: "🔢", isAI: false, explanation: "Only does simple math steps. It cannot learn or think." },
      { name: "Self-Driving Car", icon: "🚗", isAI: true, explanation: "Uses AI computer vision cameras to steer and stop safely!" },
      { name: "Standard Television", icon: "📺", isAI: false, explanation: "Just displays video signals. It does not think." },
      { name: "Face Unlock on Phone", icon: "📱", isAI: true, explanation: "Uses AI face recognition to unlock only for you!" },
      { name: "Simple Electric Fan", icon: "🪭", isAI: false, explanation: "Just spins when turned on. No learning or AI." }
    ]
  },

  // 2. AI in Everyday Life
  {
    id: "find_ai",
    worldId: 2,
    title: "Find AI Around You 🔍",
    subtitle: "AI in Everyday Life",
    concept: "Everyday AI",
    difficulty: "Easy",
    icon: "🔍",
    color: "#0284c7",
    description: "Tap the 4 hidden AI objects in the smart town scene!",
    sceneItems: [
      { id: "voice_assistant", name: "Voice Assistant 🗣️", icon: "🗣️", desc: "Listens to voice commands to play songs and answer questions!" },
      { id: "face_recognition", name: "Face Doorbell 📸", icon: "📸", desc: "Recognizes family faces to unlock the front door safely!" },
      { id: "recommendation", name: "Video Suggestions 📺", icon: "📺", desc: "Recommends cartoons and science shows you might like!" },
      { id: "smart_maps", name: "Smart GPS Maps 🗺️", icon: "🗺️", desc: "Finds the fastest driving route with the least traffic!" }
    ]
  },

  // 3. Human Intelligence vs AI
  {
    id: "human_vs_ai",
    worldId: 3,
    title: "Human Brain or Robot Brain? 🧠",
    subtitle: "Human Intelligence vs AI",
    concept: "Human vs AI",
    difficulty: "Easy",
    icon: "🧠",
    color: "#ec4899",
    description: "Decide who performs each activity: Humans, AI, or Both!",
    questions: [
      { action: "Feeling happy, excited, or crying when sad", answer: "human", explanation: "Only living humans have real feelings and emotions!" },
      { action: "Calculating 9842 × 4721 in 1 millisecond", answer: "ai", explanation: "Computers calculate large numbers much faster than humans!" },
      { action: "Painting a creative artwork picture", answer: "both", explanation: "Humans paint with imagination, and AI can generate pictures too!" },
      { action: "Tasting and enjoying sweet strawberry ice cream", answer: "human", explanation: "Robots do not have taste buds or eat food!" },
      { action: "Scanning 10,000 photos to find a puppy", answer: "ai", explanation: "AI can scan thousands of photos in seconds without getting tired!" }
    ]
  },

  // 4. Smart Robots
  {
    id: "robot_maze",
    worldId: 4,
    title: "Robot Maze Adventure 🚀",
    subtitle: "Smart Robots & Navigation",
    concept: "Smart Robots",
    difficulty: "Easy",
    icon: "🚀",
    color: "#f59e0b",
    description: "Use arrow buttons to walk Robo-Buddy through the maze to the treasure 💎!",
    targetGoal: "gem"
  },

  // 5. Patterns and Recognition
  {
    id: "pattern_detective",
    worldId: 5,
    title: "Pattern Detective 🎨",
    subtitle: "Patterns and Recognition",
    concept: "Pattern Recognition",
    difficulty: "Easy",
    icon: "🎨",
    color: "#8b5cf6",
    description: "Look at the pattern sequence and pick the missing item!",
    patterns: [
      { sequence: ["🔴", "🔵", "🔴", "🔵", "?"], options: ["🔴", "🔵", "🟡"], correct: "🔴", explanation: "Alternating red and blue circles!" },
      { sequence: ["⭐", "⭐", "🌙", "⭐", "⭐", "?"], options: ["🌙", "⭐", "☀️"], correct: "🌙", explanation: "Two stars, then one moon!" },
      { sequence: ["🐶", "🐱", "🐶", "🐱", "?"], options: ["🐶", "🐱", "🐰"], correct: "🐶", explanation: "Dog, cat, dog, cat!" },
      { sequence: ["1️⃣", "2️⃣", "1️⃣", "2️⃣", "?"], options: ["1️⃣", "3️⃣", "2️⃣"], correct: "1️⃣", explanation: "Repeating 1 and 2 sequence!" }
    ]
  },

  // 6. Image Recognition
  {
    id: "animal_detective",
    worldId: 6,
    title: "Animal Detective 🐶",
    subtitle: "Image Recognition",
    concept: "Image Recognition",
    difficulty: "Easy–Medium",
    icon: "🐶",
    color: "#10b981",
    description: "Look at the photo through the AI lens and name the animal!",
    animals: [
      { icon: "🐱", name: "Cat", funFact: "Cats have night vision and use whiskers to feel distances!" },
      { icon: "🐶", name: "Dog", funFact: "Dogs have an incredible sense of smell 10,000 times stronger than humans!" },
      { icon: "🦁", name: "Lion", funFact: "Lions live in family groups called prides and are powerful hunters!" },
      { icon: "🐘", name: "Elephant", funFact: "Elephants are the largest land animals and have great long-term memories!" }
    ]
  },

  // 7. Speech Recognition
  {
    id: "sound_detective",
    worldId: 7,
    title: "Sound Detective 🎤",
    subtitle: "Speech Recognition",
    concept: "Speech Recognition",
    difficulty: "Easy–Medium",
    icon: "🎤",
    color: "#06b6d4",
    description: "Match the word sounds to the correct picture!",
    soundRiddles: [
      { soundWord: "A-P-P-L-E", clue: "Robot voice heard: 'Sweet Red Apple'", options: [{ text: "Apple 🍎", isCorrect: true }, { text: "Banana 🍌", isCorrect: false }, { text: "Orange 🍊", isCorrect: false }] },
      { soundWord: "M-O-O-O", clue: "Robot mic heard animal sound: 'Mooo'", options: [{ text: "Cow 🐮", isCorrect: true }, { text: "Duck 🦆", isCorrect: false }, { text: "Cat 🐱", isCorrect: false }] },
      { soundWord: "B-E-E-P", clue: "Robot mic heard mechanical sound: 'Beep Boop'", options: [{ text: "Robot 🤖", isCorrect: true }, { text: "Bicycle 🚲", isCorrect: false }, { text: "Clock ⏰", isCorrect: false }] }
    ]
  },

  // 8. Classification
  {
    id: "smart_sorting",
    worldId: 8,
    title: "Smart Sorting Challenge 🍎",
    subtitle: "Object Classification",
    concept: "Classification",
    difficulty: "Easy–Medium",
    icon: "🍎",
    color: "#f97316",
    description: "Tap each item into its correct category basket!",
    categories: ["Fruits 🍎", "Vegetables 🥕", "Animals 🐶", "Vehicles 🚗"],
    items: [
      { name: "Apple", icon: "🍎", category: "Fruits 🍎" },
      { name: "Carrot", icon: "🥕", category: "Vegetables 🥕" },
      { name: "Puppy", icon: "🐶", category: "Animals 🐶" },
      { name: "Sports Car", icon: "🚗", category: "Vehicles 🚗" },
      { name: "Banana", icon: "🍌", category: "Fruits 🍎" },
      { name: "Broccoli", icon: "🥦", category: "Vegetables 🥕" }
    ]
  },

  // 9. Data and Information
  {
    id: "data_collector",
    worldId: 9,
    title: "Data Collector Adventure 📊",
    subtitle: "Data & Bar Charts",
    concept: "Data and Information",
    difficulty: "Medium",
    icon: "📊",
    color: "#6366f1",
    description: "Count students' favorite colors and build a colorful bar chart!",
    colorData: [
      { color: "Blue", icon: "🔵", count: 6, hex: "#3b82f6" },
      { color: "Red", icon: "🔴", count: 4, hex: "#ef4444" },
      { color: "Green", icon: "🟢", count: 3, hex: "#10b981" },
      { color: "Yellow", icon: "🟡", count: 2, hex: "#f59e0b" }
    ],
    questions: [
      { q: "Which color is the MOST popular in class?", options: ["Blue (6 votes) 🔵", "Red (4 votes) 🔴", "Yellow (2 votes) 🟡"], correct: 0 },
      { q: "How many students picked Blue?", options: ["6 students", "3 students", "10 students"], correct: 0 }
    ]
  },

  // 10. Machine Learning
  {
    id: "train_your_robot",
    worldId: 10,
    title: "Train Your Robot 🐱🐶",
    subtitle: "Learning from Examples",
    concept: "Machine Learning",
    difficulty: "Medium",
    icon: "🐱",
    color: "#84cc16",
    description: "Sort cats and dogs to train the robot, then test its prediction!",
    dataset: [
      { name: "Persian Cat", icon: "🐱", category: "cat" },
      { name: "Golden Puppy", icon: "🐶", category: "dog" },
      { name: "Ginger Cat", icon: "🐱", category: "cat" },
      { name: "Bulldog Puppy", icon: "🐶", category: "dog" }
    ],
    testItem: { name: "Mystery White Kitten", icon: "🐱", expectedCategory: "cat" }
  },

  // 11. Training an AI Model
  {
    id: "ai_training_lab",
    worldId: 11,
    title: "AI Training Laboratory 🧪",
    subtitle: "Training & Testing AI Models",
    concept: "AI Model Training",
    difficulty: "Medium–Advanced",
    icon: "🧪",
    color: "#14b8a6",
    description: "Label sample data, click Train AI, and test model accuracy!",
    trainingSamples: [
      { name: "Red Apple", icon: "🍎", label: "Apple" },
      { name: "Yellow Banana", icon: "🍌", label: "Banana" },
      { name: "Green Apple", icon: "🍏", label: "Apple" },
      { name: "Ripe Banana", icon: "🍌", label: "Banana" }
    ],
    testSample: { name: "Sweet Red Apple", icon: "🍎", expected: "Apple" }
  },

  // 12. Generative AI
  {
    id: "ai_creative_studio",
    worldId: 12,
    title: "AI Creative Studio 🎨",
    subtitle: "Generative AI Creation",
    concept: "Generative AI",
    difficulty: "Medium–Advanced",
    icon: "✨",
    color: "#d946ef",
    description: "Pick character, action, and setting to generate a magical AI story picture!",
    options: {
      character: ["Blue Robot 🤖", "Baby Dragon 🐉", "Space Kitty 🐱"],
      action: ["Exploring with a Map 🧭", "Flying with Rockets 🚀", "Dancing Happily 💃"],
      setting: ["in a Magical Forest 🌲", "on the Moon Surface 🌕", "in a Candy Kingdom 🍭"]
    }
  },

  // 13. Chatbots and Virtual Assistants
  {
    id: "build_chatbot",
    worldId: 13,
    title: "Build Your Own Chatbot 💬",
    subtitle: "Conversational AI & Chatbots",
    concept: "Chatbots",
    difficulty: "Medium–Advanced",
    icon: "💬",
    color: "#10b981",
    description: "Pick the most friendly, helpful answers for your school chatbot!",
    flowSteps: [
      { userMessage: "User: 'Hello!'", choices: ["Bot: 'Hi! How can I help you today?'", "Bot: 'Go away'", "Bot: 'Error 404'"], correct: 0 },
      { userMessage: "User: 'What is AI?'", choices: ["Bot: 'AI means Artificial Intelligence!'", "Bot: 'I like candy'", "Bot: 'No idea'"], correct: 0 },
      { userMessage: "User: 'Can you help me with science?'", choices: ["Bot: 'Yes! Let us learn science together!'", "Bot: 'Turn off PC'", "Bot: 'Beep'"], correct: 0 }
    ]
  },

  // 14. AI and Problem-Solving
  {
    id: "traffic_controller",
    worldId: 14,
    title: "Smart Traffic Controller 🚦",
    subtitle: "AI Problem-Solving in Cities",
    concept: "AI Problem-Solving",
    difficulty: "Medium–Advanced",
    icon: "🚦",
    color: "#e11d48",
    description: "Decide which road gets the green light first to save lives!",
    scenario: {
      roads: [
        { id: "A", name: "Road A", detail: "10 Normal Cars Waiting 🚗🚗🚗🚗🚗", isPriority: false },
        { id: "B", name: "Road B", detail: "3 Normal Cars Waiting 🚗🚗🚗", isPriority: false },
        { id: "C", name: "Road C", detail: "1 Emergency Ambulance with Siren! 🚑🚨", isPriority: true }
      ],
      question: "Which road should the Smart AI turn Green first?"
    }
  },

  // 15. Responsible and Safe AI
  {
    id: "ai_safety",
    worldId: 15,
    title: "AI Safety Detective 🛡️",
    subtitle: "Responsible & Safe AI",
    concept: "Responsible AI",
    difficulty: "All levels",
    icon: "🛡️",
    color: "#d97706",
    description: "Decide whether each online situation is Safe ✅ or Unsafe 🚨!",
    situations: [
      { text: "Sharing your private password with an AI chatbot.", isSafe: false, explanation: "Never share passwords or private codes with anyone online!" },
      { text: "Asking an adult or teacher before using a new website.", isSafe: true, explanation: "Great habit! Adults help keep you safe on the internet." },
      { text: "Believing every answer generated by AI without checking.", isSafe: false, explanation: "AI can sometimes make mistakes! Always check your school books." },
      { text: "Sharing your home address or phone number in an online chat.", isSafe: false, explanation: "Never share your address or phone number with strangers!" },
      { text: "Checking important facts from trusted books and teachers.", isSafe: true, explanation: "Excellent! Verifying facts from reliable sources is smart." }
    ]
  }
];

// 15 Achievement Badges matching the 15 Games
const KIDS_BADGES_DATA = [
  { id: "ai_explorer", name: "AI Explorer", icon: "🤖", desc: "Completed 'AI or Not AI?'" },
  { id: "everyday_ai", name: "Everyday AI Explorer", icon: "🔍", desc: "Found AI tools around town" },
  { id: "smart_thinker", name: "Smart Thinker", icon: "🧠", desc: "Understood Human Brain vs AI" },
  { id: "robot_commander", name: "Robot Commander", icon: "🚀", desc: "Guided robot through the maze" },
  { id: "pattern_master", name: "Pattern Master", icon: "🎨", desc: "Solved visual pattern sequences" },
  { id: "image_detective", name: "Image Detective", icon: "🐶", desc: "Identified animals with AI vision" },
  { id: "sound_master", name: "Sound Master", icon: "🎤", desc: "Matched spoken words and sounds" },
  { id: "sorting_champ", name: "Sorting Champion", icon: "🍎", desc: "Classified objects into baskets" },
  { id: "data_scientist", name: "Data Scientist", icon: "📊", desc: "Collected data & read bar charts" },
  { id: "ai_trainer", name: "AI Trainer", icon: "🐱", desc: "Trained robot on cat and dog data" },
  { id: "ai_scientist", name: "AI Scientist", icon: "🧪", desc: "Trained & tested lab models" },
  { id: "creative_genius", name: "Creative Genius", icon: "✨", desc: "Created magical AI stories" },
  { id: "chatbot_creator", name: "Chatbot Creator", icon: "💬", desc: "Built conversational chat flows" },
  { id: "smart_solver", name: "Smart Problem Solver", icon: "🚦", desc: "Gave ambulance priority in traffic" },
  { id: "safety_champion", name: "AI Safety Champion", icon: "🛡️", desc: "Mastered safe and responsible AI rules" }
];
