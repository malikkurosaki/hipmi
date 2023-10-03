"use server";

import prisma from "@/app/lib/prisma";
import { getConfig } from "@/bin/config";
import { unsealData } from "iron-session";
import { cookies } from "next/headers";

export async function getToken() {
  const c = cookies().get("ssn");

  const token = await unsealData(c?.value as string, {
    password: (await getConfig()).server.password,
  });

  return token
}
