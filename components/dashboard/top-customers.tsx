"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { DataTable } from "../ui/data-table";
import AnalyticsCard from "./analytics-card";

type TopCustomerProps = {
  data: Customers[];
};

export type Customers = {
  id: string;
  name: string;
  email: string;
  totalSpend: number;
  image: string;
};

export const topCustomerColumns: ColumnDef<Customers>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "totalSpend",
    header: "Total Spending",
    cell: ({ row }) => {
      const totalSpend = row.getValue("totalSpend") as number;

      const formattedSpend = typeof totalSpend === 'number' ? totalSpend.toFixed(2) : '0.00';

      return <>${formattedSpend}</>;
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: () => {
      return (
        <Image
          src={'/avatar-image.avif'}
          width={50}
          height={50}
          alt={`Customer Image`}
          className="border-2 border-primary"
        />
      );
    },
  },
];

export const TopCustomers = ({
  data,
}: TopCustomerProps) => {
  return (
    <AnalyticsCard
      title="Top Customers"
      subTitle="Showing customers with most spending"
    >
      <DataTable columns={topCustomerColumns} data={data} />
    </AnalyticsCard>
  );
};
