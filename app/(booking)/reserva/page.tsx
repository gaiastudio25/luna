"use client";

import Step1Selection from "@/components/booking/Step1Selection";
import { Service, Professional, AvailableSlot } from "@/lib/types";

export default function ReservaPage() {
  const handleStep1Complete = (data: {
    service: Service;
    professional: Professional | null;
    date: string;
    timeSlot: AvailableSlot;
  }) => {
    console.log("✅ Paso 1 completado:", data);
    console.log("Servicio:", data.service.name);
    console.log("Profesional:", data.professional?.name || "Sin preferencia");
    console.log("Fecha:", data.date);
    console.log("Horario:", data.timeSlot.start_time, "-", data.timeSlot.end_time);
    // TODO FASE 4: Avanzar a Step 2 (formulario de datos del cliente)
  };

  return <Step1Selection onStepComplete={handleStep1Complete} />;
}
