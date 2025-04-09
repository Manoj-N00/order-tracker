import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const totalOrders = await prisma.order.count();

    const totalRevenueResult = await prisma.customer.aggregate({
      _sum: {
        totalSpend: true,
      },
    });
    const totalRevenue = totalRevenueResult._sum.totalSpend || 0;

    const totalCustomers = await prisma.customer.count();

    const totalProducts = await prisma.product.count();

    return NextResponse.json({
      totalOrders,
      totalRevenue: totalRevenue.toFixed(2),
      totalCustomers,
      totalProducts,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch summary data' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}