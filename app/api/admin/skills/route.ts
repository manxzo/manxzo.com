import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, SkillCategory, ProficiencyLevel } from "@prisma/client";
import { adminAuthMiddleware } from "../auth/middleware";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    await adminAuthMiddleware(request);
    const skills = await prisma.skill.findMany({
      include: {
        Certification: true
      }
    });
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await adminAuthMiddleware(request);
    const data = await request.json();
    
    // Validate the enum values
    if (data.category && !Object.values(SkillCategory).includes(data.category)) {
      return NextResponse.json(
        { error: `Invalid category. Must be one of: ${Object.values(SkillCategory).join(", ")}` },
        { status: 400 }
      );
    }
    
    if (data.proficiency && !Object.values(ProficiencyLevel).includes(data.proficiency)) {
      return NextResponse.json(
        { error: `Invalid proficiency level. Must be one of: ${Object.values(ProficiencyLevel).join(", ")}` },
        { status: 400 }
      );
    }
    
    const skill = await prisma.skill.create({
      data: data,
      include: {
        Certification: data.certificationId ? true : false
      }
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await adminAuthMiddleware(request);
    const data = await request.json();
    const { id, ...updateData } = data;

    // Validate the enum values
    if (updateData.category && !Object.values(SkillCategory).includes(updateData.category)) {
      return NextResponse.json(
        { error: `Invalid category. Must be one of: ${Object.values(SkillCategory).join(", ")}` },
        { status: 400 }
      );
    }
    
    if (updateData.proficiency && !Object.values(ProficiencyLevel).includes(updateData.proficiency)) {
      return NextResponse.json(
        { error: `Invalid proficiency level. Must be one of: ${Object.values(ProficiencyLevel).join(", ")}` },
        { status: 400 }
      );
    }

    const skill = await prisma.skill.update({
      where: { id },
      data: updateData,
      include: {
        Certification: updateData.certificationId ? true : false
      }
    });

    return NextResponse.json(skill);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await adminAuthMiddleware(request);
    const data = await request.json();
    
    await prisma.skill.delete({
      where: { id: data.id },
    });

    return NextResponse.json({ message: "Skill deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
} 