import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { AdminLayout } from "@/app_modules/admin/main_dashboard";
import adminNotifikasi_countNotifikasi from "@/app_modules/admin/notifikasi/fun/count/count_is_read";
import adminNotifikasi_getByUserId from "@/app_modules/admin/notifikasi/fun/get/get_notifikasi_by_user_id";
import { user_getOneByUserId } from "@/app_modules/home/fun/get/get_one_user_by_id";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userLoginId = await funGetUserIdByToken();

  const dataUser = await user_getOneByUserId(userLoginId);
  const listNotif = await adminNotifikasi_getByUserId();
  const countNotifikasi = await adminNotifikasi_countNotifikasi();

  return (
    <>
      <AdminLayout
        listNotif={listNotif as any}
        dataUser={dataUser as any}
        countNotifikasi={countNotifikasi}
      >
        {children}
      </AdminLayout>
    </>
  );
}
