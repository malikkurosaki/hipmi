"use server"

import prisma from "@/app/lib/prisma"

export async function Event_getListUser() {
    const data = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            Profile: true
        }
    })
    return data
}