const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createInvoicesFromParcels() {
  // Fetch parcels where the status is not 'CANCELLED' or 'PENDING'
  const parcels = await prisma.parcel.findMany({
    where: {
      NOT: {
        status: {
          in: ["CANCELLED", "PENDING"],
        },
      },
    },
  });

  // Loop through the parcels and create invoices
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
      // Check if the invoice already exists
      const existingInvoice = await prisma.invoice.findUnique({
        where: {
          parcelId: parcel.id, // Assuming parcelId is unique for each invoice
        },
      });

      if (!existingInvoice) {
        // Create the invoice only if it doesn't exist
        await prisma.invoice.create({
          data: invoiceData,
        });

        console.log(`Invoice created for parcel ${parcel.id}`);
      } else {
        console.log(`Invoice already exists for parcel ${parcel.id}`);
      }
    } catch (error) {
      // Log the error and continue with the next parcel
      console.error(`Error creating invoice for parcel ${parcel.id}:`, error);
    }
  }
}

createInvoicesFromParcels()
  .then(() => {
    console.log("Invoices creation process complete.");
  })
  .catch((error) => {
    console.error("Error creating invoices:", error);
  });
