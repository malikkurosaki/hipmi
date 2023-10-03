import { SplashScreen } from "@/app_modules/auth";
import { useShallowEffect } from "@mantine/hooks";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { unsealData } from "iron-session";
import { getConfig } from "@/bin/config";
import yaml from "yaml";
import fs from "fs";

const config = yaml.parse(fs.readFileSync("config.yaml").toString());

export default async function PageSplash() {
  const c = cookies().get("ssn");
  const tkn = !c
    ? null
    : JSON.parse(
        await unsealData(c.value as string, {
          password: (await getConfig()).server.password,
        })
      );

  return (
    <>
      <SplashScreen data={tkn} />
    </>
  );
}
