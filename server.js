require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// ---- Supabase Client ----
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌  Missing SUPABASE_URL or SUPABASE_KEY in .env file');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ---- Middleware ----
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
//  API ROUTES
// ==========================================

// --- AUTH: Login ---
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

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
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, wantsEvaluator, engineerCode, studentId, major } = req.body;

    // Check duplicate email
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .ilike('email', email.trim())
      .maybeSingle();

    if (existing) {
      return res.status(400).json({ error: 'User with this email already registered.' });
    }

    let assignedRole = 'Student';
    if (wantsEvaluator) {
      if (engineerCode && engineerCode.trim() === 'admin@123') {
        assignedRole = 'Evaluator';
      } else {
        return res.status(403).json({ error: 'Unauthorized Access Code / كود التحقق غير صحيح' });
      }
    }

    const newUser = {
      id:       `usr-${Date.now()}`,
      name:     name || email.split('@')[0],
      email:    email.toLowerCase().trim(),
      password,
      role:     assignedRole,
      avatar:   assignedRole === 'Evaluator'
        ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      status:   'Available',
      bio:      assignedRole === 'Evaluator' ? 'Academic Reviewing Engineer Node' : '',
      student_id: assignedRole === 'Student' ? (studentId || `STD-${Math.floor(1000 + Math.random() * 9000)}`) : null,
      major:      assignedRole === 'Student' ? (major || 'Computer Engineering') : null,
      skills:     assignedRole === 'Student' ? ['HTML5', 'CSS3', 'JavaScript'] : []
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
app.put('/api/users/update', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    if (!userId) return res.status(401).json({ error: 'Unauthorized session identifier.' });

    const { name, bio, status, skills } = req.body;

    const updates = {};
    if (name)             updates.name   = name;
    if (bio !== undefined) updates.bio   = bio;
    if (status)           updates.status = status;
    if (skills !== undefined) {
      updates.skills = Array.isArray(skills)
        ? skills
        : skills.split(',').map(s => s.trim()).filter(s => s.length > 0);
    }

    const { data: updated, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error || !updated) {
      return res.status(404).json({ error: 'User node not found.' });
    }

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

    // Map snake_case DB fields to camelCase for frontend compatibility
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
      videoUrl:           p.video_url
    }));

    res.json(projects);
  } catch (err) {
    console.error('Get projects error:', err);
    res.status(500).json({ error: 'Failed to retrieve showroom projects.' });
  }
});

// --- PROJECTS: Create ---
app.post('/api/projects', async (req, res) => {
  try {
    const { title, description, teamMembers, techStack, liveDemoUrl, codebaseUrl, imageUrl, videoUrl } = req.body;

    const newProject = {
      id:                  `proj-${Date.now()}`,
      title,
      description,
      team_members:        teamMembers || [],
      tech_stack:          techStack || [],
      progress_percentage: 0,
      checklist: [
        { id: 1, text: "Establish layout design principles / تأسيس واجهة وتصميم النظام", checked: false },
        { id: 2, text: "Build relational database schema elements / بناء جداول وقاعدة البيانات", checked: false },
        { id: 3, text: "Complete responsive system components / إنجاز وتطوير النظام المتجاوب", checked: false },
        { id: 4, text: "Conduct system testing operations / إجراء اختبار ومعايرة للنظام", checked: false }
      ],
      timeline: [
        { phase: "Idea Conception", description: "Design conceptual flows and schematics", completed: true, date: new Date().toISOString().split('T')[0] },
        { phase: "Database & Backend Design", description: "Establishing schemas and routing maps", completed: false, date: "" },
        { phase: "Hardware & UI Integration", description: "Connecting features and layouts", completed: false, date: "" },
        { phase: "Deployment & Calibration", description: "Publishing final platform links", completed: false, date: "" }
      ],
      live_demo_url:  liveDemoUrl  || '',
      codebase_url:   codebaseUrl  || '',
      image_url:      imageUrl     || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
      video_url:      videoUrl     || 'https://www.w3schools.com/html/mov_bbb.mp4'
    };

    const { data: inserted, error } = await supabase
      .from('projects')
      .insert([newProject])
      .select()
      .single();

    if (error) throw error;

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

// --- PROJECTS: Update Checklist ---
app.patch('/api/projects/:id/checklist', async (req, res) => {
  try {
    const { itemId, checked } = req.body;
    const projectId = req.params.id;

    // Fetch current project
    const { data: project, error: fetchError } = await supabase
      .from('projects')
      .select('checklist, progress_percentage')
      .eq('id', projectId)
      .single();

    if (fetchError || !project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    // Update the specific checklist item
    const updatedChecklist = project.checklist.map(item =>
      item.id === parseInt(itemId) ? { ...item, checked } : item
    );

    // Recalculate progress
    const checkedCount = updatedChecklist.filter(i => i.checked).length;
    const progressPercentage = Math.round((checkedCount / updatedChecklist.length) * 100);

    const { error: updateError } = await supabase
      .from('projects')
      .update({ checklist: updatedChecklist, progress_percentage: progressPercentage })
      .eq('id', projectId);

    if (updateError) throw updateError;

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

    // Verify both users exist
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

    // Mark recipient as Busy
    await supabase
      .from('users')
      .update({ status: 'Busy' })
      .eq('id', recipientId);

    res.json({ success: true, message: 'Alliance Request successfully dispatched.' });
  } catch (err) {
    console.error('Alliance error:', err);
    res.status(500).json({ error: 'Alliance dispatch failure.' });
  }
});

// --- EVALUATIONS: Submit Grade ---
app.post('/api/evaluations', async (req, res) => {
  try {
    const userRole = req.headers['x-user-role'];
    const userId   = req.headers['x-user-id'];

    if (userRole !== 'Evaluator' && userRole !== 'Engineer') {
      return res.status(403).json({ error: 'Forbidden: Access Denied. Only Evaluators and reviewing Engineers can submit grades.' });
    }

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

    // Fetch evaluator name
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

    // Upsert: update if this evaluator already graded this project
    const { data: upserted, error: upsertError } = await supabase
      .from('evaluations')
      .upsert([{ id: `eval-${Date.now()}`, ...record }], {
        onConflict: 'project_id,evaluator_id'
      })
      .select()
      .single();

    if (upsertError) throw upsertError;

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
app.get('/api/evaluations/:projectId', async (req, res) => {
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

    // Map DB fields back to camelCase
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
  app.listen(PORT, () => {
    console.log(`===========================================================`);
    console.log(` EduSphere Server online → http://localhost:${PORT}`);
    console.log(` Database: Supabase PostgreSQL`);
    console.log(` Project : ${SUPABASE_URL}`);
    console.log(`===========================================================`);
  });
}

module.exports = app;
