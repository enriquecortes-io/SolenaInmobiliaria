'use client';
import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ReferralHero = memo(() => (
  <section className="relative min-h-screen bg-gradient-to-br from-solena-50 to-solena-100 overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-solena-accent/10 rounded-full blur-3xl -mr-48 -mt-48" />
    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-4 py-24">
      <div className="space-y-8">
        <h1 className="text-6xl font-serif font-bold text-solena-900">
          Tus contactos valen <span className="text-solena-accent">10.000€</span>
        </h1>
        <p className="text-xl text-solena-600">Refiera un propietario a Solena y gane entre 1.000€ y 10.000€ por cada venta.</p>
        <div className="flex gap-4">
          <Link href="#form" className="px-8 py-4 bg-solena-accent text-white font-semibold rounded-lg hover:bg-opacity-90">
            Empezar a Referir
          </Link>
        </div>
      </div>
      <div className="relative h-96">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=600&fit=crop"
          alt="Propiedad"
          fill
          priority
          className="object-cover rounded-2xl"
          sizes="50vw"
        />
      </div>
    </div>
  </section>
));
ReferralHero.displayName = 'ReferralHero';
export default ReferralHero;
