import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const { status } = await request.json();
    const { orderId } = params;

    // Find the status ID for the new status
    const orderStatus = await prisma.orderStatus.findFirst({
      where: { status },
    });

    if (!orderStatus) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    // Update the order status
    const updatedOrder = await prisma.order.update({
      where: { orderId },
      data: {
        statusId: orderStatus.id,
        ...(status === "Shipped" ? { shippedAt: new Date() } : {}),
        ...(status === "Delivered" ? { deliveredAt: new Date() } : {}),
        ...(status === "Cancelled" ? { canceledAt: new Date() } : {}),
      },
      include: {
        status: true,
        paymentStatus: true,
      },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { error: "Error updating order status" },
      { status: 500 }
    );
  }
}