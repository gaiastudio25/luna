// Database Types (from Supabase tables)

export interface Service {
  id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  buffer_minutes: number | null;
  is_active: boolean;
  created_at?: string;
}

export interface Professional {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  is_active: boolean;
  created_at?: string;
}

export interface ProfessionalService {
  professional_id: string;
  service_id: string;
  created_at?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at?: string;
}

export interface Booking {
  id: string;
  service_id: string;
  professional_id: string | null;
  client_id: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes: string | null;
  created_at?: string;
}

// Wizard State Types

export interface WizardData {
  // Step 1
  service?: Service;

  // Step 2
  professional?: Professional | null; // null = "sin preferencia"

  // Step 3 (futuro)
  date?: string;

  // Step 4 (futuro)
  timeSlot?: {
    start_time: string;
    end_time: string;
  };

  // Step 5 (futuro)
  clientData?: {
    name: string;
    email: string;
    phone: string;
    notes?: string;
  };
}

export type WizardStep = 1 | 2 | 3 | 4 | 5 | 6;

// API Response Types

export interface AvailableSlot {
  start_time: string;
  end_time: string;
}

// Helper Types

export interface ProfessionalWithServices extends Professional {
  services?: Service[];
}

// Booking Flow Types (nuevo flujo de 2 pasos)

export interface BookingFormData {
  service: Service | null;
  professional: Professional | null;
  date: string | null;
  timeSlot: AvailableSlot | null;
}

export interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export interface BookingState extends BookingFormData, ClientFormData {
  currentStep: 1 | 2 | 3; // 1 = selección, 2 = confirmación, 3 = éxito
  isSubmitting: boolean;
  submitError: string | null;
}
