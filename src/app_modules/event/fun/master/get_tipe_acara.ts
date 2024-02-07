"use server"

import prisma from "@/app/lib/prisma"

export async function Event_getMasterTipeAcara(){
    const data = await prisma.eventMaster_TipeAcara.findMany({
         orderBy: {
            id: "asc"
         },
         where: {
            active: true
         }
    })
    return data
}