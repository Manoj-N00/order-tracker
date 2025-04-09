"use client";

import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";
import AnalyticsCard from "./analytics-card";

export type TopProducts = {
  id: number;
  name: string;
  revenue: number;
  price: number;
};

export const topProductsColumns: ColumnDef<TopProducts>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "revenue",
      header: "Revenue",
      cell: ({ row }) => {
        const totalRevenue = row.getValue("revenue") as number;
        const formattedRevenue = typeof totalRevenue === 'number' ? totalRevenue.toFixed(2) : '0.00';

      return <>${formattedRevenue}</>;
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = row.getValue("price") as number;
        return <>${price.toFixed(2)}</>;
      },
    },
  ];

async function getTopProducts(): Promise<TopProducts[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/products`, { cache: "no-store" });
  const data = await res.json();
  return data;
}

export const TopProducts = () => {
  const [topProducts, setTopProducts] = useState<TopProducts[]>([]);

  useEffect(() => {
    async function fetchTopProducts() {
      const data = await getTopProducts();
      const sortedProducts = data.sort((a, b) => b.revenue - a.revenue).slice(0, 4);
      setTopProducts(sortedProducts);
    }

    fetchTopProducts();
  }, []);

  return (
    <AnalyticsCard
      title="Top Products"
      subTitle="Showing Most Sold Products"
    >
      <DataTable
        columns={topProductsColumns}
        data={topProducts}
      />
    </AnalyticsCard>
  );
};
