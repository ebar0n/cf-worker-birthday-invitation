'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import SpeedControl from './SpeedControl';
import { MediaFile } from '@/app/types';

type TransitionType = 'fade' | 'slide' | 'zoom' | 'flip';

// Shuffle array function with no consecutive repeats
const shuffleArray = (array: MediaFile[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Ensure no consecutive repeats
const ensureNoRepeats = (array: MediaFile[]) => {
  for (let i = 1; i < array.length; i++) {
    if (array[i].src === array[i - 1].src) {
      for (let j = i + 1; j < array.length; j++) {
        if (array[j].src !== array[i - 1].src) {
          [array[i], array[j]] = [array[j], array[i]];
          break;
        }
      }
    }
  }
  return array;
};

export default function ImageCarousel({ mediaFiles }: { mediaFiles: MediaFile[] }) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [mediaList, setMediaList] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [speed, setSpeed] = useState(3000);
  const [transitionType, setTransitionType] = useState<TransitionType>('fade');

  const updateMediaOrder = useCallback(() => {
    const shuffled = ensureNoRepeats(shuffleArray([...mediaFiles]));
    setMediaList(shuffled);
    setCurrentMediaIndex(0);
  }, []);

  useEffect(() => {
    updateMediaOrder();
    setIsLoading(false);
  }, [updateMediaOrder]);

  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(() => {
      // Primero preparamos las nuevas imágenes
      setCurrentMediaIndex((prevIndex) => (prevIndex + 2) % mediaList.length);

      // Pequeño delay para asegurar que las nuevas imágenes estén listas
      setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }, 50);
    }, speed);

    return () => clearInterval(interval);
  }, [mediaList.length, isLoading, speed]);

  if (isLoading || mediaList.length === 0) {
    return (
      <div className="relative w-full h-full bg-black">
        <div className="absolute inset-y-0 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  const currentMedia = mediaList[currentMediaIndex];
  const nextMedia = mediaList[(currentMediaIndex + 1) % mediaList.length];

  const getTransitionClasses = (index: number): string => {
    const baseClasses = 'relative w-full md:w-1/2 h-1/2 md:h-full transition-all duration-[300ms] ease-in-out ';

    switch (transitionType) {
      case 'fade':
        return `${baseClasses} ${isTransitioning ? 'opacity-0' : 'opacity-100'}`;
      case 'slide':
        return `${baseClasses} ${isTransitioning
          ? index === 0 ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'
          : 'translate-x-0 opacity-100'}`;
      case 'zoom':
        return `${baseClasses} ${isTransitioning ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`;
      case 'flip':
        return `${baseClasses} ${isTransitioning ? '[transform:rotateY(180deg)] opacity-0' : '[transform:rotateY(0deg)] opacity-100'}`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      <div className="flex flex-col md:flex-row w-full h-full">
        {[currentMedia, nextMedia].map((media, index) => (
          <div
            key={`${media.src}-${index}`}
            className={getTransitionClasses(index)}
          >
            {media.type === 'image' ? (
              <Image
                src={media.src}
                alt={`Slide ${currentMediaIndex + index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={index === 0}
              />
            ) : (
              <video
                src={media.src}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            )}
            {/* Gradientes verticales para móvil */}
            <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-black to-transparent top-0 md:hidden" />
            <div className="absolute inset-x-0 h-8 bg-gradient-to-t from-black to-transparent bottom-0 md:hidden" />
            {/* Gradientes horizontales para desktop */}
            <div className={`hidden md:block absolute inset-y-0 w-12 ${
              index === 0 ? 'right-0 bg-gradient-to-r' : 'left-0 bg-gradient-to-l'
            } from-transparent to-black`} />
          </div>
        ))}
      </div>

      {/* Gradientes externos */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[9999] bg-black/50 rounded-xl p-4 backdrop-blur-sm">
        <SpeedControl
          onSpeedChange={setSpeed}
          onTransitionChange={setTransitionType}
          initialSpeed={speed}
          initialTransition={transitionType}
        />
      </div>
    </div>
  );
}