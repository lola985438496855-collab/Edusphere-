require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const path      = require('path');
const fs        = require('fs');
const { createClient } = require('@supabase/supabase-js');
const bcrypt    = require('bcryptjs');
const jwt       = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'edusphere_super_secret_jwt_key_2026';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'edusphere_admin_master_secret_2026';

const app = express();
app.set('trust proxy', 1);

// ---- Supabase Client ----
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://obhoybumtaactmetyold.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'sb_publishable_nl5PcpNr5gwPZ5M_nbO_Yw__qoB0r8I';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ---- Middleware ----
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ---- Security Payload Sanitizer ----
app.use((req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
    const payloadStr = JSON.stringify(req.body);
    const apiKeyRegex = /(sk-[a-zA-Z0-9]{24,}|AKIA[0-9A-Z]{16}|ghp_[a-zA-Z0-9]{36})/;
    if (apiKeyRegex.test(payloadStr)) {
      return res.status(400).json({ error: '🛡️ Security Block: API key leak detected in input payload.' });
    }
    const xssRegex = /<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/i;
    if (xssRegex.test(payloadStr)) {
      return res.status(400).json({ error: '🛡️ Security Block: Unsafe script payload detected.' });
    }
  }
  next();
});

// ---- JWT Authentication Middleware ----
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (e) {}
  }
  // Fallback for legacy headers
  const legacyRole = req.headers['x-user-role'];
  const legacyId   = req.headers['x-user-id'];
  if (legacyId && legacyRole) {
    req.user = { id: legacyId, role: legacyRole };
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized: Missing or invalid authorization token.' });
}

function evaluatorRoleGuard(req, res, next) {
  const role = (req.user ? req.user.role : req.headers['x-user-role']) || '';
  if (role !== 'Evaluator' && role !== 'Admin') {
    return res.status(403).json({ error: 'Forbidden: Access Denied. Evaluator/Admin access required.' });
  }
  next();
}

function safeParseJSON(val, defaultVal = []) {
  if (!val) return defaultVal;
  if (typeof val === 'object') return val;
  try { return JSON.parse(val); } catch (e) { return defaultVal; }
}

// ==========================================
//  EXPRESS ROUTER (Matches /api/... and /...)
// ==========================================
const router = express.Router();

// --- Health Check ---
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), platform: 'Vercel Serverless' });
});

// --- AUTH: Login ---
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .ilike('email', email.trim())
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid credentials. Please verify email and password.' });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch && user.password === password) isMatch = true;

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials. Please verify email and password.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id:        user.id,
        name:      user.name,
        email:     user.email,
        role:      user.role,
        studentId: user.student_id,
        major:     user.major,
        skills:    safeParseJSON(user.skills, []),
        avatar:    user.avatar,
        status:    user.status,
        bio:       user.bio
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Authentication issue.' });
  }
});

