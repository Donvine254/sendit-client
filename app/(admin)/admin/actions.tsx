"use server";
import { prisma } from "@/prisma/prisma";
import { unstable_cache } from "next/cache";

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

export const getDashboardStatistics = unstable_cache(
  async () => {
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
    };
  },
  ["statistics"],
  { revalidate: 600, tags: ["statistics"] }
);
