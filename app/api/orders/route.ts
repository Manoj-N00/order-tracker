import { prisma } from "@/prisma/client";
import { orderSchema } from "@/lib/validationSchemas";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 10);
  const status = searchParams.get("status");
  const sortOrder = searchParams.get("sortOrder") ?? "asc";
  const searchQuery = searchParams.get("search") ?? "";

  const where: {
    status?: OrderStatus;
    customerName?: { contains: string; mode: "insensitive" };
  } = {};

  function mapStatus(status: string): OrderStatus | undefined {
    switch (status) {
      case "Processing":
        return OrderStatus.Processing;
      case "Shipped":
        return OrderStatus.Shipped;
      case "Delivered":
        return OrderStatus.Delivered;
      case "Cancelled":
        return OrderStatus.Cancelled;
      default:
        return undefined;
    }
  }

  if (status) {
    const enumStatus = mapStatus(status);
    if (enumStatus) {
      where.status = enumStatus;
    }
  }

  if (searchQuery) {
    where.customerName = { contains: searchQuery, mode: "insensitive" };
  }

  try {
    const orders = await prisma.order.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        customerName: sortOrder === "asc" ? "asc" : "desc",
      },
    });

    const totalOrders = await prisma.order.count({ where });

    return NextResponse.json(
      {
        data: orders,
        pagination: {
          page,
          pageSize,
          totalPages: Math.ceil(totalOrders / pageSize),
          totalOrders,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = orderSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const newOrder = await prisma.order.create({
      data: {
        customerName: body.customerName,
        status: OrderStatus.Processing,
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
