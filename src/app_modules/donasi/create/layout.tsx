"use client"

import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate"
import React from "react"
import ComponentDonasi_HeaderTamplate from "../component/header_tamplate"

export default function LayoutCreateDonasi({children}: {children: React.ReactNode}){
    return<>
    <AppComponentGlobal_LayoutTamplate header={<ComponentDonasi_HeaderTamplate title="Buat Donasi"/>}>
        {children}
    </AppComponentGlobal_LayoutTamplate>
    
    </>
}