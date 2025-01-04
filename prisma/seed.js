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
    // Create the invoice in the database
    await prisma.invoice.create({
      data: invoiceData,
    });

    console.log(`Invoice created for parcel ${parcel.id}`);
  }
}

createInvoicesFromParcels()
  .then(() => {
    console.log("Invoices creation process complete.");
  })
  .catch((error) => {
    console.error("Error creating invoices:", error);
  });
