"use client";

import { Service } from "@/lib/types";
import { getTotalDuration } from "@/lib/booking-helpers";
import LoadingSpinner from "../shared/LoadingSpinner";
import ErrorMessage from "../shared/ErrorMessage";
import EmptyState from "../shared/EmptyState";

interface ServiceSelectorProps {
  services: Service[];
  selectedService: Service | null;
  loading: boolean;
  error: string | null;
  onSelect: (service: Service) => void;
}

export default function ServiceSelector({
  services,
  selectedService,
  loading,
  error,
  onSelect,
}: ServiceSelectorProps) {
  if (loading) {
    return <LoadingSpinner message="Cargando servicios disponibles..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (services.length === 0) {
    return (
      <EmptyState
        title="No hay servicios disponibles"
        description="Por favor, contactanos para más información"
      />
    );
  }

  return (
    <section className="space-y-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground">
          ¿Qué servicio necesitás?
        </h2>
        <p className="mt-2 text-secondary">
          Seleccioná el servicio que querés reservar
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const isSelected = selectedService?.id === service.id;
          const totalDuration = getTotalDuration(service);

          return (
            <button
              key={service.id}
              onClick={() => onSelect(service)}
              role="button"
              aria-label={`Seleccionar servicio ${service.name}`}
              aria-pressed={isSelected}
              className={`
                rounded-lg border-2 p-6 text-left transition-all
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                ${
                  isSelected
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-gray-200 bg-white hover:border-accent hover:shadow-sm"
                }
              `}
            >
              <h3 className="text-xl font-bold text-foreground">
                {service.name}
              </h3>

              {service.description && (
                <p className="mt-2 text-sm text-secondary line-clamp-2">
                  {service.description}
                </p>
              )}

              <div className="mt-4 flex items-center gap-2 text-sm text-primary">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-semibold">{totalDuration} minutos</span>
              </div>

              {isSelected && (
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
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
                  <span>Seleccionado</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
