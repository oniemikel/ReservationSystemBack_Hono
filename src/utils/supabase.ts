import { createClient } from "@supabase/supabase-js";

// Supabaseクライアント
// ✏️ 編集不要: 接続情報は .env の SUPABASE_URL / SUPABASE_SECRET_KEY で管理
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

export const BUCKET = process.env.SUPABASE_BUCKET || "images";
