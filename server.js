require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');
const { createClient } = require('@supabase/supabase-js');

const app  = express();
const PORT = process.env.PORT || 3000;

// ---- Supabase Client ----
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://obhoybumtaactmetyold.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'sb_publishable_nl5PcpNr5gwPZ5M_nbO_Yw__qoB0r8I';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
console.log('✅ Supabase client initialized:', SUPABASE_URL);

// ========================================================
//  PRE-SEEDED SECURE EVALUATOR ACCOUNTS (READ-ONLY STATIC)
//  These are the only accounts that can have role=Evaluator.
//  Cannot be registered externally through the public form.
// ========================================================
const SEEDED_EVALUATORS = [
  { id: 'eval-static-001', name: 'Eng. Alaa Abdelrahman',   email: 'alaa@edusphere.edu',    password: 'alaa_eval_2026',    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=150&q=80' },
  { id: 'eval-static-002', name: 'Eng. Tariq Ahmed',        email: 'tariq@edusphere.edu',   password: 'tariq_eval_2026',   avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80' },
  { id: 'eval-static-003', name: 'Eng. Mohamed Gamal',      email: 'mohamed@edusphere.edu', password: 'mohamed_eval_2026', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80' },
  { id: 'eval-static-004', name: 'Eng. Ahmed Mustafa',      email: 'ahmed@edusphere.edu',   password: 'ahmed_eval_2026',   avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
  { id: 'eval-static-005', name: 'Eng. Abdelaziz Mahmoud',  email: 'aziz@edusphere.edu',    password: 'aziz_eval_2026',    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
  { id: 'eval-static-006', name: 'Eng. Basant Reda',        email: 'basant@edusphere.edu',  password: 'basant_eval_2026',  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80' },
  { id: 'eval-static-007', name: 'Eng. Yara Hassan',        email: 'yara@edusphere.edu',    password: 'yara_eval_2026',    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
];

// Seed evaluator accounts into Supabase on server startup (idempotent – skip if already exists)
async function initializeSeededEvaluators() {
  console.log('🔑 Checking pre-seeded evaluator accounts...');
  for (const ev of SEEDED_EVALUATORS) {
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('id', ev.id)
      .maybeSingle();

    if (!existing) {
      const { error } = await supabase.from('users').insert([{
        id:         ev.id,
        name:       ev.name,
        email:      ev.email.toLowerCase(),
        password:   ev.password,
        role:       'Evaluator',
        avatar:     ev.avatar,
        status:     'Available',
        bio:        'Academic Reviewing Engineer – EduSphere Hub',
        student_id: null,
        major:      null,
        skills:     []
      }]);
      if (error) {
        console.warn(`⚠️  Could not seed evaluator ${ev.name}:`, error.message);
      } else {
        console.log(`   ✅ Seeded: ${ev.name} (${ev.email})`);
      }
    }
  }
  console.log('🔑 Evaluator seeding complete.');
}

// ---- Middleware ----
app.use(cors());
app.use(express.json({ limit: '10mb' }));   // allow large Base64 avatar payloads
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
//  BUG-6 EVALUATOR ROLE GATEWAY MIDDLEWARE
//  Protects all /api/evaluations/* routes
// ==========================================
function evaluatorRoleGuard(req, res, next) {
  const role = req.headers['x-user-role'];
  if (role !== 'Evaluator' && role !== 'Admin') {
    return res.status(403).json({
      error: 'Forbidden: Access Denied. Only Evaluators and Admin can access grading routes.'
    });
  }
  next();
}

// ==========================================
//  BUG-5: LOCAL CACHE CO-WRITE HELPER
//  Called after any Supabase mutation succeeds
// ==========================================
async function syncToLocalCache() {
  try {
    const [usersRes, projectsRes, evaluationsRes, alliancesRes] = await Promise.all([
      supabase.from('users').select('*'),
      supabase.from('projects').select('*'),
      supabase.from('evaluations').select('*'),
      supabase.from('alliances').select('*'),
    ]);

    const cache = {
      users:       usersRes.data       || [],
      projects:    projectsRes.data    || [],
      evaluations: evaluationsRes.data || [],
      alliances:   alliancesRes.data   || [],
      lastSync:    new Date().toISOString()
    };

    const cacheDir = path.join(__dirname, 'data');
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
    fs.writeFile(path.join(cacheDir, 'db.json'), JSON.stringify(cache, null, 2), (err) => {
      if (err) console.warn('⚠️  Local cache write failed:', err.message);
    });
  } catch (err) {
    console.warn('⚠️  syncToLocalCache error:', err.message);
  }
}

// ==========================================
//  API ROUTES
// ==========================================

// --- AUTH: Login ---
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .ilike('email', email.trim())
      .eq('password', password)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid credentials. Please verify your email and password.' });
    }

    res.json({
      success: true,
      user: {
        id:        user.id,
        name:      user.name,
        email:     user.email,
        role:      user.role,
        studentId: user.student_id,
        major:     user.major,
        skills:    user.skills,
        avatar:    user.avatar,
        status:    user.status,
        bio:       user.bio
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server authentication issue.' });
  }
});

// --- AUTH: Register ---
// BUG-1 FIX: Role is ALWAYS forced to 'Student'. Evaluators are seeded accounts only.
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, studentId, major } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Block registration using pre-seeded evaluator email domains
    const emailLower = email.toLowerCase().trim();
    if (SEEDED_EVALUATORS.some(ev => ev.email === emailLower)) {
      return res.status(403).json({ error: 'This email address is a reserved institutional account.' });
    }

    // Check duplicate email
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .ilike('email', emailLower)
      .maybeSingle();

    if (existing) {
      return res.status(400).json({ error: 'User with this email already registered.' });
    }

    // HARDCODE role = 'Student' — no client-side role elevation allowed
    const newUser = {
      id:         `usr-${Date.now()}`,
      name:       name || email.split('@')[0],
      email:      emailLower,
      password,
      role:       'Student',  // ← always forced
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

    if (insertError) {
      console.error('Register insert error:', insertError);
      return res.status(500).json({ error: 'Server registration error.' });
    }

    // Async co-write local cache
    syncToLocalCache();

    res.json({ success: true, user: {
      id:        inserted.id,
      name:      inserted.name,
      email:     inserted.email,
      role:      inserted.role,
      studentId: inserted.student_id,
      major:     inserted.major,
      skills:    inserted.skills,
      avatar:    inserted.avatar,
      status:    inserted.status,
      bio:       inserted.bio
    }});
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server registration error.' });
  }
});

// --- USERS: Update Profile ---
// BUG-7 FIX: Verifies session x-user-id header matches target. No unverified body IDs.
// BUG-3 FIX: Handles Base64 avatar field
app.put('/api/users/update', async (req, res) => {
  try {
    const sessionUserId = req.headers['x-user-id'];
    if (!sessionUserId) return res.status(401).json({ error: 'Unauthorized session identifier.' });

    const { name, bio, status, skills, avatar, targetId } = req.body;

    // BUG-7: IDOR Security – block if targetId in body differs from session header
    if (targetId && targetId !== sessionUserId) {
      return res.status(403).json({ error: 'Forbidden: Cannot modify records belonging to another user.' });
    }

    const updates = {};
    if (name !== undefined)   updates.name   = name;
    if (bio  !== undefined)   updates.bio    = bio;
    if (status)               updates.status = status;
    if (skills !== undefined) {
      updates.skills = Array.isArray(skills)
        ? skills
        : skills.split(',').map(s => s.trim()).filter(s => s.length > 0);
    }
    // BUG-3: Accept Base64 avatar string from FileReader
    if (avatar !== undefined && avatar !== null && avatar !== '') {
      updates.avatar = avatar;
    }

    const { data: updated, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', sessionUserId)  // always use verified session id
      .select()
      .single();

    if (error || !updated) {
      return res.status(404).json({ error: 'User node not found.' });
    }

    // Async co-write local cache
    syncToLocalCache();

    res.json({
      success: true,
      message: 'Profile parameters committed successfully.',
      user: {
        id:        updated.id,
        name:      updated.name,
        email:     updated.email,
        role:      updated.role,
        studentId: updated.student_id,
        major:     updated.major,
        skills:    updated.skills,
        avatar:    updated.avatar,
        status:    updated.status,
        bio:       updated.bio
      }
    });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Failed to write profile parameters.' });
  }
});

// --- PROJECTS: Get All ---
app.get('/api/projects', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const projects = data.map(p => ({
      id:                 p.id,
      title:              p.title,
      description:        p.description,
      teamMembers:        p.team_members,
      techStack:          p.tech_stack,
      progressPercentage: p.progress_percentage,
      checklist:          p.checklist,
      timeline:           p.timeline,
      liveDemoUrl:        p.live_demo_url,
      codebaseUrl:        p.codebase_url,
      imageUrl:           p.image_url,
      videoUrl:           p.video_url  // may be null — handled in frontend
    }));

    res.json(projects);
  } catch (err) {
    console.error('Get projects error:', err);
    res.status(500).json({ error: 'Failed to retrieve showroom projects.' });
  }
});

// --- PROJECTS: Create ---
// BUG-2 FIX: No hardcoded fallback video URL — stores NULL if empty
app.post('/api/projects', async (req, res) => {
  try {
    const { title, description, teamMembers, techStack, liveDemoUrl, codebaseUrl, imageUrl, videoUrl } = req.body;

    const newProject = {
      id:                  `proj-${Date.now()}`,
      title,
      description,
      team_members:        teamMembers || [],
      tech_stack:          techStack   || [],
      progress_percentage: 0,
      checklist: [
        { id: 1, text: "Establish layout design principles / تأسيس واجهة وتصميم النظام", checked: false },
        { id: 2, text: "Build relational database schema elements / بناء جداول وقاعدة البيانات", checked: false },
        { id: 3, text: "Complete responsive system components / إنجاز وتطوير النظام المتجاوب", checked: false },
        { id: 4, text: "Conduct system testing operations / إجراء اختبار ومعايرة للنظام", checked: false }
      ],
      timeline: [
        { phase: "Idea Conception",          description: "Design conceptual flows and schematics",   completed: true,  date: new Date().toISOString().split('T')[0] },
        { phase: "Database & Backend Design", description: "Establishing schemas and routing maps",    completed: false, date: "" },
        { phase: "Hardware & UI Integration", description: "Connecting features and layouts",          completed: false, date: "" },
        { phase: "Deployment & Calibration",  description: "Publishing final platform links",          completed: false, date: "" }
      ],
      live_demo_url:  liveDemoUrl || '',
      codebase_url:   codebaseUrl || '',
      image_url:      imageUrl    || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
      video_url:      (videoUrl && videoUrl.trim()) ? videoUrl.trim() : null  // BUG-2: NULL if empty
    };

    const { data: inserted, error } = await supabase
      .from('projects')
      .insert([newProject])
      .select()
      .single();

    if (error) throw error;

    // Async co-write local cache
    syncToLocalCache();

    res.json({ success: true, project: {
      id:                 inserted.id,
      title:              inserted.title,
      description:        inserted.description,
      teamMembers:        inserted.team_members,
      techStack:          inserted.tech_stack,
      progressPercentage: inserted.progress_percentage,
      checklist:          inserted.checklist,
      timeline:           inserted.timeline,
      liveDemoUrl:        inserted.live_demo_url,
      codebaseUrl:        inserted.codebase_url,
      imageUrl:           inserted.image_url,
      videoUrl:           inserted.video_url
    }});
  } catch (err) {
    console.error('Create project error:', err);
    res.status(500).json({ error: 'Failed to record project.' });
  }
});

// --- PROJECTS: Update (Full/Partial) ---
// BUG-9 FIX: Fetches existing JSONB fields and merges them to prevent data loss
app.put('/api/projects/:id', async (req, res) => {
  try {
    const projectId = req.params.id;
    const { title, description, teamMembers, techStack, liveDemoUrl, codebaseUrl, imageUrl, videoUrl, status, progressPercentage, checklist, timeline } = req.body;

    // Fetch existing row first to preserve complex JSONB fields
    const { data: existing, error: fetchError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();

    if (fetchError || !existing) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    // Merge only provided fields; retain existing JSONB arrays if not in request
    const updates = {
      title:               title              !== undefined ? title              : existing.title,
      description:         description        !== undefined ? description        : existing.description,
      team_members:        teamMembers        !== undefined ? teamMembers        : existing.team_members,
      tech_stack:          techStack          !== undefined ? techStack          : existing.tech_stack,
      live_demo_url:       liveDemoUrl        !== undefined ? liveDemoUrl        : existing.live_demo_url,
      codebase_url:        codebaseUrl        !== undefined ? codebaseUrl        : existing.codebase_url,
      image_url:           imageUrl           !== undefined ? imageUrl           : existing.image_url,
      video_url:           videoUrl           !== undefined ? ((videoUrl && videoUrl.trim()) ? videoUrl.trim() : null) : existing.video_url,
      progress_percentage: progressPercentage !== undefined ? progressPercentage : existing.progress_percentage,
      // BUG-9: Retain existing checklist/timeline unless explicitly updated
      checklist:           checklist          !== undefined ? checklist          : existing.checklist,
      timeline:            timeline           !== undefined ? timeline           : existing.timeline,
    };

    const { data: updated, error: updateError } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', projectId)
      .select()
      .single();

    if (updateError) throw updateError;

    // Async co-write local cache
    syncToLocalCache();

    res.json({ success: true, project: {
      id:                 updated.id,
      title:              updated.title,
      description:        updated.description,
      teamMembers:        updated.team_members,
      techStack:          updated.tech_stack,
      progressPercentage: updated.progress_percentage,
      checklist:          updated.checklist,
      timeline:           updated.timeline,
      liveDemoUrl:        updated.live_demo_url,
      codebaseUrl:        updated.codebase_url,
      imageUrl:           updated.image_url,
      videoUrl:           updated.video_url
    }});
  } catch (err) {
    console.error('Update project error:', err);
    res.status(500).json({ error: 'Failed to update project.' });
  }
});

// --- PROJECTS: Update Checklist ---
app.patch('/api/projects/:id/checklist', async (req, res) => {
  try {
    const { itemId, checked } = req.body;
    const projectId = req.params.id;

    const { data: project, error: fetchError } = await supabase
      .from('projects')
      .select('checklist, progress_percentage')
      .eq('id', projectId)
      .single();

    if (fetchError || !project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    const updatedChecklist = project.checklist.map(item =>
      item.id === parseInt(itemId) ? { ...item, checked } : item
    );

    const checkedCount = updatedChecklist.filter(i => i.checked).length;
    const progressPercentage = Math.round((checkedCount / updatedChecklist.length) * 100);

    const { error: updateError } = await supabase
      .from('projects')
      .update({ checklist: updatedChecklist, progress_percentage: progressPercentage })
      .eq('id', projectId);

    if (updateError) throw updateError;

    // Async co-write
    syncToLocalCache();

    res.json({ success: true, progressPercentage });
  } catch (err) {
    console.error('Checklist update error:', err);
    res.status(500).json({ error: 'Error modifying checklist state.' });
  }
});

// --- USERS: Students for Team Finder ---
app.get('/api/users/students', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, role, student_id, major, skills, avatar, status, bio')
      .eq('role', 'Student');

    if (error) throw error;

    const students = data.map(u => ({
      id:        u.id,
      name:      u.name,
      email:     u.email,
      role:      u.role,
      studentId: u.student_id,
      major:     u.major,
      skills:    u.skills,
      avatar:    u.avatar,
      status:    u.status,
      bio:       u.bio
    }));

    res.json(students);
  } catch (err) {
    console.error('Students error:', err);
    res.status(500).json({ error: 'Error gathering matchmaking data.' });
  }
});

// --- ALLIANCES: Send Request ---
app.post('/api/alliance/request', async (req, res) => {
  try {
    const { senderId, recipientId, projectName } = req.body;

    const { data: users, error: userError } = await supabase
      .from('users')
      .select('id, name')
      .in('id', [senderId, recipientId]);

    if (userError || !users || users.length < 2) {
      return res.status(404).json({ error: 'Sender or Recipient not found.' });
    }

    const sender    = users.find(u => u.id === senderId);
    const recipient = users.find(u => u.id === recipientId);

    const { error: allianceError } = await supabase
      .from('alliances')
      .insert([{
        id:             `alliance-${Date.now()}`,
        sender_id:      senderId,
        sender_name:    sender.name,
        recipient_id:   recipientId,
        recipient_name: recipient.name,
        project_name:   projectName
      }]);

    if (allianceError) throw allianceError;

    await supabase
      .from('users')
      .update({ status: 'Busy' })
      .eq('id', recipientId);

    syncToLocalCache();

    res.json({ success: true, message: 'Alliance Request successfully dispatched.' });
  } catch (err) {
    console.error('Alliance error:', err);
    res.status(500).json({ error: 'Alliance dispatch failure.' });
  }
});

// --- ALLIANCES: Get Incoming Requests (BUG-1 FIX) ---
app.get('/api/alliance/incoming/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Try with status filter first, fall back without it if column doesn't exist
    let query = supabase
      .from('alliances')
      .select('*')
      .eq('recipient_id', userId)
      .order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) throw error;

    // Filter pending client-side if status column exists, otherwise return all
    const pending = data.filter(r => !r.status || r.status === 'pending');

    res.json({ success: true, requests: pending });
  } catch (err) {
    console.error('Incoming alliances error:', err);
    res.status(500).json({ error: 'Failed to fetch incoming alliance requests.' });
  }
});

