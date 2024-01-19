"use server";

import { cookies } from "next/headers";
import yaml from "yaml";
import fs from "fs";
import { unsealData } from "iron-session";
import { redirect } from "next/navigation";
const config = yaml.parse(fs.readFileSync("config.yaml").toString());

export async function User_getUserId() {
  const c = cookies().get("ssn");
  if (!c?.value) return redirect("/dev/auth/login");

  const token = JSON.parse(
    await unsealData(c?.value as string, {
      password: config.server.password,
    })
  );

  return token.id
}
