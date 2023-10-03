import { getConfig } from "@/bin/config";
import { unsealData } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import yaml from "yaml";
import fs from "fs";
import path from 'path'
const config = yaml.parse(
  fs.readFileSync("config.yaml").toString()
);

export async function GET() {
  const c = cookies().get("ssn");
  const data = JSON.parse(
    await unsealData(c?.value as string, { password: config.server.password })
  );
  return NextResponse.json({});
}
