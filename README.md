# SkillSpring AI 🚀
### Autonomous Adaptive AI Skill Development & Multi-Generational Learning Platform

SkillSpring AI is an adaptive, gamified AI learning platform designed to make Artificial Intelligence accessible, engaging, and practical for learners of all ages—from school students to college engineering scholars and adult professionals.

---

## 🌟 Key Learning Zones

### 1. 🎓 College AI Learning Hub (Ages 18–25)
A 30-topic curriculum structured into 5 progressive levels:
* **Level 1: AI Fundamentals** (Intro to AI, AI Types, Intelligent Agents & PEAS, Problem Solving & State Spaces, Search Algorithms BFS/DFS/A\*, Knowledge Representation, Logic & Inference)
* **Level 2: Machine Learning** (Supervised/Unsupervised Learning, Data Preprocessing, Regression, Classification, Clustering, Model Evaluation, Cross-Validation)
* **Level 3: Deep Learning & Neural Networks** (Perceptrons & MLPs, Activation Functions, Backpropagation & Optimizers, CNNs, RNNs & LSTMs, NLP)
* **Level 4: Generative AI & Modern AI** (Generative Foundations, Transformers, Large Language Models, Prompt Engineering, RAG & Vector Databases, Autonomous AI Agents)
* **Level 5: Advanced & Responsible AI** (Reinforcement Learning & Bellman Equation, AI Ethics & Bias Mitigation, Edge & Embedded AI Systems)

**Interactive Features:**
* 🌳 **Animated Tree Visualizer & Algorithm Race**: Interactive BFS vs DFS step-by-step tree traversal with live FIFO Queue vs LIFO Stack frontier tracking and interactive node traversal game.
* 🤖 **Autonomous PEAS Simulation**: Virtual vacuum-cleaner agent with dynamic sensors, dirty tiles, and performance scoring.
* 🕸️ **RDF Triple & Knowledge Graph Model**: Interactive entity-relation graph constructor.
* 🎮 **In-Quiz Concept Checkpoints**: Hands-on mini-games integrated between quiz questions.
* 💻 **Standalone Python Coding Sandbox**: Integrated browser Python editor and execution terminal.

---

### 2. 🧒 Kids AI Discovery Zone (Ages 7–14)
* Visual, drag-and-drop challenges and foundational logic puzzles.
* Intuitive gamified rewards, stars, and achievement badges.
* Gentle introductions to how computers "think", classify images, and make decisions.

---

### 3. 🧑‍💼 Adult Digital & AI Literacy (Ages 35+)
* Practical digital skills and workplace AI workflows.
* Prompt engineering essentials and generative AI productivity tools.
* Interactive Voice Assistant simulations and real-time audio soundwave visualizations.
* Cyber safety, phishing detection, and AI ethics.
* Downloadable certificates of completion.

---

### 4. 🛡️ Admin & Analytics Portal
* Centralized dashboard to track learner progress across all tiers.
* Real-time metrics on completed topics, quizzes, and activity completions.

---

## 🛠️ Tech Stack

* **Frontend**: HTML5, Modern CSS3 (responsive grid/flexbox), Vanilla JavaScript (ES6+ with zero framework lock-in).
* **Backend**: Node.js & Express.js REST API.
* **Database**: MySQL (relational schema with connection pooling via `mysql2/promise`).
* **Security & Auth**: JWT-based session tokens and bcrypt password hashing.

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v16.0 or higher recommended)
* [MySQL Server](https://dev.mysql.com/downloads/mysql/) (v8.0+) or MySQL Workbench

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/skillspring-ai.git
cd skillspring-ai
```

### 2. Install Backend Dependencies
```bash
npm install
```

### 3. Database Setup
1. Open your MySQL client (e.g. MySQL Workbench or CLI).
2. Execute the schema script located at:
   ```sql
   source db/schema.sql;
   ```
3. This creates the `adaptive_learning` database and required tables.

### 4. Environment Configuration
Copy the template configuration file:
```bash
cp .env.example .env
```
Edit `.env` with your MySQL credentials:
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=adaptive_learning
DB_USER=root
DB_PASSWORD=your_mysql_password
JWT_SECRET=your_jwt_secret_key
PORT=4000
```

### 5. Run the Application
You can start the Express server using npm:
```bash
npm start
```
Or double-click `run_server.bat` on Windows.

Then open your browser at:
```
http://localhost:4000
```

---

## 📁 Project Structure

```
Main-Project/
├── backend/
│   ├── config/
│   │   └── db.js            # MySQL connection pool
│   ├── routes/              # Express API route controllers
│   │   ├── adaptive.js
│   │   ├── admin.js
│   │   ├── auth.js
│   │   ├── challenges.js
│   │   └── kids.js
│   └── server.js            # Express server entry point
├── db/
│   └── schema.sql           # Database schema & tables
├── frontend/
│   ├── adult.css            # Styles for Adult Literacy Zone
│   ├── adult.html           # Adult Learning Portal UI
│   ├── adult.js             # Logic & interactive simulations for Adults
│   ├── adult_data.js        # Adult curriculum lessons data
│   ├── app.js               # Landing page & auth modals
│   ├── index.html           # Main platform landing page
│   ├── kids.html            # Kids Discovery Zone UI
│   ├── student.css          # Styles for College AI Hub
│   ├── student.html         # College Learning Zone UI
│   ├── student.js           # Interactive engines, SVG visualizers & simulators
│   └── student_data.js      # 30-topic college AI catalog & quizzes
├── .env.example             # Template environment variables
├── .gitignore               # Ignored files & sensitive data
├── package.json             # Node dependencies and scripts
├── README.md                # Project documentation
└── run_server.bat           # Windows 1-click launcher
```

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
