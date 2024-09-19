import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { LayoutDonasi } from "@/app_modules/donasi";
import { Donasi_getNotifByUserId } from "@/app_modules/donasi/fun/get/get_notif_by_user_id";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userLoginId = await funGetUserIdByToken();

  const isRead = await Donasi_getNotifByUserId(userLoginId).then((res: any) =>
    res.map((val: any) => val.isRead)
  );

  return (
    <>
      <LayoutDonasi userId={userLoginId} isRead={isRead as any}>
        {children}
      </LayoutDonasi>
    </>
  );
}