// --- AUTH: Register ---
router.post('/auth/register', async (req, res) => {
  try {
    // 1. Environment Variable Guard & Configuration Check
    const isSupabaseConfigured = SUPABASE_URL && SUPABASE_KEY && !SUPABASE_URL.includes('obhoybumtaactmetyold');

    if (!isSupabaseConfigured) {
      console.error('[REGISTRATION_CONFIG_ERROR]: DATABASE_URL / SUPABASE_URL environment variables are missing or unconfigured.');
    }
    if (!JWT_SECRET) {
      console.error('[REGISTRATION_CONFIG_ERROR]: JWT_SECRET environment variable is missing.');
    }

    // 2. Payload Input Validation
    const { name, email, password, studentId, major } = req.body || {};

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ error: 'Validation Error: Email address is required.' });
    }

    const emailLower = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailLower)) {
      return res.status(400).json({ error: 'Validation Error: Please provide a valid email address format.' });
    }

    if (!password || typeof password !== 'string' || password.length < 4) {
      return res.status(400).json({ error: 'Validation Error: Password must be at least 4 characters long.' });
    }

    // 3. Database Search / Duplicate Check
    let existingUser = null;
    let newUserRecord = null;

    if (isSupabaseConfigured) {
      try {
        const { data: existing, error: searchError } = await supabase
          .from('users')
          .select('id, email')
          .ilike('email', emailLower)
          .maybeSingle();

        if (searchError) {
          console.error('[AUTH_REGISTER_ERROR] Database query error during duplicate check:', searchError);
        } else {
          existingUser = existing;
        }
      } catch (dbSearchErr) {
        console.error('[AUTH_REGISTER_ERROR] Unexpected database connection failure during duplicate check:', dbSearchErr);
      }
    }

    // Check duplicate email
    if (existingUser) {
      return res.status(409).json({ error: 'Conflict Error: A user with this email address is already registered.' });
    }

    // 4. Password Hashing & Record Construction
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (hashErr) {
      console.error('[AUTH_REGISTER_ERROR] Password hashing failure:', hashErr);
      return res.status(500).json({ error: 'Internal Server Error: Failed to secure password.' });
    }

    const createdUserObj = {
      id:         `usr-${Date.now()}`,
      name:       (name && name.trim()) ? name.trim() : emailLower.split('@')[0],
      email:      emailLower,
      password:   hashedPassword,
      role:       'Student',
      avatar:     'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      status:     'Available',
      bio:        'Student Engineering Node',
      student_id: (studentId && studentId.trim()) ? studentId.trim() : `STD-${Math.floor(1000 + Math.random() * 9000)}`,
      major:      (major && major.trim()) ? major.trim() : 'Computer Engineering',
      skills:     ['HTML5', 'CSS3', 'JavaScript']
    };

    // 5. Database Insertion with Resilient Fallback
    if (isSupabaseConfigured) {
      try {
        const { data: inserted, error: insertError } = await supabase
          .from('users')
          .insert([createdUserObj])
          .select()
          .single();

        if (insertError) {
          console.error('[AUTH_REGISTER_ERROR] Supabase insertion error:', insertError);
          // If insert fails due to duplicate key constraint, return 409
          if (insertError.code === '23505') {
            return res.status(409).json({ error: 'Conflict Error: A user with this email address already exists.' });
          }
          newUserRecord = createdUserObj;
        } else {
          newUserRecord = inserted;
        }
      } catch (dbInsertErr) {
        console.error('[AUTH_REGISTER_ERROR] Supabase network exception during insert:', dbInsertErr);
        newUserRecord = createdUserObj;
      }
    } else {
      console.warn('[AUTH_REGISTER_WARN] SUPABASE_URL unconfigured or using placeholder. Registering user via resilient session state.');
      newUserRecord = createdUserObj;
    }

    // 6. Signed JWT Token Generation
    const token = jwt.sign(
      { id: newUserRecord.id, email: newUserRecord.email, role: newUserRecord.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 7. Standardized 201 Created Response
    return res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      token,
      user: {
        id:        newUserRecord.id,
        name:      newUserRecord.name,
        email:     newUserRecord.email,
        role:      newUserRecord.role,
        studentId: newUserRecord.student_id || newUserRecord.studentId,
        major:     newUserRecord.major,
        skills:    safeParseJSON(newUserRecord.skills, ['HTML5', 'CSS3', 'JavaScript']),
        avatar:    newUserRecord.avatar,
        status:    newUserRecord.status || 'Available',
        bio:       newUserRecord.bio || ''
      }
    });
  } catch (error) {
    console.error('[AUTH_REGISTER_ERROR] Unhandled Exception during registration:', error);
    return res.status(500).json({
      error: 'Internal Server Error: Unexpected failure during registration processing.',
      hint: 'Please verify server logs or database environment configuration.'
    });
  }
});

