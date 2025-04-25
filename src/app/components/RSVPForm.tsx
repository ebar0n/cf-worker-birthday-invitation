'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from './ui/textarea';
import { Toaster, toast } from 'sonner';

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  attendance: z.enum(['yes', 'no']),
  vehiclePlate: z.string().optional(),
  guests: z.string().optional(),
});

// Infer the type from the schema
type FormData = z.infer<typeof formSchema>;

interface RSVPFormProps {
  token?: string;
}

interface GuestData {
  name: string;
  attendance: string;
  vehiclePlate?: string;
  guests?: string;
}

export default function RSVPForm({ token }: RSVPFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestData, setGuestData] = useState<GuestData | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [lastSubmittedData, setLastSubmittedData] = useState<FormData | null>(null);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attendance: 'yes',
    },
  });

  useEffect(() => {
    const fetchGuestData = async () => {
      if (token) {
        try {
          const response = await fetch(`/api/guests/${token}`);
          if (response.ok) {
            const data = await response.json() as GuestData;
            setGuestData(data);
            setIsValidToken(true);
            // Pre-fill the form with guest data
            reset({
              name: data.name,
              attendance: (data.attendance as 'yes' | 'no') || 'yes',
              vehiclePlate: data.vehiclePlate,
              guests: data.guests
            });
          } else {
            setIsValidToken(false);
          }
        } catch {
          setIsValidToken(false);
          toast.error('Error al cargar los datos del invitado');
        }
      } else {
        setIsValidToken(false);
      }
    };

    fetchGuestData();
  }, [token, reset]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log('Form data being submitted:', data);

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, token }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      setLastSubmittedData(data);
      setShowForm(false);

      // Esperar un momento antes de mostrar el mensaje de éxito
      setTimeout(() => {
        if (data.attendance === 'yes') {
          toast.success('¡Gracias por confirmar tu asistencia!', {
            duration: 5000,
            position: 'top-center',
          });
        } else {
          toast.warning('Lamentamos que no puedas asistir', {
            duration: 5000,
            position: 'top-center',
          });
        }
      }, 500);

    } catch {
      console.error('Error al enviar el formulario');
      toast.error('Hubo un error al enviar tu respuesta. Por favor intenta de nuevo.', {
        duration: 5000,
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () => {
    if (lastSubmittedData) {
      reset(lastSubmittedData);
    }
    setShowForm(true);
  };

  return (
    <>
      <Toaster richColors />
      {isValidToken === false ? (
        <div className="text-center space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900">
            Código de invitación no válido
          </h3>
          <p className="text-gray-600">
            Para confirmar tu asistencia, por favor escanea el código QR que recibiste en tu invitación o comunícate con mis padres.
          </p>
        </div>
      ) : isValidToken && showForm ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="block text-center text-lg mb-2">Invitado</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Tu nombre completo"
              readOnly={!!guestData}
              className={`text-center text-2xl py-8 ${guestData ? "opacity-70 cursor-not-allowed border-0 bg-muted" : ""}`}
            />
            {errors.name && (
              <p className="text-sm text-red-500 text-center">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="block text-center">¿Asistirás?</Label>
            <RadioGroup
              defaultValue="yes"
              value={watch('attendance')}
              className="flex justify-center gap-4"
              onValueChange={(value) => {
                const newValue = value as 'yes' | 'no';
                reset({
                  ...watch(),
                  attendance: newValue
                }, { keepDefaultValues: true });
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Sí, asistiré</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">No podré asistir</Label>
              </div>
            </RadioGroup>
          </div>

          <input type="hidden" {...register('attendance')} />

          <div className="space-y-2" id="vehicle-section">
            <Label htmlFor="vehiclePlate">Placa del vehículo (si vienes en carro)</Label>
            <Input
              id="vehiclePlate"
              {...register('vehiclePlate')}
              placeholder="ABC-123"
              className="text-center uppercase"
            />
            <p className="text-sm text-muted-foreground text-center italic mt-1">
              Hay parqueaderos disponibles para visitantes, puedes ingresar directamente por la entrada vehicular
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests">Acompañantes (nombre y edad)</Label>
            <Textarea
              id="guests"
              {...register('guests')}
              placeholder="Por favor escribe los nombres completos y edad de las personas que vendrán contigo..."
              className="min-h-[100px]"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button>
        </form>
      ) : isValidToken && !showForm ? (
        <div className="text-center space-y-4">
          <p className="text-2xl font-semibold mb-2">
            {lastSubmittedData?.name}
          </p>
          <p className="text-lg">
            {lastSubmittedData?.attendance === 'yes'
              ? '¡Gracias por confirmar tu asistencia!'
              : 'Gracias por informarnos que no podrás asistir'}
          </p>
          <Button
            onClick={handleEdit}
            className="w-full"
          >
            Editar mi respuesta
          </Button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg">Cargando...</p>
        </div>
      )}
    </>
  );
}