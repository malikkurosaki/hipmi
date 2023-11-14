"use server"

import prisma from "@/app/lib/prisma"

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

    return {
        status: 200,
        message: "Reject berhasil"
    }
}