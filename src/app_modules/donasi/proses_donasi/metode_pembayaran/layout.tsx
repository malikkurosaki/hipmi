"use client"

import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate"
import ComponentDonasi_HeaderTamplate from "@/app_modules/donasi/component/header_tamplate"
import { AppShell } from "@mantine/core"
import React from "react"


export default function LayoutDonasi_MetodePembayaran({children}: {children: React.ReactNode}){
    return<>
    <AppComponentGlobal_LayoutTamplate
    header={<ComponentDonasi_HeaderTamplate title="Pilih Metode Pembayaran"/>}
    >
        {children}
    </AppComponentGlobal_LayoutTamplate>
    
    </>
}