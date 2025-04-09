"use client";

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
import { DataTable } from "@/components/ui/data-table";
import { UpdateStatusDialog } from "@/components/orders/update-status-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

export type Orders = {
  id: string | number;
  orderId: string;
  totalAmount: number;
  shippedAt: string;
  deliveredAt: string;
  orderStatus: string;
  paymentStatus: string;
};

export function OrderColumns() {
  const [data, setData] = useState<Orders[]>([]);
  const router = useRouter();

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    setData((prevData) =>
      prevData.map((order) =>
        order.orderId === orderId
          ? { ...order, orderStatus: newStatus }
          : order
      )
    );
    router.refresh();
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/api/orders/${orderId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete order');
        }

        router.refresh();
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  const columns: ColumnDef<Orders>[] = [
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      const totalAmount = row.getValue("totalAmount") as number;
      return <>${totalAmount}</>;
    },
  },
  {
    accessorKey: "shippedAt",
    header: "Shipped At",
    cell: ({ row }) => {
      const shippedAt = row.getValue("shippedAt") as string;
      return <span>{shippedAt}</span>;
    },
  },
  {
    accessorKey: "deliveredAt",
    header: "Delivered At",
    cell: ({ row }) => {
      const deliveredAt = row.getValue("deliveredAt") as string;
      return <span>{deliveredAt}</span>;
    },
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
    cell: ({ row }) => {
      const orderStatus = row.getValue("orderStatus") as string;
      return <span>{orderStatus}</span>;
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const paymentStatus = row.getValue("paymentStatus") as string;
      return <span>{paymentStatus}</span>;
    },
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
            <UpdateStatusDialog
              orderId={row.original.orderId}
              currentStatus={row.original.orderStatus}
              onStatusUpdate={handleStatusUpdate}
            />
            <DropdownMenuItem>View Order Details</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteOrder(row.original.orderId)}>Delete Order</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

  return columns;
}

export default function OrdersPage() {
  return null;
}
