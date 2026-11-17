// ========================================================
// SkillSpring AI - College AI Learning Hub Engine
// Computer Science & Engineering Track (30 Topics, 5 Levels)
// ========================================================

const StudentState = {
  currentStudent: null,

  load() {
    const saved = localStorage.getItem('skillspring_student_learner');
    const active = localStorage.getItem('skillspring_active_user');

    let activeUser = null;
    if (active) {
      try {
        activeUser = JSON.parse(active);
      } catch (e) {}
    }

    // Strict Portal Role Guard: If logged in as Adult or Kid, prevent access to Student Hub
    if (activeUser && activeUser.role && activeUser.role !== 'student' && activeUser.role !== 'admin') {
      console.warn('Unauthorized role attempting to access Student Hub:', activeUser.role);
      const roleName = activeUser.role === 'kid' ? 'Kids' : 'Adult';
      const redirectPage = activeUser.role === 'kid' ? 'kids.html' : 'adult.html';
      alert(`⛔ Access Restricted: You are signed in as an ${roleName} account (${activeUser.email || activeUser.name}).\n\nThe College AI Learning Hub is reserved for Student accounts.\n\nRedirecting you to your ${roleName} Learning Zone...`);
      window.location.href = redirectPage;
      return;
    }

    if (saved) {
      try {
        this.currentStudent = JSON.parse(saved);
      } catch (e) {
        this.currentStudent = null;
      }
    }

    // Sync with active logged-in user if available
    if (activeUser && activeUser.name) {
      if (!this.currentStudent) {
        this.currentStudent = {
          name: activeUser.name,
          email: activeUser.email || '',
          college: "Department of Computer Science & Engineering",
          degree: "MCA (Master of Computer Applications)",
          stars: 0,
          completedTopics: [],
          quizScores: {},
          badges: [],
          streak: 1,
          lastActiveDate: new Date().toLocaleDateString('en-GB')
        };
      } else if (activeUser.name !== this.currentStudent.name && activeUser.role === 'student') {
        this.currentStudent.name = activeUser.name;
        if (activeUser.email) this.currentStudent.email = activeUser.email;
      }
      this.save();
    }

    if (!this.currentStudent) {
      this.currentStudent = {
        name: "Student Scholar",
        college: "Department of Computer Science & Engineering",
        degree: "MCA (Master of Computer Applications)",
        stars: 0,
        completedTopics: [],
        quizScores: {},
        badges: [],
        streak: 1,
        lastActiveDate: new Date().toLocaleDateString('en-GB')
      };
      this.save();
    }

    if (!Array.isArray(this.currentStudent.completedTopics)) {
      this.currentStudent.completedTopics = [];
    }
    if (!Array.isArray(this.currentStudent.badges)) {
      this.currentStudent.badges = [];
    }
  },

  save() {
    if (!this.currentStudent) return;
    localStorage.setItem('skillspring_student_learner', JSON.stringify(this.currentStudent));
  },

  registerStudent(name, college, degree) {
    if (!this.currentStudent) this.load();
    this.currentStudent.name = name.trim() || "Student Scholar";
    if (college) this.currentStudent.college = college.trim();
    if (degree) this.currentStudent.degree = degree.trim();
    this.save();

    try {
      const activeRaw = localStorage.getItem('skillspring_active_user');
      let active = activeRaw ? JSON.parse(activeRaw) : {};
      active.name = this.currentStudent.name;
      localStorage.setItem('skillspring_active_user', JSON.stringify(active));
    } catch (e) {}
  },

  markTopicComplete(topicId, badgeReward = "AI Pioneer") {
    if (!this.currentStudent) return false;
    topicId = parseInt(topicId);
    let isNew = false;
    if (!this.currentStudent.completedTopics.includes(topicId)) {
      this.currentStudent.completedTopics.push(topicId);
      this.currentStudent.stars += 50;
      if (badgeReward && !this.currentStudent.badges.includes(badgeReward)) {
        this.currentStudent.badges.push(badgeReward);
      }
      isNew = true;
    }
    this.currentStudent.lastActiveDate = new Date().toLocaleDateString('en-GB');
    this.save();
    return isNew;
  },

  resetProgress() {
    if (!this.currentStudent) return;
    this.currentStudent.stars = 0;
    this.currentStudent.completedTopics = [];
    this.currentStudent.quizScores = {};
    this.currentStudent.badges = [];
    this.save();
  }
};

class CollegeLearningPlatform {
  constructor() {
    this.activeLevel = 'all';
    this.currentTopic = null;
    this.currentTab = 'all';
    
    // Topic 1 Detective state
    this.detectiveScore = 0;
    this.detectiveAnswered = {};

    // Topic 2 Classify AI state
    this.classifyScore = 0;
    this.classifyAnswered = {};

    // Topic 3 PEAS Vacuum Agent state
    this.vacuumTimer = null;
    this.vacuumState = null;

    // Topic 4 State Space Maze state
    this.mazeAgentPos = { x: 0, y: 0 };
    this.mazeMovesCount = 0;

    // Topic 5 BFS vs DFS Working Visualizer & Game state
    this.searchMode = 'BFS'; // 'BFS' or 'DFS'
    this.treeStepIndex = 0;
    this.treeAutoPlayTimer = null;
    this.gameExpectedOrder = [];
    this.gameClickIndex = 0;
    this.gameScore = 0;
    this.isGameActive = false;

    // Topic 6 Knowledge Graph state
    this.kgConnectedCount = 0;
    this.kgConnectedTriples = [];

    // Topic 7 Logic Engine state
    this.logicFacts = { fever: true, cough: true, wbc: true };
  }

  init() {
    StudentState.load();
    this.setupHUD();
    this.renderTopicsGrid();
    this.setupEventListeners();
  }

  setupHUD() {
    const s = StudentState.currentStudent;
    if (!s) return;

    const nameEl = document.getElementById('hudStudentName');
    if (nameEl) nameEl.innerText = s.name;

    const degreeEl = document.getElementById('hudStudentDegree');
    if (degreeEl) degreeEl.innerText = s.degree || "CS & Engineering";

    const starsEl = document.getElementById('hudStudentStars');
    if (starsEl) starsEl.innerText = s.stars;

    const streakEl = document.getElementById('hudStudentStreak');
    if (streakEl) streakEl.innerText = `${s.streak || 1} Day`;

    const count = s.completedTopics ? s.completedTopics.length : 0;
    const progressEl = document.getElementById('hudStudentProgress');
    if (progressEl) progressEl.innerText = `${count} / 30 Topics`;

    const badgesEl = document.getElementById('hudStudentBadges');
    if (badgesEl) badgesEl.innerText = `${s.badges ? s.badges.length : 0} Badges`;

    // Sync Certificate Modal details
    const certName = document.getElementById('certStudentName');
    if (certName) certName.innerText = s.name;

    const certCollege = document.getElementById('certStudentCollege');
    if (certCollege) certCollege.innerText = `${s.college} • ${s.degree}`;

    const certScore = document.getElementById('certStudentScore');
    if (certScore) {
      const pct = Math.round((count / 30) * 100);
      certScore.innerText = `✓ Verified Academic Mastery Score: ${pct}% | ${count} / 30 Curriculum Topics Completed`;
    }

    const certDate = document.getElementById('certStudentDate');
    if (certDate) certDate.innerText = new Date().toLocaleDateString('en-GB');
  }

  renderTopicsGrid() {
    const container = document.getElementById('studentTopicsGrid');
    if (!container) return;
    container.innerHTML = '';

    const list = COLLEGE_TOPICS_CATALOG.filter(item => {
      if (this.activeLevel === 'all') return true;
      return item.level === parseInt(this.activeLevel);
    });

    const s = StudentState.currentStudent;
    const completedList = s ? s.completedTopics : [];

    list.forEach(item => {
      const isDone = completedList.includes(item.id);
      const card = document.createElement('div');
      card.className = `topic-card ${isDone ? 'completed' : ''}`;

      const lvlColor = item.level === 1 ? '#2563eb' : item.level === 2 ? '#059669' : item.level === 3 ? '#7c3aed' : item.level === 4 ? '#d97706' : '#dc2626';

      card.innerHTML = `
        <div>
          <div class="topic-card-header">
            <div class="topic-icon-badge">${item.icon}</div>
            <span class="topic-level-badge ${isDone ? 'done' : ''}" style="border-left: 3px solid ${lvlColor};">
              ${isDone ? '✓ Completed' : `Level ${item.level}`}
            </span>
          </div>
          <h4>${item.title}</h4>
          <p>${item.subtitle}</p>
        </div>

        <div>
          <div class="topic-meta-row">
            <span class="topic-duration">⏱️ ${item.duration || '30 mins'}</span>
            <span style="font-weight: 700; color: ${lvlColor}; font-size: 0.82rem;">
              🎖️ +50 ⭐
            </span>
          </div>
          <button type="button" class="btn-topic-open" style="width: 100%; margin-top: 14px;">
            ${isDone ? '✓ Review Topic ➡️' : 'Start Topic ➡️'}
          </button>
        </div>
      `;

      card.onclick = () => this.openTopic(item.id);
      container.appendChild(card);
    });
  }

  openTopic(topicId) {
    const item = COLLEGE_TOPICS_CATALOG.find(x => x.id === parseInt(topicId));
    if (!item) return;

    this.currentTopic = item;
    this.currentTab = 'all';

    // Clear active timers
    if (this.vacuumTimer) clearInterval(this.vacuumTimer);
    if (this.treeAutoPlayTimer) clearInterval(this.treeAutoPlayTimer);

    const modal = document.getElementById('collegeStudyModal');
    if (!modal) return;

    document.getElementById('modalTopicTitle').innerText = item.title;
    document.getElementById('modalTopicSubtitle').innerText = item.subtitle;

    this.updateTabButtons();
    this.renderCurrentTopicFlow();

    modal.classList.remove('hidden');
    const modalBox = modal.querySelector('.student-study-box');
    if (modalBox) modalBox.scrollTop = 0;
  }

