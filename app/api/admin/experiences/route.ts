import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { adminAuthMiddleware } from "../auth/middleware";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    await adminAuthMiddleware(request);
    const experiences = await prisma.experience.findMany({
      orderBy: {
        startDate: "desc",
      },
    });
    return NextResponse.json(experiences);
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

    // Handle date strings
    if (data.startDate) {
      data.startDate = new Date(data.startDate);
    }

    if (data.endDate) {
      data.endDate = new Date(data.endDate);
    }

    // Set current flag based on endDate
    if (data.current === true) {
      data.endDate = null;
    } else if (data.current === undefined && !data.endDate) {
      data.current = true;
    }

    const experience = await prisma.experience.create({
      data: data,
    });

    return NextResponse.json(experience, { status: 201 });
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

    // Handle date strings
    if (updateData.startDate) {
      updateData.startDate = new Date(updateData.startDate);
    }

    if (updateData.endDate) {
      updateData.endDate = new Date(updateData.endDate);
    }

    // Set current flag based on endDate
    if (updateData.current === true) {
      updateData.endDate = null;
    } else if (updateData.current === false && !updateData.endDate) {
      // If marked as not current but no end date provided, set to today
      updateData.endDate = new Date();
    }

    const experience = await prisma.experience.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(experience);
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

    await prisma.experience.delete({
      where: { id: data.id },
    });

    return NextResponse.json({ message: "Experience deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
