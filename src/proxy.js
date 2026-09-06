import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const requestPathname = request.nextUrl.pathname;
  const userWithSession = await auth.api.getSession({
    headers: await headers(),
  });

  const user = userWithSession?.user;

  console.log("user from proxy", user);

  const forbiddenUrl = new URL("/forbidden", request.url);

  if (!userWithSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    requestPathname.startsWith("/dashboard/seeker") &&
    user?.role !== "seeker"
  ) {
    return NextResponse.redirect(forbiddenUrl);
  }

  if (
    requestPathname.startsWith("/dashboard/recruiter") &&
    user?.role !== "recruiter"
  ) {
    console.log("user from recruiter verify", user);

    return NextResponse.redirect(forbiddenUrl);
  }

  if (
    requestPathname.startsWith("/dashboard/admin") &&
    user?.role !== "admin"
  ) {
    return NextResponse.redirect(forbiddenUrl);
  }
}

export const config = {
  matcher: "/dashboard/:role*",
};
