// ========================================================
// SkillSpring AI - Kids AI Learning Zone (15 Games & 15 Concepts)
// 15 Concepts & Games for 1st to 8th Standard Students
// Completely silent (no sounds), Zero browser alerts, Simple visual text
// ========================================================

// Audio Synthesizer - Completely Muted (Zero Sounds)
class SoundFX {
  constructor() { this.muted = true; }
  init() {}
  toggle() { return false; }
  playTone() {}
  click() {}
  correct() {}
  star() {}
  wrong() {}
  fanfare() {}
}

const sounds = new SoundFX();

// State Management: Child Profile Registry
const KidsState = {
  currentProfile: null,
  allProfiles: {},

  sanitizeProfile(p) {
    if (!p) return;
    const validCatalogIds = new Set(KIDS_GAMES_CATALOG.map(g => g.id));
    const validBadgeIds = new Set(KIDS_BADGES_DATA.map(b => b.id));

    // 1. Sanitize completedGames: only keep keys that exist in current 15 games catalog
    if (!p.completedGames || typeof p.completedGames !== 'object') {
      p.completedGames = {};
      p.totalStars = 0;
    } else {
      let recalculateStars = 0;
      const cleanCompleted = {};
      for (const [gId, gData] of Object.entries(p.completedGames)) {
        if (validCatalogIds.has(gId)) {
          cleanCompleted[gId] = gData;
          recalculateStars += (gData && gData.stars) ? gData.stars : 0;
        }
      }
      p.completedGames = cleanCompleted;
      p.totalStars = recalculateStars;
    }

    // 2. Sanitize unlockedGames: only keep valid IDs, and ensure Level 1 is unlocked
    if (!Array.isArray(p.unlockedGames) || p.unlockedGames.length === 0) {
      p.unlockedGames = ["ai_or_not"];
    } else {
      p.unlockedGames = p.unlockedGames.filter(id => validCatalogIds.has(id));
      if (!p.unlockedGames.includes("ai_or_not")) {
        p.unlockedGames.unshift("ai_or_not");
      }
    }

    // 3. Sanitize unlockedBadges: only keep valid badge IDs
    if (!Array.isArray(p.unlockedBadges)) {
      p.unlockedBadges = [];
    } else {
      p.unlockedBadges = p.unlockedBadges.filter(bId => validBadgeIds.has(bId));
    }
  },

  resetCurrentProgress() {
    if (!this.currentProfile) return;
    this.currentProfile.completedGames = {};
    this.currentProfile.unlockedGames = ["ai_or_not"];
    this.currentProfile.totalStars = 0;
    this.currentProfile.totalScore = 0;
    this.currentProfile.unlockedBadges = [];
    this.save();
  },

  load() {
    const saved = localStorage.getItem('skillspring_child_profiles');
    if (saved) {
      try {
        this.allProfiles = JSON.parse(saved) || {};
      } catch (e) {
        this.allProfiles = {};
      }
    }

    // Sanitize every profile so old/obsolete games from prior test sessions are wiped
    Object.keys(this.allProfiles).forEach(name => {
      this.sanitizeProfile(this.allProfiles[name]);
    });

    const activeName = localStorage.getItem('skillspring_active_child');
    if (activeName && this.allProfiles[activeName]) {
      this.currentProfile = this.allProfiles[activeName];
    } else {
      const names = Object.keys(this.allProfiles);
      if (names.length > 0) {
        this.currentProfile = this.allProfiles[names[0]];
        localStorage.setItem('skillspring_active_child', this.currentProfile.name);
      } else {
        this.currentProfile = null;
      }
    }

    if (this.currentProfile) {
      this.sanitizeProfile(this.currentProfile);
      this.checkStreak();
      this.save();
    }
  },

  save() {
    if (!this.currentProfile) return;
    this.allProfiles[this.currentProfile.name] = this.currentProfile;
    localStorage.setItem('skillspring_child_profiles', JSON.stringify(this.allProfiles));
    localStorage.setItem('skillspring_active_child', this.currentProfile.name);
  },

  registerChild(name, age, standard, avatar) {
    name = (name || 'Explorer').trim();
    if (!this.allProfiles[name]) {
      this.allProfiles[name] = {
        name: name,
        age: parseInt(age) || 8,
        standard: standard || '3rd Standard',
        avatar: avatar || '🤖',
        unlockedGames: ["ai_or_not"],
        completedGames: {},
        totalStars: 0,
        totalScore: 0,
        streakDays: 1,
        lastPlayedDate: new Date().toDateString(),
        unlockedBadges: []
      };
    } else {
      this.allProfiles[name].age = parseInt(age);
      this.allProfiles[name].standard = standard;
      this.allProfiles[name].avatar = avatar;
    }
    this.currentProfile = this.allProfiles[name];
    this.save();
  },

  switchChild(name) {
    if (this.allProfiles[name]) {
      this.currentProfile = this.allProfiles[name];
      localStorage.setItem('skillspring_active_child', name);
      this.checkStreak();
      return true;
    }
    return false;
  },

  logoutChild() {
    this.currentProfile = null;
    localStorage.removeItem('skillspring_active_child');
  },

  checkStreak() {
    if (!this.currentProfile) return;
    const today = new Date().toDateString();
    if (!this.currentProfile.lastPlayedDate) {
      this.currentProfile.lastPlayedDate = today;
      this.currentProfile.streakDays = 1;
    } else if (this.currentProfile.lastPlayedDate !== today) {
      const last = new Date(this.currentProfile.lastPlayedDate);
      const diffTime = Math.abs(new Date(today) - last);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        this.currentProfile.streakDays += 1;
      } else if (diffDays > 1) {
        this.currentProfile.streakDays = 1;
      }
      this.currentProfile.lastPlayedDate = today;
    }
    this.save();
  },

  unlockNextGame(currentGameId) {
    if (!this.currentProfile) return;
    const catalog = KIDS_GAMES_CATALOG;
    const currentIdx = catalog.findIndex(g => g.id === currentGameId);
    if (currentIdx !== -1 && currentIdx + 1 < catalog.length) {
      const nextGameId = catalog[currentIdx + 1].id;
      if (!this.currentProfile.unlockedGames.includes(nextGameId)) {
        this.currentProfile.unlockedGames.push(nextGameId);
      }
    }

    const badgeMap = {
      ai_or_not: "ai_explorer",
      find_ai: "everyday_ai",
      human_vs_ai: "smart_thinker",
      robot_maze: "robot_commander",
      pattern_detective: "pattern_master",
      animal_detective: "image_detective",
      sound_detective: "sound_master",
      smart_sorting: "sorting_champ",
      data_collector: "data_scientist",
      train_your_robot: "ai_trainer",
      ai_training_lab: "ai_scientist",
      ai_creative_studio: "creative_genius",
      build_chatbot: "chatbot_creator",
      traffic_controller: "smart_solver",
      ai_safety: "safety_champion"
    };

    const bId = badgeMap[currentGameId];
    if (bId && !this.currentProfile.unlockedBadges.includes(bId)) {
      this.currentProfile.unlockedBadges.push(bId);
    }
    this.save();
  },

  recordGameComplete(gameId, stars, score) {
    if (!this.currentProfile) return;
    const prev = this.currentProfile.completedGames[gameId];
    if (!prev) {
      this.currentProfile.totalStars += stars;
      this.currentProfile.totalScore += score;
    } else if (stars > prev.stars) {
      this.currentProfile.totalStars += (stars - prev.stars);
      this.currentProfile.totalScore += Math.max(0, score - prev.score);
    }
    this.currentProfile.completedGames[gameId] = { stars, score };
    this.unlockNextGame(gameId);
    this.save();
  }
};

// Main Game Controller
class KidsAdventureGame {
  constructor() {
    this.currentGame = null;
    this.selectedAvatar = '🤖';
    this.activeFilter = 'all';
  }

  init() {
    KidsState.load();

    if (!KidsState.currentProfile) {
      KidsState.registerChild('Explorer', 8, '3rd Standard', '🤖');
    }
    this.updateHUD();
    this.renderRobotGreeting();
    this.renderGamesMap();

    this.setupEventListeners();
  }

