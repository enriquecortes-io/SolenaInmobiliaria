'use client';
import { memo } from 'react';

const CTABanner = memo(() => (
  <section className="py-20 bg-gradient-to-r from-solena-900 to-solena-accent text-white">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-4xl font-serif font-bold mb-4">¿Listo para empezar?</h2>
      <p className="text-xl text-solena-100 mb-8">Registrate en 30 segundos y comienza a ganar</p>
      <a href="#form" className="inline-block px-8 py-4 bg-solena-gold text-solena-900 font-semibold rounded-lg hover:bg-opacity-90">
        Empezar Ahora
      </a>
    </div>
  </section>
));
CTABanner.displayName = 'CTABanner';
export default CTABanner;
