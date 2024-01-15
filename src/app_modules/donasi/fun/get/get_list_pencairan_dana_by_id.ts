"use server"

import prisma from "@/app/lib/prisma"

export async function Donasi_getListPencairanDanaById(donasiId:string) {
    const data = await prisma.donasi_PencairanDana.findMany({
        where: {
            donasiId: donasiId
        }
    })

    // console.log(data)

    return data
}