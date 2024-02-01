import { AdminMain_Layout } from "@/app_modules_admin/main";
import React from "react";

export default async function Layout({children}: {children: React.ReactNode}) {
    return <AdminMain_Layout>{children}</AdminMain_Layout>
}