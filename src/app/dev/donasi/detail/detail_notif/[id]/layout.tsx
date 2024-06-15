import prisma from "@/app/lib/prisma";
import { LayoutDonasi_DetailNotif } from "@/app_modules/donasi";
import { Donasi_getOneKabar } from "@/app_modules/donasi/fun/get/get_one_kabar";
import React from "react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  let kabarId = params.id;
  const dataKabar = await Donasi_getOneKabar(kabarId);
  const donasiId =  dataKabar?.donasiId

  return (
    <>
      <LayoutDonasi_DetailNotif donasiId={donasiId as any}>{children}</LayoutDonasi_DetailNotif>
    </>
  );
}
