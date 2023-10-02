import { SplashScreen } from "@/app_modules/auth";
import { useShallowEffect } from "@mantine/hooks";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {unsealData} from "iron-session"

export default async function PageSplash() {
  const c = cookies().get("ssn");
  const tkn = !c
    ? null
    : JSON.parse(
        await unsealData(c.value as string, {
          password: process.env.PWD as string,
        })
      );


  return (
    <>

      <SplashScreen data={tkn} />
    </>
  );
}
