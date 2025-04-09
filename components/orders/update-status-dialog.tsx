"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UpdateStatusDialogProps {
  orderId: string;
  currentStatus: string;
  onStatusUpdate: (orderId: string, newStatus: string) => void;
}

const orderStatuses = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export function UpdateStatusDialog({
  orderId,
  currentStatus,
  onStatusUpdate,
}: UpdateStatusDialogProps) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [isOpen, setIsOpen] = useState(false);

  const handleStatusUpdate = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: selectedStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      onStatusUpdate(orderId, selectedStatus);
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-8 w-full justify-start">
          Update Status
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Select
              value={selectedStatus}
              onValueChange={setSelectedStatus}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {orderStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleStatusUpdate}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}