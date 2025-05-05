import Link from 'next/link';

export default function BackButton() {
  return (
    <Link
      href="/"
      className="fixed top-4 left-4 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
      aria-label="Volver a la página principal"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    </Link>
  );
}