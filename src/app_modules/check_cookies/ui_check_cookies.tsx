"use client";

import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";
import { Button, Center } from "@mantine/core";
import { useRouter } from "next/navigation";
import { UIGlobal_LayoutDefault } from "../_global/ui";

export function CheckCookies_UiView() {
  const router = useRouter();

  return (
    <>
      <UIGlobal_LayoutDefault>
        <Center h={"80vh"}>
          <Button radius={"xl"} onClick={() => router.push(RouterAuth.login)}>
            Kembali ke Halaman Login
          </Button>
        </Center>
      </UIGlobal_LayoutDefault>
    </>
  );
}
