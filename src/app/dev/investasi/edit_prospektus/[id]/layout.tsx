import { LayoutEditProspektusInvestasi } from "@/app_modules/investasi";
import getOneInvestasiById from "@/app_modules/investasi/fun/get_one_investasi_by_id";
import React from "react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const dataInvestasi = await getOneInvestasiById(params.id);

  return (
    <>
      <LayoutEditProspektusInvestasi dataInvestasi={dataInvestasi as any}>
        {children}
      </LayoutEditProspektusInvestasi>
    </>
  );
}
