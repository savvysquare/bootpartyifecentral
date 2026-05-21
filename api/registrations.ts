import { createClient } from '@supabase/supabase-js';

const MEMBERS_PASSWORD = "sterces";

// These are public/publishable credentials — safe to embed server-side.
// A SELECT RLS policy allows the anon key to read. The password above
// is the access control gate for this endpoint.
const SUPABASE_URL = "https://aspxddecqqosyyaxflcf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzcHhkZGVjcXFvc3l5YXhmbGNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzNjUxNDEsImV4cCI6MjA5NDk0MTE0MX0.aFkVnKVih_jBtsrYs0yTF5SkvcX01AjY1IFpxXc3g0U";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body || {};
  
  if (password !== MEMBERS_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    });

    const { data: rows, error } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return res.status(200).json({ rows: rows ?? [] });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
