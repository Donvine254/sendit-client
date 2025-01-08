const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createInvoicesFromParcels() {
  console.log("📦 Creating invoices from parcels...");

  // Fetch parcels where the status is not 'CANCELLED' or 'PENDING'
  const parcels = await prisma.parcel.findMany({
    where: {
      NOT: {
        status: {
          in: ["CANCELLED", "PENDING"],
        },
      },
      invoice: {
        is: null,
      },
    },
  });
  for (const parcel of parcels) {
    const invoiceData = {
      userId: parcel.userId,
      parcelId: parcel.id,
      amount: parcel.price,
      item: parcel.description,
      email: parcel.pickupAddress.email,
      phone: parcel.pickupAddress.phone,
      fullName: parcel.pickupAddress.fullName,
      shipping_address: `${parcel.deliveryAddress.address}, ${parcel.deliveryAddress.district}, ${parcel.deliveryAddress.region}`,
    };

    try {
      // Attempt to create the invoice
      await prisma.invoice.create({
        data: invoiceData,
      });
      console.log(`✅ Invoice created for parcel ${parcel.id}`);
    } catch (error) {
      if (error.code === "P2002" && error.meta?.target?.includes("parcelId")) {
        console.log(`⚠️ Skipping parcel ${parcel.id}: Invoice already exists.`);
        continue; // Move to the next parcel
      } else {
        console.error(
          `❌ Error creating invoice for parcel ${parcel.id}:`,
          error
        );
      }
    }
  }

  console.log("🏁 Finished processing parcels.");
}

createInvoicesFromParcels()
  .then(() => {
    console.log("Invoices creation process complete.");
  })
  .catch((error) => {
    console.error("Error creating invoices:", error);
  });

// async function cleanDb() {
//   console.log("🧹 Cleaning database...");
//   await prisma.invoice.deleteMany();
//   console.log("✅ Cleared data from the Invoice model");
// }

// cleanDb();
