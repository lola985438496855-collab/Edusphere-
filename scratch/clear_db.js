const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://obhoybumtaactmetyold.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'sb_publishable_nl5PcpNr5gwPZ5M_nbO_Yw__qoB0r8I';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function clearAll() {
  console.log('🗑️ Clearing all tables...');

  const { error: e1 } = await supabase.from('alliances').delete().neq('id', '___none___');
  console.log(e1 ? '❌ alliances: ' + e1.message : '✅ alliances cleared');

  const { error: e2 } = await supabase.from('evaluations').delete().neq('id', '___none___');
  console.log(e2 ? '❌ evaluations: ' + e2.message : '✅ evaluations cleared');

  const { error: e3 } = await supabase.from('projects').delete().neq('id', '___none___');
  console.log(e3 ? '❌ projects: ' + e3.message : '✅ projects cleared');

  const { error: e4 } = await supabase.from('users').delete().neq('id', '___none___');
  console.log(e4 ? '❌ users: ' + e4.message : '✅ users cleared');

  console.log('\n✅ Done! Database is now empty.');
}

clearAll();
