import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const topCustomers = await prisma.customer.findMany({
      orderBy: {
        totalSpend: 'desc',
      },
      take: 5,
    });

    return NextResponse.json(topCustomers);
  } catch (error) {
    console.error("Error fetching top customers:", error);
    return NextResponse.json({ error: "Error fetching top customers" }, { status: 500 });
  }
}