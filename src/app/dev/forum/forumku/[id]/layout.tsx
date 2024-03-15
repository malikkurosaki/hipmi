import { LayoutForum_Forumku } from "@/app_modules/forum";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";
import { user_getOneById } from "@/app_modules/home/fun/get/get_one_user_by_id";
import React from "react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const authorId = params.id;
  const dataAuthor = await user_getOneById(authorId);

  return (
    <>
      <LayoutForum_Forumku username={dataAuthor?.username as any}>
        {children}
      </LayoutForum_Forumku>
    </>
  );
}
