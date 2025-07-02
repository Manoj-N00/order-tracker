import CustomerForm from "@/app/components/forms/CustomerForm";
import { GlobeDemo } from "./Globe";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cybership - New Order",
  description: "Place new orders now!",
};

const page = () => {
  return (
    <div className="flex w-full  justify-around items-center">
      <div className="flex flex-col max-lg:p-5 max-lg:h-screen items-center justify-evenly">
        <h2 className="text-white text-5xl">Create New Order</h2>
        <CustomerForm />
      </div>
      <GlobeDemo />
    </div>
  );
};

export default page;
