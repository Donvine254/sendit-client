"use server";
import { prisma } from "@/prisma/prisma";
import { ParcelOrderData } from "@/types";
import { unstable_cache } from "next/cache";
const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/api/admin"
    : "https://senditkenya.vercel.app/api/admin";
export async function createOrder(parcelData: ParcelOrderData) {
  try {
    const order = await prisma.parcel.create({
      data: parcelData,
    });
    console.log(order);
    return { success: true, message: "Order created successfully" };
  } catch (error: any) {
    console.log(error);
    return { success: true, error: "Something went wrong" };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserData(userId: string) {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getRecentOrders(userId: string) {
  try {
    const orders = await prisma.parcel.findMany({
      where: {
        userId,
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    return orders;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export const getUserOrders = unstable_cache(
  async (userId: string) => {
    try {
      const orders = await prisma.parcel.findMany({
        where: {
          userId,
        },
        orderBy: { createdAt: "desc" },
      });
      return orders;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      await prisma.$disconnect();
    }
  },
  ["posts"],
  { revalidate: 3600, tags: ["orders"] }
);
export const getOrderData = unstable_cache(
  async (id: string) => {
    try {
      const order = await prisma.parcel.findUnique({
        where: {
          id,
        },
      });
      return order;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      await prisma.$disconnect();
    }
  },
  ["posts"],
  { revalidate: 3600, tags: ["order"] }
);

export async function getUserOrderStatistics(userId: string) {
  try {
    const orders = await prisma.parcel.findMany({
      where: { userId },
    });
    return {
      total_orders: orders.length || 0,
      pending_orders:
        orders.filter((order) => order.status === "PENDING").length || 0,
      cancelled_orders:
        orders.filter((order) => order.status === "CANCELLED").length || 0,
    };
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
