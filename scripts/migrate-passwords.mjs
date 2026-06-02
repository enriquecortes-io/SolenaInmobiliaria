import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const { data: users } = await supabase.from("admin_users").select("id, password");

for (const user of users) {
  if (user.password.startsWith("$2b$")) {
    console.log(`⏭️  Usuario ${user.id} ya tiene hash, saltando`);
    continue;
  }
  const hash = await bcrypt.hash(user.password, 12);
  await supabase.from("admin_users").update({ password: hash }).eq("id", user.id);
  console.log(`✅ Usuario ${user.id} migrado`);
}
console.log("🎉 Migración completa");
