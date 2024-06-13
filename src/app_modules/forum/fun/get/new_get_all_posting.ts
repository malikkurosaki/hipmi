"use server";

import _, { ceil } from "lodash";
import prisma from "@/app/lib/prisma";
import { forum_countOneTotalKomentarById } from "../count/count_one_total_komentar_by_id";
import { forum_countTotalKomenById } from "../count/count_total_komentar_by_id";

export async function forum_new_getAllPosting({
  page,
  search,
}: {
  page: number;
  search?: string;
}) {
  const takeData = 10;
  const skipData = page * takeData - takeData;

  const getData = await prisma.forum_Posting.findMany({
    take: takeData,
    skip: skipData,
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

  const nCount = await prisma.forum_Posting.count({
    where: {
      isActive: true,
      diskusi: {
        mode: "insensitive",
        contains: search,
      },
    },
  });

  const allData = {
    data: getData,
    nPage: ceil(nCount / takeData),
  };
  

  return allData;
}
