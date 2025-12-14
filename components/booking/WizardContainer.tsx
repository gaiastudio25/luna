"use client";

import { useState } from "react";
import { WizardData, WizardStep, Service, Professional, AvailableSlot } from "@/lib/types";
import StepIndicator from "./StepIndicator";
import Step1Service from "./Step1Service";
import Step2Professional from "./Step2Professional";
import Step3Date from "./Step3Date";
import Step4Time from "./Step4Time";

export default function WizardContainer() {
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [wizardData, setWizardData] = useState<WizardData>({});

  // Handler para Step 1: Selección de Servicio
  const handleServiceSelect = (service: Service) => {
    setWizardData((prev) => ({
      ...prev,
      service,
    }));
    setCurrentStep(2);
  };

  // Handler para Step 2: Selección de Profesional
  const handleProfessionalSelect = (professional: Professional | null) => {
    setWizardData((prev) => ({
      ...prev,
      professional,
    }));
    setCurrentStep(3);
  };

  // Handler para Step 3: Selección de Fecha
  const handleDateSelect = (date: string) => {
    setWizardData((prev) => ({
      ...prev,
      date,
    }));
    setCurrentStep(4);
  };

  // Handler para Step 4: Selección de Horario
  const handleTimeSelect = (slot: AvailableSlot) => {
    setWizardData((prev) => ({
      ...prev,
      timeSlot: {
        start_time: slot.start_time,
        end_time: slot.end_time,
      },
    }));
    // TODO: avanzar a Step 5 cuando esté implementado
    setCurrentStep(5);
  };

  // Handler para retroceder
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as WizardStep);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={6} />

        {/* Step Content */}
        <div className="mt-8">
          {currentStep === 1 && (
            <Step1Service onSelectService={handleServiceSelect} />
          )}

          {currentStep === 2 && wizardData.service && (
            <Step2Professional
              service={wizardData.service}
              onSelectProfessional={handleProfessionalSelect}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && wizardData.service && (
            <Step3Date
              service={wizardData.service}
              professional={wizardData.professional || null}
              onSelectDate={handleDateSelect}
              onBack={handleBack}
            />
          )}

          {currentStep === 4 && wizardData.service && wizardData.date && (
            <Step4Time
              service={wizardData.service}
              professional={wizardData.professional || null}
              date={wizardData.date}
              onSelectTime={handleTimeSelect}
              onBack={handleBack}
            />
          )}

          {currentStep === 5 && (
            <div className="rounded-xl bg-white p-12 text-center shadow-md">
              <h2 className="text-2xl font-bold text-gray-900">
                Paso 5: Datos del Cliente
              </h2>
              <p className="mt-4 text-gray-600">
                Este paso aún no está implementado
              </p>
              <button
                onClick={handleBack}
                className="mt-6 rounded-full bg-gray-600 px-6 py-3 font-semibold text-white hover:bg-gray-700"
              >
                Volver
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
