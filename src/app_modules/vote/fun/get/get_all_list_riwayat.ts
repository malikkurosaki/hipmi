"use server"

import prisma from "@/app/lib/prisma"

export async function Vote_getAllListRiwayat() {
    const data = await prisma.voting.findMany({
      orderBy: {
        createdAt: "asc",
      },
      where: {
        voting_StatusId: "1",
        isActive: true,
        akhirVote: {
          lte: new Date(),
        },
      },
      select: {
        id: true,
        title: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        deskripsi: true,
        awalVote: true,
        akhirVote: true,
        catatan: true,
        authorId: true,
        voting_StatusId: true,
        Voting_DaftarNamaVote: {
          orderBy: {
            createdAt: "asc",
          },
        },
        Author: {
          select: {
            id: true,
            username: true,
            nomor: true,
            Profile: true,
          },
        },
      },
    });

    return data
}