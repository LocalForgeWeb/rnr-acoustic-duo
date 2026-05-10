import { describe, it, expect, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the notifyOwner function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

const mockCtx: TrpcContext = {
  req: {} as any,
  res: {} as any,
  user: null,
};

const caller = appRouter.createCaller(mockCtx);

describe("booking.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should submit a booking request with all fields", async () => {
    const result = await caller.booking.submit({
      name: "Jane Doe",
      email: "jane@example.com",
      venue: "The Hideaway",
      date: "2026-06-15",
      message: "Looking forward to a great show!",
    });

    expect(result).toEqual({ success: true });
  });

  it("should submit a booking request with only required fields", async () => {
    const result = await caller.booking.submit({
      name: "John Smith",
      email: "john@example.com",
      venue: "Crave Wine Co",
    });

    expect(result).toEqual({ success: true });
  });

  it("should reject submission with invalid email", async () => {
    await expect(
      caller.booking.submit({
        name: "Bad Email",
        email: "not-an-email",
        venue: "Some Venue",
      })
    ).rejects.toThrow();
  });

  it("should reject submission with missing name", async () => {
    await expect(
      caller.booking.submit({
        name: "",
        email: "valid@example.com",
        venue: "Some Venue",
      })
    ).rejects.toThrow();
  });
});
