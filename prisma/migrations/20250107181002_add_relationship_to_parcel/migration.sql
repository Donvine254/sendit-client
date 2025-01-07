-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_parcelId_fkey" FOREIGN KEY ("parcelId") REFERENCES "Parcel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
