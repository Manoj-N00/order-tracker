"use client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { z } from "zod";

import { Input } from "@/components/aceternity-ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { orderSchema } from "@/lib/validationSchemas";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerName: "",
      status: "Processing",
    },
  });

  const onSubmit = async (values: z.infer<typeof orderSchema>) => {
    setIsLoading(true);
    setError("");
    try {
      const result = await axios.post("/api/orders", values);
      console.log(result);
      router.push("/orders");
    } catch (err) {
      console.error(err);
      setError("An error occurred while creating the order.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 bg-black">
      <h3 className="font-bold text-xl text-neutral-200">
        Welcome back to Cybership OrderStream!
      </h3>
      <p className="text-sm max-w-sm mt-2 mb-5 text-neutral-300">
        Place your order now!
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <LabelInputContainer className="text-white">
                  <FormLabel htmlFor="customerName">Customer Name</FormLabel>
                  <FormControl className="bg-zinc-800 text-white">
                    <Input
                      id="customerName"
                      placeholder="John Smith"
                      {...field}
                    />
                  </FormControl>
                </LabelInputContainer>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="text-black bg-white hover:bg-[#0F0F10] border rounded-lg border-[#333337] hover:text-white"
            disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <BiLoaderCircle className="ml-4 h-4 w-4 animate-spin" />
                <span>Creating Order...</span>
              </div>
            ) : (
              <p>Create Order &rarr;</p>
            )}
          </Button>
        </form>
      </Form>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
