import * as jose from "jose";

const JWT_SECRET = "SECRET";  // Use a secure key in production
const JWT_AUTH_EXP = "1y";  // Adjust the expiration as needed

function encodedSecret() {
    return new TextEncoder().encode(JWT_SECRET); 
}

export async function signJWT(payload) {
    const token = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setIssuedAt()
        .setExpirationTime(JWT_AUTH_EXP)
        .sign(encodedSecret());

    console.log("Generated token:", token);
    return token;
}

export async function verifyJWT(token) {
    try {
        const { payload } = await jose.jwtVerify(token, encodedSecret());
        console.log("Verified payload:", payload);
        return payload;
    } catch (error) {
        console.error("Token verification failed:", error);
        throw error;
    }
}