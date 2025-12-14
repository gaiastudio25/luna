"use client";

import { Service, Professional } from "@/lib/types";
import LoadingSpinner from "../shared/LoadingSpinner";
import ErrorMessage from "../shared/ErrorMessage";
import EmptyState from "../shared/EmptyState";

interface ProfessionalSelectorProps {
  service: Service;
  professionals: Professional[];
  selectedProfessional: Professional | null; // null = "Sin Preferencia"
  loading: boolean;
  error: string | null;
  onSelect: (professional: Professional | null) => void;
}

export default function ProfessionalSelector({
  service,
  professionals,
  selectedProfessional,
  loading,
  error,
  onSelect,
}: ProfessionalSelectorProps) {
  if (loading) {
    return <LoadingSpinner message="Cargando profesionales..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (professionals.length === 0) {
    return (
      <EmptyState
        title="No hay profesionales disponibles"
        description={`No encontramos profesionales para ${service.name}`}
      />
    );
  }

  const isNoPreferenceSelected = selectedProfessional === null;

  return (
    <section className="space-y-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground">
          ¿Con quién querés atenderte?
        </h2>
        <p className="mt-2 text-secondary">Para {service.name}</p>
      </div>

      {/* Opción "Sin Preferencia" */}
      <button
        onClick={() => onSelect(null)}
        role="button"
        aria-label="Sin preferencia de profesional"
        aria-pressed={isNoPreferenceSelected}
        className={`
          w-full rounded-lg border-2 border-dashed p-6 text-center transition-all
          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
          ${
            isNoPreferenceSelected
              ? "border-primary bg-primary/10 shadow-md"
              : "border-gray-300 bg-white hover:border-accent hover:shadow-sm"
          }
        `}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className={`
            flex h-16 w-16 items-center justify-center rounded-full
            ${
              isNoPreferenceSelected
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-400"
            }
          `}
          >
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>

          <div>
            <h3 className="text-xl font-bold text-foreground">
              Sin Preferencia
            </h3>
            <p className="mt-1 text-sm text-secondary">
              El profesional disponible te atenderá
            </p>
          </div>

          {isNoPreferenceSelected && (
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
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
        </div>
      </button>

      {/* Grid de Profesionales */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {professionals.map((professional) => {
          const isSelected = selectedProfessional?.id === professional.id;

          return (
            <button
              key={professional.id}
              onClick={() => onSelect(professional)}
              role="button"
              aria-label={`Seleccionar profesional ${professional.name}`}
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
              <div className="flex items-start gap-4">
                {/* Avatar Placeholder con gradiente sage→terracotta */}
                <div
                  className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white"
                  aria-hidden="true"
                >
                  <span className="text-2xl font-bold">
                    {professional.name.charAt(0).toUpperCase()}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground">
                    {professional.name}
                  </h3>

                  {professional.email && (
                    <p className="mt-1 text-sm text-secondary">
                      {professional.email}
                    </p>
                  )}

                  {professional.phone && (
                    <p className="mt-1 text-sm text-secondary">
                      {professional.phone}
                    </p>
                  )}
                </div>
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
