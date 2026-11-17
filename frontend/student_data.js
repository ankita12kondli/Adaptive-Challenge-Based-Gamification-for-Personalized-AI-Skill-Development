// ========================================================
// SkillSpring AI - College AI Learning Hub (30 Topics, 5 Levels)
// Complete Data Catalog & Rigorous Learning Activities
// Designed for Computer Science & Engineering Undergraduates
// ========================================================

const COLLEGE_LEVELS_META = [
  {
    "level": 1,
    "name": "Level 1: AI Fundamentals",
    "range": "Topics 1\u20137",
    "color": "#2563eb",
    "icon": "\ud83c\udf31",
    "badge": "AI Pioneer",
    "description": "Core AI foundations, agents, problem solving, search algorithms, knowledge graphs, and logic inference."
  },
  {
    "level": 2,
    "name": "Level 2: Machine Learning",
    "range": "Topics 8\u201315",
    "color": "#059669",
    "icon": "\u2699\ufe0f",
    "badge": "ML Engineer",
    "description": "Supervised, unsupervised, preprocessing, regression, classification, clustering, and model validation."
  },
  {
    "level": 3,
    "name": "Level 3: Deep Learning & Neural Networks",
    "range": "Topics 16\u201321",
    "color": "#7c3aed",
    "icon": "\ud83e\udde0",
    "badge": "Deep Learning Specialist",
    "description": "Artificial neural networks, backpropagation, CNNs for vision, RNNs/LSTMs, and natural language processing."
  },
  {
    "level": 4,
    "name": "Level 4: Generative AI & Modern AI",
    "range": "Topics 22\u201327",
    "color": "#d97706",
    "icon": "\u2728",
    "badge": "GenAI Architect",
    "description": "Large Language Models (LLMs), Transformer self-attention, prompt engineering, RAG, and autonomous agents."
  },
  {
    "level": 5,
    "name": "Level 5: Advanced & Responsible AI",
    "range": "Topics 28\u201330",
    "color": "#dc2626",
    "icon": "\ud83d\udee1\ufe0f",
    "badge": "AI Ethics & Research Fellow",
    "description": "Computer vision architectures, reinforcement learning (Q-Learning), explainability (XAI), and algorithmic fairness."
  }
];

