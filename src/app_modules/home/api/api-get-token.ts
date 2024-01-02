"use server";

import prisma from "@/app/lib/prisma";
import { getConfig } from "@/bin/config";
import { unsealData } from "iron-session";
import { cookies } from "next/headers";

import fs from "fs";
import yaml from "yaml";
const config = yaml.parse(fs.readFileSync("config.yaml").toString());

/**
 * @returns token(id and username)
 */
export async function getToken() {
  const c = cookies().get("ssn");

  const token = await unsealData(c?.value as string, {
    password: await config.server.password,
  });

  const data = JSON.parse(token as any)

  return data;
}
