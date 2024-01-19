import { LayoutDonasi } from "@/app_modules/donasi";
import { Donasi_getNotifByUserId } from "@/app_modules/donasi/fun/get/get_notif_by_user_id";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await User_getUserId();
  // const dataDonasi = await DOnasi_getList
  const isRead = await Donasi_getNotifByUserId(userId).then((res) =>
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
