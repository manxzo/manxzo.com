import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { adminAuthMiddleware } from "./auth/middleware";
import { hashPassword } from "@/utils/auth";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    await adminAuthMiddleware(request);
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(admins);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await adminAuthMiddleware(request);
    const data = await request.json();
    
    const hashedPassword = await hashPassword(data.password);
    
    const admin = await prisma.admin.create({
      data: {
        ...data,
        password: hashedPassword,
        updatedAt: new Date(),
      },
    });

    const { password, ...adminWithoutPassword } = admin;
    return NextResponse.json(adminWithoutPassword, { status: 201 });
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

    if (updateData.password) {
      updateData.password = await hashPassword(updateData.password);
    }

    const admin = await prisma.admin.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    });

    const { password, ...adminWithoutPassword } = admin;
    return NextResponse.json(adminWithoutPassword);
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
    
    await prisma.admin.delete({
      where: { id: data.id },
    });

    return NextResponse.json({ message: "Admin deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 