"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter} from "next/navigation";
import { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";

interface Props {
  searchParams: { status?: string; sortOrder?: string };
}

const StatusFilter = ({ searchParams: { status } }: Props) => {
  const router = useRouter();

  // Introduce local state to manage selected value
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    status || ""
  );

  return (
    <Select
      defaultValue={status}
      value={selectedStatus}
      onValueChange={(selectStatus) => {
        const params = new URLSearchParams();
        console.log(selectStatus);
        console.log(params.toString());

        if (selectStatus) {
          params.append("status", selectStatus);
        }
        setSelectedStatus(selectStatus);
        router.push(`/orders?${params.toString()}`);
        setSelectedStatus("");
      }}>
      <SelectTrigger
        className={`border overflow-hidden p-2 border-[#333337] w-auto flex items-center justify-center text-white ${
          status && status !== "Cancelled"
            ? "bg-white text-black hover:bg-white/75 hover:text-black"
            : ""
        }`}>
        {status && status !== "Cancelled" ? (
          <SelectValue
            placeholder={<p className="text-sm font-semibold">{status}</p>}
          />
        ) : (
          <IoFilterSharp className="m-3" />
        )}
      </SelectTrigger>
      <SelectContent className="bg-[#0f0f10] border border-[#333337]">
        <SelectItem value="Processing" className=" bg-[#0F0F10]">
          <Button
            className={`${
              status === "Processing" ? "text-black bg-white hover:bg-white/75 hover:text-black" : ""
            }`}>
            Processing
          </Button>
        </SelectItem>
        <SelectItem value="Shipped">
          <Button
            className={`${status === "Shipped" ? "text-black bg-white hover:bg-white/75 hover:text-black" : ""}`}>
            Shipped
          </Button>
        </SelectItem>
        <SelectItem value="Delivered">
          <Button
            className={`${
              status === "Delivered" ? "text-black bg-white hover:bg-white/75 hover:text-black" : ""
            }`}>
            Delivered
          </Button>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default StatusFilter;
