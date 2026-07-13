import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ownerName, ownerPhone, ownerEmail, propertyAddress, propertyCity, referrerName, referrerEmail } = body;

    if (!ownerName || !ownerPhone || !propertyAddress || !referrerName || !referrerEmail) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('referrals')
      .insert([{
        owner_name: ownerName,
        owner_phone: ownerPhone,
        owner_email: ownerEmail || null,
        property_address: propertyAddress,
        property_city: propertyCity || null,
        referrer_name: referrerName,
        referrer_email: referrerEmail,
        status: 'pending',
        commission_status: 'pending',
      }])
      .select('id')
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, referralId: data.id }, { status: 201 });
  } catch (error) {
    console.error('Referral error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
