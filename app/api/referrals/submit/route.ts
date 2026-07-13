import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ownerName, ownerPhone, ownerEmail, propertyAddress, propertyCity, referrerName, referrerEmail } = body;

    if (!ownerName || !ownerPhone || !propertyAddress || !referrerName || !referrerEmail) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!.replace(/\/$/, ''),
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

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

    if (error) throw error;

    // Email a Solena
    await resend.emails.send({
      from: 'Solena Referidos <info@solenainmo.es>',
      to: 'info@solenainmo.es',
      subject: `Nuevo referido: ${ownerName} — ${propertyCity || 'Sin ciudad'}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2A1A10;">
          <div style="background: #1A0E08; padding: 24px; text-align: center;">
            <h1 style="color: #C9A96E; font-size: 24px; margin: 0; letter-spacing: 4px;">SOLENA</h1>
            <p style="color: rgba(201,169,110,0.6); font-size: 11px; letter-spacing: 3px; margin: 4px 0 0; text-transform: uppercase;">Nuevo Referido</p>
          </div>
          <div style="background: #F5F0E8; padding: 40px 32px;">
            <h2 style="font-size: 22px; margin: 0 0 24px; color: #2A1A10;">Datos del propietario</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(107,63,42,.15); color: #6A4E3E; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">Nombre</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(107,63,42,.15); font-weight: bold;">${ownerName}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(107,63,42,.15); color: #6A4E3E; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">Teléfono</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(107,63,42,.15); font-weight: bold;">${ownerPhone}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(107,63,42,.15); color: #6A4E3E; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(107,63,42,.15);">${ownerEmail || '—'}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(107,63,42,.15); color: #6A4E3E; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">Propiedad</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(107,63,42,.15);">${propertyAddress}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(107,63,42,.15); color: #6A4E3E; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">Ciudad</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(107,63,42,.15);">${propertyCity || '—'}</td></tr>
            </table>
            <h2 style="font-size: 22px; margin: 32px 0 24px; color: #2A1A10;">Datos del embajador</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(107,63,42,.15); color: #6A4E3E; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">Nombre</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(107,63,42,.15); font-weight: bold;">${referrerName}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(107,63,42,.15); color: #6A4E3E; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(107,63,42,.15);">${referrerEmail}</td></tr>
            </table>
            <div style="margin-top: 32px; padding: 20px 24px; background: #6B3F2A; border-radius: 4px;">
              <p style="color: rgba(245,240,232,.7); font-size: 12px; margin: 0 0 4px;">ID del referido</p>
              <p style="color: #F5F0E8; font-size: 13px; margin: 0; font-family: monospace;">${data.id}</p>
            </div>
          </div>
          <div style="background: #1A0E08; padding: 20px 32px; text-align: center;">
            <p style="color: rgba(245,240,232,.3); font-size: 11px; margin: 0;">© 2025 Solena Inmobiliaria · solenainmo.es</p>
          </div>
        </div>
      `,
    });

    // Email de confirmación al embajador
    await resend.emails.send({
      from: 'Solena Inmobiliaria <info@solenainmo.es>',
      to: referrerEmail,
      subject: 'Tu referido ha sido registrado — Solena',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2A1A10;">
          <div style="background: #1A0E08; padding: 24px; text-align: center;">
            <h1 style="color: #C9A96E; font-size: 24px; margin: 0; letter-spacing: 4px;">SOLENA</h1>
            <p style="color: rgba(201,169,110,0.6); font-size: 11px; letter-spacing: 3px; margin: 4px 0 0; text-transform: uppercase;">Costa del Sol</p>
          </div>
          <div style="background: #F5F0E8; padding: 40px 32px;">
            <h2 style="font-size: 22px; margin: 0 0 16px;">Hola ${referrerName},</h2>
            <p style="color: #6A4E3E; line-height: 1.75; margin: 0 0 24px;">Hemos recibido tu referido correctamente. Nuestro equipo se pondrá en contacto con <strong>${ownerName}</strong> en las próximas 24 horas.</p>
            <div style="border-left: 3px solid #6B3F2A; padding: 16px 20px; background: white; margin-bottom: 24px;">
              <p style="margin: 0; font-size: 14px; color: #6A4E3E;">Propiedad referida</p>
              <p style="margin: 4px 0 0; font-weight: bold; color: #2A1A10;">${propertyAddress}${propertyCity ? ', ' + propertyCity : ''}</p>
            </div>
            <p style="color: #6A4E3E; line-height: 1.75; margin: 0;">Si tienes cualquier duda puedes contactarnos en <a href="mailto:info@solenainmo.es" style="color: #6B3F2A;">info@solenainmo.es</a> o al <a href="tel:+34610589716" style="color: #6B3F2A;">+34 610 589 716</a>.</p>
          </div>
          <div style="background: #1A0E08; padding: 20px 32px; text-align: center;">
            <p style="color: rgba(245,240,232,.3); font-size: 11px; margin: 0;">© 2025 Solena Inmobiliaria · solenainmo.es</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, referralId: data.id }, { status: 201 });
  } catch (error) {
    console.error('Referral error:', error);
    return NextResponse.json({ error: 'Error interno del servidor', details: String(error) }, { status: 500 });
  }
}
