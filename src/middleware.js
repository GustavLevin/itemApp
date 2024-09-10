import { NextResponse } from "next/server";
import { verifyJWT } from "@/app/utils/helpers/authHelpers";

export async function middleware(req) {
  console.log("Middleware is running", new URL(req.url).pathname);

  const bearer = req.headers.get("Authorization") || "";
  const token = bearer.replace(/^Bearer\s+/i, "").trim();

  if (!token) {
      console.log("No token provided");
      return NextResponse.json(
          { error: "No token provided" },
          { status: 401 }
      );
  }

  try {
      const jwtPayload = await verifyJWT(token);
      console.log("JWT payload:", jwtPayload);
      const headers = new Headers(req.headers);
      headers.set("userId", JSON.stringify(jwtPayload.userId));
      return NextResponse.next({ headers: headers });
  } catch (error) {
      console.log("Token verification failed:", error);
      return NextResponse.json(
          { error: "Unauthorized request" },
          { status: 401 }
      );
  }
}

export const config = {
  matcher: ["/api/items/:path*", "/api/users/:path*"],
};