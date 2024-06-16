"use server"

import prisma from "@/app/lib/prisma"

export default async function getMaster_NamaBank() {
    const data = await prisma.masterBank.findMany()
    return data
}