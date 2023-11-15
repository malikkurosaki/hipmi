"use server"

import prisma from "@/app/lib/prisma"
import { RouterAdminInvestasi } from "@/app/lib/router_hipmi/router_admin"
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi"
import { revalidatePath } from "next/cache"

export default async function funRejectInvestasi(data: any) {
    // console.log(data)

    const res = await prisma.investasi.update({
        where: { id: data.id },
        data: {
            masterStatusInvestasiId: data.status,
            catatan: data.catatan
        }
    })
    if(!res) return {status: 400, message: "Gagal reject"}

    revalidatePath(RouterAdminInvestasi.main_investasi)

    return {
        status: 200,
        message: "Reject berhasil"
    }
}