import { Suspense } from "react";
import RSVPForm from "@/app/components/RSVPForm";
import ImageCarousel from "@/app/components/ImageCarousel";
import MapButton from "@/app/components/MapButton";
import ToggleDetailsButton from "@/app/components/ToggleDetailsButton";
import BackButton from "@/app/components/BackButton";
import { MediaFile } from "@/app/types";

const mediaFiles: MediaFile[] = [
  { type: 'image', src: '/photos/2025/lorenzo/000.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/001.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/002.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/003.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/004.mp4' },
  { type: 'video', src: '/photos/2025/lorenzo/005.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/006.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/007.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/008.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/009.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/010.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/011.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/012.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/013.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/014.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/015.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/016.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/017.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/018.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/019.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/020.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/021.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/022.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/023.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/024.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/025.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/026.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/027.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/028.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/029.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/030.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/031.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/032.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/033.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/034.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/035.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/036.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/037.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/038.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/039.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/040.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/041.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/042.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/043.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/044.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/045.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/046.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/047.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/048.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/049.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/050.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/051.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/052.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/053.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/054.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/055.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/056.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/057.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/058.mp4' },
  { type: 'video', src: '/photos/2025/lorenzo/059.mp4' },
  { type: 'video', src: '/photos/2025/lorenzo/060.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/061.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/062.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/063.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/064.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/065.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/066.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/067.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/068.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/069.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/070.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/071.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/072.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/073.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/074.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/075.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/076.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/077.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/078.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/079.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/080.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/081.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/082.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/083.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/084.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/085.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/086.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/087.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/088.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/089.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/090.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/091.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/092.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/093.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/094.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/095.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/096.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/097.mp4' },
  { type: 'video', src: '/photos/2025/lorenzo/098.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/099.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/100.mp4' },
  { type: 'video', src: '/photos/2025/lorenzo/101.mp4' },
  { type: 'video', src: '/photos/2025/lorenzo/102.mp4' },
  { type: 'video', src: '/photos/2025/lorenzo/103.mp4' },
  { type: 'video', src: '/photos/2025/lorenzo/104.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/105.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/106.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/107.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/108.mp4' },
  { type: 'video', src: '/photos/2025/lorenzo/109.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/110.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/111.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/112.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/113.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/114.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/115.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/116.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/117.mp4' },
  { type: 'video', src: '/photos/2025/lorenzo/118.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/119.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/120.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/121.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/122.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/123.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/124.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/125.mp4' },
  { type: 'video', src: '/photos/2025/lorenzo/126.mp4' },
  { type: 'video', src: '/photos/2025/lorenzo/127.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/128.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/129.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/130.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/131.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/132.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/133.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/134.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/135.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/136.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/137.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/138.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/139.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/140.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/141.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/142.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/143.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/144.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/145.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/146.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/147.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/148.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/149.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/150.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/151.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/152.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/153.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/154.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/155.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/156.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/157.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/158.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/159.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/160.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/161.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/162.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/163.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/164.jpg' },
  { type: 'video', src: '/photos/2025/lorenzo/165.mp4' },
  { type: 'image', src: '/photos/2025/lorenzo/166.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/167.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/168.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/169.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/170.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/171.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/172.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/173.jpg' },
  { type: 'image', src: '/photos/2025/lorenzo/174.jpg' }
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
            Soy Lorenzo Baron Peña
          </h1>
          <h1 className="text-xl md:text-5xl font-bold text-center mb-2 md:mb-6">
            ¡Y voy a cumplir 1 añito!
          </h1>
          <div className="space-y-3 md:space-y-6 text-center">
            <div className="flex justify-center items-center mb-1 md:mb-2">
              <ToggleDetailsButton showConfirmationText={false} />
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

              <div className="mt-4 md:mt-8 text-center">
                <h3 className="text-base md:text-lg font-semibold mb-2">¡Celebración Especial!</h3>
                <p className="text-sm md:text-base text-gray-200">
                  <span className="block mb-2">🎉 Mi fiesta será el mismo día que la de mi hermanito 🎉</span>
                  <span className="text-green-300 font-medium">Para que nuestra familia pueda celebrar con ambos</span>
                </p>
                <div className="mt-2 p-2 bg-black/40 rounded-lg">
                  <p className="text-xs md:text-sm text-white">
                    <span className="block">📸 Tendré mis propios momentos especiales</span>
                    <span className="block mt-1 text-green-300">❤️ Si ya confirmaste para mi hermanito, ¡también te veré en mi fiesta! ❤️</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
