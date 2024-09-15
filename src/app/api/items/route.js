import { NextResponse } from "next/server"; 
import { PrismaClient } from "@prisma/client";  
import { verifyJWT } from "@/app/utils/helpers/authHelpers"; 

const prisma = new PrismaClient();  


export const GET = async (req) => {
  try {
   
    const items = await prisma.item.findMany();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch items" },
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "").trim();
  
  if (!token) {
    return NextResponse.json(
      { message: "No token provided" },
      { status: 401 }
    );
  }

  try {
    await verifyJWT(token);  
  } catch (error) {

    return NextResponse.json(
      { message: "Invalid token" },
      { status: 401 }
    );
  }

  let body;
  try {
    body = await req.json();  
  } catch (error) {
    
    return NextResponse.json(
      { message: "A valid JSON object has to be sent" },
      { status: 400 }
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
    
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.log("ERROR:::", error.message);  
    
    return NextResponse.json(
      { message: "Valid item data has to be sent" },
      { status: 400 }
    );
  }
};