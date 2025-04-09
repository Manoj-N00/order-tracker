"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Products = {
  sku: string;
  name: string;
  description: string;
  price: number;
  stockLevel: number;
  categoryId: number;
  rating: number;
  returnRate: number;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return <>${price.toFixed(2)}</>;
    },
  },
  {
    accessorKey: "stockLevel",
    header: "Stock Level",
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number;
      return <>⭐ {rating.toFixed(1)}</>;
    },
  },
  {
    accessorKey: "returnRate",
    header: "Return Rate",
    cell: ({ row }) => {
      const returnRate = row.getValue("returnRate") as number;
      return <>{returnRate.toFixed(1)}%</>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              Edit Product
            </DropdownMenuItem>
            <DropdownMenuItem>
              Delete Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
