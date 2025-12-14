import Link from "next/link";
import content from "@/data/content.json";

export default function ProfessionalsPage() {
  const { header, items } = content.professionals;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-rose-50 to-purple-50 py-16 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold text-gray-900">{header.title}</h1>
          <p className="mt-4 text-xl text-gray-600">{header.subtitle}</p>
          <p className="mt-6 text-lg text-gray-700">{header.description}</p>
        </div>
      </section>

      {/* Professionals Grid */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((professional) => (
              <div
                key={professional.id}
                className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl"
              >
                {/* Photo */}
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-rose-100">
                  <div className="flex h-full items-center justify-center text-gray-400">
                    <svg className="h-32 w-32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{professional.name}</h3>
                    <p className="text-sm font-medium text-rose-600">{professional.title}</p>
                    <p className="mt-1 text-xs text-gray-500">{professional.experience} de experiencia</p>
                  </div>

                  <p className="text-gray-700">{professional.longBio}</p>

                  {/* Specialties */}
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-900">Especialidades</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {professional.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-900">Certificaciones</h4>
                    <ul className="mt-2 space-y-1">
                      {professional.certifications.map((cert, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs text-gray-600">
                          <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Instagram */}
                  {professional.instagram && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span>{professional.instagram}</span>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-6">
                    <Link
                      href={`/reserva?professional=${professional.id}`}
                      className="block w-full rounded-full bg-rose-600 py-3 text-center font-semibold text-white transition-all hover:bg-rose-700"
                    >
                      Reservar con {professional.name.split(' ')[0]}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-16 px-6 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">¿Querés reservar con alguien del equipo?</h2>
          <p className="mt-4 text-lg text-gray-300">
            Elegí tu servicio favorito y nuestro sistema te mostrará los profesionales disponibles
          </p>
          <div className="mt-8">
            <Link
              href="/servicios"
              className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-gray-900 transition-all hover:bg-gray-100"
            >
              Ver Servicios
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
