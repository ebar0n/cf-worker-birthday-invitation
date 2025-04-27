import { Suspense } from "react";
import RSVPForm from "@/app/components/RSVPForm";
import ImageCarousel from "@/app/components/ImageCarousel";
import MapButton from "@/app/components/MapButton";
import ToggleDetailsButton from "@/app/components/ToggleDetailsButton";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const hasToken = !!token;

  // Dirección y URL del mapa
  const address = "Bosque San Ángel Conjunto Residencial";
  const mapUrl = "https://maps.app.goo.gl/zmRSXPxSXviVxt4N7";

  return (
    <div className="relative min-h-screen">
      {/* Background Images Carousel */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-gray-900" />}>
          <ImageCarousel />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-8 text-white pointer-events-none">
        <main className="max-w-2xl w-full bg-black/30 md:bg-black/50 backdrop-blur-[2px] md:backdrop-blur-sm rounded-lg p-4 md:p-8 pointer-events-auto">
          <h1 className="text-2xl md:text-5xl font-bold text-center mb-3 md:mb-6">
            Soy Luciano Baron Peña
          </h1>
          <h1 className="text-2xl md:text-5xl font-bold text-center mb-3 md:mb-6">
            ¡Y voy a cumplir 4 añitos!
          </h1>
          <div className="space-y-4 md:space-y-6 text-center">
            <div className="flex justify-center items-center mb-2">
              <ToggleDetailsButton />
            </div>
            <div id="invitation-details" className="transition-all duration-300">

              <div>
                <h2 className="text-lg md:text-2xl text-center mb-4 md:mb-8">
                  Ven a mi fiesta
                </h2>
                <h3 className="text-base md:text-lg font-semibold">Fecha y Hora</h3>
                <p className="text-sm md:text-base">Domingo, 18 de Mayo de 2025</p>
                <p className="text-sm md:text-base">2:30 PM - 6:30 PM</p>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold">Lugar</h3>
                <div className="mt-2 md:mt-4 w-full">
                  <MapButton address={address} mapUrl={mapUrl} />
                </div>
              </div>

              {hasToken ? (
                <div className="mt-4 md:mt-8">
                  <h3 className="text-base md:text-lg font-semibold mb-2">Tus datos</h3>
                  <RSVPForm token={token} />
                </div>
              ) : (
                <div className="mt-4 md:mt-8 text-center">
                  <h3 className="text-base md:text-lg font-semibold mb-2">Confirmación de Asistencia</h3>
                  <p className="text-sm md:text-base text-gray-200">
                    Para confirmar tu asistencia, por favor usa el enlace o código QR que recibiste en tu invitación.
                  </p>
                  <p className="text-xs mt-2 text-yellow-300">
                    Es muy importante confirmar para reservar tu lugar.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
