import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import OrderFilters from "./components/OrderFilters";

const loading = () => {
  return (
    <div className="border border-[#333337] p-6 flex-col flex items-center justify-start gap-2  shadow-neumorphic  w-[80vw]  bg-[#0F0F10] h-screen my-5  rounded-xl">
      <OrderFilters searchParams={{ sortOrder: "asc" }} />
      <Skeleton className="w-full bg-[#333] h-full rounded-xl" />
    </div>
  );
};

export default loading;
