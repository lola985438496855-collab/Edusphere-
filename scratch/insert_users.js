const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://obhoybumtaactmetyold.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'sb_publishable_nl5PcpNr5gwPZ5M_nbO_Yw__qoB0r8I';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  console.log('Inserting default users into Supabase...');

  // 1. Evaluator Admin Account
  const adminUser = {
    id: 'usr-admin',
    name: 'Admin Engineer',
    email: 'admin@edusphere.com',
    password: 'admin123',
    role: 'Evaluator',
    status: 'Available',
    bio: 'Academic Reviewing Engineer Node',
    skills: []
  };

  // 2. Student Account
  const studentUser = {
    id: 'usr-student',
    name: 'Student Node',
    email: 'student@edusphere.com',
    password: 'student123',
    role: 'Student',
    status: 'Available',
    bio: 'Tech Student Node',
    student_id: 'STD-9999',
    major: 'Computer Engineering',
    skills: ['HTML5', 'CSS3', 'JavaScript']
  };

  const { error: adminErr } = await supabase.from('users').upsert([adminUser]);
  if (adminErr) {
    console.error('Failed to insert Admin User:', adminErr.message);
  } else {
    console.log('✅ Admin User inserted successfully.');
  }

  const { error: studentErr } = await supabase.from('users').upsert([studentUser]);
  if (studentErr) {
    console.error('Failed to insert Student User:', studentErr.message);
  } else {
    console.log('✅ Student User inserted successfully.');
  }
}

run();
