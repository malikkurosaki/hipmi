"use server";

import _ from "lodash";
import prisma from "@/app/lib/prisma";
import { forum_countOneTotalKomentarById } from "../count/count_one_total_komentar_by_id";
import { forum_countTotalKomenById } from "../count/count_total_komentar_by_id";

export async function forum_getListAllPosting() {
  const get = await prisma.forum_Posting.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
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
      // _count: {
      //   select: {
      //     Forum_Komentar: true,
      //   },
      // },
    },
  });

  // const data = get.map((v) => ({
  //   ..._.omit(v, ['Forum_Komentar']),
  //   total_coment: v.Forum_Komentar.filter((v) => v.isActive).length,
  // }));

  const data = get.map((val) => ({
    ..._.omit(val, ["Forum_Komentar"]),
    _count: val.Forum_Komentar.length,
  }));

  // console.log(JSON.stringify(data, null, 2));

  return data;
}
