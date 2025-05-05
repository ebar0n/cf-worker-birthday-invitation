import { Suspense } from "react";
import RSVPForm from "@/app/components/RSVPForm";
import ImageCarousel from "@/app/components/ImageCarousel";
import MapButton from "@/app/components/MapButton";
import ToggleDetailsButton from "@/app/components/ToggleDetailsButton";
import BackButton from "@/app/components/BackButton";
import { MediaFile } from "@/app/types";

const mediaFiles: MediaFile[] = [
  { type: 'image', src: '/photos/lorenzo/000.jpg' },
  { type: 'video', src: '/photos/lorenzo/001.mp4' },
  { type: 'image', src: '/photos/lorenzo/002.jpg' },
  { type: 'image', src: '/photos/lorenzo/003.jpg' },
  { type: 'video', src: '/photos/lorenzo/004.mp4' },
  { type: 'video', src: '/photos/lorenzo/005.mp4' },
  { type: 'image', src: '/photos/lorenzo/006.jpg' },
  { type: 'image', src: '/photos/lorenzo/007.jpg' },
  { type: 'image', src: '/photos/lorenzo/008.jpg' },
  { type: 'image', src: '/photos/lorenzo/009.jpg' },
  { type: 'video', src: '/photos/lorenzo/010.mp4' },
  { type: 'image', src: '/photos/lorenzo/011.jpg' },
  { type: 'video', src: '/photos/lorenzo/012.mp4' },
  { type: 'image', src: '/photos/lorenzo/013.jpg' },
  { type: 'video', src: '/photos/lorenzo/014.mp4' },
  { type: 'image', src: '/photos/lorenzo/015.jpg' },
  { type: 'image', src: '/photos/lorenzo/016.jpg' },
  { type: 'image', src: '/photos/lorenzo/017.jpg' },
  { type: 'video', src: '/photos/lorenzo/018.mp4' },
  { type: 'image', src: '/photos/lorenzo/019.jpg' },
  { type: 'image', src: '/photos/lorenzo/020.jpg' },
  { type: 'image', src: '/photos/lorenzo/021.jpg' },
  { type: 'image', src: '/photos/lorenzo/022.jpg' },
  { type: 'image', src: '/photos/lorenzo/023.jpg' },
  { type: 'video', src: '/photos/lorenzo/024.mp4' },
  { type: 'image', src: '/photos/lorenzo/025.jpg' },
  { type: 'image', src: '/photos/lorenzo/026.jpg' },
  { type: 'image', src: '/photos/lorenzo/027.jpg' },
  { type: 'image', src: '/photos/lorenzo/028.jpg' },
  { type: 'image', src: '/photos/lorenzo/029.jpg' },
  { type: 'image', src: '/photos/lorenzo/030.jpg' },
  { type: 'video', src: '/photos/lorenzo/031.mp4' },
  { type: 'image', src: '/photos/lorenzo/032.jpg' },
  { type: 'video', src: '/photos/lorenzo/033.mp4' },
  { type: 'image', src: '/photos/lorenzo/034.jpg' },
  { type: 'image', src: '/photos/lorenzo/035.jpg' },
  { type: 'image', src: '/photos/lorenzo/036.jpg' },
  { type: 'image', src: '/photos/lorenzo/037.jpg' },
  { type: 'video', src: '/photos/lorenzo/038.mp4' },
  { type: 'image', src: '/photos/lorenzo/039.jpg' },
  { type: 'image', src: '/photos/lorenzo/040.jpg' },
  { type: 'video', src: '/photos/lorenzo/041.mp4' },
  { type: 'image', src: '/photos/lorenzo/042.jpg' },
  { type: 'video', src: '/photos/lorenzo/043.mp4' },
  { type: 'image', src: '/photos/lorenzo/044.jpg' },
  { type: 'image', src: '/photos/lorenzo/045.jpg' },
  { type: 'video', src: '/photos/lorenzo/046.mp4' },
  { type: 'image', src: '/photos/lorenzo/047.jpg' },
  { type: 'video', src: '/photos/lorenzo/048.mp4' },
  { type: 'image', src: '/photos/lorenzo/049.jpg' },
  { type: 'video', src: '/photos/lorenzo/050.mp4' },
  { type: 'image', src: '/photos/lorenzo/051.jpg' },
  { type: 'video', src: '/photos/lorenzo/052.mp4' },
  { type: 'image', src: '/photos/lorenzo/053.jpg' },
  { type: 'image', src: '/photos/lorenzo/054.jpg' },
  { type: 'image', src: '/photos/lorenzo/055.jpg' },
  { type: 'video', src: '/photos/lorenzo/056.mp4' },
  { type: 'image', src: '/photos/lorenzo/057.jpg' },
  { type: 'video', src: '/photos/lorenzo/058.mp4' },
  { type: 'video', src: '/photos/lorenzo/059.mp4' },
  { type: 'video', src: '/photos/lorenzo/060.mp4' },
  { type: 'image', src: '/photos/lorenzo/061.jpg' },
  { type: 'image', src: '/photos/lorenzo/062.jpg' },
  { type: 'image', src: '/photos/lorenzo/063.jpg' },
  { type: 'image', src: '/photos/lorenzo/064.jpg' },
  { type: 'image', src: '/photos/lorenzo/065.jpg' },
  { type: 'video', src: '/photos/lorenzo/066.mp4' },
  { type: 'image', src: '/photos/lorenzo/067.jpg' },
  { type: 'video', src: '/photos/lorenzo/068.mp4' },
  { type: 'image', src: '/photos/lorenzo/069.jpg' },
  { type: 'image', src: '/photos/lorenzo/070.jpg' },
  { type: 'video', src: '/photos/lorenzo/071.mp4' },
  { type: 'image', src: '/photos/lorenzo/072.jpg' },
  { type: 'image', src: '/photos/lorenzo/073.jpg' },
  { type: 'video', src: '/photos/lorenzo/074.mp4' },
  { type: 'image', src: '/photos/lorenzo/075.jpg' },
  { type: 'video', src: '/photos/lorenzo/076.mp4' },
  { type: 'image', src: '/photos/lorenzo/077.jpg' },
  { type: 'image', src: '/photos/lorenzo/078.jpg' },
  { type: 'video', src: '/photos/lorenzo/079.mp4' },
  { type: 'image', src: '/photos/lorenzo/080.jpg' },
  { type: 'image', src: '/photos/lorenzo/081.jpg' },
  { type: 'image', src: '/photos/lorenzo/082.jpg' },
  { type: 'image', src: '/photos/lorenzo/083.jpg' },
  { type: 'video', src: '/photos/lorenzo/084.mp4' },
  { type: 'image', src: '/photos/lorenzo/085.jpg' },
  { type: 'video', src: '/photos/lorenzo/086.mp4' },
  { type: 'image', src: '/photos/lorenzo/087.jpg' },
  { type: 'image', src: '/photos/lorenzo/088.jpg' },
  { type: 'video', src: '/photos/lorenzo/089.mp4' },
  { type: 'image', src: '/photos/lorenzo/090.jpg' },
  { type: 'image', src: '/photos/lorenzo/091.jpg' },
  { type: 'video', src: '/photos/lorenzo/092.mp4' },
  { type: 'image', src: '/photos/lorenzo/093.jpg' },
  { type: 'image', src: '/photos/lorenzo/094.jpg' },
  { type: 'image', src: '/photos/lorenzo/095.jpg' },
  { type: 'image', src: '/photos/lorenzo/096.jpg' },
  { type: 'video', src: '/photos/lorenzo/097.mp4' },
  { type: 'video', src: '/photos/lorenzo/098.mp4' },
  { type: 'image', src: '/photos/lorenzo/099.jpg' },
  { type: 'video', src: '/photos/lorenzo/100.mp4' },
  { type: 'video', src: '/photos/lorenzo/101.mp4' },
  { type: 'video', src: '/photos/lorenzo/102.mp4' },
  { type: 'video', src: '/photos/lorenzo/103.mp4' },
  { type: 'video', src: '/photos/lorenzo/104.mp4' },
  { type: 'image', src: '/photos/lorenzo/105.jpg' },
  { type: 'image', src: '/photos/lorenzo/106.jpg' },
  { type: 'image', src: '/photos/lorenzo/107.jpg' },
  { type: 'video', src: '/photos/lorenzo/108.mp4' },
  { type: 'video', src: '/photos/lorenzo/109.mp4' },
  { type: 'image', src: '/photos/lorenzo/110.jpg' },
  { type: 'image', src: '/photos/lorenzo/111.jpg' },
  { type: 'image', src: '/photos/lorenzo/112.jpg' },
  { type: 'video', src: '/photos/lorenzo/113.mp4' },
  { type: 'image', src: '/photos/lorenzo/114.jpg' },
  { type: 'image', src: '/photos/lorenzo/115.jpg' },
  { type: 'image', src: '/photos/lorenzo/116.jpg' },
  { type: 'video', src: '/photos/lorenzo/117.mp4' },
  { type: 'video', src: '/photos/lorenzo/118.mp4' },
  { type: 'image', src: '/photos/lorenzo/119.jpg' },
  { type: 'video', src: '/photos/lorenzo/120.mp4' },
  { type: 'image', src: '/photos/lorenzo/121.jpg' },
  { type: 'video', src: '/photos/lorenzo/122.mp4' },
  { type: 'image', src: '/photos/lorenzo/123.jpg' },
  { type: 'image', src: '/photos/lorenzo/124.jpg' },
  { type: 'video', src: '/photos/lorenzo/125.mp4' },
  { type: 'video', src: '/photos/lorenzo/126.mp4' },
  { type: 'video', src: '/photos/lorenzo/127.mp4' },
  { type: 'image', src: '/photos/lorenzo/128.jpg' },
  { type: 'video', src: '/photos/lorenzo/129.mp4' },
  { type: 'image', src: '/photos/lorenzo/130.jpg' },
  { type: 'image', src: '/photos/lorenzo/131.jpg' },
  { type: 'image', src: '/photos/lorenzo/132.jpg' },
  { type: 'video', src: '/photos/lorenzo/133.mp4' },
  { type: 'image', src: '/photos/lorenzo/134.jpg' },
  { type: 'video', src: '/photos/lorenzo/135.mp4' },
  { type: 'image', src: '/photos/lorenzo/136.jpg' },
  { type: 'video', src: '/photos/lorenzo/137.mp4' },
  { type: 'image', src: '/photos/lorenzo/138.jpg' },
  { type: 'image', src: '/photos/lorenzo/139.jpg' },
  { type: 'video', src: '/photos/lorenzo/140.mp4' },
  { type: 'image', src: '/photos/lorenzo/141.jpg' },
  { type: 'video', src: '/photos/lorenzo/142.mp4' },
  { type: 'image', src: '/photos/lorenzo/143.jpg' },
  { type: 'image', src: '/photos/lorenzo/144.jpg' },
  { type: 'video', src: '/photos/lorenzo/145.mp4' },
  { type: 'image', src: '/photos/lorenzo/146.jpg' },
  { type: 'video', src: '/photos/lorenzo/147.mp4' },
  { type: 'image', src: '/photos/lorenzo/148.jpg' },
  { type: 'video', src: '/photos/lorenzo/149.mp4' },
  { type: 'image', src: '/photos/lorenzo/150.jpg' },
  { type: 'video', src: '/photos/lorenzo/151.mp4' },
  { type: 'image', src: '/photos/lorenzo/152.jpg' },
  { type: 'video', src: '/photos/lorenzo/153.mp4' },
  { type: 'image', src: '/photos/lorenzo/154.jpg' },
  { type: 'video', src: '/photos/lorenzo/155.mp4' },
  { type: 'image', src: '/photos/lorenzo/156.jpg' },
  { type: 'video', src: '/photos/lorenzo/157.mp4' },
  { type: 'image', src: '/photos/lorenzo/158.jpg' },
  { type: 'video', src: '/photos/lorenzo/159.mp4' },
  { type: 'image', src: '/photos/lorenzo/160.jpg' },
  { type: 'video', src: '/photos/lorenzo/161.mp4' },
  { type: 'image', src: '/photos/lorenzo/162.jpg' },
  { type: 'video', src: '/photos/lorenzo/163.mp4' },
  { type: 'image', src: '/photos/lorenzo/164.jpg' },
  { type: 'video', src: '/photos/lorenzo/165.mp4' },
  { type: 'image', src: '/photos/lorenzo/166.jpg' },
  { type: 'image', src: '/photos/lorenzo/167.jpg' },
  { type: 'image', src: '/photos/lorenzo/168.jpg' },
  { type: 'image', src: '/photos/lorenzo/169.jpg' },
  { type: 'image', src: '/photos/lorenzo/170.jpg' },
  { type: 'image', src: '/photos/lorenzo/171.jpg' },
  { type: 'image', src: '/photos/lorenzo/172.jpg' },
  { type: 'image', src: '/photos/lorenzo/173.jpg' },
  { type: 'image', src: '/photos/lorenzo/174.jpg' }
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
