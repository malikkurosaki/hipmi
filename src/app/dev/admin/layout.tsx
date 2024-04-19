import { AdminLayout } from "@/app_modules/admin/main_dashboard";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
import { user_getOneById } from "@/app_modules/home/fun/get/get_one_user_by_id";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await user_getOneUserId()
  const dataUser = await user_getOneById(userId)
  const userRole = dataUser?.masterUserRoleId

  return (
    <>
      <AdminLayout userRole={userRole as any}>{children}</AdminLayout>
    </>
  );
}
