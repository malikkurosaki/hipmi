"use server";

import prisma from "@/app/lib/prisma";
import _ from "lodash";

export default async function Admin_getTargetTerbesarInvestasi() {
  const data = await prisma.investasi.findMany({
    orderBy: {
      targetDana: "desc",
    },
    select: {
      author: {
        select: {
          username: true,
        },
      },
      targetDana: true,
    },
  });

//   console.log(data)
}
