'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const photos = [
  'JVF_4729.JPG', 'JVF_4733.JPG', 'JVF_4736.JPG', 'JVF_4784.JPG', 'JVF_4800.JPG',
  'JVF_4809.JPG', 'JVF_4826.JPG', 'JVF_4830.JPG', 'JVF_4835.JPG', 'JVF_4850.JPG',
  'JVF_4854.JPG', 'JVF_4858.JPG', 'JVF_4913.JPG', 'JVF_4955.JPG', 'JVF_4967.JPG',
  'JVF_4974.JPG', 'JVF_4987.JPG', 'JVF_4994.JPG', 'JVF_5003.JPG', 'JVF_5018.JPG',
  'JVF_5024.JPG', 'JVF_5031.JPG', 'JVF_5041.JPG', 'JVF_5046.JPG', 'JVF_5050.JPG',
  'JVF_5056.JPG', 'JVF_5069.JPG', 'JVF_5076.JPG',
];

export default function BirthdayGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const thumbRowRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevPhoto();
      else if (e.key === 'ArrowRight') nextPhoto();
      else if (e.key === 'Escape') setIsFullscreen(false);
      else if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll miniaturas al cambiar de foto en mobile
  useEffect(() => {
    if (thumbRowRef.current && window.innerWidth < 768) {
      const activeThumb = thumbRowRef.current.querySelector('.active-thumb');
      if (activeThumb) {
        (activeThumb as HTMLElement).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [currentIndex]);

  // Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 50) nextPhoto();
      else if (diff < -50) prevPhoto();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const nextPhoto = () => setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  const prevPhoto = () => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);
  const toggleZoom = () => setZoom((z) => !z);

  const downloadPhoto = async (filename: string) => {
    try {
      const response = await fetch(`/photos/2025/birthday/${filename}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading photo:', error);
    }
  };
  const downloadAllPhotos = async () => {
    for (let i = 0; i < photos.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      await downloadPhoto(photos[i]);
    }
  };

  const getThumbnailUrl = (filename: string) => `/photos/2025/birthday/thumbnails/${filename}`;
  const getOriginalUrl = (filename: string) => `/photos/2025/birthday/${filename}`;

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} bg-gradient-to-br from-purple-900 via-pink-900 to-red-900`}>
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-20">
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
            ¡Gracias por hacer parte de nuestras memorias!
          </h1>
          <p className="text-white/80 text-sm md:text-base">
            Fotos del estudio fotográfico - Cumpleaños 2025
          </p>
        </div>
        <div className="flex gap-2 flex-wrap justify-center w-full md:w-auto">
          <button
            onClick={downloadAllPhotos}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
          >
            📥 Descargar todas
          </button>
          <button
            onClick={toggleFullscreen}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
          >
            {isFullscreen ? '🔲 Salir pantalla completa' : '⛶ Pantalla completa'}
          </button>
          <a
            href="/"
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm fixed left-2 top-2 md:static z-30"
            style={{boxShadow: '0 2px 8px #0004'}}
          >
            🏠 Inicio
          </a>
        </div>
      </div>

      {/* Main Gallery */}
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Current Photo Display */}
        <div
          className={`relative bg-black/20 rounded-lg overflow-hidden mb-6 group ${zoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          onClick={toggleZoom}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={zoom ? {overflow: 'scroll'} : {}}
        >
          <div className={`relative ${isFullscreen ? 'h-[calc(100vh-200px)]' : 'aspect-[4/3] md:aspect-[16/9]'} ${zoom ? 'scale-150 md:scale-125 transition-transform duration-300' : 'transition-transform duration-300'}`}>
            <Image
              src={showOriginal ? getOriginalUrl(photos[currentIndex]) : getThumbnailUrl(photos[currentIndex])}
              alt={`Foto ${currentIndex + 1} de ${photos.length}`}
              fill
              className="object-contain select-none"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              quality={showOriginal ? 100 : 60}
              loading={showOriginal ? 'eager' : 'eager'}
              draggable={false}
            />
          </div>
          {/* Navigation Controls */}
          <button
            onClick={e => { e.stopPropagation(); prevPhoto(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
            aria-label="Foto anterior"
          >
            ←
          </button>
          <button
            onClick={e => { e.stopPropagation(); nextPhoto(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
            aria-label="Siguiente foto"
          >
            →
          </button>
          {/* Photo Info */}
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
            {currentIndex + 1} de {photos.length}
          </div>
          {/* Download Current Photo */}
          <button
            onClick={e => { e.stopPropagation(); downloadPhoto(photos[currentIndex]); }}
            className="absolute bottom-4 right-4 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm transition-colors z-10"
          >
            📥 Descargar original
          </button>
        </div>
        {/* Botón para ver en alta calidad */}
        <div className="flex flex-col items-center mb-2">
          <button
            onClick={() => setShowOriginal((v) => !v)}
            className={`mt-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${showOriginal ? 'bg-blue-700 text-white' : 'bg-white text-blue-700 hover:bg-blue-100'}`}
          >
            {showOriginal ? 'Ver en calidad optimizada (rápida)' : 'Ver en alta calidad (original)'}
          </button>
          {showOriginal && (
            <span className="mt-1 text-xs text-white/80">🔎 Mostrando imagen original. Puede tardar en cargar y consumir más datos.</span>
          )}
        </div>

        {/* Miniaturas: scroll horizontal en móvil, grid en desktop */}
        {!isFullscreen && (
          <div
            ref={thumbRowRef}
            className="mt-4 flex md:grid md:grid-cols-8 lg:grid-cols-10 gap-2 md:gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {photos.map((photo, index) => (
              <button
                key={photo}
                onClick={() => setCurrentIndex(index)}
                className={`relative aspect-square rounded-lg overflow-hidden transition-all min-w-[64px] md:min-w-0 ${
                  index === currentIndex
                    ? 'ring-4 ring-blue-500 scale-105 active-thumb active-thumb-mobile'
                    : 'hover:scale-105'
                } ${index === currentIndex ? 'active-thumb' : ''}`}
                style={{ border: index === currentIndex ? '2px solid #3b82f6' : undefined }}
              >
                <Image
                  src={getThumbnailUrl(photo)}
                  alt={`Miniatura ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 64px, (max-width: 1200px) 12.5vw, 10vw"
                  quality={40}
                  loading="lazy"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 text-center text-white/80 text-sm">
          <p>💡 Usa las flechas del teclado o desliza para navegar • Haz clic en la imagen para hacer zoom • Haz clic en miniaturas • Presiona &apos;F&apos; para pantalla completa • Descarga las fotos originales</p>
        </div>
      </div>
    </div>
  );
}