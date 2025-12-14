# 🧾 CLAUDE.md — Sistema de Reservas por Horas (Salón de Belleza · Estética Natural)

Este documento define **el contexto completo del proyecto**, decisiones técnicas, lineamientos de diseño y alcance esperado. Está pensado para que Claude (o cualquier LLM) pueda **retomar el proyecto desde cero sin perder nada**, manteniendo coherencia técnica y estética.

---

## 🎯 Objetivo del Proyecto

Construir un **sistema de reservas por horas para un salón de belleza**, permitiendo a clientes reservar servicios con profesionales disponibles, respetando horarios, bloqueos y evitando solapamientos.

El sistema debe ser:

- Robusto a nivel base de datos
- Seguro (backend valida todo)
- Escalable (múltiples profesionales y servicios)
- **Cálido, claro y natural para el usuario final**

---

## 🌿 Dirección Estética & UX (Principio Guía)

El frontend representa un **salón de belleza con estética natural**, enfocada en bienestar, calma y cercanía.

### Sensaciones a transmitir

- Tranquilidad
- Confianza
- Belleza real / sin artificios
- Orden y claridad

### Evitar

- Interfaces cargadas
- Colores estridentes
- Lenguaje técnico visible al usuario
- Flujos confusos o abruptos

---

## 🎨 Lineamientos Visuales

### Paleta de colores (referencial)

- Blanco cálido / crema (base)
- Verde salvia / oliva suave (principal)
- Arena / beige claro (secundario)
- Marrón suave o verde oscuro (acento)

> El color de acento se utiliza **solo** para CTAs y estados activos.

### Tipografía

- **Títulos:** Serif suave o sans humanista (sensación orgánica)
- **Texto:** Sans clara y legible

Reglas:

- Jerarquía marcada
- Mucho espacio en blanco
- Nada comprimido

---

## 🧭 Principios de UX

- Un paso por pantalla cuando sea posible
- Feedback visual claro (selecciones, estados)
- CTA único y dominante por vista
- Lenguaje simple y humano

Ejemplo:
❌ “Seleccione un slot disponible”
✅ “Elegí el horario que mejor te quede”

---

## 🧱 Stack Tecnológico

- **Backend / DB:** Supabase (PostgreSQL 15+)
- **Frontend:** Next.js / React
- **Auth (futuro):** Supabase Auth
- **Emails (futuro):** servicio externo (fuera de scope actual)

---

## 🗂️ Modelo de Datos (Resumen)

### Tablas principales (7)

1. **professionals** — Profesionales del salón
2. **services** — Servicios ofrecidos (duración + `buffer_minutes`)
3. **professional_services** — Relación N:N
4. **professional_availability** — Horarios semanales
5. **availability_blocks** — Bloqueos puntuales
6. **clients** — Clientes (email único)
7. **bookings** — Reservas con rango horario

Estados: `pending`, `confirmed`, `cancelled`, `completed`

---

## ⛔ Reglas Críticas de Negocio

- No puede haber **reservas solapadas** para un mismo profesional
- El tiempo real del turno = `duration_minutes + buffer_minutes`
- Solo `pending` y `confirmed` bloquean horarios
- `cancelled` y `completed` liberan el slot

---

## 🔒 Prevención de Solapamientos

Implementado con **EXCLUDE CONSTRAINT** usando `tsrange` + `btree_gist`:

- PostgreSQL impide automáticamente reservas solapadas
- Es la última línea de defensa

---

## 🧠 Lógica de Disponibilidad

Función RPC:

`get_available_slots(professional_id, service_id, date)`

Flujo:

1. Obtener duración + buffer del servicio
2. Obtener disponibilidad semanal
3. Restar bloqueos
4. Restar reservas
5. Generar slots cada 15 o 30 minutos
6. Retornar slots válidos

---

## 🌱 Flujo de Usuario (Reserva)

El flujo debe sentirse **natural y sin fricción**:

1. Elegir servicio
2. Elegir profesional (o “sin preferencia”)
3. Elegir fecha
4. Elegir horario
5. Completar datos personales
6. Confirmar reserva

Cada paso:

- Claro
- Breve
- Visualmente liviano

---

## 🔁 Creación de Cliente y Reserva

- Cliente se crea o actualiza al confirmar
- Email como clave única
- Operación atómica (transacción)

---

## 🔄 Estados de la Reserva

- `pending` — creada por el cliente
- `confirmed` — confirmada
- `completed` — servicio realizado
- `cancelled` — cancelada (irreversible)

---

## 🛠️ Qué Ya Está Definido

- Modelo de datos completo
- SQL compatible con Supabase
- Restricciones anti‑solapamiento
- Función de disponibilidad

---

## 🚀 Foco Actual del Proyecto

❗ **No redefinir base de datos ni funciones existentes**

A partir de este punto, el foco es:

- Frontend
- UX del flujo de reservas
- Estructura de páginas
- Componentes reutilizables
- Contenido manejado vía JSON
- Integración Supabase desde el frontend

---

## 📌 Principio Rector

> El frontend guía la experiencia.
> El backend y la base de datos garantizan la verdad.

Nunca confiar en el frontend para reglas críticas.

---

Fin del contexto del proyecto.
