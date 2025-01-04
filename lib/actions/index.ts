"use server";
import { prisma } from "@/prisma/prisma";
import { ShippingAddressData } from "@/types";
import { revalidateTag, unstable_cache } from "next/cache";
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

export async function submitAddress(data: ShippingAddressData) {
  try {
    //  save the address to your database
    await prisma.shippingAddress.upsert({
      where: { userId: data.userId },
      create: {
        ...data,
      },
      update: {
        ...data,
      },
    });
    revalidateTag("address");
    return {
      success: true,
      message: "Address saved successfully!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  } finally {
    await prisma.$disconnect();
  }
}
//function to get user shipping address information
export const getShippingAddress = unstable_cache(
  async (userId: string) => {
    try {
      const address = await prisma.shippingAddress.findUnique({
        where: { userId },
      });
      return address;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  ["address"],
  { revalidate: 600, tags: ["address"] }
);
// function to check whether a user can delete their account
export const canDeleteAccount = unstable_cache(
  async (userId: string) => {
    try {
      const hasUndeliveredParcels = await prisma.parcel.findFirst({
        where: {
          userId,
          status: {
            not: { in: ["DELIVERED", "CANCELLED"] },
          },
        },
      });
      // Check for invoices that are not paid
      const hasUnpaidInvoices = await prisma.invoice.findFirst({
        where: {
          userId,
          status: {
            not: "PAID",
          },
        },
      });

      if (hasUndeliveredParcels && hasUnpaidInvoices) {
        return {
          canDelete: false,
          message:
            "You cannot delete your account because you have undelivered parcels and unpaid invoices.",
        };
      } else if (hasUndeliveredParcels) {
        return {
          canDelete: false,
          message:
            "You cannot delete your account because you have undelivered parcels.",
        };
      } else if (hasUnpaidInvoices) {
        return {
          canDelete: false,
          message:
            "You cannot delete your account because you have unpaid invoices.",
        };
      }
      return {
        canDelete: true,
        message: "You can delete your account.",
      };
    } catch (error) {
      console.error("Error checking account deletion eligibility:", error);
      return {
        canDelete: false,
        message:
          "An error occurred while checking your account status. Please try again later.",
      };
    }
  },
  ["orders", "invoices"],
  { revalidate: 600, tags: ["orders", "invoices"] }
);
