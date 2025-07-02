"use client";
import { Input } from "@/components/aceternity-ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from "@/components/ui/form";
import { SearchSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { z } from "zod";

const SearchButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const params = new URLSearchParams();
  const searchParams = useSearchParams();

  const search = searchParams.get("searchCustomer");

  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      searchCustomer: search || "",
    },
  });

  const handleClick = () => {
    setIsOpen(true);
  };

  const onSubmit = async (values: z.infer<typeof SearchSchema>) => {
    if (!values.searchCustomer) {
      console.log(values.searchCustomer);
      setIsOpen(false);
      return;
    }
    try {
      if (values) {
        params.append("search", values.searchCustomer);
        router.push(`/orders?${params.toString()}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <>
      {!isOpen ? (
        <Button
          onClick={handleClick}
          className="text-white bg-[#0F0F10] border border-[#333337] hover:bg-white hover:text-black">
          <FaSearch />
        </Button>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
            <FormField
              control={form.control}
              name="searchCustomer"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Search Customer"
                      className="h-8"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="text-white bg-[#0F0F10] border border-[#333337] hover:bg-white hover:text-black">
              <FaSearch />
            </Button>
          </form>
        </Form>
      )}
    </>
  );
};

export default SearchButton;
