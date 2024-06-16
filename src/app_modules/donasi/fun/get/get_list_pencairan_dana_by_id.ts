"use server"

import prisma from "@/app/lib/prisma"

export async function Donasi_getListPencairanDanaById(donasiId:string) {

    const data = await prisma.donasi_PencairanDana.findMany({
        orderBy:{
            createdAt: "desc"
        },
        where: {
            donasiId: donasiId
        }
    })

    return data
}