//remove auth header
import { prisma } from "@/prisma/prisma";
export async function GET() {
  const data = await prisma.parcel.findMany();
  console.log("chron job run successfully", data.length, "parcels found");
  return Response.json(data);
}
