import { NextResponse } from "next/server"
import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { 
  LOGIN_REDIRECT,
  API_PROVIDER,
  PRIVATE_ROUTES,
  AUTH_ROUTES,
  NOT_AUTHENTICATED_REDIRECT
} from "@/lib/routes"
 
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)
 
// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)

/*  Default middleware function

export default auth(async function middleware(req: NextRequest) {
  
})

*/

// Video middleware function
export default auth((req) => {
	const { nextUrl } = req;

	const isLoggedIn = !!req.auth;
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  const isPrivateRoute = PRIVATE_ROUTES.includes(nextUrl.pathname);

  const isApiAuthRoute = nextUrl.pathname.startsWith(API_PROVIDER);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(LOGIN_REDIRECT, nextUrl)); // /dashboard
    }
    return NextResponse.next(); // Permite que la solicitud continúe normalmente 
  }

  if (isPrivateRoute) {
    if (!isLoggedIn) {
      return Response.redirect(new URL(NOT_AUTHENTICATED_REDIRECT, nextUrl)); // /login
    }
    return NextResponse.next(); // Permite que la solicitud continúe normalmente 
  }

  return NextResponse.next(); // Permite que la solicitud continúe normalmente
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}