import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, ProjectStatus, Type } from "@prisma/client";
import { adminAuthMiddleware } from "../auth/middleware";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    await adminAuthMiddleware(request);
    const projects = await prisma.project.findMany();
    return NextResponse.json(projects);
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

    // Validate enum values
    if (data.projectType && !Object.values(Type).includes(data.projectType)) {
      return NextResponse.json(
        {
          error: `Invalid project type. Must be one of: ${Object.values(Type).join(", ")}`,
        },
        { status: 400 }
      );
    }

    if (data.status && !Object.values(ProjectStatus).includes(data.status)) {
      return NextResponse.json(
        {
          error: `Invalid status. Must be one of: ${Object.values(ProjectStatus).join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Ensure technologies is an array
    if (data.technologies && !Array.isArray(data.technologies)) {
      data.technologies = [data.technologies];
    }

    // Handle date strings
    if (data.startDate) {
      data.startDate = new Date(data.startDate);
    }

    if (data.endDate) {
      data.endDate = new Date(data.endDate);
    }

    const project = await prisma.project.create({
      data: data,
    });

    return NextResponse.json(project, { status: 201 });
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

    // Validate enum values
    if (
      updateData.projectType &&
      !Object.values(Type).includes(updateData.projectType)
    ) {
      return NextResponse.json(
        {
          error: `Invalid project type. Must be one of: ${Object.values(Type).join(", ")}`,
        },
        { status: 400 }
      );
    }

    if (
      updateData.status &&
      !Object.values(ProjectStatus).includes(updateData.status)
    ) {
      return NextResponse.json(
        {
          error: `Invalid status. Must be one of: ${Object.values(ProjectStatus).join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Ensure technologies is an array
    if (updateData.technologies && !Array.isArray(updateData.technologies)) {
      updateData.technologies = [updateData.technologies];
    }

    // Handle date strings
    if (updateData.startDate) {
      updateData.startDate = new Date(updateData.startDate);
    }

    if (updateData.endDate) {
      updateData.endDate = new Date(updateData.endDate);
    }

    const project = await prisma.project.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(project);
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

    await prisma.project.delete({
      where: { id: data.id },
    });

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
