import { Customers } from "@/components/dashboard/top-customers";
import { Customer } from "@prisma/client";

export async function fetchTopCustomers(): Promise<Customers[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/top-customers`, {
    cache: "no-store",
  });
  const data = await res.json();

  const topCustomers = data.map((customer: Customer) => ({
    id: customer.id,
    name: customer.name,
    totalSpend: customer.totalSpend,
    email: customer.email,
  }));

  return topCustomers;
}
