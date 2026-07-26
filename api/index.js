require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const { createClient } = require('@supabase/supabase-js');
const bcrypt    = require('bcryptjs');
const jwt       = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'edusphere_super_secret_jwt_key_2026';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'edusphere_admin_master_secret_2026';

const app = express();

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
    const { name, email, password, studentId, major } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

    const emailLower = email.toLowerCase().trim();

    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .ilike('email', emailLower)
      .maybeSingle();

    if (existing) return res.status(400).json({ error: 'User with this email already registered.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id:         `usr-${Date.now()}`,
      name:       name || email.split('@')[0],
      email:      emailLower,
      password:   hashedPassword,
      role:       'Student',
      avatar:     'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      status:     'Available',
      bio:        '',
      student_id: studentId || `STD-${Math.floor(1000 + Math.random() * 9000)}`,
      major:      major || 'Computer Engineering',
      skills:     ['HTML5', 'CSS3', 'JavaScript']
    };

    const { data: inserted, error: insertError } = await supabase
      .from('users')
      .insert([newUser])
      .select()
      .single();

    if (insertError) throw insertError;

    const token = jwt.sign(
      { id: inserted.id, email: inserted.email, role: inserted.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id:        inserted.id,
        name:      inserted.name,
        email:     inserted.email,
        role:      inserted.role,
        studentId: inserted.student_id,
        major:     inserted.major,
        skills:    safeParseJSON(inserted.skills, []),
        avatar:    inserted.avatar,
        status:    inserted.status,
        bio:       inserted.bio
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Registration error.' });
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

// --- MATCHMAKING: Get Students ---
router.get('/matchmaking/students', async (req, res) => {
  try {
    const { data: users, error } = await supabase.from('users').select('*').eq('role', 'Student');
    if (error) throw error;

    const students = users.map(u => ({
      id:        u.id,
      name:      u.name,
      email:     u.email,
      role:      u.role,
      studentId: u.student_id,
      major:     u.major,
      skills:    safeParseJSON(u.skills, []),
      avatar:    u.avatar,
      status:    u.status,
      bio:       u.bio
    }));

    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch matchmaking students.' });
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

// Mount router on both /api and / for maximum route matching flexibility
app.use('/api', router);
app.use('/', router);

// --- 404 Fallback ---
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found', status: 404 });
});

module.exports = app;