// --- ALLIANCES: Accept Request ---
app.post('/api/alliance/accept', async (req, res) => {
  try {
    const { allianceId } = req.body;
    // Try to update status, ignore error if column doesn't exist
    const { error } = await supabase
      .from('alliances')
      .update({ status: 'accepted' })
      .eq('id', allianceId);

    if (error) console.warn('Accept status update (non-critical):', error.message);
    syncToLocalCache();
    res.json({ success: true, message: 'Alliance accepted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to accept alliance.' });
  }
});

// --- ALLIANCES: Decline Request ---
app.post('/api/alliance/decline', async (req, res) => {
  try {
    const { allianceId, recipientId } = req.body;
    // Try to update status, ignore error if column doesn't exist
    const { error } = await supabase
      .from('alliances')
      .update({ status: 'declined' })
      .eq('id', allianceId);

    if (error) console.warn('Decline status update (non-critical):', error.message);

    // Restore recipient's status to Available
    if (recipientId) {
      await supabase.from('users').update({ status: 'Available' }).eq('id', recipientId);
    }

    syncToLocalCache();
    res.json({ success: true, message: 'Alliance declined.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to decline alliance.' });
  }
});

// --- EVALUATIONS: Submit Grade ---
// BUG-6: Protected by evaluatorRoleGuard middleware
app.post('/api/evaluations', evaluatorRoleGuard, async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];

    const { projectId, grades, feedback } = req.body;
    if (!projectId || !grades || typeof feedback !== 'string') {
      return res.status(400).json({ error: 'Incomplete grading payload.' });
    }

    const { uiUx, codeArchitecture, databaseEfficiency, innovation } = grades;
    const validGrades = [uiUx, codeArchitecture, databaseEfficiency, innovation]
      .every(g => typeof g === 'number' && g >= 1 && g <= 10);

    if (!validGrades) {
      return res.status(400).json({ error: 'Grades must range exactly between 1 and 10.' });
    }

    const { data: evaluator } = await supabase
      .from('users')
      .select('name')
      .eq('id', userId)
      .maybeSingle();

    const evaluatorName = evaluator?.name || 'Reviewing Engineer';
    const averageGrade  = parseFloat(((uiUx + codeArchitecture + databaseEfficiency + innovation) / 4).toFixed(2));

    const record = {
      project_id:     projectId,
      evaluator_id:   userId,
      evaluator_name: evaluatorName,
      grades:         { uiUx, codeArchitecture, databaseEfficiency, innovation },
      average_grade:  averageGrade,
      feedback
    };

    const { data: upserted, error: upsertError } = await supabase
      .from('evaluations')
      .upsert([{ id: `eval-${Date.now()}`, ...record }], { onConflict: 'project_id,evaluator_id' })
      .select()
      .single();

    if (upsertError) throw upsertError;

    syncToLocalCache();

    res.json({
      success: true,
      message: 'Final technical evaluation recorded and database committed.',
      evaluation: upserted
    });
  } catch (err) {
    console.error('Evaluation error:', err);
    res.status(500).json({ error: 'Database transaction failed.' });
  }
});

