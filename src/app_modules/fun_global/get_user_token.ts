"use server";

import { cookies } from "next/headers";
import yaml from "yaml";
import fs from "fs";
import { unsealData } from "iron-session";
import { redirect } from "next/navigation";
import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";
import _ from "lodash";
const config = yaml.parse(fs.readFileSync("config.yaml").toString());

export async function user_funGetOneUserId() {
  const kukis = cookies();
  const c = kukis.get("ssn");
  if (!c || !c?.value || _.isEmpty(c?.value) || _.isUndefined(c?.value))
    return redirect(RouterAuth.login);

  const token = JSON.parse(
    await unsealData(c?.value as string, {
      password: config.server.password,
    })
  );

  return token.id;
}
