"use server"

import prisma from "@/app/lib/prisma"

export async function AdminMainDashboard_CountUser() {
    const data = await prisma.user.count()
    return data
}