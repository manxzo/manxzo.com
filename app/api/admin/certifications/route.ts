import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { adminAuthMiddleware } from "../auth/middleware";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    await adminAuthMiddleware(request);
    const data = await request.json();

    const certification = await prisma.certification.create({
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(certification, { status: 201 });
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

    const certification = await prisma.certification.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(certification);
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

    await prisma.certification.delete({
      where: { id: data.id },
    });

    return NextResponse.json({ message: "Certification deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
