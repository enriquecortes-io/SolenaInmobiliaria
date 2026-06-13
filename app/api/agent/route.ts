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
   const data = await res.json();
   return NextResponse.json(data);
 } catch (e: any) {
   return NextResponse.json({ error: e.message }, { status: 500 });
 }
}
