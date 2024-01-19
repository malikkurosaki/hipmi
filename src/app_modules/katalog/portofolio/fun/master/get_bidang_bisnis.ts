"use server";

import { myConsole } from "@/app/fun/my_console";
import prisma from "@/app/lib/prisma";

export async function Portofolio_getMasterBidangBisnis() {
  const data = await prisma.masterBidangBisnis.findMany();
  return data;
}
