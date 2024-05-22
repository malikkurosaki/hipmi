"use server";

import _ from "lodash";
import prisma from "@/app/lib/prisma";
import { forum_countOneTotalKomentarById } from "../count/count_one_total_komentar_by_id";
import { forum_countTotalKomenById } from "../count/count_total_komentar_by_id";

export async function forum_getListAllPosting() {
  const get = await prisma.forum_Posting.findMany({
    orderBy: [
      // {
      //   forumMaster_StatusPostingId: "asc",
      // },
      {
        createdAt: "desc",
      },
    ],
    where: {
      isActive: true,
      // forumMaster_StatusPostingId: 1
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
          Profile: true,
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

  const data = get.map((val) => ({
    ..._.omit(val, ["Forum_Komentar"]),
    _count: val.Forum_Komentar.length,
  }));

  return data;
}
