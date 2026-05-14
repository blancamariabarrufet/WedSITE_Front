import { NextResponse } from "next/server";
import { createSession, setSessionCookie, type SessionUser } from "@/lib/auth";
import { ALL_FEATURES } from "@/lib/features";

/**
 * Demo login route. Visiting this URL auto-creates a session for the
 * "Blanca & Victor" demo profile and redirects straight to the dashboard.
 *
 * The DEMO_SUBMISSION_ID must match the id used in the seed script
 * (scripts/seed-demo.sql). Keep them in sync.
 */

const DEMO_SUBMISSION_ID = "00000000-0000-0000-0000-000000000001";

const DEMO_USER: SessionUser = {
  id: "demo-blanca-victor",
  username: "blanca-victor-demo",
  isAdmin: false,
  features: [...ALL_FEATURES],
  language: "es",
  submissionId: DEMO_SUBMISSION_ID,
};

export async function GET(request: Request) {
  const token = await createSession(DEMO_USER);
  await setSessionCookie(token);

  return NextResponse.redirect(new URL("/manage/dashboard", request.url));
}
