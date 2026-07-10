'use client';
import { memo, useState } from 'react';

const ReferralForm = memo(() => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    try {
      const response = await fetch('/api/referrals/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ownerName: data.ownerName,
          ownerEmail: data.ownerEmail,
          ownerPhone: data.ownerPhone,
          propertyAddress: data.propertyAddress,
          propertyCity: data.propertyCity,
          estimatedValue: parseInt(data.estimatedValue as string),
          youName: data.youName,
          youEmail: data.youEmail,
        }),
      });
      
      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-green-900">¡Referido registrado!</h3>
        <p className="text-green-700">Nos contactaremos en 24 horas.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-gray-200 rounded-lg p-8" id="form">
      <input type="text" name="ownerName" placeholder="Nombre del propietario" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-solena-accent" />
      <input type="email" name="ownerEmail" placeholder="Email del propietario" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-solena-accent" />
      <input type="tel" name="ownerPhone" placeholder="+34 600 000 000" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-solena-accent" />
      <input type="text" name="propertyAddress" placeholder="Dirección de la propiedad" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-solena-accent" />
      <select name="propertyCity" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-solena-accent">
        <option value="">Selecciona ciudad</option>
        <option value="Málaga">Málaga</option>
        <option value="Marbella">Marbella</option>
        <option value="Benalmádena">Benalmádena</option>
        <option value="Fuengirola">Fuengirola</option>
      </select>
      <input type="number" name="estimatedValue" placeholder="Valor estimado (€)" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-solena-accent" />
      <input type="text" name="youName" placeholder="Tu nombre" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-solena-accent" />
      <input type="email" name="youEmail" placeholder="Tu email" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-solena-accent" />
      <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 bg-solena-accent hover:bg-opacity-90 disabled:opacity-50 text-white font-semibold rounded-lg">
        {isSubmitting ? 'Guardando...' : 'Registrar Referido'}
      </button>
    </form>
  );
});
ReferralForm.displayName = 'ReferralForm';
export default ReferralForm;
