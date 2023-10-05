"use server";
import { myConsole } from "@/app/fun/my_console";
import prisma from "@/app/lib/prisma";

export async function getFotoProfile(id: any) {
  if(id === null){
    myConsole("id null")
  } else {
    const imgUrl = await prisma.images.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        url: true,
      },
    });
    return imgUrl;
  }
  
}
