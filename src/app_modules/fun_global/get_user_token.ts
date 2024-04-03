"use server";

import { cookies } from "next/headers";
import yaml from "yaml";
import fs from "fs";
import { unsealData } from "iron-session";
import { redirect } from "next/navigation";
import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";
const config = yaml.parse(fs.readFileSync("config.yaml").toString());

export async function User_getUserId() {
  const c = cookies().get("ssn");
  if (!c?.value || c.value === "") return redirect(RouterAuth.login);


  const token = JSON.parse(
    await unsealData(c?.value as string, {
      password: config.server.password,
    })
  );

  return token.id
}
