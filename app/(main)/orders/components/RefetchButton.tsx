"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdRefresh } from "react-icons/md";
import { BiLoaderCircle } from "react-icons/bi";

const RefetchButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleRefresh = () => {
    setIsLoading(true);
    router.refresh();
    setIsLoading(false);
  };
  return (
    <Button
      onClick={handleRefresh}
      className="text-xl text-white border border-[#333337] bg-[#0F0F10] hover:bg-white hover:text-black">
      {isLoading ? (
        <BiLoaderCircle className="ml-4 h-4 w-4 animate-spin" />
      ) : (
        <MdRefresh />
      )}
    </Button>
  );
};

export default RefetchButton;
