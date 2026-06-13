import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch("https://harvis-six.vercel.app/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-agent-key": process.env.AGENT_API_SECRET || "",
      },
      body: JSON.stringify(body),
    });

    const contentType = res.headers.get("content-type") || "";

    // Si es stream de texto
    if (contentType.includes("text/plain")) {
      const text = await res.text();
      return NextResponse.json({ message: text });
    }

    // Si es JSON
    const data = await res.json();
    // Harvis devuelve { success, message } o { error }
    return NextResponse.json({ message: data.message || data.error || "Sin respuesta" });

  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
