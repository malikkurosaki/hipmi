import prisma from "@/app/lib/prisma";
import { getProfile } from "@/app_modules/katalog/profile";
import { KatalogView } from "@/app_modules/katalog/main";
import { url } from "inspector";
import { unsealData } from "iron-session";
import _ from "lodash";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { funGetUserProfile } from "@/app_modules/fun/get_user_profile";
import yaml from "yaml";
import fs from "fs";
import { funGetListPortofolio } from "@/app_modules/katalog/portofolio/fun/get_list_portofolio";
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

  const listPorto = await funGetListPortofolio(user?.Profile?.id)

  return (
    <>
      <KatalogView user={user as any} listPorto={listPorto as any} />
    </>
  );
}
