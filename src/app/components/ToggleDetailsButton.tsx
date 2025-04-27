'use client';

import { useEffect } from 'react';

export default function ToggleDetailsButton() {
  useEffect(() => {
    // Hide details by default when component mounts
    const content = document.getElementById('invitation-details');
    if (content) {
      content.classList.add('hidden');
    }
  }, []);

  return (
    <button
      onClick={async () => {
        const content = document.getElementById('invitation-details');
        const icon = document.getElementById('collapse-icon');
        const toggleText = document.getElementById('toggle-text');

        if (content && icon && toggleText) {
          content.classList.toggle('hidden');
          icon.classList.toggle('rotate-180');
          toggleText.textContent = content.classList.contains('hidden')
            ? 'Mostrar detalles'
            : 'Ocultar detalles';
        }
      }}
      type="button"
      className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
    >
      <span className="text-sm md:text-base font-medium">
        <span id="toggle-text">
          <h3 className="text-base md:text-lg font-bold text-yellow-300">¡IMPORTANTE!</h3>
        </span>
        <p>Por favor confirma tu asistencia antes del 8 de Mayo</p>
      </span>
      <svg
        id="collapse-icon"
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 transition-transform duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}