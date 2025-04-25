import { Suspense } from "react";
import RSVPForm from "@/app/components/RSVPForm";
import ImageCarousel from "@/app/components/ImageCarousel";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const hasToken = !!token;

  return (
    <div className="relative min-h-screen">
      {/* Background Images Carousel */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-gray-900" />}>
          <ImageCarousel />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8 text-white">
        <main className="max-w-2xl w-full bg-black/50 backdrop-blur-sm rounded-lg p-8">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
            ¡Feliz Cumpleaños!
          </h1>
          <h2 className="text-2xl md:text-3xl text-center mb-8">
            Te invitamos a celebrar
          </h2>

          <div className="space-y-6 text-center">
            <div>
              <h3 className="text-xl font-semibold">Fecha y Hora</h3>
              <p className="text-lg">Sábado, 1 de Junio de 2024</p>
              <p className="text-lg">3:00 PM - 8:00 PM</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Lugar</h3>
              <p className="text-lg">Nombre del Lugar</p>
              <p className="text-lg">Dirección del lugar</p>
            </div>

            {hasToken ? (
              <div className="mt-8">
                <RSVPForm token={token} />
              </div>
            ) : (
              <div className="mt-8 text-center">
                <p className="text-lg text-gray-300">
                  Para confirmar tu asistencia, por favor usa el enlace que recibiste en tu invitación.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
