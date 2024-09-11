import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "SECRET";  // Use environment variable or fallback

export async function signJWT(payload, secret = JWT_SECRET, options = {}) {
  if (!secret) {
    throw new Error("JWT secret is not defined");
  }

  try {
    const token = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(secret));

    console.log("Generated JWT Token:", token);  // Log the token
    return token;
  } catch (error) {
    console.error("Error signing JWT:", error);
    throw new Error("Error signing JWT");
  }
}

export async function verifyJWT(token, secret = JWT_SECRET) {
  if (!secret) {
    throw new Error("JWT secret is not defined");
  }

  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );

    console.log("Verified JWT Payload:", payload);  // Log the payload
    return payload;
  } catch (error) {
    console.error("Error verifying JWT:", error);
    throw new Error("Invalid or expired token");
  }
}