import { LayoutDonasi } from "@/app_modules/donasi";
import { Donasi_getNotifByUserId } from "@/app_modules/donasi/fun/get/get_notif_by_user_id";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await user_getOneUserId();
  // console.log(userId)
  const isRead = await Donasi_getNotifByUserId(userId).then((res: any) =>
  res.map((val: any) => val.isRead)
  );
  // console.log(isRead)

  return (
    <>
      <LayoutDonasi userId={userId} isRead={isRead as any}>
        {children}
      </LayoutDonasi>
    </>
  );
}