  setFeedback(msg, isSuccess = false) {
    const feedback = document.getElementById('arenaFeedback');
    if (feedback) {
      feedback.className = `arena-feedback show ${isSuccess ? 'correct' : 'wrong'}`;
      feedback.innerHTML = `<div style="font-size: 1.12rem; font-weight: 800; line-height: 1.5;">${msg}</div>`;
      feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  setFeedbackAction(msg, isSuccess, nextActionCallback, nextBtnLabel = "Next Question ➡️") {
    const feedback = document.getElementById('arenaFeedback');
    if (!feedback) return;
    feedback.className = `arena-feedback show ${isSuccess ? 'correct' : 'wrong'}`;
    feedback.innerHTML = `
      <div style="font-size: 1.15rem; font-weight: 800; line-height: 1.5; margin-bottom: 12px;">
        ${msg}
      </div>
      <div>
        <button type="button" class="btn-kids-3d ${isSuccess ? 'btn-kids-green' : 'btn-kids-white'}" id="feedbackNextActionBtn" style="padding: 11px 26px; font-size: 1.05rem; cursor: pointer;">
          ${nextBtnLabel}
        </button>
      </div>
    `;

    const btn = document.getElementById('feedbackNextActionBtn');
    if (btn) {
      btn.onclick = () => {
        this.clearFeedback();
        if (typeof nextActionCallback === 'function') {
          nextActionCallback();
        }
      };
    }
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  clearFeedback() {
    const feedback = document.getElementById('arenaFeedback');
    if (feedback) {
      feedback.className = 'arena-feedback';
      feedback.innerHTML = '';
    }
  }

  getCompletedCount() {
    if (!KidsState.currentProfile || !KidsState.currentProfile.completedGames) return 0;
    const validCatalogIds = new Set(KIDS_GAMES_CATALOG.map(g => g.id));
    return Object.keys(KidsState.currentProfile.completedGames).filter(id => validCatalogIds.has(id)).length;
  }

  updateHUD() {
    if (!KidsState.currentProfile) return;
    const p = KidsState.currentProfile;

    const avatarEl = document.getElementById('hudChildAvatar');
    if (avatarEl) avatarEl.innerText = p.avatar || '🤖';

    const nameEl = document.getElementById('hudChildName');
    if (nameEl) nameEl.innerText = p.name;

    const gradeEl = document.getElementById('hudChildGrade');
    if (gradeEl) gradeEl.innerText = `${p.standard} (Age ${p.age})`;

    const starsEl = document.getElementById('hudStars');
    if (starsEl) starsEl.innerText = p.totalStars;

    const streakEl = document.getElementById('hudStreak');
    if (streakEl) streakEl.innerText = `${p.streakDays} Days 🔥`;

    const badgesEl = document.getElementById('hudBadges');
    if (badgesEl) badgesEl.innerText = p.unlockedBadges.length;

    const completedCount = this.getCompletedCount();
    const ratioEl = document.getElementById('progressRatio');
    if (ratioEl) ratioEl.innerText = `${completedCount} / 15 Games`;

    const pct = Math.min(100, Math.round((completedCount / 15) * 100));
    const fillBar = document.getElementById('progressFillBar');
    if (fillBar) fillBar.style.width = `${Math.max(6, pct)}%`;
  }

  renderRobotGreeting() {
    if (!KidsState.currentProfile) return;
    const p = KidsState.currentProfile;
    const completedCount = this.getCompletedCount();
    const mascotBubble = document.getElementById('mascotBubble');
    if (!mascotBubble) return;

    if (completedCount === 0) {
      mascotBubble.innerText = `👋 Hi ${p.name}! Ready to explore the 15 AI games? Tap Game 1 to begin!`;
    } else if (completedCount >= 15) {
      mascotBubble.innerText = `🎉 Incredible ${p.name}! You mastered all 15 AI Games! Super AI Champion! ⭐`;
    } else {
      mascotBubble.innerText = `⭐ Great job ${p.name}! You solved ${completedCount} of 15 games! Keep going!`;
    }
  }

  renderGamesMap() {
    if (!KidsState.currentProfile) return;
    const p = KidsState.currentProfile;
    const container = document.getElementById('worldsMapContainer');
    if (!container) return;
    container.innerHTML = '';

    const gamesToShow = KIDS_GAMES_CATALOG.filter(gameItem => {
      if (this.activeFilter === 'all') return true;
      return gameItem.difficulty === this.activeFilter;
    });

    gamesToShow.forEach((gameItem) => {
      const isUnlocked = p.unlockedGames && p.unlockedGames.includes(gameItem.id);
      const completedData = p.completedGames[gameItem.id];
      const isCompleted = !!completedData;

      const card = document.createElement('div');
      card.className = `world-zone-card ${isCompleted ? 'world-ml' : (isUnlocked ? 'world-logic' : 'world-discover')}`;
      card.style.cursor = isUnlocked ? 'pointer' : 'not-allowed';

      card.innerHTML = `
        <div class="world-zone-header">
          <div class="world-meta">
            <div class="world-icon-badge" style="font-size: 2.5rem;">${gameItem.icon}</div>
            <div class="world-info">
              <h3 style="font-size: 1.25rem;">${gameItem.worldId}. ${gameItem.title}</h3>
              <p style="color: #64748b; font-weight: 700; font-size: 0.9rem;">
                <span style="background: #e2e8f0; color: #334155; padding: 2px 8px; border-radius: 9999px; margin-right: 6px;">${gameItem.difficulty}</span>
                ${gameItem.concept}
              </p>
            </div>
          </div>
          <span class="world-status-pill ${isCompleted ? 'status-active' : (isUnlocked ? 'status-active' : 'status-locked')}">
            ${isCompleted ? '✓ Solved' : (isUnlocked ? '🟢 Open' : '🔒 Locked')}
          </span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; flex-wrap: wrap; gap: 10px;">
          <p style="font-size: 0.92rem; color: #475569; max-width: 580px;">
            ${gameItem.description}
          </p>
          <button type="button" class="btn-kids-3d ${isUnlocked ? 'btn-kids-green' : 'btn-kids-white'}" style="padding: 10px 22px; font-size: 0.95rem;" ${isUnlocked ? `onclick="event.stopPropagation(); game.openGame('${gameItem.id}')"` : 'disabled'}>
            ${isCompleted ? '🔄 Play Again' : (isUnlocked ? '🎮 Play Game ➡️' : '🔒 Locked')}
          </button>
        </div>
      `;

      if (isUnlocked) {
        card.onclick = () => this.openGame(gameItem.id);
      }

      container.appendChild(card);
    });
  }

  startLearningNow() {
    if (!KidsState.currentProfile) {
      KidsState.registerChild('Explorer', 8, '3rd Standard', '🤖');
    }
    const p = KidsState.currentProfile;
    const firstUnfinished = KIDS_GAMES_CATALOG.find(g => p.unlockedGames && p.unlockedGames.includes(g.id) && !p.completedGames[g.id]);
    if (firstUnfinished) {
      this.openGame(firstUnfinished.id);
    } else {
      this.openGame("ai_or_not");
    }
  }

  continueLearningNow() {
    const mapEl = document.getElementById('worldsMapContainer');
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  setupEventListeners() {
    // In-Page Custom Logout Modal Handlers
    const logoutBtn = document.getElementById('childLogoutBtn');
    const logoutModal = document.getElementById('logoutConfirmModal');
    const cancelLogoutBtn = document.getElementById('cancelLogoutBtn');
    const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');
    const logoutTitle = document.getElementById('logoutConfirmTitle');

    if (logoutBtn && logoutModal) {
      logoutBtn.addEventListener('click', () => {
        const studentName = KidsState.currentProfile ? KidsState.currentProfile.name : 'Current Student';
        if (logoutTitle) logoutTitle.innerText = `Log out from "${studentName}"?`;
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
        KidsState.logoutChild();
        this.openProfileModal(true);
      });
    }

    const pill = document.getElementById('childProfilePill');
    if (pill) pill.addEventListener('click', () => this.openProfileModal(false));

    const mascotCard = document.getElementById('mascotBuddyCard');
    if (mascotCard) mascotCard.addEventListener('click', () => this.startLearningNow());

    const startBtn = document.getElementById('startLearningBtn');
    if (startBtn) startBtn.addEventListener('click', () => this.startLearningNow());

    const contBtn = document.getElementById('continueLearningBtn');
    if (contBtn) contBtn.addEventListener('click', () => this.continueLearningNow());

    const dailyNav = document.getElementById('dailyNavCard');
    if (dailyNav) dailyNav.addEventListener('click', () => this.openDailyModal());

    const rewardsNav = document.getElementById('rewardsNavCard');
    if (rewardsNav) rewardsNav.addEventListener('click', () => this.openRewardsModal());

    const progressNav = document.getElementById('progressNavCard');
    if (progressNav) {
      progressNav.addEventListener('click', () => {
        const pCard = document.getElementById('overallProgressCard');
        if (pCard) pCard.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const closeArenaBtn = document.getElementById('closeArenaBtn');
    if (closeArenaBtn) closeArenaBtn.addEventListener('click', () => this.closeArena());

    const closeRewardsBtn = document.getElementById('closeRewardsBtn');
    if (closeRewardsBtn) {
      closeRewardsBtn.addEventListener('click', () => {
        document.getElementById('rewardsModal').classList.add('hidden');
      });
    }

    const closeDailyBtn = document.getElementById('closeDailyBtn');
    if (closeDailyBtn) {
      closeDailyBtn.addEventListener('click', () => {
        document.getElementById('dailyModal').classList.add('hidden');
      });
    }

    // In-Page Custom Reset Modal Handlers
    const resetProgressBtn = document.getElementById('resetProgressBtn');
    const modalResetBtn = document.getElementById('modalResetProgressBtn');
    const resetModal = document.getElementById('resetConfirmModal');
    const cancelResetBtn = document.getElementById('cancelResetBtn');
    const confirmResetBtn = document.getElementById('confirmResetBtn');
    const resetTitle = document.getElementById('resetConfirmTitle');

    const triggerResetConfirm = () => {
      const studentName = KidsState.currentProfile ? KidsState.currentProfile.name : 'Current Explorer';
      if (resetTitle) resetTitle.innerText = `Reset ${studentName}'s progress to 0 Games?`;
      if (resetModal) resetModal.classList.remove('hidden');
    };

    if (resetProgressBtn) resetProgressBtn.addEventListener('click', triggerResetConfirm);
    if (modalResetBtn) modalResetBtn.addEventListener('click', triggerResetConfirm);

    if (cancelResetBtn && resetModal) {
      cancelResetBtn.addEventListener('click', () => {
        resetModal.classList.add('hidden');
      });
    }

    if (confirmResetBtn && resetModal) {
      confirmResetBtn.addEventListener('click', () => {
        resetModal.classList.add('hidden');
        KidsState.resetCurrentProgress();
        const profileModal = document.getElementById('childProfileModal');
        if (profileModal) profileModal.classList.add('hidden');
        this.updateHUD();
        this.renderRobotGreeting();
        this.renderGamesMap();
      });
    }

    const closeProfileBtn = document.getElementById('closeProfileModalBtn');
    if (closeProfileBtn) {
      closeProfileBtn.addEventListener('click', () => {
        if (KidsState.currentProfile) {
          document.getElementById('childProfileModal').classList.add('hidden');
        }
      });
    }

    // Difficulty filter chips
    document.querySelectorAll('.filter-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.getAttribute('data-filter') || 'all';
        this.renderGamesMap();
      });
    });

    document.querySelectorAll('.avatar-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.avatar-opt-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.selectedAvatar = btn.getAttribute('data-avatar');
      });
    });

    const profileForm = document.getElementById('childProfileForm');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('childNameInput').value.trim();
        const age = document.getElementById('childAgeInput').value;
        const standard = document.getElementById('childGradeInput').value;

        if (!name) return;

        KidsState.registerChild(name, age, standard, this.selectedAvatar);
        document.getElementById('childProfileModal').classList.add('hidden');

        this.updateHUD();
        this.renderRobotGreeting();
        this.renderGamesMap();
      });
    }
  }

  openProfileModal(isMandatory = false) {
    const modal = document.getElementById('childProfileModal');
    const closeBtn = document.getElementById('closeProfileModalBtn');
    if (!modal) return;
    modal.classList.remove('hidden');

    if (closeBtn) {
      closeBtn.style.display = isMandatory ? 'none' : 'block';
    }

    if (KidsState.currentProfile) {
      document.getElementById('childNameInput').value = KidsState.currentProfile.name;
      document.getElementById('childAgeInput').value = KidsState.currentProfile.age;
      document.getElementById('childGradeInput').value = KidsState.currentProfile.standard;
      this.selectedAvatar = KidsState.currentProfile.avatar || '🤖';
    } else {
      document.getElementById('childNameInput').value = '';
      document.getElementById('childAgeInput').value = '8';
      document.getElementById('childGradeInput').value = '3rd Standard';
      this.selectedAvatar = '🤖';
    }

    document.querySelectorAll('.avatar-opt-btn').forEach(b => {
      if (b.getAttribute('data-avatar') === this.selectedAvatar) b.classList.add('selected');
      else b.classList.remove('selected');
    });

    const savedNames = Object.keys(KidsState.allProfiles);
    const container = document.getElementById('savedKidsContainer');
    const chipsDiv = document.getElementById('savedKidsChips');

    if (savedNames.length > 0 && container && chipsDiv) {
      container.style.display = 'block';
      chipsDiv.innerHTML = '';
      savedNames.forEach(name => {
        const p = KidsState.allProfiles[name];
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'kid-chip-btn';
        chip.innerHTML = `${p.avatar} <strong>${p.name}</strong> (${p.standard})`;
        chip.onclick = () => {
          KidsState.switchChild(name);
          modal.classList.add('hidden');
          this.updateHUD();
          this.renderRobotGreeting();
          this.renderGamesMap();
        };
        chipsDiv.appendChild(chip);
      });
    } else if (container) {
      container.style.display = 'none';
    }
  }

  openGame(gameId) {
    const gameData = KIDS_GAMES_CATALOG.find(g => g.id === gameId);
    if (!gameData) return;

    this.currentGame = gameData;

    const arena = document.getElementById('gameArenaModal');
    if (arena) arena.classList.remove('hidden');

    const levelTag = document.getElementById('arenaLevelTag');
    if (levelTag) levelTag.innerText = `${gameData.worldId}. ${gameData.title}`;

    const pointsTag = document.getElementById('arenaPointsTag');
    if (pointsTag) pointsTag.innerText = `+10 Stars ⭐`;

    const storyBubble = document.getElementById('arenaStoryBubble');
    if (storyBubble) storyBubble.innerHTML = `💡 ${gameData.subtitle} &bull; <strong>${gameData.concept}</strong>`;

    const questionText = document.getElementById('arenaQuestionText');
    if (questionText) questionText.innerText = gameData.description;

    const playArea = document.getElementById('arenaPlayArea');
    if (playArea) playArea.style.display = 'block';

    const celebView = document.getElementById('arenaCelebrationView');
    if (celebView) celebView.style.display = 'none';

    this.clearFeedback();
    this.renderGameArena(gameData);
  }

  closeArena() {
    const arena = document.getElementById('gameArenaModal');
    if (arena) arena.classList.add('hidden');
    this.updateHUD();
    this.renderGamesMap();
    this.renderRobotGreeting();
  }

  // Router for 15 Interactive Games
  renderGameArena(gameData) {
    const playArea = document.getElementById('arenaPlayArea');
    if (!playArea) return;
    playArea.innerHTML = '';

    switch (gameData.id) {
      case 'ai_or_not':
        this.renderGame1_AIOrNot(gameData, playArea);
        break;
      case 'find_ai':
        this.renderGame2_FindAI(gameData, playArea);
        break;
      case 'human_vs_ai':
        this.renderGame3_HumanVsAI(gameData, playArea);
        break;
      case 'robot_maze':
        this.renderGame4_RobotMaze(gameData, playArea);
        break;
      case 'pattern_detective':
        this.renderGame5_PatternDetective(gameData, playArea);
        break;
      case 'animal_detective':
        this.renderGame6_AnimalDetective(gameData, playArea);
        break;
      case 'sound_detective':
        this.renderGame7_SoundDetective(gameData, playArea);
        break;
      case 'smart_sorting':
        this.renderGame8_SmartSorting(gameData, playArea);
        break;
      case 'data_collector':
        this.renderGame9_DataCollector(gameData, playArea);
        break;
      case 'train_your_robot':
        this.renderGame10_TrainYourRobot(gameData, playArea);
        break;
      case 'ai_training_lab':
        this.renderGame11_AITrainingLab(gameData, playArea);
        break;
      case 'ai_creative_studio':
        this.renderGame12_AICreativeStudio(gameData, playArea);
        break;
      case 'build_chatbot':
        this.renderGame13_BuildChatbot(gameData, playArea);
        break;
      case 'traffic_controller':
        this.renderGame14_TrafficController(gameData, playArea);
        break;
      case 'ai_safety':
        this.renderGame15_AISafety(gameData, playArea);
        break;
      default:
        playArea.innerHTML = `<button class="btn-kids-3d btn-kids-green" onclick="game.showCelebration()">Complete Game</button>`;
    }
  }

  // ========================================================
  // 1. AI or Not AI? 🤖 (Introduction to AI)
  // ========================================================
  renderGame1_AIOrNot(gameData, container) {
    let itemIdx = 0;
    const wrap = document.createElement('div');
    wrap.style.textAlign = 'center';

    wrap.innerHTML = `
      <div style="font-weight: 800; color: #475569; margin-bottom: 8px;" id="aiOrNotCounter">Item 1 of ${gameData.items.length}</div>
      <div id="aiItemCard" style="display: inline-block; background: white; border: 3px solid #cbd5e1; border-radius: 20px; padding: 20px 36px; box-shadow: 0 6px 18px rgba(0,0,0,0.06); margin-bottom: 20px;">
        <span style="font-size: 4.5rem;" id="aiItemIcon">🔊</span>
        <h3 style="font-size: 1.35rem; margin-top: 8px; color: #0f172a;" id="aiItemName">Smart Speaker</h3>
      </div>

      <div class="game-two-bins-row">
        <div class="bin-drop-target ai-bin" id="btnDropAI">
          <span style="font-size: 2.4rem;">🤖</span>
          <h3 style="margin-top: 4px;">It is AI!</h3>
          <p style="font-size: 0.85rem; color: #1e40af;">Can learn, decide, or recognize!</p>
        </div>
        <div class="bin-drop-target not-ai-bin" id="btnDropNotAI">
          <span style="font-size: 2.4rem;">🚫</span>
          <h3 style="margin-top: 4px;">Not AI</h3>
          <p style="font-size: 0.85rem; color: #991b1b;">Just follows fixed switches/timers.</p>
        </div>
      </div>
    `;

    container.appendChild(wrap);

    const updateItem = () => {
      const it = gameData.items[itemIdx];
      document.getElementById('aiOrNotCounter').innerText = `Item ${itemIdx + 1} of ${gameData.items.length}`;
      document.getElementById('aiItemIcon').innerText = it.icon;
      document.getElementById('aiItemName').innerText = it.name;
    };

    const handleAnswer = (chosenAI) => {
      const it = gameData.items[itemIdx];
      if (it.isAI === chosenAI) {
        itemIdx++;
        const isLast = (itemIdx >= gameData.items.length);
        const nextLabel = isLast ? "⭐ Claim AI Explorer Badge! ➡️" : "Next Item ➡️";
        this.setFeedbackAction(`✅ Correct! ${it.explanation}`, true, () => {
          if (!isLast) {
            updateItem();
          } else {
            this.showCelebration();
          }
        }, nextLabel);
      } else {
        this.setFeedback(`❌ Not quite! ${it.explanation} Try selecting the other box!`, false);
      }
    };

    document.getElementById('btnDropAI').onclick = () => handleAnswer(true);
    document.getElementById('btnDropNotAI').onclick = () => handleAnswer(false);

    updateItem();
  }

  // ========================================================
  // 2. Find AI Around You 🔍 (Everyday AI)
  // ========================================================
  renderGame2_FindAI(gameData, container) {
    const wrap = document.createElement('div');
    let foundCount = 0;
    const total = gameData.sceneItems.length;

    wrap.innerHTML = `
      <div style="text-align: center; margin-bottom: 14px;">
        <span class="free-badge" style="background:#e0f2fe; color:#0369a1;" id="findAICounter">0 / ${total} AI Tools Discovered</span>
        <h4 style="font-size: 1.15rem; color: #1e1b4b; margin-top: 6px;">Tap each AI tool to discover how it helps!</h4>
      </div>
      <div class="scene-finder-grid" id="sceneFinderGrid"></div>
      <div id="sceneItemDescBox" style="display: none; background: #f0fdf4; border: 2.5px solid #86efac; border-radius: 14px; padding: 14px; text-align: center; margin-top: 10px; font-weight: 700; color: #166534;"></div>
    `;

    container.appendChild(wrap);
    const grid = document.getElementById('sceneFinderGrid');
    const descBox = document.getElementById('sceneItemDescBox');

    gameData.sceneItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'scene-item-card';
      card.innerHTML = `
        <span style="font-size: 3.2rem;">${item.icon}</span>
        <h4 style="font-size: 1.1rem; margin-top: 6px; color: #0f172a;">${item.name}</h4>
        <span class="disc-tag" style="font-size: 0.8rem; color: #64748b; font-weight: 700;">Tap to Scan 🔍</span>
      `;

      card.onclick = () => {
        if (!card.classList.contains('discovered')) {
          card.classList.add('discovered');
          card.querySelector('.disc-tag').innerHTML = '✓ Discovered!';
          foundCount++;
          document.getElementById('findAICounter').innerText = `${foundCount} / ${total} AI Tools Discovered`;
          descBox.style.display = 'block';
          descBox.innerHTML = `💡 <strong>${item.name}:</strong> ${item.desc}`;

          if (foundCount === total) {
            this.setFeedbackAction('🎉 Awesome! You found all 4 everyday AI tools in the city!', true, () => {
              this.showCelebration();
            }, '⭐ Claim Everyday AI Explorer Badge! ➡️');
          }
        } else {
          descBox.innerHTML = `💡 <strong>${item.name}:</strong> ${item.desc}`;
        }
      };
      grid.appendChild(card);
    });
  }

  // ========================================================
  // 3. Human Brain or Robot Brain? 🧠 (Human vs AI)
  // ========================================================
  renderGame3_HumanVsAI(gameData, container) {
    let qIdx = 0;
    const wrap = document.createElement('div');
    wrap.style.textAlign = 'center';

    wrap.innerHTML = `
      <div style="font-weight: 800; color: #475569; margin-bottom: 10px;" id="humanAiProgress">Activity 1 of ${gameData.questions.length}</div>
      <div style="background: white; border: 3px solid #fbcfe8; border-radius: 20px; padding: 22px; margin-bottom: 20px; box-shadow: 0 4px 14px rgba(0,0,0,0.05);">
        <span style="font-size: 3rem;">⚡</span>
        <h3 style="font-size: 1.3rem; color: #831843; margin-top: 8px;" id="activityText"></h3>
      </div>

      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
        <button class="btn-kids-3d" style="background:#fce7f3; color:#9d174d; border:2px solid #f472b6; padding:12px 20px; font-size:1.05rem;" id="btnHuman">
          👤 Humans Only
        </button>
        <button class="btn-kids-3d" style="background:#e0f2fe; color:#0369a1; border:2px solid #38bdf8; padding:12px 20px; font-size:1.05rem;" id="btnAI">
          🤖 AI / Robots
        </button>
        <button class="btn-kids-3d" style="background:#dcfce7; color:#15803d; border:2px solid #4ade80; padding:12px 20px; font-size:1.05rem;" id="btnBoth">
          🤝 Both Can Do
        </button>
      </div>
    `;

    container.appendChild(wrap);

    const updateQ = () => {
      const q = gameData.questions[qIdx];
      document.getElementById('humanAiProgress').innerText = `Activity ${qIdx + 1} of ${gameData.questions.length}`;
      document.getElementById('activityText').innerText = q.action;
    };

    const handleChoice = (ans) => {
      const q = gameData.questions[qIdx];
      if (q.answer === ans) {
        qIdx++;
        const isLast = (qIdx >= gameData.questions.length);
        const nextLabel = isLast ? "⭐ Claim Smart Thinker Badge! ➡️" : "Next Activity ➡️";
        this.setFeedbackAction(`✅ Correct! ${q.explanation}`, true, () => {
          if (!isLast) {
            updateQ();
          } else {
            this.showCelebration();
          }
        }, nextLabel);
      } else {
        this.setFeedback(`❌ Not quite! ${q.explanation} Try selecting another option!`, false);
      }
    };

    document.getElementById('btnHuman').onclick = () => handleChoice('human');
    document.getElementById('btnAI').onclick = () => handleChoice('ai');
    document.getElementById('btnBoth').onclick = () => handleChoice('both');

    updateQ();
  }

  // ========================================================
  // 4. Robot Maze Adventure 🚀 (Smart Robots)
  // ========================================================
  renderGame4_RobotMaze(gameData, container) {
    const wrap = document.createElement('div');
    wrap.className = 'coding-arena-wrap';

    let currentPos = 0;
    const targetPos = 8; // Bottom-right treasure
    let isFinished = false;

    const statusBanner = document.createElement('div');
    statusBanner.style.background = '#fef3c7';
    statusBanner.style.border = '2px solid #f59e0b';
    statusBanner.style.borderRadius = '14px';
    statusBanner.style.padding = '10px 18px';
    statusBanner.style.color = '#92400e';
    statusBanner.style.fontWeight = '700';
    statusBanner.style.fontSize = '1.05rem';
    statusBanner.style.textAlign = 'center';
    statusBanner.style.width = '100%';
    statusBanner.style.maxWidth = '460px';
    statusBanner.innerHTML = '🤖 Walk Robo-Buddy through the maze to the <strong>Treasure (💎)</strong>!';

    const grid = document.createElement('div');
    grid.className = 'coding-grid-board';

    const cellElements = [];
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell';
      cell.id = `maze_cell_${i}`;
      grid.appendChild(cell);
      cellElements.push(cell);
    }

    const updateGrid = () => {
      for (let i = 0; i < 9; i++) {
        const c = cellElements[i];
        c.className = 'grid-cell';
        if (i === currentPos && currentPos === targetPos) {
          c.innerText = '🤖💎';
          c.classList.add('success-cell');
        } else if (i === currentPos) {
          c.innerText = '🤖';
          c.classList.add('active-robot');
        } else if (i === targetPos && !isFinished) {
          c.innerText = '💎';
          c.classList.add('battery-target');
        } else {
          c.innerText = '·';
        }
      }
    };

    updateGrid();

    const moveRobot = (dir) => {
      if (isFinished) return;
      let moved = false;
      const row = Math.floor(currentPos / 3);
      const col = currentPos % 3;

      if (dir === 'RIGHT') {
        if (col < 2) { currentPos += 1; moved = true; statusBanner.innerHTML = '➡️ Stepped <strong>Right</strong>!'; }
        else { statusBanner.innerHTML = '🚧 Right edge! Try moving Down!'; }
      } else if (dir === 'DOWN') {
        if (row < 2) { currentPos += 3; moved = true; statusBanner.innerHTML = '⬇️ Stepped <strong>Down</strong>!'; }
        else { statusBanner.innerHTML = '🚧 Bottom edge reached!'; }
      } else if (dir === 'LEFT') {
        if (col > 0) { currentPos -= 1; moved = true; statusBanner.innerHTML = '⬅️ Stepped <strong>Left</strong>!'; }
      } else if (dir === 'UP') {
        if (row > 0) { currentPos -= 3; moved = true; statusBanner.innerHTML = '⬆️ Stepped <strong>Up</strong>!'; }
      }

      if (moved) {
        updateGrid();
        if (currentPos === targetPos) {
          isFinished = true;
          statusBanner.innerHTML = '🎉💎 <strong>TREASURE FOUND! Robo-Buddy reached the diamond!</strong>';
          this.setFeedbackAction('🎉 Great job! You successfully programmed Robo-Buddy through the maze to the treasure diamond 💎!', true, () => {
            this.showCelebration();
          }, '⭐ Claim Robot Commander Badge! ➡️');
        }
      }
    };

    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.gap = '10px';
    controls.style.flexWrap = 'wrap';
    controls.style.justifyContent = 'center';
    controls.style.marginTop = '10px';

    const bRight = document.createElement('button');
    bRight.className = 'btn-kids-3d btn-kids-white';
    bRight.innerText = '➡️ Right';
    bRight.onclick = () => moveRobot('RIGHT');

    const bDown = document.createElement('button');
    bDown.className = 'btn-kids-3d btn-kids-white';
    bDown.innerText = '⬇️ Down';
    bDown.onclick = () => moveRobot('DOWN');

    const bLeft = document.createElement('button');
    bLeft.className = 'btn-kids-3d btn-kids-white';
    bLeft.innerText = '⬅️ Left';
    bLeft.onclick = () => moveRobot('LEFT');

    const bUp = document.createElement('button');
    bUp.className = 'btn-kids-3d btn-kids-white';
    bUp.innerText = '⬆️ Up';
    bUp.onclick = () => moveRobot('UP');

    const autoBtn = document.createElement('button');
    autoBtn.className = 'btn-kids-3d btn-kids-green';
    autoBtn.innerText = '▶ Auto-Walk (Right ➡️ Down ➡️ 💎)';
    autoBtn.onclick = () => {
      if (isFinished) return;
      currentPos = 0;
      updateGrid();
      setTimeout(() => { moveRobot('RIGHT'); setTimeout(() => { moveRobot('RIGHT'); setTimeout(() => { moveRobot('DOWN'); setTimeout(() => { moveRobot('DOWN'); }, 500); }, 500); }, 500); }, 400);
    };

    controls.appendChild(bRight);
    controls.appendChild(bDown);
    controls.appendChild(bLeft);
    controls.appendChild(bUp);
    controls.appendChild(autoBtn);

    wrap.appendChild(statusBanner);
    wrap.appendChild(grid);
    wrap.appendChild(controls);
    container.appendChild(wrap);
  }

  // ========================================================
  // 5. Pattern Detective 🎨 (Pattern Recognition)
  // ========================================================
  renderGame5_PatternDetective(gameData, container) {
    let pIdx = 0;
    const wrap = document.createElement('div');
    wrap.style.textAlign = 'center';

    wrap.innerHTML = `
      <div style="font-weight: 800; color: #475569; margin-bottom: 8px;" id="patternCount">Pattern 1 of ${gameData.patterns.length}</div>
      <div class="pattern-seq-display" id="patternSeqRow"></div>
      <h4 style="font-size: 1.15rem; color: #0f172a; margin-bottom: 12px;">What comes next in the pattern?</h4>
      <div style="display: flex; gap: 12px; justify-content: center;" id="patternOptionsRow"></div>
    `;

    container.appendChild(wrap);

    const updatePattern = () => {
      const p = gameData.patterns[pIdx];
      document.getElementById('patternCount').innerText = `Pattern ${pIdx + 1} of ${gameData.patterns.length}`;
      document.getElementById('patternSeqRow').innerText = p.sequence.join('  ');

      const optRow = document.getElementById('patternOptionsRow');
      optRow.innerHTML = '';
      p.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn-kids-3d btn-kids-white';
        btn.style.fontSize = '2rem';
        btn.style.padding = '10px 24px';
        btn.innerText = opt;
        btn.onclick = () => {
          if (opt === p.correct) {
            pIdx++;
            const isLast = (pIdx >= gameData.patterns.length);
            const nextLabel = isLast ? "⭐ Claim Pattern Master Badge! ➡️" : "Next Pattern ➡️";
            this.setFeedbackAction(`✅ Correct! ${p.explanation}`, true, () => {
              if (!isLast) {
                updatePattern();
              } else {
                this.showCelebration();
              }
            }, nextLabel);
          } else {
            this.setFeedback('❌ Look closely at the repeating pattern colors!', false);
          }
        };
        optRow.appendChild(btn);
      });
    };

    updatePattern();
  }

  // ========================================================
  // 6. Animal Detective 🐶 (Image Recognition)
  // ========================================================
  renderGame6_AnimalDetective(gameData, container) {
    let aIdx = 0;
    const wrap = document.createElement('div');
    wrap.style.textAlign = 'center';

    wrap.innerHTML = `
      <div style="font-weight: 800; color: #475569; margin-bottom: 8px;" id="animalProgress">Animal 1 of ${gameData.animals.length}</div>
      <div style="display: inline-block; background: white; border: 3px solid #86efac; border-radius: 20px; padding: 22px 40px; box-shadow: 0 6px 18px rgba(0,0,0,0.06); margin-bottom: 18px;">
        <span style="font-size: 5rem;" id="animalIcon">🐱</span>
        <div style="font-size: 0.85rem; font-weight: 800; color: #16a34a; margin-top: 6px;">AI CAMERA SCAN 📸</div>
      </div>
      <h4 style="font-size: 1.15rem; color: #0f172a; margin-bottom: 12px;">Which animal is this?</h4>
      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;" id="animalChoicesRow"></div>
      <div id="animalFunFactBox" style="display: none; background: #f0fdf4; border: 2px solid #86efac; border-radius: 14px; padding: 12px; margin-top: 14px; font-weight: 700; color: #166534;"></div>
    `;

    container.appendChild(wrap);

    const updateAnimal = () => {
      const a = gameData.animals[aIdx];
      document.getElementById('animalProgress').innerText = `Animal ${aIdx + 1} of ${gameData.animals.length}`;
      document.getElementById('animalIcon').innerText = a.icon;
      document.getElementById('animalFunFactBox').style.display = 'none';

      const row = document.getElementById('animalChoicesRow');
      row.innerHTML = '';
      const allNames = gameData.animals.map(x => x.name);

      allNames.forEach(name => {
        const btn = document.createElement('button');
        btn.className = 'btn-kids-3d btn-kids-white';
        btn.style.padding = '10px 20px';
        btn.style.fontSize = '1.05rem';
        btn.innerText = name;

        btn.onclick = () => {
          if (name === a.name) {
            const factBox = document.getElementById('animalFunFactBox');
            factBox.style.display = 'block';
            factBox.innerHTML = `🦁 <strong>${a.name} Fun Fact:</strong> ${a.funFact}`;
            aIdx++;
            const isLast = (aIdx >= gameData.animals.length);
            const nextLabel = isLast ? "⭐ Claim Image Detective Badge! ➡️" : "Next Animal ➡️";
            this.setFeedbackAction(`✅ AI Computer Vision Matched: ${a.name}! Read the fun fact above, then tap Next!`, true, () => {
              if (!isLast) {
                updateAnimal();
              } else {
                this.showCelebration();
              }
            }, nextLabel);
          } else {
            this.setFeedback('❌ Try again! Look closely at the animal picture!', false);
          }
        };
        row.appendChild(btn);
      });
    };

    updateAnimal();
  }

  // ========================================================
  // 7. Sound Detective 🎤 (Speech Recognition)
  // ========================================================
  renderGame7_SoundDetective(gameData, container) {
    let sIdx = 0;
    const wrap = document.createElement('div');
    wrap.style.textAlign = 'center';

    wrap.innerHTML = `
      <div style="font-weight: 800; color: #475569; margin-bottom: 8px;" id="soundProgress">Sound 1 of ${gameData.soundRiddles.length}</div>
      <div style="background: white; border: 3px solid #67e8f9; border-radius: 20px; padding: 20px; margin-bottom: 18px;">
        <span style="font-size: 3.5rem;">🎤🎶</span>
        <h3 style="font-size: 1.35rem; color: #0e7490; margin-top: 6px;" id="soundClueText"></h3>
      </div>
      <h4 style="font-size: 1.15rem; color: #0f172a; margin-bottom: 12px;">Which picture matches the sound?</h4>
      <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;" id="soundOptionsRow"></div>
    `;

    container.appendChild(wrap);

    const updateSound = () => {
      const sr = gameData.soundRiddles[sIdx];
      document.getElementById('soundProgress').innerText = `Sound ${sIdx + 1} of ${gameData.soundRiddles.length}`;
      document.getElementById('soundClueText').innerText = sr.clue;

      const optRow = document.getElementById('soundOptionsRow');
      optRow.innerHTML = '';
      sr.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn-kids-3d btn-kids-white';
        btn.style.padding = '12px 22px';
        btn.style.fontSize = '1.15rem';
        btn.innerText = opt.text;
        btn.onclick = () => {
          if (opt.isCorrect) {
            sIdx++;
            const isLast = (sIdx >= gameData.soundRiddles.length);
            const nextLabel = isLast ? "⭐ Claim Sound Master Badge! ➡️" : "Next Sound ➡️";
            this.setFeedbackAction(`✅ Speech Recognition Matched: ${opt.text}!`, true, () => {
              if (!isLast) {
                updateSound();
              } else {
                this.showCelebration();
              }
            }, nextLabel);
          } else {
            this.setFeedback('❌ That picture does not match the sound word!', false);
          }
        };
        optRow.appendChild(btn);
      });
    };

    updateSound();
  }

  // ========================================================
  // 8. Smart Sorting Challenge 🍎 (Classification)
  // ========================================================
  renderGame8_SmartSorting(gameData, container) {
    let itemIdx = 0;
    const wrap = document.createElement('div');
    wrap.style.textAlign = 'center';

    wrap.innerHTML = `
      <div style="font-weight: 800; color: #475569; margin-bottom: 8px;" id="sortProgress">Item 1 of ${gameData.items.length}</div>
      <div style="display: inline-block; background: white; border: 3px solid #cbd5e1; border-radius: 20px; padding: 18px 32px; box-shadow: 0 4px 14px rgba(0,0,0,0.06); margin-bottom: 16px;">
        <span style="font-size: 4rem;" id="sortItemIcon">🍎</span>
        <h3 style="font-size: 1.3rem; margin-top: 6px; color: #0f172a;" id="sortItemName">Apple</h3>
      </div>
      <h4 style="font-size: 1.1rem; color: #0f172a; margin-bottom: 10px;">Tap the correct category basket:</h4>
      <div class="smart-sort-grid" id="sortBinsGrid"></div>
    `;

    container.appendChild(wrap);

    const updateSortItem = () => {
      const it = gameData.items[itemIdx];
      document.getElementById('sortProgress').innerText = `Item ${itemIdx + 1} of ${gameData.items.length}`;
      document.getElementById('sortItemIcon').innerText = it.icon;
      document.getElementById('sortItemName').innerText = it.name;
    };

    const binsGrid = document.getElementById('sortBinsGrid');
    gameData.categories.forEach(cat => {
      const b = document.createElement('div');
      b.className = 'category-bin-card';
      b.innerText = cat;
      b.onclick = () => {
        const it = gameData.items[itemIdx];
        if (it.category === cat) {
          itemIdx++;
          const isLast = (itemIdx >= gameData.items.length);
          const nextLabel = isLast ? "⭐ Claim Sorting Champion Badge! ➡️" : "Next Item ➡️";
          this.setFeedbackAction(`✅ Correct! ${it.name} is classified under ${cat}!`, true, () => {
            if (!isLast) {
              updateSortItem();
            } else {
              this.showCelebration();
            }
          }, nextLabel);
        } else {
          this.setFeedback(`❌ Check if it is a fruit, veggie, animal or vehicle!`, false);
        }
      };
      binsGrid.appendChild(b);
    });

    updateSortItem();
  }

  // ========================================================
  // 9. Data Collector Adventure 📊 (Data & Information)
  // ========================================================
  renderGame9_DataCollector(gameData, container) {
    const wrap = document.createElement('div');
    wrap.style.textAlign = 'center';

    let answered1 = false;
    let answered2 = false;

    wrap.innerHTML = `
      <h4 style="font-size: 1.15rem; color: #1e1b4b; margin-bottom: 8px;">Classroom Favorite Colors Bar Chart:</h4>
      <div class="bar-chart-visual" id="liveBarChart"></div>

      <div style="background: white; border: 2px solid #e2e8f0; border-radius: 16px; padding: 16px; margin-top: 14px; text-align: left;">
        <h4 style="font-size: 1.05rem; color: #0f172a; margin-bottom: 8px;">Q1: ${gameData.questions[0].q}</h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="chartQ1Row"></div>

        <div id="chartQ2Wrap" style="display: none; margin-top: 14px;">
          <h4 style="font-size: 1.05rem; color: #0f172a; margin-bottom: 8px;">Q2: ${gameData.questions[1].q}</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="chartQ2Row"></div>
        </div>
      </div>
    `;

    container.appendChild(wrap);

    const chartBox = document.getElementById('liveBarChart');
    gameData.colorData.forEach(cd => {
      const col = document.createElement('div');
      col.className = 'bar-column';
      col.innerHTML = `
        <span style="font-weight: 800; font-size: 0.85rem; color: ${cd.hex};">${cd.count}</span>
        <div class="bar-pill" style="height: ${cd.count * 10}px; background: ${cd.hex};"></div>
        <span style="font-size: 1.15rem;">${cd.icon}</span>
        <span style="font-size: 0.75rem; font-weight: 700;">${cd.color}</span>
      `;
      chartBox.appendChild(col);
    });

    const q1Row = document.getElementById('chartQ1Row');
    gameData.questions[0].options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'btn-kids-3d btn-kids-white';
      btn.innerText = opt;
      btn.onclick = () => {
        if (idx === gameData.questions[0].correct) {
          btn.className = 'btn-kids-3d btn-kids-green';
          answered1 = true;
          document.getElementById('chartQ2Wrap').style.display = 'block';
          this.setFeedback('✅ Correct! Blue is the tallest bar with 6 votes! Now answer Question 2 below ⬇️', true);
        } else {
          this.setFeedback('❌ Look closely at which bar is the tallest!', false);
        }
      };
      q1Row.appendChild(btn);
    });

    const q2Row = document.getElementById('chartQ2Row');
    gameData.questions[1].options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'btn-kids-3d btn-kids-white';
      btn.innerText = opt;
      btn.onclick = () => {
        if (idx === gameData.questions[1].correct && answered1) {
          btn.className = 'btn-kids-3d btn-kids-green';
          this.setFeedbackAction('🎉 Awesome! You analyzed the classroom data chart correctly!', true, () => {
            this.showCelebration();
          }, '⭐ Claim Data Scientist Badge! ➡️');
        } else if (!answered1) {
          this.setFeedback('👉 Please answer Question 1 first above!', false);
        } else {
          this.setFeedback('❌ Look at the number above the Blue bar!', false);
        }
      };
      q2Row.appendChild(btn);
    });
  }

  // ========================================================
  // 10. Train Your Robot 🐱🐶 (Machine Learning)
  // ========================================================
  renderGame10_TrainYourRobot(gameData, container) {
    let tIdx = 0;
    const wrap = document.createElement('div');
    wrap.style.textAlign = 'center';

    wrap.innerHTML = `
      <div style="font-weight: 800; color: #475569; margin-bottom: 6px;">Step 1: Train Robot on Examples</div>
      <div id="mlPetCard" style="display: inline-block; background: white; border: 3px solid #cbd5e1; border-radius: 20px; padding: 18px 34px; box-shadow: 0 4px 14px rgba(0,0,0,0.06); margin-bottom: 16px;">
        <span style="font-size: 4.5rem;" id="petIcon">🐱</span>
        <h3 style="font-size: 1.3rem; margin-top: 6px;" id="petName">Cat</h3>
      </div>

      <div style="display: flex; gap: 16px; justify-content: center; margin-bottom: 18px;" id="trainPetButtons">
        <button class="btn-kids-3d" style="background:#fef3c7; color:#b45309; border:2px solid #f59e0b; padding:12px 24px;" id="btnSortCat">
          🐱 Cat Group
        </button>
        <button class="btn-kids-3d" style="background:#dbeafe; color:#1e40af; border:2px solid #3b82f6; padding:12px 24px;" id="btnSortDog">
          🐶 Dog Group
        </button>
      </div>

      <div id="testPetStage" style="display: none; background: #f0fdf4; border: 2px dashed #10b981; border-radius: 18px; padding: 18px;">
        <h4>Step 2: Test the Robot!</h4>
        <span style="font-size: 4rem;">🐱</span>
        <p style="font-size: 0.95rem; color: #334155; margin: 8px 0;">New Mystery Kitten! Can the trained robot predict it?</p>
        <button class="btn-kids-3d btn-kids-green" id="btnPredictPet">🤖 Ask Robot to Predict ➡️</button>
        <div id="petPredictRes" style="display:none; font-size:1.2rem; font-weight:800; color:#15803d; margin-top:10px;"></div>
      </div>
    `;

    container.appendChild(wrap);

    const updatePet = () => {
      const it = gameData.dataset[tIdx];
      document.getElementById('petIcon').innerText = it.icon;
      document.getElementById('petName').innerText = it.name;
    };

    const handleSort = (catChoice) => {
      const it = gameData.dataset[tIdx];
      if (it.category === catChoice) {
        tIdx++;
        if (tIdx < gameData.dataset.length) {
          this.setFeedbackAction(`✅ Example saved! Robot learned that ${it.name} is a ${catChoice}.`, true, () => {
            updatePet();
          }, "Next Example ➡️");
        } else {
          document.getElementById('mlPetCard').style.display = 'none';
          document.getElementById('trainPetButtons').style.display = 'none';
          document.getElementById('testPetStage').style.display = 'block';
          this.setFeedback('✅ Training dataset complete! Now test the robot on the mystery kitten below ⬇️', true);
        }
      } else {
        this.setFeedback('❌ Look closely if it is a cat or dog!', false);
      }
    };

    document.getElementById('btnSortCat').onclick = () => handleSort('cat');
    document.getElementById('btnSortDog').onclick = () => handleSort('dog');

    document.getElementById('btnPredictPet').onclick = () => {
      const res = document.getElementById('petPredictRes');
      res.style.display = 'block';
      res.innerHTML = '🎯 Robot Predicts: 96% CAT! Correct prediction!';
      this.setFeedbackAction('🎉 Great job! The robot learned accurately from your training examples!', true, () => {
        this.showCelebration();
      }, '⭐ Claim AI Trainer Badge! ➡️');
    };

    updatePet();
  }

  // ========================================================
  // 11. AI Training Laboratory 🧪 (AI Model Training)
  // ========================================================
  renderGame11_AITrainingLab(gameData, container) {
    let sIdx = 0;
    const wrap = document.createElement('div');
    wrap.style.textAlign = 'center';

    wrap.innerHTML = `
      <div style="font-weight: 800; color: #475569; margin-bottom: 6px;">Lab Sample ${sIdx + 1} of ${gameData.trainingSamples.length}</div>
      <div id="labSampleBox" style="display: inline-block; background: white; border: 3px solid #14b8a6; border-radius: 20px; padding: 18px 36px; box-shadow: 0 4px 14px rgba(0,0,0,0.06); margin-bottom: 16px;">
        <span style="font-size: 4.5rem;" id="labIcon">🍎</span>
        <h3 style="font-size: 1.3rem; margin-top: 6px;" id="labName">Apple</h3>
      </div>

      <div style="display: flex; gap: 14px; justify-content: center; margin-bottom: 18px;" id="labLabelButtons">
        <button class="btn-kids-3d btn-kids-white" id="btnLabelApple">🍎 Label Apple</button>
        <button class="btn-kids-3d btn-kids-white" id="btnLabelBanana">🍌 Label Banana</button>
      </div>

      <div id="labTestStage" style="display: none; background: #f0fdfa; border: 2px dashed #0d9488; border-radius: 18px; padding: 18px;">
        <h4>Model Trained! Test with New Fruit:</h4>
        <span style="font-size: 4rem;">🍎</span>
        <p style="font-size: 0.95rem; margin: 8px 0;">Testing model accuracy...</p>
        <button class="btn-kids-3d btn-kids-green" id="btnTestLab">Run Model Test ➡️</button>
        <div id="labTestRes" style="display:none; font-size:1.15rem; font-weight:800; color:#0f766e; margin-top:10px;"></div>
      </div>
    `;

    container.appendChild(wrap);

    const updateLab = () => {
      const it = gameData.trainingSamples[sIdx];
      document.getElementById('labIcon').innerText = it.icon;
      document.getElementById('labName').innerText = it.name;
    };

    const handleLabel = (lbl) => {
      const it = gameData.trainingSamples[sIdx];
      if (it.label === lbl) {
        sIdx++;
        if (sIdx < gameData.trainingSamples.length) {
          this.setFeedbackAction(`✅ Labeled sample as ${lbl}!`, true, () => {
            updateLab();
          }, "Next Sample ➡️");
        } else {
          document.getElementById('labSampleBox').style.display = 'none';
          document.getElementById('labLabelButtons').style.display = 'none';
          document.getElementById('labTestStage').style.display = 'block';
          this.setFeedback('✅ Training dataset ready! Now click "Run Model Test" below ⬇️', true);
        }
      } else {
        this.setFeedback('❌ Label the fruit correctly!', false);
      }
    };

    document.getElementById('btnLabelApple').onclick = () => handleLabel('Apple');
    document.getElementById('btnLabelBanana').onclick = () => handleLabel('Banana');

    document.getElementById('btnTestLab').onclick = () => {
      const res = document.getElementById('labTestRes');
      res.style.display = 'block';
      res.innerHTML = '🎯 Model Output: APPLE (99% Accuracy)!';
      this.setFeedbackAction('🎉 Scientist Badge earned! Training laboratory test complete!', true, () => {
        this.showCelebration();
      }, '⭐ Claim AI Scientist Badge! ➡️');
    };

    updateLab();
  }

  // ========================================================
  // 12. AI Creative Studio 🎨 (Generative AI)
  // ========================================================
  renderGame12_AICreativeStudio(gameData, container) {
    const wrap = document.createElement('div');
    wrap.style.textAlign = 'center';

    let selChar = null;
    let selAct = null;
    let selSet = null;

    wrap.innerHTML = `
      <div style="background: white; border: 2px solid #e2e8f0; border-radius: 18px; padding: 14px; margin-bottom: 16px;">
        <span style="font-weight: 800; color: #d946ef; font-size: 0.9rem;">Your Story Prompt:</span>
        <div id="creativePromptStr" style="font-size: 1.15rem; font-weight: 800; color: #1e1b4b; margin: 8px 0;">
          [Character] + [Action] + [Setting]
        </div>
        <button class="btn-kids-3d btn-kids-green" id="btnGenStory" style="display: none;">
          ✨ Generate Story & Picture!
        </button>
      </div>

      <div style="text-align: left; margin-bottom: 12px;">
        <strong style="color: #475569;">1. Character:</strong>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px;" id="rowChars"></div>
      </div>

      <div style="text-align: left; margin-bottom: 12px;">
        <strong style="color: #475569;">2. Action:</strong>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px;" id="rowActs"></div>
      </div>

      <div style="text-align: left; margin-bottom: 16px;">
        <strong style="color: #475569;">3. Setting:</strong>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px;" id="rowSets"></div>
      </div>

      <div id="creativeResultBox" style="display: none; background: #fdf4ff; border: 3px solid #f0abfc; border-radius: 20px; padding: 20px;">
        <div style="font-size: 4rem; margin-bottom: 6px;">✨🤖🌲✨</div>
        <h3 style="color: #a21caf; font-size: 1.3rem;">Story Generated!</h3>
        <p id="generatedStoryText" style="font-size: 1rem; color: #701a75; font-weight: 600; margin-top: 6px;"></p>
      </div>
    `;

    container.appendChild(wrap);

    const updatePrompt = () => {
      document.getElementById('creativePromptStr').innerText = `${selChar || '[Character]'} ${selAct || '[Action]'} ${selSet || '[Setting]'}`;
      if (selChar && selAct && selSet) {
        document.getElementById('btnGenStory').style.display = 'inline-block';
      }
    };

    gameData.options.character.forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'btn-kids-3d btn-kids-white';
      btn.innerText = c;
      btn.onclick = () => {
        document.querySelectorAll('#rowChars button').forEach(b => b.classList.remove('btn-kids-green'));
        btn.classList.add('btn-kids-green');
        selChar = c;
        updatePrompt();
      };
      document.getElementById('rowChars').appendChild(btn);
    });

    gameData.options.action.forEach(a => {
      const btn = document.createElement('button');
      btn.className = 'btn-kids-3d btn-kids-white';
      btn.innerText = a;
      btn.onclick = () => {
        document.querySelectorAll('#rowActs button').forEach(b => b.classList.remove('btn-kids-green'));
        btn.classList.add('btn-kids-green');
        selAct = a;
        updatePrompt();
      };
      document.getElementById('rowActs').appendChild(btn);
    });

    gameData.options.setting.forEach(s => {
      const btn = document.createElement('button');
      btn.className = 'btn-kids-3d btn-kids-white';
      btn.innerText = s;
      btn.onclick = () => {
        document.querySelectorAll('#rowSets button').forEach(b => b.classList.remove('btn-kids-green'));
        btn.classList.add('btn-kids-green');
        selSet = s;
        updatePrompt();
      };
      document.getElementById('rowSets').appendChild(btn);
    });

    document.getElementById('btnGenStory').onclick = () => {
      const box = document.getElementById('creativeResultBox');
      box.style.display = 'block';
      document.getElementById('generatedStoryText').innerText = `"Once upon a time, a ${selChar} was seen ${selAct} ${selSet}, making wonderful discoveries with AI imagination!"`;
      this.setFeedbackAction('✨ Generative AI creation complete! Your story has been generated!', true, () => {
        this.showCelebration();
      }, '⭐ Claim Creative Genius Badge! ➡️');
    };
  }

  // ========================================================
  // 13. Build Your Own Chatbot 💬 (Chatbots)
  // ========================================================
  renderGame13_BuildChatbot(gameData, container) {
    const wrap = document.createElement('div');
    let currentStep = 0;

    wrap.innerHTML = `
      <div class="chatbot-phone-frame">
        <div style="background: #10b981; color: white; padding: 12px 16px; font-weight: 800; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;">
          <span>🤖</span> AI School Chatbot
        </div>
        <div class="phone-chat-body" id="phoneChatBox"></div>
      </div>

      <div style="margin-top: 14px; text-align: center;">
        <span style="font-weight: 800; color: #475569; font-size: 0.95rem;">Pick the best answer for the robot:</span>
        <div class="chatbot-choices-row" id="chatbotChoicesContainer" style="margin-top: 8px;"></div>
      </div>
    `;

    container.appendChild(wrap);

    const updateStep = () => {
      const step = gameData.flowSteps[currentStep];
      const chatBox = document.getElementById('phoneChatBox');
      const choicesBox = document.getElementById('chatbotChoicesContainer');

      const userBubble = document.createElement('div');
      userBubble.className = 'chat-bubble user';
      userBubble.innerText = step.userMessage.replace('User: ', '');
      chatBox.appendChild(userBubble);
      chatBox.scrollTop = 9999;

      choicesBox.innerHTML = '';
      step.choices.forEach((c, idx) => {
        const btn = document.createElement('button');
        btn.className = 'btn-kids-3d btn-kids-white';
        btn.style.display = 'block';
        btn.style.width = '100%';
        btn.style.marginBottom = '8px';
        btn.style.textAlign = 'left';
        btn.innerText = c;

        btn.onclick = () => {
          if (idx === step.correct) {
            const botBubble = document.createElement('div');
            botBubble.className = 'chat-bubble bot';
            botBubble.innerText = c.replace('Bot: ', '');
            chatBox.appendChild(botBubble);
            chatBox.scrollTop = 9999;

            currentStep++;
            const isLast = (currentStep >= gameData.flowSteps.length);
            const nextLabel = isLast ? "⭐ Claim Chatbot Creator Badge! ➡️" : "Next Question Block ➡️";
            this.setFeedbackAction('✅ Friendly and accurate chatbot reply added to chat!', true, () => {
              if (!isLast) {
                updateStep();
              } else {
                this.showCelebration();
              }
            }, nextLabel);
          } else {
            this.setFeedback('❌ Pick a friendly, helpful reply for the chatbot!', false);
          }
        };
        choicesBox.appendChild(btn);
      });
    };

    updateStep();
  }

  // ========================================================
  // 14. Smart Traffic Controller 🚦 (AI Problem-Solving)
  // ========================================================
  renderGame14_TrafficController(gameData, container) {
    const wrap = document.createElement('div');

    wrap.innerHTML = `
      <div class="traffic-intersection-board">
        <h4 style="font-size: 1.15rem; color: #f8fafc; margin-bottom: 12px; text-align: center;">
          🚦 City Intersection Camera Feed
        </h4>
        <div id="trafficRoadsList"></div>
      </div>

      <div style="text-align: center; margin-top: 14px;">
        <h4 style="font-size: 1.15rem; color: #0f172a; margin-bottom: 12px;">
          Which road should turn GREEN first?
        </h4>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;" id="trafficDecisionButtons"></div>
      </div>
    `;

    container.appendChild(wrap);

    const roadsList = document.getElementById('trafficRoadsList');
    const btnsRow = document.getElementById('trafficDecisionButtons');

    gameData.scenario.roads.forEach(road => {
      const row = document.createElement('div');
      row.className = 'traffic-lane';
      row.innerHTML = `
        <div>
          <strong style="color: ${road.isPriority ? '#fca5a5' : '#93c5fd'};">${road.name}:</strong>
          <div style="font-size: 1.25rem; margin-top: 4px;">${road.detail}</div>
        </div>
        <div class="traffic-signal-light red" id="light_${road.id}"></div>
      `;
      roadsList.appendChild(row);

      const btn = document.createElement('button');
      btn.className = `btn-kids-3d ${road.isPriority ? 'btn-kids-green' : 'btn-kids-white'}`;
      btn.innerText = `Green for ${road.name}`;
      btn.onclick = () => {
        if (road.isPriority) {
          document.getElementById(`light_${road.id}`).className = 'traffic-signal-light green';
          this.setFeedbackAction('🚑 The emergency ambulance sped through safely! Priority rule verified!', true, () => {
            this.showCelebration();
          }, '⭐ Claim Smart Problem Solver Badge! ➡️');
        } else {
          this.setFeedback('❌ Emergency ambulances carrying patients must always get priority first!', false);
        }
      };
      btnsRow.appendChild(btn);
    });
  }

  // ========================================================
  // 15. AI Safety Detective 🛡️ (Responsible & Safe AI)
  // ========================================================
  renderGame15_AISafety(gameData, container) {
    let sIdx = 0;
    const wrap = document.createElement('div');
    wrap.style.textAlign = 'center';

    wrap.innerHTML = `
      <div style="max-width: 480px; margin: 0 auto; background: white; border: 3px solid #fef08a; border-radius: 20px; padding: 22px; box-shadow: 0 8px 20px rgba(0,0,0,0.06); margin-bottom: 18px;">
        <span class="free-badge" style="background: #fef3c7; color: #b45309;" id="safetyProgress">Situation 1 of ${gameData.situations.length}</span>
        <div style="background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 14px; padding: 18px; font-size: 1.05rem; font-weight: 700; color: #1e293b; margin: 14px 0;" id="safetyText"></div>

        <div style="display: flex; gap: 14px; justify-content: center;">
          <button class="btn-kids-3d" style="background:#fee2e2; color:#b91c1c; border:2px solid #ef4444; padding:12px 22px; font-size:1.05rem;" id="btnSafetyUnsafe">
            🚨 Unsafe / Risky
          </button>
          <button class="btn-kids-3d btn-kids-green" style="padding:12px 22px; font-size:1.05rem;" id="btnSafetySafe">
            ✅ Safe Action
          </button>
        </div>
      </div>
    `;

    container.appendChild(wrap);

    const updateSit = () => {
      const s = gameData.situations[sIdx];
      document.getElementById('safetyProgress').innerText = `Situation ${sIdx + 1} of ${gameData.situations.length}`;
      document.getElementById('safetyText').innerText = `"${s.text}"`;
    };

    const handleVerdict = (userSafe) => {
      const s = gameData.situations[sIdx];
      if (s.isSafe === userSafe) {
        sIdx++;
        const isLast = (sIdx >= gameData.situations.length);
        const nextLabel = isLast ? "⭐ Claim AI Safety Champion Badge! ➡️" : "Next Situation ➡️";
        this.setFeedbackAction(`✅ Correct! ${s.explanation}`, true, () => {
          if (!isLast) {
            updateSit();
          } else {
            this.showCelebration();
          }
        }, nextLabel);
      } else {
        this.setFeedback(`❌ Warning! ${s.explanation}`, false);
      }
    };

    document.getElementById('btnSafetySafe').onclick = () => handleVerdict(true);
    document.getElementById('btnSafetyUnsafe').onclick = () => handleVerdict(false);

    updateSit();
  }

  // ========================================================
  // Celebration Screen & Level Unlocking
  // ========================================================
  showCelebration() {
    document.getElementById('arenaPlayArea').style.display = 'none';
    const celeb = document.getElementById('arenaCelebrationView');
    if (celeb) celeb.style.display = 'block';

    const starsAwarded = 3;
    KidsState.recordGameComplete(this.currentGame.id, starsAwarded, 10);

    const starsRow = document.getElementById('celebStarsRow');
    if (starsRow) {
      starsRow.innerHTML = '';
      for (let i = 0; i < 3; i++) {
        const s = document.createElement('span');
        s.className = `celeb-star active`;
        s.innerText = '⭐';
        starsRow.appendChild(s);
      }
    }

    const scoreGained = document.getElementById('celebScoreGained');
    if (scoreGained) scoreGained.innerText = `+10 Stars & Badge Earned!`;

    const nextBtn = document.getElementById('nextLevelBtn');
    if (nextBtn) {
      const catalog = KIDS_GAMES_CATALOG;
      const currentIdx = catalog.findIndex(g => g.id === this.currentGame.id);

      if (currentIdx !== -1 && currentIdx + 1 < catalog.length) {
        const nextGame = catalog[currentIdx + 1];
        nextBtn.innerHTML = `Next Game: ${nextGame.title} ➡️`;
        nextBtn.onclick = () => this.openGame(nextGame.id);
      } else {
        nextBtn.innerHTML = '🏆 You are an AI Champion!';
        nextBtn.onclick = () => this.closeArena();
      }
    }
  }

  openDailyModal() {
    const modal = document.getElementById('dailyModal');
    if (!modal) return;
    modal.classList.remove('hidden');

    const container = document.getElementById('dailyActivitiesList');
    if (container) {
      container.innerHTML = `
        <div class="daily-act-item">
          <div><strong>1. AI or Not:</strong> Is a smart phone voice assistant AI?</div>
          <button class="btn-kids-3d btn-kids-white" style="padding: 6px 14px; font-size: 0.85rem;" onclick="this.className='btn-kids-3d btn-kids-green'; this.innerText='✓ Solved (Yes AI!)';">Solve</button>
        </div>
        <div class="daily-act-item">
          <div><strong>2. Robot Logic:</strong> Tap path: ⬆️ ➡️ ⬆️</div>
          <button class="btn-kids-3d btn-kids-white" style="padding: 6px 14px; font-size: 0.85rem;" onclick="this.className='btn-kids-3d btn-kids-green'; this.innerText='✓ Path OK!';">Solve</button>
        </div>
        <div class="daily-act-item">
          <div><strong>3. Safety Check:</strong> Is sharing secret house address safe?</div>
          <button class="btn-kids-3d btn-kids-white" style="padding: 6px 14px; font-size: 0.85rem;" onclick="this.className='btn-kids-3d btn-kids-green'; this.innerText='✓ Solved (Never Share!)';">Solve</button>
        </div>
        <div id="dailyRewardFeedback" style="display:none; margin-top:10px; font-weight:800; color:#15803d; text-align:center;"></div>
      `;
    }

    const claimBtn = document.getElementById('claimDailyRewardBtn');
    if (claimBtn) {
      claimBtn.onclick = () => {
        if (KidsState.currentProfile) {
          KidsState.currentProfile.totalStars += 50;
          KidsState.currentProfile.totalScore += 50;
          KidsState.save();
          this.updateHUD();
        }
        const rf = document.getElementById('dailyRewardFeedback');
        if (rf) {
          rf.innerText = '🎉 +50 Bonus Stars Added to your Profile!';
          rf.style.display = 'block';
        }
        setTimeout(() => {
          modal.classList.add('hidden');
        }, 1000);
      };
    }
  }

  openRewardsModal() {
    const modal = document.getElementById('rewardsModal');
    if (!modal) return;
    modal.classList.remove('hidden');

    const grid = document.getElementById('badgesGridContainer');
    if (!grid) return;
    grid.innerHTML = '';

    const badgesList = KidsState.currentProfile ? KidsState.currentProfile.unlockedBadges : [];

    KIDS_BADGES_DATA.forEach(badge => {
      const isUnlocked = badgesList.includes(badge.id);
      const card = document.createElement('div');
      card.className = `badge-card ${isUnlocked ? 'unlocked' : 'locked'}`;
      card.innerHTML = `
        <div class="badge-card-icon">${badge.icon}</div>
        <div class="badge-card-title">${badge.name}</div>
        <div class="badge-card-desc">${badge.desc}</div>
        <span style="font-size:0.75rem; font-weight:800; color:${isUnlocked ? '#10b981' : '#94a3b8'}; margin-top:6px; display:inline-block;">
          ${isUnlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}
        </span>
      `;
      grid.appendChild(card);
    });
  }
}

let game = null;
document.addEventListener('DOMContentLoaded', () => {
  game = new KidsAdventureGame();
  game.init();
});
