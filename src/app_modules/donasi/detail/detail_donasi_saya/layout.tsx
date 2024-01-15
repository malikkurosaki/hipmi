"use client"

import { AppShell } from "@mantine/core"
import React from "react"
import ComponentDonasi_HeaderTamplate from "../../component/header_tamplate"
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi"

export default function LayoutDetailDonasiSaya({children}: {children: React.ReactNode}){
    return<>
    <AppShell
    header={<ComponentDonasi_HeaderTamplate title="Detail Donasi Saya" route={RouterDonasi.main_donasi_saya} />}
    >
        {children}
    </AppShell>
    </>
}