import { NextResponse } from "next/server";
import { format } from "date-fns";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateOrderId() {
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`.toUpperCase();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, totalAmount, paymentStatus, orderStatus, items = [] } = body;

    // Find or create customer
    let customer = await prisma.customer.findUnique({
      where: { email: customerEmail }
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name: customerName,
          email: customerEmail,
          address: body.address || "",
          totalSpend: parseFloat(totalAmount)
        }
      });
    }

    // Get or create order status
    const status = await prisma.orderStatus.findUnique({
      where: { status: orderStatus }
    }) || await prisma.orderStatus.create({
      data: { status: orderStatus }
    });

    // Get or create payment status
    const payment = await prisma.paymentStatus.findUnique({
      where: { status: paymentStatus }
    }) || await prisma.paymentStatus.create({
      data: { status: paymentStatus }
    });

    // Create order
    const order = await prisma.order.create({
      data: {
        orderId: generateOrderId(),
        customerId: customer.id,
        statusId: status.id,
        paymentStatusId: payment.id,
        totalAmount: parseFloat(totalAmount),
        items: items
      },
      include: {
        customer: true,
        status: true,
        paymentStatus: true
      }
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Error creating order" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const order = await prisma.order.delete({
      where: { orderId: orderId }
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json({ error: "Error deleting order" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');
  const status = searchParams.get('status');

  const where = {
    ...(orderId ? { orderId: { contains: orderId } } : {}),
    ...(status ? { status: { status } } : {}),
  };
  try {
    const orders = await prisma.order.findMany({
      where,
      include: {
        status: true,
        paymentStatus: true,
        fulfillment: true,
        supportTickets: true,
        Product: true,
      },
    });

    const formattedOrders = orders.map(order => ({
      ...order,
      shippedAt: order.shippedAt ? format(new Date(order.shippedAt), "MM/dd/yyyy") : null,
      deliveredAt: order.deliveredAt ? format(new Date(order.deliveredAt), "MM/dd/yyyy") : null,
      canceledAt: order.canceledAt ? format(new Date(order.canceledAt), "MM/dd/yyyy") : null,
      orderStatus: order.status?.status || "Unknown",
      paymentStatus: order.paymentStatus?.status || "Unknown",
    }));

    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Error fetching orders" }, { status: 500 });
  }
}
