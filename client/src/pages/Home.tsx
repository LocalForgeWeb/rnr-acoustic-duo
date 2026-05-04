/* ============================================================
   R & R Acoustic Duo — Home Page
   Design: "Golden Hour Americana" — Editorial Folk / Americana
   Members: Ron Butron (guitar & vocals) & Rebecca Barnes (vocals)
   Features: Dropdown nav, real logo, real duo photo, animated sections,
             Gig Calendar, Live Google Map with venue pins, Flyer link
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { Instagram, Mail, MapPin, Music, ChevronDown, Menu, X, Star, ExternalLink, ChevronRight, Mic2, Guitar, Calendar, Clock, Download, RefreshCw, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MapView } from "@/components/Map";
import { trpc } from "@/lib/trpc";

// ─── Image URLs ───────────────────────────────────────────────
const IMAGES = {
  hero: "/manus-storage/C5D4D096-E8E3-4C44-A96A-965C24E643FB_0493c1fe.png",
  heroMobile: "/manus-storage/hero_mobile_4ec86e03.png",
  logoLight: "/manus-storage/rnr_logo_light_9cbea23b.png",
  logoDark: "/manus-storage/rnr_logo_5be2a5ae.png",
  duoPhoto: "/manus-storage/A0BEAFAF-F3BC-4C21-A12A-FA6A984F6A96_534bfe0c.png",
  pandv: "/manus-storage/IMG_6942_3ffdc999.JPG",
  vinesAndPints: "/manus-storage/IMG_6925_cd3cc598.PNG",
  craveWine: "/manus-storage/IMG_6926_2afdcad9.JPG",
  twinOaks: "/manus-storage/IMG_6927_f6e6eecf.JPG",
  map: "/manus-storage/bay_area_map_b5d6e45e.jpg",
  performance: "/manus-storage/acoustic_performance_a151795a.jpg",
};

// ─── Animated Section Wrapper ─────────────────────────────────
function FadeUp({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
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
    coords: { lat: 37.1305, lng: -121.6544 },
  },
  {
    name: "Vines & Pints",
    location: "Gilroy, CA",
    description: "A cozy fusion of wine tasting and craft beer in the heart of Gilroy — the perfect intimate setting for live acoustic music.",
    image: IMAGES.vinesAndPints,
    url: "https://www.vinesandpints.com/",
    tag: "Wine Bar & Taproom",
    coords: { lat: 37.0058, lng: -121.5683 },
  },
  {
    name: "Crave Wine Company",
    location: "Hollister, CA",
    description: "Downtown Hollister's beloved boutique wine bar and shop, offering a sophisticated tasting room experience with local character.",
    image: IMAGES.craveWine,
    url: "https://www.cravewineco.com/",
    tag: "Wine Bar & Shop",
    coords: { lat: 36.8524, lng: -121.4016 },
  },
  {
    name: "Twin Oaks Community",
    location: "Hollister, CA",
    description: "A vibrant 55+ active adult community in Hollister, where R & R brings joy and live music to residents in a warm, resort-style clubhouse.",
    image: IMAGES.twinOaks,
    url: "https://www.twinoakshollister.com/",
    tag: "Retirement Community",
    coords: { lat: 36.8650, lng: -121.3950 },
  },
];

// ─── Gig Calendar Data ────────────────────────────────────────
// Events are now pulled LIVE from the iCloud calendar via the backend iCal proxy.
// To add/update shows: edit the shared iCloud calendar "R&R Acoustic duo".
// The website will reflect changes within ~5 minutes automatically.

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
      { label: "Ron Butron", href: "#members" },
      { label: "Rebecca Barnes", href: "#members" },
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
    label: "Shows",
    href: "#calendar",
    dropdown: [
      { label: "Upcoming Gigs", href: "#calendar" },
      { label: "Book a Show", href: "#contact" },
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
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full left-0 mt-1 bg-[oklch(1_0.01_80)] border border-[oklch(0.88_0.025_70)] rounded-sm shadow-xl min-w-[180px] py-1 z-50"
                        onMouseEnter={() => handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.dropdown.map((sub) => (
                          <button
                            key={sub.label}
                            onClick={() => scrollTo(sub.href)}
                            className="w-full text-left px-4 py-2.5 font-body text-[0.78rem] text-[oklch(0.35_0.06_40)] hover:text-[oklch(0.55_0.12_55)] hover:bg-[oklch(0.93_0.02_75)] transition-colors flex items-center gap-2"
                          >
                            <ChevronRight size={10} className="text-[oklch(0.68_0.15_65)]" />
                            {sub.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}

            {/* Instagram */}
            <a
              href="https://www.instagram.com/rnr_music_duo"
              target="_blank"
              rel="noopener noreferrer"
              className={`ml-2 p-2 rounded-full transition-colors ${
                isLight
                  ? "text-[oklch(0.96_0.025_75)] hover:text-[oklch(0.68_0.15_65)]"
                  : "text-[oklch(0.35_0.06_40)] hover:text-[oklch(0.55_0.12_55)]"
              }`}
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`md:hidden p-2 ${isLight ? "text-[oklch(0.96_0.025_75)]" : "text-[oklch(0.22_0.05_35)]"}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[oklch(0.15_0.04_30)] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-[oklch(0.96_0.025_75/0.1)]">
              <img src={IMAGES.logoLight} alt="R & R Acoustic Duo" className="h-10 w-auto" />
              <button onClick={() => setMenuOpen(false)} className="text-[oklch(0.96_0.025_75)] p-2">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-1">
              {NAV_ITEMS.filter(i => !i.cta).map((item, idx) => (
                <div key={item.label}>
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    onClick={() => scrollTo(item.href)}
                    className="w-full text-left py-4 font-display text-2xl text-[oklch(0.96_0.025_75)] hover:text-[oklch(0.68_0.15_65)] transition-colors border-b border-[oklch(0.96_0.025_75/0.08)]"
                  >
                    {item.label}
                  </motion.button>
                  {/* Sub-links shown inline under parent */}
                  {item.dropdown && (
                    <div className="pl-4 pb-2 space-y-0.5">
                      {item.dropdown.map((sub, subIdx) => (
                        <motion.button
                          key={sub.label}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.06 + subIdx * 0.04 + 0.08 }}
                          onClick={() => scrollTo(sub.href)}
                          className="w-full text-left py-2 font-body text-sm text-[oklch(0.68_0.15_65)] hover:text-[oklch(0.96_0.025_75)] transition-colors flex items-center gap-2"
                        >
                          <ChevronRight size={10} className="opacity-60" />
                          {sub.label}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="p-6 space-y-3">
              <button
                onClick={() => scrollTo("#contact")}
                className="btn-amber w-full justify-center text-base py-4"
              >
                <Music size={18} />
                Book Us for Your Venue
              </button>
              <a
                href="https://www.instagram.com/rnr_music_duo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 font-body text-sm text-[oklch(0.75_0.02_75)] hover:text-[oklch(0.68_0.15_65)] transition-colors"
              >
                <Instagram size={16} />
                @rnr_music_duo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero Section ─────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Mobile hero image */}
        <img
          src={IMAGES.heroMobile}
          alt="R & R Acoustic Duo performing live"
          className="w-full h-full object-cover object-center sm:hidden"
        />
        {/* Desktop hero image */}
        <img
          src={IMAGES.hero}
          alt="R & R Acoustic Duo performing live"
          className="w-full h-full object-cover object-center hidden sm:block"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.22_0.05_35/0.55)] via-[oklch(0.22_0.05_35/0.45)] to-[oklch(0.22_0.05_35/0.75)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <img
            src={IMAGES.logoLight}
            alt="R & R Acoustic Duo"
            className="h-24 md:h-32 w-auto mx-auto drop-shadow-2xl"
          />
        </motion.div>

        {/* Script tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-script text-[oklch(0.68_0.15_65)] text-3xl md:text-4xl mb-4 drop-shadow-lg"
        >
          Bay Area Live Music
        </motion.p>

        {/* Names */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl md:text-7xl text-[oklch(0.96_0.025_75)] leading-tight mb-2 drop-shadow-xl"
        >
          Ron Butron
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl md:text-6xl text-[oklch(0.88_0.025_75)] italic leading-tight mb-2 drop-shadow-xl"
        >
          <span className="font-normal text-[oklch(0.68_0.15_65)]">&amp;</span> Rebecca Barnes
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="golden-divider max-w-[120px] mx-auto my-6"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="font-body text-[oklch(0.88_0.025_75)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow"
        >
          Warm, intimate acoustic music for wineries, wine bars, restaurants, and private events throughout the San Francisco Bay Area.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-amber text-base px-8 py-4"
          >
            <Music size={18} />
            Book Us for Your Venue
          </button>
          <button
            onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-outline-cream text-base px-8 py-4"
          >
            Meet the Duo
          </button>
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
            Meet Ron & Rebecca
          </h2>
          <div className="golden-divider max-w-[80px] mx-auto mb-6" />
          <p className="font-body text-[oklch(0.45_0.04_50)] text-lg max-w-2xl mx-auto leading-relaxed">
            R & R Acoustic Duo brings a warm, soulful sound to venues across the San Francisco Bay Area. Blending acoustic guitar with rich vocals, they perform a curated mix of folk, pop, rock, and country that feels both familiar and alive.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20" id="members">


          {/* Real Duo Photo */}
          <FadeUp delay={200}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[oklch(0.68_0.15_65/0.35)] rounded-sm pointer-events-none" />
              <img
                src={IMAGES.duoPhoto}
                alt="Ron Butron and Rebecca Barnes — R & R Acoustic Duo"
                className="relative w-full h-[520px] object-cover object-top rounded-sm shadow-2xl"
              />
              {/* Name overlay — Ron first */}
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
                    <p className="font-body text-xs text-[oklch(0.68_0.15_65)] uppercase tracking-wider">Guitar & Vocals</p>
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
              Ron's masterful acoustic guitar and vocals paired with Rebecca's warm, expressive voice create a sound that is both intimate and captivating — perfect for any venue looking to elevate the guest experience.
            </p>

            {/* Member Cards — Ron first */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { name: "Ron Butron", role: "Guitar & Vocals", icon: <Guitar size={20} />, desc: "Masterful fingerpicking, rhythm guitar, and lead vocals that anchor every performance." },
                { name: "Rebecca Barnes", role: "Vocals", icon: <Mic2 size={20} />, desc: "Warm, expressive voice that fills any room with emotion and energy." },
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

// ─── Instagram Reel Section ───────────────────────────────────
function ReelSection() {
  return (
    <section id="videos" className="py-24 bg-[oklch(0.97_0.015_75)]">
      <div className="container">
        <FadeUp className="text-center mb-16">
          <p className="section-label mb-3">Watch Us Perform</p>
          <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.22_0.05_35)] leading-tight mb-4">
            Live Performances
          </h2>
          <div className="golden-divider max-w-[80px] mx-auto mb-6" />
          <p className="font-body text-[oklch(0.45_0.04_50)] text-lg max-w-2xl mx-auto leading-relaxed">
            Check out R & R in action at one of their favorite Bay Area venues.
          </p>
        </FadeUp>

        <FadeUp className="flex justify-center">
          <div className="w-full max-w-md border-4 border-[oklch(0.68_0.15_65)] rounded-sm shadow-2xl overflow-hidden bg-[oklch(0.97_0.015_75)]">
            <iframe
              src="https://www.instagram.com/reel/C8EKqPEOl1z/embed/captioned/"
              width="100%"
              height="600"
              frameBorder="0"
              scrolling="no"
              allowTransparency
              className="rounded-none"
            />
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
                    Visit Venue <ExternalLink size={10} />
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


function CalendarSection() {
  // Live iCal data — refetches every 5 minutes
  const { data, isLoading, isError, refetch, isFetching } =
    trpc.calendar.getGigs.useQuery(undefined, {
      refetchInterval: 5 * 60 * 1000,
      staleTime: 4 * 60 * 1000,
    });

  const allGigs = [...(data?.upcoming ?? []), ...(data?.past ?? [])];

  // Current month/year state
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-indexed
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());

  const monthName = new Date(viewYear, viewMonth, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
    setSelectedDay(null);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
    setSelectedDay(null);
  };

  // Build calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrev = new Date(viewYear, viewMonth, 0).getDate();

  // Map gigs to day numbers for this month
  const gigsByDay: Record<number, typeof allGigs> = {};
  allGigs.forEach(gig => {
    const d = new Date(gig.date + "T12:00:00");
    if (d.getFullYear() === viewYear && d.getMonth() === viewMonth) {
      const day = d.getDate();
      if (!gigsByDay[day]) gigsByDay[day] = [];
      gigsByDay[day].push(gig);
    }
  });

  // Build grid cells: prev-month trailing, current month, next-month leading
  const cells: { day: number; type: "prev" | "current" | "next" }[] = [];
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: daysInPrev - i, type: "prev" });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, type: "current" });
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) cells.push({ day: d, type: "next" });

  const isToday = (day: number) =>
    day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

  const selectedGigs = selectedDay ? (gigsByDay[selectedDay] ?? []) : [];
  const nextUpcomingGig = data?.upcoming?.[0] ?? null;
  const panelGigs = selectedGigs.length > 0 ? selectedGigs : (nextUpcomingGig ? [nextUpcomingGig] : []);
  const panelIsFallback = selectedGigs.length === 0 && panelGigs.length > 0;
  const panelDate = panelIsFallback && nextUpcomingGig
    ? new Date(nextUpcomingGig.date + "T12:00:00")
    : selectedDay ? new Date(viewYear, viewMonth, selectedDay) : new Date();

  const formatTime = (gig: { time?: string | null; endTime?: string | null }) => {
    if (!gig.time) return null;
    return gig.endTime ? `${gig.time} – ${gig.endTime}` : gig.time;
  };

  const formatLastUpdated = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  };

  return (
    <section id="calendar" className="py-24 bg-[oklch(0.93_0.02_75)]">
      <div className="container">
        <FadeUp className="text-center mb-12">
          <p className="section-label mb-3">Live Shows</p>
          <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.22_0.05_35)] leading-tight mb-4">
            Upcoming Performances
          </h2>
          <div className="golden-divider max-w-[80px] mx-auto mb-6" />
          <p className="font-body text-[oklch(0.45_0.04_50)] text-lg max-w-2xl mx-auto">
            Catch Ron & Rebecca live at one of their regular venues across the Bay Area. This calendar syncs live from their iCloud — shows appear automatically when added.
          </p>
          {/* Live sync indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="inline-flex items-center gap-1.5 font-body text-xs text-[oklch(0.55_0.04_55)] bg-[oklch(1_0.01_80)] border border-[oklch(0.88_0.025_70)] px-3 py-1.5 rounded-full">
              <span className={`w-1.5 h-1.5 rounded-full ${isFetching ? 'bg-amber-400 animate-pulse' : 'bg-green-500'}`} />
              {isFetching ? 'Syncing...' : `Live calendar${data?.fetchedAt ? ` · Updated ${formatLastUpdated(data.fetchedAt)}` : ''}`}
            </span>
            <button
              onClick={() => refetch()}
              className="p-1.5 rounded-full text-[oklch(0.55_0.04_55)] hover:text-[oklch(0.55_0.12_55)] hover:bg-[oklch(0.88_0.025_70)] transition-colors"
              aria-label="Refresh calendar"
            >
              <RefreshCw size={12} className={isFetching ? 'animate-spin' : ''} />
            </button>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* ── Full Monthly Calendar ── */}
          <FadeUp className="lg:col-span-2">
            <div className="bg-[oklch(1_0.01_80)] border border-[oklch(0.88_0.025_70)] rounded-sm shadow-lg overflow-hidden">
              {/* Month navigation header */}
              <div className="flex items-center justify-between px-6 py-4 bg-[oklch(0.22_0.05_35)]">
                <button
                  onClick={prevMonth}
                  className="w-9 h-9 flex items-center justify-center rounded-full text-[oklch(0.96_0.025_75)] hover:bg-[oklch(0.96_0.025_75/0.12)] hover:text-[oklch(0.68_0.15_65)] transition-all"
                  aria-label="Previous month"
                >
                  <ChevronDown size={18} className="rotate-90" />
                </button>
                <h3 className="font-display text-xl text-[oklch(0.96_0.025_75)] tracking-wide">
                  {monthName}
                </h3>
                <button
                  onClick={nextMonth}
                  className="w-9 h-9 flex items-center justify-center rounded-full text-[oklch(0.96_0.025_75)] hover:bg-[oklch(0.96_0.025_75/0.12)] hover:text-[oklch(0.68_0.15_65)] transition-all"
                  aria-label="Next month"
                >
                  <ChevronDown size={18} className="-rotate-90" />
                </button>
              </div>

              {/* Day-of-week headers */}
              <div className="grid grid-cols-7 border-b border-[oklch(0.88_0.025_70)]">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                  <div key={d} className="py-2 text-center font-body text-[0.65rem] font-bold uppercase tracking-wider text-[oklch(0.55_0.04_55)]">
                    {d}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              {isLoading ? (
                <div className="grid grid-cols-7">
                  {Array.from({ length: 42 }).map((_, i) => (
                    <div key={i} className="h-14 border-b border-r border-[oklch(0.88_0.025_70/0.5)] animate-pulse bg-[oklch(0.93_0.02_75/0.3)]" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-7">
                  {cells.map((cell, idx) => {
                    const isCurrentMonth = cell.type === "current";
                    const hasGigs = isCurrentMonth && !!gigsByDay[cell.day];
                    const gigCount = hasGigs ? gigsByDay[cell.day].length : 0;
                    const isSel = isCurrentMonth && selectedDay === cell.day;
                    const isTod = isCurrentMonth && isToday(cell.day);

                    return (
                      <motion.button
                        key={idx}
                        onClick={() => isCurrentMonth ? setSelectedDay(isSel ? null : cell.day) : undefined}
                        className={`
                          relative min-h-[56px] md:min-h-[64px] p-1.5 border-b border-r border-[oklch(0.88_0.025_70/0.5)]
                          flex flex-col items-center
                          transition-all duration-150
                          ${!isCurrentMonth ? "cursor-default" : "cursor-pointer"}
                          ${isSel ? "bg-[oklch(0.22_0.05_35)]" : isCurrentMonth ? "hover:bg-[oklch(0.93_0.02_75)]" : ""}
                        `}
                        whileHover={isCurrentMonth ? { scale: 1.04 } : {}}
                        whileTap={isCurrentMonth ? { scale: 0.97 } : {}}
                        transition={{ duration: 0.12 }}
                        aria-label={isCurrentMonth ? `${cell.day} ${monthName}${hasGigs ? `, ${gigCount} show${gigCount > 1 ? 's' : ''}` : ''}` : undefined}
                      >
                        {/* Day number */}
                        <span className={`
                          font-body text-sm font-semibold leading-none mb-1 mt-1 w-7 h-7 flex items-center justify-center rounded-full
                          ${!isCurrentMonth ? "text-[oklch(0.75_0.02_75)]" : ""}
                          ${isCurrentMonth && !isTod && !isSel ? "text-[oklch(0.35_0.06_40)]" : ""}
                          ${isTod && !isSel ? "bg-[oklch(0.68_0.15_65)] text-[oklch(0.15_0.04_30)] font-bold" : ""}
                          ${isSel ? "bg-[oklch(0.68_0.15_65)] text-[oklch(0.15_0.04_30)] font-bold" : ""}
                        `}>
                          {cell.day}
                        </span>
                        {/* Event dots */}
                        {hasGigs && (
                          <div className="flex gap-0.5 flex-wrap justify-center">
                            {Array.from({ length: Math.min(gigCount, 3) }).map((_, di) => (
                              <span
                                key={di}
                                className={`w-1.5 h-1.5 rounded-full ${isSel ? "bg-[oklch(0.68_0.15_65)]" : "bg-[oklch(0.55_0.12_55)]"}`}
                              />
                            ))}
                            {gigCount > 3 && (
                              <span className={`font-body text-[0.5rem] font-bold ${isSel ? "text-[oklch(0.68_0.15_65)]" : "text-[oklch(0.55_0.12_55)]"}`}>+{gigCount - 3}</span>
                            )}
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* Always-visible event detail panel */}
              <div className="border-t border-[oklch(0.88_0.025_70)]">
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar size={16} className="text-[oklch(0.68_0.15_65)] flex-shrink-0" />
                    <h4 className="font-display text-lg text-[oklch(0.22_0.05_35)]">
                      {panelIsFallback ? (
                        <span className="flex items-center gap-2">
                          Next Show
                          <span className="font-body text-sm text-[oklch(0.55_0.04_55)] font-normal">
                            — {panelDate.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric" })}
                          </span>
                        </span>
                      ) : (
                        panelDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
                      )}
                    </h4>
                  </div>
                  {isLoading ? (
                    <div className="space-y-2">
                      {[1,2].map(i => <div key={i} className="h-16 rounded-sm bg-[oklch(0.93_0.02_75)] animate-pulse" />)}
                    </div>
                  ) : panelGigs.length === 0 ? (
                    <div className="flex items-center gap-3 py-2">
                      <div className="w-10 h-10 bg-[oklch(0.93_0.02_75)] rounded-sm flex items-center justify-center flex-shrink-0">
                        <Music size={16} className="text-[oklch(0.75_0.02_75)]" />
                      </div>
                      <div>
                        <p className="font-body text-sm text-[oklch(0.55_0.04_55)] italic">No shows scheduled for this day.</p>
                        <p className="font-body text-xs text-[oklch(0.65_0.02_70)] mt-0.5">Click a day with an amber dot to see show details.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {panelGigs.map(gig => (
                        <motion.div
                          key={gig.uid}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-start gap-4 bg-[oklch(0.93_0.02_75)] rounded-sm p-4 border-l-4 border-[oklch(0.68_0.15_65)]"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-[oklch(0.22_0.05_35)] rounded-sm flex items-center justify-center">
                            <Music size={16} className="text-[oklch(0.68_0.15_65)]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-display text-base text-[oklch(0.22_0.05_35)] font-semibold">{gig.title}</p>
                            {gig.location && (
                              <p className="font-body text-xs text-[oklch(0.55_0.04_55)] flex items-center gap-1 mt-0.5">
                                <MapPin size={10} /> {gig.location}
                              </p>
                            )}
                            {formatTime(gig) && (
                              <p className="font-body text-xs text-[oklch(0.55_0.04_55)] flex items-center gap-1 mt-0.5">
                                <Clock size={10} /> {formatTime(gig)}
                              </p>
                            )}
                            {gig.description && (
                              <p className="font-body text-xs text-[oklch(0.45_0.04_50)] mt-1 leading-relaxed">{gig.description}</p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer legend */}
              <div className="px-5 py-3 border-t border-[oklch(0.88_0.025_70)] bg-[oklch(0.97_0.015_75)] flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1.5 font-body text-xs text-[oklch(0.55_0.04_55)]">
                  <span className="w-2 h-2 rounded-full bg-[oklch(0.55_0.12_55)]" />
                  Show scheduled
                </span>
                <span className="flex items-center gap-1.5 font-body text-xs text-[oklch(0.55_0.04_55)]">
                  <span className="w-5 h-5 rounded-full bg-[oklch(0.68_0.15_65)] flex items-center justify-center text-[oklch(0.15_0.04_30)] font-bold text-[0.6rem]">7</span>
                  Today
                </span>
                <span className="font-body text-xs text-[oklch(0.55_0.04_55)]">Click any day to view details below</span>
              </div>
            </div>
          </FadeUp>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Book CTA */}
            <FadeUp delay={100}>
              <div className="bg-[oklch(0.22_0.05_35)] rounded-sm p-6">
                <img src={IMAGES.logoLight} alt="R & R" className="h-10 w-auto mb-4" />
                <h3 className="font-display text-xl text-[oklch(0.96_0.025_75)] mb-2">
                  Want R & R at Your Venue?
                </h3>
                <p className="font-body text-sm text-[oklch(0.75_0.02_75)] leading-relaxed mb-5">
                  Ron & Rebecca are available for bookings throughout the Bay Area. Reach out to check availability for your date.
                </p>
                <button
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="btn-amber w-full justify-center"
                >
                  <Music size={15} />
                  Book a Show
                </button>
              </div>
            </FadeUp>

            {/* Upcoming shows list (next 4) */}
            <FadeUp delay={150}>
              <div className="bg-[oklch(1_0.01_80)] border border-[oklch(0.88_0.025_70)] rounded-sm p-5">
                <p className="section-label mb-4">Next Shows</p>
                {isLoading ? (
                  <div className="space-y-3">
                    {[1,2,3].map(n => (
                      <div key={n} className="flex gap-3 animate-pulse">
                        <div className="w-10 h-10 bg-[oklch(0.88_0.025_70)] rounded-sm flex-shrink-0" />
                        <div className="flex-1 space-y-1.5">
                          <div className="h-3 bg-[oklch(0.88_0.025_70)] rounded w-3/4" />
                          <div className="h-2.5 bg-[oklch(0.88_0.025_70)] rounded w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (data?.upcoming ?? []).length === 0 ? (
                  <div className="text-center py-4">
                    <Calendar size={24} className="text-[oklch(0.68_0.15_65)] mx-auto mb-2" />
                    <p className="font-body text-sm text-[oklch(0.55_0.04_55)]">No upcoming shows yet.</p>
                    <p className="font-body text-xs text-[oklch(0.65_0.02_70)] mt-1">Check back soon!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {(data?.upcoming ?? []).slice(0, 4).map(gig => {
                      const d = new Date(gig.date + "T12:00:00");
                      return (
                        <button
                          key={gig.uid}
                          onClick={() => {
                            setViewYear(d.getFullYear());
                            setViewMonth(d.getMonth());
                            setSelectedDay(d.getDate());
                            document.getElementById("calendar")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="w-full flex items-center gap-3 hover:bg-[oklch(0.93_0.02_75)] rounded-sm p-1.5 -mx-1.5 transition-colors text-left group"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-[oklch(0.22_0.05_35)] rounded-sm flex flex-col items-center justify-center">
                            <span className="font-body text-[0.5rem] font-bold text-[oklch(0.68_0.15_65)] uppercase leading-none">
                              {d.toLocaleDateString("en-US", { month: "short" })}
                            </span>
                            <span className="font-display text-base font-bold text-[oklch(0.96_0.025_75)] leading-none">
                              {d.getDate()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-body text-xs font-semibold text-[oklch(0.35_0.06_40)] group-hover:text-[oklch(0.55_0.12_55)] transition-colors truncate">{gig.title}</p>
                            {gig.location && <p className="font-body text-xs text-[oklch(0.55_0.04_55)] truncate">{gig.location}</p>}
                          </div>
                          <ChevronRight size={12} className="text-[oklch(0.68_0.15_65)] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </FadeUp>

            {/* Instagram follow */}
            <FadeUp delay={300}>
              <a
                href="https://www.instagram.com/rnr_music_duo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gradient-to-r from-[oklch(0.55_0.2_20)] to-[oklch(0.55_0.18_310)] rounded-sm p-4 hover:opacity-90 transition-opacity"
              >
                <Instagram size={22} className="text-white flex-shrink-0" />
                <div>
                  <p className="font-body text-xs font-bold text-white uppercase tracking-wider">Follow for Updates</p>
                  <p className="font-body text-sm text-white/80">@rnr_music_duo</p>
                </div>
              </a>
            </FadeUp>
          </div>
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
                R & R Acoustic Duo adapts to the unique character of every venue and event. Whether you need background ambiance or an engaging live performance, Ron and Rebecca deliver music that enhances the experience for your guests.
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

// ─── Coverage Section (Live Google Map) ──────────────────────
function CoverageSection() {
  const areas = [
    "San Francisco Bay Area", "Silicon Valley", "San Jose", "Morgan Hill",
    "Gilroy", "Hollister", "Santa Clara County", "San Benito County",
    "South Bay", "East Bay", "Peninsula", "Monterey Bay Area",
  ];

  // Center between Bay Area and Hollister, zoom 9 shows both clearly
  const mapCenter = { lat: 37.15, lng: -121.65 };
  const mapZoom = 9;

  const venueMarkers = VENUES.map((v) => ({
    position: v.coords,
    title: `${v.name} — ${v.location}`,
  }));

  const handleMapReady = (map: google.maps.Map) => {
    venueMarkers.forEach((marker) => {
      const pin = document.createElement("div");
      pin.innerHTML = `
        <svg width="40" height="50" viewBox="0 0 40 50" style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4))">
          <defs>
            <linearGradient id="pinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#8b4513;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#5c2e0f;stop-opacity:1" />
            </linearGradient>
          </defs>
          <!-- Gold border -->
          <path d="M 20 3 C 11 3, 3 11, 3 20 C 3 34, 20 47, 20 47 C 20 47, 37 34, 37 20 C 37 11, 29 3, 20 3 Z" fill="none" stroke="#d4af37" stroke-width="2.5"/>
          <!-- Main teardrop body -->
          <path d="M 20 5 C 12 5, 5 12, 5 20 C 5 32, 20 44, 20 44 C 20 44, 35 32, 35 20 C 35 12, 28 5, 20 5 Z" fill="url(#pinGrad)"/>
          <!-- Inner circle -->
          <circle cx="20" cy="19" r="7" fill="#cd7f32" opacity="0.9"/>
        </svg>
      `;
      pin.style.cssText = `display: flex; align-items: center; justify-content: center; width: 40px; height: 50px;`;
      new google.maps.marker.AdvancedMarkerElement({
        map,
        position: marker.position,
        title: marker.title,
        content: pin,
      });
    });
  };

  return (
    <section id="coverage" className="py-24 bg-[oklch(0.93_0.02_75)]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-[oklch(0.68_0.15_65)]">
              {/* Top info bar */}
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[oklch(0.22_0.05_35/0.8)] to-transparent px-4 py-3 pointer-events-none z-10">
                <p className="font-display text-xs text-[oklch(0.68_0.15_65)] uppercase tracking-widest font-semibold">Bay Area & Beyond</p>
              </div>
              <MapView
                className="w-full h-[460px]"
                initialCenter={mapCenter}
                initialZoom={mapZoom}
                onMapReady={handleMapReady}
              />
              {/* Bottom info bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[oklch(0.22_0.05_35/0.92)] via-[oklch(0.22_0.05_35/0.7)] to-transparent px-4 py-5 pointer-events-none">
                <p className="font-body text-xs text-[oklch(0.96_0.025_75)] flex items-center gap-2 font-semibold">
                  <MapPin size={13} className="text-[oklch(0.68_0.15_65)] flex-shrink-0" />
                  <span>Venues: P&V Winery · Vines & Pints · Crave Wine · Twin Oaks</span>
                </p>
              </div>
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
              Based in the San Francisco Bay Area, Ron and Rebecca regularly perform throughout the South Bay, Silicon Valley, and the scenic communities of Morgan Hill, Gilroy, and Hollister. Available for venues within a comfortable travel radius.
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

// ─── Flyer Template Section ───────────────────────────────────
function FlyerSection() {
  const [selectedVenue, setSelectedVenue] = useState(VENUES[0]);
  const [customDate, setCustomDate] = useState("Saturday, June 7, 2025");
  const [customTime, setCustomTime] = useState("2:00 PM – 5:00 PM");
  const [customNote, setCustomNote] = useState("Free to attend · All ages welcome");

  return (
    <section id="flyer" className="py-24 bg-[oklch(0.97_0.015_75)]">
      <div className="container">
        <FadeUp className="text-center mb-16">
          <p className="section-label mb-3">Promote Your Show</p>
          <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.22_0.05_35)] leading-tight mb-4">
            Gig Flyer Template
          </h2>
          <div className="golden-divider max-w-[80px] mx-auto mb-6" />
          <p className="font-body text-[oklch(0.45_0.04_50)] text-lg max-w-2xl mx-auto">
            Use this template to promote upcoming shows. Fill in the details, screenshot or print the preview, and share on social media or at your venue.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Controls */}
          <FadeUp>
            <div className="bg-[oklch(1_0.01_80)] border border-[oklch(0.88_0.025_70)] rounded-sm p-7 space-y-5">
              <h3 className="font-display text-xl text-[oklch(0.22_0.05_35)] mb-2">Customize Flyer</h3>
              <div className="golden-divider mb-6" />

              <div>
                <label className="font-body text-xs text-[oklch(0.45_0.04_50)] uppercase tracking-wider block mb-2">Venue</label>
                <select
                  value={selectedVenue.name}
                  onChange={(e) => setSelectedVenue(VENUES.find((v) => v.name === e.target.value) || VENUES[0])}
                  className="w-full border border-[oklch(0.88_0.025_70)] rounded-sm px-4 py-3 font-body text-sm text-[oklch(0.22_0.05_35)] bg-[oklch(0.97_0.015_75)] focus:outline-none focus:border-[oklch(0.68_0.15_65)] transition-colors"
                >
                  {VENUES.map((v) => (
                    <option key={v.name} value={v.name}>{v.name} — {v.location}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-body text-xs text-[oklch(0.45_0.04_50)] uppercase tracking-wider block mb-2">Date</label>
                <input
                  type="text"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  placeholder="e.g. Saturday, June 7, 2025"
                  className="w-full border border-[oklch(0.88_0.025_70)] rounded-sm px-4 py-3 font-body text-sm text-[oklch(0.22_0.05_35)] bg-[oklch(0.97_0.015_75)] focus:outline-none focus:border-[oklch(0.68_0.15_65)] transition-colors"
                />
              </div>

              <div>
                <label className="font-body text-xs text-[oklch(0.45_0.04_50)] uppercase tracking-wider block mb-2">Time</label>
                <input
                  type="text"
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                  placeholder="e.g. 2:00 PM – 5:00 PM"
                  className="w-full border border-[oklch(0.88_0.025_70)] rounded-sm px-4 py-3 font-body text-sm text-[oklch(0.22_0.05_35)] bg-[oklch(0.97_0.015_75)] focus:outline-none focus:border-[oklch(0.68_0.15_65)] transition-colors"
                />
              </div>

              <div>
                <label className="font-body text-xs text-[oklch(0.45_0.04_50)] uppercase tracking-wider block mb-2">Additional Note</label>
                <input
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="e.g. Free to attend · All ages welcome"
                  className="w-full border border-[oklch(0.88_0.025_70)] rounded-sm px-4 py-3 font-body text-sm text-[oklch(0.22_0.05_35)] bg-[oklch(0.97_0.015_75)] focus:outline-none focus:border-[oklch(0.68_0.15_65)] transition-colors"
                />
              </div>

              <div className="pt-2">
                <p className="font-body text-xs text-[oklch(0.55_0.04_55)] leading-relaxed bg-[oklch(0.93_0.02_75)] rounded-sm p-3">
                  <strong className="text-[oklch(0.35_0.06_40)]">How to use:</strong> Customize the fields above, then take a screenshot of the flyer preview to share on Instagram, Facebook, or print for your venue. A print-ready PDF export can be added — just ask!
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Flyer Preview */}
          <FadeUp delay={200}>
            <div className="sticky top-24">
              <p className="section-label mb-3 text-center">Preview</p>
              {/* Flyer card */}
              <div
                id="flyer-preview"
                className="relative overflow-hidden rounded-sm shadow-2xl"
                style={{ aspectRatio: "4/5", background: "oklch(0.22 0.05 35)" }}
              >
                {/* Background venue image */}
                <img
                  src={selectedVenue.image}
                  alt={selectedVenue.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.22_0.05_35/0.6)] via-[oklch(0.22_0.05_35/0.5)] to-[oklch(0.22_0.05_35/0.9)]" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-between p-8 text-center">
                  {/* Top */}
                  <div>
                    <p className="font-body text-[0.6rem] font-bold tracking-[0.3em] uppercase text-[oklch(0.68_0.15_65)] mb-3">
                      Live Acoustic Music
                    </p>
                    <img src={IMAGES.logoLight} alt="R & R" className="h-16 w-auto mx-auto mb-3 drop-shadow-xl" />
                    <p className="font-script text-[oklch(0.68_0.15_65)] text-2xl">Ron Butron & Rebecca Barnes</p>
                  </div>

                  {/* Middle */}
                  <div>
                    <div className="golden-divider max-w-[60px] mx-auto mb-5" />
                    <p className="font-display text-3xl font-bold text-[oklch(0.96_0.025_75)] mb-1 leading-tight">
                      {selectedVenue.name}
                    </p>
                    <p className="font-body text-sm text-[oklch(0.75_0.02_75)] flex items-center justify-center gap-1 mb-6">
                      <MapPin size={12} /> {selectedVenue.location}
                    </p>
                    <div className="bg-[oklch(0.68_0.15_65)] px-6 py-3 rounded-sm inline-block mb-3">
                      <p className="font-display text-lg font-bold text-[oklch(0.15_0.04_30)]">{customDate}</p>
                    </div>
                    <p className="font-body text-sm text-[oklch(0.88_0.025_75)] flex items-center justify-center gap-1.5">
                      <Clock size={13} /> {customTime}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div>
                    <div className="golden-divider max-w-[60px] mx-auto mb-4" />
                    <p className="font-body text-xs text-[oklch(0.75_0.02_75)] mb-2">{customNote}</p>
                    <p className="font-body text-[0.6rem] text-[oklch(0.55_0.02_60)] uppercase tracking-widest">
                      @rnr_music_duo
                    </p>
                  </div>
                </div>
              </div>

              <p className="font-body text-xs text-[oklch(0.55_0.04_55)] text-center mt-3 flex items-center justify-center gap-1.5">
                <Download size={12} />
                Screenshot or print this preview to share
              </p>
            </div>
          </FadeUp>
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
            Ready to bring live acoustic music to your venue or event? Reach out to Ron and Rebecca — they'd love to discuss how R & R can elevate your guests' experience.
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
                  Whether you're a winery looking for weekend entertainment, a restaurant wanting to elevate the dining experience, or planning a private event — Ron and Rebecca are here to make it memorable.
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

              {/* Members quick info — Ron first */}
              <div className="bg-[oklch(0.22_0.05_35)] rounded-sm p-5">
                <img src={IMAGES.logoLight} alt="R & R logo" className="h-10 w-auto mb-3" />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Guitar size={14} className="text-[oklch(0.68_0.15_65)]" />
                    <p className="font-body text-sm text-[oklch(0.96_0.025_75)]">Ron Butron — Guitar & Vocals</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mic2 size={14} className="text-[oklch(0.68_0.15_65)]" />
                    <p className="font-body text-sm text-[oklch(0.96_0.025_75)]">Rebecca Barnes — Vocals</p>
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
                  Thank you for reaching out. Ron and Rebecca will be in touch soon to discuss your event and availability.
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
              Ron Butron & Rebecca Barnes
            </span>
            <p className="font-body text-sm leading-relaxed text-[oklch(0.65_0.02_70)]">
              Warm, intimate acoustic music for wineries, wine bars, restaurants, and private events throughout the San Francisco Bay Area.
            </p>
          </div>
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-[oklch(0.55_0.02_60)] mb-4">Quick Links</p>
            <div className="space-y-2">
              {[
                { label: "About the Duo", href: "#about" },
                { label: "Featured Venues", href: "#venues" },
                { label: "Upcoming Shows", href: "#calendar" },
                { label: "Services", href: "#services" },
                { label: "Coverage Area", href: "#coverage" },
                { label: "Gig Flyer", href: "#flyer" },
                { label: "Book Us", href: "#contact" },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" })}
                  className="block font-body text-sm text-[oklch(0.65_0.02_70)] hover:text-[oklch(0.68_0.15_65)] transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-[oklch(0.55_0.02_60)] mb-4">Connect</p>
            <a
              href="https://www.instagram.com/rnr_music_duo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group mb-4"
            >
              <div className="w-9 h-9 bg-[oklch(0.96_0.025_75/0.08)] rounded-full flex items-center justify-center group-hover:bg-[oklch(0.68_0.15_65)] transition-colors">
                <Instagram size={16} className="text-[oklch(0.65_0.02_70)] group-hover:text-[oklch(0.22_0.05_35)] transition-colors" />
              </div>
              <span className="font-body text-sm text-[oklch(0.65_0.02_70)] group-hover:text-[oklch(0.68_0.15_65)] transition-colors">@rnr_music_duo</span>
            </a>
            <p className="font-body text-sm text-[oklch(0.65_0.02_70)] flex items-start gap-2">
              <MapPin size={14} className="text-[oklch(0.68_0.15_65)] mt-0.5 flex-shrink-0" />
              San Francisco Bay Area, CA<br />
              Morgan Hill · Gilroy · Hollister
            </p>
          </div>
        </div>

        <div className="border-t border-[oklch(0.96_0.025_75/0.08)] pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-[oklch(0.45_0.02_55)]">
              © {new Date().getFullYear()} R & R Acoustic Duo — Ron Butron & Rebecca Barnes. All rights reserved.
            </p>
            <p className="font-body text-xs text-[oklch(0.45_0.02_55)]">
              Bay Area Acoustic Music · Available for Hire
            </p>
            <p className="font-body text-xs text-[oklch(0.35_0.02_45)] mt-2 md:mt-0">
              Website by{" "}
              <a
                href="https://localforgeweb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[oklch(0.45_0.04_50)] hover:text-[oklch(0.68_0.15_65)] transition-colors duration-200 underline-offset-2 hover:underline"
              >
                LocalForge
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page Assembly ────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <VenuesSection />
      <ReelSection />
      <CalendarSection />
      <ServicesSection />
      <CoverageSection />
      <TestimonialsSection />
      <FlyerSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
