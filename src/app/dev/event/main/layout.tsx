import { LayoutEvent_Main } from "@/app_modules/event";
import React from "react";

export default async function Layout({children}:{children: React.ReactNode}) {
    return<>
    <LayoutEvent_Main>{children}</LayoutEvent_Main>
    </>
}