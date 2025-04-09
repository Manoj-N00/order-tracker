"use client";

import { DataTable } from "@/components/ui/data-table";
import AnalyticsCard from "@/components/dashboard/analytics-card";
import { OrderColumns } from "./columns";
import { CreateOrderDialog } from "@/components/orders/create-order-dialog";
import { useEffect, useState } from "react";
import type { Orders } from "./columns";
import { useSearchParams } from "next/navigation";

async function getOrders(): Promise<Orders[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/orders`, { cache: "no-store" });
  const data = await res.json();
  return data;
}

export default function OrdersPage() {
  const [data, setData] = useState<Orders[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchOrders = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const orderId = searchParams.get("orderId");
      const status = searchParams.get("status");
      
      let url = `${apiUrl}/api/orders`;
      const params = new URLSearchParams();
      if (orderId) params.append("orderId", orderId);
      if (status) params.append("status", status);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url, { cache: "no-store" });
      const orders = await res.json();
      setData(orders);
    };

    fetchOrders();
  }, [searchParams]);

  return (
    <div className="p-6">
      <AnalyticsCard
        title="Orders"
        subTitle="Showing all orders"
      >
        <CreateOrderDialog />
        <DataTable columns={OrderColumns()} data={data} />
      </AnalyticsCard>
    </div>
  );
}
