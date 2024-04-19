"use client"

import { AppShell } from "@mantine/core"
import React from "react"
import ComponentDonasi_HeaderTamplate from "../../component/header_tamplate"
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi"
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate"

export default function LayoutDetailDonasiSaya({children}: {children: React.ReactNode}){
    return<>
    <AppComponentGlobal_LayoutTamplate
    header={<ComponentDonasi_HeaderTamplate title="Detail Donasi Saya" route={RouterDonasi.main_donasi_saya} />}
    >
        {children}
    </AppComponentGlobal_LayoutTamplate>
    </>
}