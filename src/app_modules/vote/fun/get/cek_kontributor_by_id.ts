"use server";

import prisma from "@/app/lib/prisma";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";

export async function Vote_cekKontributorById(votingId: string) {
  const UserId = await User_getUserId()
  
  const cek = await prisma.voting_Kontributor.count({
    where: {
      authorId: UserId,
      votingId: votingId,
    },
  });

 if (cek > 0) {
   return true;
 } else {
   return false;
 }
}
