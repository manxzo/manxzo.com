import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 