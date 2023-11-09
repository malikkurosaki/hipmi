import { LayoutEditIntroInvestasi } from "@/app_modules/investasi";
import { test_server } from "@/app_modules/investasi/edit_intro/_makuro/test_server";
import React from "react";

export default async function Layout({children}: {children: React.ReactNode}) {
    return<>
    <LayoutEditIntroInvestasi onUpdate={test_server}>{children}</LayoutEditIntroInvestasi>
    </>
}