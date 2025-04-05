import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Type } from "@prisma/client";
import { adminAuthMiddleware } from "../auth/middleware";
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    await adminAuthMiddleware(request);
    const profiles = await prisma.profile.findMany();
    return NextResponse.json(profiles);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await adminAuthMiddleware(request);
    const data = await request.json();

    // Validate type enum
    if (data.type && !Object.values(Type).includes(data.type)) {
      return NextResponse.json(
        {
          error: `Invalid type. Must be one of: ${Object.values(Type).join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Handle date strings
    if (data.birthday) {
      data.birthday = new Date(data.birthday);
    }

    const profile = await prisma.profile.create({ data: data });

    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await adminAuthMiddleware(request);
    const data = await request.json();
    const { id, ...updateData } = data;

    // Validate type enum
    if (updateData.type && !Object.values(Type).includes(updateData.type)) {
      return NextResponse.json(
        {
          error: `Invalid type. Must be one of: ${Object.values(Type).join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Handle date strings
    if (updateData.birthday) {
      updateData.birthday = new Date(updateData.birthday);
    }

    const profile = await prisma.profile.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await adminAuthMiddleware(request);
    const data = await request.json();

    await prisma.profile.delete({
      where: { id: data.id },
    });

    return NextResponse.json({ message: "Profile deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
