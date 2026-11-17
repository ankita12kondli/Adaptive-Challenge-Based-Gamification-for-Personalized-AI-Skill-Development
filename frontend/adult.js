// ========================================================
// SkillSpring AI - Adult Learning Zone (Ages 35+ Years)
// Interactive Logic & Simulator Engines for all 20 Lessons
// SkillSpring AI Platform
// ========================================================

const AdultState = {
  currentLearner: null,

  load() {
    const saved = localStorage.getItem('skillspring_adult_learner');
    const active = localStorage.getItem('skillspring_active_user');

    let activeUser = null;
    if (active) {
      try {
        activeUser = JSON.parse(active);
      } catch (e) {}
    }

    if (saved) {
      try {
        this.currentLearner = JSON.parse(saved);
      } catch (e) {
        this.currentLearner = null;
      }
    }

    // Auto-heal old cached test name
    if (this.currentLearner && (this.currentLearner.name === 'Ankita' || !this.currentLearner.name)) {
      if (activeUser && activeUser.name && activeUser.name !== 'Ankita') {
        this.currentLearner.name = activeUser.name;
      } else {
        this.currentLearner.name = "Learner";
      }
      this.save();
    }

    // Explicit user request: Reset Shobha's progress to 0 to start fresh from Level 1
    const shobhaZeroNow = localStorage.getItem('skillspring_shobha_zero_requested_now_v1');
    if (!shobhaZeroNow) {
      if (this.currentLearner) {
        this.currentLearner.stars = 0;
        this.currentLearner.completedLessons = [];
        this.save();
      }
      localStorage.setItem('skillspring_shobha_zero_requested_now_v1', 'true');
    }

    // Auto-heal name if it was stored as "Sh bh" or malformed
    if (this.currentLearner && this.currentLearner.name) {
      const lowerName = this.currentLearner.name.trim().toLowerCase();
      if (lowerName === 'sh bh' || lowerName === 'sh  bh' || lowerName === 'shbha' || lowerName === 'shoba' || lowerName.includes('shobha')) {
        this.currentLearner.name = "Shobha";
        this.save();
      }
    }
    if (activeUser && activeUser.name) {
      const lowerAct = activeUser.name.trim().toLowerCase();
      if (lowerAct === 'sh bh' || lowerAct === 'sh  bh' || lowerAct === 'shbha' || lowerAct === 'shoba' || lowerAct.includes('shobha')) {
        activeUser.name = "Shobha";
        try {
          localStorage.setItem('skillspring_active_user', JSON.stringify(activeUser));
        } catch (e) {}
      }
    }

    if (this.currentLearner && this.currentLearner.name && this.currentLearner.name.toLowerCase().includes('shobha')) {
      const shobhaSpecificZero = localStorage.getItem('skillspring_shobha_explicit_zero_v4');
      if (!shobhaSpecificZero) {
        this.currentLearner.stars = 0;
        this.currentLearner.completedLessons = [];
        this.save();
        localStorage.setItem('skillspring_shobha_explicit_zero_v4', 'true');
      }
    }

    // Sync with active user if logged in from landing page
    if (activeUser && activeUser.name) {
      if (!this.currentLearner) {
        this.currentLearner = {
          name: activeUser.name,
          email: activeUser.email || '',
          ageGroup: activeUser.ageGroup || "35–45 Years",
          stars: 0,
          completedLessons: [],
          lastActiveDate: new Date().toLocaleDateString('en-GB')
        };
      } else if (activeUser.name !== this.currentLearner.name) {
        // If a different user logged in (e.g., Shobha registered or logged in)
        this.currentLearner.name = activeUser.name;
        if (activeUser.email) this.currentLearner.email = activeUser.email;
        if (activeUser.email !== this.currentLearner.email) {
          // Reset progress for different account
          this.currentLearner.stars = 0;
          this.currentLearner.completedLessons = [];
        }
      }
      this.save();
    }

    if (!this.currentLearner) {
      this.currentLearner = {
        name: (activeUser && activeUser.name) ? activeUser.name : "Learner",
        ageGroup: "35–45 Years",
        stars: 0,
        completedLessons: [],
        lastActiveDate: new Date().toLocaleDateString('en-GB')
      };
      this.save();
    }

    // Ensure array integrity
    if (!Array.isArray(this.currentLearner.completedLessons)) {
      this.currentLearner.completedLessons = [];
    }
  },

  save() {
    if (!this.currentLearner) return;
    localStorage.setItem('skillspring_adult_learner', JSON.stringify(this.currentLearner));
  },

  registerLearner(name, ageGroup) {
    const existingStars = this.currentLearner ? this.currentLearner.stars : 0;
    const existingLessons = this.currentLearner ? this.currentLearner.completedLessons : [];
    const existingEmail = this.currentLearner ? this.currentLearner.email : '';

    this.currentLearner = {
      name: name.trim() || "Learner",
      email: existingEmail,
      ageGroup: ageGroup || "35–45 Years",
      stars: existingStars,
      completedLessons: existingLessons,
      lastActiveDate: new Date().toLocaleDateString('en-GB')
    };
    this.save();

    // Keep skillspring_active_user in sync
    try {
      const activeRaw = localStorage.getItem('skillspring_active_user');
      let active = activeRaw ? JSON.parse(activeRaw) : {};
      active.name = this.currentLearner.name;
      localStorage.setItem('skillspring_active_user', JSON.stringify(active));
    } catch (e) {}
  },

  markLessonComplete(lessonId) {
    if (!this.currentLearner) return false;
    lessonId = parseInt(lessonId);
    let isNew = false;
    if (!this.currentLearner.completedLessons.includes(lessonId)) {
      this.currentLearner.completedLessons.push(lessonId);
      this.currentLearner.stars += 10;
      isNew = true;
    }
    this.currentLearner.lastActiveDate = new Date().toLocaleDateString('en-GB');
    this.save();
    return isNew;
  },

  logout() {
    this.currentLearner = null;
    localStorage.removeItem('skillspring_adult_learner');
  },

  resetProgress() {
    if (!this.currentLearner) return;
    this.currentLearner.stars = 0;
    this.currentLearner.completedLessons = [];
    this.currentLearner.lastActiveDate = new Date().toLocaleDateString('en-GB');
    this.save();
  }
};

class AdultLearningPlatform {
  constructor() {
    this.activeLevel = 'all';
    this.currentLesson = null;
    this.currentTab = 'all';
    this.tabsOrder = ['all', 'basics', 'realLife', 'understand', 'quiz'];
  }

  init() {
    // If user is not logged in / has logged out, redirect back to landing page with adult login modal
    const active = localStorage.getItem('skillspring_active_user');
    const saved = localStorage.getItem('skillspring_adult_learner');
    if (!active && !saved) {
      window.location.href = 'index.html?login=adult';
      return;
    }

    AdultState.load();
    this.setupHUD();
    this.renderLessonsGrid();
    this.setupEventListeners();
  }

  setupHUD() {
    const l = AdultState.currentLearner;
    if (!l) return;

    const nameEl = document.getElementById('adultHudName');
    if (nameEl) nameEl.innerText = l.name;

    const ageEl = document.getElementById('adultHudAge');
    if (ageEl) ageEl.innerText = l.ageGroup;

    const starsEl = document.getElementById('adultHudStars');
    if (starsEl) starsEl.innerText = l.stars;

    const completedCount = l.completedLessons ? l.completedLessons.length : 0;
    const progressEl = document.getElementById('adultProgressCounter');
    if (progressEl) progressEl.innerText = `${completedCount} / 20 Lessons Completed`;

    const fillEl = document.getElementById('adultProgressFill');
    if (fillEl) {
      const pct = Math.min(100, Math.round((completedCount / 20) * 100));
      fillEl.style.width = `${Math.max(5, pct)}%`;
    }

    // Update Certificate details
    const certName = document.getElementById('certCandidateName');
    if (certName) certName.innerText = l.name;

    const certScore = document.getElementById('certCompletionScore');
    if (certScore) {
      const pct = Math.round((completedCount / 20) * 100);
      certScore.innerText = `✓ Progress Score: ${pct}% | ${completedCount} / 20 Lessons Completed`;
    }

    const certDate = document.getElementById('certSignDate');
    if (certDate) certDate.innerText = new Date().toLocaleDateString('en-GB');
  }

  downloadCertificateAsImage() {
    const l = AdultState.currentLearner;
    const candidateName = (l && l.name) ? l.name.trim() : "Shobha";
    const completedCount = (l && l.completedLessons) ? l.completedLessons.length : 20;
    const pct = Math.round((completedCount / 20) * 100);
    const dateStr = new Date().toLocaleDateString('en-GB');

    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 820;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Crisp white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative outer border (Navy)
    ctx.strokeStyle = '#1e3a8a';
    ctx.lineWidth = 16;
    ctx.strokeRect(18, 18, 1164, 784);

    // Inner gold border
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.strokeRect(32, 32, 1136, 756);

    // Subtle faint inner accent
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, 1120, 740);

