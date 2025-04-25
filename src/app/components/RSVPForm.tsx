'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  attendance: z.enum(['yes', 'no']),
  guests: z.string().optional(),
  message: z.string().optional(),
});

// Infer the type from the schema
type FormData = z.infer<typeof formSchema>;

interface RSVPFormProps {
  token?: string;
}

export default function RSVPForm({ token }: RSVPFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attendance: 'yes',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
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

      toast.success('¡Gracias por tu respuesta!');
      reset();
    } catch {
      toast.error('Hubo un error al enviar tu respuesta. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Tu nombre completo"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="tu@email.com"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>¿Asistirás?</Label>
        <RadioGroup defaultValue="yes" className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" {...register('attendance')} />
            <Label htmlFor="yes">Sí, asistiré</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" {...register('attendance')} />
            <Label htmlFor="no">No podré asistir</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="guests">Número de invitados adicionales</Label>
        <Input
          id="guests"
          type="number"
          min="0"
          {...register('guests')}
          placeholder="0"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensaje (opcional)</Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Escribe un mensaje para los cumpleañeros..."
          className="min-h-[100px]"
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar RSVP'}
      </Button>
    </form>
  );
}