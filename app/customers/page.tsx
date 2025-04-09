import { DataTable } from "@/components/ui/data-table";
import AnalyticsCard from "@/components/dashboard/analytics-card";
import { columns, Customers } from "./columns";
import { CreateCustomerDialog } from "@/components/customers/create-customer-dialog";

async function getCustomers(): Promise<Customers[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/customers`, { cache: "no-store" });
  const data = await res.json();
  return data;
}

export default async function page() {
  const data = await getCustomers();

  return (
    <div className="p-6">
      <AnalyticsCard
        title="Customers"
        subTitle="Showing all customers with orders"
      >
        <CreateCustomerDialog />
        <DataTable columns={columns} data={data} />
      </AnalyticsCard>
    </div>
  );
}
