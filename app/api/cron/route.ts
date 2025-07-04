import type { NextRequest } from "next/server";
import { prisma } from "@/prisma/prisma";
export async function GET(request: NextRequest) {
  const authHeader = request.nextUrl.searchParams.get("Bearer");
  if (authHeader !== process.env.CRON_SECRET) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  const data = await prisma.parcel.findMany();
  console.log("chron job run successfully", data.length, "parcels found");
  return Response.json(data);
}
