import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const exportData = (
  data: any[],
  format: "csv" | "json",
  type: "orders" | "invoices" | "customers"
) => {
  if (format === "json") {
    // Export as JSON
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], {
      type: "application/json;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${type}-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
  } else if (format === "csv") {
    // Define headers and row transformation logic for each type
    let headers = "";
    let rows: any = [];

    if (type === "orders") {
      headers = `Order ID,Description,Status,Price,Weight,Customer Name,Pickup Address,Pickup Phone,Recipient Name,Delivery Address,Delivery Phone,Created At`;
      rows = data.map((order: any) => {
        return `${order.id},"${order.description.replace(
          /"/g,
          '""'
        )}",${order.status.toLowerCase()},"KSH${order.price}",${
          order.weight
        },"${order.pickupAddress.fullName}","${order.pickupAddress.address}, ${
          order.pickupAddress.district
        }, ${
          order.pickupAddress.region
        }","254${order.pickupAddress.phone.toString()}","${
          order.deliveryAddress.fullName
        }","${order.deliveryAddress.address}, ${
          order.deliveryAddress.district
        }, ${
          order.deliveryAddress.region
        }","254${order.deliveryAddress.phone.toString()}",${new Date(
          order.createdAt
        ).toLocaleDateString()}`;
      });
    } else if (type === "invoices") {
      headers = `ID,Invoice Number,Full Name,Shipping Address,Item,Email,Phone,Amount,User ID,Parcel ID,Status,Date,Due Date`;
      rows = data.map((invoice: any) => {
        return `${invoice.id},${
          invoice.invoice_number
        },"${invoice.fullName.replace(
          /"/g,
          '""'
        )}","${invoice.shipping_address.replace(
          /"/g,
          '""'
        )}","${invoice.item.replace(/"/g, '""')}",${invoice.email || ""},"254${
          invoice.phone || ""
        }",${invoice.amount},${invoice.userId},${invoice.parcelId},${
          invoice.status
        },${new Date(invoice.createdAt).toLocaleDateString()},${new Date(
          invoice.updatedAt
        ).toLocaleDateString()}`;
      });
    } else if (type === "customers") {
      headers = `ID,Email,Full Name,Suspended,Created On,Total Sign-ins,Last Signed In`;
      rows = data.map((customer: any) => {
        return `${customer.id},${customer.email},${customer.full_name},${
          customer.is_suspended ? "Yes" : "No"
        },${new Date(customer.created_on).toLocaleDateString()},${
          customer.total_sign_ins
        },${new Date(customer.last_signed_in).toLocaleDateString()}`;
      });
    }

    // Generate CSV content
    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${type}-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  }
};
