import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { icalRouter } from "./icalRouter";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  // iCloud Calendar integration — fetches & parses the public iCal feed
  calendar: icalRouter,

  // Booking form submission — notifies owner via Manus notification system
  booking: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Valid email is required"),
          venue: z.string().min(1, "Venue/event is required"),
          date: z.string().optional(),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { name, email, venue, date, message } = input;

        const content = [
          `From: ${name} <${email}>`,
          `Venue / Event: ${venue}`,
          date ? `Preferred Date: ${date}` : null,
          message ? `Message: ${message}` : null,
        ]
          .filter(Boolean)
          .join("\n");

        const sent = await notifyOwner({
          title: `New Booking Request from ${name} — ${venue}`,
          content,
        });

        if (!sent) {
          console.warn(`[Booking] Notification delivery failed for ${name} <${email}>`);
          // Still return success — the request was received even if notification had a transient issue
        }

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
