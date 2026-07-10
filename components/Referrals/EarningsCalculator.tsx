'use client';
import { memo, useState, useMemo } from 'react';

const EarningsCalculator = memo(() => {
  const [propertyValue, setPropertyValue] = useState(400000);
  const [commission, setCommission] = useState(3);

  const earnings = useMemo(
    () => (propertyValue * (commission / 100)) * 0.2,
    [propertyValue, commission]
  );

  return (
    <section className="py-24 bg-gradient-to-br from-solena-50 to-solena-gold/5">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-5xl font-serif font-bold text-solena-900 mb-12 text-center">¿Cuánto podrías ganar?</h2>
        <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-solena-900 mb-2">Valor de la propiedad</label>
              <input
                type="range"
                min="100000"
                max="5000000"
                step="50000"
                value={propertyValue}
                onChange={(e) => setPropertyValue(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-2xl font-bold text-solena-accent mt-2">
                {propertyValue.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-solena-900 to-solena-800 text-white rounded-xl p-8 flex flex-col justify-center">
            <p className="text-solena-100 text-sm mb-2">Tu ganancia será:</p>
            <div className="text-5xl font-bold text-solena-gold mb-4">
              {earnings.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </div>
            <p className="text-solena-200 text-sm">20% de comisión</p>
          </div>
        </div>
      </div>
    </section>
  );
});
EarningsCalculator.displayName = 'EarningsCalculator';
export default EarningsCalculator;
