import { LayoutColab_DetailProyekSaya } from "@/app_modules/colab";
import React from "react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  let colabId = params.id;


  return (
    <>
      <LayoutColab_DetailProyekSaya colabId={colabId}>
        {children}
      </LayoutColab_DetailProyekSaya>
    </>
  );
}
