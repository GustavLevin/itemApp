import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifyJWT } from "@/app/utils/authHelpers"; // Ensure the path is correct

const prisma = new PrismaClient();

export const GET = async (req) => {
  const url = new URL(req.url);
  const search = url.searchParams.get("search");
  let items = [];
  if (search) {
    items = await prisma.item.findMany({
      where: {
        category: {
          contains: search,
          mode: "insensitive",
        },
      },
    });
  } else {
    items = await prisma.item.findMany();
  }

  return NextResponse.json(items);
};

export const POST = async (req) => {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      {
        message: "A valid JSON object has to be sent",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const newItem = await prisma.item.create({
      data: {
        name: body.name,
        description: body.description,
        quantity: body.quantity,
        category: body.category,
      },
    });
    return NextResponse.json(newItem, {
      status: 201,
    });
  } catch (error) {
    console.log("ERROR:::", error.message);
    return NextResponse.json(
      {
        message: "Valid item data has to be sent",
      },
      {
        status: 400,
      }
    );
  }
};