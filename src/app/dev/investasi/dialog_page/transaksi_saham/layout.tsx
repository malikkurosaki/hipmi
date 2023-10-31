import LayoutCountDownTransaksiInvestasi from "@/app_modules/investasi/dialog_page/transaksi_saham/layout";
import React from "react";

export default async function Layout({children}: {children: React.ReactNode}) {
    return<>
    <LayoutCountDownTransaksiInvestasi>{children}</LayoutCountDownTransaksiInvestasi>
    </>
}