import { auth } from "./auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Require a session: if none, redirect to /login
export const requireAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return session;
};

// Optional session: if exists, redirect to /
export const optionalAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

};