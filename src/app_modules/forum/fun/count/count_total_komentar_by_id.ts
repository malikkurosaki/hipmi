"use server";

import prisma from "@/app/lib/prisma";


// PERCOBAAN 
export async function forum_countTotalKomenById(postingId: any[]) {
  // console.log(postingId)

  const data = postingId.map(async (e) => {
    const get = await prisma.forum_Komentar.count({
      where: {
        forum_PostingId: e,
        isActive: true,
      },
      select: {
        forum_PostingId: true,

      },
    });
    console.log(get);
  });

  //   const data = await prisma.forum_Komentar.count({
  //     where: {
  //       forum_PostingId: postingId,
  //       isActive: true,
  //     },
  //   });

  //   return data;
}
