interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const steps = [
    { number: 1, label: "Servicio" },
    { number: 2, label: "Profesional" },
    { number: 3, label: "Fecha" },
    { number: 4, label: "Horario" },
    { number: 5, label: "Datos" },
    { number: 6, label: "Confirmar" },
  ];

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-1 items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-all ${
                  step.number === currentStep
                    ? "bg-rose-600 text-white"
                    : step.number < currentStep
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.number < currentStep ? (
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  step.number === currentStep
                    ? "text-rose-600"
                    : step.number < currentStep
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 px-2">
                <div
                  className={`h-1 rounded-full transition-all ${
                    step.number < currentStep ? "bg-green-600" : "bg-gray-200"
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
