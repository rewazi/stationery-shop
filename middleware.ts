import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// The account page and the money-moving API routes require a signed-in
// user. The storefront itself (the "/" page) stays public so people can
// browse before creating an account.
const isProtectedRoute = createRouteMatcher([
  "/account(.*)",
  "/api/checkout(.*)",
  "/api/portal(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
