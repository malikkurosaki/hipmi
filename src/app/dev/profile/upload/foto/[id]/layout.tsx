import { UploadFotoProfileLayout } from "@/app_modules/katalog/profile";
import React from "react";

export default async function Layout({children, params}: {children: React.ReactNode, params: {id: string}}) {
    let profileId = params.id 
    return <>
    <UploadFotoProfileLayout profileId={profileId} >{children}</UploadFotoProfileLayout>
    </>
}