import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Body recibido:', JSON.stringify(body));
    console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('SERVICE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!.replace(/\/$/, ''),
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { ownerName, ownerPhone, ownerEmail, propertyAddress, propertyCity, referrerName, referrerEmail } = body;

    const { data, error } = await supabase
      .from('referrals')
      .insert([{
        owner_name: ownerName,
        owner_phone: ownerPhone,
        owner_email: ownerEmail || 'no-email@referido.es',
        property_address: propertyAddress,
        property_city: propertyCity || 'Sin especificar',
        estimated_value: 0,
        referrer_name: referrerName,
        referrer_email: referrerEmail,
        status: 'pending',
        commission_status: 'pending',
      }])
      .select('id')
      .single();

    console.log('Supabase error:', JSON.stringify(error));
    console.log('Supabase data:', JSON.stringify(data));

    if (error) throw error;

    return NextResponse.json({ success: true, referralId: data.id }, { status: 201 });
  } catch (error) {
    console.error('Catch error:', JSON.stringify(error));
    return NextResponse.json({ error: 'Error interno del servidor', details: String(error) }, { status: 500 });
  }
}
