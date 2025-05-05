'use client';

import { useState, useEffect } from 'react';

type TransitionType = 'fade' | 'slide' | 'zoom' | 'flip';

interface SpeedControlProps {
  onSpeedChange: (speed: number) => void;
  onTransitionChange: (type: TransitionType) => void;
  initialSpeed: number;
  initialTransition: TransitionType;
}

export default function SpeedControl({
  onSpeedChange,
  onTransitionChange,
  initialSpeed,
  initialTransition
}: SpeedControlProps) {
  const [speed, setSpeed] = useState(initialSpeed);
  const [transition, setTransition] = useState<TransitionType>(initialTransition);

  useEffect(() => {
    onSpeedChange(speed);
  }, [speed, onSpeedChange]);

  useEffect(() => {
    onTransitionChange(transition);
  }, [transition, onTransitionChange]);

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(e.target.value));
  };

  const handleTransitionChange = (type: TransitionType) => {
    setTransition(type);
  };

  const transitionIcons: Record<TransitionType, string> = {
    fade: '🌟',
    slide: '➡️',
    zoom: '🔍',
    flip: '🔄'
  };

  return (
    <div className="flex flex-col gap-4 min-w-[200px]">
      <div className="flex flex-col gap-2">
        <label className="text-white text-sm">Velocidad</label>
        <input
          type="range"
          min="2000"
          max="8000"
          step="500"
          value={speed}
          onChange={handleSpeedChange}
          className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-600"
        />
        <span className="text-white text-sm text-center">{(speed / 1000).toFixed(1)}s</span>
      </div>

      {/* <div className="flex justify-between gap-1">
        {Object.entries(transitionIcons).map(([type, icon]) => (
          <button
            key={type}
            onClick={() => handleTransitionChange(type as TransitionType)}
            title={type}
            className={`p-2 rounded-lg text-lg transition-all transform hover:scale-110 ${
              transition === type
                ? 'bg-blue-500 text-white shadow-lg scale-110'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {icon}
          </button>
        ))}
      </div> */}
    </div>
  );
}