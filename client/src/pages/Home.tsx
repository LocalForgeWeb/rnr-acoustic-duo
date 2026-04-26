/* ============================================================
   R & R Acoustic Duo — Home Page
   Design: "Golden Hour Americana" — Editorial Folk / Americana
   Members: Rebecca Barnes (vocals) & Ron Butron (guitar)
   Features: Dropdown nav, real logo, real duo photo, animated sections
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { Instagram, Mail, MapPin, Music, ChevronDown, Menu, X, Star, ExternalLink, ChevronRight, Mic2, Guitar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Image URLs ───────────────────────────────────────────────
const IMAGES = {
  hero: "/manus-storage/hero_duo_71f55632.jpg",
  logoLight: "/manus-storage/rnr_logo_light_9cbea23b.png",
  logoDark: "/manus-storage/rnr_logo_5be2a5ae.png",
  duoPhoto: "/manus-storage/rebecca_ronnie_39ea52d3.jpg",
  pandv: "/manus-storage/venue_pandv_winery_396f5546.jpg",
  vinesAndPints: "/manus-storage/venue_vines_pints_5b77177b.jpg",
  craveWine: "/manus-storage/venue_crave_wine_dd0adaa3.jpg",
  twinOaks: "/manus-storage/venue_twin_oaks_535c7f71.jpg",
  map: "/manus-storage/bay_area_map_b5d6e45e.jpg",
  performance: "/manus-storage/acoustic_performance_a151795a.jpg",
};

// ─── Intersection Observer Hook ───────────────────────────────
function useInView(threshold = 0.12) {
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
function FadeUp({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
      className={className}
    >
      {children}
    </motion.div>
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

// ─── Nav Dropdown Data ────────────────────────────────────────
const NAV_ITEMS = [
  {
    label: "About",
    href: "#about",
    dropdown: [
      { label: "Our Story", href: "#about" },
      { label: "Rebecca Barnes", href: "#members" },
      { label: "Ron Butron", href: "#members" },
    ],
  },
  {
    label: "Venues",
    href: "#venues",
    dropdown: [
      { label: "P & V Winery", href: "#venues" },
      { label: "Vines & Pints", href: "#venues" },
      { label: "Crave Wine Company", href: "#venues" },
      { label: "Twin Oaks Community", href: "#venues" },
    ],
  },
  {
    label: "Services",
    href: "#services",
    dropdown: [
      { label: "Wineries & Vineyards", href: "#services" },
      { label: "Bars & Restaurants", href: "#services" },
      { label: "Private Events", href: "#services" },
      { label: "Community Venues", href: "#services" },
    ],
  },
  {
    label: "Coverage",
    href: "#coverage",
    dropdown: null,
  },
  {
    label: "Book Us",
    href: "#contact",
    dropdown: null,
    cta: true,
  },
];

// ─── Navigation ───────────────────────────────────────────────
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setActiveDropdown(null);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const isLight = !scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[oklch(0.97_0.015_75/0.97)] backdrop-blur-md shadow-sm border-b border-[oklch(0.88_0.025_70)]"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between py-3">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col items-center group"
            aria-label="R & R Acoustic Duo home"
          >
            <img
              src={isLight ? IMAGES.logoLight : IMAGES.logoDark}
              alt="R & R Acoustic Duo logo"
              className="h-10 w-auto object-contain transition-all duration-500"
            />
            <span
              className={`font-body text-[0.55rem] tracking-[0.22em] uppercase transition-colors duration-300 -mt-0.5 ${
                isLight ? "text-[oklch(0.96_0.025_75/0.8)]" : "text-[oklch(0.55_0.04_55)]"
              }`}
            >
              Acoustic Duo
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {item.cta ? (
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="btn-amber !py-2 !px-5 !text-[0.7rem] ml-2"
                  >
                    <Music size={13} />
                    {item.label}
                  </button>
                ) : (
                  <button
                    onClick={() => scrollTo(item.href)}
                    className={`flex items-center gap-1 px-3 py-2 font-body font-bold text-[0.72rem] tracking-[0.1em] uppercase transition-colors duration-200 rounded-sm ${
                      isLight
                        ? "text-[oklch(0.96_0.025_75)] hover:text-[oklch(0.68_0.15_65)]"
                        : "text-[oklch(0.22_0.05_35)] hover:text-[oklch(0.55_0.12_55)]"
                    }`}
                  >
                    {item.label}
                    {item.dropdown && (
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>
                )}

                {/* Dropdown */}
                {item.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-52 bg-[oklch(0.97_0.015_75/0.98)] backdrop-blur-md border border-[oklch(0.88_0.025_70)] rounded-sm shadow-xl overflow-hidden"
                        onMouseEnter={() => handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {/* Amber top accent */}
                        <div className="h-0.5 bg-gradient-to-r from-transparent via-[oklch(0.68_0.15_65)] to-transparent" />
                        {item.dropdown.map((sub) => (
                          <button
                            key={sub.label}
                            onClick={() => scrollTo(sub.href)}
                            className="w-full text-left px-4 py-2.5 font-body text-xs text-[oklch(0.35_0.06_40)] hover:bg-[oklch(0.93_0.02_75)] hover:text-[oklch(0.55_0.12_55)] transition-colors flex items-center gap-2 group/item"
                          >
                            <ChevronRight size={10} className="text-[oklch(0.68_0.15_65)] opacity-0 group-hover/item:opacity-100 transition-opacity -ml-1" />
                            {sub.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}

            <a
              href="https://www.instagram.com/rnr_music_duo"
              target="_blank"
              rel="noopener noreferrer"
              className={`ml-2 transition-colors duration-200 ${
                isLight
                  ? "text-[oklch(0.96_0.025_75)] hover:text-[oklch(0.68_0.15_65)]"
                  : "text-[oklch(0.22_0.05_35)] hover:text-[oklch(0.68_0.15_65)]"
              }`}
              aria-label="Instagram @rnr_music_duo"
            >
              <Instagram size={17} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors duration-200 ${
              isLight ? "text-[oklch(0.96_0.025_75)]" : "text-[oklch(0.22_0.05_35)]"
            }`}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 bg-[oklch(0.22_0.05_35)] z-50 flex flex-col items-center justify-center gap-6 overflow-y-auto py-16"
          >
            <button
              className="absolute top-6 right-6 text-[oklch(0.96_0.025_75)] hover:text-[oklch(0.68_0.15_65)] transition-colors"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            <img src={IMAGES.logoLight} alt="R & R logo" className="h-16 w-auto mb-4" />
            <p className="font-body text-xs tracking-[0.25em] uppercase text-[oklch(0.75_0.02_75)] -mt-4 mb-4">
              Rebecca Barnes & Ron Butron
            </p>
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="text-center">
                <button
                  onClick={() => scrollTo(item.href)}
                  className="text-[oklch(0.96_0.025_75)] font-display text-2xl hover:text-[oklch(0.68_0.15_65)] transition-colors"
                >
                  {item.label}
                </button>
                {item.dropdown && (
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-1">
                    {item.dropdown.map((sub) => (
                      <button
                        key={sub.label}
                        onClick={() => scrollTo(sub.href)}
                        className="text-[oklch(0.65_0.02_70)] font-body text-xs hover:text-[oklch(0.68_0.15_65)] transition-colors"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="https://www.instagram.com/rnr_music_duo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[oklch(0.96_0.025_75)] hover:text-[oklch(0.68_0.15_65)] transition-colors mt-2"
            >
              <Instagram size={18} />
              <span className="font-body text-sm tracking-widest uppercase">@rnr_music_duo</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
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
    <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.22_0.05_35/0.5)] via-[oklch(0.22_0.05_35/0.35)] to-[oklch(0.22_0.05_35/0.75)]" />
      <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 100px rgba(44,24,16,0.45)" }} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo */}
          <motion.img
            src={IMAGES.logoLight}
            alt="R & R Acoustic Duo"
            className="h-24 md:h-32 w-auto mx-auto mb-4"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          />
          <motion.p
            className="font-script text-[oklch(0.68_0.15_65)] text-2xl mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Bay Area Live Music
          </motion.p>
          <motion.h1
            className="font-display text-4xl md:text-6xl lg:text-7xl text-[oklch(0.96_0.025_75)] leading-tight mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Rebecca Barnes<br />
            <span className="italic font-normal text-[oklch(0.88_0.025_75)]">&amp; Ron Butron</span>
          </motion.h1>

          <motion.div
            className="golden-divider max-w-xs mx-auto mb-5"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          />

          <motion.p
            className="font-body text-base md:text-lg text-[oklch(0.85_0.02_75)] max-w-2xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Warm, intimate acoustic music for wineries, wine bars, restaurants,
            and private events throughout the San Francisco Bay Area.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
          >
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
              Meet the Duo
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[oklch(0.96_0.025_75/0.5)] hover:text-[oklch(0.68_0.15_65)] transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        aria-label="Scroll down"
      >
        <ChevronDown size={30} />
      </motion.button>
    </section>
  );
}

// ─── About / Members Section ──────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[oklch(0.97_0.015_75)]">
      <div className="container">
        {/* Section Header */}
        <FadeUp className="text-center mb-16">
          <p className="section-label mb-3">The Duo</p>
          <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.22_0.05_35)] leading-tight mb-4">
            Meet Rebecca & Ronnie
          </h2>
          <div className="golden-divider max-w-[80px] mx-auto mb-6" />
          <p className="font-body text-[oklch(0.45_0.04_50)] text-lg max-w-2xl mx-auto leading-relaxed">
            R & R Acoustic Duo brings a warm, soulful sound to venues across the San Francisco Bay Area. Blending acoustic guitar with rich vocals, they perform a curated mix of folk, pop, rock, and country that feels both familiar and alive.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20" id="members">
          {/* Real Duo Photo */}
          <FadeUp>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[oklch(0.68_0.15_65/0.35)] rounded-sm pointer-events-none" />
              <img
                src={IMAGES.duoPhoto}
                alt="Rebecca Barnes and Ron Butron — R & R Acoustic Duo"
                className="relative w-full h-[520px] object-cover object-top rounded-sm shadow-2xl"
              />
              {/* Name overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[oklch(0.22_0.05_35/0.92)] to-transparent px-6 py-6 rounded-b-sm">
                <div className="flex justify-around">
                  <div className="text-center">
                    <Mic2 size={16} className="text-[oklch(0.68_0.15_65)] mx-auto mb-1" />
                    <p className="font-display text-[oklch(0.96_0.025_75)] text-lg font-semibold">Rebecca Barnes</p>
                    <p className="font-body text-xs text-[oklch(0.68_0.15_65)] uppercase tracking-wider">Vocals</p>
                  </div>
                  <div className="w-px bg-[oklch(0.68_0.15_65/0.3)]" />
                  <div className="text-center">
                    <Guitar size={16} className="text-[oklch(0.68_0.15_65)] mx-auto mb-1" />
                    <p className="font-display text-[oklch(0.96_0.025_75)] text-lg font-semibold">Ron Butron</p>
                    <p className="font-body text-xs text-[oklch(0.68_0.15_65)] uppercase tracking-wider">Acoustic Guitar</p>
                  </div>
                </div>
              </div>
              {/* Location badge */}
              <div className="absolute top-4 right-4 bg-[oklch(0.22_0.05_35/0.85)] backdrop-blur-sm px-3 py-2 rounded-sm">
                <p className="font-script text-[oklch(0.68_0.15_65)] text-base leading-none">Bay Area, CA</p>
              </div>
            </div>
          </FadeUp>

          {/* Text */}
          <FadeUp delay={200}>
            <p className="section-label mb-3">About the Duo</p>
            <h2 className="font-display text-3xl md:text-4xl text-[oklch(0.22_0.05_35)] leading-tight mb-6">
              Music That Moves<br />
              <span className="italic">the Room</span>
            </h2>
            <div className="golden-divider max-w-[80px] mb-8" />
            <p className="font-body text-[oklch(0.35_0.06_40)] leading-relaxed mb-5 text-lg">
              From intimate winery afternoons in Morgan Hill to vibrant wine bars in Gilroy and community events in Hollister, R & R knows how to read a room and create an atmosphere that keeps guests engaged, relaxed, and coming back for more.
            </p>
            <p className="font-body text-[oklch(0.35_0.06_40)] leading-relaxed mb-8">
              Rebecca's warm, expressive vocals paired with Ronnie's masterful acoustic guitar create a sound that is both intimate and captivating — perfect for any venue looking to elevate the guest experience.
            </p>

            {/* Member Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { name: "Rebecca Barnes", role: "Vocals & Harmonies", icon: <Mic2 size={20} />, desc: "Warm, expressive voice that fills any room with emotion and energy." },
                { name: "Ron Butron", role: "Acoustic Guitar", icon: <Guitar size={20} />, desc: "Masterful fingerpicking and rhythm guitar that anchors every performance." },
              ].map((member) => (
                <div key={member.name} className="bg-[oklch(1_0.01_80)] border border-[oklch(0.88_0.025_70)] rounded-sm p-4 hover:border-[oklch(0.68_0.15_65/0.5)] hover:shadow-md transition-all duration-300">
                  <div className="text-[oklch(0.68_0.15_65)] mb-2">{member.icon}</div>
                  <p className="font-display text-sm text-[oklch(0.22_0.05_35)] font-semibold mb-0.5">{member.name}</p>
                  <p className="font-body text-xs text-[oklch(0.68_0.15_65)] uppercase tracking-wider mb-2">{member.role}</p>
                  <p className="font-body text-xs text-[oklch(0.55_0.04_55)] leading-relaxed">{member.desc}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-[oklch(0.88_0.025_70)]">
              {[
                { num: "4+", label: "Resident Venues" },
                { num: "Bay Area", label: "Service Region" },
                { num: "All Ages", label: "Audiences" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-xl font-bold text-[oklch(0.55_0.12_55)]">{stat.num}</p>
                  <p className="font-body text-xs text-[oklch(0.55_0.04_55)] uppercase tracking-wider mt-0.5">{stat.label}</p>
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
                className="inline-flex items-center gap-2 font-body font-bold text-[0.8rem] uppercase tracking-wider text-[oklch(0.22_0.05_35)] border-2 border-[oklch(0.22_0.05_35)] px-5 py-3 rounded-sm hover:bg-[oklch(0.22_0.05_35)] hover:text-[oklch(0.96_0.025_75)] transition-all duration-300"
              >
                <Instagram size={15} />
                @rnr_music_duo
              </a>
            </div>
          </FadeUp>
        </div>

        {/* Genre Tags */}
        <FadeUp>
          <div className="text-center">
            <p className="section-label mb-4">Musical Styles</p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Folk", "Pop", "Classic Rock", "Country", "Americana", "Singer-Songwriter", "Soft Rock", "Indie"].map((genre) => (
                <span
                  key={genre}
                  className="font-body text-sm text-[oklch(0.35_0.06_40)] bg-[oklch(1_0.01_80)] border border-[oklch(0.88_0.025_70)] px-4 py-2 rounded-full hover:border-[oklch(0.68_0.15_65)] hover:text-[oklch(0.55_0.12_55)] transition-colors cursor-default"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Venues Section ───────────────────────────────────────────
function VenuesSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="venues" className="py-24 bg-[oklch(0.22_0.05_35)]">
      <div className="container">
        <FadeUp className="text-center mb-16">
          <p className="section-label text-[oklch(0.68_0.15_65)] mb-3">Where We Play</p>
          <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.96_0.025_75)] leading-tight mb-4">
            Our Featured Venues
          </h2>
          <div className="golden-divider max-w-[80px] mx-auto mb-6" />
          <p className="font-body text-[oklch(0.75_0.02_75)] max-w-2xl mx-auto text-lg">
            From vineyard wine gardens to downtown wine bars, R & R performs regularly at some of the most beloved venues in the South Bay and Central Coast.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VENUES.map((venue, i) => (
            <FadeUp key={venue.name} delay={i * 100}>
              <motion.div
                className="venue-card h-72 md:h-80 cursor-pointer"
                onHoverStart={() => setHovered(venue.name)}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={venue.image}
                  alt={`${venue.name} — ${venue.location} live music venue`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="venue-overlay" />
                <motion.div
                  className="venue-info"
                  animate={{ y: hovered === venue.name ? 0 : 6 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="inline-block font-body text-xs text-[oklch(0.68_0.15_65)] uppercase tracking-widest mb-2 bg-[oklch(0.22_0.05_35/0.65)] px-2 py-1 rounded-sm">
                    {venue.tag}
                  </span>
                  <h3 className="font-display text-2xl text-[oklch(0.96_0.025_75)] mb-1">{venue.name}</h3>
                  <p className="font-body text-sm text-[oklch(0.75_0.02_75)] flex items-center gap-1 mb-2">
                    <MapPin size={12} /> {venue.location}
                  </p>
                  <AnimatePresence>
                    {hovered === venue.name && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="font-body text-sm text-[oklch(0.85_0.015_75)] leading-relaxed mb-3"
                      >
                        {venue.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <a
                    href={venue.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[oklch(0.68_0.15_65)] text-xs font-body font-bold uppercase tracking-wider hover:text-[oklch(0.96_0.025_75)] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Visit Website <ExternalLink size={11} />
                  </a>
                </motion.div>
              </motion.div>
            </FadeUp>
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
          <div>
            <FadeUp>
              <p className="section-label mb-3">What We Offer</p>
              <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.22_0.05_35)] leading-tight mb-4">
                The Right Music<br />
                <span className="italic">for Every Occasion</span>
              </h2>
              <div className="golden-divider max-w-[80px] mb-8" />
              <p className="font-body text-[oklch(0.35_0.06_40)] text-lg leading-relaxed mb-10">
                R & R Acoustic Duo adapts to the unique character of every venue and event. Whether you need background ambiance or an engaging live performance, Rebecca and Ronnie deliver music that enhances the experience for your guests.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {SERVICES.map((service, i) => (
                <FadeUp key={service.title} delay={i * 100}>
                  <motion.div
                    className="bg-[oklch(1_0.01_80)] p-6 rounded-sm shadow-sm border border-[oklch(0.88_0.025_70)] transition-all duration-300"
                    whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(44,24,16,0.12)", borderColor: "oklch(0.68 0.15 65 / 0.5)" }}
                  >
                    <span className="text-3xl mb-3 block">{service.icon}</span>
                    <h3 className="font-display text-lg text-[oklch(0.22_0.05_35)] mb-2">{service.title}</h3>
                    <p className="font-body text-sm text-[oklch(0.45_0.04_50)] leading-relaxed">{service.desc}</p>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </div>

          <FadeUp delay={200}>
            <div className="relative h-[560px]">
              <img
                src={IMAGES.performance}
                alt="R & R Acoustic Duo performing live at a Bay Area winery event"
                className="w-full h-full object-cover rounded-sm shadow-2xl"
                loading="lazy"
              />
              <motion.div
                className="absolute -bottom-6 -left-6 bg-[oklch(0.22_0.05_35)] text-[oklch(0.96_0.025_75)] p-6 rounded-sm shadow-xl max-w-[230px]"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Music className="text-[oklch(0.68_0.15_65)] mb-3" size={28} />
                <p className="font-display text-lg leading-tight mb-1">Acoustic Guitar</p>
                <p className="font-display text-lg italic leading-tight mb-3">& Vocals</p>
                <p className="font-body text-xs text-[oklch(0.75_0.02_75)] leading-relaxed">
                  Folk · Pop · Rock · Country · Originals
                </p>
              </motion.div>
            </div>
          </FadeUp>
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
    "South Bay", "East Bay", "Peninsula", "Monterey Bay Area",
  ];

  return (
    <section id="coverage" className="py-24 bg-[oklch(0.93_0.02_75)]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div className="relative rounded-sm overflow-hidden shadow-2xl">
              <img
                src={IMAGES.map}
                alt="R & R Acoustic Duo service area — Bay Area, Morgan Hill, Gilroy, Hollister"
                className="w-full h-[420px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.22_0.05_35/0.3)] to-transparent" />
            </div>
          </FadeUp>

          <FadeUp delay={200}>
            <p className="section-label mb-3">Where We Travel</p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.22_0.05_35)] leading-tight mb-4">
              Serving the<br />
              <span className="italic">Bay Area & Beyond</span>
            </h2>
            <div className="golden-divider max-w-[80px] mb-6" />
            <p className="font-body text-[oklch(0.35_0.06_40)] text-lg leading-relaxed mb-8">
              Based in the San Francisco Bay Area, Rebecca and Ronnie regularly perform throughout the South Bay, Silicon Valley, and the scenic communities of Morgan Hill, Gilroy, and Hollister. We're available for venues within a comfortable travel radius.
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {areas.map((area, i) => (
                <motion.span
                  key={area}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  viewport={{ once: true }}
                  className="font-body text-xs text-[oklch(0.35_0.06_40)] bg-[oklch(1_0.01_80)] border border-[oklch(0.88_0.025_70)] px-3 py-1.5 rounded-full hover:border-[oklch(0.68_0.15_65)] hover:text-[oklch(0.55_0.12_55)] transition-colors cursor-default"
                >
                  {area}
                </motion.span>
              ))}
            </div>

            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-amber"
            >
              <MapPin size={16} />
              Check Availability for Your Area
            </button>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Section ─────────────────────────────────────
function TestimonialsSection() {
  return (
    <section className="py-24 bg-[oklch(0.22_0.05_35)] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGES.pandv})`, filter: "blur(4px)" }}
      />
      <div className="absolute inset-0 bg-[oklch(0.22_0.05_35/0.88)]" />

      <div className="container relative z-10">
        <FadeUp className="text-center mb-16">
          <p className="section-label text-[oklch(0.68_0.15_65)] mb-3">Kind Words</p>
          <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.96_0.025_75)] leading-tight mb-4">
            What Venues Are Saying
          </h2>
          <div className="golden-divider max-w-[80px] mx-auto" />
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={i} delay={i * 120}>
              <motion.div
                className="testimonial-card h-full flex flex-col"
                whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(44,24,16,0.2)" }}
                transition={{ duration: 0.3 }}
              >
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
              </motion.div>
            </FadeUp>
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
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[oklch(0.97_0.015_75)]">
      <div className="container">
        <FadeUp className="text-center mb-16">
          <p className="section-label mb-3">Get in Touch</p>
          <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.22_0.05_35)] leading-tight mb-4">
            Book R & R for<br />
            <span className="italic">Your Venue</span>
          </h2>
          <div className="golden-divider max-w-[80px] mx-auto mb-6" />
          <p className="font-body text-[oklch(0.35_0.06_40)] text-lg max-w-2xl mx-auto">
            Ready to bring live acoustic music to your venue or event? Reach out to Rebecca and Ronnie — they'd love to discuss how R & R can elevate your guests' experience.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <FadeUp className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-2xl text-[oklch(0.22_0.05_35)] mb-4">
                  Let's Make Music Happen
                </h3>
                <p className="font-body text-[oklch(0.45_0.04_50)] leading-relaxed">
                  Whether you're a winery looking for weekend entertainment, a restaurant wanting to elevate the dining experience, or planning a private event — Rebecca and Ronnie are here to make it memorable.
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

              {/* Members quick info */}
              <div className="bg-[oklch(0.22_0.05_35)] rounded-sm p-5">
                <img src={IMAGES.logoLight} alt="R & R logo" className="h-10 w-auto mb-3" />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mic2 size={14} className="text-[oklch(0.68_0.15_65)]" />
                    <p className="font-body text-sm text-[oklch(0.96_0.025_75)]">Rebecca Barnes — Vocals</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Guitar size={14} className="text-[oklch(0.68_0.15_65)]" />
                    <p className="font-body text-sm text-[oklch(0.96_0.025_75)]">Ron Butron — Acoustic Guitar</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[oklch(0.96_0.025_75/0.1)]">
                  <a
                    href="https://www.instagram.com/rnr_music_duo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-amber text-sm w-full justify-center"
                  >
                    <Instagram size={14} />
                    Follow @rnr_music_duo
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Contact Form */}
          <FadeUp className="lg:col-span-3" delay={200}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[oklch(1_0.01_80)] border border-[oklch(0.68_0.15_65/0.4)] rounded-sm p-10 text-center h-full flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 bg-[oklch(0.68_0.15_65/0.15)] rounded-full flex items-center justify-center mb-4">
                  <Music size={32} className="text-[oklch(0.68_0.15_65)]" />
                </div>
                <h3 className="font-display text-2xl text-[oklch(0.22_0.05_35)] mb-3">Message Received!</h3>
                <p className="font-body text-[oklch(0.45_0.04_50)] leading-relaxed mb-6">
                  Thank you for reaching out. Rebecca and Ronnie will be in touch soon to discuss your event and availability.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-amber">
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[oklch(1_0.01_80)] border border-[oklch(0.88_0.025_70)] rounded-sm p-8 shadow-sm space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body text-xs text-[oklch(0.45_0.04_50)] uppercase tracking-wider block mb-2">Your Name *</label>
                    <input type="text" required value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Smith"
                      className="w-full border border-[oklch(0.88_0.025_70)] rounded-sm px-4 py-3 font-body text-sm text-[oklch(0.22_0.05_35)] bg-[oklch(0.97_0.015_75)] focus:outline-none focus:border-[oklch(0.68_0.15_65)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-[oklch(0.45_0.04_50)] uppercase tracking-wider block mb-2">Email Address *</label>
                    <input type="email" required value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@yourvenue.com"
                      className="w-full border border-[oklch(0.88_0.025_70)] rounded-sm px-4 py-3 font-body text-sm text-[oklch(0.22_0.05_35)] bg-[oklch(0.97_0.015_75)] focus:outline-none focus:border-[oklch(0.68_0.15_65)] transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body text-xs text-[oklch(0.45_0.04_50)] uppercase tracking-wider block mb-2">Venue / Event Name</label>
                    <input type="text" value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      placeholder="Your Winery or Venue"
                      className="w-full border border-[oklch(0.88_0.025_70)] rounded-sm px-4 py-3 font-body text-sm text-[oklch(0.22_0.05_35)] bg-[oklch(0.97_0.015_75)] focus:outline-none focus:border-[oklch(0.68_0.15_65)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-[oklch(0.45_0.04_50)] uppercase tracking-wider block mb-2">Event Date</label>
                    <input type="date" value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full border border-[oklch(0.88_0.025_70)] rounded-sm px-4 py-3 font-body text-sm text-[oklch(0.22_0.05_35)] bg-[oklch(0.97_0.015_75)] focus:outline-none focus:border-[oklch(0.68_0.15_65)] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-body text-xs text-[oklch(0.45_0.04_50)] uppercase tracking-wider block mb-2">Event Type</label>
                  <select value={formData.eventType}
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
                  <label className="font-body text-xs text-[oklch(0.45_0.04_50)] uppercase tracking-wider block mb-2">Tell Us About Your Event *</label>
                  <textarea required rows={4} value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your venue, expected attendance, duration, and any special requests..."
                    className="w-full border border-[oklch(0.88_0.025_70)] rounded-sm px-4 py-3 font-body text-sm text-[oklch(0.22_0.05_35)] bg-[oklch(0.97_0.015_75)] focus:outline-none focus:border-[oklch(0.68_0.15_65)] transition-colors resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="btn-amber w-full justify-center text-base py-4"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Mail size={16} />
                  Send Booking Inquiry
                </motion.button>
              </form>
            )}
          </FadeUp>
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
          <div>
            <img src={IMAGES.logoLight} alt="R & R Acoustic Duo" className="h-12 w-auto mb-2" />
            <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-[oklch(0.55_0.02_60)] block mb-4">
              Rebecca Barnes & Ron Butron
            </span>
            <p className="font-body text-sm leading-relaxed text-[oklch(0.65_0.02_70)]">
              Warm, intimate acoustic music for wineries, wine bars, restaurants, and private events throughout the San Francisco Bay Area.
            </p>
          </div>
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-[oklch(0.68_0.15_65)] mb-4">Quick Links</p>
            <div className="space-y-2">
              {[
                { label: "About the Duo", id: "#about" },
                { label: "Featured Venues", id: "#venues" },
                { label: "Services", id: "#services" },
                { label: "Coverage Area", id: "#coverage" },
                { label: "Book Us", id: "#contact" },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => document.querySelector(link.id)?.scrollIntoView({ behavior: "smooth" })}
                  className="block font-body text-sm text-[oklch(0.65_0.02_70)] hover:text-[oklch(0.68_0.15_65)] transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
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
            <div className="flex items-center gap-3 text-[oklch(0.65_0.02_70)] mb-6">
              <MapPin size={16} />
              <span className="font-body text-sm">San Francisco Bay Area, CA</span>
            </div>
            <div>
              <p className="font-body text-xs text-[oklch(0.55_0.02_60)] mb-1">Members:</p>
              <p className="font-body text-xs text-[oklch(0.55_0.02_60)]">Rebecca Barnes · Ron Butron</p>
              <p className="font-body text-xs text-[oklch(0.45_0.02_50)] mt-2">
                Morgan Hill · Gilroy · Hollister · Bay Area
              </p>
            </div>
          </div>
        </div>

        <div className="golden-divider mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-[oklch(0.45_0.02_55)]">
            © {new Date().getFullYear()} R & R Acoustic Duo — Rebecca Barnes & Ron Butron. All rights reserved.
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
