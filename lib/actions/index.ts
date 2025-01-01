"use server";
import { prisma } from "@/prisma/prisma";
import { ActionResponse } from "@/types";
import { unstable_cache } from "next/cache";
const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/api/admin"
    : "https://senditkenya.vercel.app/api/admin";

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

export const getRecentOrders = unstable_cache(
  async (userId: string) => {
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
  },
  ["orders"],
  { revalidate: 600, tags: ["orders"] }
);

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
  ["orders"],
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
  ["order"],
  { revalidate: 3600, tags: ["order"] }
);

export const getUserOrderStatistics = unstable_cache(
  async (userId: string) => {
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
      return { total_orders: 0, pending_orders: 0, cancelled_orders: 0 };
    } finally {
      await prisma.$disconnect();
    }
  },
  ["statistics"],
  { revalidate: 600, tags: ["statistics"] }
);

export const getUserInvoices = unstable_cache(
  async (userId: string) => {
    try {
      const invoices = await prisma.invoice.findMany({
        where: { userId },
      });
      return invoices;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  ["invoices"],
  { revalidate: 600, tags: ["invoices"] }
);

export async function submitAddress(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  const data = {
    userId: formData.get("userId") as string,
    email: formData.get("email") as string | null,
    fullName: formData.get("fullName") as string,
    phone: Number(`254${formData.get("phone")}`),
    region: formData.get("region") as string,
    district: formData.get("district") as string,
    address: formData.get("address") as string,
  };
  if (!data.userId) {
    return {
      success: false,
      message: "User ID is required",
    };
  }
  try {
    //  save the address to your database
    await prisma.shippingAddress.create({
      data,
    });
    return {
      success: true,
      message: "Address saved successfully!",
    };
  } catch (error: any) {
    console.error("Error: ", error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
