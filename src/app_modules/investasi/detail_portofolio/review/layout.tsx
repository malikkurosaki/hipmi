"use client"

import ComponentGlobal_HeaderTamplate from "@/app_modules/component_global/header_tamplate"
import { AppShell } from "@mantine/core"
import React from "react"

export default function LayoutDetailReviewInvestasi({children}: {children: React.ReactNode}){
    return<>

    <AppShell
    header={
        <ComponentGlobal_HeaderTamplate title="Detail Review"/>
    }
    >
        {children}
    </AppShell>
    
    </>
}