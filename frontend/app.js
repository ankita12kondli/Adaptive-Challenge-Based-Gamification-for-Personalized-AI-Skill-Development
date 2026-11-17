// ========================================================
// SkillSpring AI - Landing Page Interactions & Auth Handlers
// Adaptive Challenge-Based Gamification Platform
// SkillSpring AI Platform
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  // Modal Elements
  const userModal = document.getElementById('userModal');
  const adminModal = document.getElementById('adminModal');
  const userModalClose = document.getElementById('userModalClose');
  const adminModalClose = document.getElementById('adminModalClose');

  const userLoginNavBtn = document.getElementById('userLoginNavBtn');
  const adminLoginNavBtn = document.getElementById('adminLoginNavBtn');
  const rocketActionBtn = document.getElementById('rocketActionBtn');
  const footerAdminLink = document.getElementById('footerAdminLink');

  const tabLoginBtn = document.getElementById('tabLoginBtn');
  const tabRegisterBtn = document.getElementById('tabRegisterBtn');
  const userLoginForm = document.getElementById('userLoginForm');
  const userRegisterForm = document.getElementById('userRegisterForm');
  const loginRoleSelect = document.getElementById('loginRole');
  const adminLoginForm = document.getElementById('adminLoginForm');

  // In-Page Notification Helper (Replaces all browser alert popups)
  function showOnScreenNotice(containerId, message, type = 'success') {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.style.display = 'block';

    if (type === 'success') {
      container.style.background = '#ecfdf5';
      container.style.border = '2px solid #10b981';
      container.style.color = '#065f46';
      container.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.2)';
    } else if (type === 'error') {
      container.style.background = '#fef2f2';
      container.style.border = '2px solid #ef4444';
      container.style.color = '#991b1b';
      container.style.boxShadow = '0 6px 16px rgba(239, 68, 68, 0.2)';
    } else {
      container.style.background = '#eff6ff';
      container.style.border = '2px solid #3b82f6';
      container.style.color = '#1e40af';
      container.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.2)';
    }
    container.innerHTML = message;
  }

  function clearNotice(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
      container.style.display = 'none';
      container.innerHTML = '';
    }
  }

  // Open User Modal
  function openUserModal(preferredRole = 'adult', isRegister = false) {
    clearNotice('userModalNotice');
    if (loginRoleSelect) loginRoleSelect.value = preferredRole;
    const regRoleSelect = document.getElementById('regRole');
    if (regRoleSelect) regRoleSelect.value = preferredRole;

    userModal.classList.remove('hidden');
    if (isRegister) {
      activateTab('register');
    } else {
      activateTab('login');
    }
  }

  // Open Admin Modal
  function openAdminModal() {
    clearNotice('adminModalNotice');
    adminModal.classList.remove('hidden');
  }

  // Close Modals
  function closeUserModal() {
    clearNotice('userModalNotice');
    userModal.classList.add('hidden');
  }

  function closeAdminModal() {
    clearNotice('adminModalNotice');
    adminModal.classList.add('hidden');
  }

  // Tabs Switch
  function activateTab(tab) {
    clearNotice('userModalNotice');
    if (tab === 'login') {
      tabLoginBtn.classList.add('active');
      tabRegisterBtn.classList.remove('active');
      userLoginForm.classList.remove('hidden');
      userRegisterForm.classList.add('hidden');
    } else {
      tabRegisterBtn.classList.add('active');
      tabLoginBtn.classList.remove('active');
      userRegisterForm.classList.remove('hidden');
      userLoginForm.classList.add('hidden');
    }
  }

  // Triggers
  if (userLoginNavBtn) {
    userLoginNavBtn.addEventListener('click', () => openUserModal('adult'));
  }
  if (rocketActionBtn) {
    rocketActionBtn.addEventListener('click', () => openUserModal('adult', true));
  }
  if (adminLoginNavBtn) {
    adminLoginNavBtn.addEventListener('click', openAdminModal);
  }
  if (footerAdminLink) {
    footerAdminLink.addEventListener('click', (e) => {
      e.preventDefault();
      openAdminModal();
    });
  }

  // Path card triggers
  document.querySelectorAll('.path-login-trigger').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const role = btn.getAttribute('data-role') || 'student';

      // Check if user is already logged in for this role
      let activeUser = null;
      try {
        const activeRaw = localStorage.getItem('skillspring_active_user');
        if (activeRaw) activeUser = JSON.parse(activeRaw);
      } catch (err) {}

      if (activeUser && activeUser.role === role) {
        if (role === 'adult') {
          window.location.href = 'adult.html';
          return;
        } else if (role === 'student') {
          window.location.href = 'student.html';
          return;
        }
      }

      // If not logged in, prompt sign in / create account modal for this role
      openUserModal(role);
    });
  });

  // Check URL query parameters (e.g. after logout or direct login redirect)
  const urlParams = new URLSearchParams(window.location.search);
  const promptLogin = urlParams.get('login');
  if (promptLogin === 'adult' || promptLogin === 'student') {
    openUserModal(promptLogin);
  }

  // Close buttons
  if (userModalClose) userModalClose.addEventListener('click', closeUserModal);
  if (adminModalClose) adminModalClose.addEventListener('click', closeAdminModal);

  // Outside click
  window.addEventListener('click', (e) => {
    if (e.target === userModal) closeUserModal();
    if (e.target === adminModal) closeAdminModal();
  });

  // Tab switch click handlers
  if (tabLoginBtn) tabLoginBtn.addEventListener('click', () => activateTab('login'));
  if (tabRegisterBtn) tabRegisterBtn.addEventListener('click', () => activateTab('register'));

  // ----------------------------------------------------
  // User Login Form Submit (Strict Role-Based Access Control)
  // ----------------------------------------------------
  if (userLoginForm) {
    userLoginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearNotice('userModalNotice');

      const emailInput = document.getElementById('userEmail');
      const passwordInput = document.getElementById('userPassword');
      const email = emailInput ? emailInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value : '';
      const selectedRole = loginRoleSelect ? loginRoleSelect.value : 'adult';

      const submitBtn = userLoginForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Signing In...';
      }

      // Check registered users lookup from localStorage
      let usersRegistry = {};
      try {
        const rawUsers = localStorage.getItem('skillspring_users');
        if (rawUsers) usersRegistry = JSON.parse(rawUsers);
      } catch (err) {}

      const roleLabels = {
        student: 'Student (College AI & Programming)',
        adult: 'Adult 35+ (Practical & Daily AI)',
        kid: 'Kids (Ages 7–14 Visual AI)'
      };

      const foundUser = usersRegistry[email.toLowerCase()];

      // 1. Strict Role Verification from local registry
      if (foundUser && foundUser.role && foundUser.role !== 'admin' && foundUser.role !== selectedRole) {
        const actualTrack = roleLabels[foundUser.role] || foundUser.role;
        const attemptedTrack = roleLabels[selectedRole] || selectedRole;
        showOnScreenNotice(
          'userModalNotice',
          `⛔ <strong>Access Denied: Role Mismatch!</strong><br>` +
          `The account <strong>${email}</strong> is registered under the <strong>${actualTrack}</strong>.<br>` +
          `You cannot log into the <strong>${attemptedTrack}</strong> with this account.<br>` +
          `Please change "I am learning as" to <strong>${actualTrack}</strong> to continue.`,
          'error'
        );
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = 'Sign In & Continue ➡️';
        }
        return;
      }

      let resolvedName = (foundUser && foundUser.name)
        ? foundUser.name
        : (email ? email.split('@')[0] : 'Learner');

      // Capitalize first letter nicely (e.g. shobha -> Shobha)
      if (resolvedName && typeof resolvedName === 'string') {
        resolvedName = resolvedName.charAt(0).toUpperCase() + resolvedName.slice(1);
      }

      // User model
      let loggedUser = {
        name: resolvedName,
        email: email,
        role: (foundUser && foundUser.role) ? foundUser.role : selectedRole,
        current_level: 'medium',
        total_points: 0
      };

      // 2. Attempt backend API call with strict role verification
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, role: selectedRole })
        });

        if (response.status === 403) {
          const errData = await response.json();
          showOnScreenNotice(
            'userModalNotice',
            `⛔ <strong>Access Denied!</strong><br>${errData.error || 'Your account does not match this learning track.'}`,
            'error'
          );
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = 'Sign In & Continue ➡️';
          }
          return;
        }

        if (response.status === 401) {
          showOnScreenNotice(
            'userModalNotice',
            `❌ <strong>Invalid Email or Password!</strong><br>Please verify your email address and password.`,
            'error'
          );
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = 'Sign In & Continue ➡️';
          }
          return;
        }

        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            if (data.user.role && data.user.role !== 'admin' && data.user.role !== selectedRole) {
              const actualTrack = roleLabels[data.user.role] || data.user.role;
              const attemptedTrack = roleLabels[selectedRole] || selectedRole;
              showOnScreenNotice(
                'userModalNotice',
                `⛔ <strong>Access Denied: Role Mismatch!</strong><br>` +
                `This account is registered under <strong>${actualTrack}</strong>. You cannot log into <strong>${attemptedTrack}</strong>.`,
                'error'
              );
              if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = 'Sign In & Continue ➡️';
              }
              return;
            }
            if (data.user.name) loggedUser.name = data.user.name;
            if (data.user.role) loggedUser.role = data.user.role;
          }
          if (data.token) {
            localStorage.setItem('skillspring_token', data.token);
          }
        }
      } catch (err) {
        console.log('Operating in local-first demo mode:', err.message);
      }

      // Save to localStorage
      localStorage.setItem('skillspring_active_user', JSON.stringify(loggedUser));

      if (loggedUser.role === 'adult') {
        let existingAdult = {};
        try {
          const raw = localStorage.getItem('skillspring_adult_learner');
          if (raw) existingAdult = JSON.parse(raw);
        } catch (err) {}

        const isSameAccount = existingAdult.email === email || (!existingAdult.email && existingAdult.name === loggedUser.name);

        const adultProfile = {
          name: loggedUser.name,
          email: loggedUser.email,
          role: 'adult',
          ageGroup: existingAdult.ageGroup || '35–45 Years',
          stars: isSameAccount ? (existingAdult.stars || 0) : 0,
          completedLessons: isSameAccount ? (existingAdult.completedLessons || []) : [],
          phone: isSameAccount ? (existingAdult.phone || '') : '',
          preferredLanguage: existingAdult.preferredLanguage || 'en',
          fontSize: existingAdult.fontSize || 'large',
          lastActiveDate: new Date().toLocaleDateString('en-GB')
        };
        localStorage.setItem('skillspring_adult_learner', JSON.stringify(adultProfile));

        showOnScreenNotice(
          'userModalNotice',
          `✅ <strong>Logged in successfully!</strong><br>Welcome back, <strong>${adultProfile.name}</strong>! Redirecting to Adult Learning Zone...`,
          'success'
        );

        setTimeout(() => {
          window.location.href = 'adult.html';
        }, 800);
      } else if (loggedUser.role === 'kid') {
        // Child path
        localStorage.setItem('skillspring_active_child', loggedUser.name);
        showOnScreenNotice(
          'userModalNotice',
          `✅ <strong>Logged in successfully!</strong><br>Welcome, <strong>${loggedUser.name}</strong>! Redirecting to Kids AI Discovery Zone...`,
          'success'
        );

        setTimeout(() => {
          window.location.href = 'kids.html';
        }, 800);
      } else {
        // Student path
        let existingStudent = {};
        try {
          const raw = localStorage.getItem('skillspring_student_learner');
          if (raw) existingStudent = JSON.parse(raw);
        } catch (err) {}

        const isSameStudent = existingStudent.email === email || (!existingStudent.email && existingStudent.name === loggedUser.name);
        const studentProfile = {
          name: loggedUser.name,
          email: loggedUser.email,
          role: 'student',
          college: existingStudent.college || 'Department of Computer Science & Engineering',
          degree: existingStudent.degree || 'MCA / B.Tech Computer Science',
          stars: isSameStudent ? (existingStudent.stars || 0) : 0,
          completedTopics: isSameStudent ? (existingStudent.completedTopics || []) : [],
          quizScores: isSameStudent ? (existingStudent.quizScores || {}) : {},
          badges: isSameStudent ? (existingStudent.badges || []) : [],
          streak: isSameStudent ? (existingStudent.streak || 1) : 1,
          lastActiveDate: new Date().toLocaleDateString('en-GB')
        };
        localStorage.setItem('skillspring_student_learner', JSON.stringify(studentProfile));

        showOnScreenNotice(
          'userModalNotice',
          `✅ <strong>Logged in successfully!</strong><br>Welcome back, <strong>${loggedUser.name}</strong>! Redirecting to Student Learning Zone...`,
          'success'
        );

        setTimeout(() => {
          window.location.href = 'student.html';
        }, 800);
      }
    });
  }

  // ----------------------------------------------------
  // User Register Form Submit
  // ----------------------------------------------------
  if (userRegisterForm) {
    userRegisterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearNotice('userModalNotice');

      const nameInput = document.getElementById('regName');
      const emailInput = document.getElementById('regEmail');
      const passwordInput = document.getElementById('regPassword');
      const regRoleInput = document.getElementById('regRole');

      let rawName = nameInput ? nameInput.value.trim() : 'Learner';
      // Format name nicely (e.g. shobha -> Shobha)
      const name = rawName.charAt(0).toUpperCase() + rawName.slice(1);
      const email = emailInput ? emailInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value : '';
      const role = regRoleInput ? regRoleInput.value : 'adult';

      const submitBtn = userRegisterForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Creating Account...';
      }

      // Save into registered users registry so future logins enforce this role
      let usersRegistry = {};
      try {
        const rawUsers = localStorage.getItem('skillspring_users');
        if (rawUsers) usersRegistry = JSON.parse(rawUsers);
      } catch (err) {}

      usersRegistry[email.toLowerCase()] = {
        name: name,
        email: email,
        role: role
      };
      localStorage.setItem('skillspring_users', JSON.stringify(usersRegistry));

      let newUser = {
        name: name,
        email: email,
        role: role,
        current_level: 'medium',
        total_points: 0
      };

      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, role })
        });
        if (response.ok) {
          const data = await response.json();
          if (data.user && data.user.name) {
            newUser.name = data.user.name;
          }
          if (data.token) {
            localStorage.setItem('skillspring_token', data.token);
          }
        }
      } catch (err) {
        console.log('Operating in local-first demo mode:', err.message);
      }

      localStorage.setItem('skillspring_active_user', JSON.stringify(newUser));

      if (role === 'adult') {
        const adultProfile = {
          name: name,
          email: email,
          role: 'adult',
          ageGroup: '35–45 Years',
          stars: 0,
          completedLessons: [],
          phone: '',
          preferredLanguage: 'en',
          fontSize: 'large',
          lastActiveDate: new Date().toLocaleDateString('en-GB')
        };
        localStorage.setItem('skillspring_adult_learner', JSON.stringify(adultProfile));

        showOnScreenNotice(
          'userModalNotice',
          `🎉 <strong>Account created successfully!</strong><br>Welcome, <strong>${name}</strong>! Redirecting to Adult Learning Zone...`,
          'success'
        );

        setTimeout(() => {
          window.location.href = 'adult.html';
        }, 900);
      } else if (role === 'kid') {
        // Child registration
        let childProfiles = {};
        try {
          const raw = localStorage.getItem('skillspring_child_profiles');
          if (raw) childProfiles = JSON.parse(raw);
        } catch (e) {}
        childProfiles[name] = {
          name: name,
          age: 10,
          standard: 'Middle School',
          avatar: '🤖',
          completedGames: {},
          unlockedGames: ['ai_or_not'],
          totalStars: 0,
          totalScore: 0,
          unlockedBadges: [],
          streakDays: 1,
          lastPlayedDate: new Date().toISOString().split('T')[0]
        };
        localStorage.setItem('skillspring_child_profiles', JSON.stringify(childProfiles));
        localStorage.setItem('skillspring_active_child', name);

        showOnScreenNotice(
          'userModalNotice',
          `🎉 <strong>Account created successfully!</strong><br>Welcome, <strong>${name}</strong>! Redirecting to Kids AI Discovery Zone...`,
          'success'
        );

        setTimeout(() => {
          window.location.href = 'kids.html';
        }, 900);
      } else {
        // Student path
        const studentProfile = {
          name: name,
          email: email,
          role: 'student',
          college: 'Department of Computer Science & Engineering',
          degree: 'MCA / B.Tech Computer Science',
          stars: 0,
          completedTopics: [],
          quizScores: {},
          badges: [],
          streak: 1,
          lastActiveDate: new Date().toLocaleDateString('en-GB')
        };
        localStorage.setItem('skillspring_student_learner', JSON.stringify(studentProfile));

        showOnScreenNotice(
          'userModalNotice',
          `🎉 <strong>Account created successfully!</strong><br>Welcome, <strong>${name}</strong>! Redirecting to Student Learning Zone...`,
          'success'
        );

        setTimeout(() => {
          window.location.href = 'student.html';
        }, 900);
      }
    });
  }

  // ----------------------------------------------------
  // Admin Login Form Submit
  // ----------------------------------------------------
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearNotice('adminModalNotice');

      const emailInput = document.getElementById('adminEmail');
      const passwordInput = document.getElementById('adminPassword');
      const email = emailInput ? emailInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value : '';

      const submitBtn = adminLoginForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Verifying Admin...';
      }

      const adminUser = {
        name: 'System Administrator',
        email: email,
        role: 'admin',
        loggedInAt: new Date().toISOString()
      };
      localStorage.setItem('skillspring_admin_user', JSON.stringify(adminUser));

      // Display on-screen in-page notice (NO BROWSER POPUP)
      showOnScreenNotice(
        'adminModalNotice',
        `🛡️ <strong>Administrator Authenticated!</strong><br>Access granted. Redirecting to Admin Management Portal...`,
        'success'
      );

      setTimeout(() => {
        window.location.href = 'admin.html';
      }, 1000);
    });
  }
});
