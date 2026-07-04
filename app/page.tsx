import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vende tu casa en la Costa del Sol — Solena Inmobiliaria',
  description: 'Vendemos tu propiedad en Marbella, Benahavís y Costa del Sol en media de 60 días. Valoración gratuita, sin costes anticipados.',
};

export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght=300;400;700&family=Playfair+Display:ital,wght=0,400;0,600;0,900;1,400;1,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #F5F0E8; font-family: 'Lato', sans-serif; color: #2A1A10; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.15s ease both; }
        .fade-up-3 { animation: fadeUp 0.7s 0.3s ease both; }
        input, select, textarea { font-family: 'Lato', sans-serif; }
        input::placeholder, textarea::placeholder { color: #B0998A; }
      `}</style>

      <div dangerouslySetInnerHTML={{ __html: `
        <nav style="position: sticky; top: 0; z-index: 100; background: #F5F0E8; border-bottom: 1px solid rgba(107,63,42,.1); padding: 0 clamp(24px, 6vw, 80px);">
          <div style="max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; height: 68px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 40px; height: 40px; background: #6B3F2A; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-weight: 700; color: #F5F0E8; font-size: 14px; letter-spacing: 1px; flex-shrink: 0;">SL</div>
              <div style="font-family: 'Playfair Display', serif; font-weight: 700; font-size: 20px; color: #2A1A10; letter-spacing: 0.3px;">Solena</div>
            </div>
            <a href="#contacto" style="background: #6B3F2A; color: #F5F0E8; font-family: 'Lato', sans-serif; font-weight: 700; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; padding: 12px 24px; text-decoration: none; display: inline-block;">Valoración gratuita</a>
          </div>
        </nav>
    </main>
  );
}
