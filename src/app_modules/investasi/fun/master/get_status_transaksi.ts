"use server"

import prisma from "@/app/lib/prisma"

export default async function getMaster_StatusTransaksiInvestasi() {
    const data = await prisma.masterStatusTransaksiInvestasi.findMany()
    return data
}