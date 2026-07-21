/* ==========================================================================
   EDUSPHERE FRONTEND ENGINE - LOCALIZATION, MATCHMAKING & INTERACTIVE UI
   ========================================================================== */

// Translation Dictionary (i18n Engine)
const translations = {
  en: {
    "logo-sub": "(سفينة المستقبل التعليمية)",
    "nav-dashboard": "Dashboard",
    "nav-teamfinder": "Team Finder",
    "nav-showroom": "Project Showroom",
    "nav-evaluator": "Hub Manager",
    "notif-title": "Notifications",
    "notif-clear": "Clear",
    "notif-welcome": "Welcome to EduSphere terminal system! Register a new account or log in.",
    "notif-now": "Just now",
    "notif-matching": "Database scanned: 3 software engineers matching your current profile.",
    "notif-hours": "3 hours ago",
    "menu-profile": "My Profile",
    "menu-settings": "Settings",
    "menu-logout": "Logout",
    
    // Auth Panel
    "auth-brand-subtitle": "سفينة المستقبل التعليمية",
    "auth-brand-desc": "The elite command dashboard for student engineering teams. Register profiles, search core skills, display timelines, and submit project evaluations to reviewing academics.",
    "login-title": "Access Terminal",
    "login-subtitle": "Initialize credential logs to unlock access",
    "field-name": "Full Name",
    "field-email": "Email Address",
    "field-pass": "Password",
    "field-std-id": "Student Identification Number",
    "field-major-placeholder": "Select Your Engineering Major",
    "major-ce": "Computer Engineering",
    "major-se": "Software Engineering",
    "major-ai": "Artificial Intelligence & Data science",
    "major-es": "Embedded Hardware Systems",
    "btn-access": "Access Terminal",

    // Dashboard
    "badge-student": "Student Node",
    "lbl-id": "ID:",
    "lbl-major": "Major:",
    "title-skills": "Skills Matrix",
    "lbl-active-proj": "Active Project Platform",
    "title-checklist": "Deliverable Checklist",
    "title-debugger": "Embedded Smart Debugger",
    "subtitle-debugger": "Static analysis console for logical scans",
    "dbg-sys-init": "EduSphere Analyzer v4.9 initialized. Submit syntax elements for compiler checking.",
    "dbg-placeholder": "Paste your broken code or logic error here...",
    "dbg-btn-scan": "SCAN & RUN DEBUGGER",
    "title-reg-project": "Register New Project Node",
    "subtitle-reg-project": "Configure your project specs to open team recruiting",
    "field-proj-title": "Project Name",
    "field-proj-desc": "Project Overview & Description",
    "field-proj-tech": "Tech Stack (comma-separated, e.g. Arduino, C++)",
    "field-proj-demo": "Live Demo Link (URL)",
    "field-proj-code": "Explore Codebase Link (URL)",
    "btn-reg-proj": "Register Platform Node",

    // Team Finder
    "search-placeholder": "Filter by Name, Major, or Projects...",
    "lbl-skill-pills": "Skills Filter:",

    // Evaluator
    "warn-denied-title": "Terminal Security Violation",
    "warn-denied-desc": "Access to the Academic Grade Commitment interface is restricted. Log in as an Evaluator/Reviewing Engineer to access dashboard metrics.",
    "title-matrix": "Engineering Groups Matrix",
    "col-group": "Group ID",
    "col-proj": "Project Name",
    "col-members": "Team Members",
    "col-completion": "Completion",
    "col-status": "Status",
    "eval-sidebar-empty": "Select a group project from the matrix to initialize the grading console.",
    "title-grading": "Academic Evaluation Console",
    "slider-ui": "UI/UX Design Interface",
    "slider-arch": "Code Architecture & QC",
    "slider-db": "Database & Async Efficiency",
    "slider-innov": "Novelty & Engineering Innovation",
    "lbl-average-score": "CUMULATIVE METRIC",
    "field-commentary": "Technical Review & Feedback",
    "btn-commit": "Commit Final Evaluation",
    "title-review-logs": "Reviews submitted by other Engineers"
  },
  ar: {
    "logo-sub": "(سفينة المستقبل التعليمية)",
    "nav-dashboard": "لوحة التحكم",
    "nav-teamfinder": "البحث عن فريق",
    "nav-showroom": "معرض المشاريع",
    "nav-evaluator": "منصة التقييم",
    "notif-title": "الإشعارات",
    "notif-clear": "مسح",
    "notif-welcome": "أهلاً بك في نظام EduSphere! يرجى تسجيل حساب جديد أو تسجيل الدخول.",
    "notif-now": "الآن",
    "notif-matching": "تم فحص قاعدة البيانات: تم العثور على 3 مهندسين يطابقون مهاراتك.",
    "notif-hours": "منذ 3 ساعات",
    "menu-profile": "الملف الشخصي",
    "menu-settings": "الإعدادات",
    "menu-logout": "تسجيل الخروج",

    // Auth Panel
    "auth-brand-subtitle": "سفينة المستقبل التعليمية",
    "auth-brand-desc": "لوحة القيادة البرمجية المتقدمة لفرق المهندسين من الطلاب. قم بتسجيل ملفك التعريفي، ابحث عن المهارات الأساسية، واستعرض تفاصيل المشروع، وأرسل تقييمات المشاريع للأكاديميين المراجعين.",
    "login-title": "بوابة الدخول للمنظومة",
    "login-subtitle": "سجل الدخول لتنشيط الاتصال بالخادم",
    "field-name": "الاسم الكامل",
    "field-email": "البريد الإلكتروني",
    "field-pass": "كلمة المرور",
    "field-std-id": "الرقم الجامعي للطالب",
    "field-major-placeholder": "اختر تخصصك الهندسي",
    "major-ce": "هندسة الحاسوب",
    "major-se": "هندسة البرمجيات",
    "major-ai": "الذكاء الاصطناعي وعلم البيانات",
    "major-es": "الأنظمة المدمجة والمتحكمات",
    "btn-access": "تأكيد الهوية والدخول",

    // Dashboard
    "badge-student": "وحدة طالب نشطة",
    "lbl-id": "الرقم الجامعي:",
    "lbl-major": "التخصص الهندسي:",
    "title-skills": "مصفوفة المهارات التقنية",
    "lbl-active-proj": "المشروع الهندسي النشط",
    "title-checklist": "قائمة المهام والتسليمات",
    "title-debugger": "المصحح البرمجي الذكي",
    "subtitle-debugger": "وحدة التحليل الثابت والمراجعة المنطقية للأكواد",
    "dbg-sys-init": "تم تشغيل نظام التحليل بنجاح. الصق الكود للبدء بفحصه واستخلاص الأخطاء.",
    "dbg-placeholder": "الصق الأكواد البرمجية التي تحتوي على أخطاء هنا...",
    "dbg-btn-scan": "فحص وتصحيح الكود",
    "title-reg-project": "تسجيل مشروع هندسي جديد",
    "subtitle-reg-project": "قم بتهيئة مواصفات مشروعك لفتح باب الانضمام للفريق",
    "field-proj-title": "اسم المشروع",
    "field-proj-desc": "وصف وتفاصيل المشروع",
    "field-proj-tech": "المهارات التقنية المستخدمة (مفصولة بفواصل، مثل Arduino, C++)",
    "field-proj-demo": "رابط المعاينة المباشرة (URL)",
    "field-proj-code": "رابط مستودع الكود (URL)",
    "btn-reg-proj": "تسجيل واعتماد المشروع",

    // Team Finder
    "search-placeholder": "ابحث عن الأسماء، التخصصات، أو المشاريع...",
    "lbl-skill-pills": "تصفية حسب المهارة:",

    // Evaluator
    "warn-denied-title": "انتهاك الصلاحيات الأمنية للمنظومة",
    "warn-denied-desc": "الدخول إلى منصة اعتماد التقييمات الأكاديمية محظور. يجب تسجيل الدخول بحساب مقيم أو مهندس مراجع معتمد لعرض البيانات.",
    "title-matrix": "مصفوفة الفرق الهندسية",
    "col-group": "رمز الفريق",
    "col-proj": "اسم المشروع الهندسي",
    "col-members": "أعضاء الفريق",
    "col-completion": "نسبة الإنجاز",
    "col-status": "حالة التقييم",
    "eval-sidebar-empty": "اختر مشروعاً من الجدول للبدء بعملية المراجعة وتدوين الدرجات.",
    "title-grading": "لوحة التحكيم والتقييم الأكاديمي",
    "slider-ui": "جودة وتصميم واجهة المستخدم UI/UX",
    "slider-arch": "بناء الكود الهيكلي وجودة التصميم البرمجي",
    "slider-db": "كفاءة قاعدة البيانات والعمليات المتزامنة",
    "slider-innov": "الابتكار الهندسي ومستوى الإبداع",
    "lbl-average-score": "المجموع التراكمي للتقييم",
    "field-commentary": "التعليق والملاحظات الهندسية الشاملة",
    "btn-commit": "حفظ واعتماد التقييم النهائي",
    "title-review-logs": "تقييمات وملاحظات المهندسين الآخرين"
  }
};

// Global App State
const state = {
  currentLang: 'en',
  currentUser: null,
  activeView: 'auth',
  authMode: 'login',
  wantsEvaluator: false,
  projects: [],
  students: [],
  selectedSkillsFilter: [],
  selectedProjectIdForGrading: null,
  pendingAvatarBase64: null,       // BUG-3: holds FileReader result
  alliancePollInterval: null       // BUG-1: polling timer reference
};

// SVG Progress ring configurations
const CIRCUMFERENCE = 2 * Math.PI * 32;

// Initialize System listeners on page load
document.addEventListener('DOMContentLoaded', () => {
  initClock();
  setupNavigation();
  setupLanguageEngine();
  setupAuthForm();
  setupDynamicDebugger();
  setupTeamFinderFilters();
  setupEvaluationForm();
  setupProjectRegistrationForm();
  setupProfileEditForm();
  setupUIInteractions();
  setupMatrixWipeOverlay();      // Section 3: Matrix wipe
  setupTextScramblerOnButtons(); // Section 3: Text scrambler
  loadLocalSettings();           // BUG-4: load stored settings

  // Set checklist template event delegator
  document.getElementById('dash-checklist').addEventListener('change', handleChecklistItemChange);

  // SECTION 1 FIX: Restore session from LocalStorage on page reload
  restoreSessionFromStorage();
});

// A. Clock Runner
function initClock() {
  const clockElement = document.getElementById('digital-clock');
  if (clockElement) {
    const now = new Date();
    clockElement.textContent = now.toLocaleTimeString(state.currentLang === 'en' ? 'en-US' : 'ar-EG');
  }
}

setInterval(initClock, 1000);

