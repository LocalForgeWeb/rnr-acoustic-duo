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
  logoLight: "/manus-storage/rnr-logo-light-yellow-correct_6223c147.png",
  logoDark: "/manus-storage/rnr-logo-light-yellow-correct_6223c147.png",
  duoPhoto: "/manus-storage/A0BEAFAF-F3BC-4C21-A12A-FA6A984F6A96_534bfe0c.png",
  pandv: "/manus-storage/IMG_6942_3ffdc999.JPG",
  vinesAndPints: "/manus-storage/IMG_6925_cd3cc598.PNG",
  craveWine: "/manus-storage/IMG_6926_2afdcad9.JPG",
  twinOaks: "/manus-storage/IMG_6927_f6e6eecf.JPG",
  map: "/manus-storage/bay_area_map_b5d6e45e.jpg",
  performance: "/manus-storage/IMG_8782_028fdee9.JPG",
  guitarClose: "/manus-storage/IMG_8782_3b7ea25b.JPG",
  indigoProgram: "/manus-storage/IMG_6969_4af8c8a2.PNG",
  harvestFestival: "/manus-storage/IMG_6964_c58d397c.PNG",
  flyer: "https://d2xsxph8kpxj0f.cloudfront.net/310519663522049608/4CERCH953YEJrX9ZU5kAKT/rnr-flyer-may30-crave-UBBpRMRLRFANydME7xznrw.webp",
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

// ─── Static Shows Data ─────────────────────────────────────────
const SHOWS = [
  {
    id: "1",
    date: "Saturday, May 30",
    venue: "Crave Wine Co.",
    location: "Hollister",
    time: "5 to 8 PM",
  },
  {
    id: "2",
    date: "Sunday, June 7",
    venue: "P&V Winery",
    location: "Morgan Hill",
    time: "1 to 4 PM",
  },
  {
    id: "3",
    date: "Friday, June 12",
    venue: "Private Event",
    location: "San Jose",
    time: "TBD",
  },
  {
    id: "4",
    date: "Saturday, June 13",
    venue: "The Hideaway",
    location: "San Juan Bautista",
    time: "6 PM",
  },
  {
    id: "5",
    date: "Sunday, June 14",
    venue: "Twin Oaks",
    location: "Hollister",
    time: "Private Party",
  },
];

// ─── Venues Data ──────────────────────────────────────────────
const VENUES = [
  {
    name: "P&V Winery",
    location: "Morgan Hill, CA",
    image: IMAGES.pandv,
    description: "Warm afternoons with wine and acoustic music",
    website: "https://www.pandvwinery.com",
  },
  {
    name: "Vines and Pints",
    location: "Gilroy, CA",
    image: IMAGES.vinesAndPints,
    description: "Vibrant wine bar with live entertainment",
    website: "https://www.vinesandpints.com",
  },
  {
    name: "Crave Wine Co.",
    location: "Hollister, CA",
    image: IMAGES.craveWine,
    description: "Intimate wine tasting with live performances",
    website: "https://www.cravewine.com",
  },
  {
    name: "Twin Oaks",
    location: "Hollister, CA",
    image: IMAGES.twinOaks,
    description: "Community events and private celebrations",
    website: "https://www.twinoaksevents.com",
  },
  {
    name: "Indigo Program K-8",
    location: "San Jose, CA",
    image: IMAGES.indigoProgram,
    description: "Educational and cultural events for students and families",
    website: "http://indigoprogram.org",
  },
];

