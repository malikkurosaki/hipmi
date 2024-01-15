import { LayoutDonasi } from "@/app_modules/donasi";
import { Donasi_getNotifByUserId } from "@/app_modules/donasi/fun/get/get_notif_by_user_id";
import { getToken_UserId } from "@/app_modules/fun/get_user_token";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await getToken_UserId();
  // const dataDonasi = await DOnasi_getList
  const isRead = await Donasi_getNotifByUserId(userId).then((res) => res.map((val) => val.isRead))
  // console.log(isRead)

  return (
    <>
      <LayoutDonasi userId={userId} isRead={isRead as any}>
        {children}
      </LayoutDonasi>
    </>
  );
}
