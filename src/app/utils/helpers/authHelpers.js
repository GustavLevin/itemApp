import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "SECRET";  // Ensure consistency
const JWT_EXPIRATION = "1y";

function encodedSecret() {
  return new TextEncoder().encode(JWT_SECRET); 
}

export async function signJWT(payload) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })  // Correct headers
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(encodedSecret());
}

export async function verifyJWT(token) {
  try {
    const { payload } = await jose.jwtVerify(token, encodedSecret(), {
      algorithms: ["HS256"],  // Match algorithm
    });
    return payload;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw error;
  }
}