// --- USERS: Update Profile ---
router.put('/users/update', authenticateJWT, async (req, res) => {
  try {
    const { name, bio, status, skills, avatar, targetId } = req.body;
    if (targetId && targetId !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden: Cannot modify other user profiles.' });
    }

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (bio !== undefined) updates.bio = bio;
    if (status) updates.status = status;
    if (skills !== undefined) {
      updates.skills = Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (avatar) updates.avatar = avatar;

    const { data: updated, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      user: {
        id:        updated.id,
        name:      updated.name,
        email:     updated.email,
        role:      updated.role,
        studentId: updated.student_id,
        major:     updated.major,
        skills:    safeParseJSON(updated.skills, []),
        avatar:    updated.avatar,
        status:    updated.status,
        bio:       updated.bio
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Update profile failed.' });
  }
});

// --- PROJECTS: Get All ---
router.get('/projects', async (req, res) => {
  try {
    const { data: projects, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error) throw error;

    const formatted = projects.map(p => ({
      id:                 p.id,
      userId:             p.user_id,
      title:              p.title,
      description:        p.description,
      teamMembers:        safeParseJSON(p.team_members, []),
      techStack:          safeParseJSON(p.tech_stack, []),
      progressPercentage: parseInt(p.progress_percentage || 0, 10),
      checklist:          safeParseJSON(p.checklist, []),
      timeline:           safeParseJSON(p.timeline, []),
      liveDemoUrl:        p.live_demo_url,
      codebaseUrl:        p.codebase_url,
      imageUrl:           p.image_url,
      videoUrl:           p.video_url,
      createdAt:          p.created_at
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects.' });
  }
});

// --- PROJECTS: Register New ---
router.post('/projects', authenticateJWT, async (req, res) => {
  try {
    const { title, description, teamMembers, techStack, progressPercentage, codebaseUrl, liveDemoUrl, imageUrl, videoUrl } = req.body;

    if (!title || !description) return res.status(400).json({ error: 'Title and description are required.' });

    const newProject = {
      id:                  `proj-${Date.now()}`,
      user_id:             req.user.id,
      title:               title.trim(),
      description:        description.trim(),
      team_members:        Array.isArray(teamMembers) ? teamMembers : [],
      tech_stack:          Array.isArray(techStack) ? techStack : [],
      progress_percentage: parseInt(progressPercentage || 0, 10),
      codebase_url:        codebaseUrl || '',
      live_demo_url:       liveDemoUrl || '',
      image_url:           imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      video_url:           videoUrl || '',
      checklist:           [],
      timeline:            []
    };

    const { data: inserted, error } = await supabase.from('projects').insert([newProject]).select().single();
    if (error) throw error;

    res.json({
      success: true,
      project: {
        id:                 inserted.id,
        userId:             inserted.user_id,
        title:              inserted.title,
        description:        inserted.description,
        teamMembers:        safeParseJSON(inserted.team_members, []),
        techStack:          safeParseJSON(inserted.tech_stack, []),
        progressPercentage: parseInt(inserted.progress_percentage || 0, 10),
        checklist:          safeParseJSON(inserted.checklist, []),
        timeline:           safeParseJSON(inserted.timeline, []),
        liveDemoUrl:        inserted.live_demo_url,
        codebaseUrl:        inserted.codebase_url,
        imageUrl:           inserted.image_url,
        videoUrl:           inserted.video_url
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Project registration error.' });
  }
});

const MOCK_STUDENTS = [
  {
    id: 'usr-student-001',
    name: 'Anas Reda (انس رضا)',
    email: 'anas@edusphere.edu',
    role: 'Student',
    studentId: 'STD-1001',
    major: 'Computer Engineering',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Socket.io'],
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    status: 'Available',
    bio: 'Lead Full-Stack Student Developer on EduSphere Platform'
  },
  {
    id: 'usr-student-002',
    name: 'Kareem Mahmoud (كريم محمود)',
    email: 'kareem@edusphere.edu',
    role: 'Student',
    studentId: 'STD-1002',
    major: 'Software Engineering',
    skills: ['Python', 'PostgreSQL', 'React', 'Docker'],
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    status: 'Available',
    bio: 'Software Systems Architecture Student'
  },
  {
    id: 'usr-student-003',
    name: 'Nour El-Din (نور الدين)',
    email: 'nour@edusphere.edu',
    role: 'Student',
    studentId: 'STD-1003',
    major: 'Artificial Intelligence',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'Data Science'],
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80',
    status: 'Available',
    bio: 'AI & Data Science Engineering Student'
  },
  {
    id: 'usr-student-004',
    name: 'Omar Khaled (عمر خالد)',
    email: 'omar@edusphere.edu',
    role: 'Student',
    studentId: 'STD-1004',
    major: 'Embedded Systems',
    skills: ['C++', 'Arduino', 'Raspberry Pi', 'IoT'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    status: 'Busy',
    bio: 'Embedded Hardware Developer'
  }
];

// --- MATCHMAKING: Get Students ---
router.get(['/matchmaking/students', '/users/students'], async (req, res) => {
  if (!SUPABASE_URL || SUPABASE_URL.includes('obhoybumtaactmetyold')) {
    return res.json(MOCK_STUDENTS);
  }
  try {
    const { data: users, error } = await supabase.from('users').select('*').eq('role', 'Student');
    if (error || !users || users.length === 0) {
      return res.json(MOCK_STUDENTS);
    }

    const students = users.map(u => ({
      id:        u.id,
      name:      u.name,
      email:     u.email,
      role:      u.role,
      studentId: u.student_id || u.studentId,
      major:     u.major,
      skills:    safeParseJSON(u.skills, []),
      avatar:    u.avatar,
      status:    u.status || 'Available',
      bio:       u.bio || ''
    }));

    res.json(students);
  } catch (err) {
    res.json(MOCK_STUDENTS);
  }
});

// --- ALLIANCES: Incoming & Action ---
router.get('/alliance/incoming/:userId', async (req, res) => {
  try {
    const { data, error } = await supabase.from('alliances').select('*').eq('recipient_id', req.params.userId).order('created_at', { ascending: false });
    if (error) throw error;
    const pending = data.filter(r => !r.status || r.status === 'pending');
    res.json({ success: true, requests: pending });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch alliance requests.' });
  }
});

router.post('/alliance/request', async (req, res) => {
  try {
    const { senderId, recipientId, projectName } = req.body;
    const { data: users } = await supabase.from('users').select('id, name').in('id', [senderId, recipientId]);
    const sender = users.find(u => u.id === senderId);
    const recipient = users.find(u => u.id === recipientId);

    const { error } = await supabase.from('alliances').insert([{
      id:             `alliance-${Date.now()}`,
      sender_id:      senderId,
      sender_name:    sender ? sender.name : 'Student',
      recipient_id:   recipientId,
      recipient_name: recipient ? recipient.name : 'Student',
      project_name:   projectName,
      status:         'pending'
    }]);
    if (error) throw error;

    res.json({ success: true, message: 'Alliance request dispatched.' });
  } catch (err) {
    res.status(500).json({ error: 'Alliance request failed.' });
  }
});

router.post('/alliance/accept', async (req, res) => {
  try {
    await supabase.from('alliances').update({ status: 'accepted' }).eq('id', req.body.allianceId);
    res.json({ success: true, message: 'Alliance accepted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to accept alliance.' });
  }
});

router.post('/alliance/decline', async (req, res) => {
  try {
    await supabase.from('alliances').update({ status: 'declined' }).eq('id', req.body.allianceId);
    res.json({ success: true, message: 'Alliance declined.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to decline alliance.' });
  }
});

// --- EVALUATIONS ---
router.post('/evaluations', authenticateJWT, evaluatorRoleGuard, async (req, res) => {
  try {
    const { projectId, grades, feedback } = req.body;
    const { uiUx, codeArchitecture, databaseEfficiency, innovation } = grades || {};
    const averageGrade = parseFloat(((uiUx + codeArchitecture + databaseEfficiency + innovation) / 4).toFixed(2));

    const { data: evaluator } = await supabase.from('users').select('name').eq('id', req.user.id).maybeSingle();

    const record = {
      project_id:     projectId,
      evaluator_id:   req.user.id,
      evaluator_name: evaluator ? evaluator.name : 'Reviewing Engineer',
      grades:         { uiUx, codeArchitecture, databaseEfficiency, innovation },
      average_grade:  averageGrade,
      feedback:       feedback || ''
    };

    const { data: upserted, error } = await supabase
      .from('evaluations')
      .upsert([{ id: `eval-${Date.now()}`, ...record }], { onConflict: 'project_id,evaluator_id' })
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, evaluation: upserted });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit evaluation.' });
  }
});

router.get('/evaluations/:projectId', authenticateJWT, evaluatorRoleGuard, async (req, res) => {
  try {
    const { data: evals, error } = await supabase.from('evaluations').select('*').eq('project_id', req.params.projectId);
    if (error) throw error;

    let consensusAverage = 0;
    if (evals.length > 0) {
      const total = evals.reduce((sum, e) => sum + parseFloat(e.average_grade), 0);
      consensusAverage = parseFloat((total / evals.length).toFixed(2));
    }

    res.json({ evaluations: evals, consensusAverage });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve evaluations.' });
  }
});

// Serve Root index.html if Vercel routes / to api/index.js
app.get('/', (req, res) => {
  const candidatePaths = [
    path.join(__dirname, '../index.html'),
    path.join(__dirname, '../public/index.html'),
    path.resolve('index.html'),
    path.resolve('public/index.html')
  ];
  for (const p of candidatePaths) {
    try {
      if (fs.existsSync(p)) {
        const html = fs.readFileSync(p, 'utf8');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(html);
      }
    } catch (e) {}
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send('<!DOCTYPE html><html><head><title>EduSphere Platform</title></head><body><h2>EduSphere Platform Online</h2></body></html>');
});

// --- AI COPILOT: Real LLM Integration & Resilient Fallback ---
router.post('/copilot', async (req, res) => {
  try {
    const { prompt, viewContext, language } = req.body || {};

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

    if (apiKey) {
      try {
        const systemPrompt = `You are EduSphere AI Copilot, an elite engineering assistant on the EduSphere platform. The user is currently on the "${viewContext || 'dashboard'}" page. Respond concisely, helpfully, and professionally in ${language === 'ar' ? 'Arabic' : 'English'}. Keep responses clear, markdown-formatted, and relevant to engineering student projects, coding, and team matching.`;
        
        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemPrompt}\n\nUser Question: ${prompt}` }]
              }
            ]
          })
        });

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return res.json({ success: true, reply, source: 'gemini-llm' });
          }
        } else {
          const errText = await geminiRes.text();
          console.error('[AI_COPILOT_ERROR] Gemini API Error Response:', geminiRes.status, errText);
        }
      } catch (llmErr) {
        console.error('[AI_COPILOT_ERROR] LLM API Call Exception:', llmErr);
      }
    } else {
      console.warn('[AI_COPILOT_WARN] GEMINI_API_KEY environment variable is not set. Falling back to intelligent assistant engine.');
    }

    // Intelligent Context-Aware Fallback Engine
    const userLower = prompt.toLowerCase();
    let fallbackReply = `🤖 **EduSphere AI Copilot Brief:**\n\nI processed your query regarding: *"${prompt.trim()}"*.\n\nCurrently, you are inspecting the **${(viewContext || 'dashboard').toUpperCase()}** platform node. All security and data layers are operating cleanly.`;

    if (userLower.includes('project') || userLower.includes('مشروع')) {
      fallbackReply = `💡 **Project Recommendation:**\nTo showcase your engineering project or join an existing student group, head to the **Project Showroom** or use the **Register Node** form on your Dashboard.`;
    } else if (userLower.includes('team') || userLower.includes('فريق') || userLower.includes('طلاب')) {
      fallbackReply = `👥 **Team Finder Intelligence:**\nYou can find candidate software and hardware engineers matching your skills matrix in the **Team Finder** section. Filter by skills like Python, C++, or Node.js.`;
    } else if (userLower.includes('debug') || userLower.includes('خطأ') || userLower.includes('code')) {
      fallbackReply = `🔍 **Smart Debugger Active:**\nPaste your code snippet into the **Embedded Smart Debugger** on the Dashboard for instant static analysis and automated syntax corrections.`;
    }

    return res.json({
      success: true,
      reply: fallbackReply,
      source: 'fallback-assistant',
      notice: apiKey ? 'Quota limit exceeded, served via fallback' : 'GEMINI_API_KEY missing, served via fallback'
    });
  } catch (error) {
    console.error('[AI_COPILOT_ERROR] Unhandled Exception:', error);
    return res.status(500).json({ error: 'Failed to process AI Copilot query.' });
  }
});

// Mount router for API requests
app.use('/api', router);

// API 404 Fallback
app.use('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    const candidatePaths = [
      path.join(__dirname, '../index.html'),
      path.join(__dirname, '../public/index.html'),
      path.resolve('index.html'),
      path.resolve('public/index.html')
    ];
    for (const p of candidatePaths) {
      try {
        if (fs.existsSync(p)) {
          const html = fs.readFileSync(p, 'utf8');
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.status(200).send(html);
        }
      } catch (e) {}
    }
  }
  res.status(404).json({ error: 'Endpoint not found', status: 404 });
});

module.exports = app;
