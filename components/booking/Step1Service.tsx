"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Service } from "@/lib/types";

interface Step1ServiceProps {
  onSelectService: (service: Service) => void;
}

export default function Step1Service({ onSelectService }: Step1ServiceProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("name", { ascending: true });

      if (fetchError) throw fetchError;

      setServices(data || []);
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("No se pudieron cargar los servicios. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const getTotalDuration = (service: Service): number => {
    return service.duration_minutes + (service.buffer_minutes || 0);
  };

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-12 text-center shadow-md">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-rose-600" />
        <p className="mt-4 text-gray-600">Cargando servicios...</p>
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
        <button
          onClick={fetchServices}
          className="mt-6 rounded-full bg-rose-600 px-6 py-3 font-semibold text-white hover:bg-rose-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="rounded-xl bg-white p-12 text-center shadow-md">
        <p className="text-gray-600">No hay servicios disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-8 shadow-md">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Seleccioná tu Servicio</h2>
        <p className="mt-2 text-gray-600">Elegí el tratamiento que querés realizar</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelectService(service)}
            className="group rounded-xl border-2 border-gray-200 bg-white p-6 text-left transition-all hover:border-rose-600 hover:shadow-lg"
          >
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-rose-600">
                {service.name}
              </h3>
              {service.description && (
                <p className="mt-2 text-sm text-gray-600">{service.description}</p>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <svg className="h-5 w-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{getTotalDuration(service)} minutos</span>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-rose-600 opacity-0 transition-opacity group-hover:opacity-100">
              <span>Seleccionar</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