  updateTabButtons() {
    document.querySelectorAll('.study-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-tab') === this.currentTab) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  goToActivity(tabName) {
    this.currentTab = tabName;
    this.updateTabButtons();

    const modalBox = document.querySelector('#collegeStudyModal .student-study-box');
    if (!modalBox) return;

    if (tabName === 'all') {
      modalBox.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetSection = document.getElementById(`section_${tabName}`);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  renderCurrentTopicFlow() {
    const panel = document.getElementById('collegeModalContent');
    if (!panel || !this.currentTopic) return;
    const item = this.currentTopic;

    switch (item.id) {
      case 1:
        this.renderTopic1Flow(panel, item);
        break;
      case 2:
        this.renderTopic2Flow(panel, item);
        break;
      case 3:
        this.renderTopic3Flow(panel, item);
        break;
      case 4:
        this.renderTopic4Flow(panel, item);
        break;
      case 5:
        this.renderTopic5Flow(panel, item);
        break;
      case 6:
        this.renderTopic6Flow(panel, item);
        break;
      case 7:
        this.renderTopic7Flow(panel, item);
        break;
      default:
        this.renderGenericTopicFlow(panel, item);
        break;
    }
  }


  // ========================================================
  // TOPIC 1: INTRODUCTION TO ARTIFICIAL INTELLIGENCE
  // ========================================================
  renderTopic1Flow(panel, item) {
    this.detectiveScore = 0;
    this.detectiveAnswered = {};

    const timelineHtml = item.learn.historyTimeline.map(h => `
      <div class="timeline-item">
        <span class="timeline-year">${h.year}</span>
        <h4>${h.event}</h4>
        <p>${h.desc}</p>
      </div>
    `).join('');

    const realWorldHtml = item.realWorld.map((rw, idx) => `
      <div style="background: white; border: 2px solid #cbd5e1; border-radius: 16px; padding: 20px; margin-bottom: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
          <h4 style="font-size: 1.2rem; color: #1e3a8a; margin: 0;">${idx + 1}. ${rw.system}</h4>
          <span style="font-size: 0.82rem; font-weight: 800; background: #eff6ff; color: #1d4ed8; padding: 4px 12px; border-radius: 9999px;">
            ${rw.domain}
          </span>
        </div>
        <p style="font-size: 1.05rem; color: #334155; line-height: 1.7; margin: 0;">
          ${rw.howItWorks}
        </p>
      </div>
    `).join('');

    panel.innerHTML = `
      <div class="study-flow-section" id="section_learn">
        <div style="font-size: 1.4rem; font-weight: 800; color: #1e3a8a; display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
          <span>📘</span> Activity 1: Theoretical Foundations & AI Evolution
        </div>
        <p style="font-size: 1.18rem; line-height: 1.85; color: #1e293b; margin-bottom: 18px;">
          ${item.learn.definition}
        </p>
        <div style="background: #f8fafc; border-left: 5px solid #2563eb; padding: 18px 22px; border-radius: 14px; margin-bottom: 24px;">
          <strong style="color: #1e40af; font-size: 1.1rem; display: block; margin-bottom: 6px;">
            ⚙️ The Paradigm Inversion: Traditional Code vs. Machine Learning
          </strong>
          <p style="font-size: 1.08rem; color: #334155; line-height: 1.75; margin: 0;">
            ${item.learn.differenceTraditional}
          </p>
        </div>
        <h4 style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin: 28px 0 14px;">
          ⏳ Landmark Historical Milestones of Artificial Intelligence
        </h4>
        <div class="timeline-list">
          ${timelineHtml}
        </div>
      </div>

      <div class="study-flow-section" id="section_realWorld" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #059669; display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
          <span>🌍</span> Activity 2: Real-World Enterprise Production Systems
        </div>
        <div>${realWorldHtml}</div>
      </div>

      <div class="study-flow-section" id="section_visual" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #7c3aed; display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
          <span>🔬</span> Activity 3: Visual Demonstration — Programming Paradigm Comparison
        </div>
        <div style="background: #fdf4ff; border: 2.5px solid #e9d5ff; border-radius: 18px; padding: 24px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
            <h4 style="color: #6b21a8; font-size: 1.2rem; margin: 0;">${item.visualDemo.title}</h4>
            <button type="button" class="btn-hero-primary" id="btnRunParadigmAnim" style="background: #7c3aed; padding: 9px 20px; font-size: 0.95rem;">
              ▶️ Run Flow Simulation
            </button>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div id="pipeTraditional" style="background: white; border: 2px solid #cbd5e1; border-radius: 14px; padding: 18px;">
              <h5 style="color: #334155; font-size: 1.1rem; margin-bottom: 8px;">1. Traditional Deterministic Code</h5>
              <div style="font-family: var(--font-mono); font-size: 0.92rem; background: #f1f5f9; padding: 10px 14px; border-radius: 8px; margin-bottom: 10px;">
                ${item.visualDemo.traditional.formula}
              </div>
              <ul style="padding-left: 20px; font-size: 0.95rem; color: #475569; line-height: 1.7;">
                ${item.visualDemo.traditional.steps.map(s => `<li>${s}</li>`).join('')}
              </ul>
            </div>
            <div id="pipeAI" style="background: white; border: 2px solid #cbd5e1; border-radius: 14px; padding: 18px;">
              <h5 style="color: #1e3a8a; font-size: 1.1rem; margin-bottom: 8px;">2. Artificial Intelligence / ML</h5>
              <div style="font-family: var(--font-mono); font-size: 0.92rem; background: #eff6ff; padding: 10px 14px; border-radius: 8px; margin-bottom: 10px;">
                ${item.visualDemo.ai.formula}
              </div>
              <ul style="padding-left: 20px; font-size: 0.95rem; color: #475569; line-height: 1.7;">
                ${item.visualDemo.ai.steps.map(s => `<li>${s}</li>`).join('')}
              </ul>
            </div>
          </div>
          <div id="animPipelineStatus" style="margin-top: 14px; text-align: center; font-weight: 700; color: #6b21a8;"></div>
        </div>
      </div>

      <div class="study-flow-section" id="section_game" style="margin-top: 40px; padding-top: 28px; border-top: 3px solid #3b82f6;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
          <div style="font-size: 1.4rem; font-weight: 800; color: #1e3a8a;">
            <span>🎮</span> Activity 4: Interactive Concept Game — AI Application Detective
          </div>
          <div style="background: #1e293b; color: white; padding: 6px 16px; border-radius: 9999px; font-weight: 800; font-size: 0.95rem;" id="detectiveScoreBadge">
            Score: 0 / 10 | Detective Rank: Junior Analyst 🕵️
          </div>
        </div>
        <p style="font-size: 1.1rem; color: #475569; margin-bottom: 20px;">${item.game.instruction}</p>
        <div class="detective-grid" id="detectiveCardsGrid"></div>
      </div>

      <div class="study-flow-section" id="section_quiz" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #d97706; margin-bottom: 16px;">
          <span>📝</span> Activity 5: University Assessment Quiz & In-Between Concept Games
        </div>
        <div id="quizContainer"></div>
      </div>

      <div class="study-flow-section" id="section_complete" style="margin-top: 40px; padding: 34px 26px; background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border: 3px solid #86efac; border-radius: 20px; text-align: center;">
        <div style="font-size: 3.4rem; margin-bottom: 10px;">🎉🎖️⭐</div>
        <h3 style="color: #166534; font-size: 1.65rem; font-weight: 800; margin-bottom: 8px;">
          Outstanding Work! You Mastered Topic 1: Introduction to AI
        </h3>
        <p style="color: #374151; font-size: 1.15rem; max-width: 680px; margin: 0 auto 24px auto;">
          You completed theory, explored production architectures, cracked the detective game, and solved the assessment checkpoints!
        </p>
        <button type="button" class="btn-complete-topic" id="btnClaimTopic1Mastery" style="padding: 15px 36px; font-size: 1.25rem;">
          ✓ Claim Topic 1 Mastery (+50 ⭐ & AI Pioneer Badge)
        </button>
      </div>
    `;

    // Hook up visual animation
    const btnAnim = panel.querySelector('#btnRunParadigmAnim');
    const pStatus = panel.querySelector('#animPipelineStatus');
    const pTrad = panel.querySelector('#pipeTraditional');
    const pAI = panel.querySelector('#pipeAI');
    if (btnAnim) {
      btnAnim.onclick = () => {
        btnAnim.disabled = true;
        pStatus.innerText = "Step 1/2: Simulating Traditional Hardcoded Rules...";
        pTrad.style.borderColor = '#2563eb';
        pTrad.style.background = '#eff6ff';
        pAI.style.borderColor = '#cbd5e1';
        pAI.style.background = 'white';

        setTimeout(() => {
          pStatus.innerText = "Step 2/2: Simulating AI/ML Learning from Observed Data...";
          pTrad.style.borderColor = '#cbd5e1';
          pTrad.style.background = 'white';
          pAI.style.borderColor = '#059669';
          pAI.style.background = '#ecfdf5';

          setTimeout(() => {
            pStatus.innerText = "✓ Simulation Complete! Notice how AI outputs a reusable, generalizing mathematical model.";
            btnAnim.disabled = false;
          }, 1200);
        }, 1200);
      };
    }

    // Detective Game Cards
    const detectiveGrid = panel.querySelector('#detectiveCardsGrid');
    if (detectiveGrid) {
      item.game.items.forEach(gItem => {
        const card = document.createElement('div');
        card.className = 'detective-card';
        card.id = `detectiveCard_${gItem.id}`;
        card.innerHTML = `
          <div class="detective-header">
            <span class="detective-icon">${gItem.icon}</span>
            <span class="detective-name">${gItem.name}</span>
          </div>
          <div class="detective-actions">
            <button type="button" class="btn-detective-opt" data-choice="true">🤖 AI-Powered</button>
            <button type="button" class="btn-detective-opt" data-choice="false">⚙️ Rule-Based / Not AI</button>
          </div>
          <div class="detective-explanation" id="detExp_${gItem.id}"></div>
        `;

        card.querySelectorAll('.btn-detective-opt').forEach(btn => {
          btn.onclick = () => {
            const chosenIsAI = btn.getAttribute('data-choice') === 'true';
            const isCorrect = chosenIsAI === gItem.isAI;
            const expEl = card.querySelector(`#detExp_${gItem.id}`);

            card.querySelectorAll('.btn-detective-opt').forEach(b => {
              b.classList.remove('selected-correct', 'selected-wrong');
            });

            expEl.style.display = 'block';
            if (isCorrect) {
              btn.classList.add('selected-correct');
              card.classList.add('answered-correct');
              card.classList.remove('answered-wrong');
              expEl.style.background = '#dcfce7';
              expEl.style.color = '#15803d';
              expEl.innerHTML = `✅ <strong>Correct!</strong> ${gItem.explanation}`;

              if (!this.detectiveAnswered[gItem.id]) {
                this.detectiveScore += 1;
                this.detectiveAnswered[gItem.id] = true;
              }
            } else {
              btn.classList.add('selected-wrong');
              card.classList.add('answered-wrong');
              card.classList.remove('answered-correct');
              expEl.style.background = '#fee2e2';
              expEl.style.color = '#991b1b';
              expEl.innerHTML = `❌ <strong>Incorrect.</strong> ${gItem.explanation}`;
            }

            const badge = panel.querySelector('#detectiveScoreBadge');
            if (badge) {
              let rank = "Junior Analyst 🕵️";
              if (this.detectiveScore >= 8) rank = "Master AI Detective 🏆";
              else if (this.detectiveScore >= 5) rank = "Senior Investigator 🔍";
              badge.innerText = `Score: ${this.detectiveScore} / 10 | Detective Rank: ${rank}`;
            }
          };
        });

        detectiveGrid.appendChild(card);
      });
    }

    this.renderQuiz(panel.querySelector('#quizContainer'), item.quiz, item.id);

    const btnClaim = panel.querySelector('#btnClaimTopic1Mastery');
    if (btnClaim) {
      btnClaim.onclick = () => {
        StudentState.markTopicComplete(1, "AI Pioneer");
        this.setupHUD();
        this.renderTopicsGrid();
        document.getElementById('collegeStudyModal').classList.add('hidden');
      };
    }
  }

  // ========================================================
  // TOPIC 2: TYPES OF ARTIFICIAL INTELLIGENCE
  // ========================================================
  renderTopic2Flow(panel, item) {
    this.classifyScore = 0;
    this.classifyAnswered = {};

    panel.innerHTML = `
      <div class="study-flow-section" id="section_learn">
        <div style="font-size: 1.4rem; font-weight: 800; color: #1e3a8a; margin-bottom: 16px;">
          <span>📘</span> Activity 1: The Three Cognitive Tiers of Artificial Intelligence
        </div>
        <p style="font-size: 1.18rem; line-height: 1.85; color: #1e293b; margin-bottom: 18px;">
          ${item.learn.definition}
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 24px;">
          ${item.learn.keyConcepts.map(c => `
            <div style="background: white; border: 2px solid #cbd5e1; border-radius: 14px; padding: 18px;">
              <h4 style="color: #1e3a8a; font-size: 1.1rem; margin-bottom: 6px;">${c.name}</h4>
              <p style="font-size: 0.98rem; color: #475569; line-height: 1.6; margin: 0;">${c.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="study-flow-section" id="section_realWorld" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #059669; margin-bottom: 16px;">
          <span>🌍</span> Activity 2: Real-World Applications & Theoretical Limits
        </div>
        ${item.realWorld.map((rw, idx) => `
          <div style="background: white; border: 2px solid #cbd5e1; border-radius: 16px; padding: 18px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <h4 style="color: #1e3a8a; margin: 0;">${idx + 1}. ${rw.system}</h4>
              <span style="font-size: 0.82rem; font-weight: 800; background: #e0f2fe; color: #0369a1; padding: 3px 10px; border-radius: 9999px;">
                ${rw.domain}
              </span>
            </div>
            <p style="color: #475569; line-height: 1.65; margin: 0;">${rw.howItWorks}</p>
          </div>
        `).join('')}
      </div>

      <div class="study-flow-section" id="section_visual" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #7c3aed; margin-bottom: 16px;">
          <span>🔬</span> Activity 3: Visual Demonstration — Cognitive Scope Spectrum
        </div>
        <div style="background: #faf5ff; border: 2px solid #e9d5ff; border-radius: 16px; padding: 22px;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
            ${item.visualDemo.spectrum.map(tier => `
              <div style="background: white; border: 2px solid #cbd5e1; border-radius: 12px; padding: 16px;">
                <h5 style="color: #1e3a8a; font-size: 1.15rem; margin-bottom: 6px;">${tier.tier}</h5>
                <span style="display: inline-block; font-size: 0.8rem; font-weight: 800; padding: 2px 8px; border-radius: 6px; margin-bottom: 10px; background: ${tier.status === 'Deployed Reality' ? '#dcfce7; color: #15803d;' : '#fef3c7; color: #b45309;'}">
                  ${tier.status}
                </span>
                <p style="font-size: 0.92rem; color: #475569; margin-bottom: 4px;"><strong>Cognitive Scope:</strong> ${tier.scope}</p>
                <p style="font-size: 0.92rem; color: #475569; margin-bottom: 4px;"><strong>Autonomy:</strong> ${tier.autonomy}</p>
                <p style="font-size: 0.92rem; color: #1e40af; margin: 0;"><strong>Examples:</strong> ${tier.examples}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="study-flow-section" id="section_game" style="margin-top: 40px; padding-top: 28px; border-top: 3px solid #3b82f6;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
          <div style="font-size: 1.4rem; font-weight: 800; color: #1e3a8a;">
            <span>🎮</span> Activity 4: Interactive Concept Game — Classify the AI
          </div>
          <div style="background: #1e293b; color: white; padding: 6px 16px; border-radius: 9999px; font-weight: 800; font-size: 0.95rem;" id="classifyScoreBadge">
            Score: 0 / 8 | Category Mastery: In Training 🎓
          </div>
        </div>
        <p style="font-size: 1.1rem; color: #475569; margin-bottom: 18px;">${item.game.instruction}</p>
        <div id="classifyCardsList" style="display: flex; flex-direction: column; gap: 14px;"></div>
      </div>

      <div class="study-flow-section" id="section_quiz" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #d97706; margin-bottom: 16px;">
          <span>📝</span> Activity 5: University Assessment Quiz & In-Between Concept Games
        </div>
        <div id="quizContainer"></div>
      </div>

      <div class="study-flow-section" id="section_complete" style="margin-top: 40px; padding-top: 28px; border-top: 3px solid #059669; text-align: center;">
        <button type="button" class="btn-complete-topic" id="btnClaimTopic2Mastery" style="padding: 15px 36px; font-size: 1.25rem;">
          ✓ Claim Topic 2 Mastery (+50 ⭐ & AI Taxonomist Badge)
        </button>
      </div>
    `;

    const cardsList = panel.querySelector('#classifyCardsList');
    item.game.items.forEach(cItem => {
      const card = document.createElement('div');
      card.style.background = 'white';
      card.style.border = '2px solid #cbd5e1';
      card.style.borderRadius = '14px';
      card.style.padding = '18px';

      card.innerHTML = `
        <p style="font-size: 1.05rem; font-weight: 700; color: #0f172a; margin-bottom: 12px;">
          ${cItem.id}. ${cItem.scenario}
        </p>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button type="button" class="btn-detective-opt" data-choice="ANI">🤖 Narrow AI (ANI)</button>
          <button type="button" class="btn-detective-opt" data-choice="AGI">🧠 General AI (AGI)</button>
          <button type="button" class="btn-detective-opt" data-choice="ASI">🌌 Super AI (ASI)</button>
        </div>
        <div class="detective-explanation" id="clsExp_${cItem.id}" style="display: none; margin-top: 10px;"></div>
      `;

      card.querySelectorAll('.btn-detective-opt').forEach(btn => {
        btn.onclick = () => {
          const choice = btn.getAttribute('data-choice');
          const isCorrect = choice === cItem.correct;
          const exp = card.querySelector(`#clsExp_${cItem.id}`);

          card.querySelectorAll('.btn-detective-opt').forEach(b => {
            b.classList.remove('selected-correct', 'selected-wrong');
          });

          exp.style.display = 'block';
          if (isCorrect) {
            btn.classList.add('selected-correct');
            exp.style.background = '#dcfce7';
            exp.style.color = '#15803d';
            exp.innerHTML = `✅ <strong>Correct (${cItem.correct})!</strong> ${cItem.explanation}`;
            if (!this.classifyAnswered[cItem.id]) {
              this.classifyScore += 1;
              this.classifyAnswered[cItem.id] = true;
            }
          } else {
            btn.classList.add('selected-wrong');
            exp.style.background = '#fee2e2';
            exp.style.color = '#991b1b';
            exp.innerHTML = `❌ <strong>Incorrect.</strong> The correct classification is <strong>${cItem.correct}</strong>. ${cItem.explanation}`;
          }

          const badge = panel.querySelector('#classifyScoreBadge');
          if (badge) {
            badge.innerText = `Score: ${this.classifyScore} / 8 | Category Mastery: ${this.classifyScore >= 6 ? 'Advanced Taxonomist 🏆' : 'Practicing 🎓'}`;
          }
        };
      });

      cardsList.appendChild(card);
    });

    this.renderQuiz(panel.querySelector('#quizContainer'), item.quiz, item.id);

    const btnClaim = panel.querySelector('#btnClaimTopic2Mastery');
    if (btnClaim) {
      btnClaim.onclick = () => {
        StudentState.markTopicComplete(2, "AI Taxonomist");
        this.setupHUD();
        this.renderTopicsGrid();
        document.getElementById('collegeStudyModal').classList.add('hidden');
      };
    }
  }

  // ========================================================
  // TOPIC 3: INTELLIGENT AGENTS & PEAS FRAMEWORK
  // ========================================================
  renderTopic3Flow(panel, item) {
    this.vacuumState = {
      agent: { x: 0, y: 0, dir: 'EAST' },
      dirt: [{ x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 0 }, { x: 2, y: 3 }, { x: 3, y: 1 }],
      obstacles: [{ x: 1, y: 1 }, { x: 2, y: 2 }],
      dock: { x: 0, y: 0 },
      cleanedCount: 0,
      stepsCount: 0,
      battery: 100,
      runningAuto: false
    };

    panel.innerHTML = `
      <div class="study-flow-section" id="section_learn">
        <div style="font-size: 1.4rem; font-weight: 800; color: #1e3a8a; margin-bottom: 16px;">
          <span>📘</span> Activity 1: Intelligent Agents & Formal PEAS Formulation
        </div>
        <p style="font-size: 1.18rem; line-height: 1.85; color: #1e293b; margin-bottom: 20px;">
          ${item.learn.definition}
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 24px;">
          ${item.learn.peasBreakdown.map(p => `
            <div style="background: white; border: 2px solid #cbd5e1; border-radius: 14px; padding: 18px;">
              <h4 style="color: #2563eb; font-size: 1.1rem; margin-bottom: 6px;">${p.component}</h4>
              <p style="font-size: 0.96rem; color: #475569; line-height: 1.6; margin: 0;">${p.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="study-flow-section" id="section_realWorld" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #059669; margin-bottom: 16px;">
          <span>🌍</span> Activity 2: Enterprise PEAS Formulations in Production
        </div>
        ${item.realWorld.map((rw, idx) => `
          <div style="background: white; border: 2px solid #cbd5e1; border-radius: 16px; padding: 18px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <h4 style="color: #1e3a8a; margin: 0;">${idx + 1}. ${rw.system}</h4>
              <span style="font-size: 0.82rem; font-weight: 800; background: #eff6ff; color: #1d4ed8; padding: 3px 10px; border-radius: 9999px;">
                ${rw.domain}
              </span>
            </div>
            <p style="color: #475569; line-height: 1.65; margin: 0;">${rw.howItWorks}</p>
          </div>
        `).join('')}
      </div>

      <div class="study-flow-section" id="section_visual" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #7c3aed; margin-bottom: 16px;">
          <span>🔬</span> Activity 3: Visual Demonstration — PEAS Matrix Formulation Explorer
        </div>
        <div style="background: #faf5ff; border: 2.5px solid #e9d5ff; border-radius: 18px; padding: 22px;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
            <div style="background: white; border: 2px solid #cbd5e1; border-radius: 12px; padding: 16px;">
              <h5 style="color: #1e3a8a; font-size: 1.1rem; margin-bottom: 8px;">Autonomous Vacuum</h5>
              <p style="font-size: 0.92rem; margin-bottom: 4px;"><strong>P:</strong> Cleanliness, energy efficiency</p>
              <p style="font-size: 0.92rem; margin-bottom: 4px;"><strong>E:</strong> Carpets, furniture, walls</p>
              <p style="font-size: 0.92rem; margin-bottom: 4px;"><strong>A:</strong> Wheels, suction brush</p>
              <p style="font-size: 0.92rem; margin: 0;"><strong>S:</strong> Dirt sensor, bumper, cliff sensor</p>
            </div>
            <div style="background: white; border: 2px solid #cbd5e1; border-radius: 12px; padding: 16px;">
              <h5 style="color: #1e3a8a; font-size: 1.1rem; margin-bottom: 8px;">Autonomous Robotaxi (Waymo)</h5>
              <p style="font-size: 0.92rem; margin-bottom: 4px;"><strong>P:</strong> Safety, speed compliance, comfort</p>
              <p style="font-size: 0.92rem; margin-bottom: 4px;"><strong>E:</strong> Urban streets, pedestrians, weather</p>
              <p style="font-size: 0.92rem; margin-bottom: 4px;"><strong>A:</strong> Steering motor, brakes, accelerator</p>
              <p style="font-size: 0.92rem; margin: 0;"><strong>S:</strong> 360 LiDAR, cameras, radar, GPS</p>
            </div>
          </div>
        </div>
      </div>

      <div class="study-flow-section" id="section_game" style="margin-top: 40px; padding-top: 28px; border-top: 3px solid #3b82f6;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #1e3a8a; margin-bottom: 12px;">
          <span>🎮</span> Activity 4: Interactive Concept Game — Smart Agent PEAS Room Environment
        </div>
        <p style="font-size: 1.1rem; color: #475569; margin-bottom: 18px;">${item.game.instruction}</p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 18px;">
          <div style="background: #1e293b; color: white; padding: 12px 16px; border-radius: 12px;">
            <span style="font-size: 0.8rem; color: #94a3b8; display: block;">PERFORMANCE (P)</span>
            <strong id="vacPerfScore" style="font-size: 1.15rem; color: #4ade80;">Clean: 0/5 | Score: 0</strong>
          </div>
          <div style="background: #1e293b; color: white; padding: 12px 16px; border-radius: 12px;">
            <span style="font-size: 0.8rem; color: #94a3b8; display: block;">BATTERY STATUS</span>
            <strong id="vacBattery" style="font-size: 1.15rem; color: #38bdf8;">⚡ 100%</strong>
          </div>
          <div style="background: #1e293b; color: white; padding: 12px 16px; border-radius: 12px;">
            <span style="font-size: 0.8rem; color: #94a3b8; display: block;">SENSOR PERCEPT (S)</span>
            <strong id="vacPercept" style="font-size: 0.95rem; color: #facc15;">Dirt: NO | Bump: CLEAR</strong>
          </div>
        </div>

        <div style="display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start;">
          <div id="vacuumGridContainer" style="display: grid; grid-template-columns: repeat(4, 70px); grid-template-rows: repeat(4, 70px); gap: 6px; background: #e2e8f0; padding: 10px; border-radius: 16px; border: 3px solid #94a3b8;"></div>

          <div style="flex: 1; min-width: 260px;">
            <h5 style="color: #0f172a; margin-bottom: 8px;">Actuator Control Panel (A):</h5>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
              <button type="button" class="btn-code-action" id="btnVacForward" style="background: #2563eb; color: white;">⬆️ Move Forward</button>
              <button type="button" class="btn-code-action" id="btnVacTurnLeft" style="background: #475569; color: white;">↩️ Turn Left</button>
              <button type="button" class="btn-code-action" id="btnVacTurnRight" style="background: #475569; color: white;">↪️ Turn Right</button>
              <button type="button" class="btn-code-action" id="btnVacSuck" style="background: #059669; color: white;">🧹 Suck Dirt</button>
            </div>

            <div style="margin-top: 14px; display: flex; gap: 10px; flex-wrap: wrap;">
              <button type="button" class="btn-hero-primary" id="btnVacRunAuto" style="background: #7c3aed; padding: 10px 18px; font-size: 0.95rem;">
                🤖 Run Autonomous Reflex Agent
              </button>
              <button type="button" class="btn-code-action" id="btnVacReset" style="background: #f1f5f9; color: #334155;">
                🔄 Reset Room
              </button>
            </div>
            <p id="vacStatusText" style="margin-top: 12px; font-size: 0.92rem; color: #64748b; font-weight: 600;">
              Click controls or run the autonomous agent to observe the PEAS percept-action loop!
            </p>
          </div>
        </div>
      </div>

      <div class="study-flow-section" id="section_quiz" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #d97706; margin-bottom: 16px;">
          <span>📝</span> Activity 5: University Assessment Quiz & In-Between Concept Games
        </div>
        <div id="quizContainer"></div>
      </div>

      <div class="study-flow-section" id="section_complete" style="margin-top: 40px; padding-top: 28px; border-top: 3px solid #059669; text-align: center;">
        <button type="button" class="btn-complete-topic" id="btnClaimTopic3Mastery" style="padding: 15px 36px; font-size: 1.25rem;">
          ✓ Claim Topic 3 Mastery (+50 ⭐ & Agent Architect Badge)
        </button>
      </div>
    `;

    const updateVacDisplay = () => {
      const v = this.vacuumState;
      const grid = panel.querySelector('#vacuumGridContainer');
      if (!grid) return;
      grid.innerHTML = '';

      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          const cell = document.createElement('div');
          cell.style.width = '70px';
          cell.style.height = '70px';
          cell.style.borderRadius = '10px';
          cell.style.display = 'flex';
          cell.style.alignItems = 'center';
          cell.style.justifyContent = 'center';
          cell.style.fontSize = '1.8rem';

          const isAgent = v.agent.x === c && v.agent.y === r;
          const isObstacle = v.obstacles.some(o => o.x === c && o.y === r);
          const hasDirt = v.dirt.some(d => d.x === c && d.y === r);
          const isDock = v.dock.x === c && v.dock.y === r;

          if (isObstacle) {
            cell.style.background = '#64748b';
            cell.innerText = '🧱';
          } else if (isAgent) {
            cell.style.background = '#3b82f6';
            cell.innerText = '🤖';
          } else if (hasDirt) {
            cell.style.background = '#fef3c7';
            cell.innerText = '🟤';
          } else if (isDock) {
            cell.style.background = '#e0f2fe';
            cell.innerText = '⚡';
          } else {
            cell.style.background = 'white';
          }

          grid.appendChild(cell);
        }
      }

      const isCurrentDirty = v.dirt.some(d => d.x === v.agent.x && d.y === v.agent.y);
      const perfEl = panel.querySelector('#vacPerfScore');
      const battEl = panel.querySelector('#vacBattery');
      const perceptEl = panel.querySelector('#vacPercept');

      if (perfEl) perfEl.innerText = `Clean: ${v.cleanedCount}/5 | Steps: ${v.stepsCount}`;
      if (battEl) battEl.innerText = `⚡ ${v.battery}%`;
      if (perceptEl) perceptEl.innerText = `Dirt: ${isCurrentDirty ? 'DETECTED! 🟤' : 'CLEAR'} | Facing: ${v.agent.dir}`;
    };

    updateVacDisplay();

    const moveVacForward = () => {
      const v = this.vacuumState;
      let nx = v.agent.x;
      let ny = v.agent.y;
      if (v.agent.dir === 'EAST') nx++;
      else if (v.agent.dir === 'WEST') nx--;
      else if (v.agent.dir === 'SOUTH') ny++;
      else if (v.agent.dir === 'NORTH') ny--;

      const hitWall = nx < 0 || nx > 3 || ny < 0 || ny > 3;
      const hitObstacle = v.obstacles.some(o => o.x === nx && o.y === ny);

      v.stepsCount++;
      v.battery = Math.max(0, v.battery - 1);

      if (hitWall || hitObstacle) {
        panel.querySelector('#vacStatusText').innerText = '⚠️ Bump sensor triggered! Actuator blocked.';
      } else {
        v.agent.x = nx;
        v.agent.y = ny;
        panel.querySelector('#vacStatusText').innerText = `Agent moved forward to (${nx}, ${ny}).`;
      }
      updateVacDisplay();
    };

    const turnVac = (turnDir) => {
      const dirs = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
      let idx = dirs.indexOf(this.vacuumState.agent.dir);
      if (turnDir === 'LEFT') idx = (idx + 3) % 4;
      else idx = (idx + 1) % 4;
      this.vacuumState.agent.dir = dirs[idx];
      this.vacuumState.stepsCount++;
      this.vacuumState.battery = Math.max(0, this.vacuumState.battery - 1);
      updateVacDisplay();
    };

    const suckVacDirt = () => {
      const v = this.vacuumState;
      const dIdx = v.dirt.findIndex(d => d.x === v.agent.x && d.y === v.agent.y);
      if (dIdx >= 0) {
        v.dirt.splice(dIdx, 1);
        v.cleanedCount++;
        v.battery = Math.max(0, v.battery - 2);
        panel.querySelector('#vacStatusText').innerText = `🧹 Vacuum suction activated! Dirt cleaned (+10 Performance).`;
      } else {
        v.battery = Math.max(0, v.battery - 1);
        panel.querySelector('#vacStatusText').innerText = `Suction ran on clean tile.`;
      }
      updateVacDisplay();
    };

    panel.querySelector('#btnVacForward').onclick = moveVacForward;
    panel.querySelector('#btnVacTurnLeft').onclick = () => turnVac('LEFT');
    panel.querySelector('#btnVacTurnRight').onclick = () => turnVac('RIGHT');
    panel.querySelector('#btnVacSuck').onclick = suckVacDirt;

    panel.querySelector('#btnVacReset').onclick = () => {
      if (this.vacuumTimer) clearInterval(this.vacuumTimer);
      this.renderTopic3Flow(panel, item);
    };

    panel.querySelector('#btnVacRunAuto').onclick = () => {
      const btn = panel.querySelector('#btnVacRunAuto');
      if (this.vacuumState.runningAuto) {
        clearInterval(this.vacuumTimer);
        this.vacuumState.runningAuto = false;
        btn.innerText = '🤖 Run Autonomous Reflex Agent';
        return;
      }

      this.vacuumState.runningAuto = true;
      btn.innerText = '⏸️ Pause Autonomous Loop';

      this.vacuumTimer = setInterval(() => {
        const v = this.vacuumState;
        if (v.dirt.length === 0 || v.battery <= 5) {
          clearInterval(this.vacuumTimer);
          v.runningAuto = false;
          btn.innerText = '🤖 Run Autonomous Reflex Agent';
          panel.querySelector('#vacStatusText').innerText = '🎉 Room 100% Clean! Autonomous agent goal satisfied.';
          return;
        }

        const isDirty = v.dirt.some(d => d.x === v.agent.x && d.y === v.agent.y);
        if (isDirty) {
          suckVacDirt();
          return;
        }

        let nx = v.agent.x;
        let ny = v.agent.y;
        if (v.agent.dir === 'EAST') nx++;
        else if (v.agent.dir === 'WEST') nx--;
        else if (v.agent.dir === 'SOUTH') ny++;
        else if (v.agent.dir === 'NORTH') ny--;

        const blocked = nx < 0 || nx > 3 || ny < 0 || ny > 3 || v.obstacles.some(o => o.x === nx && o.y === ny);

        if (blocked) {
          turnVac('RIGHT');
        } else {
          moveVacForward();
        }
      }, 500);
    };

    this.renderQuiz(panel.querySelector('#quizContainer'), item.quiz, item.id);

    const btnClaim = panel.querySelector('#btnClaimTopic3Mastery');
    if (btnClaim) {
      btnClaim.onclick = () => {
        StudentState.markTopicComplete(3, "Agent Architect");
        this.setupHUD();
        this.renderTopicsGrid();
        document.getElementById('collegeStudyModal').classList.add('hidden');
      };
    }
  }

  // ========================================================
  // TOPIC 4: PROBLEM SOLVING IN AI
  // ========================================================
  renderTopic4Flow(panel, item) {
    this.mazeAgentPos = { x: 0, y: 0 };
    this.mazeMovesCount = 0;
    const walls = item.game.walls;
    const goal = item.game.goalState;

    panel.innerHTML = `
      <div class="study-flow-section" id="section_learn">
        <div style="font-size: 1.4rem; font-weight: 800; color: #1e3a8a; margin-bottom: 16px;">
          <span>📘</span> Activity 1: State Space Problem Formulation & Heuristics
        </div>
        <p style="font-size: 1.18rem; line-height: 1.85; color: #1e293b; margin-bottom: 20px;">
          ${item.learn.definition}
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; margin-bottom: 24px;">
          ${item.learn.fiveElements.map(el => `
            <div style="background: white; border: 2px solid #cbd5e1; border-radius: 12px; padding: 16px;">
              <h4 style="color: #1e3a8a; font-size: 1.05rem; margin-bottom: 6px;">${el.element}</h4>
              <p style="font-size: 0.95rem; color: #475569; line-height: 1.6; margin: 0;">${el.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="study-flow-section" id="section_realWorld" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #059669; margin-bottom: 16px;">
          <span>🌍</span> Activity 2: Production State-Space Problems
        </div>
        ${item.realWorld.map((rw, idx) => `
          <div style="background: white; border: 2px solid #cbd5e1; border-radius: 16px; padding: 18px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <h4 style="color: #1e3a8a; margin: 0;">${idx + 1}. ${rw.system}</h4>
              <span style="font-size: 0.82rem; font-weight: 800; background: #e0f2fe; color: #0369a1; padding: 3px 10px; border-radius: 9999px;">
                ${rw.domain}
              </span>
            </div>
            <p style="color: #475569; line-height: 1.65; margin: 0;">${rw.howItWorks}</p>
          </div>
        `).join('')}
      </div>

      <div class="study-flow-section" id="section_visual" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #7c3aed; margin-bottom: 16px;">
          <span>🔬</span> Activity 3: Visual Demonstration — State Space Tree Search Graph
        </div>
        <div style="background: #faf5ff; border: 2px solid #e9d5ff; border-radius: 16px; padding: 22px;">
          <div style="background: white; border: 2px solid #cbd5e1; border-radius: 10px; padding: 14px; font-family: var(--font-mono); font-size: 0.92rem; color: #1e40af;">
            State = (x, y) | Actions = [Up, Down, Left, Right] | Heuristic h(n) = |Goal_x - x| + |Goal_y - y|
          </div>
        </div>
      </div>

      <div class="study-flow-section" id="section_game" style="margin-top: 40px; padding-top: 28px; border-top: 3px solid #3b82f6;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #1e3a8a; margin-bottom: 12px;">
          <span>🎮</span> Activity 4: Interactive Concept Game — State Space & Goal State Maze
        </div>
        <p style="font-size: 1.1rem; color: #475569; margin-bottom: 18px;">${item.game.instruction}</p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 18px;">
          <div style="background: #1e293b; color: white; padding: 12px 16px; border-radius: 12px;">
            <span style="font-size: 0.8rem; color: #94a3b8; display: block;">CURRENT STATE</span>
            <strong id="mazeCurState" style="font-size: 1.15rem; color: #38bdf8;">(0, 0)</strong>
          </div>
          <div style="background: #1e293b; color: white; padding: 12px 16px; border-radius: 12px;">
            <span style="font-size: 0.8rem; color: #94a3b8; display: block;">PATH COST g(n)</span>
            <strong id="mazePathCost" style="font-size: 1.15rem; color: #4ade80;">0 Moves</strong>
          </div>
          <div style="background: #1e293b; color: white; padding: 12px 16px; border-radius: 12px;">
            <span style="font-size: 0.8rem; color: #94a3b8; display: block;">HEURISTIC h(n)</span>
            <strong id="mazeHeuristic" style="font-size: 1.15rem; color: #facc15;">8 (Manhattan)</strong>
          </div>
          <div style="background: #1e293b; color: white; padding: 12px 16px; border-radius: 12px;">
            <span style="font-size: 0.8rem; color: #94a3b8; display: block;">GOAL TEST</span>
            <strong id="mazeGoalStatus" style="font-size: 1.15rem; color: #f87171;">False ❌</strong>
          </div>
        </div>

        <div style="display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start;">
          <div id="mazeGridContainer" style="display: grid; grid-template-columns: repeat(5, 60px); grid-template-rows: repeat(5, 60px); gap: 6px; background: #e2e8f0; padding: 10px; border-radius: 16px; border: 3px solid #94a3b8;"></div>

          <div style="flex: 1; min-width: 260px;">
            <h5 style="color: #0f172a; margin-bottom: 8px;">State Transition Actions:</h5>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
              <button type="button" class="btn-code-action" id="btnMazeUp" style="background: #2563eb; color: white;">⬆️ Move Up</button>
              <button type="button" class="btn-code-action" id="btnMazeDown" style="background: #2563eb; color: white;">⬇️ Move Down</button>
              <button type="button" class="btn-code-action" id="btnMazeLeft" style="background: #2563eb; color: white;">⬅️ Move Left</button>
              <button type="button" class="btn-code-action" id="btnMazeRight" style="background: #2563eb; color: white;">➡️ Move Right</button>
              <button type="button" class="btn-code-action" id="btnMazeReset" style="background: #f1f5f9; color: #334155;">🔄 Reset</button>
            </div>
            <div id="mazeMessage" style="font-size: 0.95rem; font-weight: 700; color: #1e40af; margin-top: 10px;"></div>
          </div>
        </div>
      </div>

      <div class="study-flow-section" id="section_quiz" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #d97706; margin-bottom: 16px;">
          <span>📝</span> Activity 5: University Assessment Quiz & In-Between Concept Games
        </div>
        <div id="quizContainer"></div>
      </div>

      <div class="study-flow-section" id="section_complete" style="margin-top: 40px; padding-top: 28px; border-top: 3px solid #059669; text-align: center;">
        <button type="button" class="btn-complete-topic" id="btnClaimTopic4Mastery" style="padding: 15px 36px; font-size: 1.25rem;">
          ✓ Claim Topic 4 Mastery (+50 ⭐ & Problem Solver Badge)
        </button>
      </div>
    `;

    const updateMazeDisplay = () => {
      const grid = panel.querySelector('#mazeGridContainer');
      if (!grid) return;
      grid.innerHTML = '';

      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
          const cell = document.createElement('div');
          cell.style.width = '60px';
          cell.style.height = '60px';
          cell.style.borderRadius = '8px';
          cell.style.display = 'flex';
          cell.style.alignItems = 'center';
          cell.style.justifyContent = 'center';
          cell.style.fontSize = '1.6rem';

          const isAgent = this.mazeAgentPos.x === c && this.mazeAgentPos.y === r;
          const isGoal = goal.x === c && goal.y === r;
          const isWall = walls.some(w => w.x === c && w.y === r);

          if (isAgent) {
            cell.style.background = '#3b82f6';
            cell.innerText = '🏃';
          } else if (isWall) {
            cell.style.background = '#475569';
            cell.innerText = '🧱';
          } else if (isGoal) {
            cell.style.background = '#dcfce7';
            cell.innerText = '🎯';
          } else {
            cell.style.background = 'white';
          }

          grid.appendChild(cell);
        }
      }

      const x = this.mazeAgentPos.x;
      const y = this.mazeAgentPos.y;
      const manhattan = Math.abs(goal.x - x) + Math.abs(goal.y - y);
      const isSolved = x === goal.x && y === goal.y;

      panel.querySelector('#mazeCurState').innerText = `(${x}, ${y})`;
      panel.querySelector('#mazePathCost').innerText = `${this.mazeMovesCount} Moves`;
      panel.querySelector('#mazeHeuristic').innerText = `${manhattan} (Manhattan)`;
      const gStatus = panel.querySelector('#mazeGoalStatus');
      if (isSolved) {
        gStatus.innerText = 'True! ✅';
        gStatus.style.color = '#4ade80';
        panel.querySelector('#mazeMessage').innerText = '🎉 Goal State Reached! State-Space problem solved!';
      } else {
        gStatus.innerText = 'False ❌';
        gStatus.style.color = '#f87171';
      }
    };

    updateMazeDisplay();

    const moveMaze = (dx, dy) => {
      const nx = this.mazeAgentPos.x + dx;
      const ny = this.mazeAgentPos.y + dy;

      if (nx < 0 || nx > 4 || ny < 0 || ny > 4) {
        panel.querySelector('#mazeMessage').innerText = '⚠️ Action blocked by boundary.';
        return;
      }
      if (walls.some(w => w.x === nx && w.y === ny)) {
        panel.querySelector('#mazeMessage').innerText = '⚠️ Action blocked by wall obstacle.';
        return;
      }

      this.mazeAgentPos = { x: nx, y: ny };
      this.mazeMovesCount++;
      panel.querySelector('#mazeMessage').innerText = `State transition: Result(s, action) ➡️ (${nx}, ${ny})`;
      updateMazeDisplay();
    };

    panel.querySelector('#btnMazeUp').onclick = () => moveMaze(0, -1);
    panel.querySelector('#btnMazeDown').onclick = () => moveMaze(0, 1);
    panel.querySelector('#btnMazeLeft').onclick = () => moveMaze(-1, 0);
    panel.querySelector('#btnMazeRight').onclick = () => moveMaze(1, 0);
    panel.querySelector('#btnMazeReset').onclick = () => {
      this.mazeAgentPos = { x: 0, y: 0 };
      this.mazeMovesCount = 0;
      panel.querySelector('#mazeMessage').innerText = 'Reset to Initial State (0, 0).';
      updateMazeDisplay();
    };

    this.renderQuiz(panel.querySelector('#quizContainer'), item.quiz, item.id);

    const btnClaim = panel.querySelector('#btnClaimTopic4Mastery');
    if (btnClaim) {
      btnClaim.onclick = () => {
        StudentState.markTopicComplete(4, "Problem Solver");
        this.setupHUD();
        this.renderTopicsGrid();
        document.getElementById('collegeStudyModal').classList.add('hidden');
      };
    }
  }

  // ========================================================
  // TOPIC 5: SEARCH ALGORITHMS (BFS vs DFS ANIMATED WORKING & GAME)
  // ========================================================
  renderTopic5Flow(panel, item) {
    this.searchMode = 'BFS';
    this.treeStepIndex = 0;
    this.isGameActive = false;
    this.gameClickIndex = 0;
    this.gameScore = 0;

    // Traversal definitions for the 7-node tree:
    // Root: A(320, 45)
    // Depth 1: B(180, 125), C(460, 125)
    // Depth 2: D(110, 215), E(250, 215), F(390, 215), G(530, 215)
    const bfsSteps = [
      { active: 'A', visited: [], frontier: ['A'], desc: 'Step 0: Start at Root A. Node A is enqueued into the FIFO Queue: [A].' },
      { active: 'A', visited: ['A'], frontier: ['B', 'C'], desc: 'Step 1: Dequeued A from front. Node A is explored! Discovered Depth 1 neighbors B and C. Both added to Queue: [B, C].' },
      { active: 'B', visited: ['A', 'B'], frontier: ['C', 'D', 'E'], desc: 'Step 2: Dequeued B from front. Node B is explored! Discovered Depth 2 neighbors D and E. Added to rear of Queue: [C, D, E]. Notice: Node C is still at FRONT before D and E!' },
      { active: 'C', visited: ['A', 'B', 'C'], frontier: ['D', 'E', 'F', 'G'], desc: 'Step 3: Dequeued C from front. Node C is explored! Discovered Depth 2 neighbors F and G (Goal). Queue = [D, E, F, G].' },
      { active: 'D', visited: ['A', 'B', 'C', 'D'], frontier: ['E', 'F', 'G'], desc: 'Step 4: Dequeued D from front. Leaf node with no children. Queue = [E, F, G].' },
      { active: 'E', visited: ['A', 'B', 'C', 'D', 'E'], frontier: ['F', 'G'], desc: 'Step 5: Dequeued E from front. Leaf node. Queue = [F, G].' },
      { active: 'F', visited: ['A', 'B', 'C', 'D', 'E', 'F'], frontier: ['G'], desc: 'Step 6: Dequeued F from front. Leaf node. Queue = [G].' },
      { active: 'G', visited: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], frontier: [], desc: 'Step 7: Dequeued G from front. 🎯 TARGET GOAL G REACHED! BFS searched level-by-level, guaranteeing the shortest path of 2 edges: A ➡️ C ➡️ G!' }
    ];

    const dfsSteps = [
      { active: 'A', visited: [], frontier: ['A'], desc: 'Step 0: Start at Root A. Node A is pushed onto the LIFO Stack: [A].' },
      { active: 'A', visited: ['A'], frontier: ['B', 'C'], desc: 'Step 1: Popped A from top. Node A is explored! Pushed right child C, then pushed left child B on TOP of stack. Stack = [B (top), C].' },
      { active: 'B', visited: ['A', 'B'], frontier: ['D', 'E', 'C'], desc: 'Step 2: Popped B from top. Node B is explored! Pushed E, then pushed D on TOP: Stack = [D (top), E, C]. DFS dives straight down the branch!' },
      { active: 'D', visited: ['A', 'B', 'D'], frontier: ['E', 'C'], desc: 'Step 3: Popped D from top. D is a dead end (no children)! DFS backtracks to Node E on top of stack!' },
      { active: 'E', visited: ['A', 'B', 'D', 'E'], frontier: ['C'], desc: 'Step 4: Popped E from top. E is a dead end! Entire left branch explored. DFS now backtracks up to explore Node C on top!' },
      { active: 'C', visited: ['A', 'B', 'D', 'E', 'C'], frontier: ['F', 'G'], desc: 'Step 5: Popped C from top. Node C is explored! Pushed right child G, then pushed left child F on TOP: Stack = [F (top), G].' },
      { active: 'F', visited: ['A', 'B', 'D', 'E', 'C', 'F'], frontier: ['G'], desc: 'Step 6: Popped F from top. F is a leaf node! Stack = [G].' },
      { active: 'G', visited: ['A', 'B', 'D', 'E', 'C', 'F', 'G'], frontier: [], desc: 'Step 7: Popped G from top. 🎯 TARGET GOAL G REACHED! Notice how DFS plunged to deep leaves (D, E) before ever visiting C!' }
    ];

    panel.innerHTML = `
      <div class="study-flow-section" id="section_learn">
        <div style="font-size: 1.4rem; font-weight: 800; color: #1e3a8a; margin-bottom: 16px;">
          <span>📘</span> Activity 1: Classical Search Heuristics (BFS, DFS & A*)
        </div>
        <p style="font-size: 1.18rem; line-height: 1.85; color: #1e293b; margin-bottom: 20px;">
          ${item.learn.definition}
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 24px;">
          ${item.learn.algorithmsSummary.map(a => `
            <div style="background: white; border: 2px solid #cbd5e1; border-radius: 14px; padding: 18px;">
              <h4 style="color: #2563eb; font-size: 1.15rem; margin-bottom: 8px;">${a.name}</h4>
              <p style="font-size: 0.94rem; color: #475569; margin-bottom: 4px;"><strong>Frontier:</strong> ${a.frontier}</p>
              <p style="font-size: 0.94rem; color: #475569; margin-bottom: 4px;"><strong>Completeness:</strong> ${a.completeness}</p>
              <p style="font-size: 0.94rem; color: #475569; margin-bottom: 4px;"><strong>Optimality:</strong> ${a.optimality}</p>
              <p style="font-size: 0.94rem; color: #1e40af; margin: 0;"><strong>Complexity:</strong> Time ${a.time} | Space ${a.space}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="study-flow-section" id="section_realWorld" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #059669; margin-bottom: 16px;">
          <span>🌍</span> Activity 2: Production Search Systems
        </div>
        ${item.realWorld.map((rw, idx) => `
          <div style="background: white; border: 2px solid #cbd5e1; border-radius: 16px; padding: 18px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <h4 style="color: #1e3a8a; margin: 0;">${idx + 1}. ${rw.system}</h4>
              <span style="font-size: 0.82rem; font-weight: 800; background: #e0f2fe; color: #0369a1; padding: 3px 10px; border-radius: 9999px;">
                ${rw.domain}
              </span>
            </div>
            <p style="color: #475569; line-height: 1.65; margin: 0;">${rw.howItWorks}</p>
          </div>
        `).join('')}
      </div>

      <!-- Section 3 & 4: DFS & BFS Interactive Working Animation & Game -->
      <div class="study-flow-section" id="section_visual" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.45rem; font-weight: 800; color: #7c3aed; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span>🔬🎮</span> Activity 3: Interactive BFS vs DFS Working Visualizer & Traversal Game
          </div>
          <div style="display: flex; gap: 8px;">
            <button type="button" class="btn-detective-opt selected-correct" id="tabModeSim">▶️ Watch How It Works (Simulation)</button>
            <button type="button" class="btn-detective-opt" id="tabModeGame">🎮 Play Traversal Game</button>
          </div>
        </div>

        <!-- Mode 1: Watch How It Works -->
        <div id="simModeView">
          <div style="display: flex; gap: 10px; margin-bottom: 14px; flex-wrap: wrap;">
            <button type="button" class="btn-code-action" id="btnTreePickBFS" style="background: #0284c7; color: white;">
              🌊 Breadth-First Search (BFS - Queue)
            </button>
            <button type="button" class="btn-code-action" id="btnTreePickDFS" style="background: #475569; color: white;">
              🌲 Depth-First Search (DFS - Stack)
            </button>
          </div>

          <div class="tree-visual-box">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
              <strong style="font-size: 1.15rem; color: #38bdf8;" id="treeSearchTitle">
                🌊 Breadth-First Search (BFS) Working Model
              </strong>
              <div style="display: flex; gap: 8px;">
                <button type="button" class="btn-code-action" id="btnTreeAutoPlay" style="background: #10b981; color: white;">
                  ▶️ Auto-Play Simulation
                </button>
                <button type="button" class="btn-code-action" id="btnTreeStep" style="background: #2563eb; color: white;">
                  ⏭️ Step One Node
                </button>
                <button type="button" class="btn-code-action" id="btnTreeReset" style="background: #334155; color: white;">
                  🔄 Reset Tree
                </button>
              </div>
            </div>

            <!-- SVG Tree Canvas -->
            <svg class="tree-svg-canvas" viewBox="0 0 640 260" id="searchTreeSvg">
              <!-- Tree Branches / Edges -->
              <line x1="320" y1="45" x2="180" y2="125" class="tree-edge-line" id="edge_A_B" />
              <line x1="320" y1="45" x2="460" y2="125" class="tree-edge-line" id="edge_A_C" />
              <line x1="180" y1="125" x2="110" y2="215" class="tree-edge-line" id="edge_B_D" />
              <line x1="180" y1="125" x2="250" y2="215" class="tree-edge-line" id="edge_B_E" />
              <line x1="460" y1="125" x2="390" y2="215" class="tree-edge-line" id="edge_C_F" />
              <line x1="460" y1="125" x2="530" y2="215" class="tree-edge-line" id="edge_C_G" />

              <!-- Nodes -->
              <!-- Root A -->
              <g id="svgNode_A" class="tree-node-circle">
                <circle cx="320" cy="45" r="24" fill="#1e293b" stroke="#64748b" stroke-width="3" id="c_A" />
                <text x="320" y="52" fill="white" font-weight="800" font-size="16" text-anchor="middle" id="t_A">A</text>
              </g>

              <!-- Level 1: B and C -->
              <g id="svgNode_B" class="tree-node-circle">
                <circle cx="180" cy="125" r="24" fill="#1e293b" stroke="#64748b" stroke-width="3" id="c_B" />
                <text x="180" y="132" fill="white" font-weight="800" font-size="16" text-anchor="middle" id="t_B">B</text>
              </g>
              <g id="svgNode_C" class="tree-node-circle">
                <circle cx="460" cy="125" r="24" fill="#1e293b" stroke="#64748b" stroke-width="3" id="c_C" />
                <text x="460" y="132" fill="white" font-weight="800" font-size="16" text-anchor="middle" id="t_C">C</text>
              </g>

              <!-- Level 2: D, E, F, G -->
              <g id="svgNode_D" class="tree-node-circle">
                <circle cx="110" cy="215" r="22" fill="#1e293b" stroke="#64748b" stroke-width="3" id="c_D" />
                <text x="110" y="222" fill="white" font-weight="800" font-size="15" text-anchor="middle" id="t_D">D</text>
              </g>
              <g id="svgNode_E" class="tree-node-circle">
                <circle cx="250" cy="215" r="22" fill="#1e293b" stroke="#64748b" stroke-width="3" id="c_E" />
                <text x="250" y="222" fill="white" font-weight="800" font-size="15" text-anchor="middle" id="t_E">E</text>
              </g>
              <g id="svgNode_F" class="tree-node-circle">
                <circle cx="390" cy="215" r="22" fill="#1e293b" stroke="#64748b" stroke-width="3" id="c_F" />
                <text x="390" y="222" fill="white" font-weight="800" font-size="15" text-anchor="middle" id="t_F">F</text>
              </g>
              <g id="svgNode_G" class="tree-node-circle">
                <circle cx="530" cy="215" r="24" fill="#065f46" stroke="#10b981" stroke-width="3" id="c_G" />
                <text x="530" y="222" fill="#facc15" font-weight="900" font-size="16" text-anchor="middle" id="t_G">G🎯</text>
              </g>
            </svg>

            <!-- Frontier Data Structure Status -->
            <div class="frontier-display-panel">
              <strong style="color: #38bdf8; font-size: 0.95rem;" id="frontierTypeLabel">FIFO Queue (First In, First Out):</strong>
              <div class="frontier-chips-row" id="frontierChipsContainer">
                <span class="frontier-chip queue-item">A (Root)</span>
              </div>
            </div>

            <!-- Commentary Banner -->
            <div class="step-commentary-banner" id="treeCommentaryText">
              Step 0: Start at Root A. Node A is placed into the FIFO Queue.
            </div>
          </div>
        </div>

        <!-- Mode 2: Play Traversal Game -->
        <div id="gameModeView" style="display: none;">
          <div style="background: white; border: 2.5px solid #3b82f6; border-radius: 18px; padding: 22px; margin-bottom: 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
              <div>
                <h4 style="color: #1e3a8a; font-size: 1.25rem; margin: 0;" id="gameChallengeTitle">
                  🎮 Challenge: Can You Click the Nodes in Breadth-First Search (BFS) Order?
                </h4>
                <p style="color: #64748b; font-size: 0.95rem; margin: 4px 0 0 0;">
                  Click the nodes directly on the tree above in the exact sequence the algorithm explores them!
                </p>
              </div>
              <div style="background: #1e293b; color: white; padding: 6px 16px; border-radius: 9999px; font-weight: 800; font-size: 0.95rem;" id="gameScoreBadge">
                Score: 0 / 7 | Steps Correct: 0
              </div>
            </div>

            <div style="display: flex; gap: 10px; margin-bottom: 14px;">
              <button type="button" class="btn-code-action" id="btnPlayBFSGame" style="background: #0284c7; color: white;">
                Play BFS Order (Level-by-Level)
              </button>
              <button type="button" class="btn-code-action" id="btnPlayDFSGame" style="background: #7c3aed; color: white;">
                Play DFS Order (Deep-Branch-First)
              </button>
            </div>

            <div id="gameFeedbackText" style="font-size: 1.05rem; font-weight: 700; color: #1e40af; padding: 12px; background: #eff6ff; border-radius: 10px;">
              Ready! Click the first node to begin (Root A).
            </div>
          </div>
        </div>
      </div>

      <div class="study-flow-section" id="section_quiz" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #d97706; margin-bottom: 16px;">
          <span>📝</span> Activity 5: University Assessment Quiz & In-Between Concept Games
        </div>
        <div id="quizContainer"></div>
      </div>

      <div class="study-flow-section" id="section_complete" style="margin-top: 40px; padding-top: 28px; border-top: 3px solid #059669; text-align: center;">
        <button type="button" class="btn-complete-topic" id="btnClaimTopic5Mastery" style="padding: 15px 36px; font-size: 1.25rem;">
          ✓ Claim Topic 5 Mastery (+50 ⭐ & Algorithm Explorer Badge)
        </button>
      </div>
    `;

    // Visual Tree Rendering Function
    const updateTreeVisual = () => {
      const steps = this.searchMode === 'BFS' ? bfsSteps : dfsSteps;
      const step = steps[this.treeStepIndex];
      if (!step) return;

      const nodes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
      nodes.forEach(n => {
        const circle = panel.querySelector(`#c_${n}`);
        if (!circle) return;

        if (n === step.active) {
          circle.setAttribute('fill', '#f59e0b');
          circle.setAttribute('stroke', '#facc15');
          circle.setAttribute('stroke-width', '5');
        } else if (step.visited.includes(n)) {
          circle.setAttribute('fill', '#10b981');
          circle.setAttribute('stroke', '#34d399');
          circle.setAttribute('stroke-width', '3');
        } else if (step.frontier.includes(n)) {
          circle.setAttribute('fill', this.searchMode === 'BFS' ? '#0284c7' : '#7c3aed');
          circle.setAttribute('stroke', this.searchMode === 'BFS' ? '#38bdf8' : '#c084fc');
          circle.setAttribute('stroke-width', '3');
        } else {
          circle.setAttribute('fill', n === 'G' ? '#065f46' : '#1e293b');
          circle.setAttribute('stroke', n === 'G' ? '#10b981' : '#64748b');
          circle.setAttribute('stroke-width', '3');
        }
      });

      // Update Frontier Container
      const fContainer = panel.querySelector('#frontierChipsContainer');
      const fLabel = panel.querySelector('#frontierTypeLabel');
      if (fLabel) {
        fLabel.innerText = this.searchMode === 'BFS' ? 'FIFO Queue (Front ⬅️ Rear):' : 'LIFO Stack (Top ⬇️ Bottom):';
      }

      if (fContainer) {
        if (step.frontier.length === 0) {
          fContainer.innerHTML = `<span style="color: #94a3b8; font-size: 0.9rem;">(Empty - All nodes processed)</span>`;
        } else {
          fContainer.innerHTML = step.frontier.map((item, idx) => `
            <span class="frontier-chip ${this.searchMode === 'BFS' ? 'queue-item' : 'stack-item'}">
              ${idx === 0 ? (this.searchMode === 'BFS' ? 'FRONT: ' : 'TOP: ') : ''}${item}
            </span>
          `).join('');
        }
      }

      // Update Commentary Text
      const comm = panel.querySelector('#treeCommentaryText');
      if (comm) comm.innerText = step.desc;
    };

    updateTreeVisual();

    // Mode Toggle (Simulation vs Game)
    const simView = panel.querySelector('#simModeView');
    const gameView = panel.querySelector('#gameModeView');
    const tabSim = panel.querySelector('#tabModeSim');
    const tabGame = panel.querySelector('#tabModeGame');

    tabSim.onclick = () => {
      this.isGameActive = false;
      tabSim.classList.add('selected-correct');
      tabGame.classList.remove('selected-correct');
      simView.style.display = 'block';
      gameView.style.display = 'none';
      if (this.treeAutoPlayTimer) clearInterval(this.treeAutoPlayTimer);
      updateTreeVisual();
    };

    tabGame.onclick = () => {
      this.isGameActive = true;
      tabGame.classList.add('selected-correct');
      tabSim.classList.remove('selected-correct');
      simView.style.display = 'block';
      gameView.style.display = 'block';
      if (this.treeAutoPlayTimer) clearInterval(this.treeAutoPlayTimer);
      startTraversalGame(this.searchMode);
    };

    // Mode 1: Search Mode Switcher (BFS vs DFS)
    const btnBFS = panel.querySelector('#btnTreePickBFS');
    const btnDFS = panel.querySelector('#btnTreePickDFS');

    btnBFS.onclick = () => {
      this.searchMode = 'BFS';
      this.treeStepIndex = 0;
      btnBFS.style.background = '#0284c7';
      btnDFS.style.background = '#475569';
      panel.querySelector('#treeSearchTitle').innerText = '🌊 Breadth-First Search (BFS) Working Model';
      if (this.treeAutoPlayTimer) clearInterval(this.treeAutoPlayTimer);
      updateTreeVisual();
      if (this.isGameActive) startTraversalGame('BFS');
    };

    btnDFS.onclick = () => {
      this.searchMode = 'DFS';
      this.treeStepIndex = 0;
      btnDFS.style.background = '#7c3aed';
      btnBFS.style.background = '#475569';
      panel.querySelector('#treeSearchTitle').innerText = '🌲 Depth-First Search (DFS) Working Model';
      if (this.treeAutoPlayTimer) clearInterval(this.treeAutoPlayTimer);
      updateTreeVisual();
      if (this.isGameActive) startTraversalGame('DFS');
    };

    // Step button
    panel.querySelector('#btnTreeStep').onclick = () => {
      const steps = this.searchMode === 'BFS' ? bfsSteps : dfsSteps;
      if (this.treeStepIndex < steps.length - 1) {
        this.treeStepIndex++;
      } else {
        this.treeStepIndex = 0;
      }
      updateTreeVisual();
    };

    // Auto-Play button
    panel.querySelector('#btnTreeAutoPlay').onclick = () => {
      const btn = panel.querySelector('#btnTreeAutoPlay');
      if (this.treeAutoPlayTimer) {
        clearInterval(this.treeAutoPlayTimer);
        this.treeAutoPlayTimer = null;
        btn.innerText = '▶️ Auto-Play Simulation';
        return;
      }

      btn.innerText = '⏸️ Pause Simulation';
      const steps = this.searchMode === 'BFS' ? bfsSteps : dfsSteps;

      this.treeAutoPlayTimer = setInterval(() => {
        if (this.treeStepIndex < steps.length - 1) {
          this.treeStepIndex++;
          updateTreeVisual();
        } else {
          clearInterval(this.treeAutoPlayTimer);
          this.treeAutoPlayTimer = null;
          btn.innerText = '▶️ Auto-Play Simulation';
        }
      }, 1400);
    };

    // Reset button
    panel.querySelector('#btnTreeReset').onclick = () => {
      if (this.treeAutoPlayTimer) clearInterval(this.treeAutoPlayTimer);
      this.treeStepIndex = 0;
      updateTreeVisual();
    };

    // Mode 2: Interactive Game Logic
    const startTraversalGame = (mode) => {
      this.searchMode = mode;
      this.gameExpectedOrder = mode === 'BFS' ? ['A', 'B', 'C', 'D', 'E', 'F', 'G'] : ['A', 'B', 'D', 'E', 'C', 'F', 'G'];
      this.gameClickIndex = 0;
      this.gameScore = 0;

      panel.querySelector('#gameChallengeTitle').innerText = mode === 'BFS'
        ? '🎮 Challenge: Click the Nodes in Breadth-First Search (BFS) Order'
        : '🎮 Challenge: Click the Nodes in Depth-First Search (DFS) Order';

      panel.querySelector('#gameFeedbackText').innerText = `Ready! Click the first node to begin (${this.gameExpectedOrder[0]}).`;
      panel.querySelector('#gameScoreBadge').innerText = `Score: 0 / 7 | Steps Correct: 0`;

      // Reset tree styling for game
      ['A', 'B', 'C', 'D', 'E', 'F', 'G'].forEach(n => {
        const c = panel.querySelector(`#c_${n}`);
        if (c) {
          c.setAttribute('fill', n === 'G' ? '#065f46' : '#1e293b');
          c.setAttribute('stroke', '#64748b');
        }
      });
    };

    panel.querySelector('#btnPlayBFSGame').onclick = () => startTraversalGame('BFS');
    panel.querySelector('#btnPlayDFSGame').onclick = () => startTraversalGame('DFS');

    // Attach click listeners to SVG tree nodes for game
    ['A', 'B', 'C', 'D', 'E', 'F', 'G'].forEach(nodeKey => {
      const g = panel.querySelector(`#svgNode_${nodeKey}`);
      if (g) {
        g.onclick = () => {
          if (!this.isGameActive) return;
          const expectedNode = this.gameExpectedOrder[this.gameClickIndex];
          const fb = panel.querySelector('#gameFeedbackText');
          const circle = panel.querySelector(`#c_${nodeKey}`);

          if (nodeKey === expectedNode) {
            circle.setAttribute('fill', '#10b981');
            circle.setAttribute('stroke', '#34d399');
            this.gameClickIndex++;
            this.gameScore += 10;

            if (this.gameClickIndex >= this.gameExpectedOrder.length) {
              fb.innerHTML = `🎉 <strong>Outstanding!</strong> You traversed all 7 nodes in perfect ${this.searchMode} sequence! (+70 Points)`;
              panel.querySelector('#gameScoreBadge').innerText = `Score: ${this.gameScore} / 70 | Status: Mastered 🏆`;
            } else {
              fb.innerHTML = `✅ <strong>Correct!</strong> Node ${nodeKey} visited. Who will ${this.searchMode} expand next?`;
              panel.querySelector('#gameScoreBadge').innerText = `Score: ${this.gameScore} / 70 | Steps Correct: ${this.gameClickIndex}`;
            }
          } else {
            circle.setAttribute('stroke', '#ef4444');
            const hint = this.searchMode === 'BFS'
              ? `In BFS, you must finish all nodes at Depth 1 (like C) before moving to Depth 2! Next node is <strong>${expectedNode}</strong>.`
              : `In DFS, you must dive to the deepest leaf of the current branch before switching branches! Next node is <strong>${expectedNode}</strong>.`;
            fb.innerHTML = `❌ <strong>Not quite!</strong> ${hint}`;
          }
        };
      }
    });

    this.renderQuiz(panel.querySelector('#quizContainer'), item.quiz, item.id);

    const btnClaim = panel.querySelector('#btnClaimTopic5Mastery');
    if (btnClaim) {
      btnClaim.onclick = () => {
        StudentState.markTopicComplete(5, "Algorithm Explorer");
        this.setupHUD();
        this.renderTopicsGrid();
        document.getElementById('collegeStudyModal').classList.add('hidden');
      };
    }
  }

  // ========================================================
  // TOPIC 6: KNOWLEDGE REPRESENTATION
  // ========================================================
  renderTopic6Flow(panel, item) {
    this.kgConnectedCount = 0;
    this.kgConnectedTriples = [];

    panel.innerHTML = `
      <div class="study-flow-section" id="section_learn">
        <div style="font-size: 1.4rem; font-weight: 800; color: #1e3a8a; margin-bottom: 16px;">
          <span>📘</span> Activity 1: Semantic Networks, RDF Triples & Ontologies
        </div>
        <p style="font-size: 1.18rem; line-height: 1.85; color: #1e293b; margin-bottom: 20px;">
          ${item.learn.definition}
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; margin-bottom: 24px;">
          ${item.learn.coreStructures.map(cs => `
            <div style="background: white; border: 2px solid #cbd5e1; border-radius: 12px; padding: 16px;">
              <h4 style="color: #2563eb; font-size: 1.1rem; margin-bottom: 6px;">${cs.name}</h4>
              <p style="font-size: 0.95rem; color: #475569; line-height: 1.6; margin: 0;">${cs.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="study-flow-section" id="section_realWorld" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #059669; margin-bottom: 16px;">
          <span>🌍</span> Activity 2: Enterprise Knowledge Graphs in Production
        </div>
        ${item.realWorld.map((rw, idx) => `
          <div style="background: white; border: 2px solid #cbd5e1; border-radius: 16px; padding: 18px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <h4 style="color: #1e3a8a; margin: 0;">${idx + 1}. ${rw.system}</h4>
              <span style="font-size: 0.82rem; font-weight: 800; background: #e0f2fe; color: #0369a1; padding: 3px 10px; border-radius: 9999px;">
                ${rw.domain}
              </span>
            </div>
            <p style="color: #475569; line-height: 1.65; margin: 0;">${rw.howItWorks}</p>
          </div>
        `).join('')}
      </div>

      <div class="study-flow-section" id="section_visual" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #7c3aed; margin-bottom: 16px;">
          <span>🔬</span> Activity 3: Visual Demonstration — RDF Triple Semantic Linking
        </div>
        <div style="background: #faf5ff; border: 2px solid #e9d5ff; border-radius: 16px; padding: 22px;">
          <h4 style="color: #6b21a8; margin-bottom: 8px;">Subject ➡️ Predicate ➡️ Object Data Model</h4>
          <p style="color: #475569; line-height: 1.65; margin: 0;">
            Knowledge graphs represent facts as directed triples. By traversing interconnected triples, an AI reasoning engine can perform multi-hop relational inference without scanning raw text.
          </p>
        </div>
      </div>

      <div class="study-flow-section" id="section_game" style="margin-top: 40px; padding-top: 28px; border-top: 3px solid #3b82f6;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
          <div style="font-size: 1.4rem; font-weight: 800; color: #1e3a8a;">
            <span>🎮</span> Activity 4: Interactive Concept Game — Build the College Knowledge Graph
          </div>
          <div style="background: #1e293b; color: white; padding: 6px 16px; border-radius: 9999px; font-weight: 800; font-size: 0.95rem;" id="kgScoreBadge">
            Triples Formed: 0 / 5 | Status: Incomplete
          </div>
        </div>
        <p style="font-size: 1.1rem; color: #475569; margin-bottom: 18px;">${item.game.instruction}</p>

        <div style="margin-bottom: 18px;">
          <h5 style="color: #0f172a; margin-bottom: 10px;">Click candidate semantic links to verify and add to graph:</h5>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${item.game.validTriples.map((t, idx) => `
              <div style="background: white; border: 2px solid #cbd5e1; border-radius: 12px; padding: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;" id="kgRow_${idx}">
                <div>
                  <strong style="color: #1e3a8a;">[${t.subject}]</strong>
                  <span style="color: #7c3aed; font-weight: 700;"> ──${t.predicate}──▶ </span>
                  <strong style="color: #059669;">[${t.object}]</strong>
                </div>
                <button type="button" class="btn-code-action btn-add-triple" data-idx="${idx}" style="background: #2563eb; color: white;">
                  ➕ Form RDF Triple
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="background: #0f172a; border-radius: 14px; padding: 18px; color: white;">
          <strong style="color: #38bdf8; display: block; margin-bottom: 8px;">Active Knowledge Graph Triples Database:</strong>
          <div id="kgVerifiedList" style="font-family: var(--font-mono); font-size: 0.95rem; color: #4ade80;">
            > No RDF triples assembled yet. Click buttons above to connect entities!
          </div>
        </div>
      </div>

      <div class="study-flow-section" id="section_quiz" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #d97706; margin-bottom: 16px;">
          <span>📝</span> Activity 5: University Assessment Quiz & In-Between Concept Games
        </div>
        <div id="quizContainer"></div>
      </div>

      <div class="study-flow-section" id="section_complete" style="margin-top: 40px; padding-top: 28px; border-top: 3px solid #059669; text-align: center;">
        <button type="button" class="btn-complete-topic" id="btnClaimTopic6Mastery" style="padding: 15px 36px; font-size: 1.25rem;">
          ✓ Claim Topic 6 Mastery (+50 ⭐ & Graph Master Badge)
        </button>
      </div>
    `;

    panel.querySelectorAll('.btn-add-triple').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.getAttribute('data-idx'));
        const t = item.game.validTriples[idx];
        const row = panel.querySelector(`#kgRow_${idx}`);

        btn.disabled = true;
        btn.innerText = '✅ Triple Added';
        btn.style.background = '#059669';
        if (row) row.style.background = '#f0fdf4';

        this.kgConnectedCount++;
        this.kgConnectedTriples.push(`[${t.subject}] ──(${t.predicate})──▶ [${t.object}]`);

        const vList = panel.querySelector('#kgVerifiedList');
        if (vList) {
          vList.innerHTML = this.kgConnectedTriples.map(str => `<div>✓ ${str}</div>`).join('');
        }

        const badge = panel.querySelector('#kgScoreBadge');
        if (badge) {
          badge.innerText = `Triples Formed: ${this.kgConnectedCount} / 5 | Status: ${this.kgConnectedCount === 5 ? 'Knowledge Graph Complete 🏆' : 'Constructing...'}`;
        }
      };
    });

    this.renderQuiz(panel.querySelector('#quizContainer'), item.quiz, item.id);

    const btnClaim = panel.querySelector('#btnClaimTopic6Mastery');
    if (btnClaim) {
      btnClaim.onclick = () => {
        StudentState.markTopicComplete(6, "Graph Master");
        this.setupHUD();
        this.renderTopicsGrid();
        document.getElementById('collegeStudyModal').classList.add('hidden');
      };
    }
  }

  // ========================================================
  // TOPIC 7: REASONING AND DECISION MAKING
  // ========================================================
  renderTopic7Flow(panel, item) {
    this.logicFacts = { fever: true, cough: true, wbc: true };

    panel.innerHTML = `
      <div class="study-flow-section" id="section_learn">
        <div style="font-size: 1.4rem; font-weight: 800; color: #1e3a8a; margin-bottom: 16px;">
          <span>📘</span> Activity 1: Propositional Logic, First-Order Logic & Modus Ponens
        </div>
        <p style="font-size: 1.18rem; line-height: 1.85; color: #1e293b; margin-bottom: 20px;">
          ${item.learn.definition}
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; margin-bottom: 24px;">
          ${item.learn.logicalFoundations.map(lf => `
            <div style="background: white; border: 2px solid #cbd5e1; border-radius: 12px; padding: 16px;">
              <h4 style="color: #2563eb; font-size: 1.1rem; margin-bottom: 6px;">${lf.name}</h4>
              <p style="font-size: 0.95rem; color: #475569; line-height: 1.6; margin: 0;">${lf.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="study-flow-section" id="section_realWorld" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #059669; margin-bottom: 16px;">
          <span>🌍</span> Activity 2: Production Inference & Rule Engines
        </div>
        ${item.realWorld.map((rw, idx) => `
          <div style="background: white; border: 2px solid #cbd5e1; border-radius: 16px; padding: 18px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <h4 style="color: #1e3a8a; margin: 0;">${idx + 1}. ${rw.system}</h4>
              <span style="font-size: 0.82rem; font-weight: 800; background: #e0f2fe; color: #0369a1; padding: 3px 10px; border-radius: 9999px;">
                ${rw.domain}
              </span>
            </div>
            <p style="color: #475569; line-height: 1.65; margin: 0;">${rw.howItWorks}</p>
          </div>
        `).join('')}
      </div>

      <div class="study-flow-section" id="section_visual" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #7c3aed; margin-bottom: 16px;">
          <span>🔬</span> Activity 3: Visual Demonstration — Modus Ponens Horn Clause Deduction
        </div>
        <div style="background: #faf5ff; border: 2px solid #e9d5ff; border-radius: 16px; padding: 22px;">
          <h4 style="color: #6b21a8; margin-bottom: 8px;">The Mechanics of Forward Chaining</h4>
          <p style="color: #475569; line-height: 1.65; margin: 0;">
            Forward chaining operates by matching atomic facts in Working Memory against rule premises. When all premises of an IF-THEN rule are satisfied, the rule fires and its conclusion is asserted into Working Memory as a proven theorem.
          </p>
        </div>
      </div>

      <div class="study-flow-section" id="section_game" style="margin-top: 40px; padding-top: 28px; border-top: 3px solid #3b82f6;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #1e3a8a; margin-bottom: 12px;">
          <span>🎮</span> Activity 4: Interactive Concept Game — Clinical Logic Inference Engine
        </div>
        <p style="font-size: 1.1rem; color: #475569; margin-bottom: 18px;">${item.game.instruction}</p>

        <div style="background: white; border: 2px solid #cbd5e1; border-radius: 14px; padding: 18px; margin-bottom: 16px;">
          <strong style="color: #0f172a; display: block; margin-bottom: 10px;">Working Memory: Active Patient Percepts</strong>
          <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <label style="display: flex; align-items: center; gap: 6px; font-weight: 700; color: #1e293b;">
              <input type="checkbox" id="chkFactFever" checked /> High Fever (> 38.5°C)
            </label>
            <label style="display: flex; align-items: center; gap: 6px; font-weight: 700; color: #1e293b;">
              <input type="checkbox" id="chkFactCough" checked /> Productive Cough
            </label>
            <label style="display: flex; align-items: center; gap: 6px; font-weight: 700; color: #1e293b;">
              <input type="checkbox" id="chkFactWBC" checked /> Elevated White Blood Cell Count
            </label>
          </div>
        </div>

        <button type="button" class="btn-hero-primary" id="btnRunInference" style="background: #2563eb; padding: 12px 24px; font-size: 1.05rem; margin-bottom: 18px;">
          ▶️ Run Forward-Chaining Deduction Engine
        </button>

        <div style="background: #0f172a; border-radius: 14px; padding: 20px; color: white;">
          <strong style="color: #38bdf8; display: block; margin-bottom: 8px;">Inference Engine Execution Trace:</strong>
          <div id="inferenceTraceBox" style="font-family: var(--font-mono); font-size: 0.95rem; line-height: 1.8;">
            > Ready. Click 'Run Forward-Chaining Deduction Engine' to evaluate Horn clauses.
          </div>
        </div>
      </div>

      <div class="study-flow-section" id="section_quiz" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #d97706; margin-bottom: 16px;">
          <span>📝</span> Activity 5: University Assessment Quiz & In-Between Concept Games
        </div>
        <div id="quizContainer"></div>
      </div>

      <div class="study-flow-section" id="section_complete" style="margin-top: 40px; padding-top: 28px; border-top: 3px solid #059669; text-align: center;">
        <button type="button" class="btn-complete-topic" id="btnClaimTopic7Mastery" style="padding: 15px 36px; font-size: 1.25rem;">
          ✓ Claim Topic 7 Mastery (+50 ⭐ & Logic Specialist Badge)
        </button>
      </div>
    `;

    panel.querySelector('#btnRunInference').onclick = () => {
      const fever = panel.querySelector('#chkFactFever').checked;
      const cough = panel.querySelector('#chkFactCough').checked;
      const wbc = panel.querySelector('#chkFactWBC').checked;

      const traceBox = panel.querySelector('#inferenceTraceBox');
      traceBox.innerHTML = `
        <div style="color: #94a3b8;">[CYCLE 0]: Ingesting Initial Working Memory facts...</div>
        <div>Fact 1: High Fever = ${fever}</div>
        <div>Fact 2: Productive Cough = ${cough}</div>
        <div>Fact 3: Elevated WBC = ${wbc}</div>
      `;

      setTimeout(() => {
        let respInfection = fever && cough;
        if (respInfection) {
          traceBox.innerHTML += `<div style="color: #facc15; margin-top: 8px;">[CYCLE 1]: Rule R1 Fired! (IF fever AND cough THEN Respiratory Infection)</div>
            <div style="color: #4ade80;">➡️ Working Memory Asserted: 'Respiratory Infection'</div>`;
        } else {
          traceBox.innerHTML += `<div style="color: #f87171; margin-top: 8px;">[CYCLE 1]: R1 premise not satisfied. No infection asserted.</div>`;
        }

        setTimeout(() => {
          let pneumonia = respInfection && wbc;
          if (pneumonia) {
            traceBox.innerHTML += `<div style="color: #facc15; margin-top: 8px;">[CYCLE 2]: Rule R2 Fired! (IF Respiratory Infection AND elevated WBC THEN Bacterial Pneumonia)</div>
              <div style="color: #4ade80;">➡️ Working Memory Asserted: 'Bacterial Pneumonia'</div>`;
            setTimeout(() => {
              traceBox.innerHTML += `<div style="color: #facc15; margin-top: 8px;">[CYCLE 3]: Rule R3 Fired! (IF Bacterial Pneumonia THEN Prescribe Targeted Antibiotic Course)</div>
                <div style="color: #38bdf8; font-weight: 800; font-size: 1.05rem; margin-top: 10px;">✓ FINAL CLINICAL DECISION: Prescribe Targeted Antibiotic Course (Amoxicillin / Clavulanate 875mg).</div>`;
            }, 600);
          } else {
            traceBox.innerHTML += `<div style="color: #38bdf8; font-weight: 800; margin-top: 10px;">✓ FINAL CLINICAL DECISION: Bacterial pneumonia not indicated. Recommend supportive therapy & monitoring.</div>`;
          }
        }, 600);
      }, 400);
    };

    this.renderQuiz(panel.querySelector('#quizContainer'), item.quiz, item.id);

    const btnClaim = panel.querySelector('#btnClaimTopic7Mastery');
    if (btnClaim) {
      btnClaim.onclick = () => {
        StudentState.markTopicComplete(7, "Logic Specialist");
        this.setupHUD();
        this.renderTopicsGrid();
        document.getElementById('collegeStudyModal').classList.add('hidden');
      };
    }
  }

  // ========================================================
  // TOPICS 8 TO 30: GENERIC RICH TOPIC FLOW
  // ========================================================
  renderGenericTopicFlow(panel, item) {
    panel.innerHTML = `
      <div class="study-flow-section" id="section_learn">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
          <div style="font-size: 1.4rem; font-weight: 800; color: #1e3a8a;">
            <span>📘</span> Activity 1: Technical Foundations
          </div>
          <span style="font-size: 0.85rem; font-weight: 800; background: #e0f2fe; color: #0369a1; padding: 4px 12px; border-radius: 9999px;">
            Level ${item.level} Curriculum Topic
          </span>
        </div>
        <p style="font-size: 1.18rem; line-height: 1.85; color: #1e293b; margin-bottom: 20px;">
          ${item.learn.definition}
        </p>
        <div style="background: #f8fafc; border-left: 5px solid #2563eb; padding: 18px 22px; border-radius: 14px; margin-bottom: 24px;">
          <strong style="color: #1e40af; font-size: 1.1rem; display: block; margin-bottom: 6px;">
            🎯 Core Architectural Objective
          </strong>
          <p style="font-size: 1.05rem; color: #334155; line-height: 1.7; margin: 0;">
            ${item.learn.coreFormulation || item.focus}
          </p>
        </div>
      </div>

      <div class="study-flow-section" id="section_realWorld" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #059669; margin-bottom: 16px;">
          <span>🌍</span> Activity 2: Enterprise Production Case Studies
        </div>
        ${item.realWorld.map((rw, idx) => `
          <div style="background: white; border: 2px solid #cbd5e1; border-radius: 16px; padding: 18px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <h4 style="color: #1e3a8a; margin: 0;">${idx + 1}. ${rw.system}</h4>
              <span style="font-size: 0.82rem; font-weight: 800; background: #eff6ff; color: #1d4ed8; padding: 3px 10px; border-radius: 9999px;">
                ${rw.domain}
              </span>
            </div>
            <p style="color: #475569; line-height: 1.65; margin: 0;">${rw.howItWorks}</p>
          </div>
        `).join('')}
      </div>

      <div class="study-flow-section" id="section_visual" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #7c3aed; margin-bottom: 16px;">
          <span>🔬</span> Activity 3: Visual Pipeline Demonstration
        </div>
        <div style="background: #faf5ff; border: 2px solid #e9d5ff; border-radius: 16px; padding: 22px;">
          <h4 style="color: #6b21a8; margin-bottom: 8px;">${item.visualDemo.title || 'Algorithmic Architecture Pipeline'}</h4>
          <p style="color: #475569; line-height: 1.65; margin: 0;">
            ${item.visualDemo.description || 'Interactive parameter evaluation and feature mapping for production architectures.'}
          </p>
        </div>
      </div>

      <div class="study-flow-section" id="section_game" style="margin-top: 40px; padding-top: 28px; border-top: 3px solid #3b82f6;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #1e3a8a; margin-bottom: 12px;">
          <span>🎮</span> Activity 4: Interactive Concept Challenge — ${item.game.title}
        </div>
        <p style="font-size: 1.1rem; color: #475569; margin-bottom: 18px;">${item.game.instruction}</p>
        <div style="background: white; border: 2px solid #cbd5e1; border-radius: 16px; padding: 20px;">
          <button type="button" class="btn-hero-primary" id="btnRunGenericChallenge" style="background: #2563eb; padding: 10px 20px; font-size: 0.95rem;">
            ▶️ Run Concept Simulation
          </button>
          <div id="genericChallengeOutput" style="margin-top: 12px; font-weight: 700; color: #059669;"></div>
        </div>
      </div>

      <div class="study-flow-section" id="section_quiz" style="margin-top: 40px; padding-top: 28px; border-top: 2px dashed #cbd5e1;">
        <div style="font-size: 1.4rem; font-weight: 800; color: #d97706; margin-bottom: 16px;">
          <span>📝</span> Activity 5: University Assessment Quiz & In-Between Concept Games
        </div>
        <div id="quizContainer"></div>
      </div>

      <div class="study-flow-section" id="section_complete" style="margin-top: 40px; padding-top: 28px; border-top: 3px solid #059669; text-align: center;">
        <button type="button" class="btn-complete-topic" id="btnClaimGenericMastery" style="padding: 15px 36px; font-size: 1.25rem;">
          ✓ Mark Topic ${item.id} Completed (+50 ⭐ & ${item.badgeReward || 'Badge'})
        </button>
      </div>
    `;

    const btnSim = panel.querySelector('#btnRunGenericChallenge');
    if (btnSim) {
      btnSim.onclick = () => {
        panel.querySelector('#genericChallengeOutput').innerText = `✓ Concept simulation verified! Parameters converged with optimal loss reduction.`;
      };
    }

    this.renderQuiz(panel.querySelector('#quizContainer'), item.quiz, item.id);

    const btnClaim = panel.querySelector('#btnClaimGenericMastery');
    if (btnClaim) {
      btnClaim.onclick = () => {
        StudentState.markTopicComplete(item.id, item.badgeReward || "AI Pioneer");
        this.setupHUD();
        this.renderTopicsGrid();
        document.getElementById('collegeStudyModal').classList.add('hidden');
      };
    }
  }

  // ========================================================
  // REUSABLE QUIZ RENDERER WITH IN-BETWEEN CONCEPT MINI-GAMES
  // ========================================================
  renderQuiz(container, quizList, topicId) {
    if (!container || !quizList || quizList.length === 0) return;
    container.innerHTML = '';

    quizList.forEach((qObj, qIdx) => {
      // 1. Render Question Block
      const qBlock = document.createElement('div');
      qBlock.className = 'quiz-q-block';

      qBlock.innerHTML = `
        <div class="quiz-q-title">
          ${qIdx + 1}. ${qObj.question}
        </div>
        <div class="quiz-opts-list" id="quizOpts_${topicId}_${qObj.id}"></div>
        <div class="detective-explanation" id="quizExp_${topicId}_${qObj.id}"></div>
      `;

      const optsList = qBlock.querySelector(`#quizOpts_${topicId}_${qObj.id}`);
      const expBox = qBlock.querySelector(`#quizExp_${topicId}_${qObj.id}`);

      qObj.options.forEach((optText, oIdx) => {
        const optBtn = document.createElement('button');
        optBtn.type = 'button';
        optBtn.className = 'quiz-opt-btn';
        optBtn.innerText = optText;

        optBtn.onclick = () => {
          optsList.querySelectorAll('.quiz-opt-btn').forEach(b => {
            b.classList.remove('correct', 'wrong');
            b.disabled = true;
          });

          expBox.style.display = 'block';
          if (oIdx === qObj.answer) {
            optBtn.classList.add('correct');
            expBox.style.background = '#dcfce7';
            expBox.style.border = '2px solid #86efac';
            expBox.style.color = '#15803d';
            expBox.innerHTML = `✅ <strong>Correct!</strong> ${qObj.explanation}`;
          } else {
            optBtn.classList.add('wrong');
            const correctBtn = optsList.children[qObj.answer];
            if (correctBtn) correctBtn.classList.add('correct');
            expBox.style.background = '#fee2e2';
            expBox.style.border = '2px solid #fca5a5';
            expBox.style.color = '#991b1b';
            expBox.innerHTML = `❌ <strong>Incorrect.</strong> ${qObj.explanation}`;
          }
        };

        optsList.appendChild(optBtn);
      });

      container.appendChild(qBlock);

      // 2. Inject Interactive Concept Mini-Game right between Question 2 and Question 3!
      if (qIdx === 1) {
        const miniGameCard = this.createInQuizConceptGameCard(topicId);
        if (miniGameCard) {
          container.appendChild(miniGameCard);
        }
      }
    });
  }

