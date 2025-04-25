'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function BackgroundVideo() {
  const [isVideoSupported, setIsVideoSupported] = useState(true);

  useEffect(() => {
    // Check if video is supported
    const video = document.createElement('video');
    setIsVideoSupported(!!video.canPlayType);
  }, []);

  if (isVideoSupported) {
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/background.mp4" type="video/mp4" />
        {/* Fallback to image if video fails to load */}
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </video>
    );
  }

  // Fallback to image if video is not supported
  return (
    <Image
      src="/background.jpg"
      alt="Background"
      fill
      className="object-cover"
      priority
    />
  );
}