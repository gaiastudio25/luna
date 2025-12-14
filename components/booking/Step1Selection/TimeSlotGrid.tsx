"use client";

import { AvailableSlot } from "@/lib/types";
import { formatTime } from "@/lib/booking-helpers";
import LoadingSpinner from "../shared/LoadingSpinner";
import ErrorMessage from "../shared/ErrorMessage";
import EmptyState from "../shared/EmptyState";

interface TimeSlotGridProps {
  slots: AvailableSlot[];
  selectedSlot: AvailableSlot | null;
  loading: boolean;
  error: string | null;
  onSelect: (slot: AvailableSlot) => void;
  onRetry: () => void;
}

export default function TimeSlotGrid({
  slots,
  selectedSlot,
  loading,
  error,
  onSelect,
  onRetry,
}: TimeSlotGridProps) {
  if (loading) {
    return <LoadingSpinner message="Buscando horarios disponibles..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (slots.length === 0) {
    return (
      <EmptyState
        title="No hay horarios disponibles"
        description="Probá con otra fecha o sin preferencia de profesional"
      />
    );
  }

  return (
    <section className="space-y-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground">
          Elegí tu horario
        </h2>
        <p className="mt-2 text-secondary">
          {slots.length} {slots.length === 1 ? "horario disponible" : "horarios disponibles"}
        </p>
      </div>

      {/* Grid de horarios */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {slots.map((slot, index) => {
          const isSelected =
            selectedSlot?.start_time === slot.start_time &&
            selectedSlot?.end_time === slot.end_time;

          return (
            <button
              key={index}
              onClick={() => onSelect(slot)}
              role="button"
              aria-label={`Seleccionar horario de ${formatTime(slot.start_time)} a ${formatTime(slot.end_time)}`}
              aria-pressed={isSelected}
              className={`
                rounded-lg border-2 py-4 px-3 text-center transition-all
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                ${
                  isSelected
                    ? "border-primary bg-primary text-white shadow-lg"
                    : "border-gray-200 bg-white text-foreground hover:border-accent hover:shadow-md"
                }
              `}
            >
              <div className="text-lg font-bold">
                {formatTime(slot.start_time)}
              </div>
              <div className={`mt-1 text-xs ${isSelected ? "text-white/80" : "text-secondary"}`}>
                {formatTime(slot.end_time)}
              </div>

              {isSelected && (
                <div className="mt-2 flex items-center justify-center">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Información seleccionada */}
      {selectedSlot && (
        <div className="mx-auto max-w-md rounded-lg bg-primary/10 p-6 text-center">
          <p className="text-sm font-medium text-secondary">
            Horario seleccionado:
          </p>
          <p className="mt-2 text-2xl font-bold text-primary">
            {formatTime(selectedSlot.start_time)} - {formatTime(selectedSlot.end_time)}
          </p>
          <p className="mt-2 text-sm text-secondary">
            El turno se agendará automáticamente al confirmar
          </p>
        </div>
      )}
    </section>
  );
}