    // Corner decorative accents
    ctx.fillStyle = '#f59e0b';
    const corners = [
      [45, 45],
      [1155, 45],
      [45, 775],
      [1155, 775]
    ];
    corners.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // Award Seal Emoji / Ribbon
    ctx.font = '52px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🎖️', 600, 110);

    // Certificate Title
    ctx.font = 'bold 36px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillStyle = '#1e3a8a';
    ctx.fillText('CERTIFICATE OF COMPLETION', 600, 168);

    // Subtitle
    ctx.font = 'bold 20px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillStyle = '#0d9488';
    ctx.fillText('Adaptive AI Skill Development & Digital Literacy (Ages 35+)', 600, 206);

    // "This is proudly awarded to"
    ctx.font = 'italic 19px Georgia, "Times New Roman", serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('This is proudly awarded to', 600, 258);

    // Candidate Name (dignified serif typography)
    ctx.font = 'bold 44px Georgia, "Times New Roman", serif';
    ctx.fillStyle = '#1e3a8a';
    ctx.fillText(candidateName, 600, 324);

    // Underline below candidate name
    const textWidth = ctx.measureText(candidateName).width;
    ctx.strokeStyle = '#1e3a8a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(600 - textWidth / 2 - 24, 338);
    ctx.lineTo(600 + textWidth / 2 + 24, 338);
    ctx.stroke();

    // Citation description
    ctx.font = '18px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillStyle = '#334155';
    ctx.fillText('For successfully completing all 20 Foundations of Artificial Intelligence lessons,', 600, 390);
    ctx.fillText('including AI in Everyday Life, ChatGPT & Prompt Writing, Language Translation,', 600, 420);
    ctx.fillText('Document Summaries, and Cybersecurity & Banking Fraud Prevention.', 600, 450);

    // Verified score pill badge
    const badgeText = `✓ Verified Mastery Score: ${pct}% | ${completedCount} / 20 Lessons Mastered`;
    ctx.fillStyle = '#ecfdf5';
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(330, 485, 540, 42, 21);
      ctx.fill();
      ctx.strokeStyle = '#86efac';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else {
      ctx.fillRect(330, 485, 540, 42);
    }
    ctx.fillStyle = '#059669';
    ctx.font = 'bold 18px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillText(badgeText, 600, 512);

    // Bottom signatures separator line
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(100, 575);
    ctx.lineTo(1100, 575);
    ctx.stroke();

    // Left Signature: Academic Board
    ctx.font = 'italic bold 22px Georgia, "Times New Roman", cursive, serif';
    ctx.fillStyle = '#1e3a8a';
    ctx.fillText('SkillSpring Academic Board', 320, 625);

    ctx.font = 'bold 16px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText('Director of Education', 320, 655);

    ctx.font = '14px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('SkillSpring AI Academy', 320, 680);
    ctx.fillText('Verified Public Online Certification', 320, 702);

    // Right Signature: Verification Platform & Date
    ctx.font = 'italic bold 22px Georgia, "Times New Roman", cursive, serif';
    ctx.fillStyle = '#1e3a8a';
    ctx.fillText(dateStr, 880, 625);

    ctx.font = 'bold 16px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText('SkillSpring AI Platform', 880, 655);

    ctx.font = '14px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('Autonomous Adaptive Learning Platform', 880, 680);
    ctx.fillText('Credential ID: SKILL-2026-AI-ADULT', 880, 702);

    // Trigger instant download
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const safeFileName = candidateName.replace(/[^a-zA-Z0-9_-]/g, '_');
      const link = document.createElement('a');
      link.download = `SkillSpring_Certificate_${safeFileName}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error('Error generating certificate image:', e);
      window.print();
    }
  }


  renderLevelShowcase() {
    const box = document.getElementById('levelInteractiveShowcase');
    if (!box) return;

    if (this.activeLevel === '1') {
      this.buildLevel1Showcase(box);
    } else {
      // From Level 2 and above: no separate showcase box above the lessons ("above dont want")
      box.style.display = 'none';
      box.innerHTML = '';
    }
  }

  buildLevel1Showcase(box) {
    box.style.display = 'block';
    box.innerHTML = `
      <div class="showcase-header">
        <div class="showcase-title-row">
          <div class="showcase-icon-badge">🌱</div>
          <div>
            <h3>Level 1 Interactive Hub: How AI Works (Moving Process)</h3>
            <p>Specially designed for beginners & grandparents: Watch how smart machines take input and think!</p>
          </div>
        </div>
        <button type="button" class="btn-lesson-open" id="btnRunLevel1Anim" style="background: #2563eb; padding: 10px 20px; font-size: 1rem; cursor: pointer;">
          ▶️ Watch Animated Flow
        </button>
      </div>

      <!-- Moving Interactive 3-Stage Pipeline -->
      <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 18px; padding: 24px; margin-bottom: 24px;">
        <h4 style="text-align: center; margin-bottom: 18px; color: #1e3a8a; font-size: 1.15rem;">
          The 3-Step AI Cycle: Information In ➡️ Smart Processing ➡️ Helpful Answer
        </h4>
        
        <div style="display: flex; justify-content: space-around; align-items: center; gap: 14px; flex-wrap: wrap;">
          <!-- Stage 1 -->
          <div id="flowStage1" style="background: white; border: 2.5px solid #cbd5e1; border-radius: 16px; padding: 18px; text-align: center; flex: 1; min-width: 200px; transition: all 0.3s;">
            <div style="font-size: 2.6rem; margin-bottom: 6px;">👤💬</div>
            <strong style="color: #0f172a; font-size: 1.1rem; display: block;">1. Human Input</strong>
            <p style="font-size: 0.95rem; color: #64748b; margin-top: 4px;">You ask a question or speak into your smartphone microphone.</p>
          </div>

          <!-- Animated Connector 1 -->
          <div style="font-size: 1.8rem; color: #94a3b8; font-weight: 800;" id="flowArrow1">
            <span class="pulsing-brain" style="display: inline-block;">➡️</span>
          </div>

          <!-- Stage 2 -->
          <div id="flowStage2" style="background: white; border: 2.5px solid #cbd5e1; border-radius: 16px; padding: 18px; text-align: center; flex: 1; min-width: 220px; transition: all 0.3s;">
            <div style="font-size: 2.6rem; margin-bottom: 6px;">
              <span class="pulsing-brain">🧠</span><span class="spinning-gear" style="font-size: 1.8rem; margin-left: -10px;">⚙️</span>
            </div>
            <strong style="color: #0f172a; font-size: 1.1rem; display: block;">2. AI Processing</strong>
            <p style="font-size: 0.95rem; color: #64748b; margin-top: 4px;" id="flowStage2Text">Smart software recognizes patterns across millions of verified examples.</p>
          </div>

          <!-- Animated Connector 2 -->
          <div style="font-size: 1.8rem; color: #94a3b8; font-weight: 800;" id="flowArrow2">
            <span class="pulsing-brain" style="display: inline-block;">➡️</span>
          </div>

          <!-- Stage 3 -->
          <div id="flowStage3" style="background: white; border: 2.5px solid #cbd5e1; border-radius: 16px; padding: 18px; text-align: center; flex: 1; min-width: 200px; transition: all 0.3s;">
            <div style="font-size: 2.6rem; margin-bottom: 6px;">💡✨</div>
            <strong style="color: #0f172a; font-size: 1.1rem; display: block;">3. Helpful Result</strong>
            <p style="font-size: 0.95rem; color: #64748b; margin-top: 4px;">Instant clear answer, fastest traffic route, or translated message.</p>
          </div>
        </div>

        <div id="animLiveStatus" style="text-align: center; margin-top: 18px; font-weight: 700; color: #2563eb; font-size: 1.05rem; min-height: 28px;">
          Click "▶️ Watch Animated Flow" above to see data move!
        </div>
      </div>

      <!-- Quick Practice Challenge for Grandparents -->
      <div style="background: #ffffff; border: 2px solid #bbf7d0; border-radius: 18px; padding: 22px;">
        <h4 style="color: #15803d; font-size: 1.15rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <span>🎯</span> Quick Interactive Challenge: Is it Human, AI, or Both?
        </h4>
        <div id="level1QuizContainer"></div>
      </div>
    `;

    // Event listener for Animated Flow
    const btnAnim = document.getElementById('btnRunLevel1Anim');
    const s1 = document.getElementById('flowStage1');
    const s2 = document.getElementById('flowStage2');
    const s3 = document.getElementById('flowStage3');
    const status = document.getElementById('animLiveStatus');

    if (btnAnim) {
      btnAnim.onclick = () => {
        btnAnim.disabled = true;
        status.innerText = "Step 1: Receiving question or prompt...";
        s1.style.borderColor = "#2563eb";
        s1.style.background = "#eff6ff";
        s2.style.borderColor = "#cbd5e1";
        s2.style.background = "white";
        s3.style.borderColor = "#cbd5e1";
        s3.style.background = "white";

        setTimeout(() => {
          status.innerText = "Step 2: AI Brain is scanning patterns and understanding intent...";
          s1.style.background = "white";
          s2.style.borderColor = "#7c3aed";
          s2.style.background = "#faf5ff";
        }, 1200);

        setTimeout(() => {
          status.innerText = "Step 3: Success! AI outputs a clear, safe, verified answer!";
          s2.style.background = "white";
          s3.style.borderColor = "#10b981";
          s3.style.background = "#ecfdf5";
          btnAnim.disabled = false;
        }, 2400);
      };
    }

    // Render Mini Quiz
    const quizBox = document.getElementById('level1QuizContainer');
    const questions = [
      { text: "1. Google Maps finding the route with least traffic in Bangalore:", options: ["AI System", "Simple Mechanical Tool"], answer: 0, reason: "Correct! Google Maps analyzes real-time satellite data to predict traffic using AI." },
      { text: "2. A traditional mechanical clock with winding key and pendulums:", options: ["AI System", "Simple Mechanical Tool"], answer: 1, reason: "Correct! Mechanical clocks work strictly through gears and springs with zero digital computing." },
      { text: "3. A doctor reviewing your medical test report and explaining it with AI guidance:", options: ["Both Human + AI Assistant", "Only Computer"], answer: 0, reason: "Correct! AI assists with rapid information, while human doctors make all medical decisions." }
    ];

    if (quizBox) {
      quizBox.innerHTML = questions.map((q, qIdx) => `
        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 12px;">
          <div style="font-weight: 700; color: #1e293b; margin-bottom: 8px;">${q.text}</div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="q1opts_${qIdx}">
            ${q.options.map((opt, oIdx) => `
              <button type="button" class="btn-adult-home l1-opt-btn" data-q="${qIdx}" data-opt="${oIdx}" style="padding: 8px 16px; font-size: 0.95rem; font-weight: 700; cursor: pointer; background: white; border: 2px solid #cbd5e1; border-radius: 8px;">
                ${opt}
              </button>
            `).join('')}
          </div>
          <div id="q1exp_${qIdx}" style="display: none; margin-top: 10px; font-size: 0.95rem; font-weight: 700; padding: 10px; border-radius: 8px;"></div>
        </div>
      `).join('');

      quizBox.querySelectorAll('.l1-opt-btn').forEach(btn => {
        btn.onclick = () => {
          const qIdx = parseInt(btn.getAttribute('data-q'));
          const oIdx = parseInt(btn.getAttribute('data-opt'));
          const exp = document.getElementById(`q1exp_${qIdx}`);
          const q = questions[qIdx];
          const parent = document.getElementById(`q1opts_${qIdx}`);

          parent.querySelectorAll('button').forEach(b => {
            b.style.borderColor = '#cbd5e1';
            b.style.background = 'white';
            b.style.color = '#334155';
          });

          exp.style.display = 'block';
          if (oIdx === q.answer) {
            btn.style.borderColor = '#10b981';
            btn.style.background = '#ecfdf5';
            btn.style.color = '#065f46';
            exp.style.background = '#dcfce7';
            exp.style.color = '#15803d';
            exp.innerHTML = `✅ ${q.reason}`;
          } else {
            btn.style.borderColor = '#ef4444';
            btn.style.background = '#fef2f2';
            btn.style.color = '#991b1b';
            exp.style.background = '#fee2e2';
            exp.style.color = '#991b1b';
            exp.innerHTML = `❌ Not quite! ${q.reason}`;
          }
        };
      });
    }
  }

  buildLevel2Showcase(box) {
    box.style.display = 'block';
    box.innerHTML = `
      <div class="showcase-header">
        <div class="showcase-title-row">
          <div class="showcase-icon-badge">💬</div>
          <div>
            <h3>Level 2 Interactive Hub: Grandparent's Prompt Upgrade Studio & Quiz</h3>
            <p>Learn how talking clearly to AI turns a 1-word question into a 5-star helpful answer!</p>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; margin-bottom: 24px;">
        <!-- Prompt Upgrade Lab -->
        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 18px; padding: 22px;">
          <h4 style="color: #1e3a8a; font-size: 1.15rem; margin-bottom: 12px;">
            ✨ Try Upgrading Everyday Questions:
          </h4>
          <label style="font-weight: 700; font-size: 0.95rem; color: #475569; display: block; margin-bottom: 8px;">
            Choose a common topic grandparents ask:
          </label>
          <select id="promptSelectTopic" style="width: 100%; padding: 12px 14px; border: 2px solid #cbd5e1; border-radius: 12px; font-size: 1rem; font-weight: 700; background: white; margin-bottom: 16px;">
            <option value="knee">🦵 Gentle Knee & Joint Exercise for Seniors</option>
            <option value="cheque">🏦 Requesting a New Bank Cheque Book Letter</option>
            <option value="whatsapp">📱 WhatsApp Privacy & Avoiding Fake Messages</option>
            <option value="diet">🥗 High-Fiber, Low-Sugar Diet for Healthy Digestion</option>
          </select>

          <div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 12px; padding: 14px; margin-bottom: 14px;">
            <strong style="color: #991b1b; font-size: 0.95rem;">❌ Weak Basic Instruction (What most people type):</strong>
            <p style="font-size: 1.05rem; font-weight: 700; color: #7f1d1d; margin-top: 4px;" id="weakPromptText">
              "tell me remedy for knee pain"
            </p>
          </div>

          <button type="button" class="btn-lesson-open" id="btnUpgradePrompt" style="width: 100%; background: #0d9488; padding: 12px; font-size: 1.05rem; margin-bottom: 14px; cursor: pointer;">
            ✨ Upgrade Prompt for AI ➡️
          </button>

          <div style="background: #f0fdf4; border: 2px solid #86efac; border-radius: 12px; padding: 14px; margin-bottom: 14px;">
            <strong style="color: #166534; font-size: 0.95rem;">✅ 5-Star Clear Prompt (How to get the best result):</strong>
            <p style="font-size: 1.05rem; font-weight: 700; color: #14532d; margin-top: 4px;" id="upgradedPromptText">
              Click the button above to see the upgrade!
            </p>
          </div>

          <button type="button" class="btn-adult-home" id="btnShowAiAnswer" style="width: 100%; background: #eff6ff; color: #1e40af; border: 2px solid #93c5fd; padding: 10px; font-size: 1rem; cursor: pointer; display: none;">
            🤖 Show How AI Responds to this Prompt ➡️
          </button>
          <div id="aiSampleAnswerBox" style="display: none; background: white; border: 2px solid #cbd5e1; border-radius: 12px; padding: 16px; margin-top: 12px; font-size: 1.02rem; line-height: 1.7; color: #1e293b;"></div>
        </div>

        <!-- Prompt Mastery Quiz -->
        <div style="background: #ffffff; border: 2px solid #bfdbfe; border-radius: 18px; padding: 22px;">
          <h4 style="color: #1e3a8a; font-size: 1.15rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <span>📝</span> Level 2 Prompt Quiz: Which instruction is better?
          </h4>
          <p style="font-size: 0.98rem; color: #475569; margin-bottom: 16px;">
            Test your prompt intuition! Choose the prompt that gives clear, safe answers:
          </p>
          <div id="level2QuizContainer"></div>
        </div>
      </div>
    `;

    const topicData = {
      knee: {
        weak: '"tell me remedy for knee pain"',
        upgraded: '"Please act as a caring wellness advisor. Explain 3 safe, gentle seated knee exercises for a 65-year-old at home. Include precautions and what to avoid in simple steps."',
        answer: 'Here are 3 gentle knee exercises suitable for seniors:\n1. Seated Leg Extensions: While seated straight in a sturdy chair, slowly raise one leg until straight, hold for 3 seconds, then lower gently. Repeat 5 times.\n2. Ankle Rotations: Rotate each foot clockwise 5 times to improve blood circulation.\n3. Gentle Heel Slides: Slide your foot slowly back and forth on the floor.\n⚠️ Note: Always stop if you feel sharp pain, and check with your physician.'
      },
      cheque: {
        weak: '"bank letter"',
        upgraded: '"Please draft a formal, polite letter to my bank branch manager requesting a new 50-leaf cheque book. Mention my account number and request home delivery by registered post."',
        answer: 'To,\nThe Branch Manager,\n[Your Bank Name], [Branch Address]\n\nSubject: Request for New 50-Leaf Cheque Book - A/C No: [XXXX-XXXX-XXXX]\n\nDear Sir/Madam,\nI hold a savings account with your branch. I kindly request you to issue a new 50-leaf cheque book for my account and dispatch it to my registered residential address.\n\nThanking you,\nYours sincerely,\n[Your Full Name]'
      },
      whatsapp: {
        weak: '"is message true"',
        upgraded: '"A WhatsApp forward claims the government is distributing free laptops to everyone tomorrow at a link. How can I verify if this is real or a dangerous fake link?"',
        answer: '💡 Safety Checklist for this WhatsApp Message:\n1. Fact Check: The government announces schemes on official .gov.in websites or television news, never through random WhatsApp links.\n2. Red Flag: Fake messages always promise free money, laptops, or gold to trick people into clicking malicious links.\n3. Action: Delete the message and do NOT forward it to family groups.'
      },
      diet: {
        weak: '"what to eat"',
        upgraded: '"Please suggest 3 traditional, soft, easy-to-digest high-fiber breakfast options suitable for a 60-year-old with mild diabetes. Mention simple ingredients."',
        answer: '3 Healthy Senior Breakfast Options:\n1. Vegetable Oats Porridge: Oats cooked with finely chopped carrots, beans, and a pinch of cumin.\n2. Moong Dal Steamed Idli: High in protein, light on the stomach, and provides steady energy.\n3. Ragi Malt with Buttermilk: Excellent calcium and fiber for bone strength, served without sugar.'
      }
    };

    const sel = document.getElementById('promptSelectTopic');
    const weakEl = document.getElementById('weakPromptText');
    const upEl = document.getElementById('upgradedPromptText');
    const btnUp = document.getElementById('btnUpgradePrompt');
    const btnAns = document.getElementById('btnShowAiAnswer');
    const ansBox = document.getElementById('aiSampleAnswerBox');

    if (sel && weakEl && upEl && btnUp) {
      sel.onchange = () => {
        const d = topicData[sel.value];
        weakEl.innerText = d.weak;
        upEl.innerText = 'Click the button above to see the upgrade!';
        if (btnAns) btnAns.style.display = 'none';
        if (ansBox) ansBox.style.display = 'none';
      };

      btnUp.onclick = () => {
        const d = topicData[sel.value];
        upEl.innerText = d.upgraded;
        if (btnAns) btnAns.style.display = 'block';
      };

      if (btnAns && ansBox) {
        btnAns.onclick = () => {
          const d = topicData[sel.value];
          ansBox.style.display = 'block';
          ansBox.innerHTML = `<strong>🤖 Simulated AI Output:</strong><p style="margin-top: 8px; white-space: pre-line;">${d.answer}</p>`;
        };
      }
    }

    // Level 2 Quiz
    const qBox2 = document.getElementById('level2QuizContainer');
    const l2Questions = [
      { text: "Grandpa wants recipe for diabetic soup. Which prompt is better?", optA: '"soup recipe"', optB: '"Give a simple 20-minute recipe for clear vegetable soup suitable for a diabetic senior, low in sodium."', correct: 'B', exp: "Option B specifies the diet requirement, ingredients, and time limit!" },
      { text: "You need AI to draft an email to your landlord. Which prompt will work best?", optA: '"Write a respectful email to my house landlord informing that the bathroom tap is leaking and requesting plumber repair this week."', optB: '"fix tap email"', correct: 'A', exp: "Option A explains the exact issue, tone, and timeline clearly!" }
    ];

    if (qBox2) {
      qBox2.innerHTML = l2Questions.map((q, idx) => `
        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 12px;">
          <div style="font-weight: 700; color: #1e293b; margin-bottom: 8px;">${idx + 1}. ${q.text}</div>
          <button type="button" class="btn-adult-home l2-btn" data-q="${idx}" data-choice="A" style="width: 100%; text-align: left; padding: 10px; margin-bottom: 8px; font-weight: 700; font-size: 0.95rem; background: white; border: 2px solid #cbd5e1; border-radius: 8px; cursor: pointer;">
            A: ${q.optA}
          </button>
          <button type="button" class="btn-adult-home l2-btn" data-q="${idx}" data-choice="B" style="width: 100%; text-align: left; padding: 10px; font-weight: 700; font-size: 0.95rem; background: white; border: 2px solid #cbd5e1; border-radius: 8px; cursor: pointer;">
            B: ${q.optB}
          </button>
          <div id="l2exp_${idx}" style="display: none; margin-top: 10px; font-weight: 700; font-size: 0.95rem; padding: 10px; border-radius: 8px;"></div>
        </div>
      `).join('');

      qBox2.querySelectorAll('.l2-btn').forEach(b => {
        b.onclick = () => {
          const qIdx = parseInt(b.getAttribute('data-q'));
          const choice = b.getAttribute('data-choice');
          const q = l2Questions[qIdx];
          const expBox = document.getElementById(`l2exp_${qIdx}`);

          expBox.style.display = 'block';
          if (choice === q.correct) {
            b.style.borderColor = '#10b981';
            b.style.background = '#ecfdf5';
            b.style.color = '#065f46';
            expBox.style.background = '#dcfce7';
            expBox.style.color = '#15803d';
            expBox.innerHTML = `✅ Correct! ${q.exp}`;
          } else {
            b.style.borderColor = '#ef4444';
            b.style.background = '#fef2f2';
            b.style.color = '#991b1b';
            expBox.style.background = '#fee2e2';
            expBox.style.color = '#991b1b';
            expBox.innerHTML = `❌ Try the other option! ${q.exp}`;
          }
        };
      });
    }
  }

  buildLevel3Showcase(box) {
    box.style.display = 'block';
    box.innerHTML = `
      <div class="showcase-header">
        <div class="showcase-title-row">
          <div class="showcase-icon-badge">📄</div>
          <div>
            <h3>Level 3 Interactive Hub: AI Document Detective & Live Greeting Card Studio</h3>
            <p>Scan and simplify confusing electricity bills, rental clauses, insurance terms, and craft personalized family cards!</p>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
        <!-- AI Document Detective & Bill Explainer -->
        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 18px; padding: 22px;">
          <h4 style="color: #7c3aed; font-size: 1.15rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <span>🔍</span> AI Document Detective & Bill Explainer
          </h4>
          <p style="font-size: 0.95rem; color: #64748b; margin-bottom: 14px;">
            Choose a confusing real-life document seniors receive, then tap <strong>Scan with AI</strong>:
          </p>

          <select id="docDetectiveSelect" style="width: 100%; padding: 12px; border: 2px solid #cbd5e1; border-radius: 12px; font-size: 0.98rem; font-weight: 700; background: white; margin-bottom: 14px;">
            <option value="electricity">⚡ Electricity Bill: Peak Hour Surcharge Clause</option>
            <option value="insurance">🏥 Health Insurance: 2-Year Waiting & Room Rent Limit</option>
            <option value="fd_tds">🏦 Senior Fixed Deposit: Form 15H & ₹50,000 Tax Rule</option>
            <option value="rental">📜 Rental Agreement: Deposit Refund & Notice Clause</option>
          </select>

          <!-- Document Preview Box with Laser Scanner Line -->
          <div id="docPreviewContainer" style="position: relative; background: #0f172a; color: #e2e8f0; border-radius: 14px; padding: 16px; margin-bottom: 14px; min-height: 110px; font-family: monospace; font-size: 0.88rem; line-height: 1.6; overflow: hidden; border: 2px solid #334155;">
            <div class="scanner-laser-line" id="docScanLaser" style="background: linear-gradient(90deg, transparent, #a855f7, #c084fc, transparent); box-shadow: 0 0 12px #a855f7;"></div>
            <div style="font-size: 0.78rem; text-transform: uppercase; color: #94a3b8; font-weight: 800; margin-bottom: 6px; letter-spacing: 0.05em;">
              📑 Original Legal & Official Text:
            </div>
            <div id="docRawText">
              "As per KERC Tariff Order clause 7.2.4, Fuel and Power Purchase Cost Adjustment (FPPCA) surcharge of ₹0.43/unit plus ToD peak surcharge of ₹1.50/unit is levied for consumption recorded between 18:00 hrs and 22:00 hrs. Non-payment by 24th attracts 2% compounding penal interest."
            </div>
          </div>

          <button type="button" class="btn-lesson-open" id="btnScanDocDetective" style="width: 100%; background: #7c3aed; padding: 11px; font-size: 1rem; margin-bottom: 14px; cursor: pointer;">
            🔍 Scan & Explain in Simple Words ➡️
          </button>

          <!-- Plain English Explanation Card -->
          <div id="docDetectiveResultCard" style="background: #ffffff; border: 2px solid #ddd6fe; border-radius: 14px; padding: 16px; box-shadow: 0 4px 14px rgba(124, 58, 237, 0.08);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 0.82rem; font-weight: 800; background: #f3e8ff; color: #6b21a8; padding: 4px 10px; border-radius: 20px;">
                💡 Plain English Translation
              </span>
              <button type="button" id="btnCopyDocSummary" style="background: none; border: none; color: #7c3aed; font-size: 0.88rem; font-weight: 800; cursor: pointer;">
                📋 Copy
              </button>
            </div>
            <div id="docMeaningContent" style="font-size: 0.95rem; color: #1e293b; line-height: 1.55;">
              <p style="margin-bottom: 6px;"><strong>🟢 What this means:</strong> You are charged ₹1.50 extra per unit for electricity consumed during peak evening hours (6:00 PM to 10:00 PM).</p>
              <p style="margin-bottom: 6px;"><strong>⚠️ Important Deadline:</strong> Pay before the 24th of this month to avoid a 2% compound late fee.</p>
              <p style="margin: 0; color: #047857;"><strong>💡 Senior Money-Saving Tip:</strong> Run heavy appliances like washing machines or geysers between 7:00 AM and 11:00 AM to keep your bill lower.</p>
            </div>
          </div>
        </div>

        <!-- Live Card Studio for Family & Festivals -->
        <div style="background: #ffffff; border: 2.5px solid #e9d5ff; border-radius: 18px; padding: 22px;">
          <h4 style="color: #7c3aed; font-size: 1.15rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <span>🎨</span> Live Festive Card Studio
          </h4>
          <p style="font-size: 0.95rem; color: #64748b; margin-bottom: 14px;">
            Design personalized greeting cards for your family and grandchildren:
          </p>
          
          <div style="display: flex; gap: 10px; margin-bottom: 12px;">
            <select id="showcaseCardOccasion" style="flex: 1; padding: 10px; border: 2px solid #cbd5e1; border-radius: 10px; font-weight: 700; font-size: 0.95rem;">
              <option value="diwali">🪔 Festive Blessings</option>
              <option value="birthday">🎂 Grandchild Birthday</option>
              <option value="morning">🙏 Good Morning & Health</option>
            </select>
            <input type="text" id="showcaseCardName" placeholder="Name (e.g. Ramesh)" value="Dear Family" style="flex: 1; padding: 10px; border: 2px solid #cbd5e1; border-radius: 10px; font-weight: 700; font-size: 0.95rem;" />
          </div>

          <button type="button" class="btn-lesson-open" id="btnMakeShowcaseCard" style="width: 100%; background: #7c3aed; padding: 10px; font-size: 1rem; margin-bottom: 14px; cursor: pointer;">
            🎨 Render Floating Card ➡️
          </button>

          <!-- Floating animated preview -->
          <div id="showcaseCardPreview" class="floating-card" style="background: linear-gradient(135deg, #fef3c7, #fde68a); border: 3px solid #f59e0b; border-radius: 16px; padding: 20px; text-align: center; box-shadow: 0 8px 24px rgba(245, 158, 11, 0.25);">
            <div style="font-size: 2.4rem; margin-bottom: 6px;" id="showcaseCardIcon">🪔✨</div>
            <h3 style="color: #92400e; font-size: 1.25rem; font-weight: 800; margin-bottom: 6px;" id="showcaseCardHeading">
              Wishing You Peace & Happiness!
            </h3>
            <p style="color: #78350f; font-size: 1rem; line-height: 1.5;" id="showcaseCardBody">
              May your home be filled with health, warmth, and joyful moments always.
            </p>
            <div style="margin-top: 12px; font-weight: 800; color: #b45309; font-size: 0.95rem;" id="showcaseCardSign">
              — With warm blessings & love
            </div>
          </div>
        </div>
      </div>
    `;

    // Document Detective Data & Handler
    const docData = {
      electricity: {
        raw: '"As per KERC Tariff Order clause 7.2.4, Fuel and Power Purchase Cost Adjustment (FPPCA) surcharge of ₹0.43/unit plus ToD peak surcharge of ₹1.50/unit is levied for consumption recorded between 18:00 hrs and 22:00 hrs. Non-payment by 24th attracts 2% compounding penal interest."',
        meaning: `
          <p style="margin-bottom: 6px;"><strong>🟢 What this means:</strong> You are charged ₹1.50 extra per unit for electricity consumed during peak evening hours (6:00 PM to 10:00 PM).</p>
          <p style="margin-bottom: 6px;"><strong>⚠️ Important Deadline:</strong> Pay before the 24th of this month to avoid a 2% compound late fee.</p>
          <p style="margin: 0; color: #047857;"><strong>💡 Senior Money-Saving Tip:</strong> Run heavy appliances like washing machines or geysers between 7:00 AM and 11:00 AM to keep your bill lower.</p>
        `,
        copyText: "Electricity Bill Breakdown:\n• Peak surcharge applies between 6:00 PM and 10:00 PM.\n• Pay before the 24th to avoid a 2% penalty fee.\n• Tip: Run washing machines and geysers in the morning to save on units."
      },
      insurance: {
        raw: '"Policy Clause 4.1: Pre-existing disease claims shall be admissible only after continuous coverage of 24 months. Further, standard inpatient room rent sub-limit is capped at 1% of Sum Insured per day. Proportionate deductions apply to surgeon and diagnostic charges for higher room categories."',
        meaning: `
          <p style="margin-bottom: 6px;"><strong>🟢 What this means:</strong> Any medical condition you had before joining this insurance is covered only after completing 2 full years of continuous coverage.</p>
          <p style="margin-bottom: 6px;"><strong>⚠️ Room Rent Cap Alert:</strong> If your sum insured is ₹5,00,000, your room rent limit is ₹5,000 per day. Choosing a deluxe room means paying the excess doctor and room fees out of your own pocket.</p>
          <p style="margin: 0; color: #047857;"><strong>💡 Senior Safety Tip:</strong> When admitted to the hospital, show your policy card and ask for a standard room within your ₹5,000 limit to get 100% cashless settlement.</p>
        `,
        copyText: "Health Insurance Clause:\n• Pre-existing diseases covered after 24 months.\n• Room rent capped at 1% of sum insured per day (₹5,000/day for a 5-lakh cover).\n• Tip: Request a standard room within your limit to avoid extra out-of-pocket bills."
      },
      fd_tds: {
        raw: '"Under Section 194A read with Section 80TTB of Income Tax Act 1961, tax deduction at source (TDS) is attracted if total interest from scheduled bank deposits exceeds ₹50,000 in a FY. Eligible resident senior citizens (aged 60+) may submit self-declaration Form 15H for nil deduction."',
        meaning: `
          <p style="margin-bottom: 6px;"><strong>🟢 What this means:</strong> Senior citizens (age 60 and above) can earn up to ₹50,000 in fixed deposit interest each year without tax deduction.</p>
          <p style="margin-bottom: 6px;"><strong>⚠️ Form 15H Requirement:</strong> If your total yearly income is below the taxable limit, you must submit Form 15H to your bank so they don\'t deduct 10% TDS automatically.</p>
          <p style="margin: 0; color: #047857;"><strong>💡 Senior Banking Step:</strong> Submit Form 15H online or at your branch in the first week of April every year to safeguard your monthly interest payout.</p>
        `,
        copyText: "Senior Citizen FD & Form 15H:\n• Seniors enjoy up to ₹50,000 deposit interest tax-free each year.\n• If total income is below taxable slab, submit Form 15H.\n• Tip: Submit Form 15H in early April every year to prevent tax deduction."
      },
      rental: {
        raw: '"Clause 11: The Licensee shall deliver vacant possession of the demised premises upon 30 days written notice. Normal wear and tear excepted, painting charges shall not exceed one month\'s rent. Security deposit refund shall be effected within 7 banking days of key handover."',
        meaning: `
          <p style="margin-bottom: 6px;"><strong>🟢 What this means:</strong> You only need to give 30 days written notice (via letter or WhatsApp message) before vacating the house.</p>
          <p style="margin-bottom: 6px;"><strong>⚠️ Painting & Deduction Limits:</strong> Natural aging and wear-and-tear is expected; the landlord cannot deduct more than 1 month\'s rent for painting.</p>
          <p style="margin: 0; color: #047857;"><strong>💡 Senior Protection Tip:</strong> The landlord is legally required to refund your full deposit within 7 working days after you hand over the keys.</p>
        `,
        copyText: "Rental Agreement Clause:\n• 30 days written notice required before vacating.\n• Normal wear-and-tear is exempt; painting deductions cannot exceed 1 month's rent.\n• Security deposit must be refunded within 7 banking days."
      }
    };

    const docSelect = document.getElementById('docDetectiveSelect');
    const docRawText = document.getElementById('docRawText');
    const docScanLaser = document.getElementById('docScanLaser');
    const docMeaningContent = document.getElementById('docMeaningContent');
    const btnScanDoc = document.getElementById('btnScanDocDetective');
    const btnCopyDoc = document.getElementById('btnCopyDocSummary');

    let currentDocKey = 'electricity';

    if (docSelect) {
      docSelect.onchange = () => {
        currentDocKey = docSelect.value;
        const d = docData[currentDocKey];
        if (docRawText) docRawText.innerText = d.raw;
        if (docMeaningContent) {
          docMeaningContent.innerHTML = `<p style="color: #64748b; font-style: italic;">Tap <strong>Scan & Explain in Simple Words ➡️</strong> to analyze this document clause.</p>`;
        }
      };
    }

    if (btnScanDoc) {
      btnScanDoc.onclick = () => {
        if (docScanLaser) docScanLaser.classList.add('scanning');
        if (docMeaningContent) {
          docMeaningContent.innerHTML = `<p style="color: #7c3aed; font-weight: 700;"><em>🔍 Scanning document legal clauses with AI Detective...</em></p>`;
        }
        setTimeout(() => {
          if (docScanLaser) docScanLaser.classList.remove('scanning');
          const d = docData[currentDocKey];
          if (docMeaningContent) docMeaningContent.innerHTML = d.meaning;
        }, 650);
      };
    }

    if (btnCopyDoc) {
      btnCopyDoc.onclick = () => {
        const d = docData[currentDocKey];
        const textToCopy = d ? d.copyText : "";
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            btnCopyDoc.innerText = "✓ Copied!";
            setTimeout(() => { btnCopyDoc.innerText = "📋 Copy"; }, 2000);
          }).catch(() => {
            btnCopyDoc.innerText = "✓ Copied!";
            setTimeout(() => { btnCopyDoc.innerText = "📋 Copy"; }, 2000);
          });
        } else {
          btnCopyDoc.innerText = "✓ Copied!";
          setTimeout(() => { btnCopyDoc.innerText = "📋 Copy"; }, 2000);
        }
      };
    }

    // Card generator handler
    const btnCard = document.getElementById('btnMakeShowcaseCard');
    const selOcc = document.getElementById('showcaseCardOccasion');
    const nameInp = document.getElementById('showcaseCardName');
    const cIcon = document.getElementById('showcaseCardIcon');
    const cHead = document.getElementById('showcaseCardHeading');
    const cBody = document.getElementById('showcaseCardBody');
    const cSign = document.getElementById('showcaseCardSign');

    if (btnCard) {
      btnCard.onclick = () => {
        const name = (nameInp && nameInp.value.trim()) ? nameInp.value.trim() : "Dear Family";
        const occ = selOcc ? selOcc.value : "diwali";
        if (occ === "diwali") {
          cIcon.innerText = "🪔✨";
          cHead.innerText = `Festive Greetings, ${name}!`;
          cBody.innerText = "May the divine lights illuminate your path with great health, prosperity, and joyous family celebrations.";
          cSign.innerText = "— With heartfelt festive blessings & love";
        } else if (occ === "birthday") {
          cIcon.innerText = "🎂🎈🎁";
          cHead.innerText = `Happy Birthday, ${name}!`;
          cBody.innerText = "Wishing you a wonderful year ahead filled with happiness, new achievements, and smiles every single day!";
          cSign.innerText = "— With blessings & warmest hugs from Grandma & Grandpa";
        } else {
          cIcon.innerText = "🙏🌸🌅";
          cHead.innerText = `Good Morning & Peace, ${name}!`;
          cBody.innerText = "Wishing you a calm, bright, and peaceful day filled with positive thoughts and good health.";
          cSign.innerText = "— Warm daily wishes";
        }
      };
    }
  }

  buildLevel4Showcase(box) {
    box.style.display = 'block';
    box.innerHTML = `
      <div class="showcase-header">
        <div class="showcase-title-row">
          <div class="showcase-icon-badge">🛡️</div>
          <div>
            <h3>Level 4 Interactive Hub: Senior Scam Detective & Security Scanner</h3>
            <p>Moving laser scanner: Learn to spot fake SMS threats, OTP traps, and phone scams instantly!</p>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
        <!-- Animated Phone Scanner -->
        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 18px; padding: 22px;">
          <h4 style="color: #ea580c; font-size: 1.15rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <span>📱</span> Moving Security Laser Scanner
          </h4>
          <p style="font-size: 0.95rem; color: #64748b; margin-bottom: 14px;">
            Select a common fake message seniors receive, then click Scan:
          </p>

          <select id="scamScenarioSelect" style="width: 100%; padding: 12px; border: 2px solid #cbd5e1; border-radius: 12px; font-size: 1rem; font-weight: 700; background: white; margin-bottom: 16px;">
            <option value="power">⚡ Electricity Power Cut Warning (Urgent)</option>
            <option value="bank">🏦 Bank Account Suspended - KYC Update Link</option>
            <option value="lottery">🎁 Lucky Draw Winner: 25 Lakhs Prize</option>
          </select>

          <!-- Simulated Phone Screen with Moving Laser Line -->
          <div class="sim-phone-screen" id="scamPhoneScreen">
            <div class="scanner-laser-line" id="scannerLaser"></div>
            
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #94a3b8; margin-bottom: 12px; border-bottom: 1px solid #334155; padding-bottom: 6px;">
              <span>💬 SMS Message</span>
              <span id="scamSenderTag">+91 98450-XXXXX</span>
            </div>

            <div style="background: #1e293b; border-radius: 12px; padding: 14px; margin-bottom: 14px; font-size: 0.98rem; line-height: 1.6;" id="scamMessageBody">
              "ALERT: Your electricity power will be disconnected at 9:30 PM tonight due to unpaid bill of Rs 420. Call our verification officer at 98450-XXXXX immediately to prevent disconnection."
            </div>

            <div id="scamLaserAnalysis" style="display: none; background: #450a0a; border: 2px solid #ef4444; border-radius: 12px; padding: 12px; font-size: 0.92rem; color: #fecaca; line-height: 1.5;"></div>
          </div>

          <button type="button" class="btn-lesson-open" id="btnScanMessage" style="width: 100%; background: #ea580c; padding: 12px; font-size: 1.05rem; margin-top: 16px; cursor: pointer;">
            🔍 Scan with AI Security Detector ➡️
          </button>
        </div>

        <!-- Safe vs Scam Grandparent Challenge -->
        <div style="background: #ffffff; border: 2px solid #fed7aa; border-radius: 18px; padding: 22px;">
          <h4 style="color: #c2410c; font-size: 1.15rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <span>🎯</span> Senior Safety Practice: Safe or Scam?
          </h4>
          <p style="font-size: 0.95rem; color: #475569; margin-bottom: 16px;">
            Grandparents: Practice identifying whether these daily situations are genuine or a trick:
          </p>
          <div id="level4QuizContainer"></div>
        </div>
      </div>
    `;

    const scamData = {
      power: {
        sender: "+91 98450-XXXXX",
        body: '"ALERT: Your electricity power will be disconnected at 9:30 PM tonight due to unpaid bill of Rs 420. Call our verification officer at 98450-XXXXX immediately to prevent disconnection."',
        analysis: '🚨 <strong>AI SCAM DETECTED! (High Risk)</strong><br>• False Urgency: "Tonight at 9:30 PM" creates panic so you act without thinking.<br>• Fake Phone Number: Utilities never use personal mobile numbers.<br>• Golden Rule: Official electricity boards send bill reminders days in advance with account numbers.'
      },
      bank: {
        sender: "SBI-ALERT-WEB",
        body: '"Dear Customer, Your SBI Bank account is suspended due to pending KYC update. Click link to verify PAN immediately: http://sbi-kyc-verify-portal.top or account is blocked."',
        analysis: '🚨 <strong>AI SCAM DETECTED! (Critical Risk)</strong><br>• Fake Domain: ".top" is a cheap scam website, NOT official "sbi.co.in".<br>• Intimidation: Threatens to block your pension account.<br>• Golden Rule: NEVER click links to update KYC. Visit your local branch directly.'
      },
      lottery: {
        sender: "+92 300-XXXXX",
        body: '"CONGRATULATIONS! Your mobile number won 1st prize of Rs. 25,00,000 in KBC Lucky Draw. To claim your cash prize, deposit Rs. 2,500 file charges to account..."',
        analysis: '🚨 <strong>AI SCAM DETECTED! (100% Scam)</strong><br>• Advanced Fee Fraud: You cannot win a lottery you never bought a ticket for!<br>• Fee Trap: They take your Rs. 2,500 and disappear.<br>• Golden Rule: Delete and block immediately.'
      }
    };

    const selScam = document.getElementById('scamScenarioSelect');
    const senderTag = document.getElementById('scamSenderTag');
    const msgBody = document.getElementById('scamMessageBody');
    const laser = document.getElementById('scannerLaser');
    const analysis = document.getElementById('scamLaserAnalysis');
    const btnScan = document.getElementById('btnScanMessage');

    if (selScam && senderTag && msgBody) {
      selScam.onchange = () => {
        const item = scamData[selScam.value];
        senderTag.innerText = item.sender;
        msgBody.innerText = item.body;
        if (analysis) analysis.style.display = 'none';
        if (laser) laser.classList.remove('scanning');
      };
    }

    if (btnScan && laser && analysis) {
      btnScan.onclick = () => {
        laser.classList.add('scanning');
        analysis.style.display = 'none';
        btnScan.disabled = true;
        btnScan.innerText = "Scanning Message for Scam Flags...";

        setTimeout(() => {
          laser.classList.remove('scanning');
          btnScan.disabled = false;
          btnScan.innerText = "🔍 Scan with AI Security Detector ➡️";
          analysis.style.display = 'block';
          analysis.innerHTML = scamData[selScam.value].analysis;
        }, 1600);
      };
    }

    // Level 4 Quiz
    const qBox4 = document.getElementById('level4QuizContainer');
    const l4Questions = [
      { text: "A caller claiming to be your bank manager asks for the 6-digit OTP received on your phone to 'verify KYC'. What should you do?", optA: "Share the OTP because he sounds very polite and knows your name.", optB: "Refuse and disconnect. Real bank staff NEVER ask for OTP or password!", correct: 'B', exp: "OTP is your secret master key. No genuine bank official will ever ask for it!" },
      { text: "You receive an SMS saying your grandson is hospitalized and needs urgent Rs. 50,000 sent via UPI. What is the safest first step?", optA: "Call your grandson directly on his known personal phone number to verify first.", optB: "Transfer the money immediately out of fear.", correct: 'A', exp: "Scammers use emotional emergencies. Always verify directly through a known phone number!" }
    ];

    if (qBox4) {
      qBox4.innerHTML = l4Questions.map((q, idx) => `
        <div style="background: #f8fafc; border: 1.5px solid #fed7aa; border-radius: 12px; padding: 14px; margin-bottom: 12px;">
          <div style="font-weight: 700; color: #1e293b; margin-bottom: 8px;">${idx + 1}. ${q.text}</div>
          <button type="button" class="btn-adult-home l4-btn" data-q="${idx}" data-choice="A" style="width: 100%; text-align: left; padding: 10px; margin-bottom: 8px; font-weight: 700; font-size: 0.95rem; background: white; border: 2px solid #cbd5e1; border-radius: 8px; cursor: pointer;">
            A: ${q.optA}
          </button>
          <button type="button" class="btn-adult-home l4-btn" data-q="${idx}" data-choice="B" style="width: 100%; text-align: left; padding: 10px; font-weight: 700; font-size: 0.95rem; background: white; border: 2px solid #cbd5e1; border-radius: 8px; cursor: pointer;">
            B: ${q.optB}
          </button>
          <div id="l4exp_${idx}" style="display: none; margin-top: 10px; font-weight: 700; font-size: 0.95rem; padding: 10px; border-radius: 8px;"></div>
        </div>
      `).join('');

      qBox4.querySelectorAll('.l4-btn').forEach(b => {
        b.onclick = () => {
          const qIdx = parseInt(b.getAttribute('data-q'));
          const choice = b.getAttribute('data-choice');
          const q = l4Questions[qIdx];
          const expBox = document.getElementById(`l4exp_${qIdx}`);

          expBox.style.display = 'block';
          if (choice === q.correct) {
            b.style.borderColor = '#10b981';
            b.style.background = '#ecfdf5';
            b.style.color = '#065f46';
            expBox.style.background = '#dcfce7';
            expBox.style.color = '#15803d';
            expBox.innerHTML = `✅ Correct! ${q.exp}`;
          } else {
            b.style.borderColor = '#ef4444';
            b.style.background = '#fef2f2';
            b.style.color = '#991b1b';
            expBox.style.background = '#fee2e2';
            expBox.style.color = '#991b1b';
            expBox.innerHTML = `❌ Dangerous! ${q.exp}`;
          }
        };
      });
    }
  }

  buildAllLevelsShowcase(box) {
    box.style.display = 'block';
    box.innerHTML = `
      <div class="showcase-header">
        <div class="showcase-title-row">
          <div class="showcase-icon-badge">✨</div>
          <div>
            <h3>Interactive Learning Zone for Adults & Grandparents</h3>
            <p>Click on any level tab above to experience animated moving diagrams, prompt studios, document detectives & safety scanners!</p>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px;">
        <div style="background: #eff6ff; border: 2px solid #bfdbfe; border-radius: 16px; padding: 16px; text-align: center;">
          <div style="font-size: 2.2rem; margin-bottom: 6px;"><span class="pulsing-brain">🌱</span></div>
          <strong style="color: #1e3a8a; font-size: 1.05rem; display: block;">Level 1: AI Basics</strong>
          <p style="font-size: 0.9rem; color: #475569; margin-top: 4px;">Animated moving process showing how computers process information.</p>
        </div>

        <div style="background: #f0fdfa; border: 2px solid #99f6e4; border-radius: 16px; padding: 16px; text-align: center;">
          <div style="font-size: 2.2rem; margin-bottom: 6px;">💬</div>
          <strong style="color: #0f766e; font-size: 1.05rem; display: block;">Level 2: Prompting</strong>
          <p style="font-size: 0.9rem; color: #475569; margin-top: 4px;">Interactive prompt upgrade machine & quick practice quizzes.</p>
        </div>

        <div style="background: #faf5ff; border: 2px solid #e9d5ff; border-radius: 16px; padding: 16px; text-align: center;">
          <div style="font-size: 2.2rem; margin-bottom: 6px;"><span class="floating-card">💼</span></div>
          <strong style="color: #6b21a8; font-size: 1.05rem; display: block;">Level 3: Daily Life</strong>
          <p style="font-size: 0.9rem; color: #475569; margin-top: 4px;">AI document detective & live greeting card studio.</p>
        </div>

        <div style="background: #fff7ed; border: 2px solid #fed7aa; border-radius: 16px; padding: 16px; text-align: center;">
          <div style="font-size: 2.2rem; margin-bottom: 6px;">🛡️</div>
          <strong style="color: #c2410c; font-size: 1.05rem; display: block;">Level 4: Safety</strong>
          <p style="font-size: 0.9rem; color: #475569; margin-top: 4px;">Moving laser scanner to protect bank accounts from online scams.</p>
        </div>
      </div>
    `;
  }

  renderLessonsGrid() {
    const container = document.getElementById('adultLessonsGrid');
    if (!container) return;
    container.innerHTML = '';
    this.renderLevelShowcase();

    const list = ADULT_LESSONS_CATALOG.filter(item => {
      if (this.activeLevel === 'all') return true;
      return item.level === parseInt(this.activeLevel);
    });

    const l = AdultState.currentLearner;
    const completedList = l ? l.completedLessons : [];

    if (list.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #64748b; font-size: 1.2rem; background: white; border-radius: 18px; border: 2px dashed #cbd5e1;">
          No lessons found for this level.
        </div>
      `;
      return;
    }

    list.forEach(item => {
      const isDone = completedList.includes(item.id);
      const card = document.createElement('div');
      card.className = `lesson-card ${isDone ? 'completed' : ''}`;

      card.innerHTML = `
        <div>
          <div class="lesson-card-header">
            <div class="lesson-card-icon">${item.icon}</div>
            <span class="lesson-status-badge ${isDone ? 'done' : ''}">
              ${isDone ? '✓ Completed' : `Level ${item.level}`}
            </span>
          </div>
          <h4>${item.title}</h4>
          <p>${item.subtitle}</p>
        </div>

        <div class="lesson-card-footer">
          <span class="activity-name-tag">
            <span>🛠️</span> ${item.activityName}
          </span>
          <button class="btn-lesson-open">
            ${isDone ? 'Review Lesson ➡️' : 'Start Lesson ➡️'}
          </button>
        </div>
      `;

      card.onclick = () => this.openLesson(item.id);
      container.appendChild(card);
    });
  }

  openLesson(lessonId) {
    const item = ADULT_LESSONS_CATALOG.find(x => x.id === parseInt(lessonId));
    if (!item) return;

    this.currentLesson = item;
    this.currentTab = 'all';

    const modal = document.getElementById('adultStudyModal');
    if (!modal) return;

    document.getElementById('modalLessonTitle').innerText = item.title;
    document.getElementById('modalLessonSubtitle').innerText = item.subtitle;

    this.updateTabButtons();
    this.renderCurrentTab();

    modal.classList.remove('hidden');

    const modalBox = modal.querySelector('.adult-study-box');
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

  renderCurrentTab() {
    const panel = document.getElementById('modalTabContent');
    if (!panel || !this.currentLesson) return;
    const item = this.currentLesson;

    if (this.currentTab === 'all') {
      this.renderFullLessonFlow(panel, item);
      return;
    }

    if (this.currentTab === 'basics') {
      panel.innerHTML = `
        <div class="study-section-title">
          <span>📖</span> Step 1: Learn the Basics
        </div>
        <p style="font-size: 1.22rem; line-height: 1.85; margin-bottom: 20px; color: #1e293b;">
          ${item.basics}
        </p>
        
        <div class="study-info-callout" style="background: #f8fafc; border-left: 5px solid #2563eb; padding: 16px 20px; border-radius: 12px; margin-bottom: 20px;">
          <strong style="color: #1e40af; font-size: 1.1rem;">💡 Key Takeaway:</strong> 
          <span style="font-size: 1.1rem; color: #1e293b;">AI is not magic; it is simply smart software designed to help you accomplish everyday tasks faster and with less stress.</span>
        </div>

        <div style="background: #eff6ff; border-left: 5px solid #3b82f6; padding: 18px 22px; border-radius: 14px; margin-top: 18px;">
          <strong style="color: #1e40af; font-size: 1.1rem;">🎯 Quick Summary:</strong>
          <p style="margin-top: 6px; font-size: 1.15rem; color: #1e293b; line-height: 1.75;">${item.quickSummary || item.basics}</p>
        </div>
      `;
    } else if (this.currentTab === 'realLife') {
      panel.innerHTML = `
        <div class="study-section-title">
          <span>💡</span> Step 2: Real-Life Everyday Example
        </div>
        <div style="background: #ffffff; border: 2.5px solid #86efac; border-radius: 18px; padding: 24px; box-shadow: 0 4px 14px rgba(0,0,0,0.05); margin-bottom: 16px;">
          <h4 style="color: #15803d; font-size: 1.25rem; margin-bottom: 10px; font-weight: 800;">How this applies to your daily life:</h4>
          <p style="font-size: 1.18rem; line-height: 1.8; color: #1e293b;">
            ${item.realLife}
          </p>
        </div>
        <p style="color: #64748b; font-size: 1.05rem;">
          Notice how you don't need any technical coding background. You simply use it naturally as part of your smartphone routine!
        </p>
      `;
    } else if (this.currentTab === 'understand') {
      let stepsHtml = '';
      if (item.steps) {
        stepsHtml = item.steps.map(s => `
          <div class="interactive-step-card" id="stepCard_${s.step}" style="background: white; border: 2px solid #e2e8f0; border-radius: 16px; padding: 20px; margin-bottom: 14px; display: flex; gap: 16px; align-items: center; transition: all 0.3s;">
            <div class="step-num-bubble" style="width: 44px; height: 44px; border-radius: 50%; background: #1e3a8a; color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.2rem; flex-shrink: 0; transition: all 0.3s;">
              ${s.step}
            </div>
            <div>
              <h4 style="font-size: 1.15rem; color: #0f172a; margin-bottom: 4px;">${s.title}</h4>
              <p style="font-size: 1.05rem; color: #475569; margin: 0;">${s.text}</p>
            </div>
          </div>
        `).join('');
      }

      panel.innerHTML = `
        <div class="study-section-title">
          <span>🔍</span> Watch & Understand: Visual Demonstration
        </div>
        
        <div style="background: #eff6ff; border: 2px solid #bfdbfe; border-radius: 18px; padding: 20px; margin-bottom: 22px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="font-size: 2.6rem;">
              <span class="pulsing-brain">🧠</span><span class="spinning-gear" style="font-size: 1.7rem; margin-left: -8px;">⚙️</span>
            </div>
            <div>
              <h4 style="color: #1e3a8a; font-size: 1.2rem; margin-bottom: 3px;">Interactive Process Visualizer</h4>
              <p style="color: #475569; font-size: 0.98rem; margin: 0;" id="understandAnimStatus">
                Tap the button to watch the steps light up and move forward!
              </p>
            </div>
          </div>
          <button type="button" class="btn-lesson-open" id="btnPlayStepsAnim" style="background: #2563eb; padding: 10px 22px; font-size: 1rem; cursor: pointer;">
              ▶️ Watch Step Animation
          </button>
        </div>

        <div id="stepsContainer">${stepsHtml}</div>
      `;

      const btnAnim = document.getElementById('btnPlayStepsAnim');
      const animStatus = document.getElementById('understandAnimStatus');
      if (btnAnim && item.steps) {
        btnAnim.onclick = () => {
          btnAnim.disabled = true;
          item.steps.forEach((s, idx) => {
            setTimeout(() => {
              item.steps.forEach(st => {
                const c = document.getElementById(`stepCard_${st.step}`);
                if (c) {
                  c.style.borderColor = '#e2e8f0';
                  c.style.background = 'white';
                  c.style.transform = 'scale(1)';
                }
              });

              const curCard = document.getElementById(`stepCard_${s.step}`);
              if (curCard) {
                curCard.style.borderColor = '#2563eb';
                curCard.style.background = '#eff6ff';
                curCard.style.transform = 'scale(1.02)';
                if (animStatus) animStatus.innerText = `Active: Step ${s.step} - ${s.title}...`;
              }

              if (idx === item.steps.length - 1) {
                setTimeout(() => {
                  if (curCard) {
                    curCard.style.borderColor = '#10b981';
                    curCard.style.background = '#ecfdf5';
                  }
                  if (animStatus) animStatus.innerText = "✓ Complete! Now proceed to Tab 4 to try it yourself!";
                  btnAnim.disabled = false;
                }, 1000);
              }
            }, idx * 1100);
          });
        };
      }
    } else if (this.currentTab === 'activity') {
      this.renderInteractiveActivity(panel, item);
    } else if (this.currentTab === 'quiz') {
      this.renderKnowledgeCheck(panel, item);
    }
  }

  renderFullLessonFlow(panel, item) {
    let stepsHtml = '';
    if (item.steps && item.steps.length > 0) {
      stepsHtml = `
        <div class="study-flow-section" id="section_understand" style="margin-top: 36px; padding-top: 24px; border-top: 2px dashed #e2e8f0;">
          <div class="study-section-title">
            <span>🔍</span> Step 2: Visual Demonstration (How It Works)
          </div>
          
          <div style="background: #eff6ff; border: 2px solid #bfdbfe; border-radius: 18px; padding: 20px; margin-bottom: 22px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
            <div style="display: flex; align-items: center; gap: 14px;">
              <div style="font-size: 2.6rem;">
                <span class="pulsing-brain">🧠</span><span class="spinning-gear" style="font-size: 1.7rem; margin-left: -8px;">⚙️</span>
              </div>
              <div>
                <h4 style="color: #1e3a8a; font-size: 1.2rem; margin-bottom: 3px;">Interactive Process Visualizer</h4>
                <p style="color: #475569; font-size: 0.98rem; margin: 0;" id="understandAnimStatus">
                  Tap the button to watch the steps light up and move forward!
                </p>
              </div>
            </div>
            <button type="button" class="btn-lesson-open" id="btnPlayStepsAnim" style="background: #2563eb; padding: 10px 22px; font-size: 1rem; cursor: pointer;">
              ▶️ Watch Step Animation
            </button>
          </div>

          <div id="stepsContainer">
            ${item.steps.map(s => `
              <div class="interactive-step-card" id="stepCard_${s.step}" style="background: white; border: 2px solid #e2e8f0; border-radius: 16px; padding: 20px; margin-bottom: 14px; display: flex; gap: 16px; align-items: center; transition: all 0.3s;">
                <div class="step-num-bubble" style="width: 44px; height: 44px; border-radius: 50%; background: #1e3a8a; color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.2rem; flex-shrink: 0; transition: all 0.3s;">
                  ${s.step}
                </div>
                <div>
                  <h4 style="font-size: 1.15rem; color: #0f172a; margin-bottom: 4px;">${s.title}</h4>
                  <p style="font-size: 1.05rem; color: #475569; margin: 0;">${s.text}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    panel.innerHTML = `
      <!-- Senior Learning Guide Banner -->
      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%); border: 2.5px solid #93c5fd; border-radius: 18px; padding: 18px 24px; margin-bottom: 28px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; box-shadow: 0 4px 12px rgba(37,99,235,0.06);">
        <div style="display: flex; align-items: center; gap: 14px;">
          <span style="font-size: 2.4rem;">🌸</span>
          <div>
            <h4 style="margin: 0; color: #1e3a8a; font-size: 1.25rem; font-weight: 800;">
              Full Step-by-Step Learning & Hands-On Practice
            </h4>
            <p style="margin: 4px 0 0 0; color: #334155; font-size: 1rem; line-height: 1.5;">
              Read the concept below, answer the review questions, and immediately try the interactive tool after each question!
            </p>
          </div>
        </div>
        <button type="button" class="btn-adult-home" id="btnJumpToQuiz" style="background: #2563eb; color: white; border: none; padding: 10px 20px; font-weight: 800; font-size: 0.95rem; cursor: pointer; border-radius: 12px;">
          ⚡ Jump to Questions & Activities 👇
        </button>
      </div>

      <!-- Section 1: Basics -->
      <div class="study-flow-section" id="section_basics">
        <div class="study-section-title">
          <span>📖</span> Step 1: Learn the Basics
        </div>
        <p style="font-size: 1.22rem; line-height: 1.85; margin-bottom: 20px; color: #1e293b;">
          ${item.basics}
        </p>
        
        <div class="study-info-callout" style="background: #f8fafc; border-left: 5px solid #2563eb; padding: 16px 20px; border-radius: 12px; margin-bottom: 20px;">
          <strong style="color: #1e40af; font-size: 1.1rem;">💡 Key Takeaway:</strong> 
          <span style="font-size: 1.1rem; color: #1e293b;">AI is not magic; it is simply smart software designed to help you accomplish everyday tasks faster and with less stress.</span>
        </div>

        <div style="background: #eff6ff; border-left: 5px solid #3b82f6; padding: 18px 22px; border-radius: 14px; margin-bottom: 20px;">
          <strong style="color: #1e40af; font-size: 1.1rem;">🎯 Quick Summary:</strong>
          <p style="margin-top: 6px; font-size: 1.15rem; color: #1e293b; line-height: 1.75;">${item.quickSummary || item.basics}</p>
        </div>
      </div>

      <!-- Section 2: Real-Life Situation -->
      <div class="study-flow-section" id="section_realLife" style="margin-top: 36px; padding-top: 24px; border-top: 2px dashed #e2e8f0;">
        <div class="study-section-title">
          <span>💡</span> Real-Life Everyday Example
        </div>
        <div style="background: #ffffff; border: 2.5px solid #86efac; border-radius: 18px; padding: 24px; box-shadow: 0 4px 14px rgba(0,0,0,0.05); margin-bottom: 16px;">
          <h4 style="color: #15803d; font-size: 1.25rem; margin-bottom: 10px; font-weight: 800;">How this applies to your daily life:</h4>
          <p style="font-size: 1.18rem; line-height: 1.8; color: #1e293b;">
            ${item.realLife}
          </p>
        </div>
        <p style="color: #64748b; font-size: 1.05rem;">
          Notice how you don't need to know technical coding to benefit from this tool. You simply use it naturally as part of your smartphone routine.
        </p>
      </div>

      <!-- Optional Section: Visual Demonstration Steps -->
      ${stepsHtml}

      <!-- Section 3: Questions & Hands-On Activities (Directly After Each Question!) -->
      <div class="study-flow-section" id="section_quiz" style="margin-top: 40px; padding-top: 28px; border-top: 3px solid #93c5fd;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
          <div class="study-section-title" style="margin: 0; color: #1e3a8a;">
            <span>📝</span> Step 3: Knowledge Check Questions & Interactive Activities
          </div>
          <span style="background: #eff6ff; color: #1d4ed8; padding: 4px 14px; border-radius: 9999px; font-weight: 800; font-size: 0.9rem; border: 1.5px solid #bfdbfe;">
            Interactive Practice Below Each Question
          </span>
        </div>
        <p style="font-size: 1.12rem; color: #475569; margin-bottom: 24px;">
          Select your answer for each question to see instant feedback and explanation, then practice directly with the live interactive tool below!
        </p>
        <div id="flowQuestionsContainer"></div>
      </div>

      <!-- Section 4: Mark Lesson Completed -->
      <div class="study-flow-section" id="section_complete" style="margin-top: 40px; padding: 32px 24px; background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border: 3px solid #86efac; border-radius: 20px; text-align: center; box-shadow: 0 8px 24px rgba(16,185,129,0.1);">
        <div style="font-size: 3.2rem; margin-bottom: 10px;">🎉⭐</div>
        <h3 style="color: #166534; font-size: 1.55rem; font-weight: 800; margin-bottom: 8px;">
          Great Job! You Explored the Lesson & Interactive Practice!
        </h3>
        <p style="color: #374151; font-size: 1.12rem; max-width: 620px; margin: 0 auto 24px auto; line-height: 1.75;">
          You reviewed the concept, verified your understanding on the question, and explored the hands-on activity. Click below to record your completion and earn +10 Stars!
        </p>
        <button type="button" class="btn-lesson-open btn-complete-flow-action" style="background: #059669; color: white; padding: 14px 34px; font-size: 1.25rem; font-weight: 800; border-radius: 16px; cursor: pointer; box-shadow: 0 6px 18px rgba(5,150,105,0.3); border: none;">
          ✓ Mark Lesson Completed (+10 ⭐)
        </button>
      </div>
    `;

    // Hook up Jump button
    const btnJump = panel.querySelector('#btnJumpToQuiz');
    if (btnJump) {
      btnJump.onclick = () => {
        const qSec = document.getElementById('section_quiz');
        if (qSec) qSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
    }

    // Hook up Step Animation if steps exist
    const btnAnim = panel.querySelector('#btnPlayStepsAnim');
    const animStatus = panel.querySelector('#understandAnimStatus');
    if (btnAnim && item.steps) {
      btnAnim.onclick = () => {
        btnAnim.disabled = true;
        item.steps.forEach((s, idx) => {
          setTimeout(() => {
            item.steps.forEach(st => {
              const c = panel.querySelector(`#stepCard_${st.step}`);
              if (c) {
                c.style.borderColor = '#e2e8f0';
                c.style.background = 'white';
                c.style.transform = 'scale(1)';
              }
            });

            const curCard = panel.querySelector(`#stepCard_${s.step}`);
            if (curCard) {
              curCard.style.borderColor = '#2563eb';
              curCard.style.background = '#eff6ff';
              curCard.style.transform = 'scale(1.02)';
              if (animStatus) animStatus.innerText = `Active: Step ${s.step} - ${s.title}...`;
            }

            if (idx === item.steps.length - 1) {
              setTimeout(() => {
                if (curCard) {
                  curCard.style.borderColor = '#10b981';
                  curCard.style.background = '#ecfdf5';
                }
                if (animStatus) animStatus.innerText = "✓ Complete! Now scroll down to answer the questions and practice!";
                btnAnim.disabled = false;
              }, 1000);
            }
          }, idx * 1100);
        });
      };
    }

    // Hook up Questions & Interactive Activities
    const qContainer = panel.querySelector('#flowQuestionsContainer');
    if (qContainer && item.quiz) {
      item.quiz.forEach((qObj, qIdx) => {
        const qBlock = document.createElement('div');
        qBlock.className = 'quiz-q-block';
        qBlock.style.cssText = 'background: #f8fafc; border: 2.5px solid #cbd5e1; border-radius: 18px; padding: 22px; margin-bottom: 18px;';
        qBlock.innerHTML = `
          <div class="quiz-q-title" style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin-bottom: 14px;">
            ❓ Question ${qIdx + 1}: ${qObj.q}
          </div>
          <div class="quiz-opts-list"></div>
          <div class="quiz-explanation-box" style="display: none; margin-top: 14px; font-size: 1.08rem; padding: 14px 18px; border-radius: 12px; font-weight: 700;"></div>
        `;

        const optsList = qBlock.querySelector('.quiz-opts-list');
        const expBox = qBlock.querySelector('.quiz-explanation-box');

        qObj.options.forEach((optText, optIdx) => {
          const btn = document.createElement('button');
          btn.className = 'quiz-opt-btn';
          btn.innerText = optText;
          btn.onclick = () => {
            optsList.querySelectorAll('button').forEach(b => b.classList.remove('correct', 'wrong'));
            expBox.style.display = 'block';
            if (optIdx === qObj.answer) {
              btn.classList.add('correct');
              expBox.style.background = '#dcfce7';
              expBox.style.borderColor = '#86efac';
              expBox.style.color = '#15803d';
              expBox.innerHTML = `✅ Correct! ${qObj.exp}` + (item.level >= 2 ? `<div style="margin-top: 8px; font-weight: 800; color: #15803d;">👇 Great job! Now practice what you learned in the interactive activity directly below:</div>` : '');
            } else {
              btn.classList.add('wrong');
              expBox.style.background = '#fee2e2';
              expBox.style.borderColor = '#fca5a5';
              expBox.style.color = '#991b1b';
              expBox.innerHTML = `❌ Try again! ${qObj.exp}`;
            }
          };
          optsList.appendChild(btn);
        });

        qContainer.appendChild(qBlock);

        // Render interactive activity card right after this question!
        const actCard = document.createElement('div');
        actCard.className = 'post-question-activity-card';
        actCard.style.cssText = 'margin-top: 16px; margin-bottom: 32px; background: #ffffff; border: 3px solid #3b82f6; border-radius: 20px; padding: 24px; box-shadow: 0 8px 24px rgba(37,99,235,0.08);';
        actCard.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; flex-wrap: wrap; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 2rem;">🛠️</span>
              <div>
                <h4 style="margin: 0; color: #1e3a8a; font-size: 1.25rem; font-weight: 800;">
                  Interactive Activity: ${item.activityName}
                </h4>
                <p style="margin: 3px 0 0 0; font-size: 0.98rem; color: #475569;">
                  ${item.level >= 2 ? `👇 Practice what you learned in Question ${qIdx + 1} with this live interactive simulation:` : `Practice what you learned with this simple activity below:`}
                </p>
              </div>
            </div>
            <span style="background: #eff6ff; color: #1d4ed8; border: 1.5px solid #bfdbfe; padding: 4px 14px; border-radius: 9999px; font-weight: 800; font-size: 0.85rem;">
              Interactive Simulation
            </span>
          </div>
          <div class="simulator-box" id="flowActBox_${qIdx}"></div>
        `;
        qContainer.appendChild(actCard);

        const targetBox = actCard.querySelector(`#flowActBox_${qIdx}`);
        if (targetBox) {
          this.mountInteractiveActivity(targetBox, item);
        }
      });
    }

    // Hook up Complete button in flow
    const flowCompleteBtn = panel.querySelector('.btn-complete-flow-action');
    if (flowCompleteBtn) {
      flowCompleteBtn.onclick = () => {
        const bottomComplete = document.getElementById('btnCompleteLesson');
        if (bottomComplete) {
          bottomComplete.click();
        } else {
          AdultState.markLessonComplete(this.currentLesson.id);
          this.setupHUD();
          this.renderLessonsGrid();
          const modal = document.getElementById('adultStudyModal');
          if (modal) modal.classList.add('hidden');
        }
      };
    }
  }

  renderInteractiveActivity(panel, item) {
    panel.innerHTML = `
      <div class="study-section-title">
        <span>🛠️</span> Practical Activity: ${item.activityName}
      </div>
      <p style="margin-bottom: 16px; font-size: 1.1rem; color: #475569;">
        Practice makes learning permanent! Complete this quick simulation below:
      </p>
      <div class="simulator-box" id="activitySimBox"></div>
    `;

    const box = document.getElementById('activitySimBox');
    if (!box) return;
    this.mountInteractiveActivity(box, item);
  }

  mountInteractiveActivity(box, item) {
    if (!box || !item) return;

    // Route to specialized adult interactive simulators
    switch (item.activityType) {
      case "quiz_choice":
        this.buildQuizChoiceActivity(box, item.activityData);
        break;
      case "scene_spotter":
        this.buildSceneSpotterActivity(box, item.activityData);
        break;
      case "sorter_game":
        this.buildSorterActivity(box, item.activityData);
        break;
      case "order_steps":
        this.buildOrderStepsActivity(box, item.activityData);
        break;
      case "match_tools":
        this.buildMatchToolsActivity(box, item.activityData);
        break;
      case "simulated_chat":
        this.buildSimulatedChatActivity(box, item.activityData);
        break;
      case "prompt_upgrade":
        this.buildPromptUpgradeActivity(box, item.activityData);
        break;
      case "letter_builder":
        this.buildLetterBuilderActivity(box, item.activityData);
        break;
      case "tutor_sim":
        this.buildTutorSimActivity(box, item.activityData);
        break;
      case "translator_sandbox":
        this.buildTranslatorActivity(box, item.activityData);
        break;
      case "planner_sim":
        this.buildPlannerSimActivity(box, item.activityData);
        break;
      case "card_creator":
        this.buildCardCreatorActivity(box, item.activityData);
        break;
      case "doc_summary":
        this.buildDocSummaryActivity(box, item.activityData);
        break;
      case "biz_post_maker":
        this.buildBizPostActivity(box, item.activityData);
        break;
      case "daily_planner":
        this.buildDailyPlannerActivity(box, item.activityData);
        break;
      case "scam_detector":
        this.buildScamDetectorActivity(box, item.activityData);
        break;
      case "health_explainer":
        this.buildHealthExplainerActivity(box, item.activityData);
        break;
      case "farmer_scenario":
        this.buildFarmerScenarioActivity(box, item.activityData);
        break;
      case "safety_auditor":
        this.buildSafetyAuditorActivity(box, item.activityData);
        break;
      case "future_reflection":
        this.buildFutureReflectionActivity(box, item.activityData);
        break;
      default:
        box.innerHTML = `<p>Interactive activity ready!</p>`;
    }
  }

  // --- Specialized Simulators ---

  buildQuizChoiceActivity(box, data) {
    box.innerHTML = `
      <h4 style="font-size: 1.15rem; color: #0f172a; margin-bottom: 14px;">${data.question}</h4>
      <div id="choiceOpts"></div>
      <div id="choiceFeedback" class="quiz-explanation-box"></div>
    `;
    const optsDiv = box.querySelector('#choiceOpts') || document.getElementById('choiceOpts');
    const fb = box.querySelector('#choiceFeedback') || document.getElementById('choiceFeedback');

    data.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.innerText = opt.text;
      btn.onclick = () => {
        document.querySelectorAll('#choiceOpts button').forEach(b => b.classList.remove('correct', 'wrong'));
        fb.style.display = 'block';
        if (opt.isCorrect) {
          btn.classList.add('correct');
          fb.style.background = '#dcfce7';
          fb.style.borderColor = '#86efac';
          fb.style.color = '#15803d';
          fb.innerHTML = `✅ ${opt.reason}`;
        } else {
          btn.classList.add('wrong');
          fb.style.background = '#fee2e2';
          fb.style.borderColor = '#fca5a5';
          fb.style.color = '#991b1b';
          fb.innerHTML = `❌ ${opt.reason}`;
        }
      };
      optsDiv.appendChild(btn);
    });
  }

  buildSceneSpotterActivity(box, data) {
    box.innerHTML = `
      <h4 style="font-size: 1.15rem; margin-bottom: 12px;">${data.prompt}</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;" id="spotterGrid"></div>
      <div id="spotterFeedback" class="quiz-explanation-box" style="margin-top: 14px;"></div>
    `;
    const grid = box.querySelector('#spotterGrid') || document.getElementById('spotterGrid');
    const fb = box.querySelector('#spotterFeedback') || document.getElementById('spotterFeedback');

    data.items.forEach(item => {
      const b = document.createElement('button');
      b.className = 'quiz-opt-btn';
      b.style.textAlign = 'center';
      b.innerHTML = `<div style="font-size: 2.2rem;">${item.icon}</div><strong>${item.name}</strong>`;
      b.onclick = () => {
        fb.style.display = 'block';
        if (item.isAI) {
          b.classList.add('correct');
          fb.innerHTML = `✅ <strong>${item.name}:</strong> Uses AI! ${item.desc}`;
        } else {
          b.classList.add('wrong');
          fb.innerHTML = `ℹ️ <strong>${item.name}:</strong> Not AI. ${item.desc}`;
        }
      };
      grid.appendChild(b);
    });
  }

  buildSorterActivity(box, data) {
    box.innerHTML = `
      <h4 style="font-size: 1.15rem; margin-bottom: 14px;">${data.prompt}</h4>
      <div id="sorterTasks"></div>
    `;
    const div = box.querySelector('#sorterTasks') || document.getElementById('sorterTasks');
    data.tasks.forEach((t, idx) => {
      const row = document.createElement('div');
      row.style.background = 'white';
      row.style.border = '2px solid #e2e8f0';
      row.style.borderRadius = '14px';
      row.style.padding = '16px';
      row.style.marginBottom = '12px';

      row.innerHTML = `
        <div style="font-weight: 800; font-size: 1.1rem; color: #0f172a; margin-bottom: 10px;">${idx + 1}. ${t.task}</div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button class="btn-adult-home" data-ans="Human" style="cursor: pointer;">👤 Human</button>
          <button class="btn-adult-home" data-ans="AI" style="cursor: pointer;">🤖 AI</button>
          <button class="btn-adult-home" data-ans="Both" style="cursor: pointer;">🤝 Both</button>
        </div>
        <div class="sorter-res" style="display: none; margin-top: 10px; font-weight: 700;"></div>
      `;

      row.querySelectorAll('button').forEach(btn => {
        btn.onclick = () => {
          const res = row.querySelector('.sorter-res');
          res.style.display = 'block';
          if (btn.getAttribute('data-ans') === t.answer) {
            btn.style.background = '#dcfce7';
            res.style.color = '#15803d';
            res.innerHTML = `✅ Correct! ${t.reason}`;
          } else {
            res.style.color = '#b91c1c';
            res.innerHTML = `ℹ️ Best performed by: <strong>${t.answer}</strong>. ${t.reason}`;
          }
        };
      });
      div.appendChild(row);
    });
  }

  buildOrderStepsActivity(box, data) {
    box.innerHTML = `
      <h4 style="font-size: 1.15rem; margin-bottom: 12px;">Arrange the 3 steps in logical order (Input → Processing → Output):</h4>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="background: white; border: 2px solid #cbd5e1; border-radius: 12px; padding: 14px; font-weight: 700;">
          1️⃣ <strong>Input:</strong> You speak "What is today's weather in Mysore?"
        </div>
        <div style="background: white; border: 2px solid #cbd5e1; border-radius: 12px; padding: 14px; font-weight: 700;">
          2️⃣ <strong>Processing:</strong> Phone AI searches meteorological radar data.
        </div>
        <div style="background: white; border: 2px solid #cbd5e1; border-radius: 12px; padding: 14px; font-weight: 700;">
          3️⃣ <strong>Output:</strong> Screen displays "Sunny, 28°C with light breeze".
        </div>
      </div>
      <div style="margin-top: 14px; background: #f0fdf4; border: 2px solid #86efac; border-radius: 12px; padding: 14px; color: #166534; font-weight: 800;">
        ✓ Excellent! Every AI system in the world follows this exact 3-step cycle.
      </div>
    `;
  }

  buildMatchToolsActivity(box, data) {
    box.innerHTML = `
      <h4 style="font-size: 1.15rem; margin-bottom: 12px;">Discover what each major AI assistant does best:</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px;">
        ${data.tools.map(t => `
          <div style="background: white; border: 2px solid #93c5fd; border-radius: 16px; padding: 20px;">
            <h4 style="color: #1e3a8a; font-size: 1.25rem;">${t.name}</h4>
            <span style="font-size: 0.85rem; background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 9999px; font-weight: 700;">By ${t.company}</span>
            <p style="margin-top: 10px; font-size: 1.05rem; color: #334155;"><strong>Best for:</strong> ${t.bestFor}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  buildSimulatedChatActivity(box, data) {
    box.innerHTML = `
      <h4 style="font-size: 1.15rem; margin-bottom: 10px;">Practice asking questions to a simulated ChatGPT assistant:</h4>
      <div class="sim-chat-window" id="adultChatWindow">
        <div class="sim-msg bot">
          👋 Hello! I am your AI assistant. Tap any question below to see how I reply in simple words:
        </div>
      </div>
      <div>
        <span style="font-size: 0.95rem; font-weight: 800; color: #64748b; display: block; margin-bottom: 8px;">Tap a sample question to send:</span>
        ${data.suggestedQuestions.map(q => `
          <button class="sim-prompt-btn" data-q="${q}">💬 "${q}"</button>
        `).join('')}
      </div>
    `;

    const chatWindow = box.querySelector('#adultChatWindow') || document.getElementById('adultChatWindow');
    box.querySelectorAll('.sim-prompt-btn').forEach(btn => {
      btn.onclick = () => {
        const q = btn.getAttribute('data-q');
        const userBubble = document.createElement('div');
        userBubble.className = 'sim-msg user';
        userBubble.innerText = q;
        chatWindow.appendChild(userBubble);

        setTimeout(() => {
          const botBubble = document.createElement('div');
          botBubble.className = 'sim-msg bot';
          botBubble.innerText = data.presetAnswers[q] || "Here is helpful information for your query.";
          chatWindow.appendChild(botBubble);
          chatWindow.scrollTop = 9999;
        }, 300);
      };
    });
  }

  buildPromptUpgradeActivity(box, data) {
    box.innerHTML = `
      <div style="background: white; border: 2px solid #e2e8f0; border-radius: 16px; padding: 20px;">
        <h4 style="font-size: 1.15rem; color: #0d9488; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
          <span>✨</span> Interactive Prompt Maker & Upgrade Studio
        </h4>
        <p style="font-size: 0.95rem; color: #64748b; margin-bottom: 14px;">
          Learn the 3 ingredients of a 5-star prompt: <strong>Role + Context + Clear Request</strong>. Pick an everyday topic to see how AI upgrades your question:
        </p>

        <label style="font-weight: 700; font-size: 0.9rem; color: #475569; display: block; margin-bottom: 6px;">
          Choose an everyday situation to build a prompt for:
        </label>
        <select class="prompt-topic-select" style="width: 100%; padding: 10px 12px; border: 2px solid #cbd5e1; border-radius: 10px; font-size: 0.95rem; font-weight: 700; background: white; margin-bottom: 14px;">
          <option value="knee">🦵 Gentle Knee & Joint Exercise for Seniors</option>
          <option value="cheque">🏦 Requesting a Bank Cheque Book Draft</option>
          <option value="whatsapp">📱 Verifying a Suspicious WhatsApp Forward</option>
          <option value="diet">🥗 Diabetic-Friendly High-Fiber Diet Plan</option>
        </select>

        <div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 12px; padding: 12px 14px; margin-bottom: 12px;">
          <strong style="color: #991b1b; font-size: 0.88rem; text-transform: uppercase;">❌ Weak 1-Word Prompt (What most people type):</strong>
          <p class="weak-prompt-disp" style="font-size: 1.02rem; font-weight: 700; color: #7f1d1d; margin: 4px 0 0 0;">
            "tell me remedy for knee pain"
          </p>
        </div>

        <button type="button" class="btn-lesson-open btn-do-upgrade" style="width: 100%; background: #0d9488; padding: 10px; font-size: 0.98rem; margin-bottom: 12px; cursor: pointer;">
          ✨ Upgrade Prompt with AI ➡️
        </button>

        <div class="upgraded-prompt-card" style="display: none; background: #f0fdf4; border: 2px solid #86efac; border-radius: 12px; padding: 14px; margin-bottom: 12px;">
          <strong style="color: #166534; font-size: 0.88rem; text-transform: uppercase;">✅ 5-Star Upgraded Prompt (How to get the best result):</strong>
          <p class="upgraded-prompt-disp" style="font-size: 0.98rem; font-weight: 700; color: #14532d; margin: 6px 0; line-height: 1.5;"></p>
          <div class="prompt-anatomy-tip" style="font-size: 0.85rem; color: #047857; margin-top: 6px; border-top: 1px dashed #86efac; padding-top: 6px;"></div>
        </div>

        <button type="button" class="btn-adult-home btn-view-ai-answer" style="display: none; width: 100%; background: #eff6ff; color: #1e40af; border: 2px solid #93c5fd; padding: 10px; font-size: 0.95rem; font-weight: 700; cursor: pointer; margin-bottom: 12px;">
          🤖 Show How AI Responds to this 5-Star Prompt ➡️
        </button>

        <div class="ai-answer-preview" style="display: none; background: #f8fafc; border: 2px solid #cbd5e1; border-radius: 12px; padding: 14px; font-size: 0.95rem; line-height: 1.6; color: #1e293b;"></div>
      </div>
    `;

    const topicData = {
      knee: {
        weak: '"tell me remedy for knee pain"',
        upgraded: '"Please act as a caring wellness advisor. Explain 3 safe, gentle seated knee exercises for a 65-year-old at home. Include precautions and what to avoid in simple steps."',
        tip: '💡 <strong>Prompt Recipe:</strong> Role (wellness advisor) + Context (65-year-old at home) + Specifics (3 seated exercises + precautions)',
        answer: 'Here are 3 gentle knee exercises suitable for seniors:\n1. Seated Leg Extensions: While seated straight in a sturdy chair, slowly raise one leg until straight, hold for 3 seconds, then lower gently. Repeat 5 times.\n2. Ankle Rotations: Rotate each foot clockwise 5 times to improve blood circulation.\n3. Gentle Heel Slides: Slide your foot slowly back and forth on the floor.\n⚠️ Note: Always stop if you feel sharp pain, and check with your physician.'
      },
      cheque: {
        weak: '"bank letter"',
        upgraded: '"Please draft a formal, polite letter to my bank branch manager requesting a new 50-leaf cheque book. Mention my account number and request home delivery by registered post."',
        tip: '💡 <strong>Prompt Recipe:</strong> Goal (cheque book request) + Details (50-leaf, registered post) + Tone (formal, polite)',
        answer: 'To,\nThe Branch Manager,\n[Your Bank Name], [Branch Address]\n\nSubject: Request for New 50-Leaf Cheque Book - A/C No: [XXXX-XXXX-XXXX]\n\nDear Sir/Madam,\nI hold a savings account with your branch. I kindly request you to issue a new 50-leaf cheque book for my account and dispatch it to my registered residential address.\n\nThanking you,\nYours sincerely,\n[Your Full Name]'
      },
      whatsapp: {
        weak: '"is message true"',
        upgraded: '"A WhatsApp forward claims the government is distributing free laptops to everyone tomorrow at a link. How can I verify if this is real or a dangerous fake link?"',
        tip: '💡 <strong>Prompt Recipe:</strong> Scenario (WhatsApp forward about free laptops) + Direct Question (how to verify real vs fake link)',
        answer: '💡 Safety Checklist for this WhatsApp Message:\n1. Fact Check: The government announces schemes on official .gov.in websites or television news, never through random WhatsApp links.\n2. Red Flag: Fake messages always promise free money, laptops, or gold to trick people into clicking malicious links.\n3. Action: Delete the message and do NOT forward it to family groups.'
      },
      diet: {
        weak: '"what to eat"',
        upgraded: '"Please suggest 3 traditional, soft, easy-to-digest high-fiber breakfast options suitable for a 60-year-old with mild diabetes. Mention simple ingredients."',
        tip: '💡 <strong>Prompt Recipe:</strong> Specific Age (60-year-old) + Health condition (mild diabetes) + Food type (traditional, soft, high-fiber)',
        answer: '3 Healthy Senior Breakfast Options:\n1. Vegetable Oats Porridge: Oats cooked with finely chopped carrots, beans, and a pinch of cumin.\n2. Moong Dal Steamed Idli: High in protein, light on the stomach, and provides steady energy.\n3. Ragi Malt with Buttermilk: Excellent calcium and fiber for bone strength, served without sugar.'
      }
    };

    const sel = box.querySelector('.prompt-topic-select');
    const weakDisp = box.querySelector('.weak-prompt-disp');
    const upCard = box.querySelector('.upgraded-prompt-card');
    const upDisp = box.querySelector('.upgraded-prompt-disp');
    const tipDisp = box.querySelector('.prompt-anatomy-tip');
    const btnUp = box.querySelector('.btn-do-upgrade');
    const btnAns = box.querySelector('.btn-view-ai-answer');
    const ansDisp = box.querySelector('.ai-answer-preview');

    if (sel && weakDisp && btnUp) {
      sel.onchange = () => {
        const cur = topicData[sel.value] || topicData.knee;
        weakDisp.innerText = cur.weak;
        if (upCard) upCard.style.display = 'none';
        if (btnAns) btnAns.style.display = 'none';
        if (ansDisp) ansDisp.style.display = 'none';
      };

      btnUp.onclick = () => {
        const cur = topicData[sel.value] || topicData.knee;
        if (upCard && upDisp && tipDisp) {
          upCard.style.display = 'block';
          upDisp.innerText = cur.upgraded;
          tipDisp.innerHTML = cur.tip;
        }
        if (btnAns) btnAns.style.display = 'block';
      };

      if (btnAns && ansDisp) {
        btnAns.onclick = () => {
          const cur = topicData[sel.value] || topicData.knee;
          ansDisp.style.display = 'block';
          ansDisp.innerHTML = `<strong>🤖 Simulated AI Response:</strong><p style="margin-top: 6px; white-space: pre-line;">${cur.answer}</p>`;
        };
      }
    }
  }

  buildLetterBuilderActivity(box, data) {
    box.innerHTML = `
      <h4 style="font-size: 1.15rem; margin-bottom: 10px;">Select a letter type to generate an instant formal draft:</h4>
      <div style="display: flex; gap: 10px; margin-bottom: 14px; flex-wrap: wrap;">
        ${data.templateTypes.map((t, i) => `
          <button class="btn-adult-home ${i === 0 ? 'active' : ''}" data-tid="${t.id}" style="cursor: pointer; font-weight: 800;">
            ${t.name}
          </button>
        `).join('')}
      </div>
      <div style="background: white; border: 2px solid #cbd5e1; border-radius: 16px; padding: 20px; font-family: monospace; font-size: 1.05rem; white-space: pre-wrap; line-height: 1.6;" id="letterOutputBox">
        ${data.sampleOutput['leave']}
      </div>
    `;

    const outBox = box.querySelector('#letterOutputBox') || document.getElementById('letterOutputBox');
    box.querySelectorAll('button[data-tid]').forEach(btn => {
      btn.onclick = () => {
        box.querySelectorAll('button[data-tid]').forEach(b => b.style.background = '#f1f5f9');
        btn.style.background = '#dbeafe';
        const tid = btn.getAttribute('data-tid');
        if (outBox) outBox.innerText = data.sampleOutput[tid];
      };
    });
  }

  buildTutorSimActivity(box, data) {
    box.innerHTML = `
      <h4 style="font-size: 1.15rem; margin-bottom: 12px;">Choose a topic you want AI to explain simply:</h4>
      <div style="display: flex; gap: 10px; margin-bottom: 14px; flex-wrap: wrap;">
        ${data.topics.map((t, i) => `
          <button class="btn-adult-home" data-idx="${i}" style="cursor: pointer; font-weight: 800;">
            ${t.title}
          </button>
        `).join('')}
      </div>
      <div id="tutorExplBox" style="background: white; border: 2.5px solid #86efac; border-radius: 16px; padding: 22px; font-size: 1.15rem; line-height: 1.8;">
        ${data.topics[0].explanation}
      </div>
    `;

    const tutorBox = box.querySelector('#tutorExplBox') || document.getElementById('tutorExplBox');
    box.querySelectorAll('button[data-idx]').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.getAttribute('data-idx'));
        if (tutorBox) tutorBox.innerText = data.topics[idx].explanation;
      };
    });
  }

  buildTranslatorActivity(box, data) {
    const list = data.presetTranslations || [];
    let curIdx = 0;

    const renderTranslation = (idx) => {
      curIdx = idx;
      const cur = list[curIdx] || {
        source: "Public Circular: Please be apprised that scheduled transmission pipeline maintenance will necessitate temporary suspension of services on Saturday.",
        simpleEnglish: "Notice: Water supply will be turned off this Saturday for repair work. Please store enough water in advance.",
        bulletSummary: "• Reason: Pipeline maintenance\n• When: This Saturday\n• Action Needed: Store drinking water beforehand"
      };

      box.innerHTML = `
        <h4 style="font-size: 1.15rem; margin-bottom: 12px; color: #1e3a8a;">AI Notice Simplifier & Plain English Converter:</h4>
        
        <div style="display: flex; gap: 8px; margin-bottom: 14px; flex-wrap: wrap;">
          ${list.map((item, i) => `
            <button class="btn-adult-home select-notice-btn ${i === curIdx ? 'active' : ''}" data-idx="${i}" style="cursor: pointer; padding: 6px 14px; font-size: 0.95rem; font-weight: 700; background: ${i === curIdx ? '#1e3a8a' : '#f1f5f9'}; color: ${i === curIdx ? 'white' : '#334155'}; border: 1.5px solid #cbd5e1; border-radius: 8px;">
              Sample Notice ${i + 1}
            </button>
          `).join('')}
        </div>

        <div style="background: white; border: 2px solid #cbd5e1; border-radius: 14px; padding: 18px; margin-bottom: 14px;">
          <strong style="color: #1e3a8a;">Original Formal English Circular:</strong>
          <p style="margin-top: 6px; font-size: 1.1rem; color: #334155; line-height: 1.6;" id="transSourceText">${cur.source}</p>
        </div>

        <div style="display: flex; gap: 10px; margin-bottom: 14px; flex-wrap: wrap;">
          <button class="btn-lesson-open" id="btnShowSimple">Convert to Simple Everyday English ➡️</button>
          <button class="btn-lesson-open" id="btnShowBullets" style="background: #0d9488;">Convert to Action Points Summary ➡️</button>
        </div>

        <div id="transOutputBox" style="background: #f0fdf4; border: 2px solid #86efac; border-radius: 14px; padding: 18px; font-size: 1.15rem; font-weight: 700; color: #166534; line-height: 1.7; white-space: pre-line;">
          ${cur.simpleEnglish}
        </div>
      `;

      box.querySelectorAll('.select-notice-btn').forEach(btn => {
        btn.onclick = () => {
          const newIdx = parseInt(btn.getAttribute('data-idx'));
          renderTranslation(newIdx);
        };
      });

      const btnSimple = box.querySelector('#btnShowSimple') || document.getElementById('btnShowSimple');
      const btnBullets = box.querySelector('#btnShowBullets') || document.getElementById('btnShowBullets');
      const outputBox = box.querySelector('#transOutputBox') || document.getElementById('transOutputBox');

      if (btnSimple && outputBox) {
        btnSimple.onclick = () => {
          outputBox.innerText = cur.simpleEnglish;
        };
      }
      if (btnBullets && outputBox) {
        btnBullets.onclick = () => {
          outputBox.innerText = cur.bulletSummary;
        };
      }
    };

    renderTranslation(0);
  }

  buildPlannerSimActivity(box, data) {
    box.innerHTML = `
      <div style="background: white; border: 2px solid #e2e8f0; border-radius: 18px; padding: 22px;">
        <h4 style="font-size: 1.15rem; color: #1e3a8a; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
          <span>📅</span> Senior Daily Routine & Medicine Schedule Builder
        </h4>
        <p style="font-size: 0.95rem; color: #64748b; margin-bottom: 16px;">
          Select your lifestyle pace to generate a comfortable, stress-free daily routine with medicine times and rest breaks:
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin-bottom: 16px;">
          <div>
            <label style="font-size: 0.88rem; font-weight: 800; color: #475569; display: block; margin-bottom: 6px;">Daily Lifestyle Focus:</label>
            <select id="plannerRoutineType" style="width: 100%; padding: 10px; border: 2px solid #cbd5e1; border-radius: 10px; font-weight: 700; font-size: 0.95rem; background: white;">
              <option value="wellness">🌿 Gentle Senior Wellness & Walking</option>
              <option value="errand">🏦 Bank & Morning Errand Day</option>
              <option value="family">🏡 Family & Grandchild Day</option>
            </select>
          </div>
          <div>
            <label style="font-size: 0.88rem; font-weight: 800; color: #475569; display: block; margin-bottom: 6px;">Medicine Timing:</label>
            <select id="plannerMedTiming" style="width: 100%; padding: 10px; border: 2px solid #cbd5e1; border-radius: 10px; font-weight: 700; font-size: 0.95rem; background: white;">
              <option value="both">💊 Morning (8:30 AM) & Night (8:00 PM)</option>
              <option value="morning">💊 Morning Only (8:30 AM after breakfast)</option>
              <option value="night">💊 Night Only (8:00 PM after dinner)</option>
            </select>
          </div>
        </div>

        <button type="button" class="btn-lesson-open" id="btnBuildSchedule" style="width: 100%; background: #2563eb; padding: 11px; font-size: 1rem; margin-bottom: 16px; cursor: pointer;">
          📅 Generate My Balanced Daily Timetable ➡️
        </button>

        <!-- Timetable Result Card -->
        <div id="plannerResultBox" style="background: #f8fafc; border: 2px solid #bfdbfe; border-radius: 14px; padding: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
            <strong style="color: #1e3a8a; font-size: 1.05rem;" id="plannerResultTitle">
              🌿 Senior Wellness & Medicine Day Plan
            </strong>
            <button type="button" id="btnCopyPlannerSchedule" style="background: white; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 6px 12px; font-size: 0.85rem; font-weight: 800; color: #2563eb; cursor: pointer;">
              📋 Copy Schedule
            </button>
          </div>
          <div id="plannerTimetableSlots" style="display: flex; flex-direction: column; gap: 8px;">
            <!-- Rendered Schedule Items -->
          </div>
        </div>
      </div>
    `;

    const scheduleData = {
      wellness: {
        title: "🌿 Senior Wellness & Medicine Day Plan",
        slots: [
          { time: "06:30 AM", act: "🌿 Morning Walk & Warm Water", note: "30 minutes gentle walking in park, deep breathing." },
          { time: "08:00 AM", act: "🥣 Nutritious Breakfast", note: "High-fiber idli, oats, or fresh fruits." },
          { time: "08:30 AM", act: "💊 Morning Medicine Reminder", note: "Take prescribed blood pressure / diabetes tablets." },
          { time: "10:30 AM", act: "📰 News & Light Reading", note: "Relax with newspaper, devotional book, or family calls." },
          { time: "01:00 PM", act: "🍲 Balanced Lunch & Rest", note: "Light lunch followed by 45 minutes of quiet resting." },
          { time: "05:00 PM", act: "☕ Evening Tea & Social Time", note: "Neighbour conversation or gentle garden stroll." },
          { time: "08:00 PM", act: "💊 Evening Medicine & Dinner", note: "Take night tablets with warm water and light dinner." },
          { time: "09:30 PM", act: "🌙 Restful Sleep Routine", note: "Turn off mobile screen 30 minutes before sleep for deep rest." }
        ]
      },
      errand: {
        title: "🏦 Bank & Errand Day Schedule",
        slots: [
          { time: "07:30 AM", act: "🥣 Breakfast & Hydration", note: "Have a nourishing meal before stepping outside." },
          { time: "08:30 AM", act: "💊 Morning Medication", note: "Never miss morning dose before heading out." },
          { time: "10:00 AM", act: "🏦 Bank Branch Errand (Low-Rush Hours)", note: "Visit bank counter during special senior citizen morning hours." },
          { time: "11:30 AM", act: "🛒 Pharmacy / Fresh Grocery Stop", note: "Pick up fresh vegetables and monthly prescription refills." },
          { time: "01:00 PM", act: "🍲 Lunch & Afternoon Cool-Down", note: "Hydrate well and rest to recover energy after errands." },
          { time: "05:30 PM", act: "☕ Evening Tea & Accounts Check", note: "Verify passbook update or receipts calmly at home." },
          { time: "08:00 PM", act: "💊 Evening Medicine & Light Dinner", note: "Take evening doses and have a warm meal." },
          { time: "10:00 PM", act: "🌙 Good Night Rest", note: "Relaxing peaceful sleep." }
        ]
      },
      family: {
        title: "🏡 Family & Grandchild Day Schedule",
        slots: [
          { time: "07:00 AM", act: "🌸 Morning Prayer & Light Walk", note: "Start day with peaceful mindfulness and gentle stretching." },
          { time: "08:30 AM", act: "🥣 Family Breakfast & Medicine", note: "Enjoy morning meal with family and take medicine." },
          { time: "10:30 AM", act: "🎨 Fun Grandchild Storytelling & Puzzles", note: "Share stories, help with puzzles, or teach traditional crafts." },
          { time: "01:00 PM", act: "🍲 Warm Family Lunch", note: "Nutritious meal with loved ones." },
          { time: "02:00 PM", act: "🛋️ Afternoon Nap / Quiet Time", note: "Essential 1-hour rest for bone and joint comfort." },
          { time: "05:30 PM", act: "🌳 Park Visit with Family", note: "Gentle evening stroll with kids in playground." },
          { time: "08:00 PM", act: "💊 Evening Medicine & Dinner", note: "Timely dinner and medicine intake." },
          { time: "09:30 PM", act: "🌙 Peaceful Bedtime", note: "Listen to soothing music and rest well." }
        ]
      }
    };

    const selRoutine = box.querySelector('#plannerRoutineType') || document.getElementById('plannerRoutineType');
    const selMed = box.querySelector('#plannerMedTiming') || document.getElementById('plannerMedTiming');
    const btnGen = box.querySelector('#btnBuildSchedule') || document.getElementById('btnBuildSchedule');
    const titleEl = box.querySelector('#plannerResultTitle') || document.getElementById('plannerResultTitle');
    const slotsEl = box.querySelector('#plannerTimetableSlots') || document.getElementById('plannerTimetableSlots');
    const btnCopy = box.querySelector('#btnCopyPlannerSchedule') || document.getElementById('btnCopyPlannerSchedule');

    const renderTimetable = () => {
      const type = selRoutine ? selRoutine.value : 'wellness';
      const medPref = selMed ? selMed.value : 'both';
      const cur = scheduleData[type] || scheduleData.wellness;

      if (titleEl) titleEl.innerText = cur.title;
      if (!slotsEl) return;

      slotsEl.innerHTML = cur.slots.map(s => {
        let isMed = s.act.includes('💊');
        if (isMed && medPref === 'morning' && s.time.includes('PM')) return '';
        if (isMed && medPref === 'night' && s.time.includes('AM')) return '';

        const badgeColor = isMed ? '#dc2626' : '#2563eb';
        const badgeBg = isMed ? '#fef2f2' : '#eff6ff';
        const borderCol = isMed ? '#fca5a5' : '#bfdbfe';

        return `
          <div style="background: white; border: 1.5px solid ${borderCol}; border-radius: 10px; padding: 10px 14px; display: flex; align-items: flex-start; gap: 12px;">
            <span style="background: ${badgeBg}; color: ${badgeColor}; font-weight: 800; font-size: 0.88rem; padding: 4px 8px; border-radius: 6px; white-space: nowrap; border: 1px solid ${borderCol};">
              ${s.time}
            </span>
            <div style="flex: 1;">
              <strong style="color: #1e293b; font-size: 0.96rem; display: block;">${s.act}</strong>
              <span style="color: #64748b; font-size: 0.86rem;">${s.note}</span>
            </div>
          </div>
        `;
      }).filter(Boolean).join('');
    };

    renderTimetable();

    if (btnGen) {
      btnGen.onclick = () => {
        renderTimetable();
      };
    }

    if (btnCopy) {
      btnCopy.onclick = () => {
        const type = selRoutine ? selRoutine.value : 'wellness';
        const cur = scheduleData[type] || scheduleData.wellness;
        const textToCopy = `${cur.title}\n` + cur.slots.map(s => `• ${s.time}: ${s.act} (${s.note})`).join('\n');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            btnCopy.innerText = "✓ Copied!";
            setTimeout(() => { btnCopy.innerText = "📋 Copy Schedule"; }, 2000);
          }).catch(() => {
            btnCopy.innerText = "✓ Copied!";
            setTimeout(() => { btnCopy.innerText = "📋 Copy Schedule"; }, 2000);
          });
        } else {
          btnCopy.innerText = "✓ Copied!";
          setTimeout(() => { btnCopy.innerText = "📋 Copy Schedule"; }, 2000);
        }
      };
    }
  }

  buildCardCreatorActivity(box, data) {
    box.innerHTML = `
      <h4 style="font-size: 1.15rem; margin-bottom: 12px;">Pick an occasion to generate a personalized greeting card:</h4>
      <div style="display: flex; gap: 10px; margin-bottom: 14px; flex-wrap: wrap;">
        ${data.occasions.map((o, idx) => `
          <button class="btn-adult-home" data-occ="${o}" style="cursor: pointer; font-weight: 800;">${o}</button>
        `).join('')}
      </div>
      <div id="cardResultBox" style="background: white; border: 4px solid #fef08a; border-radius: 20px; padding: 30px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.06);">
        <div style="font-size: 4rem;">🪔✨🌺</div>
        <h3 style="font-size: 1.8rem; color: #1e3a8a; margin: 10px 0;">Happy Deepavali!</h3>
        <p style="font-size: 1.15rem; color: #475569;">May the divine lights illuminate your life with health, wealth, and joy! - From Our Family to Yours.</p>
      </div>
    `;

    box.querySelectorAll('button[data-occ]').forEach(b => {
      b.onclick = () => {
        const occ = b.getAttribute('data-occ');
        const c = data.sampleDesigns[occ];
        const resBox = box.querySelector('#cardResultBox') || document.getElementById('cardResultBox');
        if (resBox) {
          resBox.innerHTML = `
            <div style="font-size: 4rem;">${c.visual}</div>
            <h3 style="font-size: 1.8rem; color: #1e3a8a; margin: 10px 0;">${c.title}</h3>
            <p style="font-size: 1.15rem; color: #475569;">${c.message}</p>
          `;
        }
      };
    });
  }

  buildDocSummaryActivity(box, data) {
    box.innerHTML = `
      <div style="background: white; border: 2px solid #cbd5e1; border-radius: 14px; padding: 18px; margin-bottom: 14px;">
        <strong style="color: #991b1b;">Original Complex Policy Clause:</strong>
        <p style="font-size: 0.98rem; color: #64748b; margin-top: 6px; line-height: 1.6;">${data.fullText}</p>
      </div>
      <button type="button" class="btn-lesson-open btn-scan-doc-summary" style="width: 100%; background: #2563eb; padding: 10px; font-size: 1rem; margin-bottom: 14px; cursor: pointer;">
        🔍 Scan & Extract Key Takeaways with AI ➡️
      </button>
      <div class="doc-summary-output-box" style="background: #f0fdf4; border: 2.5px solid #86efac; border-radius: 16px; padding: 20px;">
        <h4 style="color: #15803d; font-size: 1.15rem; margin-bottom: 10px;">💡 AI Instant Summary (Key Points for You):</h4>
        ${data.summaryPoints.map(p => `
          <div style="font-size: 1.05rem; font-weight: 700; color: #166534; margin-bottom: 8px;">${p}</div>
        `).join('')}
      </div>
    `;

    const btnScan = box.querySelector('.btn-scan-doc-summary');
    const outBox = box.querySelector('.doc-summary-output-box');
    if (btnScan && outBox) {
      btnScan.onclick = () => {
        outBox.innerHTML = `<em>🔍 Scanning document with AI...</em>`;
        setTimeout(() => {
          outBox.innerHTML = `
            <h4 style="color: #15803d; font-size: 1.15rem; margin-bottom: 10px;">💡 AI Instant Summary (Key Points for You):</h4>
            ${data.summaryPoints.map(p => `
              <div style="font-size: 1.05rem; font-weight: 700; color: #166534; margin-bottom: 8px;">${p}</div>
            `).join('')}
          `;
        }, 350);
      };
    }
  }

  buildBizPostActivity(box, data) {
    box.innerHTML = `
      <h4 style="font-size: 1.15rem; margin-bottom: 12px;">Select your business to generate a ready-to-share WhatsApp post:</h4>
      <div style="display: flex; gap: 10px; margin-bottom: 14px; flex-wrap: wrap;">
        ${data.businesses.map((b, idx) => `
          <button class="btn-adult-home" data-bidx="${idx}" style="cursor: pointer; font-weight: 800;">${b.type}</button>
        `).join('')}
      </div>
      <div id="bizPostBox" style="background: white; border: 2px solid #22c55e; border-radius: 16px; padding: 22px; font-size: 1.1rem; white-space: pre-line; line-height: 1.7; color: #0f172a;">
        ${data.businesses[0].samplePost}
      </div>
    `;

    const bizOutput = box.querySelector('#bizPostBox') || document.getElementById('bizPostBox');
    box.querySelectorAll('button[data-bidx]').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.getAttribute('data-bidx'));
        if (bizOutput) bizOutput.innerText = data.businesses[idx].samplePost;
      };
    });
  }

  buildDailyPlannerActivity(box, data) {
    box.innerHTML = `
      <div style="background: #f8fafc; border: 2px solid #cbd5e1; border-radius: 14px; padding: 16px; margin-bottom: 14px;">
        <strong style="color: #475569; font-size: 0.95rem; display: block; margin-bottom: 8px;">Your Errands for Today:</strong>
        ${(data.sampleTasks || []).map(t => `
          <div style="font-size: 0.95rem; color: #1e293b; padding: 4px 0;">• ${t}</div>
        `).join('')}
      </div>
      <button type="button" class="btn-lesson-open btn-opt-schedule" style="width: 100%; background: #2563eb; padding: 10px; font-size: 1rem; margin-bottom: 14px; cursor: pointer;">
        📅 Organize Errands into Optimized Schedule ➡️
      </button>
      <div class="planner-opt-output" style="display: flex; flex-direction: column; gap: 10px;">
        ${data.optimizedSchedule.map(s => `
          <div style="background: white; border: 2px solid #cbd5e1; border-radius: 14px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; gap: 10px;">
            <span style="font-weight: 800; color: #1e3a8a; font-size: 1rem;">${s.time}</span>
            <span style="font-weight: 700; color: #334155; font-size: 0.98rem;">${s.task}</span>
          </div>
        `).join('')}
      </div>
    `;

    const btnOpt = box.querySelector('.btn-opt-schedule');
    const outBox = box.querySelector('.planner-opt-output');
    if (btnOpt && outBox) {
      btnOpt.onclick = () => {
        outBox.innerHTML = `<em>Organizing errands by distance and appointment hours...</em>`;
        setTimeout(() => {
          outBox.innerHTML = data.optimizedSchedule.map(s => `
            <div style="background: white; border: 2px solid #93c5fd; border-radius: 14px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; gap: 10px;">
              <span style="font-weight: 800; color: #1e3a8a; font-size: 1rem;">${s.time}</span>
              <span style="font-weight: 700; color: #334155; font-size: 0.98rem;">${s.task}</span>
            </div>
          `).join('');
        }, 350);
      };
    }
  }

  buildScamDetectorActivity(box, data) {
    box.innerHTML = `
      <div style="background: white; border: 2px solid #e2e8f0; border-radius: 16px; padding: 20px;">
        <h4 style="font-size: 1.15rem; color: #ea580c; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
          <span>🔍</span> Banking Security Patterns & Fraud Detective
        </h4>
        <p style="font-size: 0.95rem; color: #64748b; margin-bottom: 14px;">
          Every online financial scam follows a recognizable <strong>Security Pattern</strong> (False Urgency, Fake Links, or Demanding Secret OTPs). Audit each message below to test your security radar:
        </p>

        <div style="display: flex; flex-direction: column; gap: 14px;">
          ${data.cases.map((c, i) => `
            <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 14px; padding: 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 6px;">
                <span style="font-size: 0.85rem; font-weight: 800; color: #64748b;">${c.sender}</span>
                <span style="font-size: 0.78rem; font-weight: 800; background: ${c.isScam ? '#fee2e2' : '#dcfce7'}; color: ${c.isScam ? '#991b1b' : '#166534'}; padding: 2px 8px; border-radius: 12px;">
                  ${c.isScam ? '⚠️ Suspicious Security Pattern' : '✅ Verified Official Alert'}
                </span>
              </div>
              <div style="font-size: 1rem; font-weight: 700; color: #0f172a; margin: 6px 0 10px 0; line-height: 1.5;">"${c.message}"</div>
              <button type="button" class="btn-adult-home btn-audit-pattern" style="padding: 8px 16px; font-size: 0.92rem; font-weight: 800; background: white; border: 2px solid #cbd5e1; cursor: pointer;">
                🔍 Audit Security Pattern ➡️
              </button>
              <div class="pattern-explanation-box" style="display: none; margin-top: 10px; padding: 12px; border-radius: 10px; font-weight: 700; font-size: 0.95rem; background: ${c.isScam ? '#fef2f2' : '#f0fdf4'}; border: 1.5px solid ${c.isScam ? '#fca5a5' : '#86efac'}; color: ${c.isScam ? '#991b1b' : '#15803d'};">
                ${c.explanation}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    box.querySelectorAll('.btn-audit-pattern').forEach(btn => {
      btn.onclick = () => {
        const expBox = btn.nextElementSibling;
        if (expBox) expBox.style.display = expBox.style.display === 'none' ? 'block' : 'none';
      };
    });
  }

  buildHealthExplainerActivity(box, data) {
    box.innerHTML = `
      <h4 style="font-size: 1.15rem; margin-bottom: 12px;">Common Medical Lab Test Terms Explained Simply:</h4>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${data.terms.map(t => `
          <div style="background: white; border: 2px solid #93c5fd; border-radius: 16px; padding: 18px;">
            <h4 style="color: #1e3a8a; font-size: 1.15rem; margin-bottom: 6px;">🩺 ${t.term}</h4>
            <p style="font-size: 1.05rem; color: #334155;">${t.whatItIs}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  buildFarmerScenarioActivity(box, data) {
    box.innerHTML = `
      <div style="background: white; border: 2px solid #cbd5e1; border-radius: 14px; padding: 18px; margin-bottom: 14px;">
        <strong>Farming Scenario:</strong> ${data.situation}
      </div>
      <h4 style="font-size: 1.15rem; margin-bottom: 12px;">${data.question}</h4>
      <div id="farmOpts"></div>
      <div id="farmFb" class="quiz-explanation-box"></div>
    `;
    const optsDiv = box.querySelector('#farmOpts') || document.getElementById('farmOpts');
    const fb = box.querySelector('#farmFb') || document.getElementById('farmFb');

    data.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.innerText = opt.text;
      btn.onclick = () => {
        fb.style.display = 'block';
        if (opt.isCorrect) {
          fb.style.background = '#dcfce7';
          fb.style.borderColor = '#86efac';
          fb.style.color = '#15803d';
          fb.innerHTML = `✅ ${opt.reason}`;
        } else {
          fb.style.background = '#fee2e2';
          fb.style.borderColor = '#fca5a5';
          fb.style.color = '#991b1b';
          fb.innerHTML = `❌ ${opt.reason}`;
        }
      };
      optsDiv.appendChild(btn);
    });
  }

  buildSafetyAuditorActivity(box, data) {
    box.innerHTML = `
      <div style="background: white; border: 2px solid #e2e8f0; border-radius: 16px; padding: 20px;">
        <h4 style="font-size: 1.15rem; color: #ea580c; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
          <span>🛡️</span> AI Cybersecurity & Deepfake Security Patterns
        </h4>
        <p style="font-size: 0.95rem; color: #64748b; margin-bottom: 14px;">
          Scammers now use AI voice cloning and fake emergency patterns to trick families. Learn how to recognize attack patterns and apply the safe defense:
        </p>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${data.situations.map((s, idx) => `
            <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 14px; padding: 16px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; flex-wrap: wrap; gap: 6px;">
                <span style="font-size: 0.95rem; font-weight: 800; color: #0f172a;">Scenario ${idx + 1}: "${s.text}"</span>
                <span style="font-size: 0.78rem; font-weight: 800; background: ${s.isSafe ? '#dcfce7' : '#fee2e2'}; color: ${s.isSafe ? '#166534' : '#991b1b'}; padding: 3px 8px; border-radius: 12px;">
                  ${s.isSafe ? '🟢 Safe AI Practice' : '🔴 Known Attack Pattern'}
                </span>
              </div>
              <div style="margin-top: 8px; font-size: 0.95rem; color: #15803d; font-weight: 700;">
                🛡️ <strong>Recommended Safe Action:</strong> ${s.safeAction}
              </div>
              <div style="font-size: 0.88rem; color: #64748b; margin-top: 4px;">
                💡 <strong>Security Rule:</strong> ${s.tip}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  buildFutureReflectionActivity(box, data) {
    box.innerHTML = `
      <h4 style="font-size: 1.15rem; margin-bottom: 14px;">${data.reflectionQuestion}</h4>
      <div id="reflOpts"></div>
      <div id="reflFb" class="quiz-explanation-box"></div>
    `;
    const optsDiv = box.querySelector('#reflOpts') || document.getElementById('reflOpts');
    const fb = box.querySelector('#reflFb') || document.getElementById('reflFb');

    data.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.innerText = opt.text;
      btn.onclick = () => {
        fb.style.display = 'block';
        if (opt.isCorrect) {
          fb.style.background = '#dcfce7';
          fb.style.borderColor = '#86efac';
          fb.style.color = '#15803d';
          fb.innerHTML = `✅ ${opt.reason}`;
        } else {
          fb.style.background = '#fee2e2';
          fb.style.borderColor = '#fca5a5';
          fb.style.color = '#991b1b';
          fb.innerHTML = `ℹ️ ${opt.reason}`;
        }
      };
      optsDiv.appendChild(btn);
    });
  }

  renderKnowledgeCheck(panel, item) {
    if (!item.quiz || item.quiz.length === 0) {
      panel.innerHTML = `<p>No quiz for this section.</p>`;
      return;
    }

    panel.innerHTML = `
      <div class="study-section-title">
        <span>📝</span> Knowledge Check (Simple Review Questions)
      </div>
      <div id="quizContainer"></div>
    `;

    const container = document.getElementById('quizContainer');
    item.quiz.forEach((qObj, qIdx) => {
      const qBlock = document.createElement('div');
      qBlock.className = 'quiz-q-block';
      qBlock.innerHTML = `
        <div class="quiz-q-title">Q${qIdx + 1}: ${qObj.q}</div>
        <div class="quiz-opts-list"></div>
        <div class="quiz-explanation-box" style="display: none;"></div>
      `;

      const optsList = qBlock.querySelector('.quiz-opts-list');
      const expBox = qBlock.querySelector('.quiz-explanation-box');

      qObj.options.forEach((optText, optIdx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-opt-btn';
        btn.innerText = optText;
        btn.onclick = () => {
          optsList.querySelectorAll('button').forEach(b => b.classList.remove('correct', 'wrong'));
          expBox.style.display = 'block';
          if (optIdx === qObj.answer) {
            btn.classList.add('correct');
            expBox.style.background = '#dcfce7';
            expBox.style.borderColor = '#86efac';
            expBox.style.color = '#15803d';
            expBox.innerHTML = `✅ Correct! ${qObj.exp}` + (item.level >= 2 ? `<div style="margin-top: 8px; font-weight: 700; color: #15803d;">👇 Great job! Now practice what you learned in the interactive activity below:</div>` : '');
          } else {
            btn.classList.add('wrong');
            expBox.style.background = '#fee2e2';
            expBox.style.borderColor = '#fca5a5';
            expBox.style.color = '#991b1b';
            expBox.innerHTML = `❌ Try again! ${qObj.exp}`;
          }
        };
        optsList.appendChild(btn);
      });

      container.appendChild(qBlock);

      // Level 2 and above (Lessons 6–20): Render interactive activity right after every question
      if (item.level >= 2) {
        const actCard = document.createElement('div');
        actCard.className = 'post-quiz-activity-card';
        actCard.style.cssText = 'margin: 16px 0 28px 0; background: #ffffff; border: 2.5px solid #cbd5e1; border-radius: 16px; padding: 20px; box-shadow: 0 4px 14px rgba(0,0,0,0.05);';
        actCard.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.5rem;">🛠️</span>
              <div>
                <h4 style="margin: 0; color: #1e3a8a; font-size: 1.12rem;">
                  Interactive Activity: ${item.activityName}
                </h4>
                <span style="font-size: 0.9rem; color: #64748b;">
                  Practice what you learned in this question with the live simulation below:
                </span>
              </div>
            </div>
          </div>
          <div class="simulator-box" id="postQuizBox_${qIdx}"></div>
        `;
        container.appendChild(actCard);

        const targetBox = actCard.querySelector(`#postQuizBox_${qIdx}`);
        if (targetBox) {
          this.mountInteractiveActivity(targetBox, item);
        }
      }
    });
  }

  setupEventListeners() {
    // Level Filter Tabs
    document.querySelectorAll('.level-filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.level-filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeLevel = tab.getAttribute('data-level');
        this.renderLessonsGrid();
      });
    });

    // Modal Tabs Navigation (Smooth section jump or switch)
    document.querySelectorAll('.study-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        this.currentTab = tab;
        this.updateTabButtons();

        if (tab === 'all') {
          const modalBox = document.querySelector('#adultStudyModal .adult-study-box');
          if (modalBox) modalBox.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          let secId = 'section_' + tab;
          if (tab === 'activity') secId = 'section_quiz';
          const targetSection = document.getElementById(secId);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            this.renderCurrentTab();
          }
        }
      });
    });

    // Prev / Next Section Buttons (Scroll smoothly between learning steps)
    const flowSectionIds = ['section_basics', 'section_realLife', 'section_understand', 'section_quiz', 'section_complete'];

    const btnPrev = document.getElementById('btnPrevTab');
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        const modalBox = document.querySelector('#adultStudyModal .adult-study-box');
        if (!modalBox) return;
        const visibleSections = flowSectionIds.map(id => document.getElementById(id)).filter(Boolean);
        if (visibleSections.length === 0) return;

        const curScroll = modalBox.scrollTop;
        let target = null;
        for (let i = visibleSections.length - 1; i >= 0; i--) {
          if (visibleSections[i].offsetTop < curScroll - 50) {
            target = visibleSections[i];
            break;
          }
        }
        if (!target) target = visibleSections[0];
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    const btnNext = document.getElementById('btnNextTab');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        const modalBox = document.querySelector('#adultStudyModal .adult-study-box');
        if (!modalBox) return;
        const visibleSections = flowSectionIds.map(id => document.getElementById(id)).filter(Boolean);
        if (visibleSections.length === 0) return;

        const curScroll = modalBox.scrollTop;
        let target = null;
        for (let i = 0; i < visibleSections.length; i++) {
          if (visibleSections[i].offsetTop > curScroll + 50) {
            target = visibleSections[i];
            break;
          }
        }
        if (!target) target = visibleSections[visibleSections.length - 1];
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    // Complete Lesson Button
    const btnComplete = document.getElementById('btnCompleteLesson');
    if (btnComplete) {
      btnComplete.addEventListener('click', () => {
        if (!this.currentLesson) return;
        AdultState.markLessonComplete(this.currentLesson.id);
        this.setupHUD();
        this.renderLessonsGrid();

        // Close current modal and alert success
        const modal = document.getElementById('adultStudyModal');
        if (modal) modal.classList.add('hidden');

        // Check if all 20 are complete
        if (AdultState.currentLearner.completedLessons.length >= 20) {
          const certModal = document.getElementById('adultCertModal');
          if (certModal) certModal.classList.remove('hidden');
        }
      });
    }

    // Close Modal Button
    const closeBtn = document.getElementById('closeStudyModalBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        document.getElementById('adultStudyModal').classList.add('hidden');
      });
    }

    // Font Size Adjuster Buttons
    document.querySelectorAll('.font-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.font-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const fontClass = btn.getAttribute('data-font');
        document.body.className = fontClass;
      });
    });

    // Certificate View Buttons
    const openCertBtn = document.getElementById('openCertBtn');
    if (openCertBtn) {
      openCertBtn.addEventListener('click', () => {
        this.setupHUD();
        document.getElementById('adultCertModal').classList.remove('hidden');
      });
    }

    const closeCertBtn = document.getElementById('closeCertModalBtn');
    if (closeCertBtn) {
      closeCertBtn.addEventListener('click', () => {
        document.getElementById('adultCertModal').classList.add('hidden');
      });
    }

    const closeCertBtnBottom = document.getElementById('closeCertBtnBottom');
    if (closeCertBtnBottom) {
      closeCertBtnBottom.addEventListener('click', () => {
        document.getElementById('adultCertModal').classList.add('hidden');
      });
    }

    // Certificate Action Buttons: Download PNG & Single-Page PDF Print
    const downloadPngBtn = document.getElementById('btnDownloadCertPng');
    if (downloadPngBtn) {
      downloadPngBtn.addEventListener('click', () => {
        this.downloadCertificateAsImage();
      });
    }

    const printPdfBtn = document.getElementById('btnPrintCertPdf');
    if (printPdfBtn) {
      printPdfBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // Profile Pill & Modal
    const profilePill = document.getElementById('adultProfilePill');
    if (profilePill) {
      profilePill.addEventListener('click', () => {
        const pModal = document.getElementById('adultProfileModal');
        if (pModal) {
          document.getElementById('adultNameInput').value = AdultState.currentLearner ? AdultState.currentLearner.name : 'Learner';
          pModal.classList.remove('hidden');
        }
      });
    }

    const closeProfileBtn = document.getElementById('closeProfileModalBtn');
    if (closeProfileBtn) {
      closeProfileBtn.addEventListener('click', () => {
        document.getElementById('adultProfileModal').classList.add('hidden');
      });
    }

    const profileForm = document.getElementById('adultProfileForm');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('adultNameInput').value;
        const ageGroup = document.getElementById('adultAgeSelect').value;
        AdultState.registerLearner(name, ageGroup);
        document.getElementById('adultProfileModal').classList.add('hidden');
        this.setupHUD();
        this.renderLessonsGrid();
      });
    }

    // In-Page Logout Confirmation
    const logoutBtn = document.getElementById('adultLogoutBtn');
    const logoutModal = document.getElementById('adultLogoutConfirmModal');
    const cancelLogoutBtn = document.getElementById('cancelAdultLogoutBtn');
    const confirmLogoutBtn = document.getElementById('confirmAdultLogoutBtn');

    if (logoutBtn && logoutModal) {
      logoutBtn.addEventListener('click', () => {
        logoutModal.classList.remove('hidden');
      });
    }

    if (cancelLogoutBtn && logoutModal) {
      cancelLogoutBtn.addEventListener('click', () => {
        logoutModal.classList.add('hidden');
      });
    }

    if (confirmLogoutBtn && logoutModal) {
      confirmLogoutBtn.addEventListener('click', () => {
        logoutModal.classList.add('hidden');
        AdultState.logout();
        localStorage.removeItem('skillspring_active_user');
        localStorage.removeItem('skillspring_adult_learner');
        localStorage.removeItem('skillspring_token');
        // Redirect cleanly back to landing page
        window.location.href = 'index.html';
      });
    }

    // In-Page Reset Progress Confirmation
    const openResetBtn = document.getElementById('openAdultResetBtn');
    const resetModal = document.getElementById('adultResetConfirmModal');
    const cancelResetBtn = document.getElementById('cancelAdultResetBtn');
    const confirmResetBtn = document.getElementById('confirmAdultResetBtn');

    if (openResetBtn && resetModal) {
      openResetBtn.addEventListener('click', () => {
        resetModal.classList.remove('hidden');
      });
    }

    if (cancelResetBtn && resetModal) {
      cancelResetBtn.addEventListener('click', () => {
        resetModal.classList.add('hidden');
      });
    }

    if (confirmResetBtn && resetModal) {
      confirmResetBtn.addEventListener('click', () => {
        resetModal.classList.add('hidden');
        AdultState.resetProgress();
        this.setupHUD();
        this.activeLevel = '1';
        document.querySelectorAll('.level-filter-tab').forEach(t => t.classList.remove('active'));
        const l1Tab = document.querySelector('.level-filter-tab[data-level="1"]');
        if (l1Tab) l1Tab.classList.add('active');
        this.renderLessonsGrid();
      });
    }
  }
}

// Initialize on page load
let adultPlatform;
document.addEventListener('DOMContentLoaded', () => {
  adultPlatform = new AdultLearningPlatform();
  adultPlatform.init();
});
