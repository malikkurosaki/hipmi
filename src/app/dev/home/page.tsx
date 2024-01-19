import { HomeView } from "@/app_modules/home";
import { cookies } from "next/headers";
import { unsealData } from "iron-session";
import _ from "lodash";
import { redirect } from "next/navigation";

import yaml from "yaml";
import fs from "fs";
import { funGetUserProfile } from "@/app_modules/fun_global/get_user_profile";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";
import { User_getOneById } from "@/app_modules/home/fun/get/get_one_user_by_id";
const config = yaml.parse(fs.readFileSync("config.yaml").toString());

export default async function Page() {
  return (
    <>
      <HomeView />
    </>
  );
}
