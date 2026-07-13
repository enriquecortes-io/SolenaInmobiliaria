import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Rate limiting simple en memoria
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hora

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Inténtalo más tarde.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { nombre, telefono, email, localizacion, tipo, precio, plazo } = body;

    if (!nombre || !telefono || !email) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const { error } = await supabase.from('leads_landing').insert([{
      nombre,
      telefono,
      email,
      localizacion: localizacion || null,
      tipo_propiedad: tipo || null,
      precio_estimado: precio || null,
      plazo_deseado: plazo || null,
      fuente: 'landing',
    }]);

    if (error) throw error;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Solena Leads <noreply@solenainmo.es>',
        to: ['info@solenainmo.es'],
        subject: `Nuevo lead: ${nombre}`,
        html: `
          <h2>Nuevo lead del landing — Solena</h2>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Teléfono:</strong> ${telefono}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Localización:</strong> ${localizacion || '—'}</p>
          <p><strong>Tipo de propiedad:</strong> ${tipo || '—'}</p>
          <p><strong>Precio estimado:</strong> ${precio || '—'}</p>
          <p><strong>Plazo deseado:</strong> ${plazo || '—'}</p>
        `,
      }),
    });

    const resendData = await resendRes.json();
    console.log('Resend response:', JSON.stringify(resendData));

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('leads API error:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
