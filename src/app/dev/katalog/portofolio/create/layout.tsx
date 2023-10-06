import { PortofolioLayout } from "@/app_modules/katalog/portofolio";
import React from "react";

export default async function Layout({children}: {children: React.ReactNode}) {
    return<>
    <PortofolioLayout>{children}</PortofolioLayout>
    </>
}