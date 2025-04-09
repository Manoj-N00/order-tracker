import { NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = params;

    const order = await prisma.order.findUnique({
      where: { orderId },
    });

    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }

    await prisma.order.delete({
      where: { orderId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting order:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}