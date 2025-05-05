import { Suspense } from "react";
import MapButton from "@/app/components/MapButton";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const hasToken = !!token;

  // Redirect to /luciano if token exists
  if (hasToken) {
    // Use Next.js redirect function instead of returning an object
    // This is a client-side redirect
    const url = `/luciano?token=${token}`;

    // For server components, we need to use a different approach
    // This will work in a Next.js App Router environment
    return (
      <>
        <meta httpEquiv="refresh" content={`0;url=${url}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.href = "${url}"`
          }}
        />
        <p>Redirecting to invitation page...</p>
      </>
    );
  }

  // Dirección y URL del mapa
  const address = "Bosque San Ángel Conjunto Residencial";
  const mapUrl = "https://maps.app.goo.gl/zmRSXPxSXviVxt4N7";

  return (
    <div className="relative min-h-screen">
      {/* Background Images Carousel */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-gray-900" />}>
          <video
            className="w-full h-full object-cover"
            src="/family.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-end p-4 md:p-8 text-white pointer-events-none">
        <main className="max-w-4xl w-full bg-black/30 md:bg-black/50 backdrop-blur-[2px] md:backdrop-blur-sm rounded-lg p-4 md:p-8 pointer-events-auto mb-8">
          <h1 className="text-3xl md:text-6xl font-bold text-center mb-3 md:mb-6">
            Somos la familia Baron Peña
          </h1>
          <h1 className="text-2xl md:text-5xl font-bold text-center mb-3 md:mb-6">
            ¡Nuestros hijos estan de cumpleaños!
          </h1>
          <div className="space-y-4 md:space-y-6 text-center">
            <div className="flex justify-center items-center gap-4 mb-2">
              <a
                href="/lorenzo"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-medium transition-colors"
              >
                Invitación de Lorenzo
              </a>
              <a
                href="/luciano"
                className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-full text-white font-medium transition-colors"
              >
                Invitación de Luciano
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
