import { tariffSchema } from "@/ValidationSchemas/tariff";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = tariffSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newTariff = await prisma.tariff.create({
    data: { ...body },
  });

  return NextResponse.json(newTariff, { status: 201 });
}
