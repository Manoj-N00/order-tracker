"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function CreateOrderDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Correcting the type of totalAmount to be a number
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    address: "",
    totalAmount: 0, // Changed to number
    paymentStatus: "Pending",
    orderStatus: "Processing",
    items: [{
      productId: "",
      quantity: 1,
      price: 0
    }]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setLoading(false);
    }
  };

  // Adjusted handleChange function to correctly handle totalAmount as a number
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "totalAmount") {
      // Convert the value to a number
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-3">Create New Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new order.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="customerName">Customer Name</label>
            <Input
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="customerEmail">Customer Email</label>
            <Input
              id="customerEmail"
              name="customerEmail"
              type="email"
              value={formData.customerEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="address">Customer Address</label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="totalAmount">Total Amount</label>
            <Input
              id="totalAmount"
              name="totalAmount"
              type="number"
              value={formData.totalAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="paymentStatus">Payment Status</label>
            <select
              id="paymentStatus"
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Order"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
