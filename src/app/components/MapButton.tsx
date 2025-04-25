'use client';

interface MapButtonProps {
  address: string;
  mapUrl: string;
}

export default function MapButton({ address, mapUrl }: MapButtonProps) {
  const openInNewTab = () => {
    window.open(mapUrl, '_blank');
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center space-y-2">
        <p className="text-base md:text-lg">{address}</p>
        <button
          onClick={openInNewTab}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span>Ver ubicación</span>
        </button>
      </div>
    </div>
  );
}