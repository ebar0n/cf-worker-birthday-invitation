'use client';

import { useState, useEffect } from 'react';

interface GuestInfo {
  name: string;
  confirmed: boolean;
  adults: number;
  vehiclePlate?: string;
}

export default function RSVPForm({ token }: { token?: string }) {
  const [guestName, setGuestName] = useState<string>('');
  const [formData, setFormData] = useState<GuestInfo>({
    name: '',
    confirmed: false,
    adults: 1,
    vehiclePlate: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetchGuestInfo(token);
    }
  }, [token]);

  const fetchGuestInfo = async (token: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Datos mock para demostración
      const mockData = {
        'token1': { name: 'Juan Pérez', confirmed: false, adults: 1 },
        'token2': { name: 'María García', confirmed: true, adults: 2 },
      };

      const guestData = mockData[token as keyof typeof mockData];

      if (guestData) {
        setGuestName(guestData.name);
        setFormData(prev => ({ ...prev, name: guestData.name }));
      } else {
        setError('Invitación no válida. Por favor, verifica el enlace.');
      }
    } catch (error) {
      console.error('Error fetching guest info:', error);
      setError('Error al cargar la información del invitado. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simular respuesta exitosa
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setError('Error al enviar la confirmación. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
        <p className="mt-2 text-gray-300">Cargando información...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 bg-red-500/20 rounded-lg">
        <h3 className="text-xl font-semibold text-red-300">Error</h3>
        <p className="text-red-200">{error}</p>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="text-center p-4 bg-green-500/20 rounded-lg">
        <h3 className="text-xl font-semibold text-green-300">¡Gracias por confirmar!</h3>
        <p className="text-green-200">Nos vemos pronto.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Nombre del Invitado
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-3 py-2 bg-white/10 rounded-md text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Número de Adultos
        </label>
        <input
          type="number"
          min="1"
          value={formData.adults}
          onChange={(e) => setFormData(prev => ({ ...prev, adults: parseInt(e.target.value) }))}
          className="w-full px-3 py-2 bg-white/10 rounded-md text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Placa del Vehículo (opcional)
        </label>
        <input
          type="text"
          value={formData.vehiclePlate}
          onChange={(e) => setFormData(prev => ({ ...prev, vehiclePlate: e.target.value }))}
          className="w-full px-3 py-2 bg-white/10 rounded-md text-white"
          placeholder="ABC123"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Enviando...' : 'Confirmar Asistencia'}
      </button>
    </form>
  );
}