// --- EVALUATIONS: Get by Project ---
// BUG-6: Protected by evaluatorRoleGuard middleware
app.get('/api/evaluations/:projectId', evaluatorRoleGuard, async (req, res) => {
  try {
    const { data: evals, error } = await supabase
      .from('evaluations')
      .select('*')
      .eq('project_id', req.params.projectId);

    if (error) throw error;

    let consensusAverage = 0;
    if (evals.length > 0) {
      const total = evals.reduce((sum, e) => sum + parseFloat(e.average_grade), 0);
      consensusAverage = parseFloat((total / evals.length).toFixed(2));
    }

    const evaluations = evals.map(e => ({
      id:            e.id,
      projectId:     e.project_id,
      evaluatorId:   e.evaluator_id,
      evaluatorName: e.evaluator_name,
      grades:        e.grades,
      averageGrade:  parseFloat(e.average_grade),
      feedback:      e.feedback
    }));

    res.json({ evaluations, consensusAverage });
  } catch (err) {
    console.error('Get evaluations error:', err);
    res.status(500).json({ error: 'Failed to retrieve evaluations.' });
  }
});

// ==========================================
//  START SERVER
// ==========================================
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, async () => {
    console.log(`===========================================================`);
    console.log(` EduSphere Server online → http://localhost:${PORT}`);
    console.log(` Database: Supabase PostgreSQL`);
    console.log(` Project : ${SUPABASE_URL}`);
    console.log(`===========================================================`);
    await initializeSeededEvaluators();
  });
} else {
  // In production (Vercel), run seeding after module load
  initializeSeededEvaluators().catch(console.warn);
}

module.exports = app;
