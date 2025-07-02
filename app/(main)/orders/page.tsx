import OrderFilters from "./components/OrderFilters";
import OrdersTable from "./components/OrdersTable";
import { Metadata } from "next";

interface Props {
  searchParams: { status?: string; sortOrder?: string };
}

export const metadata: Metadata = {
  title: "Cybership - Orders List",
  description:
    "List of all orders. Stay updated with real-time order statuses.",
};

const OrdersPage = ({ searchParams }: Props) => {
  return (
    <div className="border border-[#333337] p-6 flex-col flex items-center justify-start gap-2  shadow-neumorphic  w-[80vw]  bg-[#0F0F10] h-[90vh] my-5 rounded-xl">
      <OrderFilters searchParams={searchParams} />
      <OrdersTable />
    </div>
  );
};

export default OrdersPage;
