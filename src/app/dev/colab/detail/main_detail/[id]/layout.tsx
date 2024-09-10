import { LayoutColab_MainDetail } from "@/app_modules/colab";
import colab_getOneCollaborationById from "@/app_modules/colab/fun/get/get_one_by_id";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";
import React from "react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const colabId = params.id;
  const dataColab = await colab_getOneCollaborationById(colabId);
  const authorId = dataColab?.Author?.id;
  const userLoginId = await user_funGetOneUserId();

  return (
    <>
      <LayoutColab_MainDetail
        colabId={colabId}
        isAuthor={authorId === userLoginId ? true : false}
      >
        {children}
      </LayoutColab_MainDetail>
    </>
  );
}