// ─── Hero Section ──────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[oklch(0.22_0.05_35)]">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <picture>
          <source media="(max-width: 768px)" srcSet={IMAGES.heroMobile} />
          <img
            src={IMAGES.hero}
            alt="R & R Acoustic Duo performing"
            className="w-full h-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-[oklch(0.22_0.05_35/0.45)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <img src={IMAGES.logoDark} alt="R & R" className="h-16 w-auto mx-auto mb-6 drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 12px oklch(0.85 0.18 65 / 0.6))' }} />
          <p className="font-script text-[oklch(0.68_0.15_65)] text-2xl md:text-3xl mb-2 italic">
            Bay Area Live Music
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl md:text-7xl leading-tight mb-4"
        >
          Ron Butron<br />
          <span className="italic font-light text-[oklch(0.75_0.02_75)]">& Rebecca Barnes</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-lg md:text-xl text-[oklch(0.75_0.02_75)] max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Warm, intimate acoustic music for wineries, wine bars, restaurants, and private events throughout the San Francisco Bay Area.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-amber justify-center"
          >
            <Music size={18} />
            BOOK US FOR YOUR VENUE
          </button>
          <button
            onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-outline justify-center"
          >
            MEET THE DUO
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <ChevronDown size={24} className="text-white" />
      </motion.div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[oklch(0.97_0.015_75)]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <FadeUp>
            <div className="relative">
              <img
                src={IMAGES.duoPhoto}
                alt="Ron & Rebecca performing"
                className="w-full rounded-sm shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 w-full h-full border-4 border-[oklch(0.68_0.15_65)] rounded-sm pointer-events-none" />
            </div>
          </FadeUp>

          {/* Right: Content */}
          <FadeUp>
            <p className="section-label mb-3">About</p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.22_0.05_35)] leading-tight mb-4">
              Acoustic Music<br />
              <span className="italic">That Connects</span>
            </h2>
            <div className="golden-divider max-w-[80px] mb-6" />

            <p className="font-body text-[oklch(0.35_0.06_40)] text-lg leading-relaxed mb-6">
              Ron Butron brings 20+ years of experience as a guitarist and vocalist, while Rebecca Barnes adds her soulful voice and stage presence. Together, they create an intimate, engaging performance that adapts to any venue's vibe.
            </p>

            <p className="font-body text-[oklch(0.45_0.04_50)] text-base leading-relaxed mb-8">
              From intimate winery afternoons in Morgan Hill to vibrant wine bars in Gilroy and community events in Hollister, R & R knows how to read a room and create an atmosphere that keeps guests engaged, relaxed, and coming back for more.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[oklch(0.68_0.15_65/0.15)] rounded-sm flex items-center justify-center">
                  <Guitar size={20} className="text-[oklch(0.68_0.15_65)]" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-[oklch(0.22_0.05_35)] mb-1">Acoustic Guitar & Vocals</h3>
                  <p className="font-body text-sm text-[oklch(0.55_0.04_55)]">
                    Folk · Pop · Rock · Country · Originals
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[oklch(0.68_0.15_65/0.15)] rounded-sm flex items-center justify-center">
                  <Mic2 size={20} className="text-[oklch(0.68_0.15_65)]" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-[oklch(0.22_0.05_35)] mb-1">Professional & Personable</h3>
                  <p className="font-body text-sm text-[oklch(0.55_0.04_55)]">
                    Reliable, engaging, and easy to work with
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[oklch(0.68_0.15_65/0.15)] rounded-sm flex items-center justify-center">
                  <Star size={20} className="text-[oklch(0.68_0.15_65)]" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-[oklch(0.22_0.05_35)] mb-1">Venue Experience</h3>
                  <p className="font-body text-sm text-[oklch(0.55_0.04_55)]">
                    Wineries, wine bars, restaurants, and private events
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Reel Section ─────────────────────────────────────────────
function ReelSection() {
  return (
    <section className="py-24 bg-[oklch(0.97_0.015_75)]">
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
          <div className="w-full max-w-2xl border-4 border-[oklch(0.68_0.15_65)] rounded-sm shadow-2xl overflow-hidden bg-[oklch(0.97_0.015_75)]">
            <video
              width="100%"
              height="auto"
              controls
              className="w-full bg-[oklch(0.22_0.05_35)]"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'%3E%3Crect fill='%23222' width='1200' height='675'/%3E%3C/svg%3E"
            >
              <source src="/manus-storage/rnr_performance_0ae357d6.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Venues Section ────────────────────────────────────────────
function VenuesSection() {
  return (
    <section id="venues" className="py-24 bg-[oklch(0.93_0.02_75)]">
      <div className="container">
        <FadeUp className="text-center mb-16">
          <p className="section-label mb-3">Where We Play</p>
          <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.22_0.05_35)] leading-tight mb-4">
            Favorite Bay Area Venues
          </h2>
          <div className="golden-divider max-w-[80px] mx-auto mb-6" />
          <p className="font-body text-[oklch(0.45_0.04_50)] text-lg max-w-2xl mx-auto leading-relaxed">
            From intimate wineries to vibrant wine bars, R & R brings live music to the best venues in the Bay Area.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VENUES.map((venue, idx) => (
            <FadeUp key={venue.name} delay={idx * 50}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="bg-[oklch(1_0.01_80)] rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition-shadow h-full flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-[oklch(0.88_0.025_70)]">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover venue-card-image"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-display text-xl text-[oklch(0.22_0.05_35)] mb-1">
                    {venue.name}
                  </h3>
                  <p className="font-body text-sm text-[oklch(0.55_0.04_55)] flex items-center gap-1 mb-3">
                    <MapPin size={14} /> {venue.location}
                  </p>
                  <p className="font-body text-sm text-[oklch(0.45_0.04_50)] leading-relaxed flex-1 mb-4">
                    {venue.description}
                  </p>
                  <a
                    href={venue.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[oklch(0.68_0.15_65)] hover:text-[oklch(0.68_0.15_65/0.8)] transition-colors font-body text-sm font-semibold"
                  >
                    Visit Website
                    <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Calendar Section (Static Shows) ───────────────────────────
function CalendarSection() {
  return (
    <section id="calendar" className="py-24 bg-[oklch(0.93_0.02_75)]">
      <div className="container">
        <FadeUp className="text-center mb-12">
          <p className="section-label mb-3">Live Shows</p>
          <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.22_0.05_35)] leading-tight mb-4">
            Upcoming Performances
          </h2>
          <div className="golden-divider max-w-[80px] mx-auto mb-6" />
          <p className="font-body text-[oklch(0.45_0.04_50)] text-lg max-w-2xl mx-auto leading-relaxed">
            Join us for intimate acoustic performances at premier Bay Area venues.
          </p>
        </FadeUp>

        <FadeUp className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {SHOWS.map((show) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="bg-[oklch(1_0.01_80)] border border-[oklch(0.88_0.025_70)] rounded-sm p-5 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-display text-lg text-[oklch(0.22_0.05_35)] mb-1">
                      {show.date}
                    </h3>
                    <p className="font-body text-base font-semibold text-[oklch(0.35_0.06_40)] mb-1">
                      {show.venue}
                    </p>
                    <p className="font-body text-sm text-[oklch(0.55_0.04_55)] flex items-center gap-1">
                      <MapPin size={14} /> {show.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-[oklch(0.68_0.15_65/0.1)] px-4 py-2 rounded-sm">
                    <Clock size={14} className="text-[oklch(0.68_0.15_65)]" />
                    <span className="font-body font-semibold text-[oklch(0.68_0.15_65)]">
                      {show.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        {/* Booking CTA */}
        <FadeUp className="mt-12 text-center">
          <div className="bg-[oklch(0.22_0.05_35)] rounded-sm p-8 max-w-2xl mx-auto">
            <img src={IMAGES.logoLight} alt="R & R" className="h-10 w-auto mb-4 mx-auto" style={{ filter: 'drop-shadow(0 0 16px oklch(0.75 0.22 50 / 1)) brightness(1.3) saturate(1.5) hue-rotate(-5deg)' }} />
            <h3 className="font-display text-2xl text-[oklch(0.96_0.025_75)] mb-3">
              Want R & R at Your Venue?
            </h3>
            <p className="font-body text-sm text-[oklch(0.75_0.02_75)] leading-relaxed mb-6">
              Ron & Rebecca are available for bookings throughout the Bay Area. Reach out to check availability for your date.
            </p>
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-amber justify-center"
            >
              <Music size={15} />
              Book a Show
            </button>
          </div>
        </FadeUp>
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
              <FadeUp delay={50}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[oklch(0.68_0.15_65/0.15)] rounded-sm flex items-center justify-center">
                    <Music size={20} className="text-[oklch(0.68_0.15_65)]" />
                  </div>
                  <div>
                    <h3 className="font-display text-base text-[oklch(0.22_0.05_35)] mb-1">
                      Winery Events
                    </h3>
                    <p className="font-body text-sm text-[oklch(0.55_0.04_55)]">
                      Tastings & outdoor events
                    </p>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={100}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[oklch(0.68_0.15_65/0.15)] rounded-sm flex items-center justify-center">
                    <Music size={20} className="text-[oklch(0.68_0.15_65)]" />
                  </div>
                  <div>
                    <h3 className="font-display text-base text-[oklch(0.22_0.05_35)] mb-1">
                      Restaurants & Bars
                    </h3>
                    <p className="font-body text-sm text-[oklch(0.55_0.04_55)]">
                      Ambient & engaging sets
                    </p>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={150}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[oklch(0.68_0.15_65/0.15)] rounded-sm flex items-center justify-center">
                    <Music size={20} className="text-[oklch(0.68_0.15_65)]" />
                  </div>
                  <div>
                    <h3 className="font-display text-base text-[oklch(0.22_0.05_35)] mb-1">
                      Private Events
                    </h3>
                    <p className="font-body text-sm text-[oklch(0.55_0.04_55)]">
                      Weddings, parties & more
                    </p>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={200}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[oklch(0.68_0.15_65/0.15)] rounded-sm flex items-center justify-center">
                    <Music size={20} className="text-[oklch(0.68_0.15_65)]" />
                  </div>
                  <div>
                    <h3 className="font-display text-base text-[oklch(0.22_0.05_35)] mb-1">
                      Corporate Events
                    </h3>
                    <p className="font-body text-sm text-[oklch(0.55_0.04_55)]">
                      Professional & reliable
                    </p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>

          <FadeUp>
            <img
              src={IMAGES.performance}
              alt="Ron performing with acoustic guitar"
              className="w-full rounded-sm shadow-2xl"
            />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Section ────────────────────────────────────
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Ron and Rebecca brought such warmth and authenticity to our venue. Their acoustic set perfectly complemented our wine experience, and our guests couldn't stop raving about them.",
      author: "Crave Wine Co.",
      location: "Hollister, CA",
    },
    {
      quote: "The perfect blend of talent and professionalism. Their music elevated our event atmosphere, and they were an absolute pleasure to work with from start to finish.",
      author: "P&V Winery",
      location: "Morgan Hill, CA",
    },
  ];

  return (
    <section className="py-24 bg-[oklch(0.22_0.05_35)]">
      <div className="container">
        <FadeUp className="text-center mb-16">
          <p className="section-label mb-3 text-[oklch(0.68_0.15_65)]">What Venues Say</p>
          <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.97_0.015_75)] leading-tight">
            Testimonials
          </h2>
          <div className="golden-divider max-w-[80px] mx-auto mt-6" />
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, idx) => (
            <FadeUp key={idx} delay={idx * 100}>
              <div className="bg-[oklch(0.32_0.08_35)] p-8 rounded-sm border-l-4 border-[oklch(0.68_0.15_65)]">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[oklch(0.68_0.15_65)] text-[oklch(0.68_0.15_65)]" />
                  ))}
                </div>
                <p className="font-body text-[oklch(0.85_0.02_75)] mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-display text-[oklch(0.68_0.15_65)] font-semibold">
                    {testimonial.author}
                  </p>
                  <p className="font-body text-xs text-[oklch(0.55_0.04_55)]">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Flyer Section ────────────────────────────────────────────
function FlyerSection() {
  return (
    <section className="py-24 bg-[oklch(0.97_0.015_75)]">
      <div className="container">
        <FadeUp className="text-center mb-12">
          <p className="section-label mb-3">Upcoming Gigs</p>
          <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.22_0.05_35)] leading-tight mb-4">
            Event Flyer
          </h2>
          <div className="golden-divider max-w-[80px] mx-auto mb-6" />
        </FadeUp>

        <FadeUp className="flex justify-center">
          <div className="max-w-2xl w-full">
            <img
              src={IMAGES.flyer}
              alt="R & R upcoming shows flyer"
              className="w-full rounded-sm shadow-2xl border-4 border-[oklch(0.68_0.15_65)]"
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    venue: "",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submitError, setSubmitError] = useState("");

  const submitBooking = trpc.booking.submit.useMutation({
    onSuccess: () => {
      setSubmittedEmail(formData.email);
      setSubmitted(true);
      setFormData({ name: "", email: "", venue: "", date: "", message: "" });
    },
    onError: (err) => {
      setSubmitError(err.message || "Something went wrong. Please try again or email us directly at rnr_music_duo@icloud.com.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    submitBooking.mutate(formData);
  };

  return (
    <section id="contact" className="py-24 bg-[oklch(0.93_0.02_75)]">
      <div className="container">
        <FadeUp className="text-center mb-16">
          <p className="section-label mb-3">Get in Touch</p>
          <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.22_0.05_35)] leading-tight mb-4">
            Book Us for Your Venue
          </h2>
          <div className="golden-divider max-w-[80px] mx-auto mb-6" />
          <p className="font-body text-[oklch(0.45_0.04_50)] text-lg max-w-2xl mx-auto leading-relaxed">
            Ready to bring live acoustic music to your event? Contact Ron & Rebecca to check availability and discuss your needs.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Info */}
          <FadeUp>
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-xl text-[oklch(0.22_0.05_35)] mb-2">
                  Contact Information
                </h3>
                <p className="font-body text-[oklch(0.45_0.04_50)]">
                  Reach out directly to discuss your event and availability.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[oklch(0.68_0.15_65/0.15)] rounded-sm flex items-center justify-center">
                  <Mail size={20} className="text-[oklch(0.68_0.15_65)]" />
                </div>
                <div>
                  <p className="font-body text-sm text-[oklch(0.55_0.04_55)] mb-1">Email</p>
                  <a
                    href="mailto:rnr_music_duo@icloud.com"
                    className="font-display text-lg text-[oklch(0.22_0.05_35)] hover:text-[oklch(0.68_0.15_65)] transition-colors"
                  >
                    rnr_music_duo@icloud.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[oklch(0.68_0.15_65/0.15)] rounded-sm flex items-center justify-center">
                  <Instagram size={20} className="text-[oklch(0.68_0.15_65)]" />
                </div>
                <div>
                  <p className="font-body text-sm text-[oklch(0.55_0.04_55)] mb-1">Instagram</p>
                  <a
                    href="https://www.instagram.com/rnr_music_duo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-lg text-[oklch(0.22_0.05_35)] hover:text-[oklch(0.68_0.15_65)] transition-colors"
                  >
                    @rnr_music_duo
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Booking Form */}
          <FadeUp>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-body text-sm font-semibold text-[oklch(0.22_0.05_35)] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[oklch(0.88_0.025_70)] rounded-sm focus:outline-none focus:border-[oklch(0.68_0.15_65)] focus:ring-2 focus:ring-[oklch(0.68_0.15_65/0.2)] transition-all"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-[oklch(0.22_0.05_35)] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[oklch(0.88_0.025_70)] rounded-sm focus:outline-none focus:border-[oklch(0.68_0.15_65)] focus:ring-2 focus:ring-[oklch(0.68_0.15_65/0.2)] transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-[oklch(0.22_0.05_35)] mb-2">
                  Venue / Event
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[oklch(0.88_0.025_70)] rounded-sm focus:outline-none focus:border-[oklch(0.68_0.15_65)] focus:ring-2 focus:ring-[oklch(0.68_0.15_65/0.2)] transition-all"
                  placeholder="Where & what type of event?"
                  required
                />
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-[oklch(0.22_0.05_35)] mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[oklch(0.88_0.025_70)] rounded-sm focus:outline-none focus:border-[oklch(0.68_0.15_65)] focus:ring-2 focus:ring-[oklch(0.68_0.15_65/0.2)] transition-all"
                  required
                />
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-[oklch(0.22_0.05_35)] mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-[oklch(0.88_0.025_70)] rounded-sm focus:outline-none focus:border-[oklch(0.68_0.15_65)] focus:ring-2 focus:ring-[oklch(0.68_0.15_65/0.2)] transition-all resize-none"
                  placeholder="Tell us about your event..."
                />
              </div>

              {submitError && (
                <p className="text-red-600 text-sm font-body">{submitError}</p>
              )}

              {submitted ? (
                <div className="text-center py-4">
                  <p className="font-display text-lg text-[oklch(0.45_0.15_140)]">
                    Thank you! Your booking request has been sent.
                  </p>
                  <p className="font-body text-sm text-[oklch(0.55_0.04_55)] mt-1">
                    Ron & Rebecca will be in touch soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-sm text-[oklch(0.68_0.15_65)] underline font-body"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={submitBooking.isPending}
                  className="btn-amber w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Music size={15} />
                  {submitBooking.isPending ? "Sending..." : "Send Booking Request"}
                </button>
              )}
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Main App ──────────────────────────────────────────────────
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMenuOpen]);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Venues", href: "#venues" },
    { label: "Shows", href: "#calendar" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_75)]">
      {/* Navigation */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-[oklch(0.22_0.05_35/0.95)] backdrop-blur-sm border-b border-[oklch(0.68_0.15_65/0.2)]">
        <div className="container flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <img src={IMAGES.logoDark} alt="R & R" className="h-8 w-auto" style={{ filter: 'drop-shadow(0 0 8px oklch(0.85 0.18 65 / 0.5))' }} />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="font-body text-sm font-semibold text-[oklch(0.75_0.02_75)] hover:text-[oklch(0.68_0.15_65)] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-amber text-sm"
            >
              <Music size={14} />
              BOOK US
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[oklch(0.75_0.02_75)] hover:text-[oklch(0.68_0.15_65)] transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[oklch(0.22_0.05_35)] border-t border-[oklch(0.68_0.15_65/0.2)]"
            >
              <div className="container py-4 space-y-3">
                {navItems.map(item => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block font-body text-sm font-semibold text-[oklch(0.75_0.02_75)] hover:text-[oklch(0.68_0.15_65)] transition-colors py-2"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-amber w-full justify-center text-sm"
                >
                  <Music size={14} />
                  BOOK US
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main content */}
      <main className="pt-16">
        <HeroSection />
        <AboutSection />
        <ReelSection />
        <VenuesSection />
        <TestimonialsSection />
        <CalendarSection />
        <ServicesSection />
        <FlyerSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="bg-[oklch(0.22_0.05_35)] text-[oklch(0.75_0.02_75)] py-8 border-t border-[oklch(0.68_0.15_65/0.2)]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-sm">
              © 2026 R & R Acoustic Duo. All rights reserved.
            </p>
            <a
              href="https://localforgeweb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-[oklch(0.55_0.04_55)] hover:text-[oklch(0.68_0.15_65)] transition-colors"
            >
              Website by Local Forge
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
