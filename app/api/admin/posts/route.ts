import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Type } from "@prisma/client";
import { adminAuthMiddleware } from "../auth/middleware";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    await adminAuthMiddleware(request);
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(posts);
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

    // Ensure slug uniqueness
    if (data.slug) {
      const existingPost = await prisma.post.findUnique({
        where: { slug: data.slug },
      });

      if (existingPost) {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // Ensure tags is an array
    if (data.tags && !Array.isArray(data.tags)) {
      data.tags = [data.tags];
    }

    const post = await prisma.post.create({
      data: data,
    });

    return NextResponse.json(post, { status: 201 });
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

    // Ensure slug uniqueness if changed
    if (updateData.slug) {
      const existingPost = await prisma.post.findUnique({
        where: { slug: updateData.slug },
      });

      if (existingPost && existingPost.id !== id) {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // Ensure tags is an array
    if (updateData.tags && !Array.isArray(updateData.tags)) {
      updateData.tags = [updateData.tags];
    }

    const post = await prisma.post.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(post);
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

    await prisma.post.delete({
      where: { id: data.id },
    });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
