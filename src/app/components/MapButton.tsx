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
          className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2 shadow-sm"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C7.8 2 4 5.22 4 9.2C4 11.52 5.13 13.45 6.59 15.12C8.25 17.01 10.24 18.47 11.65 19.51C11.87 19.67 12.13 19.67 12.35 19.51C13.76 18.47 15.75 17.01 17.41 15.12C18.87 13.45 20 11.52 20 9.2C20 5.22 16.2 2 12 2Z" fill="#EA4335"/>
            <path d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z" fill="white"/>
          </svg>
          <span>Abrir en Google Maps</span>
        </button>
      </div>
    </div>
  );
}