"use client"

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi"
import HeaderTamplate from "@/app_modules/component/header_tamplate"
import { AppShell } from "@mantine/core"
import { IconPencilPlus } from "@tabler/icons-react"
import React from "react"

export default function LayoutListEditBeritaInvestasi({children}: {children: React.ReactNode}){
    return<>
    <AppShell
    header={
        <HeaderTamplate
          title="List Berita"
          icon={<IconPencilPlus />}
          route2={RouterInvestasi.create_berita}
        />
      }
    >
        {children}
    </AppShell>
    </>
}