"use client";

import { formatDate, getMinBookingDate, getMaxBookingDate } from "@/lib/booking-helpers";

interface DateSelectorProps {
  selectedDate: string | null; // formato "YYYY-MM-DD"
  onSelect: (date: string) => void;
}

export default function DateSelector({
  selectedDate,
  onSelect,
}: DateSelectorProps) {
  const minDate = getMinBookingDate();
  const maxDate = getMaxBookingDate();

  return (
    <section className="space-y-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground">
          ¿Qué día te conviene?
        </h2>
        <p className="mt-2 text-secondary">
          Seleccioná la fecha para tu turno
        </p>
      </div>

      <div className="mx-auto max-w-md">
        <div className="rounded-lg border-2 border-gray-200 bg-white p-6 shadow-sm">
          <label
            htmlFor="date-input"
            className="block text-sm font-semibold text-foreground"
          >
            Fecha del turno
          </label>

          <input
            id="date-input"
            type="date"
            min={minDate}
            max={maxDate}
            value={selectedDate || ""}
            onChange={(e) => onSelect(e.target.value)}
            aria-describedby="date-help"
            className={`
              mt-3 w-full rounded-lg border-2 px-4 py-3 text-lg
              transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              ${
                selectedDate
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 hover:border-accent"
              }
            `}
          />

          <p id="date-help" className="mt-2 text-sm text-secondary">
            Podés reservar desde hoy hasta {formatDate(maxDate)}
          </p>

          {/* Preview de la fecha seleccionada */}
          {selectedDate && (
            <div className="mt-4 rounded-md bg-primary/10 px-4 py-3 text-center">
              <p className="text-sm font-medium text-secondary">
                Fecha seleccionada:
              </p>
              <p className="mt-1 text-lg font-bold capitalize text-primary">
                {formatDate(selectedDate)}
              </p>
            </div>
          )}
        </div>

        {/* Información adicional */}
        <div className="mt-4 rounded-lg bg-blue-50 p-4">
          <div className="flex gap-3">
            <svg
              className="h-6 w-6 flex-shrink-0 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-blue-800">
              Los horarios disponibles se mostrarán según la fecha que elijas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
