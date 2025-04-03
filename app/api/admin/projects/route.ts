import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { adminAuthMiddleware } from "../auth/middleware";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    await adminAuthMiddleware(request);
    const data = await request.json();
    
    const project = await prisma.project.create({
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(project, { status: 201 });
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

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(project);
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
    
    await prisma.project.delete({
      where: { id: data.id },
    });

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}