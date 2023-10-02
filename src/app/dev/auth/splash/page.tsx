import { SplashScreen } from "@/app_modules/auth";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PageSplash() {
  return (
    <>
      <SplashScreen />
    </>
  );
}
