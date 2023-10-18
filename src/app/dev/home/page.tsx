import { HomeView } from "@/app_modules/home";
import { cookies } from "next/headers";
import { unsealData } from "iron-session";
import _ from "lodash";
import { redirect } from "next/navigation";

import yaml from "yaml";
import fs from "fs";
import { funGetUserProfile } from "@/app_modules/fun/get_user_profile";
const config = yaml.parse(fs.readFileSync("config.yaml").toString());

export default async function Page() {
  const c = cookies().get("ssn");

  if (!c?.value) return redirect("/dev/auth/login");
  const usr = JSON.parse(
    await unsealData(c?.value as string, {
      password: config.server.password,
    })
  );

  const dataProfile = await funGetUserProfile(usr.id)


  return (
    <>
    {/* {JSON.stringify(usr)} */}
      <HomeView user={dataProfile as any} />
    </>
  );
}