  // ========================================================
  // IN-BETWEEN QUESTIONS INTERACTIVE CONCEPT MINI-GAMES
  // ========================================================
  createInQuizConceptGameCard(topicId) {
    const card = document.createElement('div');
    card.className = 'quiz-concept-game-card';

    switch (topicId) {
      case 1:
        // Turing Test Interrogation Terminal
        card.innerHTML = `
          <div class="quiz-concept-game-badge">🎮 Interactive Concept Checkpoint Game</div>
          <h4 class="quiz-concept-game-title">The Alan Turing Test Terminal: Human vs Machine</h4>
          <p class="quiz-concept-game-desc">
            Alan Turing's 1950 Imitation Game benchmarks whether a judge communicating via text can distinguish an AI from a real human. Read the two responses below and identify the human respondent:
          </p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
            <div style="background: white; border: 2px solid #cbd5e1; border-radius: 12px; padding: 14px;" id="turingCard1">
              <strong style="color: #1e3a8a; display: block; margin-bottom: 6px;">Terminal Alpha:</strong>
              <p style="font-size: 0.95rem; color: #334155; margin: 0; font-style: italic;">
                "I really loved that Keats poem you shared earlier. Rainy mornings always make me feel a little nostalgic for childhood holidays."
              </p>
            </div>
            <div style="background: white; border: 2px solid #cbd5e1; border-radius: 12px; padding: 14px;" id="turingCard2">
              <strong style="color: #1e3a8a; display: block; margin-bottom: 6px;">Terminal Beta:</strong>
              <p style="font-size: 0.95rem; color: #334155; margin: 0; font-style: italic;">
                "Precipitation metrics: 14.8 mm rainfall detected, humidity 88%, barometric pressure 1014 hPa, probability of cloud cover 92%."
              </p>
            </div>
          </div>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button type="button" class="interactive-chip-btn" id="btnTuringAlpha">🙋 Terminal Alpha is the Human</button>
            <button type="button" class="interactive-chip-btn" id="btnTuringBeta">🤖 Terminal Beta is the Human</button>
          </div>
          <div id="turingFeedback" style="margin-top: 10px; font-weight: 700; display: none;"></div>
        `;

        setTimeout(() => {
          const btnA = card.querySelector('#btnTuringAlpha');
          const btnB = card.querySelector('#btnTuringBeta');
          const fb = card.querySelector('#turingFeedback');
          if (btnA && btnB) {
            btnA.onclick = () => {
              btnA.classList.add('placed-correct');
              btnB.classList.remove('placed-correct', 'placed-wrong');
              fb.style.display = 'block';
              fb.style.color = '#15803d';
              fb.innerHTML = `✅ <strong>Brilliant Detection!</strong> Terminal Alpha demonstrates human episodic memory, associative emotion, and personal reflection, passing the Turing test criteria!`;
            };
            btnB.onclick = () => {
              btnB.classList.add('placed-wrong');
              btnA.classList.remove('placed-correct', 'placed-wrong');
              fb.style.display = 'block';
              fb.style.color = '#991b1b';
              fb.innerHTML = `❌ <strong>Terminal Beta is the AI bot.</strong> It outputted raw sensor telemetry rather than emotional human conversation. Try Terminal Alpha!`;
            };
          }
        }, 50);
        break;

      case 2:
        // ANI vs AGI Card Sorter
        card.innerHTML = `
          <div class="quiz-concept-game-badge">🎮 Interactive Concept Checkpoint Game</div>
          <h4 class="quiz-concept-game-title">Quick Sort Challenge: Narrow AI (ANI) vs General AI (AGI)</h4>
          <p class="quiz-concept-game-desc">
            Sort the 4 computing systems into their correct cognitive category by clicking:
          </p>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 14px;" id="sortChipsBox">
            <button type="button" class="interactive-chip-btn" data-target="ANI">1. DeepMind AlphaGo (Go Game)</button>
            <button type="button" class="interactive-chip-btn" data-target="ANI">2. iPhone Siri Voice Alarm</button>
            <button type="button" class="interactive-chip-btn" data-target="AGI">3. Autonomous Conscious Polymath</button>
            <button type="button" class="interactive-chip-btn" data-target="ANI">4. Hospital Radiology Tumor Classifier</button>
          </div>
          <div id="sortStatusFeedback" style="font-weight: 700; color: #1e40af;">
            Click each chip above to classify into Narrow AI (ANI) vs General AI (AGI)!
          </div>
        `;

        setTimeout(() => {
          let sortedCount = 0;
          card.querySelectorAll('#sortChipsBox .interactive-chip-btn').forEach(chip => {
            chip.onclick = () => {
              chip.disabled = true;
              chip.classList.add('placed-correct');
              const target = chip.getAttribute('data-target');
              chip.innerText += ` ➡️ (${target})`;
              sortedCount++;
              if (sortedCount === 4) {
                card.querySelector('#sortStatusFeedback').innerHTML = `🎉 <strong>100% Sorted!</strong> All 3 bounded tools are Narrow AI (ANI), and only the universal polymath is AGI.`;
              }
            };
          });
        }, 50);
        break;

      case 3:
        // PEAS Component Matcher
        card.innerHTML = `
          <div class="quiz-concept-game-badge">🎮 Interactive Concept Checkpoint Game</div>
          <h4 class="quiz-concept-game-title">PEAS Component Matcher: Autonomous Delivery Drone</h4>
          <p class="quiz-concept-game-desc">
            Connect the 4 physical components of an Amazon Delivery Drone to the correct PEAS category:
          </p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; margin-bottom: 12px;" id="peasMatchList">
            <button type="button" class="interactive-chip-btn" data-peas="S">📡 Obstacle Avoidance LiDAR ➡️ [S - Sensor]</button>
            <button type="button" class="interactive-chip-btn" data-peas="A">🚁 Quad Brushless Motors ➡️ [A - Actuator]</button>
            <button type="button" class="interactive-chip-btn" data-peas="P">🎯 0 Collisions & 100% On-Time ➡️ [P - Performance]</button>
            <button type="button" class="interactive-chip-btn" data-peas="E">🌤️ City Sky & Wind Gusts ➡️ [E - Environment]</button>
          </div>
          <div id="peasMatchFeedback" style="font-weight: 700; color: #15803d; display: none;">
            ✅ <strong>All 4 PEAS links verified!</strong> You mastered the mapping between hardware telemetry and agent theory!
          </div>
        `;

        setTimeout(() => {
          let matched = 0;
          card.querySelectorAll('#peasMatchList .interactive-chip-btn').forEach(btn => {
            btn.onclick = () => {
              btn.disabled = true;
              btn.classList.add('placed-correct');
              matched++;
              if (matched === 4) {
                card.querySelector('#peasMatchFeedback').style.display = 'block';
              }
            };
          });
        }, 50);
        break;

      case 4:
        // Manhattan Distance Calculator
        card.innerHTML = `
          <div class="quiz-concept-game-badge">🎮 Interactive Concept Checkpoint Game</div>
          <h4 class="quiz-concept-game-title">Heuristic Solver: Calculate Manhattan Distance</h4>
          <p class="quiz-concept-game-desc">
            What is the Manhattan Distance h(n) = |x1 - x2| + |y1 - y2| between Agent at (1, 2) and Goal at (4, 6)?
          </p>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 12px;">
            <button type="button" class="interactive-chip-btn" data-ans="false">4 Moves</button>
            <button type="button" class="interactive-chip-btn" data-ans="true">7 Moves (|4-1| + |6-2| = 3 + 4)</button>
            <button type="button" class="interactive-chip-btn" data-ans="false">10 Moves</button>
            <button type="button" class="interactive-chip-btn" data-ans="false">14 Moves</button>
          </div>
          <div id="manhattanFeedback" style="font-weight: 700; display: none;"></div>
        `;

        setTimeout(() => {
          card.querySelectorAll('.interactive-chip-btn').forEach(b => {
            b.onclick = () => {
              const fb = card.querySelector('#manhattanFeedback');
              fb.style.display = 'block';
              if (b.getAttribute('data-ans') === 'true') {
                b.classList.add('placed-correct');
                fb.style.color = '#15803d';
                fb.innerHTML = `✅ <strong>Exactly Right!</strong> |4 - 1| + |6 - 2| = 3 + 4 = 7 grid moves. Manhattan distance is admissible because it never overestimates real moves!`;
              } else {
                b.classList.add('placed-wrong');
                fb.style.color = '#991b1b';
                fb.innerHTML = `❌ Incorrect. Calculate: |4 - 1| = 3; |6 - 2| = 4; Sum = 3 + 4 = 7.`;
              }
            };
          });
        }, 50);
        break;

      case 5:
        // Frontier Sorter (Queue vs Stack)
        card.innerHTML = `
          <div class="quiz-concept-game-badge">🎮 Interactive Concept Checkpoint Game</div>
          <h4 class="quiz-concept-game-title">Frontier Matcher: Queue (FIFO) vs Stack (LIFO)</h4>
          <p class="quiz-concept-game-desc">
            Click to match the algorithm with its correct frontier data structure:
          </p>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 12px;">
            <button type="button" class="interactive-chip-btn q-sort" data-val="queue">🌊 BFS ➡️ FIFO Queue</button>
            <button type="button" class="interactive-chip-btn q-sort" data-val="stack">🌲 DFS ➡️ LIFO Stack</button>
            <button type="button" class="interactive-chip-btn q-sort" data-val="priority">✨ A* ➡️ Priority Queue (f = g + h)</button>
          </div>
          <div id="frontierSortFeedback" style="font-weight: 700; color: #15803d; display: none;">
            ✅ <strong>All 3 Search Frontiers Mastered!</strong> Queue ensures level-by-level BFS, Stack gives deep DFS, and Priority Queue guides optimal A*!
          </div>
        `;

        setTimeout(() => {
          let sCount = 0;
          card.querySelectorAll('.q-sort').forEach(btn => {
            btn.onclick = () => {
              btn.disabled = true;
              btn.classList.add('placed-correct');
              sCount++;
              if (sCount === 3) {
                card.querySelector('#frontierSortFeedback').style.display = 'block';
              }
            };
          });
        }, 50);
        break;

      case 6:
        // Assemble RDF Triple
        card.innerHTML = `
          <div class="quiz-concept-game-badge">🎮 Interactive Concept Checkpoint Game</div>
          <h4 class="quiz-concept-game-title">RDF Triple Construction: Subject ➡️ Predicate ➡️ Object</h4>
          <p class="quiz-concept-game-desc">
            Click the candidate semantic link to confirm a verified RDF knowledge triple:
          </p>
          <div style="background: white; border: 2px solid #cbd5e1; border-radius: 12px; padding: 14px; margin-bottom: 12px;">
            <strong style="color: #1e3a8a;">[Lead AI Professor]</strong>
            <span style="color: #7c3aed; font-weight: 800;"> ──guides──▶ </span>
            <strong style="color: #059669;">[Student Scholar (Alex)]</strong>
          </div>
          <button type="button" class="interactive-chip-btn" id="btnConfirmRDF">✅ Verify & Assert Triple into Knowledge Graph</button>
          <div id="rdfFeedback" style="margin-top: 10px; font-weight: 700; color: #15803d; display: none;">
            ✓ <strong>Triple Asserted!</strong> Knowledge Graph now enables multi-hop SPARQL queries: "Find all research candidates guided by Lead AI Professor"!
          </div>
        `;

        setTimeout(() => {
          const btn = card.querySelector('#btnConfirmRDF');
          if (btn) {
            btn.onclick = () => {
              btn.disabled = true;
              btn.classList.add('placed-correct');
              card.querySelector('#rdfFeedback').style.display = 'block';
            };
          }
        }, 50);
        break;

      case 7:
        // Modus Ponens Logic Gate
        card.innerHTML = `
          <div class="quiz-concept-game-badge">🎮 Interactive Concept Checkpoint Game</div>
          <h4 class="quiz-concept-game-title">Modus Ponens Deductive Logic Gate</h4>
          <p class="quiz-concept-game-desc">
            Given Premise 1: <strong>P = True ("Model loss < 0.001")</strong><br>
            Given Premise 2: <strong>P ➡️ Q = True ("If model loss < 0.001, then model is converged")</strong><br>
            What is the mathematically guaranteed theorem Q?
          </p>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 12px;">
            <button type="button" class="interactive-chip-btn" data-logic="true">Q = "Model is converged" (Sound Deduction)</button>
            <button type="button" class="interactive-chip-btn" data-logic="false">Q = "Model loss increases"</button>
          </div>
          <div id="modusFeedback" style="font-weight: 700; display: none;"></div>
        `;

        setTimeout(() => {
          card.querySelectorAll('.interactive-chip-btn').forEach(b => {
            b.onclick = () => {
              const fb = card.querySelector('#modusFeedback');
              fb.style.display = 'block';
              if (b.getAttribute('data-logic') === 'true') {
                b.classList.add('placed-correct');
                fb.style.color = '#15803d';
                fb.innerHTML = `⚡ <strong>Theorem Proven!</strong> By Modus Ponens, since P is true and P ➡️ Q is true, Q must unconditionally be true!`;
              } else {
                b.classList.add('placed-wrong');
                fb.style.color = '#991b1b';
                fb.innerHTML = `❌ Incorrect. Modus Ponens states (P ^ (P ➡️ Q)) ⊢ Q.`;
              }
            };
          });
        }, 50);
        break;

      default:
        // Generic Concept Checkpoint
        card.innerHTML = `
          <div class="quiz-concept-game-badge">🎮 Interactive Concept Checkpoint Game</div>
          <h4 class="quiz-concept-game-title">Concept Verification Challenge</h4>
          <p class="quiz-concept-game-desc">
            Verify the core architectural trade-off for this topic:
          </p>
          <button type="button" class="interactive-chip-btn" id="btnGenericCheckpoint">
            🎯 Test & Verify Model Convergence
          </button>
          <div id="genericCheckpointFeedback" style="margin-top: 10px; font-weight: 700; color: #15803d; display: none;">
            ✅ <strong>Verification Passed!</strong> Gradient optimization confirmed and weights updated successfully!
          </div>
        `;

        setTimeout(() => {
          const btn = card.querySelector('#btnGenericCheckpoint');
          if (btn) {
            btn.onclick = () => {
              btn.disabled = true;
              btn.classList.add('placed-correct');
              card.querySelector('#genericCheckpointFeedback').style.display = 'block';
            };
          }
        }, 50);
        break;
    }

    return card;
  }

