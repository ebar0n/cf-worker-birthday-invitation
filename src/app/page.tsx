import { Suspense } from "react";

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
        <main className="max-w-4xl w-full bg-black/30 md:bg-black/50 backdrop-blur-[2px] md:backdrop-blur-sm rounded-lg p-3 md:p-8 pointer-events-auto mb-8 mx-auto md:w-full w-[90%]">
          <h1 className="text-2xl md:text-6xl font-bold text-center mb-2 md:mb-6">
            Somos la familia Baron Peña
          </h1>
          <h1 className="text-xl md:text-5xl font-bold text-center mb-2 md:mb-6">
            ¡Celebramos los cumpleaños de nuestros hijos!
          </h1>
          <div className="space-y-3 md:space-y-6 text-center">
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 mb-1 md:mb-2">
              <a
                href="/2025/lorenzo"
                className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 bg-gray-400 hover:bg-gray-500 rounded-full text-white font-medium transition-colors text-sm md:text-base line-through opacity-75"
              >
                Invitación de Lorenzo
              </a>
              <a
                href="/2025/luciano"
                className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 bg-gray-400 hover:bg-gray-500 rounded-full text-white font-medium transition-colors text-sm md:text-base line-through opacity-75"
              >
                Invitación de Luciano
              </a>
            </div>
            <div className="mt-4 md:mt-6">
              <a
                href="/2025/birthday"
                className="inline-block px-6 md:px-8 py-3 md:py-4 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-medium transition-colors text-sm md:text-base"
              >
                📸 ¡Mira las fotos del estudio fotográfico!
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
