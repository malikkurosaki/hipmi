"use server";

import prisma from "@/app/lib/prisma";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";
import _ from "lodash";

export async function forum_getListPostingByAuhtorId(authorId: string) {
  const get = await prisma.forum_Posting.findMany({
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
          Profile: true,
        },
      },
      Forum_Komentar: {
        where: {
          isActive: true,
        },
      },
    },
  });

  const data = get.map((val) => ({
    ..._.omit(val, ["Forum_Komentar"]),
    _count: val.Forum_Komentar.length,
  }));

  return data;
}
