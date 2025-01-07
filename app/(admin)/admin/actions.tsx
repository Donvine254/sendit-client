"use server";
import { prisma } from "@/prisma/prisma";
import { unstable_cache } from "next/cache";
import { Users, init } from "@kinde/management-api-js";
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

async function getAllUsers() {
  init();
  const { users } = await Users.getUsers({
    pageSize: 500,
  });
  return users;
}

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

interface Address {
  email?: string;
  phone: string;
  fullName: string;
  region: string;
  district: string;
  address: string;
}
interface ParcelData {
  userId: string;
  id: string;
  price: number;
  description: string;
  pickupAddress: Address;
  deliveryAddress: Address;
}
export async function GenerateInvoice(parcel: ParcelData) {
  const { pickupAddress, deliveryAddress } = parcel;
  try {
    const invoiceData = {
      userId: parcel.userId,
      parcelId: parcel.id,
      amount: parcel.price,
      item: parcel.description,
      email: pickupAddress.email,
      phone: pickupAddress.phone,
      fullName: pickupAddress.fullName,
      shipping_address: `${deliveryAddress.address}, ${deliveryAddress.district}, ${deliveryAddress.region}`,
    };
    await prisma.invoice.create({
      data: invoiceData,
    });
  } catch (error: any) {
    console.log(error);
    if (error.code === "P2002" && error.meta?.target?.includes("parcelId")) {
      return {
        success: false,
        error: "Invoice already exists for this delivery",
      };
    }
  }
}