// B. i18n Localization Engine
function setupLanguageEngine() {
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  langToggleBtn.addEventListener('click', () => {
    state.currentLang = state.currentLang === 'en' ? 'ar' : 'en';
    applyLanguage(state.currentLang);
  });
  applyLanguage(state.currentLang);
}

function applyLanguage(lang) {
  const htmlTag = document.documentElement;
  htmlTag.setAttribute('lang', lang);
  htmlTag.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  const currentLangSpan = document.querySelector('.lang-switch-btn .current-lang');
  const altLangSpan = document.querySelector('.lang-switch-btn .alt-lang');
  if (currentLangSpan && altLangSpan) {
    if (lang === 'en') {
      currentLangSpan.textContent = 'EN';
      altLangSpan.textContent = 'AR';
    } else {
      currentLangSpan.textContent = 'AR';
      altLangSpan.textContent = 'EN';
    }
  }

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      element.setAttribute('placeholder', translations[lang][key]);
    }
  });

  updateAuthToggleLinkText();
  initClock();
}

function updateAuthToggleLinkText() {
  const toggleLink = document.getElementById('auth-toggle-link');
  if (toggleLink) {
    if (state.authMode === 'login') {
      toggleLink.textContent = state.currentLang === 'en' 
        ? 'New to EduSphere? Register Node / مستخدم جديد؟ سجل الآن' 
        : 'مستخدم جديد؟ سجل الآن / New to EduSphere? Register Node';
    } else {
      toggleLink.textContent = state.currentLang === 'en' 
        ? 'Already registered? Login / لديك حساب بالفعل؟ دخول' 
        : 'لديك حساب بالفعل؟ دخول / Already registered? Login';
    }
  }
}

// C. Routing & Client Navigation
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const view = link.getAttribute('data-view');
      if (!view) return;
      e.preventDefault();

      // Block unauthenticated access with dynamic Egyptian toast warning
      if (!state.currentUser && view !== 'auth') {
        showToast("رايح فين يا هندسة؟ سجل دخول الأول الله يكرمك! 🛑", 'error');
        return;
      }

      // Section 3: Matrix wipe transition
      const useWipe = localStorage.getItem('edusphere_matrix_wipe') !== 'false';
      if (useWipe && state.currentUser) {
        runMatrixWipeTransition(() => switchView(view));
      } else {
        switchView(view);
      }
    });
  });

  document.querySelector('.nav-links').style.opacity = '0.3';
  document.querySelector('.nav-links').style.pointerEvents = 'none';
}

function switchView(viewName) {
  if (viewName === 'auth' && state.currentUser) return; 

  state.activeView = viewName;

  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('data-view') === viewName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  document.querySelectorAll('.content-view').forEach(view => {
    if (view.id === `view-${viewName}`) {
      view.classList.add('active');
    } else {
      view.classList.remove('active');
    }
  });

  document.getElementById('notif-dropdown').classList.remove('show');
  document.getElementById('profile-dropdown').classList.remove('show');

  if (viewName === 'dashboard') {
    loadDashboardData();
  } else if (viewName === 'teamfinder') {
    loadTeamFinderData();
  } else if (viewName === 'showroom') {
    loadShowroomData();
  } else if (viewName === 'evaluator') {
    loadEvaluatorConsole();
  }
}

// D. Authentication Controller (Dynamic Registration Enabled & Streamlined UI)
function setupAuthForm() {
  const conditionalFields = document.getElementById('student-only-fields');
  const authFormTitle = document.getElementById('auth-form-title');
  const authToggleLink = document.getElementById('auth-toggle-link');
  const nameFieldGroup = document.getElementById('auth-name-group');

  // Toggle Login/Register Mode
  authToggleLink.addEventListener('click', (e) => {
    e.preventDefault();
    state.authMode = state.authMode === 'login' ? 'register' : 'login';
    
    if (state.authMode === 'login') {
      authFormTitle.textContent = state.currentLang === 'en' ? 'Access Terminal' : 'بوابة الدخول للمنظومة';
      document.getElementById('auth-btn-text').textContent = state.currentLang === 'en' ? 'Access Terminal' : 'تأكيد الهوية والدخول';
      nameFieldGroup.classList.add('hidden');
      conditionalFields.classList.remove('show');
      state.wantsEvaluator = false;
    } else {
      authFormTitle.textContent = state.currentLang === 'en' ? 'Create New Node' : 'تسجيل حساب جديد';
      document.getElementById('auth-btn-text').textContent = state.currentLang === 'en' ? 'Register Account' : 'تسجيل الحساب';
      nameFieldGroup.classList.remove('hidden');
      document.getElementById('auth-name').setAttribute('required', 'true');
      
      // Default to Student signup
      state.wantsEvaluator = false;
      conditionalFields.classList.add('show');
    }
    updateAuthToggleLinkText();
  });

  const authForm = document.getElementById('auth-form');
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('auth-submit-btn');
    btn.classList.add('loading');
    btn.disabled = true;

    const name = document.getElementById('auth-name').value;
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const studentId = document.getElementById('auth-student-id').value;
    const major = document.getElementById('auth-major').value;

    try {
      if (state.authMode === 'login') {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok && result.success) {
          state.currentUser = result.user;
          handleSuccessfulLogin();
        } else {
          showToast(result.error || 'Authentication aborted.', 'error');
        }
      } else {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            password,
            studentId,
            major
          })
        });

        const result = await response.json();

        if (response.ok && result.success) {
          state.currentUser = result.user;
          showToast(
            state.currentLang === 'en' 
              ? 'Dynamic Registration Successful. Welcome node!' 
              : 'تم تسجيل الحساب وتنشيط الاتصال بالخادم بنجاح.', 
            'success'
          );
          handleSuccessfulLogin();
        } else {
          showToast(result.error || 'Registration failed.', 'error');
        }
      }
    } catch (err) {
      showToast('Offline state or connection issue.', 'error');
    } finally {
      btn.classList.remove('loading');
      btn.disabled = false;
    }
  });

  function handleSuccessfulLogin() {
    // SECTION 1 FIX: Persist session to LocalStorage immediately
    localStorage.setItem('edusphere_session', JSON.stringify(state.currentUser));

    showToast(
      state.currentLang === 'en' 
        ? `Authentication successful. Welcome node: ${state.currentUser.name}`
        : `تم تأكيد الهوية بنجاح. مرحبًا بك في المنظومة: ${state.currentUser.name}`, 
      'success'
    );
    showRandomMemeToast();

    document.getElementById('header-avatar').src = state.currentUser.avatar;
    document.getElementById('header-username').textContent = state.currentUser.name;
    document.getElementById('header-userrole').textContent = state.currentUser.role;

    const nav = document.querySelector('.nav-links');
    nav.style.opacity = '1';
    nav.style.pointerEvents = 'auto';

    // Clear auth form fields safely
    document.getElementById('auth-name').value = '';
    document.getElementById('auth-email').value = '';
    document.getElementById('auth-password').value = '';
    document.getElementById('auth-student-id').value = '';

    // SECTION 1 FIX: Normalize role case before routing
    const role = (state.currentUser.role || '').toLowerCase();
    if (role === 'evaluator' || role === 'engineer' || role === 'admin') {
      switchView('evaluator');
    } else {
      switchView('dashboard');
    }

    // BUG-1: Start alliance notification polling
    startAlliancePolling();
  }

  // Logout trigger
  document.getElementById('logout-btn').addEventListener('click', (e) => {
    e.preventDefault();
    state.currentUser = null;
    state.authMode = 'login';
    state.wantsEvaluator = false;

    // SECTION 1 FIX: Clear persisted session from LocalStorage
    localStorage.removeItem('edusphere_session');

    // BUG-1: Stop alliance polling on logout
    if (state.alliancePollInterval) {
      clearInterval(state.alliancePollInterval);
      state.alliancePollInterval = null;
    }
    
    document.querySelector('.nav-links').style.opacity = '0.3';
    document.querySelector('.nav-links').style.pointerEvents = 'none';
    
    document.getElementById('header-username').textContent = 'Guest User';
    document.getElementById('header-userrole').textContent = 'Student';
    document.getElementById('header-avatar').src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';
    
    nameFieldGroup.classList.add('hidden');
    conditionalFields.classList.remove('show');
    authFormTitle.textContent = state.currentLang === 'en' ? 'Access Terminal' : 'بوابة الدخول للمنظومة';
    document.getElementById('auth-btn-text').textContent = state.currentLang === 'en' ? 'Access Terminal' : 'تأكيد الهوية والدخول';
    
    switchView('auth');
    showToast(state.currentLang === 'en' ? 'Session terminated.' : 'تم إنهاء الجلسة البرمجية.', 'info');
  });
}

// SECTION 1 FIX: Restore session from LocalStorage on page reload
function restoreSessionFromStorage() {
  try {
    const saved = localStorage.getItem('edusphere_session');
    if (!saved) return;
    const user = JSON.parse(saved);
    if (!user || !user.id || !user.email) return;

    state.currentUser = user;

    document.getElementById('header-avatar').src = user.avatar || '';
    document.getElementById('header-username').textContent = user.name;
    document.getElementById('header-userrole').textContent = user.role;

    const nav = document.querySelector('.nav-links');
    nav.style.opacity = '1';
    nav.style.pointerEvents = 'auto';

    // Route to correct view based on normalized role
    const role = (user.role || '').toLowerCase();
    if (role === 'evaluator' || role === 'engineer' || role === 'admin') {
      switchView('evaluator');
    } else {
      switchView('dashboard');
    }

    startAlliancePolling();
  } catch (e) {
    localStorage.removeItem('edusphere_session');
  }
}

// E. Student Dashboard Module
async function loadDashboardData() {
  const loader = document.getElementById('dashboard-loader');
  const mainContent = document.getElementById('dashboard-main-content');
  
  loader.classList.add('active');
  mainContent.classList.add('hidden');

  try {
    document.getElementById('dash-profile-name').textContent = state.currentUser.name;
    document.getElementById('dash-profile-avatar').src = state.currentUser.avatar;
    document.getElementById('dash-profile-id').textContent = state.currentUser.studentId || 'N/A';
    document.getElementById('dash-profile-major').textContent = state.currentUser.major || 'Computer Engineering';

    // Load Skills matrix
    const skillsGrid = document.getElementById('dash-skills-matrix');
    skillsGrid.innerHTML = '';
    const skills = state.currentUser.skills || ["HTML5", "CSS3", "JavaScript"];
    skills.forEach(skill => {
      const badge = document.createElement('span');
      badge.className = 'skill-badge';
      badge.textContent = skill;
      skillsGrid.appendChild(badge);
    });

    // Fetch projects
    const response = await fetch('/api/projects');
    const projects = await response.json();
    state.projects = projects;

    // Filter project where user is member
    let userProject = projects.find(p => p.teamMembers.includes(state.currentUser.name));
    
    const activeProjectContainer = document.getElementById('project-active-container');
    const registerProjectContainer = document.getElementById('project-registration-container');

    if (userProject) {
      activeProjectContainer.classList.remove('hidden');
      registerProjectContainer.classList.add('hidden');

      document.getElementById('dash-active-project').textContent = userProject.title;
      renderChecklist(userProject);
      updateCircularProgress(userProject.progressPercentage);
    } else {
      activeProjectContainer.classList.add('hidden');
      registerProjectContainer.classList.remove('hidden');
    }

  } catch (error) {
    showToast('Failed to load dashboard parameters.', 'error');
  } finally {
    setTimeout(() => {
      loader.classList.remove('active');
      mainContent.classList.remove('hidden');
      setup3DTiltEffect(); 
    }, 400);
  }
}

