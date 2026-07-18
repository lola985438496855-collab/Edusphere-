const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://obhoybumtaactmetyold.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'sb_publishable_nl5PcpNr5gwPZ5M_nbO_Yw__qoB0r8I';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  const email = 'mohmed@gmail.com';
  const password = 'mohmed';

  console.log(`Testing login for email: "${email}" and password: "${password}"`);
  
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .ilike('email', email.trim())
    .eq('password', password)
    .single();

  if (error) {
    console.error('Login query error:', error);
  } else {
    console.log('Login query result (User found):', user);
  }
}

run();
