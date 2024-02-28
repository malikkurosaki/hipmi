"use server";

import prisma from "@/app/lib/prisma";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";

export async function Job_getAllListPublish() {
  const data = await prisma.job.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      masterStatusId: "1",
      isActive: true,
      isArsip: false,
    },
    select: {
        id: true,
        title: true,
        Author: {
            select: {
                Profile: true
            }
        }
    }
  });

  return data;
}
