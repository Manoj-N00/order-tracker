import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.customer.createMany({
    data: [
      {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        address: "123 Elm Street",
        totalSpend: 500.0,
        lifetimeValue: 500.0,
        lastOrderDate: new Date("2024-08-01"),
        location: "New York",
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "234-567-8901",
        address: "456 Oak Avenue",
        totalSpend: 300.0,
        lifetimeValue: 300.0,
        lastOrderDate: new Date("2024-07-15"),
        location: "Los Angeles",
      },
      {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        phone: "345-678-9012",
        address: "789 Pine Road",
        totalSpend: 700.0,
        lifetimeValue: 700.0,
        lastOrderDate: new Date("2024-06-30"),
        location: "Chicago",
      },
      {
        name: "Bob Brown",
        email: "bob.brown@example.com",
        phone: "456-789-0123",
        address: "101 Maple Lane",
        totalSpend: 450.0,
        lifetimeValue: 450.0,
        lastOrderDate: new Date("2024-05-20"),
        location: "Houston",
      },
      {
        name: "Carol Davis",
        email: "carol.davis@example.com",
        phone: "567-890-1234",
        address: "202 Birch Boulevard",
        totalSpend: 350.0,
        lifetimeValue: 350.0,
        lastOrderDate: new Date("2024-04-25"),
        location: "Phoenix",
      },
      {
        name: "David Wilson",
        email: "david.wilson@example.com",
        phone: "678-901-2345",
        address: "303 Cedar Street",
        totalSpend: 600.0,
        lifetimeValue: 600.0,
        lastOrderDate: new Date("2024-03-10"),
        location: "Philadelphia",
      },
      {
        name: "Emma White",
        email: "emma.white@example.com",
        phone: "789-012-3456",
        address: "404 Fir Avenue",
        totalSpend: 200.0,
        lifetimeValue: 200.0,
        lastOrderDate: new Date("2024-02-05"),
        location: "San Antonio",
      },
      {
        name: "Frank Harris",
        email: "frank.harris@example.com",
        phone: "890-123-4567",
        address: "505 Spruce Road",
        totalSpend: 250.0,
        lifetimeValue: 250.0,
        lastOrderDate: new Date("2024-01-15"),
        location: "San Diego",
      },
      {
        name: "Grace Martinez",
        email: "grace.martinez@example.com",
        phone: "901-234-5678",
        address: "606 Palm Lane",
        totalSpend: 400.0,
        lifetimeValue: 400.0,
        lastOrderDate: new Date("2023-12-10"),
        location: "Dallas",
      },
      {
        name: "Henry Lewis",
        email: "henry.lewis@example.com",
        phone: "012-345-6789",
        address: "707 Willow Street",
        totalSpend: 550.0,
        lifetimeValue: 550.0,
        lastOrderDate: new Date("2023-11-25"),
        location: "San Jose",
      },
    ],
  });

  await prisma.category.createMany({
    data: [
      { name: "Electronics" },
      { name: "Books" },
      { name: "Clothing" },
      { name: "Home & Kitchen" },
      { name: "Sports & Outdoors" },
      { name: "Toys & Games" },
      { name: "Health & Personal Care" },
      { name: "Automotive" },
      { name: "Garden & Outdoor" },
      { name: "Beauty & Personal Care" },
    ],
  });

  await prisma.product.createMany({
    data: [
      {
        sku: "SKU001",
        name: "Product A",
        description: "Description for Product A",
        price: 25.0,
        stockLevel: 100,
        categoryId: 1,
        rating: 4.5,
        returnRate: 2.0,
      },
      {
        sku: "SKU002",
        name: "Product B",
        description: "Description for Product B",
        price: 15.0,
        stockLevel: 150,
        categoryId: 1,
        rating: 4.0,
        returnRate: 1.5,
      },
      {
        sku: "SKU003",
        name: "Product C",
        description: "Description for Product C",
        price: 35.0,
        stockLevel: 80,
        categoryId: 2,
        rating: 4.8,
        returnRate: 1.0,
      },
      {
        sku: "SKU004",
        name: "Product D",
        description: "Description for Product D",
        price: 50.0,
        stockLevel: 60,
        categoryId: 2,
        rating: 4.2,
        returnRate: 0.5,
      },
      {
        sku: "SKU005",
        name: "Product E",
        description: "Description for Product E",
        price: 45.0,
        stockLevel: 70,
        categoryId: 3,
        rating: 4.6,
        returnRate: 2.5,
      },
      {
        sku: "SKU006",
        name: "Product F",
        description: "Description for Product F",
        price: 55.0,
        stockLevel: 90,
        categoryId: 3,
        rating: 4.1,
        returnRate: 1.8,
      },
      {
        sku: "SKU007",
        name: "Product G",
        description: "Description for Product G",
        price: 75.0,
        stockLevel: 40,
        categoryId: 4,
        rating: 4.7,
        returnRate: 0.2,
      },
      {
        sku: "SKU008",
        name: "Product H",
        description: "Description for Product H",
        price: 65.0,
        stockLevel: 50,
        categoryId: 4,
        rating: 4.3,
        returnRate: 1.1,
      },
      {
        sku: "SKU009",
        name: "Product I",
        description: "Description for Product I",
        price: 85.0,
        stockLevel: 30,
        categoryId: 5,
        rating: 4.9,
        returnRate: 1.7,
      },
      {
        sku: "SKU010",
        name: "Product J",
        description: "Description for Product J",
        price: 95.0,
        stockLevel: 20,
        categoryId: 5,
        rating: 4.4,
        returnRate: 0.8,
      },
    ],
  });

  await prisma.orderStatus.createMany({
    data: [
      { status: "Pending" },
      { status: "Shipped" },
      { status: "Delivered" },
      { status: "Canceled" },
      { status: "Returned" },
      { status: "Processing" },
      { status: "On Hold" },
      { status: "Refunded" },
      { status: "Awaiting Payment" },
      { status: "Completed" },
    ],
  });

  await prisma.paymentStatus.createMany({
    data: [
      { status: "Paid" },
      { status: "Unpaid" },
      { status: "Pending" },
      { status: "Refunded" },
      { status: "Failed" },
      { status: "Authorized" },
      { status: "Voided" },
      { status: "Chargeback" },
      { status: "Pending Authorization" },
      { status: "Completed" },
    ],
  });

  await prisma.order.createMany({
    data: [
      {
        orderId: "ORD001",
        customerId: 1,
        statusId: 1,
        items: JSON.stringify([
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 1 },
        ]),
        totalAmount: 75.0,
        paymentStatusId: 1,
        shippedAt: new Date("2024-08-02"),
        deliveredAt: new Date("2024-08-05"),
      },
      {
        orderId: "ORD002",
        customerId: 2,
        statusId: 2,
        items: JSON.stringify([
          { productId: 3, quantity: 3 },
          { productId: 4, quantity: 2 },
        ]),
        totalAmount: 50.0,
        paymentStatusId: 2,
        shippedAt: new Date("2024-07-16"),
        deliveredAt: new Date("2024-07-20"),
      },
      {
        orderId: "ORD003",
        customerId: 3,
        statusId: 1,
        items: JSON.stringify([
          { productId: 5, quantity: 1 },
          { productId: 6, quantity: 2 },
        ]),
        totalAmount: 105.0,
        paymentStatusId: 1,
        shippedAt: new Date("2024-06-30"),
        deliveredAt: new Date("2024-07-03"),
      },
      {
        orderId: "ORD004",
        customerId: 4,
        statusId: 2,
        items: JSON.stringify([
          { productId: 7, quantity: 2 },
          { productId: 8, quantity: 1 },
        ]),
        totalAmount: 90.0,
        paymentStatusId: 2,
        shippedAt: new Date("2024-05-21"),
        deliveredAt: new Date("2024-05-25"),
      },
      {
        orderId: "ORD005",
        customerId: 5,
        statusId: 3,
        items: JSON.stringify([
          { productId: 9, quantity: 1 },
          { productId: 10, quantity: 1 },
        ]),
        totalAmount: 160.0,
        paymentStatusId: 1,
        shippedAt: new Date("2024-04-26"),
        deliveredAt: new Date("2024-04-30"),
      },
    ],
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
