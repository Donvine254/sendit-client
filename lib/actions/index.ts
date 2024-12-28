"use server";
import { prisma } from "@/prisma/prisma";
import { ParcelOrderData } from "@/types";
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
  }
}
