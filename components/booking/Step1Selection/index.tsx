"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Service, Professional, AvailableSlot } from "@/lib/types";

import ServiceSelector from "./ServiceSelector";
import ProfessionalSelector from "./ProfessionalSelector";
import DateSelector from "./DateSelector";
import TimeSlotGrid from "./TimeSlotGrid";

interface Step1SelectionProps {
  onStepComplete: (data: {
    service: Service;
    professional: Professional | null;
    date: string;
    timeSlot: AvailableSlot;
  }) => void;
}

interface SelectionState {
  // Selecciones actuales
  service: Service | null;
  professional: Professional | null;
  date: string | null;
  timeSlot: AvailableSlot | null;

  // Estados de carga
  loadingServices: boolean;
  loadingProfessionals: boolean;
  loadingSlots: boolean;

  // Errores
  serviceError: string | null;
  professionalError: string | null;
  slotError: string | null;

  // Datos disponibles
  availableServices: Service[];
  availableProfessionals: Professional[];
  availableSlots: AvailableSlot[];
}

export default function Step1Selection({ onStepComplete }: Step1SelectionProps) {
  const [state, setState] = useState<SelectionState>({
    service: null,
    professional: null,
    date: null,
    timeSlot: null,

    loadingServices: true,
    loadingProfessionals: false,
    loadingSlots: false,

    serviceError: null,
    professionalError: null,
    slotError: null,

    availableServices: [],
    availableProfessionals: [],
    availableSlots: [],
  });

  // === FETCH FUNCTIONS ===

  const fetchServices = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loadingServices: true, serviceError: null }));

      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("name");

      if (error) throw error;

      setState((prev) => ({
        ...prev,
        availableServices: data || [],
        loadingServices: false,
      }));
    } catch (err) {
      console.error("Error fetching services:", err);
      setState((prev) => ({
        ...prev,
        serviceError: "No pudimos cargar los servicios. Por favor, intentá de nuevo.",
        loadingServices: false,
      }));
    }
  }, []);

  const fetchProfessionals = useCallback(async (serviceId: string) => {
    try {
      setState((prev) => ({
        ...prev,
        loadingProfessionals: true,
        professionalError: null,
      }));

      const { data, error } = await supabase
        .from("professional_services")
        .select("professionals(*)")
        .eq("service_id", serviceId)
        .eq("professionals.is_active", true);

      if (error) throw error;

      // Extraer profesionales del JOIN
      const professionals = data
        .map((item: any) => item.professionals)
        .filter(Boolean);

      setState((prev) => ({
        ...prev,
        availableProfessionals: professionals,
        loadingProfessionals: false,
      }));
    } catch (err) {
      console.error("Error fetching professionals:", err);
      setState((prev) => ({
        ...prev,
        professionalError: "No pudimos cargar los profesionales. Por favor, intentá de nuevo.",
        loadingProfessionals: false,
      }));
    }
  }, []);

  const fetchAvailableSlots = useCallback(
    async (serviceId: string, professionalId: string | null, date: string) => {
      try {
        setState((prev) => ({ ...prev, loadingSlots: true, slotError: null }));

        const { data, error } = await supabase.rpc("get_available_slots", {
          p_professional_id: professionalId,
          p_service_id: serviceId,
          p_date: date,
        });

        if (error) throw error;

        setState((prev) => ({
          ...prev,
          availableSlots: data || [],
          loadingSlots: false,
        }));
      } catch (err) {
        console.error("Error fetching available slots:", err);
        setState((prev) => ({
          ...prev,
          slotError: "No pudimos cargar los horarios. Por favor, intentá de nuevo.",
          loadingSlots: false,
        }));
      }
    },
    []
  );

  // === HANDLERS ===

  const handleServiceSelect = useCallback(
    (service: Service) => {
      setState((prev) => ({
        ...prev,
        service,
        // RESETEO EN CASCADA
        professional: null,
        date: null,
        timeSlot: null,
        availableProfessionals: [],
        availableSlots: [],
      }));
    },
    []
  );

  const handleProfessionalSelect = useCallback((professional: Professional | null) => {
    setState((prev) => ({
      ...prev,
      professional,
      // RESETEO EN CASCADA
      timeSlot: null,
      availableSlots: [],
    }));
  }, []);

  const handleDateSelect = useCallback((date: string) => {
    setState((prev) => ({
      ...prev,
      date,
      // RESETEO EN CASCADA
      timeSlot: null,
      availableSlots: [],
    }));
  }, []);

  const handleTimeSlotSelect = useCallback((slot: AvailableSlot) => {
    setState((prev) => ({
      ...prev,
      timeSlot: slot,
    }));
  }, []);

  const handleRetrySlots = useCallback(() => {
    if (state.service && state.date) {
      fetchAvailableSlots(state.service.id, state.professional?.id || null, state.date);
    }
  }, [state.service, state.professional, state.date, fetchAvailableSlots]);

  // === EFFECTS ===

  // Fetch inicial de servicios
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Fetch de profesionales cuando cambia el servicio
  useEffect(() => {
    if (state.service) {
      fetchProfessionals(state.service.id);
    }
  }, [state.service, fetchProfessionals]);

  // Fetch de slots cuando cambian service, professional o date
  useEffect(() => {
    if (state.service && state.date) {
      fetchAvailableSlots(
        state.service.id,
        state.professional?.id || null,
        state.date
      );
    }
  }, [state.service, state.professional, state.date, fetchAvailableSlots]);

  // CALLBACK AUTOMÁTICO: al seleccionar timeSlot → onStepComplete
  useEffect(() => {
    if (state.service && state.date && state.timeSlot) {
      onStepComplete({
        service: state.service,
        professional: state.professional,
        date: state.date,
        timeSlot: state.timeSlot,
      });
    }
  }, [state.service, state.professional, state.date, state.timeSlot, onStepComplete]);

  // === RENDER ===

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">
            Reservá tu Turno
          </h1>
          <p className="mt-2 text-lg text-secondary">
            Completá los siguientes pasos para agendar tu visita
          </p>
        </div>

        {/* Selectores en flujo vertical */}
        <ServiceSelector
          services={state.availableServices}
          selectedService={state.service}
          loading={state.loadingServices}
          error={state.serviceError}
          onSelect={handleServiceSelect}
        />

        {state.service && (
          <ProfessionalSelector
            service={state.service}
            professionals={state.availableProfessionals}
            selectedProfessional={state.professional}
            loading={state.loadingProfessionals}
            error={state.professionalError}
            onSelect={handleProfessionalSelect}
          />
        )}

        {state.service && (
          <DateSelector
            selectedDate={state.date}
            onSelect={handleDateSelect}
          />
        )}

        {state.service && state.date && (
          <TimeSlotGrid
            slots={state.availableSlots}
            selectedSlot={state.timeSlot}
            loading={state.loadingSlots}
            error={state.slotError}
            onSelect={handleTimeSlotSelect}
            onRetry={handleRetrySlots}
          />
        )}
      </div>
    </div>
  );
}
