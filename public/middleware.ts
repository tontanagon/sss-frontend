import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const role = session?.user?.role
  const { pathname } = request.nextUrl;
  console.log(session);
  

  if (!session?.user && pathname !== "/login" && pathname !== "/register" && pathname !== "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session?.user && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith('/medadm') && !session?.user.role.includes('Administrator')) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith('/medtch') && !role?.includes('Teacher')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|images|category|storage|products).*)",
  ],
};
