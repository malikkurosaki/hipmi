import { CheckCookies_UiView } from "@/app_modules/check_cookies";
import { LayoutDonasi } from "@/app_modules/donasi";
import { Donasi_getNotifByUserId } from "@/app_modules/donasi/fun/get/get_notif_by_user_id";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userLoginId = await user_funGetOneUserId();
  if (!userLoginId) return <CheckCookies_UiView />;

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