// Student Project Registration Form
function setupProjectRegistrationForm() {
  const form = document.getElementById('project-registration-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('reg-project-btn');
    btn.classList.add('loading');
    btn.disabled = true;

    const title = document.getElementById('reg-project-title').value;
    const description = document.getElementById('reg-project-desc').value;
    const techInput = document.getElementById('reg-project-tech').value;
    const liveDemoUrl = document.getElementById('reg-project-demo').value;
    const codebaseUrl = document.getElementById('reg-project-code').value;

    const techStack = techInput.split(',').map(s => s.trim()).filter(s => s.length > 0);

    const payload = {
      title,
      description,
      teamMembers: [state.currentUser.name], 
      techStack,
      liveDemoUrl,
      codebaseUrl
    };

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (response.ok && result.success) {
        showToast(
          state.currentLang === 'en' 
            ? 'Engineering project registered successfully.' 
            : 'تم تسجيل واعتماد مشروعك الهندسي بنجاح.', 
          'success'
        );
        showRandomMemeToast();
        
        document.getElementById('reg-project-title').value = '';
        document.getElementById('reg-project-desc').value = '';
        document.getElementById('reg-project-tech').value = '';
        document.getElementById('reg-project-demo').value = '';
        document.getElementById('reg-project-code').value = '';

        loadDashboardData();
      } else {
        showToast(result.error || 'Project creation failure.', 'error');
      }
    } catch (err) {
      showToast('Connection error during project initialization.', 'error');
    } finally {
      btn.classList.remove('loading');
      btn.disabled = false;
    }
  });
}

// Settings Update frontend logic
function setupProfileEditForm() {
  // BUG-3: Avatar upload via FileReader → Base64
  const avatarFileInput = document.getElementById('user-avatar-file');
  const avatarTriggerBtn = document.getElementById('avatar-upload-trigger-btn');

  if (avatarTriggerBtn) {
    avatarTriggerBtn.addEventListener('click', () => {
      avatarFileInput.click();
    });
  }

  if (avatarFileInput) {
    avatarFileInput.addEventListener('change', () => {
      const file = avatarFileInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target.result;
        state.pendingAvatarBase64 = base64;
        // Preview in thumb and main avatar
        const thumb = document.getElementById('avatar-preview-thumb');
        if (thumb) thumb.src = base64;
        showToast('صورتك جاهزة! اضغط Update Node عشان تتحفظ ✅', 'success');
      };
      reader.readAsDataURL(file);
    });
  }

  const form = document.getElementById('profile-edit-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('edit-profile-btn');
    btn.classList.add('loading');
    btn.disabled = true;

    const name = document.getElementById('edit-user-name').value;
    const bio = document.getElementById('edit-user-bio').value;
    const status = document.getElementById('edit-user-status').value;
    const skills = document.getElementById('edit-user-skills').value;

    // BUG-4: Save local settings to LocalStorage (NOT sent to server)
    saveLocalSettings();

    const payload = { name, bio, status, skills };
    // BUG-3: Attach Base64 avatar if user uploaded one
    if (state.pendingAvatarBase64) {
      payload.avatar = state.pendingAvatarBase64;
    }

    try {
      const response = await fetch('/api/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': state.currentUser.id,
          'x-user-role': state.currentUser.role
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        state.currentUser = result.user;
        state.pendingAvatarBase64 = null; // clear pending avatar

        showToast("عاش.. بروفايلك بقى جاهز للسيط! ✨", 'success');
        showRandomMemeToast();

        document.getElementById('header-username').textContent = state.currentUser.name;
        document.getElementById('header-avatar').src = state.currentUser.avatar;
        document.getElementById('header-userrole').textContent = state.currentUser.role;

        document.getElementById('profile-modal').classList.remove('show');

        if (state.activeView === 'dashboard') {
          loadDashboardData();
        } else if (state.activeView === 'teamfinder') {
          loadTeamFinderData();
        }
      } else {
        showToast(result.error || 'Settings commit error.', 'error');
      }
    } catch (err) {
      showToast('Offline state configuration error.', 'error');
    } finally {
      btn.classList.remove('loading');
      btn.disabled = false;
    }
  });
}

function openEditProfileModal() {
  const modal = document.getElementById('profile-modal');
  const viewContainer = document.getElementById('modal-view-container');
  const editContainer = document.getElementById('modal-edit-container');

  viewContainer.classList.add('hidden');
  editContainer.classList.remove('hidden');

  document.getElementById('edit-user-name').value = state.currentUser.name;
  document.getElementById('edit-user-bio').value = state.currentUser.bio || '';
  document.getElementById('edit-user-status').value = state.currentUser.status || 'Available';

  // BUG-3: Pre-fill avatar preview thumb
  const thumb = document.getElementById('avatar-preview-thumb');
  if (thumb) thumb.src = state.currentUser.avatar || '';
  state.pendingAvatarBase64 = null; // reset pending on open

  const skillsFieldGroup = document.getElementById('edit-user-skills-group');
  if (state.currentUser.role === 'Student') {
    skillsFieldGroup.classList.remove('hidden');
    document.getElementById('edit-user-skills').value = (state.currentUser.skills || []).join(', ');
  } else {
    skillsFieldGroup.classList.add('hidden');
    document.getElementById('edit-user-skills').value = '';
  }

  // BUG-4: Load local settings into UI controls
  loadLocalSettingsIntoUI();

  modal.classList.add('show');
}

function renderChecklist(project) {
  const checklistContainer = document.getElementById('dash-checklist');
  checklistContainer.innerHTML = '';

  project.checklist.forEach(item => {
    const li = document.createElement('li');
    li.className = `checklist-item ${item.checked ? 'checked' : ''}`;
    li.setAttribute('data-proj-id', project.id);
    li.setAttribute('data-item-id', item.id);

    li.innerHTML = `
      <label class="custom-checkbox-container">
        <input type="checkbox" ${item.checked ? 'checked' : ''}>
        <span class="checkmark"></span>
      </label>
      <span class="checklist-text">${item.text}</span>
    `;
    checklistContainer.appendChild(li);
  });
}

async function handleChecklistItemChange(e) {
  if (e.target.type !== 'checkbox') return;

  const li = e.target.closest('.checklist-item');
  const projectId = li.getAttribute('data-proj-id');
  const itemId = li.getAttribute('data-item-id');
  const checked = e.target.checked;

  try {
    const response = await fetch(`/api/projects/${projectId}/checklist`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId, checked })
    });

    const result = await response.json();
    if (response.ok && result.success) {
      if (checked) {
        li.classList.add('checked');
      } else {
        li.classList.remove('checked');
      }
      updateCircularProgress(result.progressPercentage);
      showToast(
        state.currentLang === 'en' 
          ? `Progress updated: ${result.progressPercentage}%` 
          : `تم تحديث المنجز: ${result.progressPercentage}%`, 
        'info'
      );
    }
  } catch (error) {
    showToast('Server syncing failure.', 'error');
    e.target.checked = !checked; 
  }
}

function updateCircularProgress(percentage) {
  const progressText = document.getElementById('dash-progress-text');
  const progressCircle = document.getElementById('dash-progress-circle');
  
  if (progressText && progressCircle) {
    progressText.textContent = `${percentage}%`;
    const offset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;
    progressCircle.style.strokeDasharray = `${CIRCUMFERENCE} ${CIRCUMFERENCE}`;
    progressCircle.style.strokeDashoffset = offset;
  }
}

// F. Smart Code Debugger UI Simulator with Egyptian core loading
function setupDynamicDebugger() {
  const scanBtn   = document.getElementById('debugger-scan-btn');
  const inputArea = document.getElementById('debugger-input');
  const consoleLog = document.getElementById('debugger-console');

  if (!scanBtn) return;

  scanBtn.addEventListener('click', () => {
    try {
      const code = (inputArea ? inputArea.value : '').trim();
      if (!code) {
        showToast(
          state.currentLang === 'en' ? 'Submit code snippets for checking.' : 'أدخل الكود البرمجي أولاً لفحصه.',
          'info'
        );
        return;
      }

      // Clear any previous auto-fix panel
      const oldPanel = document.getElementById('debugger-autofix-panel');
      if (oldPanel) oldPanel.remove();

      // Echo first 3 lines of submitted code
      const preview = code.split('\n').slice(0, 3).join('\n') + (code.split('\n').length > 3 ? '\n  ...' : '');
      appendTerminalLine(preview, 'user-line');
      if (inputArea) inputArea.value = '';

      // Egyptian loader messages
      const loaderMsgs = [
        "السيرفر بيصلي ركعتين بنية فرج الكود ده... 🕌",
        "جاري تحضير كوباية شاي بالنعناع لفك طلاسم الكود... ☕",
        "الـ Compiler بيحاول يستوعب الإبداع ده، ربنا يستر... 🧠",
        "بنشيك على الكود ببركة دعا الوالدين... 🤲",
        "المعالج شغال بنسبة 100%، والناس رايقة... 💊"
      ];
      appendTerminalLine(
        `⚙️ Gemini-Simulator Core: ${loaderMsgs[Math.floor(Math.random() * loaderMsgs.length)]}`,
        'system-line'
      );
      showRandomMemeToast();

      // Async scan with 1.1s loader delay for UX feel
      setTimeout(() => {
        try {
          const result = analyzeCode(code);

          if (result.hasError) {
            appendTerminalLine(
              `❌ [${result.errorType}] — ${result.diagnosis}`,
              'diagnostic-line'
            );
            if (result.errorLine > 0) {
              appendTerminalLine(
                `📍 Line ${result.errorLine}: <code style="color:var(--accent-amber)">${escapeHTML(result.errorContext)}</code>`,
                'diagnostic-line'
              );
            }
            appendTerminalLine(
              '🔧 Auto-Fix Engine — generating corrected code output...',
              'system-line'
            );
            setTimeout(() => {
              renderAutoFixPanel(result.fixedCode, result.fixSummary, consoleLog);
              consoleLog.scrollTop = consoleLog.scrollHeight;
            }, 700);

          } else {
            // ✅ Valid code path
            appendTerminalLine(
              `<span style="color:var(--accent-green);font-weight:700">✅ Status 200: Code Syntax &amp; Logic Valid</span>`,
              'success-line'
            );
            appendTerminalLine(`🔍 Language detected: <b>${result.language}</b>`, 'system-line');
            if (result.runOutput) {
              appendTerminalLine(
                `▶ Simulated Run Output: <code style="color:var(--accent-cyan)">${escapeHTML(result.runOutput)}</code>`,
                'run-line'
              );
            }
            appendTerminalLine(
              '📋 No critical issues detected. Code is clean and production-ready.',
              'system-line'
            );
          }

          consoleLog.scrollTop = consoleLog.scrollHeight;
        } catch (innerErr) {
          appendTerminalLine(
            `⚠️ PARSER EXCEPTION: ${escapeHTML(innerErr.message)}`,
            'diagnostic-line'
          );
        }
      }, 1100);

    } catch (outerErr) {
      console.warn('Debugger crash (caught safely):', outerErr);
      appendTerminalLine(
        '⚠️ DEBUGGER CRASH: Malformed input caused a scanner exception. Input sanitized.',
        'diagnostic-line'
      );
    }
  });
}

