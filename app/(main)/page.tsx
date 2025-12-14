import Link from "next/link";
import content from "@/data/content.json";

export default function Home() {
  const { hero, featuredServices, featuredProfessionals, ctaSection, contactPreview } = content.home;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-24 px-6 md:py-32 lg:py-40 bg-[url('/images/hero-texture.jpg')] bg-cover bg-center bg-no-repeat overflow-hidden">
        {/* Overlay for better text readability if needed, though light bg is preferred */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[1px]"></div>
        
        <div className="relative mx-auto max-w-4xl text-center space-y-8 animate-fade-in">
          <span className="text-sm font-medium tracking-[0.2em] text-accent uppercase">
            Bienvenida a
          </span>
          <h1 className="text-5xl font-serif font-medium text-foreground md:text-6xl lg:text-7xl leading-tight">
            {hero.title}
          </h1>
          <p className="mx-auto max-w-2xl text-xl font-light text-secondary md:text-2xl leading-relaxed">
            {hero.subtitle}
          </p>
          <div className="pt-8">
            <Link
              href={hero.ctaLink}
              className="inline-block rounded-full bg-accent px-10 py-4 text-lg font-medium text-white transition-all hover:bg-[#A9846E] hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {hero.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy / Intro Section (New) */}
      <section className="py-20 px-6 bg-white/50">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-2xl md:text-3xl font-serif text-foreground leading-relaxed italic">
            "{hero.description}"
          </p>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-24 px-6 md:px-12 bg-background">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground">Rituales Favoritos</h2>
            <p className="text-lg text-secondary font-light">
              Momentos diseñados para tu bienestar
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="group relative flex flex-col items-center p-8 text-center bg-white rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:bg-stone-50"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center text-4xl bg-stone-100 rounded-full group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-xl font-serif text-foreground mb-3">{service.name}</h3>
                <p className="text-secondary mb-4 font-light text-sm leading-relaxed">{service.description}</p>
                <p className="mt-auto text-xs font-medium tracking-wide text-accent uppercase border-t border-stone-100 pt-4 w-full">
                  {service.duration}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/servicios"
              className="inline-block border-b border-accent pb-1 text-accent font-medium transition-colors hover:text-foreground hover:border-foreground"
            >
              Ver todos los rituales
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Professionals Section */}
      <section className="py-24 px-6 bg-stone-100/50">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground">Nuestro Equipo</h2>
            <p className="mt-4 text-lg text-secondary font-light">
              Manos expertas que cuidan de vos
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {featuredProfessionals.map((professional) => (
              <div
                key={professional.id}
                className="flex flex-col items-center text-center group"
              >
                <div className="relative mb-6 h-48 w-48 overflow-hidden rounded-full border-4 border-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <div className="absolute inset-0 bg-stone-200 flex items-center justify-center text-stone-400">
                    {/* Placeholder for actual image if missing */}
                     <span className="text-4xl opacity-20">user</span>
                  </div>
                   {/* In a real scenario, use Image component. Using div bg for placeholder simplicity based on original code structure */}
                   <img src={professional.photo} alt={professional.name} className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <h3 className="text-xl font-serif font-medium text-foreground">{professional.name}</h3>
                <p className="text-sm font-medium text-accent mt-1 mb-3">{professional.title}</p>
                <p className="text-secondary font-light text-sm max-w-xs leading-relaxed">{professional.bio}</p>
                
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {professional.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-[10px] font-medium tracking-wider text-stone-500 uppercase bg-white rounded-full border border-stone-100"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/profesionales"
              className="inline-block rounded-full border border-foreground/20 px-8 py-3 text-sm font-medium text-foreground transition-all hover:bg-foreground hover:text-white"
            >
              Conocer al equipo completo
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 bg-primary text-white overflow-hidden">
         {/* Decorative circle */}
         <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
         <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>

        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">{ctaSection.title}</h2>
          <p className="text-xl md:text-2xl font-light text-white/90 mb-10 max-w-2xl mx-auto">
            {ctaSection.subtitle}
          </p>

          <div className="mb-12 flex flex-wrap justify-center gap-4 text-sm md:text-base font-medium">
            {ctaSection.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <Link
            href={ctaSection.ctaLink}
            className="inline-block rounded-full bg-background px-12 py-5 text-lg font-medium text-foreground shadow-lg transition-transform hover:scale-105"
          >
            {ctaSection.cta}
          </Link>
        </div>
      </section>

      {/* Contact Preview Section */}
      <section className="py-24 px-6 bg-background">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-foreground">{contactPreview.title}</h2>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center group">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-stone-500 mb-4 transition-colors group-hover:bg-accent group-hover:text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-secondary font-light">{contactPreview.address}</p>
            </div>

            <div className="text-center group">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-stone-500 mb-4 transition-colors group-hover:bg-accent group-hover:text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="text-secondary font-light">{contactPreview.phone}</p>
            </div>

            <div className="text-center group">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-stone-500 mb-4 transition-colors group-hover:bg-accent group-hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <p className="text-secondary font-light">{contactPreview.whatsapp}</p>
            </div>

            <div className="text-center group">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-stone-500 mb-4 transition-colors group-hover:bg-accent group-hover:text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-secondary font-light">{contactPreview.email}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
