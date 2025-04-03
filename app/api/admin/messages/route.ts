import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { adminAuthMiddleware } from "../auth/middleware";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    await adminAuthMiddleware(request);
    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await adminAuthMiddleware(request);
    const data = await request.json();
    const { id, ...updateData } = data;

    const message = await prisma.message.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await adminAuthMiddleware(request);
    const data = await request.json();
    
    await prisma.message.delete({
      where: { id: data.id },
    });

    return NextResponse.json({ message: "Message deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 