"use client";

import Link from "next/link";
import { useState } from "react";
import content from "@/data/content.json";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { name } = content.site;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Profesionales", href: "/profesionales" },
    { name: "Servicios", href: "/servicios" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            {name}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 transition-colors hover:text-rose-600"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/reserva"
              className="rounded-full bg-rose-600 px-6 py-2.5 font-semibold text-white transition-all hover:bg-rose-700 hover:shadow-md"
            >
              Reservar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="border-t border-gray-100 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 transition-colors hover:text-rose-600"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/reserva"
                className="inline-block rounded-full bg-rose-600 px-6 py-2.5 text-center font-semibold text-white transition-all hover:bg-rose-700"
                onClick={() => setIsOpen(false)}
              >
                Reservar
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
