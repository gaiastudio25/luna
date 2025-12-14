interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = "Cargando..." }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12" role="status" aria-busy="true">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-rose-600" />
      {message && (
        <p className="mt-4 text-gray-600">{message}</p>
      )}
    </div>
  );
}
