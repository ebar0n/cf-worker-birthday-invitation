'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import SpeedControl from './SpeedControl';

interface MediaFile {
  type: 'image' | 'video';
  src: string;
}

type TransitionType = 'fade' | 'slide' | 'zoom' | 'flip';

// Static array of media files based on actual files in photos directory
const mediaFiles: MediaFile[] = [
  // Images
  { type: 'image', src: '/photos/000.jpeg' },
  { type: 'image', src: '/photos/001.jpg' },
  { type: 'image', src: '/photos/002.jpg' },
  { type: 'image', src: '/photos/003.jpg' },
  { type: 'image', src: '/photos/004.jpg' },
  { type: 'image', src: '/photos/005.jpg' },
  { type: 'image', src: '/photos/006.jpg' },
  { type: 'image', src: '/photos/007.jpg' },
  { type: 'video', src: '/photos/008.mp4' },
  { type: 'image', src: '/photos/009.jpg' },
  { type: 'video', src: '/photos/010.mp4' },
  { type: 'image', src: '/photos/011.jpg' },
  { type: 'image', src: '/photos/012.jpg' },
  { type: 'video', src: '/photos/013.mp4' },
  { type: 'image', src: '/photos/014.jpg' },
  { type: 'image', src: '/photos/015.jpg' },
  { type: 'image', src: '/photos/016.jpg' },
  { type: 'video', src: '/photos/017.mp4' },
  { type: 'image', src: '/photos/018.jpg' },
  { type: 'video', src: '/photos/019.mp4' },
  { type: 'image', src: '/photos/020.jpg' },
  { type: 'image', src: '/photos/021.jpg' },
  { type: 'image', src: '/photos/022.jpg' },
  { type: 'video', src: '/photos/023.mp4' },
  { type: 'image', src: '/photos/024.jpg' },
  { type: 'image', src: '/photos/025.jpg' },
  { type: 'image', src: '/photos/026.jpg' },
  { type: 'image', src: '/photos/027.jpg' },
  { type: 'image', src: '/photos/028.png' },
  { type: 'image', src: '/photos/029.jpg' },
  { type: 'image', src: '/photos/030.jpg' },
  { type: 'video', src: '/photos/031.mp4' },
  { type: 'image', src: '/photos/032.jpg' },
  { type: 'video', src: '/photos/033.mp4' },
  { type: 'image', src: '/photos/034.jpg' },
  { type: 'video', src: '/photos/035.mp4' },
  { type: 'image', src: '/photos/036.jpg' },
  { type: 'image', src: '/photos/037.jpg' },
  { type: 'image', src: '/photos/038.jpg' },
  { type: 'image', src: '/photos/039.jpg' },
  { type: 'image', src: '/photos/040.jpg' },
  { type: 'image', src: '/photos/041.jpg' },
  { type: 'image', src: '/photos/042.jpg' },
  { type: 'image', src: '/photos/043.jpg' },
  { type: 'image', src: '/photos/044.jpg' },
  { type: 'video', src: '/photos/045.mp4' },
  { type: 'image', src: '/photos/046.jpg' },
  { type: 'image', src: '/photos/047.jpg' },
  { type: 'image', src: '/photos/048.jpg' },
  { type: 'video', src: '/photos/049.mp4' },
  { type: 'image', src: '/photos/050.jpg' },
  { type: 'image', src: '/photos/051.jpg' },
  { type: 'video', src: '/photos/052.mp4' },
  { type: 'image', src: '/photos/053.jpg' },
  { type: 'image', src: '/photos/054.jpg' },
  { type: 'image', src: '/photos/055.jpg' },
  { type: 'video', src: '/photos/056.mp4' },
  { type: 'image', src: '/photos/057.jpg' },
  { type: 'video', src: '/photos/058.mp4' },
  { type: 'image', src: '/photos/059.jpg' },
  { type: 'image', src: '/photos/060.jpg' },
  { type: 'video', src: '/photos/061.mp4' },
  { type: 'image', src: '/photos/062.jpg' },
  { type: 'image', src: '/photos/063.jpg' },
  { type: 'image', src: '/photos/064.jpg' },
  { type: 'image', src: '/photos/065.jpg' },
  { type: 'video', src: '/photos/066.mp4' },
  { type: 'image', src: '/photos/067.jpg' },
  { type: 'video', src: '/photos/068.mp4' },
  { type: 'image', src: '/photos/069.jpg' },
  { type: 'video', src: '/photos/070.mp4' },
  { type: 'image', src: '/photos/071.jpg' },
  { type: 'image', src: '/photos/072.jpg' },
  { type: 'video', src: '/photos/073.mp4' },
  { type: 'image', src: '/photos/074.jpg' },
  { type: 'video', src: '/photos/075.mp4' },
  { type: 'image', src: '/photos/076.jpg' },
  { type: 'video', src: '/photos/077.mp4' },
  { type: 'image', src: '/photos/078.jpg' },
  { type: 'video', src: '/photos/079.mp4' },
  { type: 'image', src: '/photos/080.jpg' },
  { type: 'video', src: '/photos/081.mp4' },
  { type: 'image', src: '/photos/082.jpg' },
  { type: 'image', src: '/photos/083.jpg' },
  { type: 'video', src: '/photos/084.mp4' },
  { type: 'image', src: '/photos/085.jpg' },
  { type: 'image', src: '/photos/086.jpg' },
  { type: 'image', src: '/photos/087.jpg' },
  { type: 'video', src: '/photos/088.mp4' },
  { type: 'image', src: '/photos/089.jpg' },
  { type: 'image', src: '/photos/090.jpg' },
  { type: 'image', src: '/photos/091.jpg' },
  { type: 'image', src: '/photos/092.jpg' },
  { type: 'image', src: '/photos/093.jpg' },
  { type: 'image', src: '/photos/094.jpg' },
  { type: 'video', src: '/photos/095.mp4' },
  { type: 'image', src: '/photos/096.jpg' },
  { type: 'video', src: '/photos/097.mp4' },
  { type: 'image', src: '/photos/098.jpg' },
  { type: 'video', src: '/photos/099.mp4' },
  { type: 'image', src: '/photos/100.jpg' },
  { type: 'image', src: '/photos/101.jpg' },
  { type: 'video', src: '/photos/102.mp4' },
  { type: 'image', src: '/photos/103.jpg' },
  { type: 'image', src: '/photos/104.jpg' },
  { type: 'image', src: '/photos/105.jpg' },
  { type: 'video', src: '/photos/106.mp4' },
  { type: 'image', src: '/photos/107.jpg' },
  { type: 'image', src: '/photos/108.jpg' },
  { type: 'image', src: '/photos/109.jpg' },
  { type: 'video', src: '/photos/110.mp4' },
  { type: 'image', src: '/photos/111.jpg' },
  { type: 'image', src: '/photos/112.jpg' },
  { type: 'image', src: '/photos/113.jpg' },
  { type: 'image', src: '/photos/114.jpg' },
  { type: 'video', src: '/photos/115.mp4' },
  { type: 'image', src: '/photos/116.jpg' },
  { type: 'image', src: '/photos/117.jpg' },
  { type: 'image', src: '/photos/118.jpg' },
  { type: 'video', src: '/photos/119.mp4' },
  { type: 'image', src: '/photos/120.jpg' },
  { type: 'video', src: '/photos/121.mp4' },
  { type: 'image', src: '/photos/122.jpg' },
  { type: 'video', src: '/photos/123.mp4' },
  { type: 'image', src: '/photos/124.jpg' },
  { type: 'image', src: '/photos/125.jpg' },
  { type: 'image', src: '/photos/126.jpg' },
  { type: 'video', src: '/photos/127.mp4' },
  { type: 'image', src: '/photos/128.jpg' },
  { type: 'video', src: '/photos/129.mp4' },
  { type: 'image', src: '/photos/130.jpg' },
  { type: 'image', src: '/photos/131.jpg' },
  { type: 'image', src: '/photos/132.jpg' },
  { type: 'image', src: '/photos/133.jpg' },
  { type: 'image', src: '/photos/134.jpg' },
  { type: 'image', src: '/photos/135.jpg' },
  { type: 'image', src: '/photos/136.jpg' },
  { type: 'image', src: '/photos/137.jpeg' },
  { type: 'image', src: '/photos/138.jpeg' },
  { type: 'image', src: '/photos/139.jpeg' }
];

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

export default function ImageCarousel() {
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