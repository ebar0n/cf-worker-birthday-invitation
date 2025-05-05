import { Suspense } from "react";
import RSVPForm from "@/app/components/RSVPForm";
import ImageCarousel from "@/app/components/ImageCarousel";
import MapButton from "@/app/components/MapButton";
import ToggleDetailsButton from "@/app/components/ToggleDetailsButton";
import BackButton from "@/app/components/BackButton";
import { MediaFile } from '@/app/types';

// Static array of media files based on actual files in photos directory
const mediaFiles: MediaFile[] = [
  // Images
  { type: 'image', src: '/photos/luciano/000.jpeg' },
  { type: 'image', src: '/photos/luciano/001.jpg' },
  { type: 'image', src: '/photos/luciano/002.jpg' },
  { type: 'image', src: '/photos/luciano/003.jpg' },
  { type: 'image', src: '/photos/luciano/004.jpg' },
  { type: 'image', src: '/photos/luciano/005.jpg' },
  { type: 'image', src: '/photos/luciano/006.jpg' },
  { type: 'image', src: '/photos/luciano/007.jpg' },
  { type: 'video', src: '/photos/luciano/008.mp4' },
  { type: 'image', src: '/photos/luciano/009.jpg' },
  { type: 'video', src: '/photos/luciano/010.mp4' },
  { type: 'image', src: '/photos/luciano/011.jpg' },
  { type: 'image', src: '/photos/luciano/012.jpg' },
  { type: 'video', src: '/photos/luciano/013.mp4' },
  { type: 'image', src: '/photos/luciano/014.jpg' },
  { type: 'image', src: '/photos/luciano/015.jpg' },
  { type: 'image', src: '/photos/luciano/016.jpg' },
  { type: 'video', src: '/photos/luciano/017.mp4' },
  { type: 'image', src: '/photos/luciano/018.jpg' },
  { type: 'video', src: '/photos/luciano/019.mp4' },
  { type: 'image', src: '/photos/luciano/020.jpg' },
  { type: 'image', src: '/photos/luciano/021.jpg' },
  { type: 'image', src: '/photos/luciano/022.jpg' },
  { type: 'video', src: '/photos/luciano/023.mp4' },
  { type: 'image', src: '/photos/luciano/024.jpg' },
  { type: 'image', src: '/photos/luciano/025.jpg' },
  { type: 'image', src: '/photos/luciano/026.jpg' },
  { type: 'image', src: '/photos/luciano/027.jpg' },
  { type: 'image', src: '/photos/luciano/028.png' },
  { type: 'image', src: '/photos/luciano/029.jpg' },
  { type: 'image', src: '/photos/luciano/030.jpg' },
  { type: 'video', src: '/photos/luciano/031.mp4' },
  { type: 'image', src: '/photos/luciano/032.jpg' },
  { type: 'video', src: '/photos/luciano/033.mp4' },
  { type: 'image', src: '/photos/luciano/034.jpg' },
  { type: 'video', src: '/photos/luciano/035.mp4' },
  { type: 'image', src: '/photos/luciano/036.jpg' },
  { type: 'image', src: '/photos/luciano/037.jpg' },
  { type: 'image', src: '/photos/luciano/038.jpg' },
  { type: 'image', src: '/photos/luciano/039.jpg' },
  { type: 'image', src: '/photos/luciano/040.jpg' },
  { type: 'image', src: '/photos/luciano/041.jpg' },
  { type: 'image', src: '/photos/luciano/042.jpg' },
  { type: 'image', src: '/photos/luciano/043.jpg' },
  { type: 'image', src: '/photos/luciano/044.jpg' },
  { type: 'video', src: '/photos/luciano/045.mp4' },
  { type: 'image', src: '/photos/luciano/046.jpg' },
  { type: 'image', src: '/photos/luciano/047.jpg' },
  { type: 'image', src: '/photos/luciano/048.jpg' },
  { type: 'video', src: '/photos/luciano/049.mp4' },
  { type: 'image', src: '/photos/luciano/050.jpg' },
  { type: 'image', src: '/photos/luciano/051.jpg' },
  { type: 'video', src: '/photos/luciano/052.mp4' },
  { type: 'image', src: '/photos/luciano/053.jpg' },
  { type: 'image', src: '/photos/luciano/054.jpg' },
  { type: 'image', src: '/photos/luciano/055.jpg' },
  { type: 'video', src: '/photos/luciano/056.mp4' },
  { type: 'image', src: '/photos/luciano/057.jpg' },
  { type: 'video', src: '/photos/luciano/058.mp4' },
  { type: 'image', src: '/photos/luciano/059.jpg' },
  { type: 'image', src: '/photos/luciano/060.jpg' },
  { type: 'video', src: '/photos/luciano/061.mp4' },
  { type: 'image', src: '/photos/luciano/062.jpg' },
  { type: 'image', src: '/photos/luciano/063.jpg' },
  { type: 'image', src: '/photos/luciano/064.jpg' },
  { type: 'image', src: '/photos/luciano/065.jpg' },
  { type: 'video', src: '/photos/luciano/066.mp4' },
  { type: 'image', src: '/photos/luciano/067.jpg' },
  { type: 'video', src: '/photos/luciano/068.mp4' },
  { type: 'image', src: '/photos/luciano/069.jpg' },
  { type: 'video', src: '/photos/luciano/070.mp4' },
  { type: 'image', src: '/photos/luciano/071.jpg' },
  { type: 'image', src: '/photos/luciano/072.jpg' },
  { type: 'video', src: '/photos/luciano/073.mp4' },
  { type: 'image', src: '/photos/luciano/074.jpg' },
  { type: 'video', src: '/photos/luciano/075.mp4' },
  { type: 'image', src: '/photos/luciano/076.jpg' },
  { type: 'video', src: '/photos/luciano/077.mp4' },
  { type: 'image', src: '/photos/luciano/078.jpg' },
  { type: 'video', src: '/photos/luciano/079.mp4' },
  { type: 'image', src: '/photos/luciano/080.jpg' },
  { type: 'video', src: '/photos/luciano/081.mp4' },
  { type: 'image', src: '/photos/luciano/082.jpg' },
  { type: 'image', src: '/photos/luciano/083.jpg' },
  { type: 'video', src: '/photos/luciano/084.mp4' },
  { type: 'image', src: '/photos/luciano/085.jpg' },
  { type: 'image', src: '/photos/luciano/086.jpg' },
  { type: 'image', src: '/photos/luciano/087.jpg' },
  { type: 'video', src: '/photos/luciano/088.mp4' },
  { type: 'image', src: '/photos/luciano/089.jpg' },
  { type: 'image', src: '/photos/luciano/090.jpg' },
  { type: 'image', src: '/photos/luciano/091.jpg' },
  { type: 'image', src: '/photos/luciano/092.jpg' },
  { type: 'image', src: '/photos/luciano/093.jpg' },
  { type: 'image', src: '/photos/luciano/094.jpg' },
  { type: 'video', src: '/photos/luciano/095.mp4' },
  { type: 'image', src: '/photos/luciano/096.jpg' },
  { type: 'video', src: '/photos/luciano/097.mp4' },
  { type: 'image', src: '/photos/luciano/098.jpg' },
  { type: 'video', src: '/photos/luciano/099.mp4' },
  { type: 'image', src: '/photos/luciano/100.jpg' },
  { type: 'image', src: '/photos/luciano/101.jpg' },
  { type: 'video', src: '/photos/luciano/102.mp4' },
  { type: 'image', src: '/photos/luciano/103.jpg' },
  { type: 'image', src: '/photos/luciano/104.jpg' },
  { type: 'image', src: '/photos/luciano/105.jpg' },
  { type: 'video', src: '/photos/luciano/106.mp4' },
  { type: 'image', src: '/photos/luciano/107.jpg' },
  { type: 'image', src: '/photos/luciano/108.jpg' },
  { type: 'image', src: '/photos/luciano/109.jpg' },
  { type: 'video', src: '/photos/luciano/110.mp4' },
  { type: 'image', src: '/photos/luciano/111.jpg' },
  { type: 'image', src: '/photos/luciano/112.jpg' },
  { type: 'image', src: '/photos/luciano/113.jpg' },
  { type: 'image', src: '/photos/luciano/114.jpg' },
  { type: 'video', src: '/photos/luciano/115.mp4' },
  { type: 'image', src: '/photos/luciano/116.jpg' },
  { type: 'image', src: '/photos/luciano/117.jpg' },
  { type: 'image', src: '/photos/luciano/118.jpg' },
  { type: 'video', src: '/photos/luciano/119.mp4' },
  { type: 'image', src: '/photos/luciano/120.jpg' },
  { type: 'video', src: '/photos/luciano/121.mp4' },
  { type: 'image', src: '/photos/luciano/122.jpg' },
  { type: 'video', src: '/photos/luciano/123.mp4' },
  { type: 'image', src: '/photos/luciano/124.jpg' },
  { type: 'image', src: '/photos/luciano/125.jpg' },
  { type: 'image', src: '/photos/luciano/126.jpg' },
  { type: 'video', src: '/photos/luciano/127.mp4' },
  { type: 'image', src: '/photos/luciano/128.jpg' },
  { type: 'video', src: '/photos/luciano/129.mp4' },
  { type: 'image', src: '/photos/luciano/130.jpg' },
  { type: 'image', src: '/photos/luciano/131.jpg' },
  { type: 'image', src: '/photos/luciano/132.jpg' },
  { type: 'image', src: '/photos/luciano/133.jpg' },
  { type: 'image', src: '/photos/luciano/134.jpg' },
  { type: 'image', src: '/photos/luciano/135.jpg' },
  { type: 'image', src: '/photos/luciano/136.jpg' },
  { type: 'image', src: '/photos/luciano/137.jpeg' },
  { type: 'image', src: '/photos/luciano/138.jpeg' },
  { type: 'image', src: '/photos/luciano/139.jpeg' }
];

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
      <BackButton />
      {/* Background Images Carousel */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-gray-900" />}>
          <ImageCarousel mediaFiles={mediaFiles} />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-8 text-white pointer-events-none">
        <main className="max-w-2xl w-full bg-black/30 md:bg-black/50 backdrop-blur-[2px] md:backdrop-blur-sm rounded-lg p-4 md:p-8 pointer-events-auto">
          <h1 className="text-2xl md:text-5xl font-bold text-center mb-2 md:mb-6">
            Soy Luciano Baron Peña
          </h1>
          <h1 className="text-xl md:text-5xl font-bold text-center mb-2 md:mb-6">
            ¡Y voy a cumplir 4 añitos!
          </h1>
          <div className="space-y-3 md:space-y-6 text-center">
            <div className="flex justify-center items-center mb-1 md:mb-2">
              <ToggleDetailsButton />
            </div>
            <div id="invitation-details" className="transition-all duration-300">
              <div>
                <h2 className="text-lg md:text-2xl text-center mb-3 md:mb-8">
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
