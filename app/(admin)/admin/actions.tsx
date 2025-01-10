"use server";
import { prisma } from "@/prisma/prisma";
import { revalidateTag, unstable_cache } from "next/cache";
import { Users, init } from "@kinde/management-api-js";
import { updateOrderStatus } from "@/lib/actions/orders";

export const getRecentOrders = unstable_cache(
  async () =>
    await prisma.parcel.findMany({
      where: {
        status: {
          not: "CANCELLED",
        },
      },
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    }),
  ["orders"],
  { revalidate: 600, tags: ["orders"] }
);
export const getOrders = unstable_cache(
  async () =>
    await prisma.parcel.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),
  ["orders"],
  { revalidate: 600, tags: ["orders"] }
);

export const getInvoices = unstable_cache(
  async () =>
    await prisma.invoice.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),
  ["invoices"],
  { revalidate: 600, tags: ["invoices"] }
);

async function getAllUsers() {
  init();
  const { users } = await Users.getUsers({
    pageSize: 500,
  });
  return users;
}
export const getUsers = unstable_cache(
  async () => {
    const users = await getAllUsers();
    return users;
  },
  ["statistics"],
  { revalidate: 600, tags: ["statistics"] }
);
export const getDashboardStatistics = unstable_cache(
  async () => {
    const totalUsers = await getAllUsers();
    const totalOrders = await prisma.parcel.count({
      where: {
        status: { not: "CANCELLED" },
      },
    });
    const totalRevenue = await prisma.invoice.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: "PAID",
      },
    });
    return {
      totalOrders: totalOrders || 0,
      totalRevenue: totalRevenue._sum.amount || 0,
      totalUsers: totalUsers?.length || 0,
    };
  },
  ["statistics"],
  { revalidate: 600, tags: ["statistics"] }
);

interface ParcelData {
  userId: string;
  parcelId: string;
  amount: number;
  item: string;
  email: string;
  phone: string;
  fullName: string;
  shipping_address: string;
}
export async function GenerateInvoice(data: ParcelData) {
  try {
    await prisma.invoice.create({
      data: data,
    });
    return { success: true, message: "Invoice created successfully" };
  } catch (error: any) {
    console.log(error);
    if (error.code === "P2002" && error.meta?.target?.includes("parcelId")) {
      return {
        success: false,
        error: "Invoice already exists for this delivery",
      };
    }
    return {
      success: false,
      error: error.message || "Something unexpected happened",
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function MarkInProgress(parcel: any) {
  const { pickupAddress, deliveryAddress } = parcel;
  const invoiceData = {
    userId: parcel.userId,
    parcelId: parcel.id,
    amount: parcel.price,
    item: parcel.description,
    email: pickupAddress.email,
    phone: pickupAddress.phone,
    fullName: pickupAddress.fullName,
    shipping_address: `${deliveryAddress.address}, ${deliveryAddress.district}, ${deliveryAddress.region}`,
  } satisfies ParcelData;
  try {
    const res = await updateOrderStatus(parcel.id, "IN_TRANSIT");
    if (!res.success) {
      return { success: false, error: res.error || "Something went wrong" };
    }

    const response = await GenerateInvoice(invoiceData);
    if (!response.success) {
      return {
        success: false,
        error: response.error || "Something went wrong",
      };
    }
    await revalidateTag("orders");
    await revalidateTag("order");
    await revalidateTag("statistics");
    await revalidateTag("invoices");
    return {
      success: true,
      message:
        "Order status has been updated and an invoice generated successfully.",
    };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message || "Something went wrong" };
  } finally {
    await prisma.$disconnect();
  }
}

export const SyncDatabase = async () => {
  await revalidateTag("orders");
  await revalidateTag("statistics");
  await revalidateTag("invoices");
};
