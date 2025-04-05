import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, InterestType, InterestStatus } from "@prisma/client";
import { adminAuthMiddleware } from "../auth/middleware";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    await adminAuthMiddleware(request);
    const interests = await prisma.interest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(interests);
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

    // Validate enums
    if (data.type && !Object.values(InterestType).includes(data.type)) {
      return NextResponse.json(
        {
          error: `Invalid interest type. Must be one of: ${Object.values(InterestType).join(", ")}`,
        },
        { status: 400 }
      );
    }

    if (data.status && !Object.values(InterestStatus).includes(data.status)) {
      return NextResponse.json(
        {
          error: `Invalid status. Must be one of: ${Object.values(InterestStatus).join(", ")}`,
        },
        { status: 400 }
      );
    }

    const interest = await prisma.interest.create({
      data: data,
    });

    return NextResponse.json(interest, { status: 201 });
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

    // Validate enums
    if (
      updateData.type &&
      !Object.values(InterestType).includes(updateData.type)
    ) {
      return NextResponse.json(
        {
          error: `Invalid interest type. Must be one of: ${Object.values(InterestType).join(", ")}`,
        },
        { status: 400 }
      );
    }

    if (
      updateData.status &&
      !Object.values(InterestStatus).includes(updateData.status)
    ) {
      return NextResponse.json(
        {
          error: `Invalid status. Must be one of: ${Object.values(InterestStatus).join(", ")}`,
        },
        { status: 400 }
      );
    }

    const interest = await prisma.interest.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(interest);
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

    await prisma.interest.delete({
      where: { id: data.id },
    });

    return NextResponse.json({ message: "Interest deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
