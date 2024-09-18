"use client";

import { Button, Center } from "@mantine/core";
import { UIGlobal_LayoutTamplate } from "../_global/ui";
import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";
import { useRouter } from "next/navigation";
import { useShallowEffect } from "@mantine/hooks";

export function CheckCookies_UiView() {
  const router = useRouter();

  return (
    <>
      <UIGlobal_LayoutTamplate>
        <Center h={"80vh"}>
          <Button radius={"xl"} onClick={() => router.push(RouterAuth.login)}>
            Kembali ke Halaman Login
          </Button>
        </Center>
      </UIGlobal_LayoutTamplate>
    </>
  );
}
