"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Service, Professional, AvailableSlot } from "@/lib/types";

interface Step4TimeProps {
  service: Service;
  professional: Professional | null;
  date: string;
  onSelectTime: (slot: AvailableSlot) => void;
  onBack: () => void;
}

export default function Step4Time({
  service,
  professional,
  date,
  onSelectTime,
  onBack,
}: Step4TimeProps) {
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);

  useEffect(() => {
    fetchAvailableSlots();
  }, [service.id, professional?.id, date]);

  const fetchAvailableSlots = async () => {
  try {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.rpc(
      "get_available_slots",
      {
        p_professional_id: professional?.id,
        p_service_id: service.id,
        p_date: date,
      }
    );

    if (error) throw error;

    setSlots(data || []);
  } catch (err) {
    console.error("Error fetching available slots:", err);
    setError("No hay horarios disponibles para esta fecha.");
  } finally {
    setLoading(false);
  }
};


  const handleSlotSelect = (slot: AvailableSlot) => {
    setSelectedSlot(slot);
  };

  const handleContinue = () => {
    if (selectedSlot) {
      onSelectTime(selectedSlot);
    }
  };

  // Formatear hora (HH:MM)
  const formatTime = (datetime: string): string => {
    const date = new Date(datetime);
    return date.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // Formatear fecha para mostrar
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("es-AR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-12 text-center shadow-md">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-rose-600" />
        <p className="mt-4 text-gray-600">Buscando horarios disponibles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-white p-12 text-center shadow-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <p className="mt-4 text-red-600">{error}</p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onBack}
            className="rounded-full border-2 border-gray-600 px-6 py-3 font-semibold text-gray-600 hover:bg-gray-600 hover:text-white"
          >
            Volver
          </button>
          <button
            onClick={fetchAvailableSlots}
            className="rounded-full bg-rose-600 px-6 py-3 font-semibold text-white hover:bg-rose-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

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
          <h2 className="text-3xl font-bold text-gray-900">Seleccioná el Horario</h2>
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
            <p className="text-gray-600">
              Fecha:{" "}
              <span className="font-semibold capitalize text-rose-600">{formatDate(date)}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Available Slots */}
      {slots.length > 0 ? (
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 text-center">
            <p className="text-sm text-gray-600">
              {slots.length} {slots.length === 1 ? "horario disponible" : "horarios disponibles"}
            </p>
          </div>

          {/* Slots Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {slots.map((slot, index) => (
              <button
                key={index}
                onClick={() => handleSlotSelect(slot)}
                className={`rounded-lg border-2 py-4 px-3 text-center font-semibold transition-all ${
                  selectedSlot?.start_time === slot.start_time
                    ? "border-rose-600 bg-rose-600 text-white shadow-lg"
                    : "border-gray-200 bg-white text-gray-900 hover:border-rose-600 hover:shadow-md"
                }`}
              >
                <div className="text-lg">{formatTime(slot.start_time)}</div>
                <div className="mt-1 text-xs opacity-75">
                  {formatTime(slot.end_time)}
                </div>
              </button>
            ))}
          </div>

          {/* Selected Slot Info */}
          {selectedSlot && (
            <div className="mt-8 rounded-lg bg-rose-50 p-6">
              <p className="text-center text-sm font-medium text-rose-800">
                Horario seleccionado:
              </p>
              <p className="mt-2 text-center text-2xl font-bold text-rose-900">
                {formatTime(selectedSlot.start_time)} - {formatTime(selectedSlot.end_time)}
              </p>
              <p className="mt-2 text-center text-sm text-rose-700">
                Duración: {service.duration_minutes + (service.buffer_minutes || 0)} minutos
              </p>
            </div>
          )}

          {/* Continue Button */}
          <div className="mt-8">
            <button
              onClick={handleContinue}
              disabled={!selectedSlot}
              className={`w-full rounded-full py-4 text-lg font-semibold transition-all ${
                selectedSlot
                  ? "bg-rose-600 text-white hover:bg-rose-700 hover:shadow-lg"
                  : "cursor-not-allowed bg-gray-300 text-gray-500"
              }`}
            >
              {selectedSlot ? "Continuar" : "Seleccioná un horario para continuar"}
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl">
          <div className="rounded-xl bg-yellow-50 p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
              <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-bold text-yellow-900">
              No hay horarios disponibles
            </h3>
            <p className="mt-2 text-yellow-800">
              No encontramos turnos disponibles para esta fecha.
            </p>
            <p className="mt-4 text-sm text-yellow-700">
              Por favor, intentá con:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-yellow-700">
              <li>• Otra fecha</li>
              <li>• Otro profesional (o sin preferencia)</li>
            </ul>
            <button
              onClick={onBack}
              className="mt-6 rounded-full bg-yellow-600 px-8 py-3 font-semibold text-white hover:bg-yellow-700"
            >
              Cambiar Fecha
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
