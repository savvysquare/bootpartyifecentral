import { createClient } from '@supabase/supabase-js';

const MEMBERS_PASSWORD = "sterces";

// These are public/publishable credentials — safe to embed server-side.
// A SELECT RLS policy allows the anon key to read. The password above
// is the access control gate for this endpoint.
const SUPABASE_URL = "https://aspxddecqqosyyaxflcf.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body || {};
  
  if (password !== MEMBERS_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY!, {
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