const COLLEGE_TOPICS_CATALOG = [
  {
    "id": 1,
    "level": 1,
    "title": "1. Introduction to Artificial Intelligence",
    "subtitle": "Foundations, Evolution & Real-World Intelligence Systems",
    "icon": "\ud83e\udde0",
    "duration": "25 mins",
    "badgeReward": "AI Pioneer",
    "focus": "Origins, Dartmouth conference, Turing test, and the paradigm shift from hardcoded rules to learning from data.",
    "learn": {
      "definition": "Artificial Intelligence (AI) is the engineering discipline and branch of computer science dedicated to creating computational systems capable of performing cognitive tasks historically requiring human intelligence. These include visual and auditory perception, contextual reasoning, linguistic understanding, and decision-making under uncertainty.",
      "differenceTraditional": "In classical deterministic software development, programmers author explicit step-by-step rules (Data + Rules = Output). In modern Artificial Intelligence and Machine Learning, this relationship is inverted: systems are provided with input examples alongside observed outcomes, and learning algorithms discover the mathematical relationships and statistical weights (Data + Output = Model).",
      "historyTimeline": [
        {
          "year": "1950",
          "event": "Alan Turing Publishes 'Computing Machinery and Intelligence'",
          "desc": "Introduces the landmark Turing Test (Imitation Game) to evaluate machine intelligence."
        },
        {
          "year": "1956",
          "event": "Dartmouth Summer Research Workshop",
          "desc": "John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon coin the term 'Artificial Intelligence'."
        },
        {
          "year": "1966",
          "event": "ELIZA Chatbot Developed at MIT",
          "desc": "Joseph Weizenbaum creates ELIZA, showing early keyword pattern-matching conversational logic."
        },
        {
          "year": "1997",
          "event": "IBM Deep Blue Defeats Garry Kasparov",
          "desc": "First time a reigning World Chess Champion is defeated by a computer system using heuristic alpha-beta search."
        },
        {
          "year": "2012",
          "event": "AlexNet ImageNet Breakthrough",
          "desc": "Geoffrey Hinton's team wins ImageNet with deep convolutional neural networks on GPUs, igniting the modern Deep Learning revolution."
        },
        {
          "year": "2017",
          "event": "Transformers: 'Attention Is All You Need'",
          "desc": "Vaswani et al. introduce self-attention transformers, the core architecture behind all modern Large Language Models."
        },
        {
          "year": "2020+",
          "event": "Foundation Models & Autonomous Agents",
          "desc": "Multimodal LLMs (GPT-4, Gemini, Claude), AlphaFold 3, and autonomous tool-using agents transform research and industry."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Google Maps Route Engine",
        "domain": "Geospatial Navigation",
        "howItWorks": "Analyzes billions of live vehicle probe vectors, historical congestion graphs, and real-time traffic incidents to forecast arrival times with 98% accuracy."
      },
      {
        "system": "Tesla Full Self-Driving (FSD)",
        "domain": "Autonomous Vehicles",
        "howItWorks": "Ingests 8 camera feeds at 36 fps into end-to-end vision neural networks that perform 3D occupancy vector prediction and steering path planning."
      },
      {
        "system": "Netflix Recommendation Engine",
        "domain": "Streaming Entertainment",
        "howItWorks": "Applies deep matrix factorization, collaborative filtering, and contextual bandits to predict viewing interest, driving over 80% of watched content."
      },
      {
        "system": "Mayo Clinic Pathology Classifier",
        "domain": "Digital Healthcare",
        "howItWorks": "Scans gigapixel histopathology biopsy slides using convolutional architectures to detect tumor margins with 95%+ diagnostic sensitivity."
      }
    ],
    "visualDemo": {
      "type": "programming_paradigm_comparison",
      "title": "Traditional Programming vs Artificial Intelligence Paradigm",
      "traditional": {
        "formula": "Data + Handcrafted Rules \u27a1\ufe0f Output",
        "steps": [
          "1. Human specifies every edge case",
          "2. Hardcoded deterministic IF/ELSE logic",
          "3. Brittle output that fails on unseen noise"
        ]
      },
      "ai": {
        "formula": "Data + Observed Targets \u27a1\ufe0f Trained Model",
        "steps": [
          "1. Large dataset with labels or feedback",
          "2. Optimization algorithm minimizes loss",
          "3. Statistical model generalises to novel unseen inputs"
        ]
      }
    },
    "game": {
      "type": "application_detective",
      "title": "AI Application Detective",
      "instruction": "Examine the 10 real-world computer systems below. Classify whether each is powered by Artificial Intelligence / Machine Learning, or Deterministic Rule-Based Logic. Earn +10 Points per correct detection!",
      "items": [
        {
          "id": 1,
          "name": "Google Maps Traffic Forecast",
          "icon": "\ud83d\uddfa\ufe0f",
          "isAI": true,
          "explanation": "Uses temporal Graph Neural Networks and predictive time-series models trained on petabytes of GPS telemetry."
        },
        {
          "id": 2,
          "name": "Scientific Calculator (sin/cos/log)",
          "icon": "\ud83d\udd22",
          "isAI": false,
          "explanation": "Runs on deterministic Taylor series and CORDIC math routines with zero statistical learning."
        },
        {
          "id": 3,
          "name": "Siri & Google Assistant Speech Recognition",
          "icon": "\ud83c\udf99\ufe0f",
          "isAI": true,
          "explanation": "Converts acoustic waveforms into phonemes and tokens using deep transformer acoustic models."
        },
        {
          "id": 4,
          "name": "Word Processor Dictionary Spell Checker",
          "icon": "\ud83d\udcdd",
          "isAI": false,
          "explanation": "Uses static hash table lookup and Levenshtein edit distance without machine learning models."
        },
        {
          "id": 5,
          "name": "Netflix Personalized Recommendation Carousel",
          "icon": "\ud83c\udfac",
          "isAI": true,
          "explanation": "Uses deep collaborative filtering and latent vector embeddings to rank movies for individual users."
        },
        {
          "id": 6,
          "name": "Digital Stopwatch / Timer",
          "icon": "\u23f1\ufe0f",
          "isAI": false,
          "explanation": "Driven by quartz crystal oscillator electrical clock pulses and simple hardware register counters."
        },
        {
          "id": 7,
          "name": "Gmail Phishing & Spam Classifier",
          "icon": "\u2709\ufe0f",
          "isAI": true,
          "explanation": "Employs NLP transformers and Bayesian classifiers evaluating billions of email security signals."
        },
        {
          "id": 8,
          "name": "Fixed Daily Smartphone Alarm (7:00 AM)",
          "icon": "\u23f0",
          "isAI": false,
          "explanation": "A direct comparator interrupt: when current_system_time >= alarm_time, play audio file."
        },
        {
          "id": 9,
          "name": "Apple iPhone FaceID 3D Depth Unlock",
          "icon": "\ud83d\udcf1",
          "isAI": true,
          "explanation": "Projects 30,000 infrared dots and runs convolutional neural nets to match facial geometry."
        },
        {
          "id": 10,
          "name": "Pseudo-Random Number Generator (PRNG)",
          "icon": "\ud83c\udfb2",
          "isAI": false,
          "explanation": "Computes next numbers using deterministic equations such as the Mersenne Twister."
        }
      ]
    },
    "quiz": [
      {
        "id": 1,
        "question": "What is the primary fundamental difference between traditional programming and modern AI?",
        "options": [
          "Traditional programming stores code in RAM, while AI stores code exclusively in ROM.",
          "In traditional programming, humans hand-code rules; in AI, algorithms learn rules and models from data.",
          "Traditional programming runs only on CPUs, while AI cannot run on computers.",
          "Traditional programming requires internet access, while AI never uses data."
        ],
        "answer": 1,
        "explanation": "In traditional programming, humans author explicit deterministic logic (Data + Code = Output). In AI/ML, data and target outcomes are fed into training algorithms that learn the mapping function (Data + Output = Model)."
      },
      {
        "id": 2,
        "question": "Which historic 1956 workshop officially established Artificial Intelligence as an academic discipline?",
        "options": [
          "The Dartmouth Summer Research Project on Artificial Intelligence",
          "The ACM Turing Award Convention",
          "The Geneva IEEE Computing Conference",
          "The Silicon Valley Semiconductor Symposium"
        ],
        "answer": 0,
        "explanation": "The 1956 Dartmouth conference organized by John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon officially coined the term 'Artificial Intelligence'."
      },
      {
        "id": 3,
        "question": "According to the Turing Test (1950), when can a computing system be evaluated as intelligent?",
        "options": [
          "When it computes 10-digit arithmetic faster than a human.",
          "When it renders 3D graphics in under 16 milliseconds.",
          "When a human evaluator communicating via blind text cannot reliably distinguish it from a human.",
          "When it never encounters any software bugs."
        ],
        "answer": 2,
        "explanation": "Alan Turing's Imitation Game tests whether a human interrogator in blind text conversation can reliably distinguish the machine from a human respondent."
      },
      {
        "id": 4,
        "question": "Why do modern navigation applications like Google Maps require AI beyond classical Dijkstra shortest-path algorithms?",
        "options": [
          "Dijkstra cannot find any paths on graphs.",
          "AI is needed to predict future dynamic edge weights (traffic congestion) from historical cycles and live GPS probe speeds.",
          "AI automatically repaves roads when potholes are detected.",
          "Dijkstra requires quantum computers to execute."
        ],
        "answer": 1,
        "explanation": "While Dijkstra or A* finds shortest paths on static graphs, AI predicts future dynamic road edge weights by analyzing historical traffic cycles and real-time GPS probe velocities."
      },
      {
        "id": 5,
        "question": "Which category characterizes all mainstream AI systems deployed in commercial production today (e.g., ChatGPT, Tesla FSD, AlphaFold)?",
        "options": [
          "Artificial General Intelligence (AGI)",
          "Artificial Narrow Intelligence (ANI)",
          "Artificial Superintelligence (ASI)",
          "Conscious Organic Intelligence (COI)"
        ],
        "answer": 1,
        "explanation": "All existing real-world AI systems are Artificial Narrow Intelligence (ANI), excelling at specific bounded tasks but lacking human-level general cross-domain reasoning."
      }
    ]
  },
  {
    "id": 2,
    "level": 1,
    "title": "2. Types of Artificial Intelligence",
    "subtitle": "Narrow AI (ANI), General AI (AGI) & Super AI (ASI)",
    "icon": "\ud83c\udf10",
    "duration": "25 mins",
    "badgeReward": "AI Taxonomist",
    "focus": "Classification of AI systems by cognitive breadth, operational boundaries, and theoretical capabilities.",
    "learn": {
      "definition": "Artificial Intelligence is classified into three evolutionary tiers based on cognitive breadth and autonomy: Artificial Narrow Intelligence (ANI), Artificial General Intelligence (AGI), and Artificial Superintelligence (ASI).",
      "keyConcepts": [
        {
          "name": "Artificial Narrow Intelligence (ANI)",
          "desc": "Also known as Weak AI. Specialized systems engineered to perform a single or bounded set of tasks (e.g. speech transcription, chess, medical imaging) with high proficiency, but unable to transfer reasoning to unprogrammed domains."
        },
        {
          "name": "Artificial General Intelligence (AGI)",
          "desc": "Also known as Strong AI. A hypothetical system possessing human-level cognitive breadth, capable of autonomous learning, transfer learning across disparate subjects, abstract reasoning, and common-sense problem solving."
        },
        {
          "name": "Artificial Superintelligence (ASI)",
          "desc": "A hypothetical tier of intelligence vastly exceeding the cumulative cognitive performance of all human minds across every discipline, including scientific creativity, general wisdom, and social skills."
        }
      ],
      "teachingNote": "Academic consensus confirms that 100% of deployed AI technologies today are Artificial Narrow Intelligence (ANI). AGI and ASI remain theoretical research horizons."
    },
    "realWorld": [
      {
        "system": "AlphaFold 3 (DeepMind)",
        "domain": "Structural Biology (ANI)",
        "howItWorks": "Predicts 3D atomic structures for nearly all known biological molecules, transforming pharmacology, yet cannot play tic-tac-toe or write an essay."
      },
      {
        "system": "Autonomous Surgical Robots",
        "domain": "Precision Surgery (ANI)",
        "howItWorks": "Performs sub-millimeter laparoscopic tissue suturing and incision tracking, strictly bound within specialized medical parameters."
      },
      {
        "system": "Large Multimodal Models (e.g., GPT-4 / Gemini)",
        "domain": "Advanced Narrow AI",
        "howItWorks": "Exhibits broad conversational versatility across coding, writing, and analysis, but operates via statistical token prediction without true understanding or autonomy."
      },
      {
        "system": "Hypothetical Scientific Discoverer (AGI Concept)",
        "domain": "Theoretical Research",
        "howItWorks": "Would independently read all scientific literature, formulate novel hypotheses in quantum physics, design laboratory experiments, and write peer-reviewed papers."
      }
    ],
    "visualDemo": {
      "type": "cognitive_scope_spectrum",
      "title": "The Three Tiers of Machine Cognition Spectrum",
      "spectrum": [
        {
          "tier": "ANI (Narrow AI)",
          "status": "Deployed Reality",
          "scope": "Single Task Domain",
          "autonomy": "Bounded / Supervised",
          "examples": "Siri, AlphaGo, Tesla Autopilot, ChatGPT"
        },
        {
          "tier": "AGI (General AI)",
          "status": "Research Goal",
          "scope": "Human-Equivalent Cross-Domain",
          "autonomy": "Self-Directed / Transfer Learning",
          "examples": "Hypothetical Autonomous Polymath"
        },
        {
          "tier": "ASI (Super AI)",
          "status": "Theoretical Horizon",
          "scope": "Surpasses All Human Minds",
          "autonomy": "Post-Human Recursive Self-Improvement",
          "examples": "Planetary Optimization Super-System"
        }
      ]
    },
    "game": {
      "type": "classify_ai_game",
      "title": "Classify the AI: ANI vs AGI vs ASI",
      "instruction": "Evaluate the 8 AI scenarios below and classify each into Narrow AI (ANI), General AI (AGI), or Super AI (ASI). Instant explanations will reveal the architectural reasons behind each classification!",
      "items": [
        {
          "id": 1,
          "scenario": "Deep Blue defeating chess champion Garry Kasparov in 1997 using heuristic board evaluation.",
          "correct": "ANI",
          "explanation": "Deep Blue could only evaluate chess positions; it could not play checkers, recognize a face, or speak a single word."
        },
        {
          "id": 2,
          "scenario": "A hypothetical autonomous system that designs warp-drive physics, cures all human diseases in 48 hours, and manages global climate simultaneously.",
          "correct": "ASI",
          "explanation": "Vastly eclipses all human intellectual capabilities across every scientific and creative discipline simultaneously."
        },
        {
          "id": 3,
          "scenario": "Apple Siri answering 'What is the capital of France?' using database search and voice synthesis.",
          "correct": "ANI",
          "explanation": "Operates within pre-configured voice intents and web query APIs. It has zero generalized reasoning."
        },
        {
          "id": 4,
          "scenario": "A future machine that can attend college, pass exams in law, medicine, and engineering, adapt to new jobs, and understand human jokes with human-equivalent skill.",
          "correct": "AGI",
          "explanation": "Demonstrates human-level general cognitive adaptability and cross-domain transfer learning across all human knowledge domains."
        },
        {
          "id": 5,
          "scenario": "DeepMind AlphaFold predicting the 3D structures of 200 million biological proteins.",
          "correct": "ANI",
          "explanation": "An incredible breakthrough in computational biology, but strictly specialized for biomolecular folding."
        },
        {
          "id": 6,
          "scenario": "Waymo Autonomous Taxi navigating downtown San Francisco streets without a human driver.",
          "correct": "ANI",
          "explanation": "High-level Narrow AI: autonomous driving involves complex vision and control, but cannot transfer to writing novels or diagnosing illnesses."
        },
        {
          "id": 7,
          "scenario": "A software agent that invents new mathematical axioms, composes symphony masterworks, and conducts scientific experiments with human versatility.",
          "correct": "AGI",
          "explanation": "Demonstrates broad, human-equivalent intellectual flexibility across science, art, and reasoning."
        },
        {
          "id": 8,
          "scenario": "A theoretical super-intelligence that recursively rewrites its own source code, improving its cognition exponentially beyond human comprehension.",
          "correct": "ASI",
          "explanation": "The classic technological singularity concept of an ultra-intelligent entity surpassing all collective human intellect."
        }
      ]
    },
    "quiz": [
      {
        "id": 1,
        "question": "Which statement accurately describes Artificial Narrow Intelligence (ANI)?",
        "options": [
          "It possesses consciousness and self-awareness.",
          "It is designed and trained to excel at a specific, bounded task.",
          "It can effortlessly transfer reasoning between unrelated fields like poetry and rocket design.",
          "It has surpassed all human intelligence across every scientific discipline."
        ],
        "answer": 1,
        "explanation": "Artificial Narrow Intelligence (ANI) operates within dedicated task boundaries (e.g. image classification, chess, translation) and cannot generalize beyond its trained domain."
      },
      {
        "id": 2,
        "question": "What is the defining capability of theoretical Artificial General Intelligence (AGI)?",
        "options": [
          "The ability to compute floating point calculations at petahertz speeds.",
          "The ability to operate without any electricity.",
          "Human-level adaptability, cross-domain transfer learning, and abstract reasoning across any intellectual problem.",
          "The restriction to only text-based terminal outputs."
        ],
        "answer": 2,
        "explanation": "AGI represents hypothetical machines that match human intellectual breadth, capable of learning, transferring knowledge, and solving problems across all human cognitive domains."
      },
      {
        "id": 3,
        "question": "Why is an advanced Large Language Model (like GPT-4 or Gemini) classified by scientists as advanced Narrow AI rather than true AGI?",
        "options": [
          "Because it cannot produce formatted text or computer code.",
          "Because it generates responses via statistical token probabilities and lacks autonomous reasoning, true understanding, and independent goal-directed agency.",
          "Because it is written in assembly language instead of Python.",
          "Because it runs on a single laptop battery."
        ],
        "answer": 1,
        "explanation": "Despite broad linguistic versatility, LLMs rely on statistical pattern matching from training data and lack grounding, autonomous agency, and true common-sense understanding."
      },
      {
        "id": 4,
        "question": "What distinguishes Artificial Superintelligence (ASI) from Artificial General Intelligence (AGI)?",
        "options": [
          "AGI matches human intellectual capability; ASI exceeds all collective human minds combined across every field.",
          "AGI is already deployed in every smartphone; ASI only exists on web servers.",
          "ASI can only play board games like Go and Chess.",
          "There is no difference between AGI and ASI."
        ],
        "answer": 0,
        "explanation": "AGI equals human cognitive breadth, while ASI represents a hypothetical level of intelligence that vastly outstrips the greatest human geniuses in science, strategy, and creativity."
      },
      {
        "id": 5,
        "question": "When teaching computer science students about AGI and ASI, what is the critical academic distinction to emphasize?",
        "options": [
          "That ASI has been secretly running financial markets since 1999.",
          "That ANI is an established engineering reality, whereas AGI and ASI remain theoretical horizons without established implementations.",
          "That AI cannot be classified into categories.",
          "That Narrow AI is completely obsolete and no longer used."
        ],
        "answer": 1,
        "explanation": "It is essential to distinguish between proven deployed engineering systems (all of which are ANI) and theoretical future concepts (AGI and ASI)."
      }
    ]
  },
  {
    "id": 3,
    "level": 1,
    "title": "3. Intelligent Agents",
    "subtitle": "PEAS Framework, Sensors, Actuators & Environments",
    "icon": "\ud83e\udd16",
    "duration": "30 mins",
    "badgeReward": "Agent Architect",
    "focus": "Performance measure, Environment, Actuators, and Sensors (PEAS) formulation for autonomous software.",
    "learn": {
      "definition": "An Intelligent Agent is an autonomous entity that perceives its environment through sensors and acts upon that environment using actuators. An agent's behavior is mathematically defined by its agent function f: P* \u27a1\ufe0f A, which maps any given percept sequence to a corresponding action.",
      "peasBreakdown": [
        {
          "component": "P - Performance Measure",
          "desc": "The objective criterion used to evaluate how successful an agent is (e.g. percentage of dirt cleaned, fuel efficiency, safety, latency)."
        },
        {
          "component": "E - Environment",
          "desc": "The external world in which the agent operates (e.g. 2D floor surface, city traffic, financial stock market, human body)."
        },
        {
          "component": "A - Actuators",
          "desc": "The mechanisms through which the agent exerts actions upon its environment (e.g. electric wheels, vacuum suction motor, robotic arms, steering wheel)."
        },
        {
          "component": "S - Sensors",
          "desc": "The instruments through which the agent receives percepts from its environment (e.g. infrared bump sensors, dirt sensors, LiDAR, cameras, microphones)."
        }
      ],
      "agentArchitectures": [
        {
          "type": "Simple Reflex Agent",
          "desc": "Selects actions based exclusively on the current percept, ignoring percept history (Condition-Action rules: IF dirty THEN suck)."
        },
        {
          "type": "Model-Based Reflex Agent",
          "desc": "Maintains internal state tracking unobserved aspects of the world (How the world evolves + How my actions affect the world)."
        },
        {
          "type": "Goal-Based Agent",
          "desc": "Combines state information with an explicit goal definition to plan multi-step action sequences."
        },
        {
          "type": "Utility-Based Agent",
          "desc": "Uses a continuous utility function to choose actions that maximize overall expected satisfaction or efficiency under trade-offs."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Autonomous Vacuum Cleaner (Roomba)",
        "domain": "Consumer Robotics",
        "howItWorks": "P: Floor cleanliness percentage, battery life, time elapsed; E: Carpet/hardwood tiles, furniture legs; A: Left/right wheels, vacuum brush; S: Bump sensor, cliff sensor, optical dirt sensor."
      },
      {
        "system": "Autonomous Self-Driving Taxi (Waymo)",
        "domain": "Autonomous Transportation",
        "howItWorks": "P: Safety, passenger comfort, arrival time, legal compliance; E: City roads, pedestrians, weather; A: Steering, acceleration, braking, turn signals; S: 360 LiDAR, radar, cameras, GPS, IMU."
      },
      {
        "system": "Algorithmic Trading Agent",
        "domain": "Quantitative Finance",
        "howItWorks": "P: Profit maximization, Sharpe ratio, risk exposure; E: Global stock exchanges; A: Buy orders, sell orders; S: Real-time price feeds, order books, financial news NLP."
      }
    ],
    "visualDemo": {
      "type": "peas_matrix_explorer",
      "title": "Interactive PEAS Matrix Formulation Explorer",
      "systems": {
        "vacuum": {
          "P": "Cleanliness, battery efficiency, minimal bumps",
          "E": "Living room, rugs, chairs, pets",
          "A": "Wheels, suction motor, sweep brushes",
          "S": "Dirt sensor, bumper, cliff detector"
        },
        "taxi": {
          "P": "Zero collisions, speed limit compliance, passenger comfort",
          "E": "Urban roads, traffic lights, pedestrians",
          "A": "Steering wheel, accelerator, disc brakes",
          "S": "LiDAR, 8K cameras, radar, ultrasonic sonar"
        },
        "diagnostician": {
          "P": "Healthy patient outcome, reduced medical costs",
          "E": "Hospital ward, electronic patient charts",
          "A": "Diagnostic report, prescription recommendation",
          "S": "Laboratory blood test results, symptom inputs, vital signs"
        }
      }
    },
    "game": {
      "type": "peas_agent_game",
      "title": "Smart Agent PEAS Room Environment Simulation",
      "instruction": "Test an intelligent vacuum agent in a 4x4 room grid. The room contains dirt patches and obstacles. Operate the agent manually or activate the Autonomous Reflex Agent loop to see how sensors, actuators, and performance measures interact in real-time!",
      "gridSize": 4,
      "initialAgent": {
        "x": 0,
        "y": 0,
        "direction": "EAST"
      },
      "initialDirt": [
        {
          "x": 0,
          "y": 1
        },
        {
          "x": 1,
          "y": 2
        },
        {
          "x": 2,
          "y": 0
        },
        {
          "x": 2,
          "y": 3
        },
        {
          "x": 3,
          "y": 1
        }
      ],
      "obstacles": [
        {
          "x": 1,
          "y": 1
        },
        {
          "x": 2,
          "y": 2
        }
      ],
      "dock": {
        "x": 0,
        "y": 0
      }
    },
    "quiz": [
      {
        "id": 1,
        "question": "In artificial intelligence agent design, what does the PEAS acronym represent?",
        "options": [
          "Program, Execution, Algorithm, Software",
          "Performance measure, Environment, Actuators, Sensors",
          "Perceptron, Entropy, Activation, Sigmoid",
          "Planning, Evaluation, Accuracy, State"
        ],
        "answer": 1,
        "explanation": "PEAS stands for Performance measure, Environment, Actuators, and Sensors - the formal framework for specifying intelligent agent task environments."
      },
      {
        "id": 2,
        "question": "What is the key limitation of a Simple Reflex Agent?",
        "options": [
          "It cannot use electrical actuators.",
          "It bases actions exclusively on the current percept and cannot handle partially observable environments because it maintains no history or internal state.",
          "It takes 24 hours to select each action.",
          "It only works inside web browsers."
        ],
        "answer": 1,
        "explanation": "Simple Reflex Agents make decisions using condition-action rules solely on the immediate percept. Without internal state or memory, they can easily enter infinite loops in partially observable environments."
      },
      {
        "id": 3,
        "question": "How is an agent function mathematically formalized in AI theory?",
        "options": [
          "f: P* \u27a1\ufe0f A (a mapping from any percept history sequence to an action)",
          "f: CPU \u27a1\ufe0f GPU",
          "f: Output \u27a1\ufe0f Input",
          "f: Time \u27a1\ufe0f Money"
        ],
        "answer": 0,
        "explanation": "The agent function f maps the history of all percepts received so far (P*) to the next selected action (A)."
      },
      {
        "id": 4,
        "question": "Which component of an autonomous vacuum cleaner constitutes an Actuator?",
        "options": [
          "The infrared obstacle bounce sensor",
          "The optical dirt detector lens",
          "The electric drive motor turning the rubber wheels",
          "The battery level percentage indicator"
        ],
        "answer": 2,
        "explanation": "Actuators are the mechanisms that execute physical actions in the environment, such as drive motors, brushes, and suction units."
      },
      {
        "id": 5,
        "question": "Why should a performance measure for an agent be based on what happens in the environment rather than on the agent's internal state?",
        "options": [
          "Because internal states cannot be measured by computers.",
          "Because an agent evaluated on internal beliefs might reward itself for delusion (e.g. believing the room is clean without actually cleaning it).",
          "Because environments never change.",
          "Because actuators do not communicate with sensors."
        ],
        "answer": 1,
        "explanation": "Russell & Norvig emphasize that performance measures must evaluate the actual desired outcome in the external environment, preventing the agent from tricking its own reward mechanisms."
      }
    ]
  },
  {
    "id": 4,
    "level": 1,
    "title": "4. Problem Solving in AI",
    "subtitle": "State Space Representation, Search Formulation & Heuristics",
    "icon": "\ud83e\udde9",
    "duration": "30 mins",
    "badgeReward": "Problem Solver",
    "focus": "Initial state, state transitions, goal tests, path costs, and heuristic functions in computational problem formulation.",
    "learn": {
      "definition": "Problem solving in AI is the process of finding a sequence of actions that leads from an initial state to a desired goal state within a formally defined state space.",
      "fiveElements": [
        {
          "element": "1. Initial State",
          "desc": "The exact configuration or situation the agent starts in (e.g. Agent at coordinate (0, 0) or 8-puzzle scrambled tile configuration)."
        },
        {
          "element": "2. Actions / Transition Model",
          "desc": "The set of valid actions ACTIONS(s) possible in state s, and the resulting transition model RESULT(s, a) defining the successor state."
        },
        {
          "element": "3. Goal Test",
          "desc": "A boolean function IS-GOAL(s) determining whether a given state matches the problem's objective conditions."
        },
        {
          "element": "4. Path Cost",
          "desc": "A function c(s, a, s') assigning a numeric cost to taking action a from state s to state s' (e.g. distance, fuel, time). Total path cost is the sum of step costs."
        },
        {
          "element": "5. Heuristics h(n)",
          "desc": "An informed domain-specific estimate of the cheapest path cost from current state n to the nearest goal state (e.g. Manhattan distance or Euclidean straight-line distance)."
        }
      ]
    },
    "realWorld": [
      {
        "system": "GPS Highway Navigation (Google Maps)",
        "domain": "Geospatial Routing",
        "howItWorks": "Initial State: Current GPS lat/long; Actions: Turn onto intersecting road segments; Goal Test: Within 10 meters of destination; Path Cost: Travel time in seconds; Heuristic: Straight-line Euclidean distance to destination divided by maximum legal speed."
      },
      {
        "system": "8-Puzzle & Rubik's Cube Solvers",
        "domain": "Combinatorial Puzzles",
        "howItWorks": "State: Arrangement of 8 tiles on a 3x3 board; Actions: Slide blank tile Left, Right, Up, Down; Goal: Ordered tiles 1 through 8; Heuristic: Sum of Manhattan distances of all misplaced tiles."
      },
      {
        "system": "Automated Warehouse AGV Logistics",
        "domain": "Industrial Robotics",
        "howItWorks": "State: Automated Guided Vehicle (AGV) coordinates in Amazon fulfillment warehouse; Goal: Reach target storage shelf without colliding with other robots."
      }
    ],
    "visualDemo": {
      "type": "state_space_tree_visualizer",
      "title": "State-Space Search Tree Expansion Model",
      "description": "Observe how an initial state branches into successor states through valid action transitions, forming a state-space tree where nodes represent candidate paths."
    },
    "game": {
      "type": "state_space_maze",
      "title": "State Space & Goal State Maze Navigator",
      "instruction": "Navigate the agent from Initial State (0, 0) to Goal State (4, 4) across the 5x5 grid. Avoid stone wall obstacles and observe how Current State coordinates, Path Cost g(n), Manhattan Heuristic h(n), and the Goal Test update with every state transition!",
      "gridSize": 5,
      "initialState": {
        "x": 0,
        "y": 0
      },
      "goalState": {
        "x": 4,
        "y": 4
      },
      "walls": [
        {
          "x": 1,
          "y": 1
        },
        {
          "x": 1,
          "y": 2
        },
        {
          "x": 2,
          "y": 4
        },
        {
          "x": 3,
          "y": 1
        },
        {
          "x": 3,
          "y": 2
        }
      ]
    },
    "quiz": [
      {
        "id": 1,
        "question": "What are the core components of a formal problem formulation in classical AI?",
        "options": [
          "Compiler, Linker, Assembler, Debugger",
          "Initial state, Actions, Transition model, Goal test, and Path cost",
          "Backpropagation, Gradient descent, Loss function, Epochs",
          "RAM, Storage, GPU, Monitor"
        ],
        "answer": 1,
        "explanation": "A well-defined search problem consists of the initial state, set of possible actions, transition model Result(s, a), goal test, and step path cost function."
      },
      {
        "id": 2,
        "question": "What is the function of the Goal Test in AI problem solving?",
        "options": [
          "To format the screen with green colors.",
          "To evaluate whether a given candidate state satisfies the objective completion criteria.",
          "To measure the battery consumption of the computer.",
          "To count the total number of lines in the Python file."
        ],
        "answer": 1,
        "explanation": "The Goal Test is a boolean predicate that checks whether a current state meets the condition required for the problem to be solved."
      },
      {
        "id": 3,
        "question": "For a grid navigation problem, what is the Manhattan Distance heuristic between point (x1, y1) and point (x2, y2)?",
        "options": [
          "|x1 - x2| + |y1 - y2|",
          "sqrt((x1 - x2)^2 + (y1 - y2)^2)",
          "(x1 * x2) + (y1 * y2)",
          "x1 + x2 + y1 + y2"
        ],
        "answer": 0,
        "explanation": "The Manhattan Distance (L1 norm) is calculated as |x1 - x2| + |y1 - y2|, representing the minimum grid moves required when diagonal movement is disallowed."
      },
      {
        "id": 4,
        "question": "What does the term 'State Space' represent in AI search theory?",
        "options": [
          "The hard disk space required to install an operating system.",
          "The set of all possible states reachable from the initial state by any sequence of valid actions.",
          "The amount of RAM dedicated to graphics rendering.",
          "The distance between computer servers in a cloud datacenter."
        ],
        "answer": 1,
        "explanation": "The State Space is the complete configuration graph of all potential states reachable from the initial state via valid actions."
      },
      {
        "id": 5,
        "question": "Why is an admissible heuristic critical for optimal informed search (such as A*)?",
        "options": [
          "Because an admissible heuristic never overestimates the true cost to reach the goal, guaranteeing optimal solution discovery.",
          "Because an admissible heuristic deletes all visited nodes from memory.",
          "Because it guarantees the program runs in under 1 microsecond.",
          "Because it removes all obstacles from the maze."
        ],
        "answer": 0,
        "explanation": "A heuristic h(n) is admissible if it never overestimates the true minimal cost to reach the goal (h(n) <= h*(n)). Admissibility is necessary to guarantee A* finds the optimal path."
      }
    ]
  },
  {
    "id": 5,
    "level": 1,
    "title": "5. Search Algorithms",
    "subtitle": "Uninformed (BFS, DFS) & Informed (A*, Heuristics) Search",
    "icon": "\ud83d\udd0d",
    "duration": "35 mins",
    "badgeReward": "Algorithm Explorer",
    "focus": "Breadth-First, Depth-First, Uniform Cost, Greedy Best-First, and A* optimality and completeness.",
    "learn": {
      "definition": "Search algorithms are computational strategies that traverse a problem's state space to locate a path from an initial state to a goal state. Search algorithms are divided into Uninformed (blind) search and Informed (heuristic) search.",
      "algorithmsSummary": [
        {
          "name": "Breadth-First Search (BFS)",
          "frontier": "Queue (FIFO - First In, First Out)",
          "completeness": "Complete (if branching factor b is finite)",
          "optimality": "Optimal if all step costs are equal",
          "time": "O(b^d)",
          "space": "O(b^d) [High memory usage]"
        },
        {
          "name": "Depth-First Search (DFS)",
          "frontier": "Stack (LIFO - Last In, First Out)",
          "completeness": "Incomplete in infinite-depth spaces",
          "optimality": "Non-optimal (can return deep sub-optimal paths)",
          "time": "O(b^m)",
          "space": "O(b*m) [Very memory efficient]"
        },
        {
          "name": "A* Search (Informed)",
          "frontier": "Priority Queue (sorted by evaluation function f(n) = g(n) + h(n))",
          "completeness": "Complete",
          "optimality": "Optimal (if h(n) is admissible and consistent)",
          "time": "Exponential in worst-case, but dramatically pruned",
          "space": "O(b^d) [Keeps all generated nodes in memory]"
        }
      ],
      "evaluationFunction": "In A* Search, f(n) = g(n) + h(n), where g(n) is the exact known cost from the start node to node n, and h(n) is the estimated heuristic cost from node n to the goal."
    },
    "realWorld": [
      {
        "system": "Google Web Crawler Spiders",
        "domain": "Search Engine Indexing",
        "howItWorks": "Uses Breadth-First Search (BFS) to discover and index hyperlinks layer by layer, prioritizing high-authority pages near domain roots."
      },
      {
        "system": "Compiler Dependency & Deadlock Analyzers",
        "domain": "Systems Software",
        "howItWorks": "Uses Depth-First Search (DFS) for topological sorting and detecting circular wait cycles in lock dependency graphs."
      },
      {
        "system": "StarCraft / Video Game NPC Pathfinding",
        "domain": "Interactive Simulation",
        "howItWorks": "Units use A* Search with spatial navigation meshes to plot shortest, obstacle-free paths in real-time across dynamic combat terrain."
      }
    ],
    "visualDemo": {
      "type": "algorithm_comparison_matrix",
      "title": "Frontier Data Structures & Algorithmic Complexity Comparison",
      "description": "Compare Queue (FIFO) in BFS, Stack (LIFO) in DFS, and Priority Queue in A*. See how node expansion orders diverge!"
    },
    "game": {
      "type": "algorithm_race",
      "title": "Algorithm Race: BFS vs DFS vs A* Visualizer",
      "instruction": "Select an algorithm (BFS, DFS, or A*) and click 'Step Exploration' or 'Auto-Play Race'. Watch how the search frontier expands through the state graph, and compare total nodes explored, path length, and memory cost!",
      "startNode": "S",
      "goalNode": "G",
      "nodes": [
        "S",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G"
      ],
      "edges": [
        {
          "from": "S",
          "to": "A",
          "cost": 2
        },
        {
          "from": "S",
          "to": "B",
          "cost": 4
        },
        {
          "from": "A",
          "to": "C",
          "cost": 3
        },
        {
          "from": "A",
          "to": "D",
          "cost": 7
        },
        {
          "from": "B",
          "to": "E",
          "cost": 1
        },
        {
          "from": "B",
          "to": "F",
          "cost": 5
        },
        {
          "from": "C",
          "to": "G",
          "cost": 4
        },
        {
          "from": "E",
          "to": "G",
          "cost": 6
        }
      ]
    },
    "quiz": [
      {
        "id": 1,
        "question": "Which data structure is utilized to maintain the frontier in Breadth-First Search (BFS)?",
        "options": [
          "Queue (First-In, First-Out / FIFO)",
          "Stack (Last-In, First-Out / LIFO)",
          "Hash Set",
          "Binary Search Tree"
        ],
        "answer": 0,
        "explanation": "Breadth-First Search uses a FIFO Queue to ensure shallowest nodes are expanded first before moving to deeper levels."
      },
      {
        "id": 2,
        "question": "What is the primary memory advantage of Depth-First Search (DFS) over Breadth-First Search (BFS)?",
        "options": [
          "DFS requires O(b*m) linear space where b is branching factor and m is maximum depth, whereas BFS consumes exponential O(b^d) memory.",
          "DFS stores zero nodes in memory.",
          "DFS automatically compresses graph nodes onto hard drives.",
          "DFS only works on graphs with fewer than 5 nodes."
        ],
        "answer": 0,
        "explanation": "DFS has modest memory requirements O(b*m) because it only needs to retain the current path from the root plus unexpanded sibling nodes."
      },
      {
        "id": 3,
        "question": "In A* Search, how is the total node evaluation function f(n) defined?",
        "options": [
          "f(n) = g(n) + h(n), where g(n) is path cost to n and h(n) is heuristic estimate from n to goal",
          "f(n) = g(n) * h(n)",
          "f(n) = g(n) - h(n)",
          "f(n) = max(g(n), h(n))"
        ],
        "answer": 0,
        "explanation": "A* evaluates nodes by combining g(n) (the exact cost incurred so far) with h(n) (the estimated remaining cost to the goal)."
      },
      {
        "id": 4,
        "question": "Under what condition is A* graph search guaranteed to return an optimal (lowest-cost) solution?",
        "options": [
          "When the heuristic function h(n) is admissible and consistent (monotonic).",
          "When all edge weights are negative.",
          "When Depth-First Search is run immediately afterwards.",
          "When the heuristic estimates infinite cost for all nodes."
        ],
        "answer": 0,
        "explanation": "In graph search, an admissible and consistent heuristic guarantees that the first time a goal node is selected for expansion, the optimal path has been found."
      },
      {
        "id": 5,
        "question": "What happens if Depth-First Search (DFS) encounters an infinite-depth branch without a goal node?",
        "options": [
          "It instantly switches to A*.",
          "It can become trapped indefinitely in an infinite branch, failing completeness.",
          "It resets the computer's CPU clock.",
          "It automatically finds the goal on another branch."
        ],
        "answer": 1,
        "explanation": "DFS is incomplete in state spaces with infinite depth or cycles, as it can descend down an endless path and never backtrack to find the goal."
      }
    ]
  },
  {
    "id": 6,
    "level": 1,
    "title": "6. Knowledge Representation",
    "subtitle": "Semantic Networks, Knowledge Graphs & Ontologies",
    "icon": "\ud83d\udd78\ufe0f",
    "duration": "30 mins",
    "badgeReward": "Graph Master",
    "focus": "Representing entities, relations, propositions, RDF triples, and semantic query graphs.",
    "learn": {
      "definition": "Knowledge Representation (KR) is the field of AI focused on structuring formal models of real-world information so that automated software systems can reason, infer new facts, and answer semantic queries.",
      "coreStructures": [
        {
          "name": "Semantic Networks",
          "desc": "Graphs composed of nodes representing concepts or entities, interconnected by directed labeled edges representing relationships such as 'is-a', 'has-a', and 'part-of'."
        },
        {
          "name": "RDF Triples",
          "desc": "The atomic data model of the Semantic Web: Subject \u27a1\ufe0f Predicate \u27a1\ufe0f Object (e.g. [Student] \u27a1\ufe0f [studiesAt] \u27a1\ufe0f [University])."
        },
        {
          "name": "Ontologies & OWL",
          "desc": "Formal, explicit specifications of shared conceptualizations. They define entity categories, properties, inheritance axioms, and logical constraints."
        },
        {
          "name": "Knowledge Graphs",
          "desc": "Scalable enterprise graph databases that link millions of entities and semantic relationships, enabling multi-hop associative queries and disambiguation."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Google Knowledge Graph",
        "domain": "Semantic Web Search",
        "howItWorks": "Holds over 500 billion facts about 5 billion entities, powering Knowledge Panels that provide structured summaries for people, places, and universities directly in search results."
      },
      {
        "system": "Bio2RDF Biomedical Graph",
        "domain": "Drug Discovery & Life Sciences",
        "howItWorks": "Connects genes, proteins, biological pathways, and pharmacological compounds in an RDF graph to predict novel drug interactions."
      },
      {
        "system": "Enterprise Fraud Detection Knowledge Networks",
        "domain": "Financial Intelligence",
        "howItWorks": "Maps complex multi-hop transactional relationships between bank accounts, corporate shells, and shared IP addresses to detect money laundering rings."
      }
    ],
    "visualDemo": {
      "type": "rdf_triple_visualizer",
      "title": "RDF Semantic Triple Knowledge Model",
      "description": "Inspect how Subject-Predicate-Object triples form interconnected semantic graphs capable of property inheritance and associative inference."
    },
    "game": {
      "type": "knowledge_graph_game",
      "title": "Build the College Knowledge Graph",
      "instruction": "Connect academic entities (Student, College, Professor, Project, Course) with valid semantic relations (studiesAt, guides, teaches, enrolledIn, developed). Form valid RDF Triples to complete the knowledge graph and unlock automated semantic queries!",
      "entities": [
        {
          "id": "e1",
          "name": "Student Scholar (Alex)",
          "type": "Student Scholar",
          "icon": "\ud83c\udf93"
        },
        {
          "id": "e2",
          "name": "University Institute of AI",
          "type": "University / College",
          "icon": "\ud83c\udfdb\ufe0f"
        },
        {
          "id": "e3",
          "name": "Lead AI Professor",
          "type": "Project Guide & Professor",
          "icon": "\ud83d\udc69\u200d\ud83c\udfeb"
        },
        {
          "id": "e4",
          "name": "SkillSpring AI",
          "type": "Autonomous Learning Platform",
          "icon": "\ud83d\ude80"
        },
        {
          "id": "e5",
          "name": "Artificial Intelligence & ML",
          "type": "Core Academic Track",
          "icon": "\ud83d\udcda"
        }
      ],
      "validTriples": [
        {
          "subject": "Student Scholar (Alex)",
          "predicate": "studiesAt",
          "object": "University Institute of AI"
        },
        {
          "subject": "Lead AI Professor",
          "predicate": "guides",
          "object": "Student Scholar (Alex)"
        },
        {
          "subject": "Lead AI Professor",
          "predicate": "teaches",
          "object": "Artificial Intelligence & ML"
        },
        {
          "subject": "Student Scholar (Alex)",
          "predicate": "developed",
          "object": "SkillSpring AI"
        },
        {
          "subject": "Student Scholar (Alex)",
          "predicate": "enrolledIn",
          "object": "Artificial Intelligence & ML"
        }
      ]
    },
    "quiz": [
      {
        "id": 1,
        "question": "What is an RDF Triple in knowledge graph representation?",
        "options": [
          "A three-core microprocessor architecture.",
          "An atomic knowledge statement composed of Subject, Predicate, and Object (e.g. Student - studiesAt - College).",
          "A triple-layer neural network perceptron.",
          "A database backup stored in three cloud regions."
        ],
        "answer": 1,
        "explanation": "Resource Description Framework (RDF) represents semantic data as triples: Subject (entity), Predicate (relationship), and Object (target entity or literal)."
      },
      {
        "id": 2,
        "question": "In a Semantic Network, what do nodes and directed edges correspond to?",
        "options": [
          "Nodes represent hardware routers; edges represent fiber-optic cables.",
          "Nodes represent concepts or entities; directed edges represent relationships between them.",
          "Nodes represent HTML tags; edges represent CSS styles.",
          "Nodes represent numbers; edges represent division operators."
        ],
        "answer": 1,
        "explanation": "In semantic networks, graph nodes represent objects, concepts, or entities, and labeled directed edges define relationships (like 'is-a' or 'part-of')."
      },
      {
        "id": 3,
        "question": "What key reasoning property is enabled by 'is-a' relationship hierarchies in semantic networks?",
        "options": [
          "Inheritance of attributes and properties from parent classes to child entities.",
          "Automatic encryption of all hard drive files.",
          "Doubling of CPU processor clock frequency.",
          "Immediate deletion of all redundant entities."
        ],
        "answer": 0,
        "explanation": "The 'is-a' taxonomic link allows child entities to automatically inherit attributes and constraints established on parent categories without duplicating data."
      },
      {
        "id": 4,
        "question": "How do modern search engines (like Google) leverage Knowledge Graphs for queries?",
        "options": [
          "By guessing random webpage URLs.",
          "By resolving entities and their real-world relationships to present direct factual answers and Knowledge Panels instead of mere keyword matching.",
          "By printing paper copies of encyclopedia pages.",
          "By ignoring user search terms completely."
        ],
        "answer": 1,
        "explanation": "Knowledge Graphs enable search engines to understand search queries as real-world entities (things, not strings), providing instant factual knowledge panels and relationship paths."
      },
      {
        "id": 5,
        "question": "What is an Ontology in the context of Artificial Intelligence and Computer Science?",
        "options": [
          "A hardware diagnostic tool for measuring voltage.",
          "A formal, explicit specification of shared conceptualizations, defining entity classes, relationships, and inference axioms.",
          "A mathematical formula for calculating matrix determinants.",
          "A software license agreement for open source code."
        ],
        "answer": 1,
        "explanation": "An ontology formally defines the shared vocabulary, class hierarchy, relational properties, and logical constraints governing a domain of knowledge."
      }
    ]
  },
  {
    "id": 7,
    "level": 1,
    "title": "7. Reasoning and Decision Making",
    "subtitle": "Propositional Logic, First-Order Logic & Inference Engines",
    "icon": "\u2696\ufe0f",
    "duration": "30 mins",
    "badgeReward": "Logic Specialist",
    "focus": "Forward chaining, backward chaining, resolution refutation, and rule-based expert systems.",
    "learn": {
      "definition": "Reasoning in AI is the process of generating valid conclusions and novel facts from existing knowledge using formal rules of logical inference. It forms the computational foundation of expert systems, automated theorem proving, and diagnostic engines.",
      "logicalFoundations": [
        {
          "name": "Propositional Logic",
          "desc": "Deals with boolean propositions that are either TRUE or FALSE, manipulated using logical connectives: AND (^), OR (v), NOT (~), IMPLICATION (\u27a1\ufe0f), and BICONDITIONAL (<=>)."
        },
        {
          "name": "First-Order Logic (FOL)",
          "desc": "Extends propositional logic by introducing objects, properties (predicates), functions, and quantifiers: Universal (FOR ALL x) and Existential (EXISTS x)."
        },
        {
          "name": "Modus Ponens",
          "desc": "The fundamental inference rule: If proposition P is true, and premise P \u27a1\ufe0f Q is true, then proposition Q must be true."
        },
        {
          "name": "Forward Chaining",
          "desc": "Data-driven inference: starts with known atomic facts in working memory and repeatedly triggers matching IF-THEN rules until no new facts can be deduced."
        },
        {
          "name": "Backward Chaining",
          "desc": "Goal-driven inference: starts with a hypothesis (goal) and searches backward through the rule base to find supporting evidence."
        }
      ]
    },
    "realWorld": [
      {
        "system": "MYCIN Medical Diagnostic Expert System",
        "domain": "Clinical Pharmacology",
        "howItWorks": "Employed over 600 forward- and backward-chaining Horn clause rules to identify bacterial pathogens in blood infections and recommend appropriate antibiotic dosage."
      },
      {
        "system": "Commercial Airline Pre-Flight Safety Verification",
        "domain": "Aviation Safety Systems",
        "howItWorks": "Runs automated First-Order Logic inference engines to verify that all sensor readings, cabin pressurization checks, and flight control interlocks comply with aviation regulations before takeoff."
      },
      {
        "system": "Enterprise Tax Computation Rule Engines",
        "domain": "Financial & Legal Tech",
        "howItWorks": "Evaluates statutory tax rules formulated in propositional logic to deduce deductions, brackets, and corporate tax liability with mathematical auditability."
      }
    ],
    "visualDemo": {
      "type": "inference_chain_visualizer",
      "title": "Modus Ponens & Forward-Chaining Deduction Engine",
      "description": "Trace step-by-step how an inference engine matches conditions in working memory to trigger rules and deduce new proven facts."
    },
    "game": {
      "type": "logic_inference_game",
      "title": "Clinical Diagnostic Logic Inference Engine",
      "instruction": "Configure the patient symptom facts below (Fever, Persistent Cough, Elevated WBC Count). Click 'Run Forward-Chaining Inference' to watch the inference engine match Horn clause rules, update working memory, and deduce the clinical conclusion!",
      "initialFacts": [
        {
          "id": "fact_fever",
          "label": "Patient has high fever (> 38.5\u00b0C)",
          "active": true
        },
        {
          "id": "fact_cough",
          "label": "Patient exhibits persistent productive cough",
          "active": true
        },
        {
          "id": "fact_wbc",
          "label": "Blood test shows elevated White Blood Cell (WBC) count",
          "active": true
        }
      ],
      "rules": [
        {
          "id": "R1",
          "premise": "high fever AND persistent cough",
          "conclusion": "Respiratory Infection",
          "desc": "IF fever AND cough THEN Respiratory Infection"
        },
        {
          "id": "R2",
          "premise": "Respiratory Infection AND elevated WBC",
          "conclusion": "Bacterial Pneumonia",
          "desc": "IF Respiratory Infection AND elevated WBC THEN Bacterial Pneumonia"
        },
        {
          "id": "R3",
          "premise": "Bacterial Pneumonia",
          "conclusion": "Prescribe Targeted Antibiotic Course",
          "desc": "IF Bacterial Pneumonia THEN Prescribe Targeted Antibiotic Course"
        }
      ]
    },
    "quiz": [
      {
        "id": 1,
        "question": "What is the Modus Ponens rule of logical inference?",
        "options": [
          "If P is true and P \u27a1\ufe0f Q is true, then Q is necessarily true.",
          "If P is false, then Q must be true.",
          "If P is true, then Q must be false.",
          "P and Q must always equal zero."
        ],
        "answer": 0,
        "explanation": "Modus Ponens states that given the premise P and the implication 'If P then Q', we can soundly deduce that Q is true."
      },
      {
        "id": 2,
        "question": "What is the defining procedural difference between Forward Chaining and Backward Chaining?",
        "options": [
          "Forward chaining runs on GPUs; backward chaining runs on CPUs.",
          "Forward chaining is data-driven (starts with known facts and derives new ones); backward chaining is goal-driven (starts with a hypothesis and searches for premises).",
          "Forward chaining is only used in games; backward chaining is only used in spreadsheets.",
          "There is no difference between the two."
        ],
        "answer": 1,
        "explanation": "Forward chaining starts with known data and reasons forward to deduce conclusions. Backward chaining starts with a hypothesis and reasons backward to check if supporting facts exist."
      },
      {
        "id": 3,
        "question": "What additional expressive capability does First-Order Logic (FOL) possess compared to Propositional Logic?",
        "options": [
          "FOL can play digital audio files.",
          "FOL introduces objects, relations/predicates, functions, and universal/existential quantifiers (FOR ALL, EXISTS).",
          "FOL only uses true/false without variables.",
          "FOL is limited to numbers between 1 and 10."
        ],
        "answer": 1,
        "explanation": "First-Order Logic allows explicit representation of objects, predicates characterizing relationships among them, and quantifiers expressing statements over domains of objects."
      },
      {
        "id": 4,
        "question": "In expert systems (such as MYCIN), what is the role of the Inference Engine?",
        "options": [
          "To display 3D visual animations.",
          "To apply logical rules to the knowledge base and working memory to infer new facts and recommendations.",
          "To scan the local network for Wi-Fi routers.",
          "To compress user files into zip archives."
        ],
        "answer": 1,
        "explanation": "The inference engine is the algorithmic brain that navigates the rules in the knowledge base, matches conditions against current working memory, and deduces conclusions."
      },
      {
        "id": 5,
        "question": "What is a Horn Clause in computational logic?",
        "options": [
          "A musical audio waveform generated by an AI synthesizer.",
          "A logical clause (disjunction of literals) that contains at most one positive literal, enabling efficient linear-time forward and backward chaining.",
          "A computer security vulnerability.",
          "An error produced during Python compilation."
        ],
        "answer": 1,
        "explanation": "A Horn clause is a disjunction with at most one positive literal. Rules of the form (P1 ^ P2) \u27a1\ufe0f Q can be converted to (~P1 v ~P2 v Q), enabling highly efficient inference."
      }
    ]
  },
  {
    "id": 8,
    "level": 2,
    "title": "8. Introduction to Machine Learning",
    "subtitle": "Statistical Learning, Hypothesis Spaces & Optimization",
    "icon": "\ud83d\udcca",
    "duration": "30 mins",
    "badgeReward": "ML Initiator",
    "focus": "How algorithms discover parametric weights from empirical training data without explicit rules.",
    "learn": {
      "definition": "Machine Learning is the study of computer algorithms that improve automatically through experience. It enables machines to discover parametric weights from empirical training data without explicit rules.",
      "coreFormulation": "Comprehensive engineering study of 8. Introduction to Machine Learning, focusing on mathematical formulation, algorithmic pipelines, and production constraints.",
      "keyConcepts": [
        {
          "name": "Mathematical Foundations",
          "desc": "Theoretical principles and optimization bounds for 8. Introduction to Machine Learning."
        },
        {
          "name": "System Architecture",
          "desc": "Pipeline components, telemetry interfaces, and inference constraints."
        },
        {
          "name": "Production Optimization",
          "desc": "Latency tuning, resource scaling, and reliability monitoring."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Credit Score Rating (FICO)",
        "domain": "Banking & Risk",
        "howItWorks": "Logistic regression and gradient boosting predict borrower default risk from repayment history."
      },
      {
        "system": "Spotify Discover Weekly",
        "domain": "Music Streaming",
        "howItWorks": "Learns acoustic and collaborative embeddings to recommend weekly tracks matching listener tastes."
      }
    ],
    "visualDemo": {
      "type": "standard_visual_demo",
      "title": "Interactive Architecture: 8. Introduction to Machine Learning",
      "description": "Visual workflow pipeline mapping input features, intermediate representations, and outputs for 8. Introduction to Machine Learning."
    },
    "game": {
      "type": "concept_challenge",
      "title": "Hypothesis Space Explorer",
      "instruction": "Adjust model complexity (linear vs polynomial degree) and observe how the hypothesis function fits noisy data points without underfitting or overfitting!",
      "topicId": 8
    },
    "quiz": [
      {
        "id": 1,
        "question": "What is the primary objective of Machine Learning?",
        "options": [
          "To hand-code every possible if-else scenario",
          "To automatically derive mathematical functions and weights from empirical data that generalize to unseen inputs",
          "To increase CPU temperature",
          "To eliminate the need for computer memory"
        ],
        "answer": 1,
        "explanation": "ML focuses on learning generalizable models from data rather than hardcoding deterministic logic."
      },
      {
        "id": 2,
        "question": "In production systems implementing 8. Introduction to Machine Learning, what is a primary engineering concern?",
        "options": [
          "Ensuring the model has zero mathematical parameters.",
          "Balancing computational latency, memory footprint, and generalizability on unseen distribution shifts.",
          "Deleting the database after every query.",
          "Preventing the computer from using electricity."
        ],
        "answer": 1,
        "explanation": "Deploying machine learning systems in production requires careful optimization of latency, throughput, memory bounds, and monitoring for data distribution drift."
      },
      {
        "id": 3,
        "question": "Which metric or validation practice is essential when developing 8. Introduction to Machine Learning?",
        "options": [
          "Evaluating solely on training data with zero cross-validation.",
          "Using dedicated validation splits and metrics aligned with real-world operational costs and trade-offs.",
          "Ignoring all edge cases.",
          "Running the algorithm only once on a sample of 2 items."
        ],
        "answer": 1,
        "explanation": "Rigorous validation using independent holdout splits or cross-validation is essential to ensure generalizability and avoid data leakage."
      },
      {
        "id": 4,
        "question": "How do engineers prevent failure modes when implementing 8. Introduction to Machine Learning?",
        "options": [
          "By employing regularization, input validation sanitization, and fallback heuristics.",
          "By never testing the code before deployment.",
          "By disabling all logging and metrics.",
          "By hardcoding the output to always be zero."
        ],
        "answer": 0,
        "explanation": "Robust production systems combine regularization, input schema validation, latency budgets, and fallback rule mechanisms."
      },
      {
        "id": 5,
        "question": "What is the ultimate academic learning outcome for mastering 8. Introduction to Machine Learning?",
        "options": [
          "Memorizing variable names without understanding concepts.",
          "Understanding the algorithmic theory, implementing architectures, evaluating performance, and reasoning about ethical deployment trade-offs.",
          "Believing AI operates by magic.",
          "Writing code without any comments or structure."
        ],
        "answer": 1,
        "explanation": "Mastery involves a rigorous end-to-end understanding of mathematical foundations, practical engineering implementation, and responsible deployment ethics."
      }
    ]
  },
  {
    "id": 9,
    "level": 2,
    "title": "9. Types of Machine Learning",
    "subtitle": "Supervised, Unsupervised, Semi-Supervised & Reinforcement",
    "icon": "\ud83d\uddc2\ufe0f",
    "duration": "30 mins",
    "badgeReward": "Paradigm Analyst",
    "focus": "Labeled regression/classification, clustering/dimensionality reduction, and reward-driven policies.",
    "learn": {
      "definition": "Machine learning algorithms fall into four principal paradigms: Supervised Learning (labeled training data), Unsupervised Learning (discovering hidden structure in unlabeled data), Semi-Supervised Learning, and Reinforcement Learning (reward-driven policies).",
      "coreFormulation": "Comprehensive engineering study of 9. Types of Machine Learning, focusing on mathematical formulation, algorithmic pipelines, and production constraints.",
      "keyConcepts": [
        {
          "name": "Mathematical Foundations",
          "desc": "Theoretical principles and optimization bounds for 9. Types of Machine Learning."
        },
        {
          "name": "System Architecture",
          "desc": "Pipeline components, telemetry interfaces, and inference constraints."
        },
        {
          "name": "Production Optimization",
          "desc": "Latency tuning, resource scaling, and reliability monitoring."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Spam Detection (Supervised)",
        "domain": "Cybersecurity",
        "howItWorks": "Trained on millions of labeled spam vs ham emails to classify incoming messages."
      },
      {
        "system": "Customer Market Segmentation (Unsupervised)",
        "domain": "Retail Analytics",
        "howItWorks": "Clusters millions of customer purchase profiles into distinct personas without pre-existing labels."
      }
    ],
    "visualDemo": {
      "type": "standard_visual_demo",
      "title": "Interactive Architecture: 9. Types of Machine Learning",
      "description": "Visual workflow pipeline mapping input features, intermediate representations, and outputs for 9. Types of Machine Learning."
    },
    "game": {
      "type": "concept_challenge",
      "title": "Paradigm Classifier Challenge",
      "instruction": "Given 6 real-world data science problems, classify each into Supervised, Unsupervised, or Reinforcement Learning!",
      "topicId": 9
    },
    "quiz": [
      {
        "id": 1,
        "question": "Which machine learning paradigm uses labeled input-output pairs during training?",
        "options": [
          "Supervised Learning",
          "Unsupervised Learning",
          "Reinforcement Learning",
          "Heuristic Search"
        ],
        "answer": 0,
        "explanation": "Supervised learning relies on labeled datasets where each training example has an associated ground truth target."
      },
      {
        "id": 2,
        "question": "In production systems implementing 9. Types of Machine Learning, what is a primary engineering concern?",
        "options": [
          "Ensuring the model has zero mathematical parameters.",
          "Balancing computational latency, memory footprint, and generalizability on unseen distribution shifts.",
          "Deleting the database after every query.",
          "Preventing the computer from using electricity."
        ],
        "answer": 1,
        "explanation": "Deploying machine learning systems in production requires careful optimization of latency, throughput, memory bounds, and monitoring for data distribution drift."
      },
      {
        "id": 3,
        "question": "Which metric or validation practice is essential when developing 9. Types of Machine Learning?",
        "options": [
          "Evaluating solely on training data with zero cross-validation.",
          "Using dedicated validation splits and metrics aligned with real-world operational costs and trade-offs.",
          "Ignoring all edge cases.",
          "Running the algorithm only once on a sample of 2 items."
        ],
        "answer": 1,
        "explanation": "Rigorous validation using independent holdout splits or cross-validation is essential to ensure generalizability and avoid data leakage."
      },
      {
        "id": 4,
        "question": "How do engineers prevent failure modes when implementing 9. Types of Machine Learning?",
        "options": [
          "By employing regularization, input validation sanitization, and fallback heuristics.",
          "By never testing the code before deployment.",
          "By disabling all logging and metrics.",
          "By hardcoding the output to always be zero."
        ],
        "answer": 0,
        "explanation": "Robust production systems combine regularization, input schema validation, latency budgets, and fallback rule mechanisms."
      },
      {
        "id": 5,
        "question": "What is the ultimate academic learning outcome for mastering 9. Types of Machine Learning?",
        "options": [
          "Memorizing variable names without understanding concepts.",
          "Understanding the algorithmic theory, implementing architectures, evaluating performance, and reasoning about ethical deployment trade-offs.",
          "Believing AI operates by magic.",
          "Writing code without any comments or structure."
        ],
        "answer": 1,
        "explanation": "Mastery involves a rigorous end-to-end understanding of mathematical foundations, practical engineering implementation, and responsible deployment ethics."
      }
    ]
  },
  {
    "id": 10,
    "level": 2,
    "title": "10. Data Preprocessing",
    "subtitle": "Imputation, Normalization, One-Hot Encoding & Feature Scaling",
    "icon": "\ud83e\uddf9",
    "duration": "35 mins",
    "badgeReward": "Data Wrangler",
    "focus": "Handling missing values, outlier detection, MinMax/Z-score normalization, and feature selection.",
    "learn": {
      "definition": "Data preprocessing is the critical preparatory stage in machine learning where raw, noisy, incomplete, or heterogeneous data is transformed into clean, standardized numerical matrices suitable for algorithmic optimization.",
      "coreFormulation": "Comprehensive engineering study of 10. Data Preprocessing, focusing on mathematical formulation, algorithmic pipelines, and production constraints.",
      "keyConcepts": [
        {
          "name": "Mathematical Foundations",
          "desc": "Theoretical principles and optimization bounds for 10. Data Preprocessing."
        },
        {
          "name": "System Architecture",
          "desc": "Pipeline components, telemetry interfaces, and inference constraints."
        },
        {
          "name": "Production Optimization",
          "desc": "Latency tuning, resource scaling, and reliability monitoring."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Electronic Health Record (EHR) Imputation",
        "domain": "Healthcare Analytics",
        "howItWorks": "Uses KNN and MICE imputation to handle missing lab test values in patient medical records."
      },
      {
        "system": "E-Commerce Categorical Feature Encoding",
        "domain": "Online Retail",
        "howItWorks": "Converts thousands of categorical product attributes (brand, color, department) using target encoding and one-hot encoding."
      }
    ],
    "visualDemo": {
      "type": "standard_visual_demo",
      "title": "Interactive Architecture: 10. Data Preprocessing",
      "description": "Visual workflow pipeline mapping input features, intermediate representations, and outputs for 10. Data Preprocessing."
    },
    "game": {
      "type": "concept_challenge",
      "title": "Data Cleaning Pipeline Simulator",
      "instruction": "Clean a corrupted dataset table by applying median imputation for missing values, Z-score outlier removal, and MinMax scaling!",
      "topicId": 10
    },
    "quiz": [
      {
        "id": 1,
        "question": "Why is feature scaling (e.g. MinMax or StandardScaler) crucial for distance-based ML algorithms like KNN and gradient descent?",
        "options": [
          "It reduces file size on disk.",
          "It prevents features with large numeric ranges from dominating features with small numeric ranges.",
          "It converts all numbers into text.",
          "It eliminates the need for test data."
        ],
        "answer": 1,
        "explanation": "Feature scaling ensures that all features contribute proportionally to Euclidean distances and gradient step updates."
      },
      {
        "id": 2,
        "question": "In production systems implementing 10. Data Preprocessing, what is a primary engineering concern?",
        "options": [
          "Ensuring the model has zero mathematical parameters.",
          "Balancing computational latency, memory footprint, and generalizability on unseen distribution shifts.",
          "Deleting the database after every query.",
          "Preventing the computer from using electricity."
        ],
        "answer": 1,
        "explanation": "Deploying machine learning systems in production requires careful optimization of latency, throughput, memory bounds, and monitoring for data distribution drift."
      },
      {
        "id": 3,
        "question": "Which metric or validation practice is essential when developing 10. Data Preprocessing?",
        "options": [
          "Evaluating solely on training data with zero cross-validation.",
          "Using dedicated validation splits and metrics aligned with real-world operational costs and trade-offs.",
          "Ignoring all edge cases.",
          "Running the algorithm only once on a sample of 2 items."
        ],
        "answer": 1,
        "explanation": "Rigorous validation using independent holdout splits or cross-validation is essential to ensure generalizability and avoid data leakage."
      },
      {
        "id": 4,
        "question": "How do engineers prevent failure modes when implementing 10. Data Preprocessing?",
        "options": [
          "By employing regularization, input validation sanitization, and fallback heuristics.",
          "By never testing the code before deployment.",
          "By disabling all logging and metrics.",
          "By hardcoding the output to always be zero."
        ],
        "answer": 0,
        "explanation": "Robust production systems combine regularization, input schema validation, latency budgets, and fallback rule mechanisms."
      },
      {
        "id": 5,
        "question": "What is the ultimate academic learning outcome for mastering 10. Data Preprocessing?",
        "options": [
          "Memorizing variable names without understanding concepts.",
          "Understanding the algorithmic theory, implementing architectures, evaluating performance, and reasoning about ethical deployment trade-offs.",
          "Believing AI operates by magic.",
          "Writing code without any comments or structure."
        ],
        "answer": 1,
        "explanation": "Mastery involves a rigorous end-to-end understanding of mathematical foundations, practical engineering implementation, and responsible deployment ethics."
      }
    ]
  },
  {
    "id": 11,
    "level": 2,
    "title": "11. Regression Algorithms",
    "subtitle": "Linear Regression, Cost Functions (MSE) & Gradient Descent",
    "icon": "\ud83d\udcc8",
    "duration": "35 mins",
    "badgeReward": "Regression Expert",
    "focus": "Ordinary Least Squares, slope/intercept optimization, Ridge (L2), and Lasso (L1) regularization.",
    "learn": {
      "definition": "Regression algorithms model and predict continuous numerical quantities by fitting mathematical functions to observed relationships between dependent variables and independent feature vectors.",
      "coreFormulation": "Comprehensive engineering study of 11. Regression Algorithms, focusing on mathematical formulation, algorithmic pipelines, and production constraints.",
      "keyConcepts": [
        {
          "name": "Mathematical Foundations",
          "desc": "Theoretical principles and optimization bounds for 11. Regression Algorithms."
        },
        {
          "name": "System Architecture",
          "desc": "Pipeline components, telemetry interfaces, and inference constraints."
        },
        {
          "name": "Production Optimization",
          "desc": "Latency tuning, resource scaling, and reliability monitoring."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Zillow Zestimate Home Valuation",
        "domain": "Real Estate FinTech",
        "howItWorks": "Predicts residential home market value from square footage, bedroom count, tax history, and location."
      },
      {
        "system": "Cloud Compute Cost Forecasting",
        "domain": "DevOps & Cloud",
        "howItWorks": "Uses regularized multivariate regression to predict monthly AWS/GCP bill amounts based on workload metrics."
      }
    ],
    "visualDemo": {
      "type": "standard_visual_demo",
      "title": "Interactive Architecture: 11. Regression Algorithms",
      "description": "Visual workflow pipeline mapping input features, intermediate representations, and outputs for 11. Regression Algorithms."
    },
    "game": {
      "type": "concept_challenge",
      "title": "Gradient Descent Slope Optimizer",
      "instruction": "Adjust the learning rate alpha and observe how gradient descent converges down the parabolic Mean Squared Error (MSE) loss surface!",
      "topicId": 11
    },
    "quiz": [
      {
        "id": 1,
        "question": "In Ordinary Least Squares Linear Regression, what does the Mean Squared Error (MSE) cost function measure?",
        "options": [
          "The speed of the computer processor.",
          "The average squared difference between the model's predicted values and the actual target values.",
          "The number of features in the dataset.",
          "The accuracy percentage of classification."
        ],
        "answer": 1,
        "explanation": "MSE measures the average of the squared residuals between actual targets y and predicted values y_hat."
      },
      {
        "id": 2,
        "question": "In production systems implementing 11. Regression Algorithms, what is a primary engineering concern?",
        "options": [
          "Ensuring the model has zero mathematical parameters.",
          "Balancing computational latency, memory footprint, and generalizability on unseen distribution shifts.",
          "Deleting the database after every query.",
          "Preventing the computer from using electricity."
        ],
        "answer": 1,
        "explanation": "Deploying machine learning systems in production requires careful optimization of latency, throughput, memory bounds, and monitoring for data distribution drift."
      },
      {
        "id": 3,
        "question": "Which metric or validation practice is essential when developing 11. Regression Algorithms?",
        "options": [
          "Evaluating solely on training data with zero cross-validation.",
          "Using dedicated validation splits and metrics aligned with real-world operational costs and trade-offs.",
          "Ignoring all edge cases.",
          "Running the algorithm only once on a sample of 2 items."
        ],
        "answer": 1,
        "explanation": "Rigorous validation using independent holdout splits or cross-validation is essential to ensure generalizability and avoid data leakage."
      },
      {
        "id": 4,
        "question": "How do engineers prevent failure modes when implementing 11. Regression Algorithms?",
        "options": [
          "By employing regularization, input validation sanitization, and fallback heuristics.",
          "By never testing the code before deployment.",
          "By disabling all logging and metrics.",
          "By hardcoding the output to always be zero."
        ],
        "answer": 0,
        "explanation": "Robust production systems combine regularization, input schema validation, latency budgets, and fallback rule mechanisms."
      },
      {
        "id": 5,
        "question": "What is the ultimate academic learning outcome for mastering 11. Regression Algorithms?",
        "options": [
          "Memorizing variable names without understanding concepts.",
          "Understanding the algorithmic theory, implementing architectures, evaluating performance, and reasoning about ethical deployment trade-offs.",
          "Believing AI operates by magic.",
          "Writing code without any comments or structure."
        ],
        "answer": 1,
        "explanation": "Mastery involves a rigorous end-to-end understanding of mathematical foundations, practical engineering implementation, and responsible deployment ethics."
      }
    ]
  },
  {
    "id": 12,
    "level": 2,
    "title": "12. Classification Algorithms",
    "subtitle": "Logistic Regression, Decision Trees, KNN, Naive Bayes & SVM",
    "icon": "\ud83c\udfaf",
    "duration": "40 mins",
    "badgeReward": "Classification Pro",
    "focus": "Gini impurity, entropy, Bayes theorem, maximum-margin hyperplanes, and kernel tricks.",
    "learn": {
      "definition": "Classification algorithms predict categorical class labels for given input feature vectors. Core techniques include Logistic Regression, Decision Trees (CART), K-Nearest Neighbors, Naive Bayes, and Support Vector Machines.",
      "coreFormulation": "Comprehensive engineering study of 12. Classification Algorithms, focusing on mathematical formulation, algorithmic pipelines, and production constraints.",
      "keyConcepts": [
        {
          "name": "Mathematical Foundations",
          "desc": "Theoretical principles and optimization bounds for 12. Classification Algorithms."
        },
        {
          "name": "System Architecture",
          "desc": "Pipeline components, telemetry interfaces, and inference constraints."
        },
        {
          "name": "Production Optimization",
          "desc": "Latency tuning, resource scaling, and reliability monitoring."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Cardiovascular Heart Disease Predictor",
        "domain": "Clinical Cardiology",
        "howItWorks": "Uses logistic regression and random forests to classify whether a patient is at high or low risk of coronary artery disease."
      },
      {
        "system": "Autonomous Vehicle Traffic Sign Recognition",
        "domain": "Computer Vision",
        "howItWorks": "Classifies camera images into speed limits, stop signs, and yield warnings using multi-class SVMs and CNNs."
      }
    ],
    "visualDemo": {
      "type": "standard_visual_demo",
      "title": "Interactive Architecture: 12. Classification Algorithms",
      "description": "Visual workflow pipeline mapping input features, intermediate representations, and outputs for 12. Classification Algorithms."
    },
    "game": {
      "type": "concept_challenge",
      "title": "Decision Boundary Playground",
      "instruction": "Toggle between Linear Logistic Regression, Decision Tree orthogonal splits, and KNN non-linear boundaries on a 2D scatter plot!",
      "topicId": 12
    },
    "quiz": [
      {
        "id": 1,
        "question": "How does a Decision Tree select the best feature split at each node?",
        "options": [
          "By picking a random feature each time.",
          "By maximizing Information Gain or minimizing Gini Impurity to achieve purest possible child subsets.",
          "By computing the inverse of the feature matrix.",
          "By sorting feature names alphabetically."
        ],
        "answer": 1,
        "explanation": "Decision trees evaluate split criteria using metrics like Gini Impurity or Entropy/Information Gain to produce homogeneous child nodes."
      },
      {
        "id": 2,
        "question": "In production systems implementing 12. Classification Algorithms, what is a primary engineering concern?",
        "options": [
          "Ensuring the model has zero mathematical parameters.",
          "Balancing computational latency, memory footprint, and generalizability on unseen distribution shifts.",
          "Deleting the database after every query.",
          "Preventing the computer from using electricity."
        ],
        "answer": 1,
        "explanation": "Deploying machine learning systems in production requires careful optimization of latency, throughput, memory bounds, and monitoring for data distribution drift."
      },
      {
        "id": 3,
        "question": "Which metric or validation practice is essential when developing 12. Classification Algorithms?",
        "options": [
          "Evaluating solely on training data with zero cross-validation.",
          "Using dedicated validation splits and metrics aligned with real-world operational costs and trade-offs.",
          "Ignoring all edge cases.",
          "Running the algorithm only once on a sample of 2 items."
        ],
        "answer": 1,
        "explanation": "Rigorous validation using independent holdout splits or cross-validation is essential to ensure generalizability and avoid data leakage."
      },
      {
        "id": 4,
        "question": "How do engineers prevent failure modes when implementing 12. Classification Algorithms?",
        "options": [
          "By employing regularization, input validation sanitization, and fallback heuristics.",
          "By never testing the code before deployment.",
          "By disabling all logging and metrics.",
          "By hardcoding the output to always be zero."
        ],
        "answer": 0,
        "explanation": "Robust production systems combine regularization, input schema validation, latency budgets, and fallback rule mechanisms."
      },
      {
        "id": 5,
        "question": "What is the ultimate academic learning outcome for mastering 12. Classification Algorithms?",
        "options": [
          "Memorizing variable names without understanding concepts.",
          "Understanding the algorithmic theory, implementing architectures, evaluating performance, and reasoning about ethical deployment trade-offs.",
          "Believing AI operates by magic.",
          "Writing code without any comments or structure."
        ],
        "answer": 1,
        "explanation": "Mastery involves a rigorous end-to-end understanding of mathematical foundations, practical engineering implementation, and responsible deployment ethics."
      }
    ]
  },
  {
    "id": 13,
    "level": 2,
    "title": "13. Clustering Algorithms",
    "subtitle": "K-Means, Hierarchical Clustering & Silhouette Analysis",
    "icon": "\ud83e\udee7",
    "duration": "35 mins",
    "badgeReward": "Cluster Specialist",
    "focus": "Centroid initialization, Voronoi partitions, dendrograms, and unsupervised clustering metrics.",
    "learn": {
      "definition": "Clustering is the primary unsupervised learning technique that partitions an unlabeled dataset into distinct groups (clusters) such that data points within the same group share high similarity while differing substantially from points in other groups.",
      "coreFormulation": "Comprehensive engineering study of 13. Clustering Algorithms, focusing on mathematical formulation, algorithmic pipelines, and production constraints.",
      "keyConcepts": [
        {
          "name": "Mathematical Foundations",
          "desc": "Theoretical principles and optimization bounds for 13. Clustering Algorithms."
        },
        {
          "name": "System Architecture",
          "desc": "Pipeline components, telemetry interfaces, and inference constraints."
        },
        {
          "name": "Production Optimization",
          "desc": "Latency tuning, resource scaling, and reliability monitoring."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Customer Market Basket Segmentation",
        "domain": "Retail Analytics",
        "howItWorks": "Partitions 10 million supermarket loyalty card holders into distinct demographic purchasing clusters using K-Means."
      },
      {
        "system": "Genomic Gene Expression Profiling",
        "domain": "Bioinformatics",
        "howItWorks": "Uses Agglomerative Hierarchical Clustering to construct dendrograms grouping genes that exhibit correlated activation across clinical trials."
      }
    ],
    "visualDemo": {
      "type": "standard_visual_demo",
      "title": "Interactive Architecture: 13. Clustering Algorithms",
      "description": "Visual workflow pipeline mapping input features, intermediate representations, and outputs for 13. Clustering Algorithms."
    },
    "game": {
      "type": "concept_challenge",
      "title": "K-Means Centroid Convergence Arena",
      "instruction": "Place 3 initial cluster centroids (K=3) on a 2D data distribution and step through Expectation-Maximization iterations to see the centroids converge!",
      "topicId": 13
    },
    "quiz": [
      {
        "id": 1,
        "question": "In the standard K-Means clustering algorithm, what happens during the 'Update' step?",
        "options": [
          "Data points are randomly deleted.",
          "Centroid positions are recomputed as the mathematical mean of all data points currently assigned to that cluster.",
          "K is doubled automatically.",
          "All labels are reset to zero."
        ],
        "answer": 1,
        "explanation": "In K-Means, after assigning points to their nearest centroid, each centroid's coordinates are recalculated as the center of mass (mean) of its assigned points."
      },
      {
        "id": 2,
        "question": "In production systems implementing 13. Clustering Algorithms, what is a primary engineering concern?",
        "options": [
          "Ensuring the model has zero mathematical parameters.",
          "Balancing computational latency, memory footprint, and generalizability on unseen distribution shifts.",
          "Deleting the database after every query.",
          "Preventing the computer from using electricity."
        ],
        "answer": 1,
        "explanation": "Deploying machine learning systems in production requires careful optimization of latency, throughput, memory bounds, and monitoring for data distribution drift."
      },
      {
        "id": 3,
        "question": "Which metric or validation practice is essential when developing 13. Clustering Algorithms?",
        "options": [
          "Evaluating solely on training data with zero cross-validation.",
          "Using dedicated validation splits and metrics aligned with real-world operational costs and trade-offs.",
          "Ignoring all edge cases.",
          "Running the algorithm only once on a sample of 2 items."
        ],
        "answer": 1,
        "explanation": "Rigorous validation using independent holdout splits or cross-validation is essential to ensure generalizability and avoid data leakage."
      },
      {
        "id": 4,
        "question": "How do engineers prevent failure modes when implementing 13. Clustering Algorithms?",
        "options": [
          "By employing regularization, input validation sanitization, and fallback heuristics.",
          "By never testing the code before deployment.",
          "By disabling all logging and metrics.",
          "By hardcoding the output to always be zero."
        ],
        "answer": 0,
        "explanation": "Robust production systems combine regularization, input schema validation, latency budgets, and fallback rule mechanisms."
      },
      {
        "id": 5,
        "question": "What is the ultimate academic learning outcome for mastering 13. Clustering Algorithms?",
        "options": [
          "Memorizing variable names without understanding concepts.",
          "Understanding the algorithmic theory, implementing architectures, evaluating performance, and reasoning about ethical deployment trade-offs.",
          "Believing AI operates by magic.",
          "Writing code without any comments or structure."
        ],
        "answer": 1,
        "explanation": "Mastery involves a rigorous end-to-end understanding of mathematical foundations, practical engineering implementation, and responsible deployment ethics."
      }
    ]
  },
  {
    "id": 14,
    "level": 2,
    "title": "14. Model Training and Testing",
    "subtitle": "Train/Validation/Test Splits, Bias-Variance Tradeoff & K-Fold",
    "icon": "\ud83e\uddea",
    "duration": "30 mins",
    "badgeReward": "Validation Master",
    "focus": "Detecting overfitting vs underfitting, learning curves, and stratified cross-validation.",
    "learn": {
      "definition": "Model training and validation methodology is the scientific framework that ensures machine learning models generalize reliably to unseen test distributions without falling victim to overfitting (high variance) or underfitting (high bias).",
      "coreFormulation": "Comprehensive engineering study of 14. Model Training and Testing, focusing on mathematical formulation, algorithmic pipelines, and production constraints.",
      "keyConcepts": [
        {
          "name": "Mathematical Foundations",
          "desc": "Theoretical principles and optimization bounds for 14. Model Training and Testing."
        },
        {
          "name": "System Architecture",
          "desc": "Pipeline components, telemetry interfaces, and inference constraints."
        },
        {
          "name": "Production Optimization",
          "desc": "Latency tuning, resource scaling, and reliability monitoring."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Clinical Diagnostic Model Cross-Validation",
        "domain": "Medical AI",
        "howItWorks": "Employs 5-fold stratified cross-validation across distinct hospital patient cohorts to guarantee unbiased sensitivity estimates."
      },
      {
        "system": "Algorithmic Trading Walk-Forward Validation",
        "domain": "Quantitative Finance",
        "howItWorks": "Trains models strictly on rolling past historical market windows to prevent look-ahead bias and data leakage."
      }
    ],
    "visualDemo": {
      "type": "standard_visual_demo",
      "title": "Interactive Architecture: 14. Model Training and Testing",
      "description": "Visual workflow pipeline mapping input features, intermediate representations, and outputs for 14. Model Training and Testing."
    },
    "game": {
      "type": "concept_challenge",
      "title": "Overfitting vs Underfitting Tuner",
      "instruction": "Adjust model capacity and regularization penalty lambda. Watch training error decrease while validation error reveals the sweet spot of optimal generalization!",
      "topicId": 14
    },
    "quiz": [
      {
        "id": 1,
        "question": "What is the primary indicator of an overfitted machine learning model?",
        "options": [
          "High training error and high test error.",
          "Near-zero training error, but substantially higher error on the validation/test set.",
          "The model refuses to run on GPUs.",
          "The training dataset has zero rows."
        ],
        "answer": 1,
        "explanation": "Overfitting occurs when a model memorizes the training data including noise, leading to near-zero training error but poor generalization on unseen validation data."
      },
      {
        "id": 2,
        "question": "In production systems implementing 14. Model Training and Testing, what is a primary engineering concern?",
        "options": [
          "Ensuring the model has zero mathematical parameters.",
          "Balancing computational latency, memory footprint, and generalizability on unseen distribution shifts.",
          "Deleting the database after every query.",
          "Preventing the computer from using electricity."
        ],
        "answer": 1,
        "explanation": "Deploying machine learning systems in production requires careful optimization of latency, throughput, memory bounds, and monitoring for data distribution drift."
      },
      {
        "id": 3,
        "question": "Which metric or validation practice is essential when developing 14. Model Training and Testing?",
        "options": [
          "Evaluating solely on training data with zero cross-validation.",
          "Using dedicated validation splits and metrics aligned with real-world operational costs and trade-offs.",
          "Ignoring all edge cases.",
          "Running the algorithm only once on a sample of 2 items."
        ],
        "answer": 1,
        "explanation": "Rigorous validation using independent holdout splits or cross-validation is essential to ensure generalizability and avoid data leakage."
      },
      {
        "id": 4,
        "question": "How do engineers prevent failure modes when implementing 14. Model Training and Testing?",
        "options": [
          "By employing regularization, input validation sanitization, and fallback heuristics.",
          "By never testing the code before deployment.",
          "By disabling all logging and metrics.",
          "By hardcoding the output to always be zero."
        ],
        "answer": 0,
        "explanation": "Robust production systems combine regularization, input schema validation, latency budgets, and fallback rule mechanisms."
      },
      {
        "id": 5,
        "question": "What is the ultimate academic learning outcome for mastering 14. Model Training and Testing?",
        "options": [
          "Memorizing variable names without understanding concepts.",
          "Understanding the algorithmic theory, implementing architectures, evaluating performance, and reasoning about ethical deployment trade-offs.",
          "Believing AI operates by magic.",
          "Writing code without any comments or structure."
        ],
        "answer": 1,
        "explanation": "Mastery involves a rigorous end-to-end understanding of mathematical foundations, practical engineering implementation, and responsible deployment ethics."
      }
    ]
  },
  {
    "id": 15,
    "level": 2,
    "title": "15. Model Evaluation Metrics",
    "subtitle": "Confusion Matrix, Precision, Recall, F1-Score & ROC-AUC",
    "icon": "\ud83d\udcd0",
    "duration": "35 mins",
    "badgeReward": "Metrics Evaluator",
    "focus": "Type I vs Type II errors, sensitivity, specificity, Precision-Recall tradeoff, and AUC curves.",
    "learn": {
      "definition": "Evaluation metrics provide quantitative mathematical benchmarks for measuring classification and regression model performance. In classification, metrics are derived from the Confusion Matrix: True Positives (TP), True Negatives (TN), False Positives (FP), and False Negatives (FN).",
      "coreFormulation": "Comprehensive engineering study of 15. Model Evaluation Metrics, focusing on mathematical formulation, algorithmic pipelines, and production constraints.",
      "keyConcepts": [
        {
          "name": "Mathematical Foundations",
          "desc": "Theoretical principles and optimization bounds for 15. Model Evaluation Metrics."
        },
        {
          "name": "System Architecture",
          "desc": "Pipeline components, telemetry interfaces, and inference constraints."
        },
        {
          "name": "Production Optimization",
          "desc": "Latency tuning, resource scaling, and reliability monitoring."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Cancer Biopsy Screening Metric Selection",
        "domain": "Oncology",
        "howItWorks": "Optimizes for maximum Recall (Sensitivity) to minimize False Negatives, ensuring malignant tumors are never missed."
      },
      {
        "system": "Banking Fraud Alert Precision Tuning",
        "domain": "Financial Security",
        "howItWorks": "Balances Precision and Recall via F1-score so security analysts are not overwhelmed by thousands of False Positive alerts."
      }
    ],
    "visualDemo": {
      "type": "standard_visual_demo",
      "title": "Interactive Architecture: 15. Model Evaluation Metrics",
      "description": "Visual workflow pipeline mapping input features, intermediate representations, and outputs for 15. Model Evaluation Metrics."
    },
    "game": {
      "type": "concept_challenge",
      "title": "Confusion Matrix & Threshold Slider",
      "instruction": "Drag the classification probability threshold from 0.1 to 0.9. Watch how Precision, Recall, and False Alarms trade off in real time on a live confusion matrix!",
      "topicId": 15
    },
    "quiz": [
      {
        "id": 1,
        "question": "In medical cancer detection, why is high Recall (Sensitivity) typically prioritized over high Precision?",
        "options": [
          "Because false positives are fatal, but missed tumors are harmless.",
          "Because a False Negative (failing to detect a real cancer) carries catastrophic risk, whereas a False Positive can be ruled out by follow-up tests.",
          "Because Recall uses fewer mathematical operations.",
          "Because Precision only applies to regression problems."
        ],
        "answer": 1,
        "explanation": "In life-critical diagnostics, minimizing False Negatives (maximizing Recall) is paramount because missing a true disease case has severe medical consequences."
      },
      {
        "id": 2,
        "question": "In production systems implementing 15. Model Evaluation Metrics, what is a primary engineering concern?",
        "options": [
          "Ensuring the model has zero mathematical parameters.",
          "Balancing computational latency, memory footprint, and generalizability on unseen distribution shifts.",
          "Deleting the database after every query.",
          "Preventing the computer from using electricity."
        ],
        "answer": 1,
        "explanation": "Deploying machine learning systems in production requires careful optimization of latency, throughput, memory bounds, and monitoring for data distribution drift."
      },
      {
        "id": 3,
        "question": "Which metric or validation practice is essential when developing 15. Model Evaluation Metrics?",
        "options": [
          "Evaluating solely on training data with zero cross-validation.",
          "Using dedicated validation splits and metrics aligned with real-world operational costs and trade-offs.",
          "Ignoring all edge cases.",
          "Running the algorithm only once on a sample of 2 items."
        ],
        "answer": 1,
        "explanation": "Rigorous validation using independent holdout splits or cross-validation is essential to ensure generalizability and avoid data leakage."
      },
      {
        "id": 4,
        "question": "How do engineers prevent failure modes when implementing 15. Model Evaluation Metrics?",
        "options": [
          "By employing regularization, input validation sanitization, and fallback heuristics.",
          "By never testing the code before deployment.",
          "By disabling all logging and metrics.",
          "By hardcoding the output to always be zero."
        ],
        "answer": 0,
        "explanation": "Robust production systems combine regularization, input schema validation, latency budgets, and fallback rule mechanisms."
      },
      {
        "id": 5,
        "question": "What is the ultimate academic learning outcome for mastering 15. Model Evaluation Metrics?",
        "options": [
          "Memorizing variable names without understanding concepts.",
          "Understanding the algorithmic theory, implementing architectures, evaluating performance, and reasoning about ethical deployment trade-offs.",
          "Believing AI operates by magic.",
          "Writing code without any comments or structure."
        ],
        "answer": 1,
        "explanation": "Mastery involves a rigorous end-to-end understanding of mathematical foundations, practical engineering implementation, and responsible deployment ethics."
      }
    ]
  },
  {
    "id": 16,
    "level": 3,
    "title": "16. Artificial Neural Networks",
    "subtitle": "Perceptrons, Multilayer Perceptrons (MLP) & Forward Pass",
    "icon": "\ud83d\udd78\ufe0f",
    "duration": "40 mins",
    "badgeReward": "Perceptron Builder",
    "focus": "Neuron anatomy, dot product of inputs and weights, bias offsets, and dense layer architectures.",
    "learn": {
      "definition": "Artificial Neural Networks (ANNs) are computational models inspired by biological neuronal circuitry. An artificial neuron computes the weighted sum of its inputs plus a bias offset: z = sum(w_i * x_i) + b, and passes the scalar result through a non-linear activation function.",
      "coreFormulation": "Comprehensive engineering study of 16. Artificial Neural Networks, focusing on mathematical formulation, algorithmic pipelines, and production constraints.",
      "keyConcepts": [
        {
          "name": "Mathematical Foundations",
          "desc": "Theoretical principles and optimization bounds for 16. Artificial Neural Networks."
        },
        {
          "name": "System Architecture",
          "desc": "Pipeline components, telemetry interfaces, and inference constraints."
        },
        {
          "name": "Production Optimization",
          "desc": "Latency tuning, resource scaling, and reliability monitoring."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Handwritten Digit Recognizer (MNIST)",
        "domain": "Optical Character Recognition",
        "howItWorks": "A 3-layer MLP maps 784 pixel inputs into 10 softmax class probabilities with 98% accuracy."
      },
      {
        "system": "Smart Sensor Factory Quality Control",
        "domain": "Industrial IoT",
        "howItWorks": "A feedforward MLP monitors acoustic vibration sensors on rotating turbine shafts to classify normal vs anomalous mechanical wear."
      }
    ],
    "visualDemo": {
      "type": "standard_visual_demo",
      "title": "Interactive Architecture: 16. Artificial Neural Networks",
      "description": "Visual workflow pipeline mapping input features, intermediate representations, and outputs for 16. Artificial Neural Networks."
    },
    "game": {
      "type": "concept_challenge",
      "title": "Interactive Perceptron Neuron Sandbox",
      "instruction": "Adjust weights w1, w2 and bias b to watch the linear decision boundary shift on a 2D plane and classify logic gates (AND, OR)!",
      "topicId": 16
    },
    "quiz": [
      {
        "id": 1,
        "question": "Why can a single-layer perceptron without hidden layers solve the AND gate but fail to solve the XOR gate?",
        "options": [
          "Because XOR requires floating point numbers.",
          "Because XOR is a non-linearly separable problem, which cannot be partitioned by a single linear hyperplane.",
          "Because perceptrons can only compute negative numbers.",
          "Because XOR was invented after the perceptron."
        ],
        "answer": 1,
        "explanation": "Minsky & Papert (1969) proved that single-layer perceptrons can only classify linearly separable patterns. Non-linear problems like XOR require multi-layer architectures with non-linear activations."
      },
      {
        "id": 2,
        "question": "In production systems implementing 16. Artificial Neural Networks, what is a primary engineering concern?",
        "options": [
          "Ensuring the model has zero mathematical parameters.",
          "Balancing computational latency, memory footprint, and generalizability on unseen distribution shifts.",
          "Deleting the database after every query.",
          "Preventing the computer from using electricity."
        ],
        "answer": 1,
        "explanation": "Deploying machine learning systems in production requires careful optimization of latency, throughput, memory bounds, and monitoring for data distribution drift."
      },
      {
        "id": 3,
        "question": "Which metric or validation practice is essential when developing 16. Artificial Neural Networks?",
        "options": [
          "Evaluating solely on training data with zero cross-validation.",
          "Using dedicated validation splits and metrics aligned with real-world operational costs and trade-offs.",
          "Ignoring all edge cases.",
          "Running the algorithm only once on a sample of 2 items."
        ],
        "answer": 1,
        "explanation": "Rigorous validation using independent holdout splits or cross-validation is essential to ensure generalizability and avoid data leakage."
      },
      {
        "id": 4,
        "question": "How do engineers prevent failure modes when implementing 16. Artificial Neural Networks?",
        "options": [
          "By employing regularization, input validation sanitization, and fallback heuristics.",
          "By never testing the code before deployment.",
          "By disabling all logging and metrics.",
          "By hardcoding the output to always be zero."
        ],
        "answer": 0,
        "explanation": "Robust production systems combine regularization, input schema validation, latency budgets, and fallback rule mechanisms."
      },
      {
        "id": 5,
        "question": "What is the ultimate academic learning outcome for mastering 16. Artificial Neural Networks?",
        "options": [
          "Memorizing variable names without understanding concepts.",
          "Understanding the algorithmic theory, implementing architectures, evaluating performance, and reasoning about ethical deployment trade-offs.",
          "Believing AI operates by magic.",
          "Writing code without any comments or structure."
        ],
        "answer": 1,
        "explanation": "Mastery involves a rigorous end-to-end understanding of mathematical foundations, practical engineering implementation, and responsible deployment ethics."
      }
    ]
  },
  {
    "id": 17,
    "level": 3,
    "title": "17. Activation Functions",
    "subtitle": "Non-Linearity: Sigmoid, Tanh, ReLU, Leaky ReLU & Softmax",
    "icon": "\u26a1",
    "duration": "30 mins",
    "badgeReward": "Non-Linearity Master",
    "focus": "Why non-linearities enable universal function approximation and vanishing/exploding gradients.",
    "learn": {
      "definition": "Activation functions introduce non-linear mathematical transformations into neural networks. Without non-linear activation functions, any deep multi-layer neural network collapses into an ordinary single-layer linear regression model.",
      "coreFormulation": "Comprehensive engineering study of 17. Activation Functions, focusing on mathematical formulation, algorithmic pipelines, and production constraints.",
      "keyConcepts": [
        {
          "name": "Mathematical Foundations",
          "desc": "Theoretical principles and optimization bounds for 17. Activation Functions."
        },
        {
          "name": "System Architecture",
          "desc": "Pipeline components, telemetry interfaces, and inference constraints."
        },
        {
          "name": "Production Optimization",
          "desc": "Latency tuning, resource scaling, and reliability monitoring."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Mobile Computer Vision Inference",
        "domain": "Edge AI",
        "howItWorks": "Uses ReLU and HardSwish activations in MobileNet to achieve high throughput on mobile NPUs."
      },
      {
        "system": "Multi-Class NLP Sentiment Classifier",
        "domain": "Text Analytics",
        "howItWorks": "Employs Softmax in the output layer to convert raw model logits into a normalized probability distribution summing to 1.0."
      }
    ],
    "visualDemo": {
      "type": "standard_visual_demo",
      "title": "Interactive Architecture: 17. Activation Functions",
      "description": "Visual workflow pipeline mapping input features, intermediate representations, and outputs for 17. Activation Functions."
    },
    "game": {
      "type": "concept_challenge",
      "title": "Activation Curve Visualizer & Gradient Probe",
      "instruction": "Toggle between Sigmoid, Tanh, ReLU, and Leaky ReLU. Inspect the derivative curves to understand why Sigmoid causes vanishing gradients for deep networks!",
      "topicId": 17
    },
    "quiz": [
      {
        "id": 1,
        "question": "Why is the Rectified Linear Unit (ReLU: f(x) = max(0, x)) widely favored over Sigmoid in deep hidden layers?",
        "options": [
          "Because ReLU outputs negative numbers.",
          "Because ReLU avoids gradient saturation for positive activations (derivative is 1.0), enabling faster training and mitigating vanishing gradients.",
          "Because ReLU converts text into images.",
          "Because ReLU requires no computer memory."
        ],
        "answer": 1,
        "explanation": "ReLU avoids the vanishing gradient problem in positive regimes because its derivative is a constant 1.0, unlike Sigmoid whose derivative saturates near zero for large inputs."
      },
      {
        "id": 2,
        "question": "In production systems implementing 17. Activation Functions, what is a primary engineering concern?",
        "options": [
          "Ensuring the model has zero mathematical parameters.",
          "Balancing computational latency, memory footprint, and generalizability on unseen distribution shifts.",
          "Deleting the database after every query.",
          "Preventing the computer from using electricity."
        ],
        "answer": 1,
        "explanation": "Deploying machine learning systems in production requires careful optimization of latency, throughput, memory bounds, and monitoring for data distribution drift."
      },
      {
        "id": 3,
        "question": "Which metric or validation practice is essential when developing 17. Activation Functions?",
        "options": [
          "Evaluating solely on training data with zero cross-validation.",
          "Using dedicated validation splits and metrics aligned with real-world operational costs and trade-offs.",
          "Ignoring all edge cases.",
          "Running the algorithm only once on a sample of 2 items."
        ],
        "answer": 1,
        "explanation": "Rigorous validation using independent holdout splits or cross-validation is essential to ensure generalizability and avoid data leakage."
      },
      {
        "id": 4,
        "question": "How do engineers prevent failure modes when implementing 17. Activation Functions?",
        "options": [
          "By employing regularization, input validation sanitization, and fallback heuristics.",
          "By never testing the code before deployment.",
          "By disabling all logging and metrics.",
          "By hardcoding the output to always be zero."
        ],
        "answer": 0,
        "explanation": "Robust production systems combine regularization, input schema validation, latency budgets, and fallback rule mechanisms."
      },
      {
        "id": 5,
        "question": "What is the ultimate academic learning outcome for mastering 17. Activation Functions?",
        "options": [
          "Memorizing variable names without understanding concepts.",
          "Understanding the algorithmic theory, implementing architectures, evaluating performance, and reasoning about ethical deployment trade-offs.",
          "Believing AI operates by magic.",
          "Writing code without any comments or structure."
        ],
        "answer": 1,
        "explanation": "Mastery involves a rigorous end-to-end understanding of mathematical foundations, practical engineering implementation, and responsible deployment ethics."
      }
    ]
  },
  {
    "id": 18,
    "level": 3,
    "title": "18. Backpropagation & Optimization",
    "subtitle": "Chain Rule, Loss Gradients, Adam, RMSProp & Learning Rates",
    "icon": "\ud83d\udd04",
    "duration": "45 mins",
    "badgeReward": "Gradient Optimizer",
    "focus": "Partial derivatives of loss with respect to weights, momentum, adaptive learning rates, and epochs.",
    "learn": {
      "definition": "Backpropagation is the foundational algorithm for training deep neural networks. It applies the differential calculus Chain Rule backwards through network layers to calculate the exact partial derivative of the scalar loss with respect to every weight and bias.",
      "coreFormulation": "Comprehensive engineering study of 18. Backpropagation & Optimization, focusing on mathematical formulation, algorithmic pipelines, and production constraints.",
      "keyConcepts": [
        {
          "name": "Mathematical Foundations",
          "desc": "Theoretical principles and optimization bounds for 18. Backpropagation & Optimization."
        },
        {
          "name": "System Architecture",
          "desc": "Pipeline components, telemetry interfaces, and inference constraints."
        },
        {
          "name": "Production Optimization",
          "desc": "Latency tuning, resource scaling, and reliability monitoring."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Large Language Model Pretraining Optimizer",
        "domain": "Foundation Models",
        "howItWorks": "Uses AdamW (Adam with decoupled weight decay) with cosine learning rate warmup schedules to optimize 70 billion parameters."
      },
      {
        "system": "Autonomous Driving Vision Training Pipeline",
        "domain": "Robotics",
        "howItWorks": "Employs distributed data-parallel backpropagation across 1,024 GPUs to update perception weights from millions of driving video frames."
      }
    ],
    "visualDemo": {
      "type": "standard_visual_demo",
      "title": "Interactive Architecture: 18. Backpropagation & Optimization",
      "description": "Visual workflow pipeline mapping input features, intermediate representations, and outputs for 18. Backpropagation & Optimization."
    },
    "game": {
      "type": "concept_challenge",
      "title": "Chain Rule Gradient Flow Visualizer",
      "instruction": "Trace a computational graph backwards step-by-step: compute local gradients, multiply by upstream gradients using the chain rule, and update weights!",
      "topicId": 18
    },
    "quiz": [
      {
        "id": 1,
        "question": "What mathematical principle enables backpropagation to compute weight gradients in deep networks?",
        "options": [
          "The Pythagorean Theorem",
          "The Calculus Chain Rule for partial derivatives: dL/dw = (dL/dy) * (dy/dz) * (dz/dw)",
          "Gaussian Elimination",
          "Euler's Totient Function"
        ],
        "answer": 1,
        "explanation": "The calculus chain rule allows the network to propagate error gradients from the output loss layer back through intermediate hidden layers to early parameters."
      },
      {
        "id": 2,
        "question": "In production systems implementing 18. Backpropagation & Optimization, what is a primary engineering concern?",
        "options": [
          "Ensuring the model has zero mathematical parameters.",
          "Balancing computational latency, memory footprint, and generalizability on unseen distribution shifts.",
          "Deleting the database after every query.",
          "Preventing the computer from using electricity."
        ],
        "answer": 1,
        "explanation": "Deploying machine learning systems in production requires careful optimization of latency, throughput, memory bounds, and monitoring for data distribution drift."
      },
      {
        "id": 3,
        "question": "Which metric or validation practice is essential when developing 18. Backpropagation & Optimization?",
        "options": [
          "Evaluating solely on training data with zero cross-validation.",
          "Using dedicated validation splits and metrics aligned with real-world operational costs and trade-offs.",
          "Ignoring all edge cases.",
          "Running the algorithm only once on a sample of 2 items."
        ],
        "answer": 1,
        "explanation": "Rigorous validation using independent holdout splits or cross-validation is essential to ensure generalizability and avoid data leakage."
      },
      {
        "id": 4,
        "question": "How do engineers prevent failure modes when implementing 18. Backpropagation & Optimization?",
        "options": [
          "By employing regularization, input validation sanitization, and fallback heuristics.",
          "By never testing the code before deployment.",
          "By disabling all logging and metrics.",
          "By hardcoding the output to always be zero."
        ],
        "answer": 0,
        "explanation": "Robust production systems combine regularization, input schema validation, latency budgets, and fallback rule mechanisms."
      },
      {
        "id": 5,
        "question": "What is the ultimate academic learning outcome for mastering 18. Backpropagation & Optimization?",
        "options": [
          "Memorizing variable names without understanding concepts.",
          "Understanding the algorithmic theory, implementing architectures, evaluating performance, and reasoning about ethical deployment trade-offs.",
          "Believing AI operates by magic.",
          "Writing code without any comments or structure."
        ],
        "answer": 1,
        "explanation": "Mastery involves a rigorous end-to-end understanding of mathematical foundations, practical engineering implementation, and responsible deployment ethics."
      }
    ]
  },
  {
    "id": 19,
    "level": 3,
    "title": "19. Convolutional Neural Networks (CNNs)",
    "subtitle": "Kernels, Strides, Padding, Max-Pooling & Feature Hierarchies",
    "icon": "\ud83d\uddbc\ufe0f",
    "duration": "40 mins",
    "badgeReward": "Computer Visionist",
    "focus": "Spatial invariance, edge detectors, pooling reduction, and landmark architectures (VGG, ResNet).",
    "learn": {
      "definition": "Convolutional Neural Networks (CNNs) are specialized deep architectures designed for grid-structured perceptual data like images. They replace dense matrix multiplication with discrete convolution operations using learnable filter kernels.",
      "coreFormulation": "Comprehensive engineering study of 19. Convolutional Neural Networks (CNNs), focusing on mathematical formulation, algorithmic pipelines, and production constraints.",
      "keyConcepts": [
        {
          "name": "Mathematical Foundations",
          "desc": "Theoretical principles and optimization bounds for 19. Convolutional Neural Networks (CNNs)."
        },
        {
          "name": "System Architecture",
          "desc": "Pipeline components, telemetry interfaces, and inference constraints."
        },
        {
          "name": "Production Optimization",
          "desc": "Latency tuning, resource scaling, and reliability monitoring."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Chest X-Ray Pneumonia Screener",
        "domain": "Radiology",
        "howItWorks": "Uses ResNet-50 residual connections to extract lung lesion features from 2048x2048 pixel medical scans."
      },
      {
        "system": "Satellite Deforestation Tracking",
        "domain": "Earth Observation",
        "howItWorks": "Runs multi-spectral CNNs across orbital satellite imagery to detect illicit timber logging in the Amazon basin."
      }
    ],
    "visualDemo": {
      "type": "standard_visual_demo",
      "title": "Interactive Architecture: 19. Convolutional Neural Networks (CNNs)",
      "description": "Visual workflow pipeline mapping input features, intermediate representations, and outputs for 19. Convolutional Neural Networks (CNNs)."
    },
    "game": {
      "type": "concept_challenge",
      "title": "Interactive 2D Convolution Kernel Filter Lab",
      "instruction": "Slide a 3x3 kernel (Sobel horizontal edge, vertical edge, Gaussian blur, Sharpen) across an image matrix and see the resulting feature map generated live!",
      "topicId": 19
    },
    "quiz": [
      {
        "id": 1,
        "question": "What primary advantages do Convolutional Neural Networks offer over fully connected networks for processing image data?",
        "options": [
          "They only accept 1D vectors.",
          "Parameter sharing and translation invariance: kernels slide across the image, detecting local features regardless of their spatial position.",
          "They eliminate all floating point math.",
          "They require zero training data."
        ],
        "answer": 1,
        "explanation": "CNNs enforce parameter sharing (the same filter applies across all image coordinates) and spatial locality, dramatically reducing parameter counts while providing translation invariance."
      },
      {
        "id": 2,
        "question": "In production systems implementing 19. Convolutional Neural Networks (CNNs), what is a primary engineering concern?",
        "options": [
          "Ensuring the model has zero mathematical parameters.",
          "Balancing computational latency, memory footprint, and generalizability on unseen distribution shifts.",
          "Deleting the database after every query.",
          "Preventing the computer from using electricity."
        ],
        "answer": 1,
        "explanation": "Deploying machine learning systems in production requires careful optimization of latency, throughput, memory bounds, and monitoring for data distribution drift."
      },
      {
        "id": 3,
        "question": "Which metric or validation practice is essential when developing 19. Convolutional Neural Networks (CNNs)?",
        "options": [
          "Evaluating solely on training data with zero cross-validation.",
          "Using dedicated validation splits and metrics aligned with real-world operational costs and trade-offs.",
          "Ignoring all edge cases.",
          "Running the algorithm only once on a sample of 2 items."
        ],
        "answer": 1,
        "explanation": "Rigorous validation using independent holdout splits or cross-validation is essential to ensure generalizability and avoid data leakage."
      },
      {
        "id": 4,
        "question": "How do engineers prevent failure modes when implementing 19. Convolutional Neural Networks (CNNs)?",
        "options": [
          "By employing regularization, input validation sanitization, and fallback heuristics.",
          "By never testing the code before deployment.",
          "By disabling all logging and metrics.",
          "By hardcoding the output to always be zero."
        ],
        "answer": 0,
        "explanation": "Robust production systems combine regularization, input schema validation, latency budgets, and fallback rule mechanisms."
      },
      {
        "id": 5,
        "question": "What is the ultimate academic learning outcome for mastering 19. Convolutional Neural Networks (CNNs)?",
        "options": [
          "Memorizing variable names without understanding concepts.",
          "Understanding the algorithmic theory, implementing architectures, evaluating performance, and reasoning about ethical deployment trade-offs.",
          "Believing AI operates by magic.",
          "Writing code without any comments or structure."
        ],
        "answer": 1,
        "explanation": "Mastery involves a rigorous end-to-end understanding of mathematical foundations, practical engineering implementation, and responsible deployment ethics."
      }
    ]
  },
  {
    "id": 20,
    "level": 3,
    "title": "20. Recurrent Neural Networks & LSTMs",
    "subtitle": "Sequential Modeling, Hidden States & Gated Architectures",
    "icon": "\ud83d\udd01",
    "duration": "40 mins",
    "badgeReward": "Sequence Modeler",
    "focus": "BPTT (Backpropagation Through Time), forget gates, input gates, and cell states in LSTMs/GRUs.",
    "learn": {
      "definition": "Recurrent Neural Networks (RNNs) are designed for sequential temporal data like speech, text, and time series. Unlike feedforward networks, RNNs maintain recurrent internal hidden state loops: h_t = tanh(W_hh * h_{t-1} + W_xh * x_t + b).",
      "coreFormulation": "Comprehensive engineering study of 20. Recurrent Neural Networks & LSTMs, focusing on mathematical formulation, algorithmic pipelines, and production constraints.",
      "keyConcepts": [
        {
          "name": "Mathematical Foundations",
          "desc": "Theoretical principles and optimization bounds for 20. Recurrent Neural Networks & LSTMs."
        },
        {
          "name": "System Architecture",
          "desc": "Pipeline components, telemetry interfaces, and inference constraints."
        },
        {
          "name": "Production Optimization",
          "desc": "Latency tuning, resource scaling, and reliability monitoring."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Google Voice Keyboard Real-Time Dictation",
        "domain": "Acoustic Modeling",
        "howItWorks": "Uses bidirectional LSTMs to process streaming audio frames and transcribe spoken sentences into text."
      },
      {
        "system": "Electrical Grid Power Demand Forecasting",
        "domain": "Smart Energy Grids",
        "howItWorks": "Processes past 30 days of hourly megawatt consumption and weather forecasts with an LSTM to schedule power generator ramp-ups."
      }
    ],
    "visualDemo": {
      "type": "standard_visual_demo",
      "title": "Interactive Architecture: 20. Recurrent Neural Networks & LSTMs",
      "description": "Visual workflow pipeline mapping input features, intermediate representations, and outputs for 20. Recurrent Neural Networks & LSTMs."
    },
    "game": {
      "type": "concept_challenge",
      "title": "LSTM Gate Controller Simulation",
      "instruction": "Toggle the Forget Gate, Input Gate, and Output Gate activations to observe how the LSTM Cell State retains long-term memory across sequential time steps!",
      "topicId": 20
    },
    "quiz": [
      {
        "id": 1,
        "question": "How do Long Short-Term Memory (LSTM) networks overcome the vanishing gradient problem found in standard recurrent neural networks?",
        "options": [
          "By using a linear error carousel (Cell State) regulated by multiplicative forget, input, and output gates.",
          "By completely removing hidden states.",
          "By limiting sequences to 2 steps.",
          "By running only on quantum hardware."
        ],
        "answer": 0,
        "explanation": "LSTMs introduce a dedicated Cell State with additive updates, allowing error gradients to flow across hundreds of time steps without exponentially decaying."
      },
      {
        "id": 2,
        "question": "In production systems implementing 20. Recurrent Neural Networks & LSTMs, what is a primary engineering concern?",
        "options": [
          "Ensuring the model has zero mathematical parameters.",
          "Balancing computational latency, memory footprint, and generalizability on unseen distribution shifts.",
          "Deleting the database after every query.",
          "Preventing the computer from using electricity."
        ],
        "answer": 1,
        "explanation": "Deploying machine learning systems in production requires careful optimization of latency, throughput, memory bounds, and monitoring for data distribution drift."
      },
      {
        "id": 3,
        "question": "Which metric or validation practice is essential when developing 20. Recurrent Neural Networks & LSTMs?",
        "options": [
          "Evaluating solely on training data with zero cross-validation.",
          "Using dedicated validation splits and metrics aligned with real-world operational costs and trade-offs.",
          "Ignoring all edge cases.",
          "Running the algorithm only once on a sample of 2 items."
        ],
        "answer": 1,
        "explanation": "Rigorous validation using independent holdout splits or cross-validation is essential to ensure generalizability and avoid data leakage."
      },
      {
        "id": 4,
        "question": "How do engineers prevent failure modes when implementing 20. Recurrent Neural Networks & LSTMs?",
        "options": [
          "By employing regularization, input validation sanitization, and fallback heuristics.",
          "By never testing the code before deployment.",
          "By disabling all logging and metrics.",
          "By hardcoding the output to always be zero."
        ],
        "answer": 0,
        "explanation": "Robust production systems combine regularization, input schema validation, latency budgets, and fallback rule mechanisms."
      },
      {
        "id": 5,
        "question": "What is the ultimate academic learning outcome for mastering 20. Recurrent Neural Networks & LSTMs?",
        "options": [
          "Memorizing variable names without understanding concepts.",
          "Understanding the algorithmic theory, implementing architectures, evaluating performance, and reasoning about ethical deployment trade-offs.",
          "Believing AI operates by magic.",
          "Writing code without any comments or structure."
        ],
        "answer": 1,
        "explanation": "Mastery involves a rigorous end-to-end understanding of mathematical foundations, practical engineering implementation, and responsible deployment ethics."
      }
    ]
  },
  {
    "id": 21,
    "level": 3,
    "title": "21. Natural Language Processing (NLP)",
    "subtitle": "Tokenization, Word2Vec, TF-IDF & Sentiment Classification",
    "icon": "\ud83d\udcac",
    "duration": "35 mins",
    "badgeReward": "Linguistics Engineer",
    "focus": "Byte-Pair Encoding, dense vector embeddings, cosine similarity, and semantic vector spaces.",
    "learn": {
      "definition": "Natural Language Processing (NLP) bridges computational linguistics and machine learning, enabling computers to process, parse, comprehend, and generate human written and spoken communication.",
      "coreFormulation": "Comprehensive engineering study of 21. Natural Language Processing (NLP), focusing on mathematical formulation, algorithmic pipelines, and production constraints.",
      "keyConcepts": [
        {
          "name": "Mathematical Foundations",
          "desc": "Theoretical principles and optimization bounds for 21. Natural Language Processing (NLP)."
        },
        {
          "name": "System Architecture",
          "desc": "Pipeline components, telemetry interfaces, and inference constraints."
        },
        {
          "name": "Production Optimization",
          "desc": "Latency tuning, resource scaling, and reliability monitoring."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Amazon Customer Review Sentiment Analyzer",
        "domain": "E-Commerce",
        "howItWorks": "Converts customer review sentences into dense vector embeddings and classifies feedback as positive, neutral, or negative."
      },
      {
        "system": "Legal Contract Clause Search Engine",
        "domain": "Legal Tech",
        "howItWorks": "Uses dense semantic vector search to find liability and indemnification clauses even when contracts use completely different synonyms."
      }
    ],
    "visualDemo": {
      "type": "standard_visual_demo",
      "title": "Interactive Architecture: 21. Natural Language Processing (NLP)",
      "description": "Visual workflow pipeline mapping input features, intermediate representations, and outputs for 21. Natural Language Processing (NLP)."
    },
    "game": {
      "type": "concept_challenge",
      "title": "Vector Semantic Space Calculator",
      "instruction": "Perform vector arithmetic: Vector('King') - Vector('Man') + Vector('Woman') = Vector('Queen')! Calculate cosine similarities between words in a 2D projection!",
      "topicId": 21
    },
    "quiz": [
      {
        "id": 1,
        "question": "What is the core intuition behind distributional semantic word embeddings like Word2Vec?",
        "options": [
          "Words are represented by their alphabetical character count.",
          "Words that appear in similar textual contexts occupy nearby coordinates in continuous dense vector space ('You shall know a word by the company it keeps').",
          "All words are mapped to positive integers between 1 and 100.",
          "Every sentence must have exactly 5 words."
        ],
        "answer": 1,
        "explanation": "Word embeddings map semantic meaning to geometric vectors, where words with similar contextual distributions (e.g. 'doctor' and 'physician') have high cosine similarity."
      },
      {
        "id": 2,
        "question": "In production systems implementing 21. Natural Language Processing (NLP), what is a primary engineering concern?",
        "options": [
          "Ensuring the model has zero mathematical parameters.",
          "Balancing computational latency, memory footprint, and generalizability on unseen distribution shifts.",
          "Deleting the database after every query.",
          "Preventing the computer from using electricity."
        ],
        "answer": 1,
        "explanation": "Deploying machine learning systems in production requires careful optimization of latency, throughput, memory bounds, and monitoring for data distribution drift."
      },
      {
        "id": 3,
        "question": "Which metric or validation practice is essential when developing 21. Natural Language Processing (NLP)?",
        "options": [
          "Evaluating solely on training data with zero cross-validation.",
          "Using dedicated validation splits and metrics aligned with real-world operational costs and trade-offs.",
          "Ignoring all edge cases.",
          "Running the algorithm only once on a sample of 2 items."
        ],
        "answer": 1,
        "explanation": "Rigorous validation using independent holdout splits or cross-validation is essential to ensure generalizability and avoid data leakage."
      },
      {
        "id": 4,
        "question": "How do engineers prevent failure modes when implementing 21. Natural Language Processing (NLP)?",
        "options": [
          "By employing regularization, input validation sanitization, and fallback heuristics.",
          "By never testing the code before deployment.",
          "By disabling all logging and metrics.",
          "By hardcoding the output to always be zero."
        ],
        "answer": 0,
        "explanation": "Robust production systems combine regularization, input schema validation, latency budgets, and fallback rule mechanisms."
      },
      {
        "id": 5,
        "question": "What is the ultimate academic learning outcome for mastering 21. Natural Language Processing (NLP)?",
        "options": [
          "Memorizing variable names without understanding concepts.",
          "Understanding the algorithmic theory, implementing architectures, evaluating performance, and reasoning about ethical deployment trade-offs.",
          "Believing AI operates by magic.",
          "Writing code without any comments or structure."
        ],
        "answer": 1,
        "explanation": "Mastery involves a rigorous end-to-end understanding of mathematical foundations, practical engineering implementation, and responsible deployment ethics."
      }
    ]
  },
  {
    "id": 22,
    "level": 4,
    "title": "22. Generative AI Foundations",
    "subtitle": "Generative vs Discriminative Modeling, Diffusion & GANs",
    "icon": "\ud83c\udfa8",
    "duration": "35 mins",
    "badgeReward": "GenAI Pioneer",
    "focus": "Sampling from probability distributions, latent spaces, generator-discriminator min-max games.",
    "learn": {
      "definition": "Generative AI models learn the underlying probability distribution p(x) of complex training data (or conditional distribution p(x|y)) to synthesize brand-new, realistic artifacts such as text, high-resolution imagery, molecular structures, and audio waveforms.",
      "coreFormulation": "Comprehensive engineering study of 22. Generative AI Foundations, focusing on mathematical formulation, algorithmic pipelines, and production constraints.",
      "keyConcepts": [
        {
          "name": "Mathematical Foundations",
          "desc": "Theoretical principles and optimization bounds for 22. Generative AI Foundations."
        },
        {
          "name": "System Architecture",
          "desc": "Pipeline components, telemetry interfaces, and inference constraints."
        },
        {
          "name": "Production Optimization",
          "desc": "Latency tuning, resource scaling, and reliability monitoring."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Midjourney & Stable Diffusion Image Synthesis",
        "domain": "Creative Media",
        "howItWorks": "Employs Latent Diffusion Models (LDMs) that iteratively denoise Gaussian noise conditioned on CLIP text embeddings."
      },
      {
        "system": "Synthetic Medical Imaging for Rare Diseases",
        "domain": "Healthcare Research",
        "howItWorks": "Generates realistic synthetic MRI and CT scans using GANs to augment scarce clinical training datasets while preserving patient privacy."
      }
    ],
    "visualDemo": {
      "type": "standard_visual_demo",
      "title": "Interactive Architecture: 22. Generative AI Foundations",
      "description": "Visual workflow pipeline mapping input features, intermediate representations, and outputs for 22. Generative AI Foundations."
    },
    "game": {
      "type": "concept_challenge",
      "title": "GAN Adversarial Arena: Generator vs Discriminator",
      "instruction": "Step through min-max game rounds: train the Generator to produce counterfeit currency images, while the Discriminator tries to catch fakes!",
      "topicId": 22
    },
    "quiz": [
      {
        "id": 1,
        "question": "What is the fundamental difference between a Discriminative model and a Generative model?",
        "options": [
          "Discriminative models model conditional boundary p(y|x) to classify data; Generative models capture the joint distribution p(x, y) or p(x) to generate new samples.",
          "Generative models only work on text, while discriminative models only work on audio.",
          "Discriminative models cannot be trained on computers.",
          "There is no mathematical difference."
        ],
        "answer": 0,
        "explanation": "Discriminative models focus on separating classes by finding decision boundaries p(y|x), whereas Generative models model how the data was generated p(x, y) to synthesize new instances."
      },
      {
        "id": 2,
        "question": "In production systems implementing 22. Generative AI Foundations, what is a primary engineering concern?",
        "options": [
          "Ensuring the model has zero mathematical parameters.",
          "Balancing computational latency, memory footprint, and generalizability on unseen distribution shifts.",
          "Deleting the database after every query.",
          "Preventing the computer from using electricity."
        ],
        "answer": 1,
        "explanation": "Deploying machine learning systems in production requires careful optimization of latency, throughput, memory bounds, and monitoring for data distribution drift."
      },
      {
        "id": 3,
        "question": "Which metric or validation practice is essential when developing 22. Generative AI Foundations?",
        "options": [
          "Evaluating solely on training data with zero cross-validation.",
          "Using dedicated validation splits and metrics aligned with real-world operational costs and trade-offs.",
          "Ignoring all edge cases.",
          "Running the algorithm only once on a sample of 2 items."
        ],
        "answer": 1,
        "explanation": "Rigorous validation using independent holdout splits or cross-validation is essential to ensure generalizability and avoid data leakage."
      },
      {
        "id": 4,
        "question": "How do engineers prevent failure modes when implementing 22. Generative AI Foundations?",
        "options": [
          "By employing regularization, input validation sanitization, and fallback heuristics.",
          "By never testing the code before deployment.",
          "By disabling all logging and metrics.",
          "By hardcoding the output to always be zero."
        ],
        "answer": 0,
        "explanation": "Robust production systems combine regularization, input schema validation, latency budgets, and fallback rule mechanisms."
      },
      {
        "id": 5,
        "question": "What is the ultimate academic learning outcome for mastering 22. Generative AI Foundations?",
        "options": [
          "Memorizing variable names without understanding concepts.",
          "Understanding the algorithmic theory, implementing architectures, evaluating performance, and reasoning about ethical deployment trade-offs.",
          "Believing AI operates by magic.",
          "Writing code without any comments or structure."
        ],
        "answer": 1,
        "explanation": "Mastery involves a rigorous end-to-end understanding of mathematical foundations, practical engineering implementation, and responsible deployment ethics."
      }
    ]
  },
  {
    "id": 23,
    "level": 4,
    "title": "23. Large Language Models (LLMs)",
    "subtitle": "Pre-training, Autoregressive Next-Token Prediction & SFT",
    "icon": "\ud83d\udcda",
    "duration": "40 mins",
    "badgeReward": "LLM Specialist",
    "focus": "Web-scale self-supervised learning, instruction fine-tuning, context windows, and scaling laws.",
    "learn": {
      "definition": "Large Language Models (LLMs) are massive neural networks (tens to hundreds of billions of parameters) trained on trillions of tokens via self-supervised autoregressive next-token prediction, followed by Supervised Fine-Tuning (SFT) and Reinforcement Learning from Human Feedback (RLHF).",
      "coreFormulation": "Comprehensive engineering study of 23. Large Language Models (LLMs), focusing on mathematical formulation, algorithmic pipelines, and production constraints.",
      "keyConcepts": [
        {
          "name": "Mathematical Foundations",
          "desc": "Theoretical principles and optimization bounds for 23. Large Language Models (LLMs)."
        },
        {
          "name": "System Architecture",
          "desc": "Pipeline components, telemetry interfaces, and inference constraints."
        },
        {
          "name": "Production Optimization",
          "desc": "Latency tuning, resource scaling, and reliability monitoring."
        }
      ]
    },
    "realWorld": [
      {
        "system": "GitHub Copilot Code Completion",
        "domain": "Software Engineering",
        "howItWorks": "Predicts subsequent lines of code, docstrings, and unit tests directly in the IDE by attending to file context and repository structure."
      },
      {
        "system": "Enterprise Multi-Language Customer Assistant",
        "domain": "Customer Support",
        "howItWorks": "Processes customer inquiries in 80 languages, answering product questions and creating return tickets based on company policy documents."
      }
    ],
    "visualDemo": {
      "type": "standard_visual_demo",
      "title": "Interactive Architecture: 23. Large Language Models (LLMs)",
      "description": "Visual workflow pipeline mapping input features, intermediate representations, and outputs for 23. Large Language Models (LLMs)."
    },
    "game": {
      "type": "concept_challenge",
      "title": "Next-Token Probability Predictor",
      "instruction": "Inspect a sentence context and observe the top-5 candidate tokens with their softmax probability distribution and temperature sampling slider!",
      "topicId": 23
    },
    "quiz": [
      {
        "id": 1,
        "question": "During self-supervised pre-training, what fundamental objective function do autoregressive LLMs (like GPT-4 and Llama) optimize?",
        "options": [
          "Minimizing the cross-entropy loss for predicting the next token given preceding context tokens: max sum(log P(w_t | w_1...w_{t-1})).",
          "Sorting words alphabetically in memory.",
          "Solving linear programming simplex tableaux.",
          "Calculating hard drive disk fragmentation."
        ],
        "answer": 0,
        "explanation": "Autoregressive LLMs are pre-trained on the next-token prediction task, learning rich syntactic, semantic, and world-knowledge representations as a byproduct of predicting subsequent tokens."
      },
      {
        "id": 2,
        "question": "In production systems implementing 23. Large Language Models (LLMs), what is a primary engineering concern?",
        "options": [
          "Ensuring the model has zero mathematical parameters.",
          "Balancing computational latency, memory footprint, and generalizability on unseen distribution shifts.",
          "Deleting the database after every query.",
          "Preventing the computer from using electricity."
        ],
        "answer": 1,
        "explanation": "Deploying machine learning systems in production requires careful optimization of latency, throughput, memory bounds, and monitoring for data distribution drift."
      },
      {
        "id": 3,
        "question": "Which metric or validation practice is essential when developing 23. Large Language Models (LLMs)?",
        "options": [
          "Evaluating solely on training data with zero cross-validation.",
          "Using dedicated validation splits and metrics aligned with real-world operational costs and trade-offs.",
          "Ignoring all edge cases.",
          "Running the algorithm only once on a sample of 2 items."
        ],
        "answer": 1,
        "explanation": "Rigorous validation using independent holdout splits or cross-validation is essential to ensure generalizability and avoid data leakage."
      },
      {
        "id": 4,
        "question": "How do engineers prevent failure modes when implementing 23. Large Language Models (LLMs)?",
        "options": [
          "By employing regularization, input validation sanitization, and fallback heuristics.",
          "By never testing the code before deployment.",
          "By disabling all logging and metrics.",
          "By hardcoding the output to always be zero."
        ],
        "answer": 0,
        "explanation": "Robust production systems combine regularization, input schema validation, latency budgets, and fallback rule mechanisms."
      },
      {
        "id": 5,
        "question": "What is the ultimate academic learning outcome for mastering 23. Large Language Models (LLMs)?",
        "options": [
          "Memorizing variable names without understanding concepts.",
          "Understanding the algorithmic theory, implementing architectures, evaluating performance, and reasoning about ethical deployment trade-offs.",
          "Believing AI operates by magic.",
          "Writing code without any comments or structure."
        ],
        "answer": 1,
        "explanation": "Mastery involves a rigorous end-to-end understanding of mathematical foundations, practical engineering implementation, and responsible deployment ethics."
      }
    ]
  },
  {
    "id": 24,
    "level": 4,
    "title": "24. Transformer Architecture",
    "subtitle": "Scaled Dot-Product Attention, Multi-Head Attention & QKV",
    "icon": "\u2728",
    "duration": "45 mins",
    "badgeReward": "Transformer Master",
    "focus": "Query, Key, and Value vectors, softmax attention matrices, residual connections, and layer norm.",
    "learn": {
      "definition": "Introduced in the seminal paper 'Attention Is All You Need' (Vaswani et al., 2017), the Transformer architecture dispensed with recurrence and convolutions, relying entirely on self-attention mechanisms to model global dependencies across sequences in parallel.",
      "coreFormulation": "Comprehensive engineering study of 24. Transformer Architecture, focusing on mathematical formulation, algorithmic pipelines, and production constraints.",
      "keyConcepts": [
        {
          "name": "Mathematical Foundations",
          "desc": "Theoretical principles and optimization bounds for 24. Transformer Architecture."
        },
        {
          "name": "System Architecture",
          "desc": "Pipeline components, telemetry interfaces, and inference constraints."
        },
        {
          "name": "Production Optimization",
          "desc": "Latency tuning, resource scaling, and reliability monitoring."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Google Gemini Multimodal Reasoning Engine",
        "domain": "Multimodal AI",
        "howItWorks": "Processes text, images, video, and audio tokens in a unified dense transformer architecture with cross-attention layers."
      },
      {
        "system": "AlphaFold 2 Evoformer",
        "domain": "Biophysics",
        "howItWorks": "Uses specialized axial multi-head attention to reason over multiple sequence alignments and amino acid pair representations."
      }
    ],
    "visualDemo": {
      "type": "standard_visual_demo",
      "title": "Interactive Architecture: 24. Transformer Architecture",
      "description": "Visual workflow pipeline mapping input features, intermediate representations, and outputs for 24. Transformer Architecture."
    },
    "game": {
      "type": "concept_challenge",
      "title": "Multi-Head Attention Heatmap Explorer",
      "instruction": "Type a sentence (e.g. 'The animal did not cross the street because it was too tired') and inspect the attention weight matrix showing how 'it' attends to 'animal'!",
      "topicId": 24
    },
    "quiz": [
      {
        "id": 1,
        "question": "In the Scaled Dot-Product Attention formula Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V, why is the division by sqrt(d_k) performed?",
        "options": [
          "To prevent dot products from growing excessively large in high dimensions, which would push softmax into regions with vanishingly small gradients.",
          "To convert negative numbers to positive numbers.",
          "To divide the sequence into smaller sentences.",
          "To count the number of attention heads."
        ],
        "answer": 0,
        "explanation": "For large key dimensions d_k, the dot products grow large in magnitude, pushing softmax into saturated regions with tiny gradients. Scaling by sqrt(d_k) keeps the variance stable."
      },
      {
        "id": 2,
        "question": "In production systems implementing 24. Transformer Architecture, what is a primary engineering concern?",
        "options": [
          "Ensuring the model has zero mathematical parameters.",
          "Balancing computational latency, memory footprint, and generalizability on unseen distribution shifts.",
          "Deleting the database after every query.",
          "Preventing the computer from using electricity."
        ],
        "answer": 1,
        "explanation": "Deploying machine learning systems in production requires careful optimization of latency, throughput, memory bounds, and monitoring for data distribution drift."
      },
      {
        "id": 3,
        "question": "Which metric or validation practice is essential when developing 24. Transformer Architecture?",
        "options": [
          "Evaluating solely on training data with zero cross-validation.",
          "Using dedicated validation splits and metrics aligned with real-world operational costs and trade-offs.",
          "Ignoring all edge cases.",
          "Running the algorithm only once on a sample of 2 items."
        ],
        "answer": 1,
        "explanation": "Rigorous validation using independent holdout splits or cross-validation is essential to ensure generalizability and avoid data leakage."
      },
      {
        "id": 4,
        "question": "How do engineers prevent failure modes when implementing 24. Transformer Architecture?",
        "options": [
          "By employing regularization, input validation sanitization, and fallback heuristics.",
          "By never testing the code before deployment.",
          "By disabling all logging and metrics.",
          "By hardcoding the output to always be zero."
        ],
        "answer": 0,
        "explanation": "Robust production systems combine regularization, input schema validation, latency budgets, and fallback rule mechanisms."
      },
      {
        "id": 5,
        "question": "What is the ultimate academic learning outcome for mastering 24. Transformer Architecture?",
        "options": [
          "Memorizing variable names without understanding concepts.",
          "Understanding the algorithmic theory, implementing architectures, evaluating performance, and reasoning about ethical deployment trade-offs.",
          "Believing AI operates by magic.",
          "Writing code without any comments or structure."
        ],
        "answer": 1,
        "explanation": "Mastery involves a rigorous end-to-end understanding of mathematical foundations, practical engineering implementation, and responsible deployment ethics."
      }
    ]
  },
  {
    "id": 25,
    "level": 4,
    "title": "25. Prompt Engineering",
    "subtitle": "Zero-Shot, Few-Shot In-Context Learning & Chain-of-Thought",
    "icon": "\u270d\ufe0f",
    "duration": "30 mins",
    "badgeReward": "Prompt Crafting Pro",
    "focus": "System prompt conditioning, persona roles, step-by-step reasoning scaffolds, and constraint bounds.",
    "learn": {
      "definition": "Prompt Engineering is the empirical and methodological discipline of designing, structuring, and optimizing natural language inputs and contextual scaffolds to guide foundation models toward accurate, coherent, and reliably constrained outputs without retraining model weights.",
      "coreFormulation": "Comprehensive engineering study of 25. Prompt Engineering, focusing on mathematical formulation, algorithmic pipelines, and production constraints.",
      "keyConcepts": [
        {
          "name": "Mathematical Foundations",
          "desc": "Theoretical principles and optimization bounds for 25. Prompt Engineering."
        },
        {
          "name": "System Architecture",
          "desc": "Pipeline components, telemetry interfaces, and inference constraints."
        },
        {
          "name": "Production Optimization",
          "desc": "Latency tuning, resource scaling, and reliability monitoring."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Automated Legal Document Summarizer",
        "domain": "Legal Operations",
        "howItWorks": "Uses strict few-shot system prompts with XML output schemas and zero-hallucination guardrails to extract liability clauses."
      },
      {
        "system": "Medical Triage Chatbot Guardrailing",
        "domain": "Digital Health",
        "howItWorks": "Applies Chain-of-Thought (CoT) prompting to systematically analyze reported symptoms before providing non-diagnostic clinical advice."
      }
    ],
    "visualDemo": {
      "type": "standard_visual_demo",
      "title": "Interactive Architecture: 25. Prompt Engineering",
      "description": "Visual workflow pipeline mapping input features, intermediate representations, and outputs for 25. Prompt Engineering."
    },
    "game": {
      "type": "concept_challenge",
      "title": "Prompt Crafting & Jailbreak Defense Arena",
      "instruction": "Craft system prompts with role definition, context boundaries, and few-shot examples to achieve 100% structured JSON extraction while repelling prompt injections!",
      "topicId": 25
    },
    "quiz": [
      {
        "id": 1,
        "question": "What is Chain-of-Thought (CoT) prompting and why does it significantly improve model performance on complex reasoning tasks?",
        "options": [
          "It translates the prompt into binary machine code.",
          "It prompts the model to break problems down and generate intermediate reasoning steps ('Think step by step') before outputting the final answer.",
          "It increases GPU clock speeds.",
          "It forces the model to rhyme all responses."
        ],
        "answer": 1,
        "explanation": "Chain-of-Thought prompting encourages the model to allocate test-time compute to intermediate reasoning steps, substantially boosting performance on multi-step logic and mathematical problems."
      },
      {
        "id": 2,
        "question": "In production systems implementing 25. Prompt Engineering, what is a primary engineering concern?",
        "options": [
          "Ensuring the model has zero mathematical parameters.",
          "Balancing computational latency, memory footprint, and generalizability on unseen distribution shifts.",
          "Deleting the database after every query.",
          "Preventing the computer from using electricity."
        ],
        "answer": 1,
        "explanation": "Deploying machine learning systems in production requires careful optimization of latency, throughput, memory bounds, and monitoring for data distribution drift."
      },
      {
        "id": 3,
        "question": "Which metric or validation practice is essential when developing 25. Prompt Engineering?",
        "options": [
          "Evaluating solely on training data with zero cross-validation.",
          "Using dedicated validation splits and metrics aligned with real-world operational costs and trade-offs.",
          "Ignoring all edge cases.",
          "Running the algorithm only once on a sample of 2 items."
        ],
        "answer": 1,
        "explanation": "Rigorous validation using independent holdout splits or cross-validation is essential to ensure generalizability and avoid data leakage."
      },
      {
        "id": 4,
        "question": "How do engineers prevent failure modes when implementing 25. Prompt Engineering?",
        "options": [
          "By employing regularization, input validation sanitization, and fallback heuristics.",
          "By never testing the code before deployment.",
          "By disabling all logging and metrics.",
          "By hardcoding the output to always be zero."
        ],
        "answer": 0,
        "explanation": "Robust production systems combine regularization, input schema validation, latency budgets, and fallback rule mechanisms."
      },
      {
        "id": 5,
        "question": "What is the ultimate academic learning outcome for mastering 25. Prompt Engineering?",
        "options": [
          "Memorizing variable names without understanding concepts.",
          "Understanding the algorithmic theory, implementing architectures, evaluating performance, and reasoning about ethical deployment trade-offs.",
          "Believing AI operates by magic.",
          "Writing code without any comments or structure."
        ],
        "answer": 1,
        "explanation": "Mastery involves a rigorous end-to-end understanding of mathematical foundations, practical engineering implementation, and responsible deployment ethics."
      }
    ]
  },
  {
    "id": 26,
    "level": 4,
    "title": "26. Retrieval-Augmented Generation (RAG)",
    "subtitle": "Vector Databases, Approximate Nearest Neighbors & Grounding",
    "icon": "\ud83d\uddc4\ufe0f",
    "duration": "40 mins",
    "badgeReward": "RAG Architect",
    "focus": "Document chunking, dense vector embeddings, HNSW vector search, and hallucination reduction.",
    "learn": {
      "definition": "Retrieval-Augmented Generation (RAG) is an architectural framework that enhances LLM generation by retrieving authoritative factual chunks from external knowledge bases (vector databases) and injecting them into the prompt context window before inference.",
      "coreFormulation": "Comprehensive engineering study of 26. Retrieval-Augmented Generation (RAG), focusing on mathematical formulation, algorithmic pipelines, and production constraints.",
      "keyConcepts": [
        {
          "name": "Mathematical Foundations",
          "desc": "Theoretical principles and optimization bounds for 26. Retrieval-Augmented Generation (RAG)."
        },
        {
          "name": "System Architecture",
          "desc": "Pipeline components, telemetry interfaces, and inference constraints."
        },
        {
          "name": "Production Optimization",
          "desc": "Latency tuning, resource scaling, and reliability monitoring."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Enterprise Internal HR & Policy Assistant",
        "domain": "Enterprise Tech",
        "howItWorks": "Embeds thousands of internal PDF documents into Pinecone; when an employee asks a question, retrieves the top-3 policy chunks to ground the LLM's response."
      },
      {
        "system": "Customer Support Live Troubleshooting Bot",
        "domain": "Hardware Support",
        "howItWorks": "Uses hybrid vector + BM25 keyword search across product repair manuals to answer user queries with verifiable page citations."
      }
    ],
    "visualDemo": {
      "type": "standard_visual_demo",
      "title": "Interactive Architecture: 26. Retrieval-Augmented Generation (RAG)",
      "description": "Visual workflow pipeline mapping input features, intermediate representations, and outputs for 26. Retrieval-Augmented Generation (RAG)."
    },
    "game": {
      "type": "concept_challenge",
      "title": "RAG Vector Retrieval & Grounding Pipeline",
      "instruction": "Type a query, watch the retriever search 20 document chunks using cosine similarity in a vector database, and see the generator compose a grounded, cited answer!",
      "topicId": 26
    },
    "quiz": [
      {
        "id": 1,
        "question": "What major limitation of Large Language Models does Retrieval-Augmented Generation (RAG) solve?",
        "options": [
          "It makes LLMs run on smartphones.",
          "It overcomes static training cutoffs, eliminates hallucinations by grounding answers in retrieved enterprise documents, and provides verifiable source citations.",
          "It translates code into assembly.",
          "It reduces text font sizes."
        ],
        "answer": 1,
        "explanation": "RAG grounds generation in dynamically retrieved factual documents, preventing hallucinations and allowing models to access private or up-to-date information without fine-tuning."
      },
      {
        "id": 2,
        "question": "In production systems implementing 26. Retrieval-Augmented Generation (RAG), what is a primary engineering concern?",
        "options": [
          "Ensuring the model has zero mathematical parameters.",
          "Balancing computational latency, memory footprint, and generalizability on unseen distribution shifts.",
          "Deleting the database after every query.",
          "Preventing the computer from using electricity."
        ],
        "answer": 1,
        "explanation": "Deploying machine learning systems in production requires careful optimization of latency, throughput, memory bounds, and monitoring for data distribution drift."
      },
      {
        "id": 3,
        "question": "Which metric or validation practice is essential when developing 26. Retrieval-Augmented Generation (RAG)?",
        "options": [
          "Evaluating solely on training data with zero cross-validation.",
          "Using dedicated validation splits and metrics aligned with real-world operational costs and trade-offs.",
          "Ignoring all edge cases.",
          "Running the algorithm only once on a sample of 2 items."
        ],
        "answer": 1,
        "explanation": "Rigorous validation using independent holdout splits or cross-validation is essential to ensure generalizability and avoid data leakage."
      },
      {
        "id": 4,
        "question": "How do engineers prevent failure modes when implementing 26. Retrieval-Augmented Generation (RAG)?",
        "options": [
          "By employing regularization, input validation sanitization, and fallback heuristics.",
          "By never testing the code before deployment.",
          "By disabling all logging and metrics.",
          "By hardcoding the output to always be zero."
        ],
        "answer": 0,
        "explanation": "Robust production systems combine regularization, input schema validation, latency budgets, and fallback rule mechanisms."
      },
      {
        "id": 5,
        "question": "What is the ultimate academic learning outcome for mastering 26. Retrieval-Augmented Generation (RAG)?",
        "options": [
          "Memorizing variable names without understanding concepts.",
          "Understanding the algorithmic theory, implementing architectures, evaluating performance, and reasoning about ethical deployment trade-offs.",
          "Believing AI operates by magic.",
          "Writing code without any comments or structure."
        ],
        "answer": 1,
        "explanation": "Mastery involves a rigorous end-to-end understanding of mathematical foundations, practical engineering implementation, and responsible deployment ethics."
      }
    ]
  },
  {
    "id": 27,
    "level": 4,
    "title": "27. AI Agents and Automation",
    "subtitle": "ReAct Framework, Tool Calling, Planning & Human-in-the-Loop",
    "icon": "\ud83e\udd16",
    "duration": "40 mins",
    "badgeReward": "Agent Orchestrator",
    "focus": "Reasoning + Acting execution loops, API tool dispatching, state memory, and multi-agent systems.",
    "learn": {
      "definition": "Autonomous AI Agents combine foundation models with reasoning loops, tool-calling APIs, persistent memory, and task planning algorithms to accomplish multi-step goals with minimal human supervision.",
      "coreFormulation": "Comprehensive engineering study of 27. AI Agents and Automation, focusing on mathematical formulation, algorithmic pipelines, and production constraints.",
      "keyConcepts": [
        {
          "name": "Mathematical Foundations",
          "desc": "Theoretical principles and optimization bounds for 27. AI Agents and Automation."
        },
        {
          "name": "System Architecture",
          "desc": "Pipeline components, telemetry interfaces, and inference constraints."
        },
        {
          "name": "Production Optimization",
          "desc": "Latency tuning, resource scaling, and reliability monitoring."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Autonomous Software Engineer (e.g. Devin / Antigravity)",
        "domain": "Developer Tooling",
        "howItWorks": "Reads GitHub issue descriptions, navigates codebases, executes unit tests in sandbox terminals, and opens Pull Requests autonomously."
      },
      {
        "system": "Corporate Travel & Expense Booking Agent",
        "domain": "Business Operations",
        "howItWorks": "Queries flight and hotel APIs, compares pricing against company travel policy guidelines, and submits approved itineraries."
      }
    ],
    "visualDemo": {
      "type": "standard_visual_demo",
      "title": "Interactive Architecture: 27. AI Agents and Automation",
      "description": "Visual workflow pipeline mapping input features, intermediate representations, and outputs for 27. AI Agents and Automation."
    },
    "game": {
      "type": "concept_challenge",
      "title": "ReAct Agent Execution Loop Sandbox",
      "instruction": "Observe an agent run the ReAct cycle (Thought \u27a1\ufe0f Action \u27a1\ufe0f Observation \u27a1\ufe0f Final Answer) to calculate stock prices and send an automated email alert!",
      "topicId": 27
    },
    "quiz": [
      {
        "id": 1,
        "question": "In the ReAct (Reasoning + Acting) agent framework, what is the purpose of the 'Observation' step?",
        "options": [
          "To clear the user's terminal screen.",
          "To ingest the output returned by external tool or API executions and feed it back into the model's working context for the next reasoning step.",
          "To shutdown the server.",
          "To count how many tokens were billed."
        ],
        "answer": 1,
        "explanation": "In ReAct, after the agent takes an action (like calling an API or database), the resulting observation is fed back into the context, enabling the agent to reason about the outcome."
      },
      {
        "id": 2,
        "question": "In production systems implementing 27. AI Agents and Automation, what is a primary engineering concern?",
        "options": [
          "Ensuring the model has zero mathematical parameters.",
          "Balancing computational latency, memory footprint, and generalizability on unseen distribution shifts.",
          "Deleting the database after every query.",
          "Preventing the computer from using electricity."
        ],
        "answer": 1,
        "explanation": "Deploying machine learning systems in production requires careful optimization of latency, throughput, memory bounds, and monitoring for data distribution drift."
      },
      {
        "id": 3,
        "question": "Which metric or validation practice is essential when developing 27. AI Agents and Automation?",
        "options": [
          "Evaluating solely on training data with zero cross-validation.",
          "Using dedicated validation splits and metrics aligned with real-world operational costs and trade-offs.",
          "Ignoring all edge cases.",
          "Running the algorithm only once on a sample of 2 items."
        ],
        "answer": 1,
        "explanation": "Rigorous validation using independent holdout splits or cross-validation is essential to ensure generalizability and avoid data leakage."
      },
      {
        "id": 4,
        "question": "How do engineers prevent failure modes when implementing 27. AI Agents and Automation?",
        "options": [
          "By employing regularization, input validation sanitization, and fallback heuristics.",
          "By never testing the code before deployment.",
          "By disabling all logging and metrics.",
          "By hardcoding the output to always be zero."
        ],
        "answer": 0,
        "explanation": "Robust production systems combine regularization, input schema validation, latency budgets, and fallback rule mechanisms."
      },
      {
        "id": 5,
        "question": "What is the ultimate academic learning outcome for mastering 27. AI Agents and Automation?",
        "options": [
          "Memorizing variable names without understanding concepts.",
          "Understanding the algorithmic theory, implementing architectures, evaluating performance, and reasoning about ethical deployment trade-offs.",
          "Believing AI operates by magic.",
          "Writing code without any comments or structure."
        ],
        "answer": 1,
        "explanation": "Mastery involves a rigorous end-to-end understanding of mathematical foundations, practical engineering implementation, and responsible deployment ethics."
      }
    ]
  },
  {
    "id": 28,
    "level": 5,
    "title": "28. Computer Vision: Object Detection & Segmentation",
    "subtitle": "Bounding Boxes, IoU, Non-Max Suppression, YOLO & Mask R-CNN",
    "icon": "\ud83d\udc41\ufe0f",
    "duration": "40 mins",
    "badgeReward": "Vision Researcher",
    "focus": "Anchors, single-stage vs two-stage detectors, Intersection over Union (IoU), and pixel-level masks.",
    "learn": {
      "definition": "Advanced Computer Vision encompasses object detection (localizing and classifying objects via bounding boxes) and semantic/instance segmentation (assigning class labels to individual pixels).",
      "coreFormulation": "Comprehensive engineering study of 28. Computer Vision: Object Detection & Segmentation, focusing on mathematical formulation, algorithmic pipelines, and production constraints.",
      "keyConcepts": [
        {
          "name": "Mathematical Foundations",
          "desc": "Theoretical principles and optimization bounds for 28. Computer Vision: Object Detection & Segmentation."
        },
        {
          "name": "System Architecture",
          "desc": "Pipeline components, telemetry interfaces, and inference constraints."
        },
        {
          "name": "Production Optimization",
          "desc": "Latency tuning, resource scaling, and reliability monitoring."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Tesla Autopilot Vision Occupancy Network",
        "domain": "Autonomous Driving",
        "howItWorks": "Performs real-time 3D bounding box detection and occupancy segmentation for pedestrians, cars, and road debris at 36 fps."
      },
      {
        "system": "Automated CT Scan Tumor Volume Segmentation",
        "domain": "Medical Imaging",
        "howItWorks": "Uses 3D U-Net architectures to segment liver tumor boundaries down to individual voxels for radiotherapy planning."
      }
    ],
    "visualDemo": {
      "type": "standard_visual_demo",
      "title": "Interactive Architecture: 28. Computer Vision: Object Detection & Segmentation",
      "description": "Visual workflow pipeline mapping input features, intermediate representations, and outputs for 28. Computer Vision: Object Detection & Segmentation."
    },
    "game": {
      "type": "concept_challenge",
      "title": "IoU & Non-Max Suppression (NMS) Tuner",
      "instruction": "Adjust the IoU threshold slider from 0.3 to 0.8 on multiple overlapping candidate bounding boxes and watch Non-Max Suppression prune duplicates!",
      "topicId": 28
    },
    "quiz": [
      {
        "id": 1,
        "question": "How is the Intersection over Union (IoU) metric calculated for evaluating object detection bounding boxes?",
        "options": [
          "IoU = Area of Overlap / Area of Union between predicted box and ground truth box.",
          "IoU = Height + Width of box.",
          "IoU = Number of pixels divided by 255.",
          "IoU = Total image resolution."
        ],
        "answer": 0,
        "explanation": "IoU measures localization accuracy by dividing the overlapping area of the predicted and ground-truth boxes by their combined union area."
      },
      {
        "id": 2,
        "question": "In production systems implementing 28. Computer Vision: Object Detection & Segmentation, what is a primary engineering concern?",
        "options": [
          "Ensuring the model has zero mathematical parameters.",
          "Balancing computational latency, memory footprint, and generalizability on unseen distribution shifts.",
          "Deleting the database after every query.",
          "Preventing the computer from using electricity."
        ],
        "answer": 1,
        "explanation": "Deploying machine learning systems in production requires careful optimization of latency, throughput, memory bounds, and monitoring for data distribution drift."
      },
      {
        "id": 3,
        "question": "Which metric or validation practice is essential when developing 28. Computer Vision: Object Detection & Segmentation?",
        "options": [
          "Evaluating solely on training data with zero cross-validation.",
          "Using dedicated validation splits and metrics aligned with real-world operational costs and trade-offs.",
          "Ignoring all edge cases.",
          "Running the algorithm only once on a sample of 2 items."
        ],
        "answer": 1,
        "explanation": "Rigorous validation using independent holdout splits or cross-validation is essential to ensure generalizability and avoid data leakage."
      },
      {
        "id": 4,
        "question": "How do engineers prevent failure modes when implementing 28. Computer Vision: Object Detection & Segmentation?",
        "options": [
          "By employing regularization, input validation sanitization, and fallback heuristics.",
          "By never testing the code before deployment.",
          "By disabling all logging and metrics.",
          "By hardcoding the output to always be zero."
        ],
        "answer": 0,
        "explanation": "Robust production systems combine regularization, input schema validation, latency budgets, and fallback rule mechanisms."
      },
      {
        "id": 5,
        "question": "What is the ultimate academic learning outcome for mastering 28. Computer Vision: Object Detection & Segmentation?",
        "options": [
          "Memorizing variable names without understanding concepts.",
          "Understanding the algorithmic theory, implementing architectures, evaluating performance, and reasoning about ethical deployment trade-offs.",
          "Believing AI operates by magic.",
          "Writing code without any comments or structure."
        ],
        "answer": 1,
        "explanation": "Mastery involves a rigorous end-to-end understanding of mathematical foundations, practical engineering implementation, and responsible deployment ethics."
      }
    ]
  },
  {
    "id": 29,
    "level": 5,
    "title": "29. Reinforcement Learning",
    "subtitle": "Markov Decision Processes (MDP), Bellman Equation & Q-Learning",
    "icon": "\ud83c\udfae",
    "duration": "45 mins",
    "badgeReward": "RL Specialist",
    "focus": "State-action-reward loops, discount factors, exploration vs exploitation, and Deep Q-Networks (DQN).",
    "learn": {
      "definition": "Reinforcement Learning (RL) is a machine learning paradigm where an autonomous agent learns optimal decision policies through trial-and-error interactions with an environment, receiving scalar rewards or penalties to maximize cumulative return.",
      "coreFormulation": "Comprehensive engineering study of 29. Reinforcement Learning, focusing on mathematical formulation, algorithmic pipelines, and production constraints.",
      "keyConcepts": [
        {
          "name": "Mathematical Foundations",
          "desc": "Theoretical principles and optimization bounds for 29. Reinforcement Learning."
        },
        {
          "name": "System Architecture",
          "desc": "Pipeline components, telemetry interfaces, and inference constraints."
        },
        {
          "name": "Production Optimization",
          "desc": "Latency tuning, resource scaling, and reliability monitoring."
        }
      ]
    },
    "realWorld": [
      {
        "system": "AlphaGo & AlphaZero (DeepMind)",
        "domain": "Board Games",
        "howItWorks": "Trained via self-play reinforcement learning and Monte Carlo Tree Search, defeating world champions in Go, Chess, and Shogi without human game data."
      },
      {
        "system": "Data Center Energy Cooling Optimizer (Google)",
        "domain": "Energy Infrastructure",
        "howItWorks": "Uses deep reinforcement learning to control industrial chillers and cooling pumps, reducing datacenter cooling energy consumption by 40%."
      }
    ],
    "visualDemo": {
      "type": "standard_visual_demo",
      "title": "Interactive Architecture: 29. Reinforcement Learning",
      "description": "Visual workflow pipeline mapping input features, intermediate representations, and outputs for 29. Reinforcement Learning."
    },
    "game": {
      "type": "concept_challenge",
      "title": "Q-Learning Gridworld Policy Visualizer",
      "instruction": "Watch an RL agent explore a grid with pits (-100) and gold (+100). Observe the Q-table values update and the optimal policy arrows emerge!",
      "topicId": 29
    },
    "quiz": [
      {
        "id": 1,
        "question": "In the Bellman Expectation Equation for Reinforcement Learning, what role does the discount factor gamma (0 <= gamma < 1) serve?",
        "options": [
          "It determines the screen frame rate.",
          "It weights the relative importance of immediate rewards versus future long-term rewards, ensuring mathematical convergence in infinite-horizon tasks.",
          "It counts the number of times the agent died.",
          "It sets the font size of the game."
        ],
        "answer": 1,
        "explanation": "The discount factor gamma models the present value of future rewards, preventing infinite returns in cyclical environments and reflecting preference for sooner rewards."
      },
      {
        "id": 2,
        "question": "In production systems implementing 29. Reinforcement Learning, what is a primary engineering concern?",
        "options": [
          "Ensuring the model has zero mathematical parameters.",
          "Balancing computational latency, memory footprint, and generalizability on unseen distribution shifts.",
          "Deleting the database after every query.",
          "Preventing the computer from using electricity."
        ],
        "answer": 1,
        "explanation": "Deploying machine learning systems in production requires careful optimization of latency, throughput, memory bounds, and monitoring for data distribution drift."
      },
      {
        "id": 3,
        "question": "Which metric or validation practice is essential when developing 29. Reinforcement Learning?",
        "options": [
          "Evaluating solely on training data with zero cross-validation.",
          "Using dedicated validation splits and metrics aligned with real-world operational costs and trade-offs.",
          "Ignoring all edge cases.",
          "Running the algorithm only once on a sample of 2 items."
        ],
        "answer": 1,
        "explanation": "Rigorous validation using independent holdout splits or cross-validation is essential to ensure generalizability and avoid data leakage."
      },
      {
        "id": 4,
        "question": "How do engineers prevent failure modes when implementing 29. Reinforcement Learning?",
        "options": [
          "By employing regularization, input validation sanitization, and fallback heuristics.",
          "By never testing the code before deployment.",
          "By disabling all logging and metrics.",
          "By hardcoding the output to always be zero."
        ],
        "answer": 0,
        "explanation": "Robust production systems combine regularization, input schema validation, latency budgets, and fallback rule mechanisms."
      },
      {
        "id": 5,
        "question": "What is the ultimate academic learning outcome for mastering 29. Reinforcement Learning?",
        "options": [
          "Memorizing variable names without understanding concepts.",
          "Understanding the algorithmic theory, implementing architectures, evaluating performance, and reasoning about ethical deployment trade-offs.",
          "Believing AI operates by magic.",
          "Writing code without any comments or structure."
        ],
        "answer": 1,
        "explanation": "Mastery involves a rigorous end-to-end understanding of mathematical foundations, practical engineering implementation, and responsible deployment ethics."
      }
    ]
  },
  {
    "id": 30,
    "level": 5,
    "title": "30. Explainable AI, Ethics & Responsible AI",
    "subtitle": "Algorithmic Bias, Disparate Impact, SHAP, LIME & Safety",
    "icon": "\u2696\ufe0f",
    "duration": "35 mins",
    "badgeReward": "Ethical AI Guardian",
    "focus": "Model interpretability, post-hoc explanations, demographic parity, privacy, and alignment.",
    "learn": {
      "definition": "Responsible and Explainable AI (XAI) addresses the transparency, fairness, accountability, and safety of artificial intelligence systems, providing methods (like SHAP and LIME) to interpret black-box predictions and eliminate discriminatory bias.",
      "coreFormulation": "Comprehensive engineering study of 30. Explainable AI, Ethics & Responsible AI, focusing on mathematical formulation, algorithmic pipelines, and production constraints.",
      "keyConcepts": [
        {
          "name": "Mathematical Foundations",
          "desc": "Theoretical principles and optimization bounds for 30. Explainable AI, Ethics & Responsible AI."
        },
        {
          "name": "System Architecture",
          "desc": "Pipeline components, telemetry interfaces, and inference constraints."
        },
        {
          "name": "Production Optimization",
          "desc": "Latency tuning, resource scaling, and reliability monitoring."
        }
      ]
    },
    "realWorld": [
      {
        "system": "Loan Underwriting Explainability Compliance",
        "domain": "Financial Regulation",
        "howItWorks": "Uses SHAP (Shapley Additive exPlanations) to provide legally mandated adverse action notices explaining why a loan was rejected."
      },
      {
        "system": "Hiring Algorithm Bias Audit",
        "domain": "Human Resources",
        "howItWorks": "Audits resume screening classifiers to ensure demographic parity and disparate impact ratio >= 0.8 across gender and ethnic groups."
      }
    ],
    "visualDemo": {
      "type": "standard_visual_demo",
      "title": "Interactive Architecture: 30. Explainable AI, Ethics & Responsible AI",
      "description": "Visual workflow pipeline mapping input features, intermediate representations, and outputs for 30. Explainable AI, Ethics & Responsible AI."
    },
    "game": {
      "type": "concept_challenge",
      "title": "SHAP Feature Attribution Inspector",
      "instruction": "Inspect a loan application decision: see positive and negative SHAP attribution bars showing exactly which features (income, debt, credit age) drove the model's decision!",
      "topicId": 30
    },
    "quiz": [
      {
        "id": 1,
        "question": "What is the primary objective of Explainable AI (XAI) frameworks like SHAP and LIME?",
        "options": [
          "To make deep models run without GPUs.",
          "To explain why black-box models made specific predictions, attributing importance scores to individual input features for auditing and compliance.",
          "To encrypt model weights.",
          "To automatically generate social media posts."
        ],
        "answer": 1,
        "explanation": "XAI techniques like SHAP and LIME provide post-hoc local and global interpretability, allowing engineers and regulators to audit feature contributions behind high-stakes decisions."
      },
      {
        "id": 2,
        "question": "In production systems implementing 30. Explainable AI, Ethics & Responsible AI, what is a primary engineering concern?",
        "options": [
          "Ensuring the model has zero mathematical parameters.",
          "Balancing computational latency, memory footprint, and generalizability on unseen distribution shifts.",
          "Deleting the database after every query.",
          "Preventing the computer from using electricity."
        ],
        "answer": 1,
        "explanation": "Deploying machine learning systems in production requires careful optimization of latency, throughput, memory bounds, and monitoring for data distribution drift."
      },
      {
        "id": 3,
        "question": "Which metric or validation practice is essential when developing 30. Explainable AI, Ethics & Responsible AI?",
        "options": [
          "Evaluating solely on training data with zero cross-validation.",
          "Using dedicated validation splits and metrics aligned with real-world operational costs and trade-offs.",
          "Ignoring all edge cases.",
          "Running the algorithm only once on a sample of 2 items."
        ],
        "answer": 1,
        "explanation": "Rigorous validation using independent holdout splits or cross-validation is essential to ensure generalizability and avoid data leakage."
      },
      {
        "id": 4,
        "question": "How do engineers prevent failure modes when implementing 30. Explainable AI, Ethics & Responsible AI?",
        "options": [
          "By employing regularization, input validation sanitization, and fallback heuristics.",
          "By never testing the code before deployment.",
          "By disabling all logging and metrics.",
          "By hardcoding the output to always be zero."
        ],
        "answer": 0,
        "explanation": "Robust production systems combine regularization, input schema validation, latency budgets, and fallback rule mechanisms."
      },
      {
        "id": 5,
        "question": "What is the ultimate academic learning outcome for mastering 30. Explainable AI, Ethics & Responsible AI?",
        "options": [
          "Memorizing variable names without understanding concepts.",
          "Understanding the algorithmic theory, implementing architectures, evaluating performance, and reasoning about ethical deployment trade-offs.",
          "Believing AI operates by magic.",
          "Writing code without any comments or structure."
        ],
        "answer": 1,
        "explanation": "Mastery involves a rigorous end-to-end understanding of mathematical foundations, practical engineering implementation, and responsible deployment ethics."
      }
    ]
  }
];
