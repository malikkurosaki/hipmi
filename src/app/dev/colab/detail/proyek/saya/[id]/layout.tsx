import { LayoutColab_DetailProyekSaya } from "@/app_modules/colab";
import colab_getOneCollaborationById from "@/app_modules/colab/fun/get/get_one_by_id";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
import React from "react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  let colabId = params.id;
  const dataColab = await colab_getOneCollaborationById(colabId)

  return (
    <>
      <LayoutColab_DetailProyekSaya dataColab={dataColab as any}>
        {children}
      </LayoutColab_DetailProyekSaya>
    </>
  );
}
