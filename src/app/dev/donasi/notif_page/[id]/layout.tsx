import { LayoutDonasi_NotifPage } from "@/app_modules/donasi";
import React from "react";

export default async function Layout({children}: {children: React.ReactNode}) {
    return<>
    <LayoutDonasi_NotifPage>{children}</LayoutDonasi_NotifPage>
    </>
}