"use client";

import UIGlobal_SplashScreen from "@/app_modules/_global/ui/ui_splash";
import { useShallowEffect } from "@mantine/hooks";
import { IconBriefcase } from "@tabler/icons-react";
import { useAtom } from "jotai";

import { gs_job_hot_menu, gs_job_status } from "../global_state";
import { useRouter } from "next/navigation";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";

export function Job_UiSplash() {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_job_hot_menu);
  const [status, setStatus] = useAtom(gs_job_status);

  useShallowEffect(() => {
    setTimeout(() => {
      setHotMenu(1);
      setStatus("Publish");
      router.replace(RouterJob.beranda, { scroll: false });
    }, 1000);
  }, []);
  return (
    <>
      <UIGlobal_SplashScreen icon={<IconBriefcase size={300} />} />
    </>
  );
}
