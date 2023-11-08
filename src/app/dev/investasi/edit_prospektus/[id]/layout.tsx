import { LayoutEditProspektusInvestasi } from "@/app_modules/investasi";
import React from "react";

export default async function Layout({children, params}: {children: React.ReactNode, params: {id: string}}) {
    return<>
    <LayoutEditProspektusInvestasi idInves={params.id}>{children}</LayoutEditProspektusInvestasi>
    </>
}