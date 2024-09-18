"use server";

import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";
import { ServerEnv } from "@/app/lib/server_env";
import { unsealData } from "iron-session";
import _ from "lodash";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function user_funGetOneUserId(): Promise<string | null> {
  try {
    const kukis = cookies();
    const c = kukis.get("ssn");
    if (!c || !c?.value || _.isEmpty(c?.value) || _.isUndefined(c?.value))
      return redirect(RouterAuth.login);

    const token = JSON.parse(
      await unsealData(c?.value as string, {
        password: ServerEnv.value?.WIBU_PWD as string,
      })
    );

    return token.id;
  } catch (error) {
    return null;
  }
}
