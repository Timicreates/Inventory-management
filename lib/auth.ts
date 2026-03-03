import { createNeonAuth } from "@neondatabase/auth/next/server";
import { redirect } from "next/navigation";

// Initialize the Neon Auth instance
export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET!,
  },
});

/**
 * Helper to get the user on the server.
 * This accesses the 'data' property to avoid the TypeScript error.
 */
export async function getCurrentUser() {
  // getSession returns a wrapper containing a 'data' object
  const session = await auth.getSession();

  // If there is no data or no user inside that data, redirect
  if (!session?.data?.user) {
    redirect("/sign-in");
  }

  // Return the user object (id, email, name, etc.)
  console.log("Logged in user:", session.data.user.email);
  return session.data.user;
}
