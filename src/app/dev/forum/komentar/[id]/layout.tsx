import { LayoutForum_Komentar } from "@/app_modules/forum";
import React from "react";

export default async function Layout({children}: {children: React.ReactNode}) {
    return<>
    <LayoutForum_Komentar>{children}</LayoutForum_Komentar>
    </>
}