interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="rounded-xl bg-white p-12 text-center shadow-md" role="alert">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <svg
          className="h-8 w-8 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <p className="mt-4 text-red-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 rounded-full bg-rose-600 px-6 py-3 font-semibold text-white transition-all hover:bg-rose-700"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}
