"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { gs_midtrans_snap } from "../g_state";

export default function LayoutProsesTransaksiInvestasi({
  children,
  investasiId,
}: {
  children: React.ReactNode;
  investasiId: string;
}) {
  const [snapShow, setSnapShow] = useAtom(gs_midtrans_snap);
  const router = useRouter();
  // console.log(snapShow)
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Proses Transaksi" />}
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
