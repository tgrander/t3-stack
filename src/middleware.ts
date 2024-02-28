import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { v4 as uuid } from "uuid";
import { guestSessionId } from "~/constants/cookies";

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: ["/", "/chat", "/api/webhooks(.*)"],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: ["/no-auth-in-this-route"],
  afterAuth(auth, req, evt) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // Redirect logged in users to organization selection page if they are not active in an organization
    if (
      auth.userId &&
      !auth.orgId &&
      req.nextUrl.pathname !== "/org-selection"
    ) {
      // const orgSelection = new URL("/org-selection", req.url);
      // return NextResponse.redirect(orgSelection);
      return NextResponse.next();
    }
    // Set guest session id cookie for users who are not logged in
    if (!auth.userId) {
      const response = NextResponse.next();
      response.cookies.set(guestSessionId, uuid());
      return response;
    }
    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }
    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
