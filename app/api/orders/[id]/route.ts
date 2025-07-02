import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const body = await request.json();
  const { status } = body;
  const customer = await prisma.order.findUnique({ where: { id: +id } });
  if (!customer) {
    return NextResponse.json({ error: "Invalid User" }, { status: 400 });
  }

  const updatedCustomer = await prisma.order.update({
    where: {
      id: customer.id,
    },
    data: {
      status,
    },
  });
  return NextResponse.json(updatedCustomer, { status: 201 });
}