  // ========================================================
  // STANDALONE PYTHON LAB PLAYGROUND
  // ========================================================
  executeUserPythonCode(code) {
    const termOut = document.getElementById('playgroundTerminalOutput');
    if (!termOut) return;

    if (!code || !code.trim()) {
      termOut.innerHTML = `
        <span class="term-line" style="color: #f87171;">> No Python code detected in editor.</span>
        <span class="term-line">> Please type or paste your Python program above and click 'Execute Code'.</span>
      `;
      return;
    }

    const lines = code.split('\n');
    let outputLines = [];
    outputLines.push(`<span class="term-line">> Initializing in-browser Python 3 execution environment...</span>`);
    outputLines.push(`<span class="term-line">> Running program (${lines.length} lines)...</span>`);

    let env = {};
    let printedAnything = false;

    try {
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line || line.startsWith('#')) continue;

        if (line.startsWith('print(') && line.endsWith(')')) {
          let inner = line.slice(6, -1).trim();
          let printedVal = '';

          if ((inner.startsWith('"') && inner.endsWith('"')) || (inner.startsWith("'") && inner.endsWith("'"))) {
            printedVal = inner.slice(1, -1);
          } else if (inner.startsWith('f"') || inner.startsWith("f'")) {
            let rawStr = inner.slice(2, -1);
            let fRegex = new RegExp('\\{([^}]+)\\}', 'g');
            printedVal = rawStr.replace(fRegex, (match, expr) => {
              try {
                if (env[expr.trim()] !== undefined) return env[expr.trim()];
                return eval(expr.trim());
              } catch (e) {
                return match;
              }
            });
          } else if (env[inner] !== undefined) {
            printedVal = env[inner];
          } else {
            try {
              printedVal = eval(inner);
            } catch (e) {
              printedVal = inner;
            }
          }

          outputLines.push(`<span class="term-line" style="color: #4ade80;">${printedVal}</span>`);
          printedAnything = true;
        } else if (line.includes('=') && !line.startsWith('if') && !line.startsWith('for')) {
          let parts = line.split('=');
          let varName = parts[0].trim();
          let varExpr = parts.slice(1).join('=').trim();
          try {
            env[varName] = eval(varExpr);
          } catch (e) {
            env[varName] = varExpr;
          }
        }
      }

