import { NextResponse, userAgent, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const { isBot, ua } = userAgent(req);
  // Block /auth route from TelegramBot user agent
  if (pathname.startsWith("/api/auth") && ua.toLowerCase().includes("bot")) {
    console.log(`Blocked TelegramBot request to ${pathname}`);

    return new NextResponse(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Check if the request is for an API route inside the telegram folder
  if (pathname.startsWith("/api/telegram")) {
    const authHeader = req.headers.get("authorization");
    const token = process.env.API_AUTH_TOKEN;
    if (!authHeader || authHeader !== `Bearer ${token}`) {
      console.log(`Unauthorized request to ${pathname}`);

      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  return NextResponse.next();
}

// Specify the paths to apply the middleware
export const config = {
  matcher: ["/api/telegram/:path*", "/api/auth/:path*"],
};
