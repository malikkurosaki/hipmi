import { SplashScreen } from "@/app_modules/auth";
import { useShallowEffect } from "@mantine/hooks";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { unsealData } from "iron-session";
import { getConfig } from "@/bin/config";
import yaml from "yaml";
import fs from "fs";
import { user_funGetOneUserId } from "@/app_modules/fun_global";

const config = yaml.parse(fs.readFileSync("config.yaml").toString());

export default async function PageSplash() {
  const userLoginId = await user_funGetOneUserId();

  return (
    <>
      <SplashScreen userLoginId={userLoginId} />
    </>
  );
}
