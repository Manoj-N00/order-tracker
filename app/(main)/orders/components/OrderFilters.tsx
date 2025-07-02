"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiSortAlt2 } from "react-icons/bi";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import StatusFilter from "./StatusFilter";
import SearchButton from "./SearchButton";
import RefetchButton from "./RefetchButton";

interface Props {
  searchParams: { status?: string; sortOrder?: string };
}

const OrderFilters = ({ searchParams: { status, sortOrder } }: Props) => {
  const params = new URLSearchParams();
  if (status) {
    params.append("status", status);
  }

  if (sortOrder) {
    params.append("sortOrder", sortOrder);
  }

  const getSortOrder = (sortOrder: string | undefined): string => {
    return sortOrder === "asc" ? "desc" : "asc";
  };

  return (
    <div className="w-full max-md:hidden flex justify-between items-center">
      <div className="w-full flex gap-3">
        <Link
          href={`${
            sortOrder
              ? `/orders?sortOrder=${getSortOrder(sortOrder)}`
              : "/orders"
          }`}>
          <Button
            className={` border rounded-lg border-[#333337] transition-colors ease-in-out w-15 text-sm  ${
              !status
                ? "bg-white text-black hover:bg-white/75 hover:text-black"
                : "bg-[#0F0F10]"
            }`}>
            All Orders
          </Button>
        </Link>
        <Link
          href={`${
            sortOrder
              ? `/orders?status=Cancelled&sortOrder=${sortOrder}`
              : "/orders?status=Cancelled"
          }`}>
          <Button
            className={` border rounded-lg border-[#333337] transition-colors ease-in-out w-15 text-sm  ${
              status === "Cancelled"
                ? "bg-white text-black hover:bg-white/75 hover:text-black"
                : "bg-[#0F0F10]"
            }`}>
            Unfullfilled
          </Button>
        </Link>
        <Link href={"/new-order"}>
          <Button className="w-10 h-8 text-xl text-black bg-white hover:bg-[#0F0F10] border rounded-lg border-[#333337]  hover:text-white">
            +
          </Button>
        </Link>
      </div>
      <div className="w-full flex gap-3 justify-end">
        <Link
          href={`${
            status
              ? `/orders?status=${status}&sortOrder=${getSortOrder(sortOrder)}`
              : `/orders?sortOrder=${getSortOrder(sortOrder)}`
          }`}>
          <Button
            className={` border rounded-lg border-[#333337] transition-colors ease-in-out w-15 text-sm  ${
              sortOrder
                ? "bg-white text-black hover:bg-white/75 hover:text-black"
                : "bg-[#0F0F10]"
            }`}>
            {!sortOrder && <BiSortAlt2 />}
            {sortOrder === "desc" ? (
              <FaSortAlphaUp />
            ) : sortOrder === "asc" ? (
              <FaSortAlphaDown />
            ) : (
              ""
            )}
          </Button>
        </Link>
        <StatusFilter searchParams={{ status, sortOrder }} />
        <RefetchButton />
        <SearchButton />
      </div>
    </div>
  );
};

export default OrderFilters;
