import prisma from "@/app/lib/prisma";
import { KatalogView } from "@/app_modules/katalog/main";
import { url } from "inspector";
import { unsealData } from "iron-session";
import _ from "lodash";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { funGetUserProfile } from "@/app_modules/fun_global/get_user_profile";
import yaml from "yaml";
import fs from "fs";
import { funGetListPortofolio } from "@/app_modules/katalog/portofolio/fun/get/get_list_portofolio";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";
import { Profile_getOneById } from "@/app_modules/katalog/profile/fun/get/get_one_profile";
import { Profile_getOneProfileAndUserById } from "@/app_modules/katalog/profile/fun/get/get_one_user_profile";
const config = yaml.parse(fs.readFileSync("config.yaml").toString());

export default async function Page({ params }: { params: { id: string } }) {
  let profileId = params.id;
  const userLoginId = await User_getUserId()
  const listPorto = await funGetListPortofolio(profileId);
  const dataProfile = await Profile_getOneProfileAndUserById(profileId)
  // console.log(dataProfile)

  return (
    <>
      <KatalogView profile={dataProfile as any} listPorto={listPorto as any} userLoginId={userLoginId} />
    </>
  );
}
