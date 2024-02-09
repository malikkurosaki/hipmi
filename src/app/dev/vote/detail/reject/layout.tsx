import { LayoutVote_DetailReject } from "@/app_modules/voting";
import React from "react";

export default async function Layout({children}: {children: React.ReactNode}) {
    return<>
    <LayoutVote_DetailReject>{children}</LayoutVote_DetailReject>
    </>
}