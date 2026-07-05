import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('id, slug, titulo, precio, habitaciones, banos, m2_construidos, ubicacion, galeria_urls, tipo, zona')
      .eq('activa', true)
      .order('destacada', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) throw error;

    const properties = (data || []).map(p => ({
      id: p.slug || p.id,
      title: p.titulo?.es || p.titulo?.en || '',
      location: p.ubicacion || '',
      price: p.precio || 0,
      bedrooms: p.habitaciones || 0,
      bathrooms: p.banos || 0,
      area: p.m2_construidos || 0,
      image_url: p.galeria_urls?.[0] || '',
      tipo: p.tipo || '',
      zona: p.zona || '',
    }));

    return NextResponse.json({ properties });
  } catch (err) {
    console.error('properties API error:', err);
    return NextResponse.json({ properties: [] }, { status: 500 });
  }
}
