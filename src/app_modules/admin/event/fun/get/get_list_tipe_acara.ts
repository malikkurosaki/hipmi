"use server"

import prisma from "@/app/lib/prisma"

export async function AdminEvent_getListTipeAcara(){
    const data = await prisma.eventMaster_TipeAcara.findMany({
        orderBy:{
            id: "asc"
        }
    })
    return data
}