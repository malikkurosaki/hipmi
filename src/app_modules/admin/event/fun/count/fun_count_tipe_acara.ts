"use server"

import prisma from "@/app/lib/prisma"

export async function AdminEvent_funCountTipeAcara() {
    const data = await prisma.eventMaster_TipeAcara.count({})
    return data
}