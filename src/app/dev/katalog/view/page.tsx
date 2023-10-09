import prisma from "@/app/lib/prisma";
import { loadListPortofolio } from "@/app_modules/katalog/portofolio/fun/fun_get_all_portofolio";
import { getProfile } from "@/app_modules/katalog/profile";
import { KatalogView } from "@/app_modules/katalog/view";
import { url } from "inspector";
import { unsealData } from "iron-session";
import _, { get } from "lodash";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { funGetUserProfile } from "@/app_modules/fun/get_user_profile";
import yaml from "yaml";
import fs from "fs";
const config = yaml.parse(fs.readFileSync("config.yaml").toString());

export default async function Page() {
  const data = await getProfile();
  
  const u = cookies().get("ssn");
  const usr = JSON.parse(
    await unsealData(u?.value as string, {
      password: config.server.password,
    })
  );

  const user = await funGetUserProfile(usr.id);

  return (
    <>
      {/* {JSON.stringify(data)} */}
      <KatalogView user={user as any} />
    </>
  );
}
