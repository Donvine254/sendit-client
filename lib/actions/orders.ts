"use server";
import { prisma } from "@/prisma/prisma";
import { ParcelOrderData } from "@/types";
import { revalidateTag } from "next/cache";
export async function createOrder(parcelData: ParcelOrderData) {
  try {
    await prisma.parcel.create({
      data: parcelData,
    });
    await revalidateTag("statistics");
    await revalidateTag("orders");
    return { success: true, message: "Order created successfully" };
  } catch (error: any) {
    console.log(error);
    return { success: true, error: "Something went wrong" };
  } finally {
    await prisma.$disconnect();
  }
}

type OrderStatus = "PENDING" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED";
export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  try {
    await prisma.parcel.update({
      where: { id: orderId },
      data: {
        status: status,
      },
    });
    await revalidateTag("orders");
    await revalidateTag("order");
    await revalidateTag("statistics");
    return { success: true, message: "Order Status updated successfully" };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message || "Something went wrong" };
  } finally {
    await prisma.$disconnect();
  }
}
