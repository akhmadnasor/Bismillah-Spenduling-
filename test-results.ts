import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const env = fs.readFileSync('.env', 'utf-8');
const p = (k) => env.split('\n').find(l => l.startsWith(k))?.split('=')[1] || '';
const supabase = createClient(p('VITE_SUPABASE_URL'), p('VITE_SUPABASE_ANON_KEY'));

async function check() {
  const { data, error } = await supabase.from('students').select('*, student_exam_mapping(id, subject_id, exam_date, session, room)');
  console.log("Error students:", error?.message || error);
}

check();
