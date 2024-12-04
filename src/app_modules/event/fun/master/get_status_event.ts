"use server";

import { prisma } from "@/app/lib";

export async function event_getMasterStatus() {
  const data = await prisma.eventMaster_Status.findMany({});

  return data;
}
