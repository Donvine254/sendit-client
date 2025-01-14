"use server";
import { sendOrderConfirmationEmail } from "@/emails";
import { prisma } from "@/prisma/prisma";
import { ParcelOrderData } from "@/types";
import { Parcel } from "@prisma/client";
import { revalidateTag } from "next/cache";

export async function createOrder(parcelData: ParcelOrderData) {
  try {
    const order = await prisma.parcel.create({
      data: parcelData,
    });
    await revalidateTag("statistics");
    await revalidateTag("orders");

    // Return the response immediately
    const response = {
      success: true,
      message: "Order created successfully",
    };

    // Continue processing the email in a non-blocking way
    setImmediate(async () => {
      if (order satisfies Parcel) {
        const { address, district, region, email, fullName } =
          order.pickupAddress as {
            email: string;
            fullName: string;
            address: string;
            district: string;
            region: string;
          };
        const deliveryAddress = order.deliveryAddress as {
          email?: string;
          fullName: string;
          address: string;
          district: string;
          region: string;
        };
        await sendOrderConfirmationEmail({
          orderId: order.id,
          name: fullName,
          email: email,
          recipient: deliveryAddress.fullName,
          parcelDescription: order.description!,
          parcelWeight: order.weight,
          totalPrice: order.price!,
          pickupAddress: `${address}, ${district}, ${region}`,
          deliveryAddress: `${deliveryAddress.address}, ${deliveryAddress.district}, ${deliveryAddress.region}`,
        });
      }
    });

    return response;
  } catch (error: any) {
    console.log(error);
    return { success: false, error: "Something went wrong" };
  } finally {
    await prisma.$disconnect();
  }
}
// export async function createOrder(parcelData: ParcelOrderData) {
//   let order: Parcel | null = null;
//   try {
//     order = await prisma.parcel.create({
//       data: parcelData,
//     });
//     await revalidateTag("statistics");
//     await revalidateTag("orders");
//     return {
//       success: true,
//       message: "Order created successfully",
//     };
//   } catch (error: any) {
//     console.log(error);
//     return { success: true, error: "Something went wrong" };
//   } finally {
//     if (order && (order satisfies Parcel)) {
//       const { address, district, region, email, fullName } =
//         order.pickupAddress as {
//           email: string;
//           fullName: string;
//           address: string;
//           district: string;
//           region: string;
//         };
//       const deliveryAddress = order.deliveryAddress as {
//         email?: string;
//         fullName: string;
//         address: string;
//         district: string;
//         region: string;
//       };
//       await sendOrderConfirmationEmail({
//         orderId: order.id,
//         name: fullName,
//         email: email,
//         recipient: deliveryAddress.fullName,
//         parcelDescription: order.description!,
//         parcelWeight: order.weight,
//         totalPrice: order.price!,
//         pickupAddress: `${address}, ${district}, ${region}`,
//         deliveryAddress: `${deliveryAddress.address}, ${deliveryAddress.district}, ${deliveryAddress.region}`,
//       });
//     }
//     await prisma.$disconnect();
//   }
// }

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

type InvoiceStatus = "DRAFT" | "PAID" | "OVERDUE" | "DISPUTED";
export async function updateInvoiceStatus(
  invoiceId: string,
  status: InvoiceStatus
) {
  try {
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        status: status,
      },
    });
    await revalidateTag("invoices");
    return { success: true, message: "Invoice Status updated successfully" };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message || "Something went wrong" };
  } finally {
    await prisma.$disconnect();
  }
}
