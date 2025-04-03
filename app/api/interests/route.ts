import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const interests = await prisma.interest.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(interests);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 