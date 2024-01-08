"use client"

import HeaderTamplateDonasi from "@/app_modules/donasi/component/header_tamplate"
import { AppShell } from "@mantine/core"
import React from "react"


export default function LayoutDonasi_MetodePembayaran({children}: {children: React.ReactNode}){
    return<>
    <AppShell
    header={<HeaderTamplateDonasi title="Pilih Metode Pembayaran"/>}
    >
        {children}
    </AppShell>
    
    </>
}