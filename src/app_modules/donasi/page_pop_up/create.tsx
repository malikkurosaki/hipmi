"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { Stack, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconCircleCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function PagePopUpCreateDonasi() {
  const router = useRouter();
  useShallowEffect(() => {
    setTimeout(
      () => router.push(RouterDonasi.main_galang_dana, { scroll: false }),
      2000
    );
  }, []);
  return (
    <>
      <UIGlobal_LayoutTamplate>
        <Stack h={"80vh"} align="center" justify="center">
          <IconCircleCheck
            size={100}
            style={{
              color: MainColor.yellow,
            }}
          />
          <Title order={3} c={"white"}>
            Berhasil Membuat Pengalangan Dana
          </Title>
        </Stack>
      </UIGlobal_LayoutTamplate>
    </>
  );
}
