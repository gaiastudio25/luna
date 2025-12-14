import { Service } from "./types";

/**
 * Formatea un datetime ISO a formato de hora (HH:MM)
 * @param datetime - String en formato ISO (ej: "2025-12-13T14:00:00+00:00")
 * @returns String en formato "14:00"
 */
export const formatTime = (datetime: string): string => {
  const date = new Date(datetime);
  return date.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

/**
 * Formatea una fecha a formato legible en español
 * @param dateString - String en formato "YYYY-MM-DD"
 * @returns String en formato "lunes, 13 de diciembre de 2025"
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("es-AR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Calcula la duración total de un servicio (duración + buffer)
 * @param service - Objeto Service con duration_minutes y buffer_minutes
 * @returns Duración total en minutos
 */
export const getTotalDuration = (service: Service): number => {
  return service.duration_minutes + (service.buffer_minutes || 0);
};

/**
 * Obtiene la fecha mínima permitida para reservas (hoy)
 * @returns String en formato "YYYY-MM-DD"
 */
export const getMinBookingDate = (): string => {
  return new Date().toISOString().split("T")[0];
};

/**
 * Obtiene la fecha máxima permitida para reservas (3 meses desde hoy)
 * @returns String en formato "YYYY-MM-DD"
 */
export const getMaxBookingDate = (): string => {
  const date = new Date();
  date.setMonth(date.getMonth() + 3);
  return date.toISOString().split("T")[0];
};
