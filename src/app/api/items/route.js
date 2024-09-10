import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifyJWT } from "@/utils/authHelpers";

const prisma = new PrismaClient();

export async function POST(req) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "").trim();

  if (!token) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  try {
    const decoded = await verifyJWT(token);
    const { name, description, quantity, category } = await req.json();

    const newItem = await prisma.item.create({
      data: {
        name,
        description,
        quantity,
        category,
        userId: decoded.userId,
      },
    });

    return NextResponse.json(newItem);
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}