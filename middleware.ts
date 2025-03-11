import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the request is for an API route inside the telegram folder
  if (pathname.startsWith("/api/telegram")) {
    const authHeader = req.headers.get("authorization");
    const token = process.env.API_AUTH_TOKEN;

    if (!authHeader || authHeader !== `Bearer ${token}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

// Specify the paths to apply the middleware
export const config = {
  matcher: "/api/telegram/:path*",
};
