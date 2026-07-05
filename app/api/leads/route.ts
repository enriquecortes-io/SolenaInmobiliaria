import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
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

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('leads API error:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
