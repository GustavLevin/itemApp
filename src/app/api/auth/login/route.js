import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";  // For password comparison

const prisma = new PrismaClient();

export async function POST(req) {
  let body;
  try {
    body = await req.json();
    if (!body.email || !body.password) {
      return NextResponse.json(
        { message: "A valid email and password must be provided" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to parse request body" },
      { status: 400 }
    );
  }

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Respond with user information only, no token creation
    return NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name },  // Hide password in response
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}