/**
 * iCal Calendar Router
 * Fetches the public iCloud calendar feed server-side (bypasses CORS),
 * parses VEVENT entries, and returns clean gig objects to the frontend.
 * The frontend can refetch on a timer to stay live-updated.
 */

import ICAL from "ical.js";
import { publicProcedure, router } from "./_core/trpc";

const ICAL_URL =
  "https://p137-caldav.icloud.com/published/2/MTAyNTAxMzQ4MjQxMDI1MAW2-jI0f1qp2kqsvpIsUYnXR9m-YvNgrP5a_D2xcw79WHToRLLICp3dvQg1C5ffPFiKu-w6dPsFdxs16Lhvut4";

// Cache the result for 5 minutes to avoid hammering iCloud
let cache: { events: GigEvent[]; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000;

/** Exported for testing only — clears the in-memory cache */
export function clearIcalCache() {
  cache = null;
}

export interface GigEvent {
  uid: string;
  title: string;
  /** ISO date string (YYYY-MM-DD) */
  date: string;
  /** ISO date string or null for all-day events */
  endDate: string | null;
  /** Time string like "2:00 PM" or null for all-day */
  time: string | null;
  /** End time string like "5:00 PM" or null */
  endTime: string | null;
  location: string | null;
  description: string | null;
  isAllDay: boolean;
  /** Unix timestamp for sorting */
  startTs: number;
}

function formatTime(date: ICAL.Time): string {
  const d = date.toJSDate();
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Los_Angeles",
  });
}

function formatDate(date: ICAL.Time): string {
  // toDateString gives YYYY-MM-DD in local calendar terms
  const d = date.toJSDate();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function fetchAndParseICal(): Promise<GigEvent[]> {
  // Return cached result if fresh
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.events;
  }

  const response = await fetch(ICAL_URL, {
    headers: {
      "User-Agent": "RnRAcousticDuo/1.0 (website calendar integration)",
      Accept: "text/calendar",
    },
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch calendar: ${response.status} ${response.statusText}`);
  }

  const icalText = await response.text();

  // Parse with ical.js
  const jcalData = ICAL.parse(icalText);
  const comp = new ICAL.Component(jcalData);
  const vevents = comp.getAllSubcomponents("vevent");

  const events: GigEvent[] = vevents.map((vevent) => {
    const event = new ICAL.Event(vevent);

    const dtstart = event.startDate;
    const dtend = event.endDate;
    const isAllDay = dtstart.isDate;

    const startJs = dtstart.toJSDate();

    return {
      uid: event.uid || `${startJs.getTime()}`,
      title: event.summary || "Untitled Show",
      date: formatDate(dtstart),
      endDate: dtend ? formatDate(dtend) : null,
      time: isAllDay ? null : formatTime(dtstart),
      endTime: dtend && !isAllDay ? formatTime(dtend) : null,
      location: event.location || null,
      description: event.description || null,
      isAllDay,
      startTs: startJs.getTime(),
    };
  });

  // Sort by start time ascending
  events.sort((a, b) => a.startTs - b.startTs);

  cache = { events, fetchedAt: Date.now() };
  return events;
}

export const icalRouter = router({
  getGigs: publicProcedure.query(async () => {
    try {
      const events = await fetchAndParseICal();
      const now = Date.now();

      // Separate upcoming vs past (compare by date only, not time)
      const todayStr = new Date().toLocaleDateString("en-CA", {
        timeZone: "America/Los_Angeles",
      }); // YYYY-MM-DD

      const upcoming = events.filter((e) => e.date >= todayStr);
      const past = events
        .filter((e) => e.date < todayStr)
        .reverse() // most recent first
        .slice(0, 6);

      return {
        upcoming,
        past,
        total: events.length,
        fetchedAt: cache?.fetchedAt ?? now,
        error: null as string | null,
      };
    } catch (err) {
      console.error("[iCal] Failed to fetch calendar:", err);
      return {
        upcoming: [] as GigEvent[],
        past: [] as GigEvent[],
        total: 0,
        fetchedAt: Date.now(),
        error: err instanceof Error ? err.message : "Failed to load calendar",
      };
    }
  }),
});
