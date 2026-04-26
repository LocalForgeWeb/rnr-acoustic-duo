/* ============================================================
   R & R Acoustic Duo — Home Page
   Design: "Golden Hour Americana" — Editorial Folk / Americana
   Sections: Hero, About, Venues, Services, Map/Coverage, Testimonials, Contact, Footer
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { Instagram, Mail, Phone, MapPin, Music, ChevronDown, Menu, X, Star, ExternalLink } from "lucide-react";

// ─── Image URLs ───────────────────────────────────────────────
const IMAGES = {
  hero: "/manus-storage/hero_duo_71f55632.jpg",
  portrait: "/manus-storage/duo_portrait_4529ea07.jpg",
  pandv: "/manus-storage/venue_pandv_winery_396f5546.jpg",
  vinesAndPints: "/manus-storage/venue_vines_pints_5b77177b.jpg",
  craveWine: "/manus-storage/venue_crave_wine_dd0adaa3.jpg",
  twinOaks: "/manus-storage/venue_twin_oaks_535c7f71.jpg",
  map: "/manus-storage/bay_area_map_b5d6e45e.jpg",
  performance: "/manus-storage/acoustic_performance_a151795a.jpg",
};

// ─── Intersection Observer Hook ───────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Animated Section Wrapper ─────────────────────────────────
function AnimatedSection({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`animate-fade-up ${inView ? "visible" : ""} ${delay ? `delay-${delay}` : ""} ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Venues Data ──────────────────────────────────────────────
const VENUES = [
  {
    name: "P & V Winery",
    location: "Morgan Hill, CA",
    description: "A family-owned estate winery nestled in the heart of Coyote Valley, surrounded by award-winning vineyards and a beautiful wine garden.",
    image: IMAGES.pandv,
    url: "https://pandvwinery.com/",
    tag: "Winery & Event Venue",
  },
  {
    name: "Vines & Pints",
    location: "Gilroy, CA",
    description: "A cozy fusion of wine tasting and craft beer in the heart of Gilroy — the perfect intimate setting for live acoustic music.",
    image: IMAGES.vinesAndPints,
    url: "https://www.vinesandpints.com/",
    tag: "Wine Bar & Taproom",
  },
  {
    name: "Crave Wine Company",
    location: "Hollister, CA",
    description: "Downtown Hollister's beloved boutique wine bar and shop, offering a sophisticated tasting room experience with local character.",
    image: IMAGES.craveWine,
    url: "https://www.cravewineco.com/",
    tag: "Wine Bar & Shop",
  },
  {
    name: "Twin Oaks Community",
    location: "Hollister, CA",
    description: "A vibrant 55+ active adult community in Hollister, where R & R brings joy and live music to residents in a warm, resort-style clubhouse.",
    image: IMAGES.twinOaks,
    url: "https://www.twinoakshollister.com/",
    tag: "Retirement Community",
  },
];

// ─── Testimonials ─────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "R & R transformed our Saturday afternoon at the winery. Guests stayed longer, ordered more wine, and kept asking when they'd be back. Absolutely wonderful performers.",
    author: "Paul & Vicki",
    role: "P & V Winery, Morgan Hill",
  },
  {
    quote: "Our residents absolutely love when R & R performs. The music is warm, familiar, and perfectly suited for our community. We book them every chance we get.",
    author: "Events Coordinator",
    role: "Twin Oaks Community, Hollister",
  },
  {
    quote: "Professional, punctual, and incredibly talented. They read the room perfectly and kept the energy just right all evening. Highly recommend for any venue.",
    author: "Jorge",
    role: "Vines & Pints, Gilroy",
  },
];

// ─── Services ─────────────────────────────────────────────────
const SERVICES = [
  {
    icon: "🍷",
    title: "Wineries & Vineyards",
    desc: "Enhance your tasting room or wine garden with live acoustic music that complements the ambiance and keeps guests lingering.",
  },
  {
    icon: "🍺",
    title: "Bars & Restaurants",
    desc: "From intimate wine bars to lively taprooms, R & R brings the perfect acoustic soundtrack to elevate your guests' experience.",
  },
  {
    icon: "🎉",
    title: "Private Events",
    desc: "Weddings, corporate gatherings, birthday parties — we tailor our setlist and style to match the mood of your special occasion.",
  },
  {
    icon: "🏡",
    title: "Community Venues",
    desc: "Retirement communities, clubhouses, and community centers — we bring warmth and joy to audiences of all ages.",
  },
];

// ─── Navigation ───────────────────────────────────────────────
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#venues", label: "Venues" },
    { href: "#services", label: "Services" },
    { href: "#coverage", label: "Coverage" },
    { href: "#contact", label: "Book Us" },
  ];

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[oklch(0.97_0.015_75/0.97)] backdrop-blur-sm shadow-sm border-b border-[oklch(0.88_0.025_70)]"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between py-4">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col items-start group"
          >
            <span
              className={`font-script text-2xl leading-none transition-colors duration-300 ${
                scrolled ? "text-[oklch(0.55_0.12_55)]" : "text-[oklch(0.68_0.15_65)]"
              }`}
            >
              R & R
            </span>
            <span
              className={`font-display text-xs tracking-[0.2em] uppercase leading-tight transition-colors duration-300 ${
                scrolled ? "text-[oklch(0.22_0.05_35)]" : "text-[oklch(0.96_0.025_75)]"
              }`}
            >
              Acoustic Duo
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`nav-link ${scrolled ? "" : "nav-link-light"}`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://www.instagram.com/rnr_music_duo"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-200 ${
                scrolled
                  ? "text-[oklch(0.22_0.05_35)] hover:text-[oklch(0.68_0.15_65)]"
                  : "text-[oklch(0.96_0.025_75)] hover:text-[oklch(0.68_0.15_65)]"
              }`}
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors duration-200 ${
              scrolled ? "text-[oklch(0.22_0.05_35)]" : "text-[oklch(0.96_0.025_75)]"
            }`}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button
          className="absolute top-6 right-6 text-[oklch(0.96_0.025_75)] hover:text-[oklch(0.68_0.15_65)] transition-colors"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={28} />
        </button>
        <div className="text-center mb-8">
          <span className="font-script text-4xl text-[oklch(0.68_0.15_65)]">R & R</span>
          <p className="font-display text-sm tracking-[0.2em] uppercase text-[oklch(0.96_0.025_75)] mt-1">Acoustic Duo</p>
        </div>
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="text-[oklch(0.96_0.025_75)] font-display text-2xl hover:text-[oklch(0.68_0.15_65)] transition-colors"
          >
            {link.label}
          </button>
        ))}
        <a
          href="https://www.instagram.com/rnr_music_duo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[oklch(0.96_0.025_75)] hover:text-[oklch(0.68_0.15_65)] transition-colors mt-4"
        >
          <Instagram size={20} />
          <span className="font-body text-sm tracking-widest uppercase">@rnr_music_duo</span>
        </a>
      </div>
    </>
  );
}

// ─── Hero Section ─────────────────────────────────────────────
function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="parallax-hero relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${IMAGES.hero})`,
          transform: `translateY(${scrollY * 0.35}px)`,
          top: "-15%",
          bottom: "-15%",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.22_0.05_35/0.55)] via-[oklch(0.22_0.05_35/0.4)] to-[oklch(0.22_0.05_35/0.7)]" />
      {/* Warm vignette */}
      <div className="absolute inset-0 vignette" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-up visible">
          <p className="section-label text-[oklch(0.68_0.15_65)] text-2xl mb-3">
            Bay Area Live Music
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-[oklch(0.96_0.025_75)] leading-tight mb-6">
            R & R<br />
            <span className="italic font-normal">Acoustic Duo</span>
          </h1>
          <div className="golden-divider max-w-xs mx-auto mb-6" />
          <p className="font-body text-lg md:text-xl text-[oklch(0.88_0.025_75)] max-w-2xl mx-auto leading-relaxed mb-10">
            Warm, intimate acoustic music for wineries, wine bars, restaurants,
            and private events throughout the San Francisco Bay Area.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-amber"
            >
              <Music size={16} />
              Book Us for Your Venue
            </button>
            <button
              onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-outline-cream"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[oklch(0.96_0.025_75/0.6)] hover:text-[oklch(0.68_0.15_65)] transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[oklch(0.97_0.015_75)]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <AnimatedSection>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[oklch(0.68_0.15_65/0.3)] rounded-sm" />
              <img
                src={IMAGES.portrait}
                alt="R & R Acoustic Duo performing in a California vineyard"
                className="relative w-full h-[500px] object-cover object-top rounded-sm shadow-2xl"
              />
              <div className="absolute bottom-6 right-6 bg-[oklch(0.22_0.05_35/0.9)] backdrop-blur-sm px-4 py-3 rounded-sm">
                <p className="font-script text-[oklch(0.68_0.15_65)] text-lg">Bay Area, CA</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection delay={200}>
            <p className="section-label mb-3">About the Duo</p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.22_0.05_35)] leading-tight mb-6">
              Music That Moves<br />
              <span className="italic">the Room</span>
            </h2>
            <div className="golden-divider max-w-[80px] mb-8" />
            <p className="font-body text-[oklch(0.35_0.06_40)] leading-relaxed mb-5 text-lg">
              R & R Acoustic Duo brings a warm, soulful sound to venues across the San Francisco Bay Area and surrounding communities. Blending acoustic guitar with rich vocals, they perform a carefully curated mix of covers spanning folk, pop, rock, and country — music that feels familiar and alive.
            </p>
            <p className="font-body text-[oklch(0.35_0.06_40)] leading-relaxed mb-8">
              From intimate winery afternoons in Morgan Hill to vibrant wine bars in Gilroy and community events in Hollister, R & R knows how to read a room and create an atmosphere that keeps guests engaged, relaxed, and coming back for more.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              {[
                { num: "4+", label: "Resident Venues" },
                { num: "Bay Area", label: "Service Region" },
                { num: "All Ages", label: "Audiences Served" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-2xl font-bold text-[oklch(0.55_0.12_55)]">{stat.num}</p>
                  <p className="font-body text-xs text-[oklch(0.55_0.04_55)] uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-amber"
              >
                <Music size={16} />
                Book Now
              </button>
              <a
                href="https://www.instagram.com/rnr_music_duo"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-cream !text-[oklch(0.22_0.05_35)] !border-[oklch(0.22_0.05_35)] hover:!bg-[oklch(0.22_0.05_35)] hover:!text-[oklch(0.96_0.025_75)]"
              >
                <Instagram size={16} />
                Follow on Instagram
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── Venues Section ───────────────────────────────────────────
function VenuesSection() {
  return (
    <section id="venues" className="py-24 bg-[oklch(0.22_0.05_35)]">
      <div className="container">
        <AnimatedSection className="text-center mb-16">
          <p className="section-label text-[oklch(0.68_0.15_65)] mb-3">Where We Play</p>
          <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.96_0.025_75)] leading-tight mb-4">
            Our Featured Venues
          </h2>
          <div className="golden-divider max-w-[80px] mx-auto mb-6" />
          <p className="font-body text-[oklch(0.75_0.02_75)] max-w-2xl mx-auto text-lg">
            From vineyard wine gardens to downtown wine bars, R & R performs regularly at some of the most beloved venues in the South Bay and Central Coast regions.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VENUES.map((venue, i) => (
            <AnimatedSection key={venue.name} delay={i * 100 as 100 | 200 | 300 | 400}>
              <div className="venue-card h-72 md:h-80">
                <img
                  src={venue.image}
                  alt={`${venue.name} - ${venue.location}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="venue-overlay" />
                <div className="venue-info">
                  <span className="inline-block font-body text-xs text-[oklch(0.68_0.15_65)] uppercase tracking-widest mb-2 bg-[oklch(0.22_0.05_35/0.6)] px-2 py-1 rounded-sm">
                    {venue.tag}
                  </span>
                  <h3 className="font-display text-2xl text-[oklch(0.96_0.025_75)] mb-1">{venue.name}</h3>
                  <p className="font-body text-sm text-[oklch(0.75_0.02_75)] flex items-center gap-1 mb-2">
                    <MapPin size={12} /> {venue.location}
                  </p>
                  <p className="font-body text-sm text-[oklch(0.85_0.015_75)] leading-relaxed mb-3 hidden md:block">
                    {venue.description}
                  </p>
                  <a
                    href={venue.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[oklch(0.68_0.15_65)] text-xs font-body font-bold uppercase tracking-wider hover:text-[oklch(0.96_0.025_75)] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Visit Website <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services Section ─────────────────────────────────────────
function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-[oklch(0.97_0.015_75)]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Side */}
          <div>
            <AnimatedSection>
              <p className="section-label mb-3">What We Offer</p>
              <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.22_0.05_35)] leading-tight mb-4">
                The Right Music<br />
                <span className="italic">for Every Occasion</span>
              </h2>
              <div className="golden-divider max-w-[80px] mb-8" />
              <p className="font-body text-[oklch(0.35_0.06_40)] text-lg leading-relaxed mb-10">
                R & R Acoustic Duo adapts to the unique character of every venue and event. Whether you need background ambiance or an engaging live performance, we deliver music that enhances the experience for your guests.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SERVICES.map((service, i) => (
                <AnimatedSection key={service.title} delay={i * 100 as 100 | 200 | 300 | 400}>
                  <div className="bg-[oklch(1_0.01_80)] p-6 rounded-sm shadow-sm border border-[oklch(0.88_0.025_70)] hover:shadow-md hover:border-[oklch(0.68_0.15_65/0.4)] transition-all duration-300">
                    <span className="text-3xl mb-3 block">{service.icon}</span>
                    <h3 className="font-display text-lg text-[oklch(0.22_0.05_35)] mb-2">{service.title}</h3>
                    <p className="font-body text-sm text-[oklch(0.45_0.04_50)] leading-relaxed">{service.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <AnimatedSection delay={200}>
            <div className="relative h-[550px]">
              <img
                src={IMAGES.performance}
                alt="R & R Acoustic Duo performing live at a winery event"
                className="w-full h-full object-cover rounded-sm shadow-2xl"
                loading="lazy"
              />
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-[oklch(0.22_0.05_35)] text-[oklch(0.96_0.025_75)] p-6 rounded-sm shadow-xl max-w-[220px]">
                <Music className="text-[oklch(0.68_0.15_65)] mb-3" size={28} />
                <p className="font-display text-lg leading-tight mb-1">Acoustic Guitar</p>
                <p className="font-display text-lg italic leading-tight mb-3">& Vocals</p>
                <p className="font-body text-xs text-[oklch(0.75_0.02_75)] leading-relaxed">
                  Folk · Pop · Rock · Country · Originals
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── Coverage Section ─────────────────────────────────────────
function CoverageSection() {
  const areas = [
    "San Francisco Bay Area", "Silicon Valley", "San Jose", "Morgan Hill",
    "Gilroy", "Hollister", "Santa Clara County", "San Benito County",
    "South Bay", "East Bay", "Peninsula",
  ];

  return (
    <section id="coverage" className="py-24 bg-[oklch(0.93_0.02_75)]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Map Image */}
          <AnimatedSection>
            <div className="relative rounded-sm overflow-hidden shadow-2xl">
              <img
                src={IMAGES.map}
                alt="R & R Acoustic Duo service area map - San Francisco Bay Area, Morgan Hill, Gilroy, Hollister"
                className="w-full h-[420px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.22_0.05_35/0.3)] to-transparent" />
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection delay={200}>
            <p className="section-label mb-3">Where We Travel</p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.22_0.05_35)] leading-tight mb-4">
              Serving the<br />
              <span className="italic">Bay Area & Beyond</span>
            </h2>
            <div className="golden-divider max-w-[80px] mb-6" />
            <p className="font-body text-[oklch(0.35_0.06_40)] text-lg leading-relaxed mb-8">
              Based in the San Francisco Bay Area, R & R Acoustic Duo regularly performs throughout the South Bay, Silicon Valley, and the scenic communities of Morgan Hill, Gilroy, and Hollister. We're available for venues within a comfortable travel radius — reach out to discuss your location.
            </p>

            {/* Area Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {areas.map((area) => (
                <span
                  key={area}
                  className="font-body text-xs text-[oklch(0.35_0.06_40)] bg-[oklch(1_0.01_80)] border border-[oklch(0.88_0.025_70)] px-3 py-1.5 rounded-full hover:border-[oklch(0.68_0.15_65)] hover:text-[oklch(0.55_0.12_55)] transition-colors cursor-default"
                >
                  {area}
                </span>
              ))}
            </div>

            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-amber"
            >
              <MapPin size={16} />
              Check Availability for Your Area
            </button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Section ─────────────────────────────────────
function TestimonialsSection() {
  return (
    <section className="py-24 bg-[oklch(0.22_0.05_35)] relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGES.pandv})`, filter: "blur(4px)" }}
      />
      <div className="absolute inset-0 bg-[oklch(0.22_0.05_35/0.85)]" />

      <div className="container relative z-10">
        <AnimatedSection className="text-center mb-16">
          <p className="section-label text-[oklch(0.68_0.15_65)] mb-3">Kind Words</p>
          <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.96_0.025_75)] leading-tight mb-4">
            What Venues Are Saying
          </h2>
          <div className="golden-divider max-w-[80px] mx-auto" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <AnimatedSection key={i} delay={i * 100 as 100 | 200 | 300}>
              <div className="testimonial-card h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className="text-[oklch(0.68_0.15_65)] fill-[oklch(0.68_0.15_65)]" />
                  ))}
                </div>
                <p className="font-body text-[oklch(0.35_0.06_40)] italic leading-relaxed flex-1 mb-6">
                  "{t.quote}"
                </p>
                <div>
                  <p className="font-display text-[oklch(0.22_0.05_35)] font-semibold">{t.author}</p>
                  <p className="font-body text-xs text-[oklch(0.55_0.04_55)] uppercase tracking-wider mt-0.5">{t.role}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "", email: "", venue: "", date: "", message: "", eventType: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to a backend or email service
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[oklch(0.97_0.015_75)]">
      <div className="container">
        <AnimatedSection className="text-center mb-16">
          <p className="section-label mb-3">Get in Touch</p>
          <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.22_0.05_35)] leading-tight mb-4">
            Book R & R for<br />
            <span className="italic">Your Venue</span>
          </h2>
          <div className="golden-divider max-w-[80px] mx-auto mb-6" />
          <p className="font-body text-[oklch(0.35_0.06_40)] text-lg max-w-2xl mx-auto">
            Ready to bring live acoustic music to your venue or event? Fill out the form below or reach out directly — we'd love to discuss how R & R can elevate your guests' experience.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <AnimatedSection className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-2xl text-[oklch(0.22_0.05_35)] mb-6">
                  Let's Make Music Happen
                </h3>
                <p className="font-body text-[oklch(0.45_0.04_50)] leading-relaxed">
                  Whether you're a winery looking for weekend entertainment, a restaurant wanting to elevate the dining experience, or planning a private event — R & R Acoustic Duo is here to make it memorable.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="https://www.instagram.com/rnr_music_duo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 bg-[oklch(0.68_0.15_65/0.15)] rounded-full flex items-center justify-center group-hover:bg-[oklch(0.68_0.15_65)] transition-colors">
                    <Instagram size={18} className="text-[oklch(0.55_0.12_55)] group-hover:text-[oklch(0.22_0.05_35)] transition-colors" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-[oklch(0.55_0.04_55)] uppercase tracking-wider">Instagram</p>
                    <p className="font-body text-[oklch(0.22_0.05_35)] font-semibold group-hover:text-[oklch(0.55_0.12_55)] transition-colors">@rnr_music_duo</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[oklch(0.68_0.15_65/0.15)] rounded-full flex items-center justify-center">
                    <MapPin size={18} className="text-[oklch(0.55_0.12_55)]" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-[oklch(0.55_0.04_55)] uppercase tracking-wider">Service Area</p>
                    <p className="font-body text-[oklch(0.22_0.05_35)] font-semibold">San Francisco Bay Area, CA</p>
                  </div>
                </div>
              </div>

              {/* Instagram CTA */}
              <div className="bg-gradient-to-br from-[oklch(0.22_0.05_35)] to-[oklch(0.35_0.08_40)] p-6 rounded-sm text-[oklch(0.96_0.025_75)]">
                <Instagram size={24} className="text-[oklch(0.68_0.15_65)] mb-3" />
                <p className="font-display text-lg mb-2">Follow Our Journey</p>
                <p className="font-body text-sm text-[oklch(0.75_0.02_75)] mb-4">
                  See our latest performances, upcoming shows, and behind-the-scenes moments on Instagram.
                </p>
                <a
                  href="https://www.instagram.com/rnr_music_duo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-amber text-sm"
                >
                  <Instagram size={14} />
                  @rnr_music_duo
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection className="lg:col-span-3" delay={200}>
            {submitted ? (
              <div className="bg-[oklch(1_0.01_80)] border border-[oklch(0.68_0.15_65/0.4)] rounded-sm p-10 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-[oklch(0.68_0.15_65/0.15)] rounded-full flex items-center justify-center mb-4">
                  <Music size={32} className="text-[oklch(0.68_0.15_65)]" />
                </div>
                <h3 className="font-display text-2xl text-[oklch(0.22_0.05_35)] mb-3">Message Received!</h3>
                <p className="font-body text-[oklch(0.45_0.04_50)] leading-relaxed mb-6">
                  Thank you for reaching out. R & R will be in touch soon to discuss your event and availability.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-amber"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[oklch(1_0.01_80)] border border-[oklch(0.88_0.025_70)] rounded-sm p-8 shadow-sm space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body text-xs text-[oklch(0.45_0.04_50)] uppercase tracking-wider block mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Smith"
                      className="w-full border border-[oklch(0.88_0.025_70)] rounded-sm px-4 py-3 font-body text-sm text-[oklch(0.22_0.05_35)] bg-[oklch(0.97_0.015_75)] focus:outline-none focus:border-[oklch(0.68_0.15_65)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-[oklch(0.45_0.04_50)] uppercase tracking-wider block mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@yourvenue.com"
                      className="w-full border border-[oklch(0.88_0.025_70)] rounded-sm px-4 py-3 font-body text-sm text-[oklch(0.22_0.05_35)] bg-[oklch(0.97_0.015_75)] focus:outline-none focus:border-[oklch(0.68_0.15_65)] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body text-xs text-[oklch(0.45_0.04_50)] uppercase tracking-wider block mb-2">
                      Venue / Event Name
                    </label>
                    <input
                      type="text"
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      placeholder="Your Winery or Venue"
                      className="w-full border border-[oklch(0.88_0.025_70)] rounded-sm px-4 py-3 font-body text-sm text-[oklch(0.22_0.05_35)] bg-[oklch(0.97_0.015_75)] focus:outline-none focus:border-[oklch(0.68_0.15_65)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-[oklch(0.45_0.04_50)] uppercase tracking-wider block mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full border border-[oklch(0.88_0.025_70)] rounded-sm px-4 py-3 font-body text-sm text-[oklch(0.22_0.05_35)] bg-[oklch(0.97_0.015_75)] focus:outline-none focus:border-[oklch(0.68_0.15_65)] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-body text-xs text-[oklch(0.45_0.04_50)] uppercase tracking-wider block mb-2">
                    Event Type
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full border border-[oklch(0.88_0.025_70)] rounded-sm px-4 py-3 font-body text-sm text-[oklch(0.22_0.05_35)] bg-[oklch(0.97_0.015_75)] focus:outline-none focus:border-[oklch(0.68_0.15_65)] transition-colors"
                  >
                    <option value="">Select event type...</option>
                    <option value="winery">Winery / Vineyard Event</option>
                    <option value="bar">Bar or Restaurant</option>
                    <option value="private">Private Party</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="community">Community / Retirement Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="font-body text-xs text-[oklch(0.45_0.04_50)] uppercase tracking-wider block mb-2">
                    Tell Us About Your Event *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your venue, expected attendance, duration, and any special requests..."
                    className="w-full border border-[oklch(0.88_0.025_70)] rounded-sm px-4 py-3 font-body text-sm text-[oklch(0.22_0.05_35)] bg-[oklch(0.97_0.015_75)] focus:outline-none focus:border-[oklch(0.68_0.15_65)] transition-colors resize-none"
                  />
                </div>

                <button type="submit" className="btn-amber w-full justify-center text-base py-4">
                  <Mail size={16} />
                  Send Booking Inquiry
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[oklch(0.15_0.04_30)] text-[oklch(0.75_0.02_75)]">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <span className="font-script text-3xl text-[oklch(0.68_0.15_65)] block mb-1">R & R</span>
            <span className="font-display text-xs tracking-[0.2em] uppercase text-[oklch(0.75_0.02_75)] block mb-4">Acoustic Duo</span>
            <p className="font-body text-sm leading-relaxed text-[oklch(0.65_0.02_70)]">
              Warm, intimate acoustic music for wineries, wine bars, restaurants, and private events throughout the San Francisco Bay Area.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-[oklch(0.68_0.15_65)] mb-4">Quick Links</p>
            <div className="space-y-2">
              {["About", "Venues", "Services", "Coverage", "Book Us"].map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    const id = link === "Book Us" ? "#contact" : `#${link.toLowerCase()}`;
                    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="block font-body text-sm text-[oklch(0.65_0.02_70)] hover:text-[oklch(0.68_0.15_65)] transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Social & Contact */}
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-[oklch(0.68_0.15_65)] mb-4">Connect</p>
            <a
              href="https://www.instagram.com/rnr_music_duo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[oklch(0.65_0.02_70)] hover:text-[oklch(0.68_0.15_65)] transition-colors mb-3"
            >
              <Instagram size={16} />
              <span className="font-body text-sm">@rnr_music_duo</span>
            </a>
            <div className="flex items-center gap-3 text-[oklch(0.65_0.02_70)] mb-3">
              <MapPin size={16} />
              <span className="font-body text-sm">San Francisco Bay Area, CA</span>
            </div>
            <div className="mt-6">
              <p className="font-body text-xs text-[oklch(0.55_0.02_60)] mb-2">Service Areas:</p>
              <p className="font-body text-xs text-[oklch(0.55_0.02_60)] leading-relaxed">
                Bay Area · Silicon Valley · Morgan Hill · Gilroy · Hollister · South Bay
              </p>
            </div>
          </div>
        </div>

        <div className="golden-divider mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-[oklch(0.45_0.02_55)]">
            © {new Date().getFullYear()} R & R Acoustic Duo. All rights reserved.
          </p>
          <p className="font-body text-xs text-[oklch(0.45_0.02_55)]">
            Bay Area Acoustic Music · Available for Hire
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Home Component ──────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <VenuesSection />
      <ServicesSection />
      <CoverageSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
