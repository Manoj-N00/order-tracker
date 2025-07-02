import { OrderStatus } from "@prisma/client";
import { z } from "zod";

export const orderSchema = z.object({
  customerName: z
    .string()
    .min(1, { message: "customer name is required." })
    .max(30, { message: "Customer name cannot be more than 30 characters." }),
  status: z.nativeEnum(OrderStatus).optional().default(OrderStatus.Processing),
});

export const SearchSchema = z.object({
  searchCustomer: z
    .string()
    .max(30, { message: "Customer name cannot be more than 30 characters." }),
});
