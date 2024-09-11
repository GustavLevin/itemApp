import { NextResponse } from "next/server";
import { verifyJWT } from "@/app/utils/helpers/authHelpers";

const unsafeMethods = ["POST", "PUT", "DELETE"];

export async function middleware(req) {
  console.log("Middleware is running", req.method);

  if (unsafeMethods.includes(req.method)) {
    console.log("VERIFY");
    let jwtPayload;
    try {
      const bearer = req.headers.get("Authorization") || "";
      console.log("Full Authorization Header:", bearer); 
      const token = bearer.split(" ")?.[1];  // Extract the token correctly
      console.log("Extracted Token:", token);
      if (!token) {
        throw new Error("No token submitted");
      }

      jwtPayload = await verifyJWT(token);  // Verify the token
      const headers = new Headers(req.headers);
      headers.set("userId", JSON.stringify(jwtPayload.userId));  // Add userId to headers
      return NextResponse.next({ headers: headers });  // Continue if valid
    } catch (error) {
      console.error("Token verification failed:", error);  // Log the error for debugging
      return NextResponse.json(
        { error: "Unauthorized request" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();  // Continue for safe methods
}

export const config = {
  matcher: ["/api/items/:path*"],  // Update matcher to include all paths under /api/items
};