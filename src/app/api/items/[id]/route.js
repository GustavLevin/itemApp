import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Get a specific item by ID
export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    const item = await prisma.item.findUniqueOrThrow({
      where: { id: Number(id) },
    });
    return NextResponse.json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    return NextResponse.json({ message: "No item found with this ID" }, { status: 404 });
  }
};

// Update a specific item by ID
export const PUT = async (req, { params }) => {
  const { id } = params;

  try {
    const { name, quantity, description, category } = await req.json();
    const updatedItem = await prisma.item.update({
      where: { id: Number(id) },
      data: {
        name,
        quantity,
        description,
        category,
      },
    });
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Error updating item:", error);
    return NextResponse.json({ message: "Cannot update this item" }, { status: 400 });
  }
};

// Delete a specific item by ID
export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    await prisma.item.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "Item deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json({ message: "Item not found or cannot be deleted" }, { status: 404 });
  }
};