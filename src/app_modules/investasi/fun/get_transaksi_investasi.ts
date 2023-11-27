"use server"

import prisma from "@/app/lib/prisma"

export default async function getTransaksiByIdInvestasi(id: string) {
    const data = await prisma.transaksiInvestasi.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            namaBank: true,
            nomorRekening: true,
            lembarTerbeli: true,
            totalTransfer: true,
            active: true,
            createdAt: true,
            updatedAt: true,
            Author: true,
            Investasi: true
        }
    })
    return data
    
}