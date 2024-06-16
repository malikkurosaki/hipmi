import { LayoutEditDokumenInvestasi } from "@/app_modules/investasi";
import React from "react";

export default async function Layout({children, params}: {children: React.ReactNode, params: {id: string}}) {
    return<>
    <LayoutEditDokumenInvestasi idInves={params.id}>{children}</LayoutEditDokumenInvestasi>
    </>
}