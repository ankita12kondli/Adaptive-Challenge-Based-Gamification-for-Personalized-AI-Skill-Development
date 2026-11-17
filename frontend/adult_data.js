// ========================================================
// SkillSpring AI - Adult Learning Zone (Ages 35+ Years)
// 20 Basic AI Concepts & 20 Interactive Learning Activities
// Specially designed for beginners with minimal computer background
// Public Adaptive AI Digital Literacy Certification Platform
// ========================================================

const ADULT_LEVELS_META = [
  { level: 1, name: "Level 1: AI Basics", range: "Lessons 1–5", color: "#2563eb", icon: "🌱", focus: "Understand AI and discover everyday AI tools." },
  { level: 2, name: "Level 2: Start Using AI", range: "Lessons 6–10", color: "#0d9488", icon: "💬", focus: "ChatGPT, prompting, writing, learning, and translation." },
  { level: 3, name: "Level 3: AI in Daily Life", range: "Lessons 11–15", color: "#7c3aed", icon: "💼", focus: "Daily routines, festive creativity, document scanning, and small business." },
  { level: 4, name: "Level 4: Smart & Safe AI User", range: "Lessons 16–20", color: "#ea580c", icon: "🛡️", focus: "Banking safety, healthcare, agriculture, and cyber safety." }
];

