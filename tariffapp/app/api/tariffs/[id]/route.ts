import { tariffSchema } from "@/ValidationSchemas/tariff";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();

  const validation = tariffSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const tariff = await prisma.tariff.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!tariff) {
    return NextResponse.json({ error: "Ticket Not Found" }, { status: 404 });
  }

  if (body?.assignedToUserId) {
    body.assignedToUserId = parseInt(body.assignedToUserId);
  }

  const updateTariff = await prisma.tariff.update({
    where: { id: tariff.id },
    data: {
      ...body,
    },
  });

  return NextResponse.json(updateTariff, { status: 200 });
}
