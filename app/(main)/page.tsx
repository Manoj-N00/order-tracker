import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Hero } from "../components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cybership OrderStream",
  description:
    "Stay updated with real-time order statuses. Our platform simplifies tracking for seamless customer experiences.",
};

const HomePage = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full gap-5 flex-col px-4">
      <Hero />
      <p className="max-w-xl mx-auto text-sm md:text-lg text-white text-center">
        Stay updated with real-time order statuses. Our platform simplifies
        tracking for seamless customer experiences.
      </p>
      <div className="flex gap-5">
        <Link href="/orders">
          <Button className="bg-white text-black hover:bg-[#0f0f10] hover:border-[#] hover:text-white">
            Orders
          </Button>
        </Link>
        <Link href="/new-order">
          <Button className="bg-white text-black hover:bg-[#0f0f10] hover:border-[#] hover:text-white">
            Create New Order
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
