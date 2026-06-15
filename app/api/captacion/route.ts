import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { Resend } from "resend";

const supabase = getSupabase();

const resend = new Resend(process.env.RESEND_API_KEY);

function sanitize(str: unknown, max = 500): string {
  if (typeof str !== "string") return "";
  return str.replace(/[<>&"']/g, "").slice(0, max).trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = sanitize(body.name, 100);
    const email = sanitize(body.email, 200);
    const phone = sanitize(body.phone, 30);
    const ubicacion = sanitize(body.ubicacion, 200);
    const precio_estimado = sanitize(body.precio_estimado, 100);
    const mensaje = sanitize(body.mensaje, 2000);
    const locale = sanitize(body.locale, 5);

    if (!name || !email || !email.includes("@")) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    await supabase.from("captacion_leads").insert({
      name, email, phone, ubicacion, precio_estimado, mensaje, locale,
      created_at: new Date().toISOString(),
    });

    await resend.emails.send({
      from: "MDLM <onboarding@resend.dev>",
      to: "info@solenainmobiliaria.com",
      subject: `Nueva solicitud de captación — ${ubicacion || "Sin ubicación"}`,
      html: `
        <div style="font-family:'Helvetica Neue',sans-serif;max-width:600px;margin:0 auto;padding:40px;background:#0a0805;color:white;">
          <p style="color:#c9a96e;font-size:11px;letter-spacing:0.5em;text-transform:uppercase;margin:0 0 24px">THE EDIT MARBELLA</p>
          <h1 style="font-size:24px;font-weight:300;color:white;margin:0 0 8px">Nueva Solicitud de Captación</h1>
          <p style="color:rgba(255,255,255,0.5);font-size:14px;margin:0 0 32px">${ubicacion || "Ubicación no especificada"}</p>
          <div style="border-top:1px solid rgba(201,169,110,0.2);padding-top:24px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.3em;width:160px">Nombre</td>
                  <td style="padding:8px 0;color:white;font-size:14px">${name}</td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.3em">Email</td>
                  <td style="padding:8px 0;color:white;font-size:14px">${email}</td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.3em">Teléfono</td>
                  <td style="padding:8px 0;color:white;font-size:14px">${phone}</td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.3em">Ubicación</td>
                  <td style="padding:8px 0;color:#c9a96e;font-size:14px">${ubicacion}</td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.3em">Precio estimado</td>
                  <td style="padding:8px 0;color:#c9a96e;font-size:14px;font-weight:600">${precio_estimado}</td></tr>
              ${mensaje ? `<tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.3em">Mensaje</td>
                  <td style="padding:8px 0;color:white;font-size:14px">${mensaje}</td></tr>` : ""}
            </table>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[captacion]", e instanceof Error ? e.message : "Unknown error");
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
