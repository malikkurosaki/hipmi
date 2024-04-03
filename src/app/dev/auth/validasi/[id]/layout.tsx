import { LayoutValidasi } from "@/app_modules/auth";
import React from "react";

export default async function  Layout({children}: {children: React.ReactNode}) {
    return<>
    <LayoutValidasi>{children}</LayoutValidasi>
    </>
}