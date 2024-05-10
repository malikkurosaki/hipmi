import { LayoutColab_Main } from "@/app_modules/colab";
import colab_CekNotifikasi from "@/app_modules/colab/fun/get/cek_notifikasi";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cekNotif = await colab_CekNotifikasi();

  return (
    <>
      <LayoutColab_Main cekNotif={cekNotif as any}>{children}</LayoutColab_Main>
    </>
  );
}
