import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import { clearIcalCache } from "./icalRouter";
import type { TrpcContext } from "./_core/context";

// Mock global fetch to avoid real network calls in tests
const mockIcalEmpty = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Apple Inc.//iCloud//EN
CALSCALE:GREGORIAN
X-WR-CALNAME:R&R Acoustic duo
END:VCALENDAR`;

const mockIcalWithEvents = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Apple Inc.//iCloud//EN
CALSCALE:GREGORIAN
X-WR-CALNAME:R&R Acoustic duo
BEGIN:VEVENT
UID:test-event-1@icloud.com
DTSTART:20260601T190000Z
DTEND:20260601T220000Z
SUMMARY:P & V Winery Show
LOCATION:Morgan Hill, CA
DESCRIPTION:Live acoustic set
END:VEVENT
BEGIN:VEVENT
UID:test-event-2@icloud.com
DTSTART:20260615T200000Z
DTEND:20260615T230000Z
SUMMARY:Vines & Pints
LOCATION:Gilroy, CA
END:VEVENT
END:VCALENDAR`;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("calendar.getGigs", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    clearIcalCache(); // Reset in-memory cache between tests
  });

  it("returns empty arrays when calendar has no events", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      text: async () => mockIcalEmpty,
    }));

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.calendar.getGigs();

    expect(result.error).toBeNull();
    expect(result.upcoming).toEqual([]);
    expect(result.past).toEqual([]);
    expect(result.total).toBe(0);
  });

  it("parses events and returns them with correct fields", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      text: async () => mockIcalWithEvents,
    }));

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.calendar.getGigs();

    expect(result.error).toBeNull();
    expect(result.total).toBe(2);

    // All events should be in upcoming (dates are in the future: June 2026)
    const allEvents = [...result.upcoming, ...result.past];
    expect(allEvents.length).toBe(2);

    const firstEvent = allEvents.find(e => e.uid === "test-event-1@icloud.com");
    expect(firstEvent).toBeDefined();
    expect(firstEvent?.title).toBe("P & V Winery Show");
    expect(firstEvent?.location).toBe("Morgan Hill, CA");
    expect(firstEvent?.description).toBe("Live acoustic set");
    expect(firstEvent?.isAllDay).toBe(false);
    expect(firstEvent?.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("returns error field when fetch fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.calendar.getGigs();

    expect(result.error).toBeTruthy();
    expect(result.upcoming).toEqual([]);
    expect(result.past).toEqual([]);
  });

  it("returns error field when iCloud returns non-200", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    }));

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.calendar.getGigs();

    expect(result.error).toBeTruthy();
    expect(result.error).toContain("404");
  });
});
