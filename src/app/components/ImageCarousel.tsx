'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface MediaFile {
  type: 'image' | 'video';
  src: string;
}

// Static array of media files based on actual files in photos directory
const mediaFiles: MediaFile[] = [
  // Videos
  { type: 'video', src: '/photos/008.mp4' },
  { type: 'video', src: '/photos/010.mp4' },
  { type: 'video', src: '/photos/013.mp4' },
  { type: 'video', src: '/photos/017.mp4' },
  { type: 'video', src: '/photos/019.mp4' },
  { type: 'video', src: '/photos/023.mp4' },
  { type: 'video', src: '/photos/031.mp4' },
  { type: 'video', src: '/photos/033.mp4' },
  { type: 'video', src: '/photos/035.mp4' },
  { type: 'video', src: '/photos/045.mp4' },
  { type: 'video', src: '/photos/049.mp4' },
  { type: 'video', src: '/photos/052.mp4' },
  { type: 'video', src: '/photos/056.mp4' },
  { type: 'video', src: '/photos/058.mp4' },
  { type: 'video', src: '/photos/061.mp4' },
  { type: 'video', src: '/photos/066.mp4' },
  { type: 'video', src: '/photos/068.mp4' },
  { type: 'video', src: '/photos/070.mp4' },
  { type: 'video', src: '/photos/073.mp4' },
  { type: 'video', src: '/photos/075.mp4' },
  { type: 'video', src: '/photos/077.mp4' },
  { type: 'video', src: '/photos/079.mp4' },
  { type: 'video', src: '/photos/081.mp4' },
  { type: 'video', src: '/photos/084.mp4' },
  { type: 'video', src: '/photos/088.mp4' },
  { type: 'video', src: '/photos/095.mp4' },
  { type: 'video', src: '/photos/097.mp4' },
  { type: 'video', src: '/photos/099.mp4' },
  { type: 'video', src: '/photos/102.mp4' },
  { type: 'video', src: '/photos/106.mp4' },
  { type: 'video', src: '/photos/110.mp4' },
  { type: 'video', src: '/photos/115.mp4' },
  { type: 'video', src: '/photos/119.mp4' },
  { type: 'video', src: '/photos/121.mp4' },
  { type: 'video', src: '/photos/123.mp4' },
  { type: 'video', src: '/photos/127.mp4' },
  { type: 'video', src: '/photos/129.mp4' },
  // Images
  { type: 'image', src: '/photos/000.jpeg' },
  { type: 'image', src: '/photos/001.jpg' },
  { type: 'image', src: '/photos/002.jpg' },
  { type: 'image', src: '/photos/003.jpg' },
  { type: 'image', src: '/photos/004.jpg' },
  { type: 'image', src: '/photos/005.jpg' },
  { type: 'image', src: '/photos/006.jpg' },
  { type: 'image', src: '/photos/007.jpg' },
  { type: 'image', src: '/photos/009.jpg' },
  { type: 'image', src: '/photos/011.jpg' },
  { type: 'image', src: '/photos/012.jpg' },
  { type: 'image', src: '/photos/014.jpg' },
  { type: 'image', src: '/photos/015.jpg' },
  { type: 'image', src: '/photos/016.jpg' },
  { type: 'image', src: '/photos/018.jpg' },
  { type: 'image', src: '/photos/020.jpg' },
  { type: 'image', src: '/photos/021.jpg' },
  { type: 'image', src: '/photos/022.jpg' },
  { type: 'image', src: '/photos/024.jpg' },
  { type: 'image', src: '/photos/025.jpg' },
  { type: 'image', src: '/photos/026.jpg' },
  { type: 'image', src: '/photos/027.jpg' },
  { type: 'image', src: '/photos/028.png' },
  { type: 'image', src: '/photos/029.jpg' },
  { type: 'image', src: '/photos/030.jpg' },
  { type: 'image', src: '/photos/032.jpg' },
  { type: 'image', src: '/photos/034.jpg' },
  { type: 'image', src: '/photos/036.jpg' },
  { type: 'image', src: '/photos/037.jpg' },
  { type: 'image', src: '/photos/038.jpg' },
  { type: 'image', src: '/photos/039.jpg' },
  { type: 'image', src: '/photos/040.jpg' },
  { type: 'image', src: '/photos/041.jpg' },
  { type: 'image', src: '/photos/042.jpg' },
  { type: 'image', src: '/photos/043.jpg' },
  { type: 'image', src: '/photos/044.jpg' },
  { type: 'image', src: '/photos/046.jpg' },
  { type: 'image', src: '/photos/047.jpg' },
  { type: 'image', src: '/photos/048.jpg' },
  { type: 'image', src: '/photos/050.jpg' },
  { type: 'image', src: '/photos/051.jpg' },
  { type: 'image', src: '/photos/053.jpg' },
  { type: 'image', src: '/photos/054.jpg' },
  { type: 'image', src: '/photos/055.jpg' },
  { type: 'image', src: '/photos/057.jpg' },
  { type: 'image', src: '/photos/059.jpg' },
  { type: 'image', src: '/photos/060.jpg' },
  { type: 'image', src: '/photos/062.jpg' },
  { type: 'image', src: '/photos/063.jpg' },
  { type: 'image', src: '/photos/064.jpg' },
  { type: 'image', src: '/photos/065.jpg' },
  { type: 'image', src: '/photos/067.jpg' },
  { type: 'image', src: '/photos/069.jpg' },
  { type: 'image', src: '/photos/071.jpg' },
  { type: 'image', src: '/photos/072.jpg' },
  { type: 'image', src: '/photos/074.jpg' },
  { type: 'image', src: '/photos/076.jpg' },
  { type: 'image', src: '/photos/078.jpg' },
  { type: 'image', src: '/photos/080.jpg' },
  { type: 'image', src: '/photos/082.jpg' },
  { type: 'image', src: '/photos/083.jpg' },
  { type: 'image', src: '/photos/085.jpg' },
  { type: 'image', src: '/photos/086.jpg' },
  { type: 'image', src: '/photos/087.jpg' },
  { type: 'image', src: '/photos/089.jpg' },
  { type: 'image', src: '/photos/090.jpg' },
  { type: 'image', src: '/photos/091.jpg' },
  { type: 'image', src: '/photos/092.jpg' },
  { type: 'image', src: '/photos/093.jpg' },
  { type: 'image', src: '/photos/094.jpg' },
  { type: 'image', src: '/photos/096.jpg' },
  { type: 'image', src: '/photos/098.jpg' },
  { type: 'image', src: '/photos/100.jpg' },
  { type: 'image', src: '/photos/101.jpg' },
  { type: 'image', src: '/photos/103.jpg' },
  { type: 'image', src: '/photos/104.jpg' },
  { type: 'image', src: '/photos/105.jpg' },
  { type: 'image', src: '/photos/107.jpg' },
  { type: 'image', src: '/photos/108.jpg' },
  { type: 'image', src: '/photos/109.jpg' },
  { type: 'image', src: '/photos/111.jpg' },
  { type: 'image', src: '/photos/112.jpg' },
  { type: 'image', src: '/photos/113.jpg' },
  { type: 'image', src: '/photos/114.jpg' },
  { type: 'image', src: '/photos/116.jpg' },
  { type: 'image', src: '/photos/117.jpg' },
  { type: 'image', src: '/photos/118.jpg' },
  { type: 'image', src: '/photos/120.jpg' },
  { type: 'image', src: '/photos/122.jpg' },
  { type: 'image', src: '/photos/124.jpg' },
  { type: 'image', src: '/photos/125.jpg' },
  { type: 'image', src: '/photos/126.jpg' },
  { type: 'image', src: '/photos/128.jpg' },
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
      // Find a different image to swap with
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
  const [shuffledMedia, setShuffledMedia] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Shuffle media files on component mount and ensure no repeats
    const shuffled = ensureNoRepeats(shuffleArray([...mediaFiles]));
    setShuffledMedia(shuffled);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentMediaIndex((prevIndex) => (prevIndex + 2) % shuffledMedia.length);
        setIsTransitioning(false);
      }, 500); // Half of the transition duration
    }, 3000); // Change media every 2 seconds to match video duration

    return () => clearInterval(interval);
  }, [shuffledMedia.length, isLoading]);

  if (isLoading || shuffledMedia.length === 0) {
    return (
      <div className="relative w-full h-full bg-black">
        <div className="absolute inset-y-0 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  const currentMedia = shuffledMedia[currentMediaIndex];
  const nextMedia = shuffledMedia[(currentMediaIndex + 1) % shuffledMedia.length];

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Left gradient */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />

      {/* Right gradient */}
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

      {/* Media container */}
      <div className="flex flex-col md:flex-row w-full h-full">
        {[currentMedia, nextMedia].map((media, index) => (
          <div
            key={`${media.src}-${index}`}
            className={`relative w-full md:w-1/2 h-1/2 md:h-full transition-opacity duration-1000 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {media.type === 'image' ? (
              <div className="relative w-full h-full">
                <Image
                  src={media.src}
                  alt={`Slide ${currentMediaIndex + index + 1}`}
                  fill
                  className="object-cover object-[center_30%]"
                  priority={index === 0}
                />
              </div>
            ) : (
              <video
                src={media.src}
                className="w-full h-full object-cover object-[center_30%]"
                autoPlay
                muted
                loop
                playsInline
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}