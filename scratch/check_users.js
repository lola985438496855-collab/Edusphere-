const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://obhoybumtaactmetyold.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'sb_publishable_nl5PcpNr5gwPZ5M_nbO_Yw__qoB0r8I';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  const { data, error } = await supabase.from('users').select('*');
  if (error) {
    console.error('Error fetching users:', error.message);
  } else {
    console.log('Users in database:', data);
  }
}

run();
