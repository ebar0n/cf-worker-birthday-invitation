'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// List of all photos from the studio
const photos = [
  'JVF_4729.JPG',
  'JVF_4733.JPG',
  'JVF_4736.JPG',
  'JVF_4784.JPG',
  'JVF_4800.JPG',
  'JVF_4809.JPG',
  'JVF_4826.JPG',
  'JVF_4830.JPG',
  'JVF_4835.JPG',
  'JVF_4850.JPG',
  'JVF_4854.JPG',
  'JVF_4858.JPG',
  'JVF_4913.JPG',
  'JVF_4955.JPG',
  'JVF_4967.JPG',
  'JVF_4974.JPG',
  'JVF_4987.JPG',
  'JVF_4994.JPG',
  'JVF_5003.JPG',
  'JVF_5018.JPG',
  'JVF_5024.JPG',
  'JVF_5031.JPG',
  'JVF_5041.JPG',
  'JVF_5046.JPG',
  'JVF_5050.JPG',
  'JVF_5056.JPG',
  'JVF_5069.JPG',
  'JVF_5076.JPG',
];

export default function BirthdayGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

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
      await new Promise(resolve => setTimeout(resolve, 100)); // Small delay between downloads
      await downloadPhoto(photos[i]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
                ¡Gracias por hacer parte de nuestras memorias!
              </h1>
              <p className="text-white/80 text-sm md:text-base">
                Fotos del estudio fotográfico - Cumpleaños 2025
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={downloadAllPhotos}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
              >
                📥 Descargar todas
              </button>
              <a
                href="/"
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
              >
                🏠 Inicio
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Gallery */}
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Current Photo Display */}
        <div className="relative bg-black/20 rounded-lg overflow-hidden mb-6">
          <div className="relative aspect-[4/3] md:aspect-[16/9]">
            <Image
              src={`/photos/2025/birthday/${photos[currentIndex]}`}
              alt={`Foto ${currentIndex + 1} de ${photos.length}`}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
            aria-label="Foto anterior"
          >
            ←
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
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
            onClick={() => downloadPhoto(photos[currentIndex])}
            className="absolute bottom-4 right-4 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
          >
            📥 Descargar
          </button>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-2 md:gap-3">
          {photos.map((photo, index) => (
            <button
              key={photo}
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                index === currentIndex
                  ? 'ring-4 ring-blue-500 scale-105'
                  : 'hover:scale-105'
              }`}
            >
              <Image
                src={`/photos/2025/birthday/${photo}`}
                alt={`Miniatura ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center text-white/80 text-sm">
          <p>💡 Usa las flechas del teclado para navegar • Haz clic en las miniaturas • Descarga las fotos que más te gusten</p>
        </div>
      </div>
    </div>
  );
}