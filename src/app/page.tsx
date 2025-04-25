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
            Soy Luciano Baron
          </h1>
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
            ¡Voy a cumplir 4 añitos!
          </h1>
          <h2 className="text-2xl md:text-3xl text-center mb-8">
            y te invito a mi fiesta
          </h2>

          <div className="space-y-6 text-center">
            <div>
              <h3 className="text-xl font-semibold">Fecha y Hora</h3>
              <p className="text-lg">Domingo, 18 de Mayo de 2025</p>
              <p className="text-lg">3:00 PM - 6:00 PM</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Lugar</h3>
              <div className="mt-4 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.906092725975!2d-75.19489962329932!3d4.428592043952858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38c584fb9d9835%3A0x44f30a8ab0c70d1e!2sBosque%20San%20%C3%81ngel%20Conjunto%20Residencial!5e0!3m2!1ses!2sco!4v1745561258620!5m2!1ses!2sco"
                  width="100%"
                  height="300"
                  style={{border:0}}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
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
