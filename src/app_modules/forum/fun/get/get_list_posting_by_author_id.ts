"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
import _ from "lodash";

export async function forum_getAllPostingByAuhtorId({
  authorId,
  page,
}: {
  authorId: string;
  page: any;
}) {
  const takeData = 5;
  const skipData = page * takeData - takeData;

  const get = await prisma.forum_Posting.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      authorId: authorId,
      isActive: true,
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
      ForumMaster_StatusPosting: {
        select: {
          id: true,
          status: true,
        },
      },
      forumMaster_StatusPostingId: true,
    },
  });

  // const data = get.map((val) => ({
  //   ..._.omit(val, ["Forum_Komentar"]),
  //   _count: val.Forum_Komentar.length,
  // }));

  return get;
}
