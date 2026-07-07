import { NextResponse } from "next/server";

const USERS = [
  {
    username: "enrique",
    password: process.env.SOLENA_ADMIN_PASSWORD || "solena2024",
    name: "Enrique",
    role: "Admin",
  },
];

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const user = USERS.find(u => u.username === username && u.password === password);
    if (user) {
      return NextResponse.json({ ok: true, user: { name: user.name, role: user.role } });
    }
    return NextResponse.json({ ok: false }, { status: 401 });
  } catch {
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
