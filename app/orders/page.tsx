// app/orders/page.tsx
"use client";

import { Suspense } from "react";
import OrdersPageContent from "./orders-page-content";

export default function OrdersPage() {
  return (
    <Suspense fallback={<div>Loading orders...</div>}>
      <OrdersPageContent />
    </Suspense>
  );
}
