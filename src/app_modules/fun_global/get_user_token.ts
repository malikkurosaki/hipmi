"use server";

import { cookies } from "next/headers";
import { unsealData } from "iron-session";
import { redirect } from "next/navigation";
import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";
import _ from "lodash";
import { PwdCookies } from "@/app/lib";


export async function user_funGetOneUserId() {
  const kukis = cookies();
  const c = kukis.get("ssn");
  if (!c || !c?.value || _.isEmpty(c?.value) || _.isUndefined(c?.value))
    return redirect(RouterAuth.login);

  const token = JSON.parse(
    await unsealData(c?.value as string, {
      password: PwdCookies,
    })
  );

  return token.id;
}
