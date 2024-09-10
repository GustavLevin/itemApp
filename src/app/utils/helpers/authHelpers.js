import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "SECRET";  // Secure in production
const JWT_EXPIRATION = "1y";

export async function signJWT(payload) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(JWT_EXPIRATION)
    .sign(new TextEncoder().encode(JWT_SECRET));
}

export async function verifyJWT(token) {
  const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
  return payload;
}