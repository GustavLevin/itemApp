import { NextResponse } from "next/server";
import { verifyJWT } from "@/app/utils/helpers/authHelpers"; // Ensure the path is correct

export async function middleware(req) {
  const bearer = req.headers.get("Authorization") || "";
  const token = bearer.replace(/^Bearer\s+/i, "").trim();

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  try {
    const jwtPayload = await verifyJWT(token); // Verify JWT
    const headers = new Headers(req.headers);
    headers.set("userId", JSON.stringify(jwtPayload.userId));
    return NextResponse.next({ headers: headers }); // Continue with the request if valid
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.json({ error: "Unauthorized request" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/items/:path*", "/api/users/:path*"], // Ensure paths are correctly set
};