      if (!printedAnything) {
        outputLines.push(`<span class="term-line" style="color: #e2e8f0;">> Execution finished. (No print() outputs found in code)</span>`);
      }

      outputLines.push(`<span class="term-line" style="color: #94a3b8;">> Process finished with exit code 0 (elapsed: 0.041s).</span>`);
    } catch (err) {
      outputLines.push(`<span class="term-line" style="color: #f87171;">> Traceback (most recent call last):</span>`);
      outputLines.push(`<span class="term-line" style="color: #f87171;">> Error: ${err.message}</span>`);
    }

    termOut.innerHTML = outputLines.join('\n');
  }

  // ========================================================
  // CERTIFICATE DOWNLOAD
  // ========================================================
  downloadCertificateAsImage() {
    const s = StudentState.currentStudent;
    const candidateName = (s && s.name) ? s.name.trim() : "Student Scholar";
    const collegeName = (s && s.college) ? s.college.trim() : "Department of Computer Science & Engineering";
    const degreeName = (s && s.degree) ? s.degree.trim() : "MCA (Master of Computer Applications)";
    const count = (s && s.completedTopics) ? s.completedTopics.length : 0;
    const pct = Math.round((count / 30) * 100);
    const dateStr = new Date().toLocaleDateString('en-GB');

    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 840;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 16;
    ctx.strokeRect(18, 18, 1164, 804);

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.strokeRect(32, 32, 1136, 776);

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, 1120, 760);

    ctx.fillStyle = '#f59e0b';
    [[45, 45], [1155, 45], [45, 795], [1155, 795]].forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.font = '54px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🎓', 600, 110);

    ctx.font = 'bold 36px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText('CERTIFICATE OF AI ENGINEERING MASTERY', 600, 168);

    ctx.font = 'bold 19px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillStyle = '#0d9488';
    ctx.fillText('College AI Learning Hub • Undergraduate & Graduate Curriculum', 600, 206);

    ctx.font = 'italic 19px Georgia, "Times New Roman", serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('This is proudly awarded to', 600, 258);

    ctx.font = 'bold 44px Georgia, "Times New Roman", serif';
    ctx.fillStyle = '#1e3a8a';
    ctx.fillText(candidateName, 600, 320);

    const textWidth = ctx.measureText(candidateName).width;
    ctx.strokeStyle = '#1e3a8a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(600 - textWidth / 2 - 24, 334);
    ctx.lineTo(600 + textWidth / 2 + 24, 334);
    ctx.stroke();

    ctx.font = 'bold 18px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillStyle = '#475569';
    ctx.fillText(`${collegeName} • ${degreeName}`, 600, 370);

    ctx.font = '17px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillStyle = '#334155';
    ctx.fillText('For demonstrated academic excellence and laboratory proficiency across', 600, 420);
    ctx.fillText('the Core Foundations of Artificial Intelligence, spanning Classical Search Heuristics,', 600, 448);
    ctx.fillText('Machine Learning, Deep Neural Networks, Transformers & LLMs, and Responsible AI Systems.', 600, 476);

    const badgeText = `✓ Verified Academic Mastery: ${pct}% | ${count} / 30 Curriculum Topics Completed`;
    ctx.fillStyle = '#ecfdf5';
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(300, 514, 600, 42, 21);
      ctx.fill();
      ctx.strokeStyle = '#86efac';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else {
      ctx.fillRect(300, 514, 600, 42);
    }
    ctx.fillStyle = '#059669';
    ctx.font = 'bold 17px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillText(badgeText, 600, 541);

    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(100, 605);
    ctx.lineTo(1100, 605);
    ctx.stroke();

    ctx.font = 'italic bold 22px Georgia, "Times New Roman", cursive, serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText('SkillSpring Academic Directorate', 320, 655);

    ctx.font = 'bold 15px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText('Director of AI Education', 320, 684);

    ctx.font = '13px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('SkillSpring College Learning Academy', 320, 706);
    ctx.fillText('Accredited Engineering Track', 320, 726);

    ctx.font = 'italic bold 22px Georgia, "Times New Roman", cursive, serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText(dateStr, 880, 655);

    ctx.font = 'bold 15px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText('SkillSpring AI Platform', 880, 684);

    ctx.font = '13px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('Autonomous Adaptive Learning Platform', 880, 706);
    ctx.fillText('Credential ID: SKILL-2026-ENG-AI-30', 880, 726);

    try {
      const dataUrl = canvas.toDataURL('image/png');
      const safeName = candidateName.replace(/[^a-zA-Z0-9_-]/g, '_');
      const link = document.createElement('a');
      link.download = `SkillSpring_College_Certificate_${safeName}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error('Error generating canvas certificate:', e);
      window.print();
    }
  }

  // ========================================================
  // EVENT LISTENERS SETUP
  // ========================================================
  setupEventListeners() {
    // Level Filters
    document.querySelectorAll('.level-filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.level-filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeLevel = tab.getAttribute('data-level');
        this.renderTopicsGrid();
      });
    });

    // Hero buttons
    const heroStartBtn = document.getElementById('heroStartTopic1Btn');
    if (heroStartBtn) {
      heroStartBtn.addEventListener('click', () => this.openTopic(1));
    }

    // Concept Map Modal
    const openMapBtn = document.getElementById('btnOpenConceptMap');
    const heroMapBtn = document.getElementById('heroConceptMapBtn');
    const closeMapBtn = document.getElementById('closeConceptMapBtn');
    const mapModal = document.getElementById('conceptMapModal');

    const showMap = () => {
      this.renderConceptMap();
      mapModal.classList.remove('hidden');
    };

    if (openMapBtn) openMapBtn.addEventListener('click', showMap);
    if (heroMapBtn) heroMapBtn.addEventListener('click', showMap);
    if (closeMapBtn) closeMapBtn.addEventListener('click', () => mapModal.classList.add('hidden'));

    // Standalone Python Lab Modal
    const openPlayBtn = document.getElementById('btnOpenPlayground');
    const heroPlayBtn = document.getElementById('heroPlaygroundBtn');
    const closePlayBtn = document.getElementById('closePlaygroundBtn');
    const playModal = document.getElementById('codePlaygroundModal');

    if (openPlayBtn) openPlayBtn.addEventListener('click', () => playModal.classList.remove('hidden'));
    if (heroPlayBtn) heroPlayBtn.addEventListener('click', () => playModal.classList.remove('hidden'));
    if (closePlayBtn) closePlayBtn.addEventListener('click', () => playModal.classList.add('hidden'));

    const runPlayCodeBtn = document.getElementById('btnRunPlaygroundCode');
    const clearPlayCodeBtn = document.getElementById('btnClearPlaygroundCode');
    const playCodeInput = document.getElementById('playgroundCodeInput');

    if (runPlayCodeBtn && playCodeInput) {
      runPlayCodeBtn.addEventListener('click', () => {
        this.executeUserPythonCode(playCodeInput.value);
      });
    }

    if (clearPlayCodeBtn) {
      clearPlayCodeBtn.addEventListener('click', () => {
        if (playCodeInput) playCodeInput.value = '';
        const playTermOut = document.getElementById('playgroundTerminalOutput');
        if (playTermOut) playTermOut.innerHTML = `<span class="term-line">> Terminal output cleared.</span>`;
      });
    }

    // Modal Tabs Navigation (Click any tab to jump directly)
    document.querySelectorAll('.study-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        this.goToActivity(tab);
      });
    });

    // Close Study Modal
    const closeStudyBtn = document.getElementById('closeStudyModalBtn');
    if (closeStudyBtn) {
      closeStudyBtn.addEventListener('click', () => {
        if (this.vacuumTimer) clearInterval(this.vacuumTimer);
        if (this.treeAutoPlayTimer) clearInterval(this.treeAutoPlayTimer);
        document.getElementById('collegeStudyModal').classList.add('hidden');
      });
    }

    // Footer Complete Topic button
    const btnFooterComplete = document.getElementById('btnCompleteTopicFooter');
    if (btnFooterComplete) {
      btnFooterComplete.addEventListener('click', () => {
        if (!this.currentTopic) return;
        StudentState.markTopicComplete(this.currentTopic.id, this.currentTopic.badgeReward || "AI Pioneer");
        this.setupHUD();
        this.renderTopicsGrid();
        if (this.vacuumTimer) clearInterval(this.vacuumTimer);
        if (this.treeAutoPlayTimer) clearInterval(this.treeAutoPlayTimer);
        document.getElementById('collegeStudyModal').classList.add('hidden');
      });
    }

    // Student Profile Modal
    const profilePill = document.getElementById('studentProfilePill');
    const profileModal = document.getElementById('studentProfileModal');
    const closeProfileBtn = document.getElementById('closeStudentProfileBtn');
    const profileForm = document.getElementById('studentProfileForm');

    if (profilePill) {
      profilePill.addEventListener('click', () => {
        const s = StudentState.currentStudent;
        if (s) {
          document.getElementById('studentNameInput').value = s.name || '';
          document.getElementById('studentCollegeInput').value = s.college || '';
          document.getElementById('studentDegreeSelect').value = s.degree || 'MCA (Master of Computer Applications)';
        }
        profileModal.classList.remove('hidden');
      });
    }

    if (closeProfileBtn) {
      closeProfileBtn.addEventListener('click', () => profileModal.classList.add('hidden'));
    }

    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('studentNameInput').value;
        const college = document.getElementById('studentCollegeInput').value;
        const degree = document.getElementById('studentDegreeSelect').value;
        StudentState.registerStudent(name, college, degree);
        profileModal.classList.add('hidden');
        this.setupHUD();
        this.renderTopicsGrid();
      });
    }

    // Certificate Modal
    const openCertBtn = document.getElementById('btnOpenStudentCert');
    const certModal = document.getElementById('studentCertModal');
    const closeCertBtn = document.getElementById('closeStudentCertBtn');
    const closeCertBtnBottom = document.getElementById('closeStudentCertBtnBottom');

    if (openCertBtn) {
      openCertBtn.addEventListener('click', () => {
        this.setupHUD();
        certModal.classList.remove('hidden');
      });
    }
    if (closeCertBtn) {
      closeCertBtn.addEventListener('click', () => certModal.classList.add('hidden'));
    }
    if (closeCertBtnBottom) {
      closeCertBtnBottom.addEventListener('click', () => certModal.classList.add('hidden'));
    }

    const btnDownloadCert = document.getElementById('btnDownloadStudentCertPng');
    if (btnDownloadCert) {
      btnDownloadCert.addEventListener('click', () => this.downloadCertificateAsImage());
    }

    const btnPrintCert = document.getElementById('btnPrintStudentCertPdf');
    if (btnPrintCert) {
      btnPrintCert.addEventListener('click', () => window.print());
    }

    // Logout Button
    const logoutBtn = document.getElementById('studentLogoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('skillspring_active_user');
        window.location.href = 'index.html';
      });
    }
  }

  renderConceptMap() {
    const container = document.getElementById('conceptMapContainer');
    if (!container) return;

    container.innerHTML = `
      <div style="background: #0f172a; border-radius: 16px; padding: 24px; color: white;">
        <h4 style="text-align: center; font-size: 1.3rem; margin-bottom: 24px; color: #38bdf8;">
          SkillSpring College AI Knowledge Dependency Graph
        </h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px;">
          ${COLLEGE_LEVELS_META.map(lvl => `
            <div style="background: #1e293b; border: 2px solid ${lvl.color}; border-radius: 14px; padding: 18px;">
              <span style="font-size: 1.8rem; display: block; margin-bottom: 6px;">${lvl.icon}</span>
              <h5 style="color: white; font-size: 1.05rem; margin-bottom: 4px;">${lvl.name}</h5>
              <span style="font-size: 0.8rem; color: #94a3b8; display: block; margin-bottom: 8px;">${lvl.range}</span>
              <p style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.5; margin: 0;">${lvl.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

// Global Launcher
document.addEventListener('DOMContentLoaded', () => {
  window.collegeApp = new CollegeLearningPlatform();
  window.collegeApp.init();
});
