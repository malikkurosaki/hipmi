"use server";

import prisma from "@/app/lib/prisma";
import { cookies } from "next/headers";

export async function getAllUser() {
  const data = await prisma.user.findMany()
  return data;
}