const ADULT_LESSONS_CATALOG = [
  // ----------------------------------------------------
  // LEVEL 1: AI BASICS (Lessons 1 to 5)
  // ----------------------------------------------------
  {
    id: 1,
    level: 1,
    title: "1. Introduction to Artificial Intelligence",
    subtitle: "What is AI and why does it matter to you?",
    icon: "🧠",
    badge: "AI Starter Badge",
    activityName: "AI Beginner Quiz",
    basics: "Artificial Intelligence (AI) simply means machines or computer programs that can perform tasks that usually require human intelligence — like recognizing photos, understanding spoken words, or recommending movies. You don't need technical skills to use AI; if you use a smartphone, you are already using AI every day!",
    realLife: "When you type a message on WhatsApp and your phone suggests the next word, or when Google Maps shows the fastest route to avoid traffic jams in Bangalore, AI is quietly working for you behind the scenes.",
    quickSummary: "AI is a computer system that learns from data to help humans solve daily tasks with speed and accuracy.",
    steps: [
      { step: 1, title: "Information In", text: "You ask a question or give a photo." },
      { step: 2, title: "Pattern Search", text: "AI checks millions of examples it was taught." },
      { step: 3, title: "Helpful Output", text: "AI gives you a clear, helpful reply immediately." }
    ],
    activityType: "quiz_choice",
    activityData: {
      question: "Which of the following is an example of Artificial Intelligence in daily life?",
      options: [
        { text: "A traditional mechanical wall clock", isCorrect: false, reason: "A mechanical clock only ticks by gears, no digital thinking involved." },
        { text: "Google Maps finding the route with least traffic", isCorrect: true, reason: "Correct! Google Maps analyzes live traffic data to suggest the best route." },
        { text: "A standard plastic water bucket", isCorrect: false, reason: "A bucket is a simple physical object." },
        { text: "A normal light switch on the wall", isCorrect: false, reason: "Normal switches just connect electric wires." }
      ]
    },
    quiz: [
      { q: "Do you need programming knowledge to benefit from AI tools?", options: ["No, anyone can use AI with simple everyday language", "Yes, only computer engineers can use AI", "You must have a degree in mathematics"], answer: 0, exp: "AI is built for everyone! You can simply type or speak in plain everyday words." },
      { q: "Which everyday app uses AI for recommendations?", options: ["YouTube suggesting videos you like", "A paper notebook", "An ordinary hand fan"], answer: 0, exp: "YouTube analyzes what you enjoy watching and recommends similar helpful videos." }
    ]
  },

  {
    id: 2,
    level: 1,
    title: "2. AI in Everyday Life",
    subtitle: "Discover AI tools already inside your phone and home",
    icon: "📱",
    badge: "Daily AI Explorer",
    activityName: "Find AI in Daily Life",
    basics: "AI is not in the distant future — it is already woven into our daily routines. From smartphone cameras that make family photos clearer, to banking apps that send alerts for unusual card activity, AI makes everyday tasks faster and safer.",
    realLife: "When you open Amazon or Flipkart and it recommends items similar to what you purchased last month, or when YouTube suggests your favorite old songs, AI recommendation systems are at work.",
    quickSummary: "AI is already working around you in Google Maps route navigation, camera auto-focus, product recommendations, and digital banking.",
    steps: [
      { step: 1, title: "Face Recognition", text: "Unlocks your phone by scanning your face securely." },
      { step: 2, title: "Spam Protection", text: "Blocks unwanted lottery fraud calls and SMS automatically." },
      { step: 3, title: "Smart Search", text: "Finds answers even if you misspell words in Google." }
    ],
    activityType: "scene_spotter",
    activityData: {
      prompt: "Tap all the everyday items that use AI:",
      items: [
        { name: "Smartphone Face Unlock", isAI: true, icon: "🤳", desc: "Uses computer vision to verify your face." },
        { name: "Ordinary Tea Cup", isAI: false, icon: "☕", desc: "No electronics or computing." },
        { name: "Google Maps Navigation", isAI: true, icon: "🗺️", desc: "Predicts traffic jams using real-time road patterns." },
        { name: "Traditional Wooden Chair", isAI: false, icon: "🪑", desc: "A simple household furniture piece." },
        { name: "WhatsApp Voice Typing", isAI: true, icon: "🎙️", desc: "Converts your spoken voice into written text." }
      ]
    },
    quiz: [
      { q: "How does phone camera Portrait Mode blur the background?", options: ["AI detects the person and separates them from the background", "A tiny person paints the photo", "It only works under sunlight"], answer: 0, exp: "Camera AI identifies edges around people to create studio-quality portrait photos." }
    ]
  },

  {
    id: 3,
    level: 1,
    title: "3. Human Intelligence vs Artificial Intelligence",
    subtitle: "Understanding what computers can do and what only humans can feel",
    icon: "🧠",
    badge: "Smart Thinker Badge",
    activityName: "Human or AI?",
    basics: "Computers are lightning fast at calculations, remembering telephone directories, and scanning thousands of documents in seconds. However, humans have feelings, empathy, common sense, and real-world wisdom. AI cannot love, feel sad, or replace human relationships.",
    realLife: "A doctor uses medical AI to scan an X-ray in two seconds, but the human doctor uses their heart and medical experience to comfort the patient and explain the treatment kindly.",
    quickSummary: "Computers can compute and search faster, but human beings possess empathy, genuine creativity, moral conscience, and life wisdom.",
    steps: [
      { step: 1, title: "Speed & Memory", text: "AI wins at searching big data and fast math." },
      { step: 2, title: "Empathy & Morals", text: "Humans win at compassion, ethics, and care." },
      { step: 3, title: "Together", text: "AI assists humans so people can focus on what matters most." }
    ],
    activityType: "sorter_game",
    activityData: {
      prompt: "Who performs each task best? Match task to Human, AI, or Both:",
      tasks: [
        { task: "Comforting a crying family member with love", answer: "Human", reason: "Real emotions and love are unique to human beings." },
        { task: "Calculating 4,892 multiplied by 3,719 in 1 second", answer: "AI", reason: "Computers calculate massive numbers with instant accuracy." },
        { task: "Drafting an important official leave application", answer: "Both", reason: "AI drafts the translation quickly, and a human reviews it for natural tone." }
      ]
    },
    quiz: [
      { q: "Can an AI computer genuinely experience happiness or grief?", options: ["No, AI only calculates text and numbers without feelings", "Yes, AI has human emotions", "AI feels sad when turned off"], answer: 0, exp: "AI produces words mathematically; it has no consciousness or actual emotions." }
    ]
  },

  {
    id: 4,
    level: 1,
    title: "4. How AI Works: Input → Processing → Output",
    subtitle: "Demystifying the 3 steps of every intelligent system",
    icon: "⚙️",
    badge: "Logic Master",
    activityName: "How Does AI Work?",
    basics: "Every AI tool follows three simple steps: 1) Input (the question or photo you give it), 2) Processing (searching patterns and rules in its memory), and 3) Output (the helpful answer or picture it delivers to you).",
    realLife: "Think of ordering food at a restaurant: You give your order (Input), the kitchen cooks the recipe (Processing), and the waiter serves your hot meal (Output).",
    quickSummary: "AI operates on a 3-step cycle: Input (your prompt or photo) → Processing (smart analysis) → Output (helpful answer).",
    steps: [
      { step: 1, title: "1. Input", text: "You type 'Recipe for soft Idlis'." },
      { step: 2, title: "2. Processing", text: "AI reviews verified cooking recipes in its memory." },
      { step: 3, title: "3. Output", text: "AI lists ingredients, soaking times, and step-by-step instructions." }
    ],
    activityType: "order_steps",
    activityData: {
      stepsToOrder: [
        { id: "proc", name: "2. Processing: AI searches its trained knowledge base" },
        { id: "inp", name: "1. Input: You speak 'What is today's weather in Mysore?'" },
        { id: "out", name: "3. Output: Phone displays 'Sunny, 28°C with light breeze'" }
      ],
      correctOrder: ["inp", "proc", "out"]
    },
    quiz: [
      { q: "What is the 'Input' when using voice search?", options: ["Your spoken voice command into the microphone", "The smartphone battery", "The screen brightness"], answer: 0, exp: "Whatever information you provide to the AI is called the Input." }
    ]
  },

  {
    id: 5,
    level: 1,
    title: "5. Introduction to Popular AI Tools",
    subtitle: "Meet ChatGPT, Google Gemini, and Microsoft Copilot",
    icon: "🛠️",
    badge: "AI Tools Explorer",
    activityName: "Meet Your AI Assistant",
    basics: "Today, there are free, easy-to-use digital assistants available on your phone and computer. The most popular ones are ChatGPT (by OpenAI), Google Gemini (by Google), and Microsoft Copilot. They act like friendly, knowledgeable digital helpers ready to answer questions 24/7.",
    realLife: "Need ideas for a family function gift? Need a doctor's medical term explained in simple words? Need a draft for a housing society notice? These tools can help in seconds.",
    quickSummary: "AI tools like ChatGPT and Gemini are free digital assistants you can converse with using ordinary sentences.",
    steps: [
      { step: 1, title: "Google Gemini", text: "Integrated with Google Search, YouTube, and Google Docs." },
      { step: 2, title: "ChatGPT", text: "Excellent for drafting letters, learning topics, and conversation." },
      { step: 3, title: "Microsoft Copilot", text: "Assists with Word documents, Excel sheets, and Windows." }
    ],
    activityType: "match_tools",
    activityData: {
      tools: [
        { name: "Google Gemini", company: "Google", bestFor: "Connecting with Google Search, Maps, and YouTube" },
        { name: "ChatGPT", company: "OpenAI", bestFor: "Writing friendly letters, essays, and answering questions" },
        { name: "Microsoft Copilot", company: "Microsoft", bestFor: "Helping inside Office programs like Word and Excel" }
      ]
    },
    quiz: [
      { q: "Do you need to pay money to try basic AI assistants like ChatGPT or Gemini?", options: ["No, they offer free access for everyday questions", "Yes, everyone must pay monthly fees", "Only banks can access them"], answer: 0, exp: "Popular AI tools provide free basic versions for everyday learners and families." }
    ]
  },

  // ----------------------------------------------------
  // LEVEL 2: START USING AI (Lessons 6 to 10)
  // ----------------------------------------------------
  {
    id: 6,
    level: 2,
    title: "6. Introduction to ChatGPT",
    subtitle: "How to open a chat, ask questions, and read replies",
    icon: "💬",
    badge: "Chat Explorer",
    activityName: "Chat with AI",
    basics: "Using ChatGPT is just like chatting with a friend on WhatsApp. You type a message or question in the box at the bottom, tap the Send arrow, and the assistant replies in clear sentences within seconds. You can ask follow-up questions anytime.",
    realLife: "You can ask: 'What are five healthy breakfast ideas for a person with mild diabetes?' and receive a practical, organized list immediately.",
    quickSummary: "Using ChatGPT is as simple as chatting on WhatsApp: type your question in ordinary language, and receive instant, easy-to-read explanations.",
    steps: [
      { step: 1, title: "Open the Chat", text: "Visit chatgpt.com or open the phone app." },
      { step: 2, title: "Type Naturally", text: "Write your question just like talking to a helpful friend." },
      { step: 3, title: "Read & Follow Up", text: "Ask 'Can you explain step 2 more simply?' if needed." }
    ],
    activityType: "simulated_chat",
    activityData: {
      botName: "Friendly AI Assistant",
      suggestedQuestions: [
        "How can I grow fresh coriander at home in small pots?",
        "What are simple exercises for knee pain for adults over 40?",
        "Write a 2-line polite birthday wish for my neighbor."
      ],
      presetAnswers: {
        "How can I grow fresh coriander at home in small pots?": "To grow coriander at home:\n1. Take coriander seeds (dhaniya) and gently crush them into two halves.\n2. Fill a pot with loose, well-draining soil mixed with compost.\n3. Sprinkle the split seeds and cover with 1/2 inch of soil.\n4. Water gently daily so the soil stays moist, and place in partial sunlight.\n🌿 Fresh green leaves will sprout within 10 to 14 days!",
        "What are simple exercises for knee pain for adults over 40?": "Here are 3 gentle, safe knee exercises:\n1. Straight Leg Raises: Lie on your back, bend one knee, and raise the other leg 12 inches up. Hold for 5 seconds.\n2. Seated Knee Extensions: Sit on a sturdy chair and slowly straighten one leg outward, hold, then lower.\n3. Ankle Pumps: Move your feet up and down to boost blood circulation.\n⚠️ Note: Always move gently without strain and consult your family doctor before new routines.",
        "Write a 2-line polite birthday wish for my neighbor.": "Wishing you a very Happy Birthday! May God bless you and your family with good health, peace, and happiness in the coming year. 🌸🎂"
      }
    },
    quiz: [
      { q: "Can you ask follow-up questions if you don't understand the first answer?", options: ["Yes, you can ask it to explain again in simpler words", "No, you only get one question per day", "The computer locks if you ask again"], answer: 0, exp: "AI assistants remember the ongoing chat context and love helping you clarify things." }
    ]
  },

  {
    id: 7,
    level: 2,
    title: "7. How to Write Good AI Prompts",
    subtitle: "Giving clear instructions to get the exact answer you want",
    icon: "✍️",
    badge: "Prompt Master",
    activityName: "Prompt Writing Challenge",
    basics: "The instruction you give to an AI is called a 'Prompt'. The clearer and more specific you are, the better the answer will be. Instead of writing just one word like 'Garden', write: 'Give 3 easy tips to grow rose plants in pots in Bangalore weather.'",
    realLife: "Think of asking an auto driver: If you just say 'Go', they don't know where to turn. But if you say 'Please take me to Jayanagar 4th Block via Main Road', you reach smoothly.",
    quickSummary: "A prompt is your instruction to AI. The clearer and more specific you are about context, role, and format, the better your answer will be.",
    steps: [
      { step: 1, title: "Be Specific", text: "Mention who it is for, where, and what details matter." },
      { step: 2, title: "Mention Format", text: "Ask for a 'bulleted list', 'short paragraph', or 'table'." },
      { step: 3, title: "Specify Language", text: "Add 'in simple English' or 'summarize in 3 bullet points'." }
    ],
    activityType: "prompt_upgrade",
    activityData: {
      weakPrompt: "Diet food",
      options: [
        { text: "Food recipes", quality: "Poor", reason: "Too short and vague." },
        { text: "Diet chart for weight loss", quality: "Fair", reason: "Better, but still missing age and dietary preference." },
        { text: "Suggest a 3-day South Indian vegetarian lunch plan for a 50-year-old with low sugar and high protein", quality: "Excellent", isBest: true, reason: "Perfect! Specifies diet type, age, health goal, and regional cuisine!" }
      ]
    },
    quiz: [
      { q: "Why is a specific prompt better than a vague one-word question?", options: ["It helps AI understand your exact situation and give tailored guidance", "Computers reject short words", "It uses more electricity"], answer: 0, exp: "Clear context produces far more accurate and practically useful answers." }
    ]
  },

  {
    id: 8,
    level: 2,
    title: "8. AI for Writing: Letters, Emails & Applications",
    subtitle: "Draft official letters, leave notes, and society notices effortlessly",
    icon: "✉️",
    badge: "Writing Assistant",
    activityName: "Letter Writing Practice",
    basics: "Many adults find drafting formal English letters or emails stressful. With AI, you can describe your situation in simple words, and it will format a polite, professional letter with proper dates, salutations, and closing remarks in seconds.",
    realLife: "Situation: You need to take 2 days off from work for a family wedding. You tell AI: 'Write a 2-day leave application for my office manager', and receive a complete, ready-to-use letter.",
    quickSummary: "AI drafts professional leave applications, formal emails, and complaint letters in seconds—you simply review and add your personal details.",
    steps: [
      { step: 1, title: "State Your Need", text: "Tell AI the reason, dates, and recipient." },
      { step: 2, title: "Review Draft", text: "Check your name, dates, and key details." },
      { step: 3, title: "Copy & Send", text: "Copy the clean text and send via email or print." }
    ],
    activityType: "letter_builder",
    activityData: {
      templateTypes: [
        { id: "leave", name: "2-Day Office Leave Application", samplePrompt: "Write a polite leave letter for 2 days due to a family ceremony." },
        { id: "bank", name: "Bank Request for New Cheque Book", samplePrompt: "Draft a letter to the Branch Manager requesting a 25-leaf cheque book." },
        { id: "society", name: "Apartment Maintenance Complaint", samplePrompt: "Write a letter to apartment association regarding water leakage in parking." }
      ],
      sampleOutput: {
        leave: "To,\nThe Manager,\n[Company / Office Name],\nBangalore.\n\nSubject: Application for 2 Days Leave\n\nRespected Sir/Madam,\n\nI am writing to formally request leave for two days, from [Start Date] to [End Date], due to an important family ceremony that requires my presence at home.\n\nI have delegated my urgent daily tasks to my colleague [Colleague Name], and I will be reachable on my phone for any urgent queries.\n\nThank you for your kind understanding.\n\nYours sincerely,\n[Your Name]\n[Contact Number]",
        bank: "To,\nThe Branch Manager,\nState Bank of India,\n[Branch Name].\n\nSubject: Request for Issuance of New Cheque Book - A/C [Your Account Number]\n\nDear Sir/Madam,\n\nI hold a Savings Bank Account with your branch under Account No. [XXXXX]. I have exhausted my previous cheque book and kindly request you to issue a new 25-leaf cheque book for my account.\n\nPlease find my account details enclosed for your verification.\n\nThank you.\n\nYours faithfully,\n[Your Name]",
        society: "To,\nThe President / Secretary,\nResidents Welfare Association,\n[Apartment Name].\n\nSubject: Notice regarding Water Leakage in Basement Parking\n\nDear Committee Members,\n\nI would like to bring to your kind attention a persistent water leakage near parking slot B-14 in the basement area. The standing water is causing slipperiness and may damage parked vehicles.\n\nI request the maintenance team to inspect and fix the pipe joint at the earliest.\n\nThank you for your prompt attention.\n\nWarm regards,\nFlat 304 Resident"
      }
    },
    quiz: [
      { q: "Should you always read and verify dates and names in an AI-written letter before sending?", options: ["Yes, always verify your personal details, dates, and names", "No, send blindly without reading", "AI never needs human checking"], answer: 0, exp: "Always review AI drafts to ensure dates, names, and account numbers are 100% accurate." }
    ]
  },

  {
    id: 9,
    level: 2,
    title: "9. AI for Learning: Learn Anything at Any Age",
    subtitle: "Your patient, 24/7 personal tutor for English, health, and hobbies",
    icon: "📖",
    badge: "Lifelong Learner",
    activityName: "Learning Partner",
    basics: "Learning doesn't stop after school or college. Whether you want to improve your conversational English, understand how fixed deposits earn compound interest, or learn home gardening, AI explains things patiently without judging you.",
    realLife: "You can ask: 'Explain the difference between Savings Account and Fixed Deposit like I am a 10-year-old', and learn complex financial concepts in two minutes.",
    quickSummary: "Use AI as your patient, private tutor. Ask it to 'explain like I am a beginner' to learn any topic or language at your own comfortable pace.",
    steps: [
      { step: 1, title: "Choose a Topic", text: "Pick something you always wanted to understand." },
      { step: 2, title: "Ask for Simplicity", text: "Add 'Use simple everyday examples'." },
      { step: 3, title: "Test Yourself", text: "Ask AI to quiz you with two fun questions." }
    ],
    activityType: "tutor_sim",
    activityData: {
      topics: [
        { id: "fd", title: "Fixed Deposit vs Mutual Funds", explanation: "Fixed Deposit is like keeping your money in a locked steel safe: guaranteed safe interest, zero risk. Mutual Funds are like planting mango trees: they can yield more over time, but weather (market fluctuation) affects them." },
        { id: "eng", title: "Common English Phrases for Travel", explanation: "1. 'Could you please direct me to Platform 2?'\n2. 'How much is the fare to MG Road?'\n3. 'Where can I find drinking water nearby?'" },
        { id: "health", title: "What is Blood Pressure (BP)?", explanation: "Think of BP like water flowing through a garden pipe. When water pressure is normal, the pipe stays healthy. When pressure is too high for a long time, it strains the pipe walls (blood vessels)." }
      ]
    },
    quiz: [
      { q: "Can AI explain complicated concepts using simple everyday analogies?", options: ["Yes, AI excels at using real-world comparisons to make learning easy", "No, AI only uses heavy engineering formulas", "AI cannot explain anything simply"], answer: 0, exp: "AI can adjust its tone to explain anything in warm, accessible everyday language." }
    ]
  },

  {
    id: 10,
    level: 2,
    title: "10. AI for Language Translation & Simplification",
    subtitle: "Translate difficult notices and complex English into simple, everyday language",
    icon: "🌐",
    badge: "Language Bridge",
    activityName: "Language Translator",
    basics: "Language and complicated jargon should never be a barrier to understanding information. AI tools can translate formal government notices, medical reports, and legal circulars into clear, simple plain English that anyone can understand immediately.",
    realLife: "Received a complicated legal notice or municipal circular? Paste it into the AI and ask: 'Translate this into simple, plain English in three bullet points.'",
    quickSummary: "AI translates and simplifies dense bureaucratic circulars, medical advice, and legal notices into clear, plain everyday English.",
    steps: [
      { step: 1, title: "Paste the Notice", text: "Copy the complex official circular or notice into the AI." },
      { step: 2, title: "Request Simplification", text: "Ask AI: 'Explain this in plain, simple English for a non-expert.'" },
      { step: 3, title: "Review Action Points", text: "Read the clear summary and take confident action." }
    ],
    activityType: "translator_sandbox",
    activityData: {
      presetTranslations: [
        {
          source: "Municipal Electricity & Water Undertaking: Please be apprised that scheduled transmission pipeline maintenance will necessitate temporary suspension of services on Saturday between 09:00 hrs and 17:00 hrs.",
          simpleEnglish: "Notice: Electricity and water will be turned off this Saturday from 9:00 AM to 5:00 PM for scheduled repair work. Please store enough water and charge your devices beforehand.",
          bulletSummary: "• Reason: Pipeline & electrical grid maintenance\\n• When: This Saturday (9:00 AM – 5:00 PM)\\n• Affected: Electricity and municipal water\\n• Action Required: Store drinking water and complete tasks early"
        },
        {
          source: "Banking establishments shall remain non-operational on the second and fourth Saturdays of each calendar month pursuant to statutory regulatory guidelines.",
          simpleEnglish: "Notice: Bank branches will be closed on the 2nd and 4th Saturdays of every month. Online net banking and ATMs remain active 24/7.",
          bulletSummary: "• Status: Bank branches closed\\n• Days: 2nd and 4th Saturdays of every month\\n• Available: ATM cash withdrawals & mobile banking app"
        },
        {
          source: "Hydration maintenance and mandatory physical repose are strongly indicated post-administration of pharmaceutical therapeutics.",
          simpleEnglish: "Medical Advice: Drink plenty of warm water and get good rest after taking your prescribed medicines.",
          bulletSummary: "• Recommendation: Drink plenty of warm water\\n• Requirement: Take adequate rest\\n• Timing: Immediately following your prescribed medicines"
        }
      ]
    },
    quiz: [
      { q: "How does AI help when you receive a complicated official circular in English?", options: ["It translates and simplifies dense jargon into plain, clear English", "It deletes the circular permanently", "It automatically pays your bills without checking"], answer: 0, exp: "AI breaks down dense administrative vocabulary into simple everyday English so you understand exactly what to do." }
    ]
  },

  // ----------------------------------------------------
  // LEVEL 3: AI IN DAILY LIFE (Lessons 11 to 15)
  // ----------------------------------------------------
  {
    id: 11,
    level: 3,
    title: "11. AI for Smart Daily Planning & Organization",
    subtitle: "Organize daily medicines, walking routines, and errands with AI assistance",
    icon: "📅",
    badge: "Smart Organizer",
    activityName: "Daily Schedule Builder",
    basics: "Managing multiple daily activities—taking medications on time, scheduling bank visits, planning grocery shopping, and remembering family calls—can be overwhelming. AI assistants can help organize your day into a smooth, stress-free schedule customized for your health and personal pace.",
    realLife: "Tell AI: 'I am a 65-year-old senior. I have morning BP medicine, an afternoon bank errand, and evening walking. Plan a gentle, comfortable daily schedule for me.' AI instantly designs a balanced routine with rest periods.",
    quickSummary: "AI helps you create balanced, organized daily schedules for medicines, health routines, and appointments without stress.",
    steps: [
      { step: 1, title: "List Your Routine", text: "Note your medicines, walking habits, and errands." },
      { step: 2, title: "Ask for Balance", text: "Ask AI for a gentle senior routine with rest breaks." },
      { step: 3, title: "Follow with Ease", text: "Keep a clear, timed agenda for a stress-free day." }
    ],
    activityType: "planner_sim",
    activityData: {
      templates: [
        {
          title: "Senior Wellness & Medicine Day Plan",
          schedule: "• 06:30 AM: Fresh air morning walk & warm water\n• 08:00 AM: Soft high-fiber breakfast\n• 08:30 AM: Morning BP / Diabetes medicine\n• 10:30 AM: Low-rush hours for bank / market errand\n• 01:00 PM: Light lunch & afternoon rest\n• 05:30 PM: Temple visit / garden conversation\n• 08:00 PM: Light dinner & evening medicine\n• 09:30 PM: Restful sleep routine"
        },
        {
          title: "Bank & Errand Day Schedule",
          schedule: "• 08:00 AM: Breakfast and medication\n• 10:00 AM: Visit Bank branch during morning senior counter hours\n• 11:30 AM: Grocery / Pharmacy stop on way home\n• 01:00 PM: Lunch & hydration\n• 02:00 PM: Rest and relax\n• 06:00 PM: Evening tea and family call"
        }
      ]
    },
    quiz: [
      { q: "How can AI help with daily routines for senior citizens?", options: ["By preparing a balanced schedule with timely medicine reminders and rest breaks", "By forcing you to walk 20 kilometers every morning", "By deleting your calendar"], answer: 0, exp: "AI creates personalized schedules tailored to your comfort, health needs, and daily pace." }
    ]
  },

  {
    id: 12,
    level: 3,
    title: "12. AI for Images and Creativity",
    subtitle: "Design festival cards, family greetings, and invitations easily",
    icon: "🎨",
    badge: "Creative Designer",
    activityName: "Creative Design Studio",
    basics: "AI can generate custom festival cards, birthday greetings, and posters from simple descriptions. You don't need photo editing software or Photoshop; you just describe what you want, and AI paints the image for you.",
    realLife: "For Deepavali or Ugadi, instead of forwarding the same generic WhatsApp image that 50 other people shared, you can generate a personalized card: 'A warm oil lamp with flowers and my family name: The Kondli Family'.",
    quickSummary: "Create customized festival greeting cards, birthday wishes, and family celebration invitations with attractive visuals and warm messages.",
    steps: [
      { step: 1, title: "Describe the Image", text: "E.g. 'A festive golden diya with marigold flowers'." },
      { step: 2, title: "AI Generates Visual", text: "Computer creates realistic artwork in seconds." },
      { step: 3, title: "Share with Loved Ones", text: "Download and share on WhatsApp or print." }
    ],
    activityType: "card_creator",
    activityData: {
      occasions: ["Deepavali Greetings 🪔", "Ugadi / New Year 🌾", "Birthday Wish 🎂", "Housewarming Invitation 🏡"],
      sampleDesigns: {
        "Deepavali Greetings 🪔": { visual: "🪔✨🌺", title: "Happy Deepavali!", message: "May the divine lights illuminate your life with health, wealth, and joy! - From Our Family to Yours." },
        "Ugadi / New Year 🌾": { visual: "🥭🍃🌸", title: "Ugadi Subhakankshalu / Habba Habbada Shubhashayagalu!", message: "May this New Year bring sweet moments and prosperous beginnings!" },
        "Birthday Wish 🎂": { visual: "🎂🎈⭐", title: "Happy Birthday!", message: "Wishing you a blessed year filled with good health, laughter, and peace." },
        "Housewarming Invitation 🏡": { visual: "🏡🪴🌼", title: "Gruhapravesha Invitation", message: "We cordially invite you and your family to join us as we step into our new home." }
      }
    },
    quiz: [
      { q: "Can you create personalized greeting cards using AI image tools?", options: ["Yes, by describing the flowers, occasion, and your family name", "No, computers can never create pictures", "Only graphic designers can make greetings"], answer: 0, exp: "AI image generators allow anyone to create unique greeting cards in seconds." }
    ]
  },

  {
    id: 13,
    level: 3,
    title: "13. AI for Documents: Summaries & Organization",
    subtitle: "Read long 20-page papers, insurance terms, and manuals in 2 minutes",
    icon: "📄",
    badge: "Document Detective",
    activityName: "Document Detective",
    basics: "Reading 20 pages of insurance policy terms or a long government circular can cause eye strain and confusion. AI can read long documents and give you a simple 5-bullet summary highlighting only what is truly important for you.",
    realLife: "Bought a new home appliance? Instead of reading a 50-page manual in tiny print, paste the text into an AI tool and ask: 'What are the 3 key safety steps to operate this washing machine?'",
    quickSummary: "Paste long insurance policies, utility bills, or agreement clauses into AI to get an instant bullet-point summary of key terms and dates.",
    steps: [
      { step: 1, title: "Upload or Paste", text: "Share the text of the long document." },
      { step: 2, title: "Ask for Summary", text: "Request: 'Summarize key points in 4 bullet points in simple words'." },
      { step: 3, title: "Quick Understanding", text: "Save hours of reading and understand critical rules." }
    ],
    activityType: "doc_summary",
    activityData: {
      docTitle: "Sample Health Insurance Policy - Room Rent & Claim Clause",
      fullText: "Clause 4.2: The insured person is entitled to room boarding expenses up to 1% of the Sum Insured per day. In the event of ICU admission, the coverage is capped at 2% of the Sum Insured per day. Pre-hospitalization expenses incurred 30 days prior to admission and post-hospitalization expenses up to 60 days post-discharge are reimbursable upon submission of original pharmacy bills and discharge summary within 15 days.",
      summaryPoints: [
        "🏥 Room Rent Limit: Up to 1% of your total policy amount per day.",
        "🚨 ICU Limit: Up to 2% of policy amount per day.",
        "💊 Medicine Bills: Covered for 30 days before hospital and 60 days after discharge.",
        "⏰ Deadline: Submit original bills within 15 days of discharge."
      ]
    },
    quiz: [
      { q: "How does AI help when facing a long, complicated legal or insurance document?", options: ["It extracts the most crucial points into simple, readable bullet points", "It deletes the document", "It makes the document longer"], answer: 0, exp: "AI document summarizers save hours of time and help you avoid missing critical clauses." }
    ]
  },

  {
    id: 14,
    level: 3,
    title: "14. AI for Work & Small Business",
    subtitle: "Grow your shop, home business, catering, or boutique with AI",
    icon: "💼",
    badge: "Business Helper",
    activityName: "Smart Business Helper",
    basics: "Many adults run small businesses, home bakeries, tailoring boutiques, catering services, or consulting practices. AI can write attractive product descriptions, festive promotional WhatsApp messages, and professional replies to customer inquiries.",
    realLife: "Running a homemade pickle or masala business? AI can craft an attractive WhatsApp catalog message: 'Fresh traditional Mango & Lemon pickles made with pure groundnut oil — Order now for festival delivery!'",
    quickSummary: "Boost small businesses, home boutiques, and local services by generating attractive WhatsApp product descriptions, flyers, and sales offers.",
    steps: [
      { step: 1, title: "Detail Your Product", text: "Mention item, price, specialty, and contact." },
      { step: 2, title: "Ask for Catchy Post", text: "Request an appealing WhatsApp festival broadcast." },
      { step: 3, title: "Share & Grow", text: "Send to customer groups and receive orders." }
    ],
    activityType: "biz_post_maker",
    activityData: {
      businesses: [
        { type: "Traditional Homemade Sweets & Snacks", samplePost: "🪔 Fresh Festive Delights from Our Home Kitchen! 🪔\nMade with 100% pure ghee & traditional recipes: Mysore Pak, Coconut Ladoo, Crispy Murukku!\n✨ Zero preservatives, hygienic packing.\n📦 Pre-orders open for family functions. Call/WhatsApp: [Your Number]" },
        { type: "Tailoring & Boutique Services", samplePost: "👗 Expert Designer Blouses & Dress Stitching! 👗\nPerfect fitting, bridal embroidery, and quick 3-day delivery.\n📍 Visit us near [Your Area]. Message for sample designs!" },
        { type: "Organic Vegetables from Farm", samplePost: "🥦 Farm Fresh Vegetables Delivered to Your Doorstep! 🥕\nHarvested this morning, pesticide-free, directly from our farm.\n🥬 Fresh Greens, Country Tomatoes, Carrots available. Order today!" }
      ]
    },
    quiz: [
      { q: "Can a small home business use AI to write marketing messages?", options: ["Yes, AI helps create polite, attractive promotional messages for WhatsApp", "No, marketing is only for big corporations", "AI is forbidden for shops"], answer: 0, exp: "Small businesses benefit tremendously from free AI tools to look professional and communicate clearly." }
    ]
  },

  {
    id: 15,
    level: 3,
    title: "15. AI for Personal Productivity & Daily Planning",
    subtitle: "Organize medical appointments, travel schedules, and family budgets",
    icon: "📅",
    badge: "Productivity Master",
    activityName: "Daily Planner Challenge",
    basics: "Managing household duties, doctor appointments, banking chores, and social visits can get overwhelming. AI can arrange your chaotic list of errands into a realistic, step-by-step daily schedule that minimizes travel and saves petrol and time.",
    realLife: "Give AI your errands: 'I have to visit bank, buy vegetables, take mother to eye clinic at 4 PM, and attend wedding reception at 7 PM'. AI will organize them in logical order with realistic travel buffers.",
    quickSummary: "Organize your day smoothly by asking AI to plan balanced schedules for doctor visits, bank errands, exercise, and household chores.",
    steps: [
      { step: 1, title: "List Your Tasks", text: "Write everything you need to do in any order." },
      { step: 2, title: "AI Organizes Timings", text: "Arranges tasks based on geography and open hours." },
      { step: 3, title: "Stress-Free Day", text: "Follow the checklist and check off tasks as done." }
    ],
    activityType: "daily_planner",
    activityData: {
      sampleTasks: ["Visit Bank for Passbook Update (Morning)", "Buy Fresh Veggies at Market", "Dr. Eye Checkup (Booked at 4:30 PM)", "Attend Family Wedding Reception (7:30 PM)"],
      optimizedSchedule: [
        { time: "10:30 AM – 11:30 AM", task: "🏦 State Bank visit (Early morning crowd is lowest)." },
        { time: "11:45 AM – 12:30 PM", task: "🥦 Nearby market shopping (Buy vegetables on return route)." },
        { time: "01:00 PM – 03:30 PM", task: "🍽️ Lunch, rest, and medicine at home." },
        { time: "04:15 PM – 05:45 PM", task: "👁️ Eye Clinic appointment with Mother." },
        { time: "07:00 PM – 09:00 PM", task: "💐 Attend Wedding Reception dressed and refreshed." }
      ]
    },
    quiz: [
      { q: "How can AI reduce stress when you have many errands in one day?", options: ["By sorting errands into an orderly timeline so you don't rush or forget anything", "By doing the physical walking for you", "By cancelling all your appointments"], answer: 0, exp: "A structured timeline helps you move through your day calmly and on schedule." }
    ]
  },

  // ----------------------------------------------------
  // LEVEL 4: SMART & SAFE AI USER (Lessons 16 to 20)
  // ----------------------------------------------------
  {
    id: 16,
    level: 4,
    title: "16. AI in Banking & Financial Safety",
    subtitle: "How AI protects your money and how to spot digital fraud",
    icon: "💳",
    badge: "Banking Guard",
    activityName: "Banking Safety Detective",
    basics: "Banks use AI 24 hours a day to protect your savings. If your debit card is suddenly swiped in another country or an unusually large transfer is initiated at 3:00 AM, bank AI flags the fraud and sends an immediate SMS verification alert to your phone.",
    realLife: "Scammers sometimes use AI to create fake bank SMS messages like: 'Your electricity/bank KYC will be blocked tonight, click link to update'. Real banks never ask for OTP or passwords via links.",
    quickSummary: "Protect your savings by learning how AI detects suspicious account activity, and always remember to never share bank OTPs or PINs.",
    steps: [
      { step: 1, title: "Never Share OTP", text: "No real bank official will ever ask for your OTP or PIN." },
      { step: 2, title: "Never Click Urgency Links", text: "Don't click links claiming 'Account will be closed in 2 hours'." },
      { step: 3, title: "Call Official Helpline", text: "When in doubt, call the phone number printed behind your ATM card." }
    ],
    activityType: "scam_detector",
    activityData: {
      cases: [
        {
          sender: "SMS from unknown mobile (+91 98321XXXXX)",
          message: "Dear Customer, your SBI account KYC is expired. Your account will be blocked in 24 hours. Click here to verify: bit.ly/sbi-kyc-update",
          isScam: true,
          explanation: "🚨 FRAUD ALERT! Banks never send KYC links from personal 10-digit mobile numbers or use shortened bit.ly links! Never click!"
        },
        {
          sender: "Official Bank Sender ID (VM-SBIINB)",
          message: "Your A/C ending 4821 has been credited with Rs. 15,000 via NEFT on 15-Nov. Available Balance: Rs. 42,300. Call 1800112211 for queries.",
          isScam: false,
          explanation: "✅ Legitimate bank credit alert. It does not ask you to enter any password or click strange links."
        },
        {
          sender: "WhatsApp Message from stranger with bank logo DP",
          message: "Hello sir, I am from customer support. Please share the 6-digit OTP received on your phone so I can refund your excess electricity charges.",
          isScam: true,
          explanation: "🚨 FRAUD ALERT! NEVER share your OTP with anyone, even if they claim to be a bank manager or police officer!"
        }
      ]
    },
    quiz: [
      { q: "A caller claiming to be a bank officer asks for your 6-digit OTP to unblock your card. What should you do?", options: ["Refuse immediately and hang up; never share your OTP", "Give the OTP quickly", "Share your ATM card PIN as well"], answer: 0, exp: "Your OTP is your private key. Legitimate bank systems never require you to speak your OTP." }
    ]
  },

  {
    id: 17,
    level: 4,
    title: "17. AI in Healthcare: Information without Self-Medication",
    subtitle: "Understanding medical reports without panicking or diagnosing yourself",
    icon: "🏥",
    badge: "Health Info Champion",
    activityName: "Healthcare Information Helper",
    basics: "Medical lab reports often contain confusing Latin and technical terms like 'Triglycerides', 'Erythrocytes', or 'Creatinine'. AI can explain what these terms mean in simple everyday English so you can ask informed questions when you visit your doctor.",
    realLife: "IMPORTANT RULE: AI is a helpful encyclopedia, NOT your doctor. Never start or stop prescription blood pressure, thyroid, or diabetes medicines based on AI. Always consult your qualified family doctor.",
    quickSummary: "AI helps translate confusing medical lab terms into plain English so you are better informed, while actual diagnosis and medicines come from your doctor.",
    steps: [
      { step: 1, title: "Understand Terms", text: "Ask AI: 'What does HbA1c mean in a diabetes blood test?'" },
      { step: 2, title: "Prepare Questions", text: "Write down 2 questions to ask your physician during your clinic visit." },
      { step: 3, title: "Trust Your Doctor", text: "Follow your human doctor's physical diagnosis and dosage." }
    ],
    activityType: "health_explainer",
    activityData: {
      terms: [
        { term: "HbA1c Blood Test", whatItIs: "Measures average blood sugar over the past 3 months. Like a report card of your sugar control, not just today's breakfast." },
        { term: "Lipid Profile / Cholesterol", whatItIs: "Measures good (HDL) and bad (LDL) fats in the blood to help doctors check heart vessel health." },
        { term: "Thyroid Stimulating Hormone (TSH)", whatItIs: "A hormone made by your brain's pituitary gland that tells your thyroid how fast your body should use energy." }
      ]
    },
    quiz: [
      { q: "Should you ever change your prescription medicine dosage based only on an AI chat?", options: ["No, always consult your qualified human doctor before changing any medicine", "Yes, computer knows best", "Stop all medicines immediately"], answer: 0, exp: "AI provides educational information only; real medical treatment requires a licensed doctor's examination." }
    ]
  },

  {
    id: 18,
    level: 4,
    title: "18. AI in Agriculture & Farming Decisions",
    subtitle: "How smart technology assists farmers with rain, soil, and crop pests",
    icon: "🌾",
    badge: "Smart Farmer",
    activityName: "Smart Farmer Challenge",
    basics: "Agriculture is the backbone of our country. AI is now helping farmers by analyzing satellite weather data, predicting unseasonal rainfall, and identifying leaf diseases from simple smartphone photos taken in the field.",
    realLife: "A farmer notices yellow spots on tomato leaves. They snap a photo using a farmer smartphone app (like Plantix). The AI recognizes the fungus and suggests organic neem-based spray solutions before the crop is ruined.",
    quickSummary: "AI assists agriculture with accurate weather forecasts, pest identification from crop photos, and timely irrigation recommendations.",
    steps: [
      { step: 1, title: "Photo of Plant", text: "Take a clear picture of the affected leaf." },
      { step: 2, title: "AI Disease Scan", text: "Compares against thousands of known crop diseases." },
      { step: 3, title: "Actionable Advice", text: "Suggests the right fertilizer or bio-pesticide timing." }
    ],
    activityType: "farmer_scenario",
    activityData: {
      situation: "A farmer in Mandya plans to spray pesticide on their paddy crop tomorrow, but the weather forecast AI indicates a 90% chance of heavy thunderstorm tomorrow afternoon.",
      question: "What is the smartest decision based on the AI weather alert?",
      options: [
        { text: "Spray pesticide tomorrow morning anyway", isCorrect: false, reason: "The heavy afternoon rain will wash away all the expensive pesticide, wasting money!" },
        { text: "Postpone spraying until after the rain passes", isCorrect: true, reason: "Correct! Waiting saves the expensive pesticide from being washed away and keeps the medicine effective." },
        { text: "Double the pesticide dose", isCorrect: false, reason: "Excessive chemicals harm the soil and crop." }
      ]
    },
    quiz: [
      { q: "How can satellite AI weather alerts save money for farmers?", options: ["By preventing pesticide and fertilizer from getting washed away by unexpected rain", "By watering the entire field automatically", "By changing the weather"], answer: 0, exp: "Timely rain alerts prevent wasted agricultural chemicals and protect farmer investments." }
    ]
  },

  {
    id: 19,
    level: 4,
    title: "19. AI Safety, Deepfakes & Cybersecurity",
    subtitle: "Recognize fake AI voice calls, video scams, and protect family privacy",
    icon: "🛡️",
    badge: "Cyber Sentinel",
    activityName: "Safe or Unsafe AI?",
    basics: "AI can now clone voices or create realistic fake videos ('Deepfakes'). Scammers sometimes call parents pretending to be their son or daughter in distress asking for urgent money transfers. Learning digital caution protects you and your family.",
    realLife: "If you receive a strange emergency phone call asking for urgent Google Pay transfer, do NOT panic. Hang up immediately and dial your child or relative's personal number directly to verify.",
    quickSummary: "Stay safe online: verify suspicious messages, guard personal photos, recognize AI voice/video deepfakes, and report cyber scams quickly.",
    steps: [
      { step: 1, title: "Pause and Breathe", text: "Scammers create false panic so you act without thinking." },
      { step: 2, title: "Independent Verification", text: "Call your family member directly on their known phone number." },
      { step: 3, title: "Family Safe Word", text: "Create a private secret word known only to your immediate family." }
    ],
    activityType: "safety_auditor",
    activityData: {
      situations: [
        { text: "You receive an urgent voice note from your nephew asking for ₹20,000 transfer immediately because of an accident, but the voice sounds slightly robotic.", safeAction: "Hang up and call the nephew or his parents on their direct number to confirm.", isSafe: false, tip: "Voice cloning is used by scammers. Always verify directly!" },
        { text: "A website asks for your Aadhaar card photo to download a free recipe book.", safeAction: "Never upload government ID cards for trivial downloads.", isSafe: false, tip: "Never share identity documents on unfamiliar websites." },
        { text: "Using ChatGPT to write a polite leave application for office.", safeAction: "Safe and useful! Just avoid putting secret passwords in the prompt.", isSafe: true, tip: "Everyday writing with AI is safe and helpful." }
      ]
    },
    quiz: [
      { q: "What should you do if an unknown caller creates panic claiming a family member is in trouble and demands immediate money?", options: ["Pause, hang up, and call your family member directly on their known number", "Send the money immediately via UPI", "Share your bank password"], answer: 0, exp: "Always verify independently. Scammers rely on panic to prevent you from checking facts." }
    ]
  },

  {
    id: 20,
    level: 4,
    title: "20. The Future of AI in Our World",
    subtitle: "How AI will shape future generations and how you can stay confident",
    icon: "🚀",
    badge: "AI Graduate Badge",
    activityName: "Future of AI Quiz",
    basics: "Artificial Intelligence is not here to replace humans — it is here to be a capable tool for people who learn to use it. Just like smartphones and the internet became part of everyday life over the past 20 years, AI is becoming a helpful assistant that makes work, healthcare, and education easier for everyone.",
    realLife: "By learning these 20 lessons, you are no longer a stranger to AI. You can guide your children and grandchildren, use smart tools with confidence, and protect your digital privacy.",
    quickSummary: "Approach the future with confidence: AI is a powerful assistant that complements human intelligence, creating new opportunities to learn and thrive.",
    steps: [
      { step: 1, title: "Stay Curious", text: "Don't fear new tools; explore them with common sense." },
      { step: 2, title: "Verify Facts", text: "Remember that AI is an assistant; human wisdom is the ultimate guide." },
      { step: 3, title: "Share Knowledge", text: "Help friends and elders in your community navigate the digital world safely." }
    ],
    activityType: "future_reflection",
    activityData: {
      reflectionQuestion: "What is the best mindset for adults aged 35+ regarding Artificial Intelligence?",
      options: [
        { text: "Avoid all technology and turn off smartphones completely", isCorrect: false, reason: "Avoiding technology closes doors to many convenient services." },
        { text: "Embrace AI as a helpful assistant while keeping personal security and common sense first", isCorrect: true, reason: "Spot on! Technology serves us best when paired with human judgment and safety." },
        { text: "Believe everything AI generates without ever verifying", isCorrect: false, reason: "AI can make factual errors; human review is always essential." }
      ]
    },
    quiz: [
      { q: "Who is in control when using Artificial Intelligence tools?", options: ["You are in control — you decide what to ask, what to use, and what to verify", "The computer controls your life", "Only large tech companies"], answer: 0, exp: "AI is an instrument in your hands. Your wisdom, decisions, and values always lead the way!" }
    ]
  }
];
