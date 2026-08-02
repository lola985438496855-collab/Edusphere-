const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://obhoybumtaactmetyold.supabase.co';
const SUPABASE_KEY = 'sb_publishable_nl5PcpNr5gwPZ5M_nbO_Yw__qoB0r8I';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function getStudents() {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      console.error('Error fetching users:', error);
      return;
    }

    console.log('ALL_USERS_START');
    console.log(JSON.stringify(users, null, 2));
    console.log('ALL_USERS_END');
  } catch (err) {
    console.error('Exception:', err);
  }
}

getStudents();
