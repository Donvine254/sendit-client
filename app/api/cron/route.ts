import type { NextRequest } from "next/server";
import { prisma } from "@/prisma/prisma";
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  const data = await prisma.parcel.findMany();
  return Response.json(data);
}
