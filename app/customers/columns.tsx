"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Customers = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalSpend: number;
  lifetimeValue: number;
  lastOrderDate: Date;
  location: string;
};

export const columns: ColumnDef<Customers>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalSpend",
    header: "Total Spend",
  },
  {
    accessorKey: "lifetimeValue",
    header: "Lifetime Value",
  },
  {
    accessorKey: "lastOrderDate",
    header: "Last Order Date",
    cell: ({ row }) => {
        const date = new Date(row.getValue("lastOrderDate") as string);
        return format(date, "MM/dd/yyyy");
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Customer</DropdownMenuItem>
            <DropdownMenuItem>Delete Customer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
