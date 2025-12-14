"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Service, Professional } from "@/lib/types";

interface Step2ProfessionalProps {
  service: Service;
  onSelectProfessional: (professional: Professional | null) => void;
  onBack: () => void;
}

export default function Step2Professional({
  service,
  onSelectProfessional,
  onBack,
}: Step2ProfessionalProps) {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfessionals();
  }, [service.id]);

 const fetchProfessionals = async () => {
  try {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("professional_services")
      .select(`
        professional_id,
        professionals!inner (
          id,
          name,
          role,
          specialty,
          image_url,
          is_active
        )
      `)
      .eq("service_id", service.id)
      .eq("professionals.is_active", true);

    if (error) throw error;

    const professionalsList =
      data?.map((item: any) => item.professionals).filter(Boolean) || [];

    setProfessionals(professionalsList);
  } catch (err) {
    console.error("Error fetching professionals:", err);
    setError("No se pudieron cargar los profesionales.");
  } finally {
    setLoading(false);
  }
};


  if (loading) {
    return (
      <div className="rounded-xl bg-white p-12 text-center shadow-md">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-rose-600" />
        <p className="mt-4 text-gray-600">Cargando profesionales...</p>
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
            onClick={fetchProfessionals}
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
          <h2 className="text-3xl font-bold text-gray-900">Seleccioná tu Profesional</h2>
          <p className="mt-2 text-gray-600">
            Para <span className="font-semibold text-rose-600">{service.name}</span>
          </p>
        </div>
      </div>

      {/* "Sin Preferencia" Option */}
      <div className="mb-6">
        <button
          onClick={() => onSelectProfessional(null)}
          className="group w-full rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition-all hover:border-rose-600 hover:bg-rose-50"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md group-hover:bg-rose-600">
            <svg className="h-8 w-8 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-bold text-gray-900 group-hover:text-rose-600">
            Sin Preferencia
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Dejá que el sistema asigne el profesional disponible
          </p>
        </button>
      </div>

      {/* Professionals Grid */}
      {professionals.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {professionals.map((professional) => (
            <button
              key={professional.id}
              onClick={() => onSelectProfessional(professional)}
              className="group rounded-xl border-2 border-gray-200 bg-white p-6 text-left transition-all hover:border-rose-600 hover:shadow-lg"
            >
              {/* Avatar Placeholder */}
              <div className="mb-4 flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-rose-100">
                  <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>

              {/* Name */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-rose-600">
                  {professional.name}
                </h3>
              </div>

              {/* Select Button */}
              <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-rose-600 opacity-0 transition-opacity group-hover:opacity-100">
                <span>Seleccionar</span>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-yellow-50 p-6 text-center">
          <p className="text-yellow-800">
            No hay profesionales disponibles para este servicio en este momento.
          </p>
          <p className="mt-2 text-sm text-yellow-700">
            Por favor, seleccioná "Sin Preferencia" para continuar.
          </p>
        </div>
      )}
    </div>
  );
}
