"use server"

import prisma from "@/app/lib/prisma"

export async function Donasi_getMasterBank() {
    const data = await prisma.donasiMaster_Bank.findMany({})
    return data
}