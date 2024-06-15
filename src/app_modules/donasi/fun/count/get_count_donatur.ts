"use server"

import prisma from "@/app/lib/prisma"

export async function Donasi_getCountDonatur(donasiId: string) {
    const donatur = await prisma.donasi_Invoice.count({
        where: {
         donasiId: donasiId,
         donasiMaster_StatusInvoiceId: {
            equals: "1"
         }
        }
       });

       return donatur
}