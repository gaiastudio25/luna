interface EmptyStateProps {
  title: string;
  description?: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-xl bg-yellow-50 p-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
        <svg
          className="h-8 w-8 text-yellow-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="mt-4 text-xl font-bold text-yellow-900">{title}</h3>
      {description && (
        <p className="mt-2 text-yellow-800">{description}</p>
      )}
    </div>
  );
}
