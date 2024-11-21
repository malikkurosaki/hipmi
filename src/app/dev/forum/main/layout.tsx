import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { LayoutForum_Main } from "@/app_modules/forum";
import { user_getOneByUserId } from "@/app_modules/home/fun/get/get_one_user_by_id";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userLoginId = await funGetUserIdByToken();
  const dataAuthor = await user_getOneByUserId(userLoginId as string);

  return (
    <>
      <LayoutForum_Main dataAuthor={dataAuthor as any}>
        {children}
      </LayoutForum_Main>
    </>
  );
}