// ══════════════════════════════════════════════════════
//  DEBUGGER ENGINE — Real Code Analyzer
// ══════════════════════════════════════════════════════
function analyzeCode(code) {
  const result = {
    hasError: false, errorType: '', diagnosis: '',
    errorLine: 0,   errorContext: '', fixedCode: '',
    fixSummary: '', language: 'Unknown', runOutput: ''
  };

  // ── Language Detection ──
  const isArduino = /\b(void\s+setup|void\s+loop|digitalWrite|analogRead|pinMode|Serial\.)/.test(code);
  const isJS      = !isArduino && /\b(function|const |let |var |if\s*\(|for\s*\(|while\s*\(|return |console\.|async |await |class |require\(|import |=>)/.test(code);
  const isPython  = /^(def |import |from |print\(|elif |class [A-Z])/m.test(code);
  const isHTML    = /<\s*(div|html|body|head|p|span|section|form|input|button|script)\b/i.test(code);
  const isCSS     = /[.#]?[\w-]+\s*\{[\s\S]*?\}/.test(code) && !isJS && !isHTML;
  const isSQL     = /\b(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|JOIN)\b/i.test(code);

  // ══════════════════════════════════════════
  //  JAVASCRIPT — Real syntax check via new Function()
  // ══════════════════════════════════════════
  if (isJS) {
    result.language = 'JavaScript / Node.js';
    try {
      // eslint-disable-next-line no-new-func
      new Function(code);   // throws real SyntaxError if broken

      // ── Valid syntax: check for logic smells ──
      let warned = false;

      if (/\bvar\s+/.test(code)) {
        warned = true;
        result.hasError   = true;
        result.errorType  = 'OPTIMIZATION WARNING';
        result.diagnosis  = 'var keyword detected — modern JS uses const/let for block-scoping and TDZ safety.';
        result.errorLine  = dbgFindLine(code, /\bvar\s+/);
        result.errorContext = dbgGetLine(code, result.errorLine);
        result.fixedCode  = code.replace(/\bvar\b/g, 'let');
        result.fixSummary = 'Replaced all var → let for modern ES6+ block-scoped variable management.';
      }

      if (!warned && /(?<![=!<>])==(?!=)/.test(code)) {
        warned = true;
        result.hasError   = true;
        result.errorType  = 'TYPE-SAFETY WARNING';
        result.diagnosis  = 'Loose equality (==) detected — use strict equality (===) to prevent type-coercion bugs.';
        result.errorLine  = dbgFindLine(code, /==(?!=)/);
        result.errorContext = dbgGetLine(code, result.errorLine);
        result.fixedCode  = code.replace(/([^=!<>])==(?!=)/g, '$1===');
        result.fixSummary = 'Replaced == with === for strict type-safe comparisons throughout the code.';
      }

      if (!warned && /\.then\s*\(/.test(code) && !/\basync\b/.test(code)) {
        warned = true;
        result.hasError   = true;
        result.errorType  = 'ASYNC PATTERN WARNING';
        result.diagnosis  = 'Promise .then() chain detected without async/await — modern pattern improves readability and error handling.';
        result.errorLine  = dbgFindLine(code, /\.then\s*\(/);
        result.errorContext = dbgGetLine(code, result.errorLine);
        result.fixedCode  = `// ✅ Refactored to async/await pattern:\nasync function fetchData() {\n  try {\n    const result = await yourPromise();\n    console.log('Success:', result);\n    return result;\n  } catch (err) {\n    console.error('Error:', err.message);\n  }\n}`;
        result.fixSummary = 'Converted .then() chain to clean async/await with try/catch error handling.';
      }

      // ── Truly valid: simulate run ──
      if (!warned) {
        result.hasError = false;
        const captured = [];
        try {
          // eslint-disable-next-line no-new-func
          const fn = new Function('console', code);
          fn({ log: (...a) => captured.push(a.map(String).join(' ')), warn: () => {}, error: () => {} });
        } catch (_) { /* runtime error — still syntactically valid */ }
        result.runOutput = captured.length
          ? captured.slice(0, 4).join(' │ ')
          : 'No console.log output — function/class definitions only.';
      }

    } catch (syntaxErr) {
      result.hasError    = true;
      result.errorType   = 'SYNTAX ERROR';
      result.diagnosis   = syntaxErr.message;

      // Extract real line number from error stack
      const stackLine = (syntaxErr.stack || '').match(/<anonymous>:(\d+)/);
      const msgLine   = syntaxErr.message.match(/line\s*(\d+)/i);
      result.errorLine    = stackLine ? parseInt(stackLine[1]) - 1
                          : msgLine  ? parseInt(msgLine[1])
                          : dbgFindLine(code, /[^\s]/);
      result.errorContext = dbgGetLine(code, result.errorLine);
      result.fixedCode    = dbgAutoFixJS(code, syntaxErr.message);
      result.fixSummary   = `Auto-corrected SyntaxError near line ${result.errorLine}.`;
    }

  // ══════════════════════════════════════════
  //  ARDUINO / EMBEDDED C++
  // ══════════════════════════════════════════
  } else if (isArduino) {
    result.language = 'Arduino / C++ Embedded';
    const usesIO    = /\b(digitalWrite|analogRead|digitalRead|analogWrite)\b/.test(code);
    const hasPinMode = /\bpinMode\b/.test(code);
    const openBraces  = (code.match(/\{/g) || []).length;
    const closeBraces = (code.match(/\}/g) || []).length;

    if (usesIO && !hasPinMode) {
      result.hasError   = true;
      result.errorType  = 'EMBEDDED LOGIC ERROR';
      result.diagnosis  = 'I/O operations (digitalWrite/analogRead) called without initializing pinMode() in setup().';
      result.errorLine  = dbgFindLine(code, /\b(digitalWrite|analogRead)\b/);
      result.errorContext = dbgGetLine(code, result.errorLine);
      result.fixedCode  = `void setup() {\n  pinMode(13, OUTPUT); // ✅ Initialize pin direction first\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(1000);\n  digitalWrite(13, LOW);\n  delay(1000);\n}`;
      result.fixSummary = 'Added missing pinMode() initialization in setup() before using I/O operations.';
    } else if (openBraces !== closeBraces) {
      result.hasError   = true;
      result.errorType  = 'BRACE MISMATCH';
      result.diagnosis  = `Unbalanced braces: ${openBraces} opening { vs ${closeBraces} closing }. Compiler will refuse to build.`;
      result.errorLine  = openBraces > closeBraces ? code.split('\n').length : 1;
      result.errorContext = dbgGetLine(code, result.errorLine);
      result.fixedCode  = code + (openBraces > closeBraces ? '\n}'.repeat(openBraces - closeBraces) : '');
      result.fixSummary = `Added ${Math.abs(openBraces - closeBraces)} missing closing brace(s).`;
    } else {
      result.hasError  = false;
      result.runOutput = 'Arduino build simulation passed. Loop structure and pin definitions verified.';
    }

  // ══════════════════════════════════════════
  //  HTML / CSS
  // ══════════════════════════════════════════
  } else if (isHTML) {
    result.language = 'HTML / CSS';
    const openDivs  = (code.match(/<div\b/gi)  || []).length;
    const closeDivs = (code.match(/<\/div>/gi) || []).length;
    const openCSSBrace  = (code.match(/\{/g) || []).length;
    const closeCSSBrace = (code.match(/\}/g) || []).length;

    if (openDivs !== closeDivs) {
      result.hasError   = true;
      result.errorType  = 'DOM PARSE ERROR';
      result.diagnosis  = `Mismatched <div> tags: ${openDivs} opening vs ${closeDivs} closing — causes layout collapse.`;
      result.errorLine  = dbgFindLine(code, /<div/);
      result.errorContext = dbgGetLine(code, result.errorLine);
      result.fixedCode  = code + '</div>'.repeat(Math.max(0, openDivs - closeDivs));
      result.fixSummary = `Added ${Math.max(0, openDivs - closeDivs)} missing </div> closing tag(s).`;
    } else if (openCSSBrace !== closeCSSBrace) {
      result.hasError   = true;
      result.errorType  = 'CSS SYNTAX ERROR';
      result.diagnosis  = `Unmatched CSS braces: ${openCSSBrace} { vs ${closeCSSBrace} }. Style rules will not apply.`;
      result.errorLine  = dbgFindLine(code, /\{/);
      result.errorContext = dbgGetLine(code, result.errorLine);
      result.fixedCode  = code + ' }'.repeat(Math.max(0, openCSSBrace - closeCSSBrace));
      result.fixSummary = `Closed ${Math.max(0, openCSSBrace - closeCSSBrace)} unclosed CSS rule block(s).`;
    } else {
      result.hasError  = false;
      result.runOutput = 'DOM structure validated. All tags balanced. Semantic structure clean.';
    }

  // ══════════════════════════════════════════
  //  SQL
  // ══════════════════════════════════════════
  } else if (isSQL) {
    result.language = 'SQL / Database Query';
    const hasInjection = /('\s*OR\s*'|\bOR\b.*=.*--|;\s*DROP|UNION\s+SELECT)/i.test(code);
    const missingWhere = /\b(UPDATE|DELETE)\b/i.test(code) && !/\bWHERE\b/i.test(code);

    if (hasInjection) {
      result.hasError   = true;
      result.errorType  = 'SQL INJECTION RISK';
      result.diagnosis  = 'SQL Injection pattern detected (OR 1=1 / UNION SELECT / DROP). Never interpolate user input directly into queries.';
      result.errorLine  = 1;
      result.errorContext = dbgGetLine(code, 1);
      result.fixedCode  = `-- ✅ Use parameterized prepared statements:\nSELECT * FROM users WHERE email = ? AND password = ?;\n-- Pass values separately as parameters, never via string concatenation.`;
      result.fixSummary = 'Replaced raw SQL string with parameterized query to prevent injection attacks.';
    } else if (missingWhere) {
      result.hasError   = true;
      result.errorType  = 'DESTRUCTIVE QUERY WARNING';
      result.diagnosis  = 'UPDATE or DELETE without WHERE clause detected — this will affect ALL rows in the table!';
      result.errorLine  = dbgFindLine(code, /\b(UPDATE|DELETE)\b/i);
      result.errorContext = dbgGetLine(code, result.errorLine);
      result.fixedCode  = code.replace(/(UPDATE\s+\w+\s+SET[\s\S]*?)(;|$)/i, '$1 WHERE id = :targetId;');
      result.fixSummary = 'Added WHERE clause to prevent full-table modification.';
    } else {
      result.hasError  = false;
      result.runOutput = 'Query syntax valid. No injection patterns or missing WHERE clauses detected.';
    }

  // ══════════════════════════════════════════
  //  PYTHON
  // ══════════════════════════════════════════
  } else if (isPython) {
    result.language = 'Python 3';
    const hasPrintNoParens = /^\s*print\s+[^(]/m.test(code);
    const hasMixedIndent   = /^( +\t|\t +)/m.test(code);
    const hasColonMissing  = /^(def |class |if |for |while |elif |else)[^:]*$/m.test(code);

    if (hasPrintNoParens) {
      result.hasError   = true;
      result.errorType  = 'SYNTAX ERROR (Python 2 vs 3)';
      result.diagnosis  = 'print used without parentheses — Python 3 requires print() as a function call.';
      result.errorLine  = dbgFindLine(code, /^\s*print\s+[^(]/m);
      result.errorContext = dbgGetLine(code, result.errorLine);
      result.fixedCode  = code.replace(/^(\s*)print\s+(.+)$/mg, '$1print($2)');
      result.fixSummary = 'Converted print statements to print() function calls (Python 3 syntax).';
    } else if (hasMixedIndent) {
      result.hasError   = true;
      result.errorType  = 'INDENTATION ERROR';
      result.diagnosis  = 'Mixed tabs and spaces detected. Python requires consistent indentation (use 4 spaces).';
      result.errorLine  = dbgFindLine(code, /( +\t|\t +)/);
      result.errorContext = dbgGetLine(code, result.errorLine);
      result.fixedCode  = code.replace(/\t/g, '    ');
      result.fixSummary = 'Replaced all tabs with 4 spaces for consistent Python indentation.';
    } else if (hasColonMissing) {
      result.hasError   = true;
      result.errorType  = 'SYNTAX ERROR';
      result.diagnosis  = 'Missing colon (:) at end of def/class/if/for/while block declaration.';
      result.errorLine  = dbgFindLine(code, /^(def |class |if |for |while )[^:]*$/);
      result.errorContext = dbgGetLine(code, result.errorLine);
      result.fixedCode  = code.replace(
        /^((def |class |if |for |while |elif |else)[^:\n]*)$/mg, '$1:'
      );
      result.fixSummary = 'Added missing colon (:) to block-opening statements.';
    } else {
      result.hasError  = false;
      result.runOutput = 'Python structure validated. Indentation, syntax, and print() calls all verified.';
    }

  } else {
    // Generic fallback
    result.language  = 'Unknown / Plain Text';
    result.hasError  = false;
    result.runOutput = 'No recognized language patterns detected. Treating as plain text — no errors found.';
  }

  return result;
}

// ── Helper: find first matching line number (1-indexed) ──
function dbgFindLine(code, pattern) {
  const lines = code.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (pattern instanceof RegExp ? pattern.test(lines[i]) : lines[i].includes(pattern)) {
      return i + 1;
    }
  }
  return 1;
}

// ── Helper: get line content by number (1-indexed) ──
function dbgGetLine(code, lineNum) {
  const lines = code.split('\n');
  return (lines[lineNum - 1] || '').trim().slice(0, 80);
}

// ── Helper: Auto-fix common JS syntax errors ──
function dbgAutoFixJS(code, errMsg) {
  let fixed = code;
  const msg = errMsg.toLowerCase();

  if (msg.includes('unexpected end') || msg.includes('missing }')) {
    const open  = (fixed.match(/\{/g) || []).length;
    const close = (fixed.match(/\}/g) || []).length;
    if (open > close) fixed += '\n}'.repeat(open - close);
  }
  if (msg.includes('missing )') || msg.includes('unexpected token )')) {
    const open  = (fixed.match(/\(/g) || []).length;
    const close = (fixed.match(/\)/g) || []).length;
    if (open > close) fixed += ')'.repeat(open - close);
  }
  if (msg.includes('missing ;') || msg.includes('missing semicolon')) {
    fixed = fixed.replace(/([^;{},\n])\n/g, '$1;\n');
  }
  if (msg.includes('unterminated string') || msg.includes('string literal')) {
    fixed = fixed.replace(/(['"`])([^'"`\n]*?)$/m, '$1$2$1');
  }

  // If nothing changed, return helpful template
  if (fixed === code) {
    fixed = `// ⚠️ Auto-fix could not fully resolve this error automatically.\n// Original error: ${errMsg}\n// Suggested action: Check brackets {}, parentheses (), and string quotes.\n\n${code}`;
  }

  return fixed;
}

// ── Render the styled Auto-Fix Panel below the terminal ──
function renderAutoFixPanel(fixedCode, summary, consoleEl) {
  const panel = document.createElement('div');
  panel.id = 'debugger-autofix-panel';
  panel.className = 'auto-fix-panel';

  panel.innerHTML = `
    <div class="auto-fix-header">
      <span class="auto-fix-badge">🔧 AUTO-FIX OUTPUT</span>
      <span class="auto-fix-summary">${escapeHTML(summary)}</span>
      <button class="copy-fix-btn" onclick="copyAutoFix()">📋 Copy Fixed Code</button>
    </div>
    <pre id="auto-fix-code"><code>${escapeHTML(fixedCode)}</code></pre>
  `;

  // Insert after the terminal console
  if (consoleEl && consoleEl.parentNode) {
    consoleEl.parentNode.insertBefore(panel, consoleEl.nextSibling);
  }
}

// ── Copy fixed code to clipboard ──
function copyAutoFix() {
  try {
    const codeEl = document.getElementById('auto-fix-code');
    if (!codeEl) return;
    navigator.clipboard.writeText(codeEl.textContent).then(() => {
      showToast('✅ Fixed code copied to clipboard!', 'success');
    }).catch(() => {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = codeEl.textContent;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      showToast('✅ Fixed code copied!', 'success');
    });
  } catch(e) {
    showToast('Copy failed — select manually.', 'error');
  }
}

function appendTerminalLine(text, className) {
  const consoleLog = document.getElementById('debugger-console');
  if (!consoleLog) return;

  const line = document.createElement('div');
  line.className = `terminal-line ${className}`;

  if (className === 'user-line') {
    // Multi-line user code preview
    line.innerHTML = `<span class="prompt">></span> <code>${escapeHTML(text)}</code>`;
  } else if (className === 'fix-line') {
    line.innerHTML = `<span class="prompt">></span> <pre><code>${escapeHTML(text)}</code></pre>`;
  } else if (className === 'success-line') {
    // innerHTML allowed — content is already escaped/controlled
    line.innerHTML = `<span class="prompt">></span> ${text}`;
  } else if (className === 'run-line') {
    line.innerHTML = `<span class="prompt">></span> ${text}`;
  } else {
    line.innerHTML = `<span class="prompt">></span> ${text}`;
  }

  consoleLog.appendChild(line);
  consoleLog.scrollTop = consoleLog.scrollHeight;
}

function escapeHTML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// G. Smart Team Finder & Matchmaking Grid
function setupTeamFinderFilters() {
  const searchInput = document.getElementById('team-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      filterTeamCards();
    });
  }
}

async function loadTeamFinderData() {
  const loader = document.getElementById('teamfinder-loader');
  const grid = document.getElementById('team-cards-grid');

  loader.classList.add('active');
  grid.classList.add('hidden');

  try {
    const response = await fetch('/api/users/students');
    const students = await response.json();
    state.students = students;

    const allSkills = new Set();
    students.forEach(s => s.skills.forEach(skill => allSkills.add(skill)));

    renderFilterPills(Array.from(allSkills));
    renderTeamCards(students);

  } catch (error) {
    showToast('Failed to load matching candidates.', 'error');
  } finally {
    setTimeout(() => {
      loader.classList.remove('active');
      grid.classList.remove('hidden');
      setup3DTiltEffect();
    }, 400);
  }
}

function renderFilterPills(skillsArray) {
  const container = document.getElementById('skills-filter-pills');
  if (!container) return;
  container.innerHTML = '';

  skillsArray.forEach(skill => {
    const pill = document.createElement('span');
    pill.className = 'filter-pill';
    pill.textContent = skill;
    
    pill.addEventListener('click', () => {
      if (state.selectedSkillsFilter.includes(skill)) {
        state.selectedSkillsFilter = state.selectedSkillsFilter.filter(s => s !== skill);
        pill.classList.remove('active');
      } else {
        state.selectedSkillsFilter.push(skill);
        pill.classList.add('active');
      }
      filterTeamCards();
    });

    container.appendChild(pill);
  });
}

function renderTeamCards(studentsList) {
  const grid = document.getElementById('team-cards-grid');
  if (!grid) return;
  grid.innerHTML = '';

  studentsList.forEach(student => {
    if (state.currentUser && student.id === state.currentUser.id) return;

    const card = document.createElement('div');
    card.className = 'glass-panel recruitment-card card-tilt';

    const skillsHtml = student.skills.map(s => `<span class="skill-badge">${s}</span>`).join('');
    const statusClass = student.status.toLowerCase() === 'available' ? 'available' : 'busy';

    card.innerHTML = `
      <div class="card-top">
        <div class="card-title-meta">
          <h3 class="student-card-name">${student.name}</h3>
          <span class="student-card-major">${student.major}</span>
        </div>
        <span class="status-badge ${statusClass}">
          ${state.currentLang === 'en' ? student.status : (student.status === 'Available' ? 'متاح' : 'مشغول')}
        </span>
      </div>

      <div class="card-skills-row">
        ${skillsHtml}
      </div>

      <div class="card-action-row">
        <button class="secondary-outline-btn view-profile-btn" data-id="${student.id}">
          ${state.currentLang === 'en' ? 'View Profile' : 'الملف البرمجي'}
        </button>
        <button class="alliance-btn request-btn" data-id="${student.id}">
          ${state.currentLang === 'en' ? 'Send Alliance' : 'إرسال تحالف'}
        </button>
      </div>
    `;

    card.querySelector('.view-profile-btn').addEventListener('click', () => {
      openProfileModal(student);
    });

    const reqBtn = card.querySelector('.request-btn');
    reqBtn.addEventListener('click', async () => {
      if (reqBtn.classList.contains('dispatched')) return;

      try {
        const response = await fetch('/api/alliance/request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            senderId: state.currentUser.id,
            recipientId: student.id,
            projectName: 'EduSphere Team platform'
          })
        });

        if (response.ok) {
          reqBtn.textContent = state.currentLang === 'en' ? '✓ Request Dispatched' : '✓ تم إرسال الطلب';
          reqBtn.className = 'alliance-btn dispatched';
          showToast(
            state.currentLang === 'en' 
              ? `Alliance link requested with: ${student.name}` 
              : `تم إرسال طلب ارتباط مع الطالب: ${student.name}`, 
            'success'
          );
        }
      } catch (err) {
        showToast('Alliance connection error.', 'error');
      }
    });

    grid.appendChild(card);
  });
}

function filterTeamCards() {
  const query = document.getElementById('team-search-input').value.toLowerCase();
  
  const filtered = state.students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(query) || student.major.toLowerCase().includes(query);
    const matchesSkills = state.selectedSkillsFilter.every(skill => student.skills.includes(skill));
    return matchesSearch && matchesSkills;
  });

  renderTeamCards(filtered);
  setup3DTiltEffect();
}

function openProfileModal(student) {
  const modal = document.getElementById('profile-modal');
  const viewContainer = document.getElementById('modal-view-container');
  const editContainer = document.getElementById('modal-edit-container');

  // Toggle blocks
  viewContainer.classList.remove('hidden');
  editContainer.classList.add('hidden');

  const modalView = document.getElementById('modal-view-container');

  const skillsHtml = student.skills.map(s => `<span class="skill-badge">${s}</span>`).join('');

  modalView.innerHTML = `
    <div class="modal-profile-header">
      <img src="${student.avatar}" alt="Avatar">
      <div>
        <h3>${student.name}</h3>
        <span class="modal-profile-major">${student.major}</span>
      </div>
    </div>
    <div class="modal-profile-bio">
      ${student.bio || (state.currentLang === 'en' ? 'Engineering node with calibrated backend integrations and system calibrations.' : 'مهندس تقني متخصص في بناء الخوادم ومعايرة أجزاء الأنظمة الذكية.')}
    </div>
    <h4 class="section-title">${state.currentLang === 'en' ? 'Core Skills Matrix' : 'مصفوفة المهارات التقنية'}</h4>
    <div class="skills-grid" style="margin-top: 1rem;">
      ${skillsHtml}
    </div>
  `;

  modal.classList.add('show');
}

// H. Project Showroom Module
async function loadShowroomData() {
  const loader = document.getElementById('showroom-loader');
  const grid = document.getElementById('showroom-cards-grid');

  loader.classList.add('active');
  grid.classList.add('hidden');

  try {
    const response = await fetch('/api/projects');
    const projects = await response.json();
    state.projects = projects;

    renderShowroomCards(projects);

  } catch (err) {
    showToast('Failed to compile project registry.', 'error');
  } finally {
    setTimeout(() => {
      loader.classList.remove('active');
      grid.classList.remove('hidden');
      setup3DTiltEffect();
    }, 400);
  }
}

function renderShowroomCards(projects) {
  const grid = document.getElementById('showroom-cards-grid');
  if (!grid) return;
  grid.innerHTML = '';

  if (projects.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding: 4rem; color: var(--text-muted);">
        <h3>${state.currentLang === 'en' ? 'No projects registered in showroom yet' : 'لا توجد مشاريع مسجلة في المعرض حالياً'}</h3>
      </div>
    `;
    return;
  }

  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'glass-panel project-card card-tilt';

    const techBadges = project.techStack.map(t => `<span class="skill-badge">${t}</span>`).join('');
    const timelineNodes = project.timeline.map((node, i) => {
      const activeClass = node.completed ? 'completed' : '';
      return `
        <div class="timeline-node ${activeClass}">
          <div class="milestone-tooltip">
            <p class="tooltip-phase">${node.phase}</p>
            <p>${node.description}</p>
          </div>
        </div>
      `;
    }).join('');

    card.innerHTML = `
      <div class="project-preview-container">
        <img src="${project.imageUrl}" alt="Preview" class="project-img">
        ${project.videoUrl ? `
        <button class="play-overlay-btn" data-video="${project.videoUrl}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </button>` : ''}
      </div>

      <div class="project-card-body">
        <h3 class="project-card-title">${project.title}</h3>
        <p class="project-card-overview">${project.description}</p>
        
        <div class="card-skills-row">
          ${techBadges}
        </div>

        <h4 class="timeline-title">${state.currentLang === 'en' ? 'Development Milestones' : 'مراحل التطوير الهندسي'}</h4>
        <div class="project-timeline">
          ${timelineNodes}
        </div>
      </div>

      <div class="project-card-footer">
        <a href="${project.liveDemoUrl || '#'}" target="_blank" class="showroom-btn-demo">
          ${state.currentLang === 'en' ? 'Launch Live Demo' : 'معاينة البث المباشر'}
        </a>
        <a href="${project.codebaseUrl || '#'}" target="_blank" class="showroom-btn-code">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          <span>${state.currentLang === 'en' ? 'Explore Codebase' : 'مستودع الكود'}</span>
        </a>
      </div>
    `;

    // BUG-2: Only attach video click if videoUrl is valid
    const playBtn = card.querySelector('.play-overlay-btn');
    if (playBtn) {
      playBtn.addEventListener('click', (e) => {
        const btn = e.currentTarget;
        const videoUrl = btn.getAttribute('data-video');
        if (videoUrl && videoUrl !== 'null' && videoUrl !== 'undefined') {
          openVideoLightbox(videoUrl);
        } else {
          showToast('لا يوجد فيديو تجريبي لهذا المشروع. 🎬', 'info');
        }
      });
    }

    grid.appendChild(card);
  });
}

function openVideoLightbox(videoUrl) {
  const lightbox = document.getElementById('video-lightbox');
  const video = document.getElementById('lightbox-video');
  video.src = videoUrl;
  lightbox.classList.add('show');
}

// I. Evaluator/Engineer Grading Console
async function loadEvaluatorConsole() {
  const unauthorizedCard = document.getElementById('eval-unauthorized-card');
  const authorizedPanel = document.getElementById('eval-authorized-panel');

  if (!state.currentUser || (state.currentUser.role !== 'Evaluator' && state.currentUser.role !== 'Engineer')) {
    unauthorizedCard.classList.remove('hidden');
    authorizedPanel.classList.add('hidden');
    return;
  }

  unauthorizedCard.classList.add('hidden');
  authorizedPanel.classList.remove('hidden');

  try {
    const response = await fetch('/api/projects');
    const projects = await response.json();
    
    document.getElementById('active-groups-badge').textContent = 
      state.currentLang === 'en' ? `${projects.length} Registered` : `${projects.length} مسجل`;

    const matrixBody = document.getElementById('groups-matrix-body');
    matrixBody.innerHTML = '';

    projects.forEach((proj, idx) => {
      const tr = document.createElement('tr');
      tr.setAttribute('data-id', proj.id);
      
      const statusText = proj.progressPercentage >= 100 
        ? (state.currentLang === 'en' ? 'Graded' : 'مقيّم') 
        : (state.currentLang === 'en' ? 'Pending' : 'قيد المراجعة');
      const statusClass = proj.progressPercentage >= 100 ? 'graded' : 'pending';

      const teamString = proj.teamMembers.join(', ') || 'Independent';

      tr.innerHTML = `
        <td><strong>GRP-${idx + 100}</strong></td>
        <td>${proj.title}</td>
        <td>${teamString}</td>
        <td>
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <div style="background:var(--bg-tertiary); width:60px; height:6px; border-radius:3px; overflow:hidden;">
              <div style="background:var(--accent-cyan); width:${proj.progressPercentage}%; height:100%;"></div>
            </div>
            <span>${proj.progressPercentage}%</span>
          </div>
        </td>
        <td><span class="table-status-pill ${statusClass}">${statusText}</span></td>
      `;

      tr.addEventListener('click', () => {
        document.querySelectorAll('#groups-matrix-body tr').forEach(r => r.classList.remove('selected'));
        tr.classList.add('selected');
        
        initializeGradingForm(proj);
      });

      matrixBody.appendChild(tr);
    });

  } catch (error) {
    showToast('Failed to parse active engineering groups matrix.', 'error');
  }
}

async function initializeGradingForm(project) {
  document.getElementById('grading-empty-msg').classList.add('hidden');
  
  const form = document.getElementById('evaluation-form');
  form.classList.remove('hidden');

  document.getElementById('grading-project-subtitle').textContent = project.title;
  document.getElementById('grading-project-id').value = project.id;

  // Load project ratings and configure sync checks
  await loadProjectReviewsList(project.id);
}

// Load Project reviews with consensus calculations and pre-populated values
async function loadProjectReviewsList(projectId) {
  const container = document.getElementById('reviews-feed-container');
  const consensusDisplay = document.getElementById('consensus-score-display');
  container.innerHTML = '';

  try {
    const response = await fetch(`/api/evaluations/${projectId}`);
    const result = await response.json();

    const evaluations = result.evaluations || [];
    const consensusAvg = result.consensusAverage || 0;

    // Display Consensus Rating
    consensusDisplay.textContent = consensusAvg > 0 ? `${consensusAvg} / 10` : 'N/A';

    // Verify if the current user has rated the selected project node
    const myEval = evaluations.find(e => e.evaluatorId === state.currentUser.id);
    
    const sliders = document.querySelectorAll('.criteria-slider');
    if (myEval) {
      // PRE-SET sliders to values previously saved
      document.getElementById('slider-uiUx').value = myEval.grades.uiUx;
      document.getElementById('slider-codeArchitecture').value = myEval.grades.codeArchitecture;
      document.getElementById('slider-databaseEfficiency').value = myEval.grades.databaseEfficiency;
      document.getElementById('slider-innovation').value = myEval.grades.innovation;
      document.getElementById('eval-feedback').value = myEval.feedback;
    } else {
      // Reset sliders to default
      sliders.forEach(slider => {
        slider.value = 5;
      });
      document.getElementById('eval-feedback').value = '';
    }

    // Refresh displays
    sliders.forEach(slider => {
      updateSliderColor(slider);
    });
    calculateAverageScore();

    // Render other reviews inside the logs
    if (evaluations.length === 0) {
      container.innerHTML = `
        <div style="font-size:0.78rem; color:var(--text-muted); text-align:center; padding: 0.5rem 0;">
          ${state.currentLang === 'en' ? 'No evaluations committed for this node yet.' : 'لم يتم تقييم هذا المشروع من أي مهندس مراجع بعد.'}
        </div>
      `;
      return;
    }

    evaluations.forEach(eval => {
      const reviewDiv = document.createElement('div');
      reviewDiv.style.background = 'rgba(255,255,255,0.03)';
      reviewDiv.style.border = '1px solid rgba(255,255,255,0.05)';
      reviewDiv.style.padding = '0.5rem';
      reviewDiv.style.borderRadius = '4px';
      reviewDiv.style.fontSize = '0.8rem';
      reviewDiv.style.display = 'flex';
      reviewDiv.style.flexDirection = 'column';
      reviewDiv.style.gap = '0.2rem';

      reviewDiv.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong style="color: var(--accent-cyan); font-size:0.8rem;">${eval.evaluatorName}</strong>
          <span style="font-family:monospace; font-weight:700; color:var(--accent-green);">${eval.averageGrade} / 10</span>
        </div>
        <p style="color:var(--text-secondary); margin-top:0.1rem; line-height:1.3;">"${eval.feedback}"</p>
      `;
      container.appendChild(reviewDiv);
    });

  } catch (error) {
    console.error('Failed to load project reviews feed logs:', error);
  }
}

function setupEvaluationForm() {
  const form = document.getElementById('evaluation-form');
  const sliders = document.querySelectorAll('.criteria-slider');

  sliders.forEach(slider => {
    slider.addEventListener('input', () => {
      updateSliderColor(slider);
      calculateAverageScore();
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('eval-commit-btn');
    btn.classList.add('loading');
    btn.disabled = true;

    const projectId = document.getElementById('grading-project-id').value;
    const feedback = document.getElementById('eval-feedback').value;

    const grades = {
      uiUx: parseInt(document.getElementById('slider-uiUx').value),
      codeArchitecture: parseInt(document.getElementById('slider-codeArchitecture').value),
      databaseEfficiency: parseInt(document.getElementById('slider-databaseEfficiency').value),
      innovation: parseInt(document.getElementById('slider-innovation').value)
    };

    const payload = {
      projectId,
      grades,
      feedback
    };

    // Calculate Average to verify toast messages
    const averageScore = parseFloat(((grades.uiUx + grades.codeArchitecture + grades.databaseEfficiency + grades.innovation) / 4).toFixed(2));

    try {
      const response = await fetch('/api/evaluations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': state.currentUser.role,
          'x-user-id': state.currentUser.id
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Trigger Toast notifications with custom Egyptian humor parameters
        if (averageScore >= 8.5) {
          showToast("ايوة كدة يا باشمهندس روق علينا! تم تسجيل التقييم الفخم بنجاح 😎🔥", 'success');
        } else {
          showToast("تمام يا هندسة.. مسيرنا نعدل اللوجيك برضه ويكبر ويوجع! 🛠️", 'info');
        }
        showRandomMemeToast();
        triggerConfetti();

        setTimeout(() => {
          loadEvaluatorConsole();
          document.getElementById('grading-empty-msg').classList.remove('hidden');
          form.classList.add('hidden');
        }, 1200);

      } else {
        showToast(result.error || 'Evaluation transaction abort.', 'error');
      }

    } catch (error) {
      showToast('Offline state or connection validation fail.', 'error');
    } finally {
      btn.classList.remove('loading');
      btn.disabled = false;
    }
  });
}

function updateSliderColor(slider) {
  const val = parseInt(slider.value);
  const criteria = slider.id.replace('slider-', '');
  const valSpan = document.getElementById('val-' + criteria);
  
  if (valSpan) {
    valSpan.textContent = val;
    if (val <= 3) {
      valSpan.style.color = 'var(--accent-red)';
      valSpan.style.textShadow = '0 0 8px var(--accent-red-glow)';
      slider.style.background = `linear-gradient(90deg, var(--accent-red) 0%, var(--accent-red) ${val*10}%, var(--bg-tertiary) ${val*10}%, var(--bg-tertiary) 100%)`;
    } else if (val <= 7) {
      valSpan.style.color = 'var(--accent-amber)';
      valSpan.style.textShadow = '0 0 8px var(--accent-amber-glow)';
      slider.style.background = `linear-gradient(90deg, var(--accent-amber) 0%, var(--accent-amber) ${val*10}%, var(--bg-tertiary) ${val*10}%, var(--bg-tertiary) 100%)`;
    } else {
      valSpan.style.color = 'var(--accent-green)';
      valSpan.style.textShadow = '0 0 8px var(--accent-green-glow)';
      slider.style.background = `linear-gradient(90deg, var(--accent-green) 0%, var(--accent-green) ${val*10}%, var(--bg-tertiary) ${val*10}%, var(--bg-tertiary) 100%)`;
    }
  }
}

// Calculate cumulative grade
function calculateAverageScore() {
  const ui = parseInt(document.getElementById('slider-uiUx').value);
  const arch = parseInt(document.getElementById('slider-codeArchitecture').value);
  const db = parseInt(document.getElementById('slider-databaseEfficiency').value);
  const innov = parseInt(document.getElementById('slider-innovation').value);

  const avg = ((ui + arch + db + innov) / 4).toFixed(1);
  const scoreDisplay = document.getElementById('average-score-display');
  scoreDisplay.textContent = `${avg} / 10`;

  if (avg <= 3.9) {
    scoreDisplay.style.color = 'var(--accent-red)';
    scoreDisplay.style.textShadow = '0 0 12px var(--accent-red-glow)';
  } else if (avg <= 7.4) {
    scoreDisplay.style.color = 'var(--accent-amber)';
    scoreDisplay.style.textShadow = '0 0 12px var(--accent-amber-glow)';
  } else {
    scoreDisplay.style.color = 'var(--accent-green)';
    scoreDisplay.style.textShadow = '0 0 12px var(--accent-green-glow)';
  }
}

// J. Canvas Confetti explosion simulation
function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#00f0ff', '#39ff14', '#ffb700', '#ff3e3e', '#ffffff'];

  for (let i = 0; i < 180; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 3 * 2, 
      vx: (Math.random() - 0.5) * 22,
      vy: (Math.random() - 0.7) * 22 - 8,
      radius: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: Math.random() * 0.012 + 0.006,
      rotation: Math.random() * 360,
      spin: (Math.random() - 0.5) * 0.25
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;

    particles.forEach(p => {
      if (p.alpha > 0) {
        active = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.28; 
        p.vx *= 0.98; 
        p.alpha -= p.decay;
        p.rotation += p.spin;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);
        ctx.restore();
      }
    });

    if (active) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}

// K. Micro-Interactions: 3D Tilt Effect
let tiltRAF = null;

function setup3DTiltEffect() {
  const cards = document.querySelectorAll('.card-tilt');
  cards.forEach(card => {
    card.removeEventListener('mousemove', onCardMouseMove);
    card.removeEventListener('mouseleave', onCardMouseLeave);

    card.addEventListener('mousemove', onCardMouseMove);
    card.addEventListener('mouseleave', onCardMouseLeave);
  });
}

function onCardMouseMove(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const xc = rect.width / 2;
  const yc = rect.height / 2;

  // Cards with interactive elements get softer 2-3deg tilt for button stability
  const hasInteractives = card.querySelector('button, input, select, textarea, form');
  const maxAngle = hasInteractives ? 2.5 : 4.5;
  const scaleFactor = hasInteractives ? 1.01 : 1.025;

  // Compute raw tilt angles from mouse position
  let angleX = (yc - y) / (rect.height / 2) * maxAngle;
  let angleY = (x - xc) / (rect.width  / 2) * maxAngle;

  // Clamp to max angle
  angleX = Math.max(-maxAngle, Math.min(maxAngle, angleX));
  angleY = Math.max(-maxAngle, Math.min(maxAngle, angleY));

  // Dynamic glow offset follows mouse direction
  const dx = (x - xc) / xc;
  const dy = (y - yc) / yc;
  const shadowX = -dx * 10;
  const shadowY = -dy * 10;

  if (tiltRAF) cancelAnimationFrame(tiltRAF);

  tiltRAF = requestAnimationFrame(() => {
    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(${scaleFactor}, ${scaleFactor}, ${scaleFactor})`;
    card.style.boxShadow = `${shadowX}px ${shadowY}px 22px var(--accent-cyan-glow), 0 0 28px rgba(0,0,0,0.45)`;
    card.style.borderColor = 'var(--accent-cyan)';
  });
}

// Restore default orientation on mouse leave — smooth spring-back
function onCardMouseLeave(e) {
  const card = e.currentTarget;

  if (tiltRAF) cancelAnimationFrame(tiltRAF);

  tiltRAF = requestAnimationFrame(() => {
    card.style.transform    = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    card.style.boxShadow    = '';
    card.style.borderColor  = '';
  });
}

// L. UI Modals & Pop-up Dialog Handlers
function setupUIInteractions() {
  const notifBtn = document.getElementById('notification-btn');
  const notifDropdown = document.getElementById('notif-dropdown');
  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notifDropdown.classList.toggle('show');
    document.getElementById('profile-dropdown').classList.remove('show');
  });

  const userBtn = document.getElementById('user-profile-btn');
  const profileDropdown = document.getElementById('profile-dropdown');
  userBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle('show');
    notifDropdown.classList.remove('show');
  });

  // Bind dropdown settings/profile buttons to open profile editing modal
  const dropdownProfileLinks = document.querySelectorAll('.dropdown-links a');
  dropdownProfileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.classList.contains('logout-btn')) return;
      e.preventDefault();
      openEditProfileModal();
    });
  });

  document.addEventListener('click', () => {
    notifDropdown.classList.remove('show');
    profileDropdown.classList.remove('show');
  });

  document.getElementById('clear-notif-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('notif-badge').style.display = 'none';
    document.getElementById('notif-list').innerHTML = `
      <li style="padding:1.5rem; text-align:center; color:var(--text-muted); font-size:0.85rem;">
        No active notifications
      </li>
    `;
  });

  document.getElementById('profile-modal-close').addEventListener('click', () => {
    document.getElementById('profile-modal').classList.remove('show');
  });

  document.getElementById('lightbox-close').addEventListener('click', () => {
    const lightbox = document.getElementById('video-lightbox');
    const video = document.getElementById('lightbox-video');
    video.pause();
    video.src = '';
    lightbox.classList.remove('show');
  });

  window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti-canvas');
    if (canvas.width > 0) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });
}

// M. Global Custom Toast Banner
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<div class="toast-content">${message}</div>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOutToastFade 0.3s forwards';
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  }, 4000);
}

// Egyptian Humor and Meme Infusion Configuration
const EGYPTIAN_JOKES = [
  "الكود مكتوب قبل الفجر بنص ساعة والكبسولة شغالة 🚀💊",
  "نسبة الكافيين في دمك 99% والـ Compiler بيصرخ من العذاب! ☕🔥",
  "الكود شغال ببركة دعا الوالدين وصافي النية، مش بالـ Syntax خالص! 🤲✨",
  "حالة الأوامر 100% والناس رايقة والـ bug بتموت في صمت 😎",
  "السيرفر بيصلي ركعتين بنية فرج الكود ده.. ادعي معانا! 🕌🤲",
  "الـ Bug دي عنيدة بس إحنا أعند منها، الشاي بالنعناع شغال والشباب رايق ☕🍃",
  "يا بشمهندس الكود شغال بالستر الإلهي، متلمسوش تاني بالله عليك! 🤫🛑",
  "جاري البحث عن الـ Semicolon التائهة في دروب الزمن والملفات 🔍⏳",
  "عملنا Deploy والـ Production حالياً في العناية المركزة وبيدعي علينا 🤞🏥",
  "بص يا فنان.. الكود ده محتاج طبطبة مش Debugging 🥺❤️",
  "الـ 7 مهندسين داخلين يقيموا؟ قولهم العشا جاهز وبلاش كود النهارده! 🍗🎉",
  "الكبسولة الهندسية شغالة والشباب مية مية 💊⚡"
];

function showRandomMemeToast() {
  const randomJoke = EGYPTIAN_JOKES[Math.floor(Math.random() * EGYPTIAN_JOKES.length)];
  setTimeout(() => {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast meme-toast';
    toast.innerHTML = `<div class="toast-content">🎭 ${randomJoke}</div>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOutToastFade 0.35s forwards';
      toast.addEventListener('animationend', () => toast.remove());
    }, 5500); // meme toasts stay 5.5s
  }, 1400);
}


// Add CSS keyframe override dynamically for toast dismiss fading
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes slideOutToastFade {
    to { transform: translateX(120%); opacity: 0; }
  }
  html[dir="rtl"] @keyframes slideOutToastFade {
    to { transform: translateX(-120%); opacity: 0; }
  }
`;
document.head.appendChild(styleSheet);

// ==========================================
//  BUG-1: ALLIANCE INCOMING POLLING (10s interval)
// ==========================================
function startAlliancePolling() {
  if (!state.currentUser || state.currentUser.role !== 'Student') return;

  // Clear any existing interval
  if (state.alliancePollInterval) clearInterval(state.alliancePollInterval);

  const pollFn = async () => {
    try {
      const res = await fetch(`/api/alliance/incoming/${state.currentUser.id}`);
      if (!res.ok) return;
      const data = await res.json();
      const requests = data.requests || [];
      if (requests.length > 0) {
        injectAllianceNotifications(requests);
      }
    } catch (err) {
      // silent fail — polling should never crash the UI
    }
  };

  // Run immediately, then every 10s
  pollFn();
  state.alliancePollInterval = setInterval(pollFn, 10000);
}

function injectAllianceNotifications(requests) {
  const notifList = document.getElementById('notif-list');
  const notifBadge = document.getElementById('notif-badge');
  if (!notifList) return;

  // Remove existing alliance notification items to avoid duplicates
  notifList.querySelectorAll('.alliance-notif-item').forEach(el => el.remove());

  requests.forEach(req => {
    const li = document.createElement('li');
    li.className = 'alliance-notif-item';
    li.setAttribute('data-alliance-id', req.id);
    li.innerHTML = `
      <span class="alliance-notif-sender">📡 ${req.sender_name}</span>
      <span class="alliance-notif-project">
        ${state.currentLang === 'en' ? 'Wants to team up on:' : 'يريد الانضمام إلى مشروع:'} <strong>${req.project_name || 'N/A'}</strong>
      </span>
      <div class="alliance-action-row">
        <button class="alliance-accept-btn" data-id="${req.id}">
          ✅ ${state.currentLang === 'en' ? 'Accept' : 'قبول'}
        </button>
        <button class="alliance-decline-btn" data-id="${req.id}">
          ❌ ${state.currentLang === 'en' ? 'Decline' : 'رفض'}
        </button>
      </div>
    `;

    // Accept handler
    li.querySelector('.alliance-accept-btn').addEventListener('click', async () => {
      try {
        await fetch('/api/alliance/accept', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ allianceId: req.id })
        });
        li.remove();
        showToast(`✅ تم قبول طلب التحالف من ${req.sender_name}!`, 'success');
      } catch (e) {
        showToast('خطأ في قبول الطلب.', 'error');
      }
    });

    // Decline handler
    li.querySelector('.alliance-decline-btn').addEventListener('click', async () => {
      try {
        await fetch('/api/alliance/decline', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ allianceId: req.id, recipientId: state.currentUser.id })
        });
        li.remove();
        showToast(`تم رفض طلب التحالف من ${req.sender_name}.`, 'info');
      } catch (e) {
        showToast('خطأ في رفض الطلب.', 'error');
      }
    });

    notifList.insertBefore(li, notifList.firstChild);
  });

  // Show badge
  if (requests.length > 0) {
    notifBadge.textContent = requests.length;
    notifBadge.style.display = 'flex';
  }
}

// ==========================================
//  BUG-4: LOCAL SETTINGS (LocalStorage only)
// ==========================================
const LS_KEYS = {
  GLOW:       'edusphere_glow_intensity',
  AUDIO:      'edusphere_audio_enabled',
  ANIMATIONS: 'edusphere_animations_enabled',
  MATRIX:     'edusphere_matrix_wipe'
};

function loadLocalSettings() {
  const glow = localStorage.getItem(LS_KEYS.GLOW);
  if (glow !== null) applyGlowIntensity(parseInt(glow));
}

function loadLocalSettingsIntoUI() {
  const glowVal  = localStorage.getItem(LS_KEYS.GLOW)       ?? '60';
  const audio    = localStorage.getItem(LS_KEYS.AUDIO)       !== 'false';
  const anim     = localStorage.getItem(LS_KEYS.ANIMATIONS)  !== 'false';
  const matrix   = localStorage.getItem(LS_KEYS.MATRIX)      !== 'false';

  const glowEl  = document.getElementById('setting-glow-intensity');
  const audioEl = document.getElementById('setting-audio-enabled');
  const animEl  = document.getElementById('setting-animations-enabled');
  const matrixEl= document.getElementById('setting-matrix-wipe');

  if (glowEl)   glowEl.value   = glowVal;
  if (audioEl)  audioEl.checked = audio;
  if (animEl)   animEl.checked  = anim;
  if (matrixEl) matrixEl.checked = matrix;
}

function saveLocalSettings() {
  const glowEl   = document.getElementById('setting-glow-intensity');
  const audioEl  = document.getElementById('setting-audio-enabled');
  const animEl   = document.getElementById('setting-animations-enabled');
  const matrixEl = document.getElementById('setting-matrix-wipe');

  if (glowEl)   { localStorage.setItem(LS_KEYS.GLOW, glowEl.value);              applyGlowIntensity(parseInt(glowEl.value)); }
  if (audioEl)  { localStorage.setItem(LS_KEYS.AUDIO, audioEl.checked); }
  if (animEl)   { localStorage.setItem(LS_KEYS.ANIMATIONS, animEl.checked); }
  if (matrixEl) { localStorage.setItem(LS_KEYS.MATRIX, matrixEl.checked); }

  showToast('⚙️ الإعدادات المحلية تم حفظها في المتصفح!', 'success');
}

function applyGlowIntensity(val) {
  // Map 0-100 to an opacity percentage for glow variables
  const intensity = val / 100;
  document.documentElement.style.setProperty('--accent-cyan-glow', `rgba(0, 240, 255, ${0.2 + intensity * 0.4})`);
  document.documentElement.style.setProperty('--accent-green-glow', `rgba(57, 255, 20, ${0.2 + intensity * 0.4})`);
  document.documentElement.style.setProperty('--accent-amber-glow', `rgba(255, 183, 0, ${0.2 + intensity * 0.4})`);
}

// ==========================================
//  SECTION 3: MATRIX SCREEN WIPE TRANSITION
// ==========================================
function setupMatrixWipeOverlay() {
  // Overlay is injected in index.html — just ensure canvas size is correct
  const canvas = document.getElementById('matrix-wipe-canvas');
  if (!canvas) return;
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

function runMatrixWipeTransition(callback) {
  const overlay = document.getElementById('matrix-wipe-overlay');
  const canvas  = document.getElementById('matrix-wipe-canvas');
  if (!overlay || !canvas) { callback(); return; }

  const ctx = canvas.getContext('2d');
  const W = canvas.width  = window.innerWidth;
  const H = canvas.height = window.innerHeight;

  const cols     = Math.floor(W / 18);
  const drops    = Array(cols).fill(0);
  const CHARS    = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01'.split('');
  const DURATION = 750; // ms
  let   startTime = null;
  let   rafId;

  overlay.classList.add('active');

  function drawFrame(ts) {
    if (!startTime) startTime = ts;
    const elapsed = ts - startTime;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#00f0ff';
    ctx.font = '14px monospace';

    drops.forEach((y, i) => {
      const char = CHARS[Math.floor(Math.random() * CHARS.length)];
      ctx.fillText(char, i * 18, y * 18);
      if (y * 18 > H && Math.random() > 0.975) drops[i] = 0;
      else drops[i]++;
    });

    if (elapsed < DURATION) {
      rafId = requestAnimationFrame(drawFrame);
    } else {
      cancelAnimationFrame(rafId);
      overlay.classList.remove('active');
      ctx.clearRect(0, 0, W, H);
      callback();
    }
  }

  rafId = requestAnimationFrame(drawFrame);
}

// ==========================================
//  SECTION 3: TEXT SCRAMBLER ON ACTION BUTTONS
// ==========================================
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!?';

function scrambleText(element, originalText, duration = 500) {
  let elapsed = 0;
  const interval = 35;
  const totalFrames = Math.ceil(duration / interval);
  let frame = 0;

  const timer = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const resolvedChars = Math.floor(progress * originalText.length);

    const scrambled = originalText.split('').map((ch, i) => {
      if (i < resolvedChars || ch === ' ') return ch;
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    }).join('');

    element.textContent = scrambled;

    if (frame >= totalFrames) {
      clearInterval(timer);
      element.textContent = originalText;
      element.classList.remove('btn-scramble-active');
    }
  }, interval);
}

function setupTextScramblerOnButtons() {
  // Apply scramble effect to all primary/action buttons on hover
  document.addEventListener('mouseover', (e) => {
    const btn = e.target.closest('.primary-btn, .showroom-btn-demo, .lightning-btn, .alliance-btn');
    if (!btn) return;
    const textEl = btn.querySelector('.btn-text') || btn;
    const original = textEl._originalText || textEl.textContent.trim();
    textEl._originalText = original;
    if (!btn._scramblerActive) {
      btn._scramblerActive = true;
      textEl.classList.add('btn-scramble-active');
      scrambleText(textEl, original, 400);
      setTimeout(() => { btn._scramblerActive = false; }, 500);
    }
  });
}

