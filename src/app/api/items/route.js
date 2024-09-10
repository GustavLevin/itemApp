import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifyJWT } from "@/app/utils/helpers/authHelpers";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "").trim();
    
    if (!token) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 });
    }

    const decoded = await verifyJWT(token);

    let body;
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
    }

    const newItem = await prisma.item.create({
      data: {
        name: body.name,
        quantity: body.quantity,
        category: body.category,
        userId: decoded.userId,
      },
    });

    return NextResponse.json(newItem);
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}