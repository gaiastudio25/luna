"use client";

import { useState } from "react";
import { Service, Professional } from "@/lib/types";

interface Step3DateProps {
  service: Service;
  professional: Professional | null;
  onSelectDate: (date: string) => void;
  onBack: () => void;
}

export default function Step3Date({
  service,
  professional,
  onSelectDate,
  onBack,
}: Step3DateProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Obtener la fecha mínima (hoy)
  const getMinDate = (): string => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Obtener la fecha máxima (3 meses desde hoy)
  const getMaxDate = (): string => {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split("T")[0];
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
  };

  const handleContinue = () => {
    if (selectedDate) {
      onSelectDate(selectedDate);
    }
  };

  // Formatear fecha para mostrar
  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("es-AR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="rounded-xl bg-white p-8 shadow-md">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-rose-600"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Volver</span>
        </button>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Seleccioná la Fecha</h2>
          <div className="mt-4 space-y-2">
            <p className="text-gray-600">
              Servicio: <span className="font-semibold text-rose-600">{service.name}</span>
            </p>
            <p className="text-gray-600">
              Profesional:{" "}
              <span className="font-semibold text-rose-600">
                {professional ? professional.name : "Sin preferencia"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Date Picker */}
      <div className="mx-auto max-w-md">
        <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-8">
          <label htmlFor="date-picker" className="mb-4 block text-center text-lg font-semibold text-gray-900">
            Elegí una fecha
          </label>

          <input
            id="date-picker"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={getMinDate()}
            max={getMaxDate()}
            className="w-full rounded-lg border-2 border-gray-300 p-4 text-center text-lg font-medium text-gray-900 transition-all focus:border-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-600"
          />

          {selectedDate && (
            <div className="mt-6 rounded-lg bg-rose-50 p-4">
              <p className="text-center text-sm font-medium text-rose-800">
                Fecha seleccionada:
              </p>
              <p className="mt-1 text-center text-lg font-bold capitalize text-rose-900">
                {formatDate(selectedDate)}
              </p>
            </div>
          )}
        </div>

        {/* Continue Button */}
        <div className="mt-8">
          <button
            onClick={handleContinue}
            disabled={!selectedDate}
            className={`w-full rounded-full py-4 text-lg font-semibold transition-all ${
              selectedDate
                ? "bg-rose-600 text-white hover:bg-rose-700 hover:shadow-lg"
                : "cursor-not-allowed bg-gray-300 text-gray-500"
            }`}
          >
            {selectedDate ? "Continuar" : "Seleccioná una fecha para continuar"}
          </button>
        </div>

        {/* Helper Text */}
        <div className="mt-6 rounded-lg bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-semibold">Información</p>
              <ul className="mt-2 list-disc space-y-1 pl-4">
                <li>Podés reservar hasta 3 meses por adelantado</li>
                <li>Los horarios disponibles se mostrarán en el siguiente paso</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
