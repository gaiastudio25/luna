"use client";

import Link from "next/link";
import { useState } from "react";
import content from "@/data/content.json";

export default function ServicesPage() {
  const { header, categories } = content.services;
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const currentCategory = categories.find((cat) => cat.id === activeCategory);

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

      {/* Category Tabs */}
      <section className="sticky top-20 z-40 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex gap-2 overflow-x-auto py-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex-shrink-0 rounded-full px-6 py-2 font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-rose-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Category Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              {currentCategory?.icon} {currentCategory?.name}
            </h2>
            <p className="mt-2 text-gray-600">{currentCategory?.description}</p>
          </div>

          {/* Services List */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentCategory?.services.map((service) => (
              <div
                key={service.id}
                className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl"
              >
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                    <p className="mt-2 text-gray-700">{service.description}</p>
                  </div>

                  {/* Duration and Price */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{service.duration}</span>
                    </div>
                    <div className="text-lg font-bold text-rose-600">{service.price}</div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900">Incluye:</h4>
                    <ul className="mt-2 space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Note (if exists) */}
                  {service.note && (
                    <div className="mb-4 rounded-lg bg-amber-50 p-3">
                      <p className="text-xs text-amber-800">{service.note}</p>
                    </div>
                  )}

                  {/* CTA */}
                  <Link
                    href={`/reserva?service=${service.id}`}
                    className="block w-full rounded-full bg-rose-600 py-3 text-center font-semibold text-white transition-all hover:bg-rose-700"
                  >
                    Reservar Este Servicio
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-16 px-6 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">¿No encontrás lo que buscás?</h2>
          <p className="mt-4 text-lg text-gray-300">
            Contactanos y te asesoramos sobre el mejor tratamiento para vos
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contacto"
              className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-gray-900 transition-all hover:bg-gray-100"
            >
              Contactanos
            </Link>
            <Link
              href="/reserva"
              className="inline-block rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-all hover:bg-white hover:text-gray-900"
            >
              Reservar Ahora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
