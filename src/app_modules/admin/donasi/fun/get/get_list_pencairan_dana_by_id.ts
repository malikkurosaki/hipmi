"use server"

import prisma from "@/app/lib/prisma"

export async function AdminDonasi_getListPencairanDana(donasiId:string) {
    const data = await prisma.donasi_PencairanDana.findMany({
        where: {
            donasiId: donasiId
        }
    })

    return data
}