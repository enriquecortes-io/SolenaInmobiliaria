import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vende tu casa en la Costa del Sol — Solena Inmobiliaria',
  description:
    'Vendemos tu propiedad en Marbella, Benahavís y Costa del Sol en media de 60 días. Valoración gratuita, sin costes anticipados.',
};

export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,600;0,900;1,400;1,600&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #F5F0E8; font-family: 'Lato', sans-serif; color: #2A1A10; }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
    .fade-up { animation: fadeUp 0.7s ease both; }
    .fade-up-2 { animation: fadeUp 0.7s 0.15s ease both; }
    .fade-up-3 { animation: fadeUp 0.7s 0.3s ease both; }
    input, select, textarea { font-family: 'Lato', sans-serif; }
    input:focus, select:focus, textarea:focus { outline: none; border-color: #6B3F2A !important; }
    input::placeholder, textarea::placeholder { color: #B0998A; }
      `}</style>

      <div
        dangerouslySetInnerHTML={{
          __html: `<!-- NAV -->
<nav style="position: sticky; top: 0; z-index: 100; background: #F5F0E8; border-bottom: 1px solid rgba(107,63,42,.1); padding: 0 clamp(24px, 6vw, 80px);">
  <div style="max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; height: 68px;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="width: 40px; height: 40px; background: #6B3F2A; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-weight: 700; color: #F5F0E8; font-size: 14px; letter-spacing: 1px; flex-shrink: 0;">SL</div>
      <div style="font-family: 'Playfair Display', serif; font-weight: 700; font-size: 20px; color: #2A1A10; letter-spacing: 0.3px;">Solena</div>
    </div>
    <a href="#contacto" style="background: #6B3F2A; color: #F5F0E8; font-family: 'Lato', sans-serif; font-weight: 700; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; padding: 12px 24px; text-decoration: none; display: inline-block;">Valoración gratuita</a>
  </div>
</nav>

<!-- HERO -->
<section style="padding: clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px) clamp(60px, 8vw, 100px); position: relative; overflow: hidden;">
  <div style="max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
    <div>
      <div class="fade-up" style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #6B3F2A; font-weight: 700; margin-bottom: 20px;">Marbella · Benahavís · Costa del Sol</div>
      <h1 class="fade-up-2" style="font-family: 'Playfair Display', serif; font-size: clamp(40px, 5vw, 68px); font-weight: 900; color: #2A1A10; line-height: 1.05; letter-spacing: -1px; margin-bottom: 24px;">Vende tu casa.<br><span style="color: #6B3F2A;">Sin esperas.<br>Sin complicaciones.</span></h1>
      <p class="fade-up-3" style="font-size: 17px; color: #6A4E3E; line-height: 1.75; max-width: 440px; margin-bottom: 36px;">Somos locales, conocemos tu mercado y gestionamos todo el proceso. Tú sólo tienes que decir sí.</p>
      <div class="fade-up-3" style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
        <a href="#contacto" style="background: #6B3F2A; color: #F5F0E8; font-weight: 700; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; padding: 18px 36px; text-decoration: none; display: inline-block;">Quiero vender mi casa →</a>
        <a href="#proceso" style="color: #6B3F2A; font-weight: 700; font-size: 13px; letter-spacing: 1px; text-decoration: none; border-bottom: 1px solid #6B3F2A; padding-bottom: 2px;">Ver cómo funciona</a>
      </div>
    </div>
    <!-- Hero visual -->
    <div style="position: relative;">
      <div style="background: #2A1A10; padding: 48px 44px; position: relative; overflow: hidden;">
        <div style="position: absolute; top: -30px; right: -30px; width: 160px; height: 160px; border-radius: 50%; border: 40px solid rgba(107,63,42,.2);"></div>
        <div style="font-family: 'Playfair Display', serif; font-style: italic; font-size: 15px; color: rgba(245,240,232,.5); margin-bottom: 8px;">Media con exclusiva</div>
        <div style="font-family: 'Playfair Display', serif; font-size: 96px; font-weight: 900; color: #6B3F2A; line-height: 1; letter-spacing: -3px;">60</div>
        <div style="font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #F5F0E8; margin-top: 4px; margin-bottom: 28px;">días para vender.</div>
        <div style="width: 40px; height: 2px; background: #6B3F2A; margin-bottom: 20px;"></div>
        <div style="font-size: 13px; color: rgba(245,240,232,.55); line-height: 1.65;">Frente a más de <strong style="color: rgba(245,240,232,.8);">4 meses</strong> sin agencia de exclusividad. Cada semana cuenta.</div>
        <div style="position: absolute; bottom: 24px; right: 24px; font-family: 'Playfair Display', serif; font-weight: 700; font-size: 14px; color: rgba(107,63,42,.4); letter-spacing: 1px;">SL</div>
      </div>
    </div>
  </div>
</section>

<!-- STATS BAR -->
<section style="background: #6B3F2A; padding: 40px clamp(24px, 6vw, 80px);">
  <div style="max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;">
    <div style="text-align: center; padding: 8px 20px; border-right: 1px solid rgba(245,240,232,.15);">
      <div style="font-family: 'Playfair Display', serif; font-size: 44px; font-weight: 900; color: #F5F0E8; line-height: 1;">60</div>
      <div style="font-size: 11px; color: rgba(245,240,232,.6); letter-spacing: 1.5px; text-transform: uppercase; margin-top: 6px; line-height: 1.4;">Días media<br>de venta</div>
    </div>
    <div style="text-align: center; padding: 8px 20px; border-right: 1px solid rgba(245,240,232,.15);">
      <div style="font-family: 'Playfair Display', serif; font-size: 44px; font-weight: 900; color: #F5F0E8; line-height: 1;">8K</div>
      <div style="font-size: 11px; color: rgba(245,240,232,.6); letter-spacing: 1.5px; text-transform: uppercase; margin-top: 6px; line-height: 1.4;">Visualizaciones<br>primeros 10 días</div>
    </div>
    <div style="text-align: center; padding: 8px 20px; border-right: 1px solid rgba(245,240,232,.15);">
      <div style="font-family: 'Playfair Display', serif; font-size: 44px; font-weight: 900; color: #F5F0E8; line-height: 1;">30+</div>
      <div style="font-size: 11px; color: rgba(245,240,232,.6); letter-spacing: 1.5px; text-transform: uppercase; margin-top: 6px; line-height: 1.4;">Portales<br>inmobiliarios</div>
    </div>
    <div style="text-align: center; padding: 8px 20px;">
      <div style="font-family: 'Playfair Display', serif; font-size: 44px; font-weight: 900; color: #F5F0E8; line-height: 1;">500+</div>
      <div style="font-size: 11px; color: rgba(245,240,232,.6); letter-spacing: 1.5px; text-transform: uppercase; margin-top: 6px; line-height: 1.4;">Expertos<br>en red</div>
    </div>
  </div>
</section>

<!-- POR QUÉ SOLENA -->
<section style="padding: clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px);">
  <div style="max-width: 1100px; margin: 0 auto;">
    <div style="margin-bottom: 60px;">
      <div style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #6B3F2A; font-weight: 700; margin-bottom: 14px;">Por qué elegirnos</div>
      <h2 style="font-family: 'Playfair Display', serif; font-size: clamp(32px, 4vw, 50px); font-weight: 900; color: #2A1A10; line-height: 1.1; max-width: 600px;">Lo que ganas cuando vendes con Solena.</h2>
    </div>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;">
      <div style="background: #2A1A10; padding: 44px 36px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 900; color: #6B3F2A; line-height: 1; margin-bottom: 20px;">01</div>
        <h3 style="font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #F5F0E8; margin-bottom: 14px; line-height: 1.2;">Precio justo desde el día uno</h3>
        <p style="font-size: 14px; color: rgba(245,240,232,.6); line-height: 1.7;">Valoramos tu propiedad con datos reales del mercado de tu zona. Sin inflar precios que luego no se venden.</p>
      </div>
      <div style="background: rgba(107,63,42,.07); padding: 44px 36px; border: 1px solid rgba(107,63,42,.1);">
        <div style="font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 900; color: #6B3F2A; line-height: 1; margin-bottom: 20px;">02</div>
        <h3 style="font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #2A1A10; margin-bottom: 14px; line-height: 1.2;">Marketing profesional incluido</h3>
        <p style="font-size: 14px; color: #6A4E3E; line-height: 1.7;">Fotos de calidad, publicación en más de 30 portales y gestión diaria. Máxima exposición sin esfuerzo por tu parte.</p>
      </div>
      <div style="background: #6B3F2A; padding: 44px 36px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 900; color: rgba(245,240,232,.2); line-height: 1; margin-bottom: 20px;">03</div>
        <h3 style="font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #F5F0E8; margin-bottom: 14px; line-height: 1.2;">Compradores pre-aprobados</h3>
        <p style="font-size: 14px; color: rgba(245,240,232,.65); line-height: 1.7;">Trabajamos con compradores que ya tienen financiación aprobada. Sin operaciones que se caen en el último momento.</p>
      </div>
      <div style="background: rgba(107,63,42,.04); padding: 44px 36px; border: 1px solid rgba(107,63,42,.08);">
        <div style="font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 900; color: #6B3F2A; line-height: 1; margin-bottom: 20px;">04</div>
        <h3 style="font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #2A1A10; margin-bottom: 14px; line-height: 1.2;">Tú no gestionas nada</h3>
        <p style="font-size: 14px; color: #6A4E3E; line-height: 1.7;">Nosotros organizamos y acompañamos cada visita. Recibes un informe diario. Sólo tú decides cuándo decir sí.</p>
      </div>
      <div style="background: rgba(107,63,42,.04); padding: 44px 36px; border: 1px solid rgba(107,63,42,.08);">
        <div style="font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 900; color: #6B3F2A; line-height: 1; margin-bottom: 20px;">05</div>
        <h3 style="font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #2A1A10; margin-bottom: 14px; line-height: 1.2;">Acompañamiento legal completo</h3>
        <p style="font-size: 14px; color: #6A4E3E; line-height: 1.7;">Desde la firma del contrato hasta el notario. Te guiamos en cada paso para que la venta sea segura y sin sorpresas.</p>
      </div>
      <div style="background: rgba(107,63,42,.04); padding: 44px 36px; border: 1px solid rgba(107,63,42,.08);">
        <div style="font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 900; color: #6B3F2A; line-height: 1; margin-bottom: 20px;">06</div>
        <h3 style="font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #2A1A10; margin-bottom: 14px; line-height: 1.2;">Solo cobramos si vendemos</h3>
        <p style="font-size: 14px; color: #6A4E3E; line-height: 1.7;">Sin costes anticipados. Sin sorpresas. Nuestro éxito depende del tuyo.</p>
      </div>
    </div>
  </div>
</section>

<!-- PROCESO -->
<section id="proceso" style="background: #2A1A10; padding: clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px);">
  <div style="max-width: 1100px; margin: 0 auto;">
    <div style="margin-bottom: 60px;">
      <div style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #6B3F2A; font-weight: 700; margin-bottom: 14px;">El proceso</div>
      <h2 style="font-family: 'Playfair Display', serif; font-size: clamp(32px, 4vw, 50px); font-weight: 900; color: #F5F0E8; line-height: 1.1;">4 pasos para vender<br>tu casa.</h2>
    </div>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; position: relative;">
      <!-- connector line -->
      <div style="position: absolute; top: 28px; left: 5%; right: 5%; height: 1px; background: rgba(107,63,42,.3);"></div>
      <div style="padding: 0 20px 0 0; position: relative;">
        <div style="width: 56px; height: 56px; background: #6B3F2A; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-weight: 900; font-size: 20px; color: #F5F0E8; margin-bottom: 24px; position: relative; z-index: 1;">1</div>
        <h3 style="font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #F5F0E8; margin-bottom: 12px;">Valoración gratuita</h3>
        <p style="font-size: 13px; color: rgba(245,240,232,.5); line-height: 1.7;">Analizamos tu propiedad y te damos un precio basado en el mercado real de tu zona.</p>
      </div>
      <div style="padding: 0 20px; position: relative;">
        <div style="width: 56px; height: 56px; background: #6B3F2A; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-weight: 900; font-size: 20px; color: #F5F0E8; margin-bottom: 24px; position: relative; z-index: 1;">2</div>
        <h3 style="font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #F5F0E8; margin-bottom: 12px;">Publicación en 30+ portales</h3>
        <p style="font-size: 13px; color: rgba(245,240,232,.5); line-height: 1.7;">Fotos profesionales y máxima visibilidad desde el primer día. 8.000 visualizaciones en los primeros 10 días.</p>
      </div>
      <div style="padding: 0 20px; position: relative;">
        <div style="width: 56px; height: 56px; background: #6B3F2A; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-weight: 900; font-size: 20px; color: #F5F0E8; margin-bottom: 24px; position: relative; z-index: 1;">3</div>
        <h3 style="font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #F5F0E8; margin-bottom: 12px;">Visitas gestionadas</h3>
        <p style="font-size: 13px; color: rgba(245,240,232,.5); line-height: 1.7;">Filtramos compradores serios con financiación aprobada. Tú no tienes que estar presente.</p>
      </div>
      <div style="padding: 0 0 0 20px; position: relative;">
        <div style="width: 56px; height: 56px; background: #6B3F2A; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-weight: 900; font-size: 20px; color: #F5F0E8; margin-bottom: 24px; position: relative; z-index: 1;">4</div>
        <h3 style="font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #F5F0E8; margin-bottom: 12px;">Cierre y firma</h3>
        <p style="font-size: 13px; color: rgba(245,240,232,.5); line-height: 1.7;">Acompañamiento legal hasta el notario. Cobras y listo.</p>
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section style="padding: clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px);">
  <div style="max-width: 760px; margin: 0 auto;">
    <div style="margin-bottom: 52px;">
      <div style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #6B3F2A; font-weight: 700; margin-bottom: 14px;">Preguntas frecuentes</div>
      <h2 style="font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 44px); font-weight: 900; color: #2A1A10; line-height: 1.1;">Lo que nos preguntan<br>los propietarios.</h2>
    </div>
    <div id="faq-list" style="display: flex; flex-direction: column; gap: 0;">
      <div class="faq-item" style="border-top: 1px solid rgba(107,63,42,.15);">
        <button onclick="toggleFaq(this)" style="width: 100%; background: none; border: none; cursor: pointer; padding: 24px 0; display: flex; justify-content: space-between; align-items: center; gap: 16px; text-align: left;">
          <span style="font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600; color: #2A1A10;">¿Cuánto cobra Solena?</span>
          <span class="faq-icon" style="font-size: 22px; color: #6B3F2A; flex-shrink: 0; transition: transform 0.3s; line-height: 1;">+</span>
        </button>
        <div class="faq-body" style="max-height: 0; overflow: hidden; transition: max-height 0.35s ease;">
          <p style="font-size: 15px; color: #6A4E3E; line-height: 1.75; padding-bottom: 24px;">Solo cobramos si vendemos tu casa. Sin honorarios anticipados, sin costes fijos. Nuestro éxito está alineado con el tuyo.</p>
        </div>
      </div>
      <div class="faq-item" style="border-top: 1px solid rgba(107,63,42,.15);">
        <button onclick="toggleFaq(this)" style="width: 100%; background: none; border: none; cursor: pointer; padding: 24px 0; display: flex; justify-content: space-between; align-items: center; gap: 16px; text-align: left;">
          <span style="font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600; color: #2A1A10;">¿Cuánto tiempo tarda la venta?</span>
          <span class="faq-icon" style="font-size: 22px; color: #6B3F2A; flex-shrink: 0; transition: transform 0.3s; line-height: 1;">+</span>
        </button>
        <div class="faq-body" style="max-height: 0; overflow: hidden; transition: max-height 0.35s ease;">
          <p style="font-size: 15px; color: #6A4E3E; line-height: 1.75; padding-bottom: 24px;">Con exclusiva, la media en Costa del Sol es de 60 días. Depende del precio y la ubicación, pero los primeros 10 días son los más determinantes.</p>
        </div>
      </div>
      <div class="faq-item" style="border-top: 1px solid rgba(107,63,42,.15);">
        <button onclick="toggleFaq(this)" style="width: 100%; background: none; border: none; cursor: pointer; padding: 24px 0; display: flex; justify-content: space-between; align-items: center; gap: 16px; text-align: left;">
          <span style="font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600; color: #2A1A10;">¿Necesito reformar la casa antes?</span>
          <span class="faq-icon" style="font-size: 22px; color: #6B3F2A; flex-shrink: 0; transition: transform 0.3s; line-height: 1;">+</span>
        </button>
        <div class="faq-body" style="max-height: 0; overflow: hidden; transition: max-height 0.35s ease;">
          <p style="font-size: 15px; color: #6A4E3E; line-height: 1.75; padding-bottom: 24px;">No necesariamente. Te asesoramos sobre qué mejoras realmente aumentan el precio de venta y cuáles no compensan la inversión.</p>
        </div>
      </div>
      <div class="faq-item" style="border-top: 1px solid rgba(107,63,42,.15);">
        <button onclick="toggleFaq(this)" style="width: 100%; background: none; border: none; cursor: pointer; padding: 24px 0; display: flex; justify-content: space-between; align-items: center; gap: 16px; text-align: left;">
          <span style="font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600; color: #2A1A10;">¿Tengo que estar en las visitas?</span>
          <span class="faq-icon" style="font-size: 22px; color: #6B3F2A; flex-shrink: 0; transition: transform 0.3s; line-height: 1;">+</span>
        </button>
        <div class="faq-body" style="max-height: 0; overflow: hidden; transition: max-height 0.35s ease;">
          <p style="font-size: 15px; color: #6A4E3E; line-height: 1.75; padding-bottom: 24px;">No. Nosotros gestionamos y acompañamos cada visita. Recibirás un informe detallado después de cada una. Tú decides cuándo intervenir.</p>
        </div>
      </div>
      <div class="faq-item" style="border-top: 1px solid rgba(107,63,42,.15);">
        <button onclick="toggleFaq(this)" style="width: 100%; background: none; border: none; cursor: pointer; padding: 24px 0; display: flex; justify-content: space-between; align-items: center; gap: 16px; text-align: left;">
          <span style="font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600; color: #2A1A10;">¿Qué es la exclusiva y por qué importa?</span>
          <span class="faq-icon" style="font-size: 22px; color: #6B3F2A; flex-shrink: 0; transition: transform 0.3s; line-height: 1;">+</span>
        </button>
        <div class="faq-body" style="max-height: 0; overflow: hidden; transition: max-height 0.35s ease;">
          <p style="font-size: 15px; color: #6A4E3E; line-height: 1.75; padding-bottom: 24px;">La exclusiva nos permite invertir al máximo en el marketing de tu propiedad. Una casa publicada por varias agencias a la vez genera desconfianza en el comprador y suele tardar mucho más en venderse.</p>
        </div>
      </div>
      <div style="border-top: 1px solid rgba(107,63,42,.15); border-bottom: 1px solid rgba(107,63,42,.15);"></div>
    </div>
  </div>
</section>

<!-- FORMULARIO -->
<section id="contacto" style="background: #6B3F2A; padding: clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px);">
  <div style="max-width: 760px; margin: 0 auto;">
    <div style="margin-bottom: 52px;">
      <div style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: rgba(245,240,232,.5); font-weight: 700; margin-bottom: 14px;">Valoración gratuita</div>
      <h2 style="font-family: 'Playfair Display', serif; font-size: clamp(32px, 4vw, 52px); font-weight: 900; color: #F5F0E8; line-height: 1.05; margin-bottom: 16px;">¿Vendemos<br>tu casa?</h2>
      <p style="font-size: 16px; color: rgba(245,240,232,.65); line-height: 1.7;">Cuéntanos un poco sobre tu propiedad y te contactamos en menos de 24 horas con una valoración sin compromiso.</p>
    </div>
    <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" style="display: flex; flex-direction: column; gap: 0;" onsubmit="handleSubmit(event)">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-bottom: 2px;">
        <div style="display: flex; flex-direction: column;">
          <label style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: rgba(245,240,232,.5); font-weight: 700; padding: 16px 20px 0; background: rgba(245,240,232,.08);">Nombre *</label>
          <input required="" name="nombre" type="text" placeholder="Tu nombre completo" style="background: rgba(245,240,232,.08); border: none; border-bottom: 2px solid transparent; padding: 10px 20px 18px; font-size: 15px; color: #F5F0E8; transition: border-color 0.2s;">
        </div>
        <div style="display: flex; flex-direction: column;">
          <label style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: rgba(245,240,232,.5); font-weight: 700; padding: 16px 20px 0; background: rgba(245,240,232,.08);">Teléfono *</label>
          <input required="" name="telefono" type="tel" placeholder="+34 600 000 000" style="background: rgba(245,240,232,.08); border: none; border-bottom: 2px solid transparent; padding: 10px 20px 18px; font-size: 15px; color: #F5F0E8; transition: border-color 0.2s;">
        </div>
      </div>
      <div style="display: flex; flex-direction: column; margin-bottom: 2px;">
        <label style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: rgba(245,240,232,.5); font-weight: 700; padding: 16px 20px 0; background: rgba(245,240,232,.08);">Email *</label>
        <input required="" name="email" type="email" placeholder="tu@email.com" style="background: rgba(245,240,232,.08); border: none; border-bottom: 2px solid transparent; padding: 10px 20px 18px; font-size: 15px; color: #F5F0E8; transition: border-color 0.2s;">
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-bottom: 2px;">
        <div style="display: flex; flex-direction: column;">
          <label style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: rgba(245,240,232,.5); font-weight: 700; padding: 16px 20px 0; background: rgba(245,240,232,.08);">Localización</label>
          <input name="localizacion" type="text" placeholder="Marbella, Benahavís…" style="background: rgba(245,240,232,.08); border: none; border-bottom: 2px solid transparent; padding: 10px 20px 18px; font-size: 15px; color: #F5F0E8; transition: border-color 0.2s;">
        </div>
        <div style="display: flex; flex-direction: column;">
          <label style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: rgba(245,240,232,.5); font-weight: 700; padding: 16px 20px 0; background: rgba(245,240,232,.08);">Tipo de propiedad</label>
          <select name="tipo" style="background: rgba(245,240,232,.08); border: none; border-bottom: 2px solid transparent; padding: 10px 20px 18px; font-size: 15px; color: rgba(245,240,232,.7); transition: border-color 0.2s; -webkit-appearance: none; cursor: pointer;">
            <option value="" disabled="" selected="">Selecciona…</option>
            <option value="piso">Piso / Apartamento</option>
            <option value="villa">Villa / Chalet</option>
            <option value="adosado">Adosado</option>
            <option value="finca">Finca / Casa de campo</option>
            <option value="local">Local comercial</option>
            <option value="otro">Otro</option>
          </select>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-bottom: 2px;">
        <div style="display: flex; flex-direction: column;">
          <label style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: rgba(245,240,232,.5); font-weight: 700; padding: 16px 20px 0; background: rgba(245,240,232,.08);">Precio estimado</label>
          <select name="precio" style="background: rgba(245,240,232,.08); border: none; border-bottom: 2px solid transparent; padding: 10px 20px 18px; font-size: 15px; color: rgba(245,240,232,.7); transition: border-color 0.2s; -webkit-appearance: none; cursor: pointer;">
            <option value="" disabled="" selected="">Selecciona…</option>
            <option value="menos-200k">Menos de 200.000 €</option>
            <option value="200-350k">200.000 – 350.000 €</option>
            <option value="350-600k">350.000 – 600.000 €</option>
            <option value="600k-1m">600.000 € – 1M</option>
            <option value="mas-1m">Más de 1.000.000 €</option>
          </select>
        </div>
        <div style="display: flex; flex-direction: column;">
          <label style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: rgba(245,240,232,.5); font-weight: 700; padding: 16px 20px 0; background: rgba(245,240,232,.08);">Plazo deseado</label>
          <select name="plazo" style="background: rgba(245,240,232,.08); border: none; border-bottom: 2px solid transparent; padding: 10px 20px 18px; font-size: 15px; color: rgba(245,240,232,.7); transition: border-color 0.2s; -webkit-appearance: none; cursor: pointer;">
            <option value="" disabled="" selected="">Selecciona…</option>
            <option value="urgente">Lo antes posible</option>
            <option value="3meses">En 3 meses</option>
            <option value="6meses">En 6 meses</option>
            <option value="sin-prisa">Sin prisa, al mejor precio</option>
          </select>
        </div>
      </div>
      <div style="margin-top: 28px; display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
        <button type="submit" id="submit-btn" style="background: #F5F0E8; color: #6B3F2A; font-family: 'Lato', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; padding: 20px 44px; border: none; cursor: pointer; transition: background 0.2s, color 0.2s;">Quiero mi valoración gratuita →</button>
        <p style="font-size: 12px; color: rgba(245,240,232,.4); line-height: 1.5;">Sin compromiso. Respondemos en menos de 24h.</p>
      </div>
      <div id="form-success" style="display: none; margin-top: 24px; padding: 20px 24px; background: rgba(245,240,232,.1); border-left: 3px solid rgba(245,240,232,.5);">
        <p style="font-family: 'Playfair Display', serif; font-size: 18px; color: #F5F0E8;">¡Gracias! Te contactamos en menos de 24 horas.</p>
      </div>
    </form>
  </div>
</section>

<!-- FOOTER -->
<footer style="background: #1A0E08; padding: 40px clamp(24px, 6vw, 80px);">
  <div style="max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="width: 36px; height: 36px; background: #6B3F2A; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-weight: 700; color: #F5F0E8; font-size: 12px; letter-spacing: 1px;">SL</div>
      <div>
        <div style="font-family: 'Playfair Display', serif; font-weight: 700; font-size: 16px; color: #F5F0E8;">Solena</div>
        <div style="font-size: 10px; color: rgba(245,240,232,.35); letter-spacing: 1px; text-transform: uppercase; margin-top: 2px;">Inmobiliaria · Costa del Sol</div>
      </div>
    </div>
    <div style="display: flex; flex-direction: column; gap: 6px; text-align: right;">
      <a href="mailto:Info@solenainmobilairia.es" style="font-size: 13px; color: rgba(245,240,232,.5); text-decoration: none;">Info@solenainmobilairia.es</a>
      <a href="tel:+34610589716" style="font-size: 13px; color: rgba(245,240,232,.5); text-decoration: none;">+34 610 589 716</a>
      <div style="font-size: 11px; color: rgba(245,240,232,.25); line-height: 1.4;">Urb. Alzambra, Centro de Negocios Vasari, Marbella</div>
      <div style="font-size: 11px; color: rgba(245,240,232,.2); margin-top: 4px;">© 2025 Solena</div>
    </div>
  </div>
</footer>`,
        }}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
// FAQ toggle
    window.toggleFaq = (btn) => {
      const item = btn.closest('.faq-item');
      const body = item.querySelector('.faq-body');
      const icon = btn.querySelector('.faq-icon');
      const isOpen = body.style.maxHeight && body.style.maxHeight !== '0px';
      // close all
      document.querySelectorAll('.faq-body').forEach(b => { b.style.maxHeight = '0px'; });
      document.querySelectorAll('.faq-icon').forEach(i => { i.style.transform = 'rotate(0deg)'; i.textContent = '+'; });
      if (!isOpen) {
        body.style.maxHeight = body.scrollHeight + 'px';
        icon.style.transform = 'rotate(45deg)';
      }
    };

    // Form submit
    window.handleSubmit = async (e) => {
      e.preventDefault();
      const btn = document.getElementById('submit-btn');
      const form = e.target;
      btn.textContent = 'Enviando…';
      btn.style.opacity = '0.7';
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          form.reset();
          document.getElementById('form-success').style.display = 'block';
          btn.style.display = 'none';
        } else {
          btn.textContent = 'Error — inténtalo de nuevo';
          btn.style.opacity = '1';
        }
      } catch {
        btn.textContent = 'Error — inténtalo de nuevo';
        btn.style.opacity = '1';
      }
    };
            })();
          `,
        }}
      />
    </>
  );
}
