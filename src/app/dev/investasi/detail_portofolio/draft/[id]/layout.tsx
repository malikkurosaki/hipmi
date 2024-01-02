import { LayoutDetailDraftInvestasi } from "@/app_modules/investasi";
import React from "react";

export default async function Layout({children, params}: {children: React.ReactNode, params: {id: string}}) {
    return<>
    <LayoutDetailDraftInvestasi id={params.id}>{children}</LayoutDetailDraftInvestasi>
    </>
}