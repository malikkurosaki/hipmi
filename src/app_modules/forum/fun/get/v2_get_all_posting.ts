"use server"

import prisma from "@/app/lib/prisma";


export default async function forum_v2_getAllPosting({search}: {search?: string}) {
    const getData = await prisma.forum_Posting.findMany({
    //   take: takeData,
    //   skip: skipData,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        isActive: true,
        diskusi: {
          mode: "insensitive",
          contains: search,
        },
      },
      select: {
        id: true,
        diskusi: true,
        createdAt: true,
        isActive: true,
        authorId: true,
        Author: {
          select: {
            id: true,
            username: true,
            Profile: {
              select: {
                id: true,
                imagesId: true,
              },
            },
          },
        },
        Forum_Komentar: {
          where: {
            isActive: true,
          },
        },
        ForumMaster_StatusPosting: true,
      },
    });

    return getData
}