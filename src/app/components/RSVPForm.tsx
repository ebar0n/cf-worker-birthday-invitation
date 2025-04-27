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
import { Checkbox } from './ui/checkbox';
import { Toaster, toast } from 'sonner';

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  attendance: z.enum(['yes', 'no']),
  vehiclePlate: z.string().optional(),
  guests: z.string().optional(),
  dataPolicy: z.boolean().optional()
}).refine((data) => {
  if (data.attendance === 'no') return true;

  const guestsValid = data.guests && data.guests.length > 0;
  const dataPolicyValid = data.dataPolicy === true;

  return guestsValid && dataPolicyValid;
}, {
  message: "Por favor completa los campos requeridos",
  path: ['guests']
}).refine((data) => {
  if (data.attendance === 'no') return true;
  return data.dataPolicy === true;
}, {
  message: "Por favor acepta la política de datos para continuar",
  path: ['dataPolicy']
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
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attendance: 'yes',
      dataPolicy: false,
    },
  });

  // Watch attendance to update form state
  const attendance = watch('attendance');

  useEffect(() => {
    // Limpiar campos cuando cambia la asistencia a 'no'
    if (attendance === 'no') {
      setValue('guests', '', { shouldValidate: true });
      setValue('dataPolicy', false, { shouldValidate: true });
    }
  }, [attendance, setValue]);

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
          <div className="space-y-4 bg-white/10 rounded-lg p-6 border border-white/20">
            <Label htmlFor="name" className="block text-center text-xl text-white/80 mb-2">
              Invitado
            </Label>
            <Input
              id="name"
              {...register('name')}
              type="hidden"
              readOnly={!!guestData}
              value={guestData?.name || ''}
            />
            <h2 className="relative text-center text-6xl py-8 font-['Dancing_Script'] font-bold select-none
              bg-clip-text text-transparent bg-gradient-to-r from-white/90 via-yellow-200/90 to-white/90
              after:content-[''] after:block after:w-1/2 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent after:mx-auto after:mt-4
              before:content-[''] before:block before:w-1/2 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent before:mx-auto before:mb-4
              animate-pulse-slow hover:scale-105 transition-transform duration-500
              drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              {guestData?.name || 'Nombre del invitado'}
            </h2>
            {errors.name && (
              <p className="text-base text-red-400 text-center font-medium">{errors.name.message}</p>
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
            <Label htmlFor="guests">Información adicional y acompañantes</Label>
            <p className="text-xs text-muted-foreground">Por favor escribe todos los datos solicitados, alguna alergia o restricción alimentaria, y el nombre de cada acompañante (es necesario para el ingreso al evento).</p>
            <Textarea
              id="guests"
              {...register('guests')}
              placeholder="Por favor escribe todos los datos solicitados..."
              className="min-h-[100px]"
            />
            {errors.guests && (
              <p className="text-sm text-red-500">{errors.guests.message}</p>
            )}
          </div>

          <div className="flex items-start space-x-2 mt-4">
            <Checkbox
              id="dataPolicy"
              checked={watch('dataPolicy')}
              onCheckedChange={(checked: boolean | 'indeterminate') => {
                setValue('dataPolicy', checked === true, {
                  shouldValidate: true
                });
              }}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="dataPolicy" className="text-sm font-normal">
                Acepto que estos datos serán utilizados exclusivamente para gestionar el acceso al evento y no serán compartidos con terceros fuera de la administración del conjunto
              </Label>
              {errors.dataPolicy && (
                <p className="text-sm text-red-500">Este campo es requerido</p>
              )}
            </div>
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