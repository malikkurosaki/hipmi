import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { funGlobal_getUserById } from "@/app_modules/_global/fun/get/fun_get_user_by_id";
import { Admin_NewLayout } from "@/app_modules/admin";
import adminNotifikasi_countNotifikasi from "@/app_modules/admin/notifikasi/fun/count/count_is_read";
import adminNotifikasi_getByUserId from "@/app_modules/admin/notifikasi/fun/get/get_notifikasi_by_user_id";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userLoginId = await funGetUserIdByToken();

  const dataUser = await funGlobal_getUserById({ userId: userLoginId });
  const listNotif = await adminNotifikasi_getByUserId();
  const countNotifikasi = await adminNotifikasi_countNotifikasi();

  return (
    <>
      {/* <AdminLayout
        listNotif={listNotif as any}
        dataUser={dataUser as any}
        countNotifikasi={countNotifikasi}
      >
        {children}
      </AdminLayout> */}
      <Admin_NewLayout user={dataUser as any}>{children}</Admin_NewLayout>
    </>
  );
}
