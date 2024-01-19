"use server"

import prisma from "@/app/lib/prisma"

export async function AdminMainDashboard_CountPOrtofolio() {
    const data = await prisma.portofolio.count({})
    return data
}