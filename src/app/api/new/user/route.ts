import { prisma } from "@/app/lib";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { NextResponse } from "next/server";


// GET DATA USER LOGIN
export async function GET(request: Request) {
   try {
      const userLoginId = await funGetUserIdByToken()
      if (userLoginId == null) {
         return NextResponse.json({ success: false, message: "Gagal mendapatkan data, user id tidak ada" }, { status: 500 });
      }

      const data = await prisma.user.findFirst({
         where: {
            id: userLoginId,
         },
         select: {
            id: true,
            username: true,
            nomor: true,
            active: true,
            masterUserRoleId: true,
            Profile: {
               select: {
                  id: true,
                  name: true,
                  email: true,
                  alamat: true,
                  jenisKelamin: true,
                  imageId: true,
                  imageBackgroundId: true
               }
            }
         }
      });

      const dataFix = {
         id: data?.id,
         username: data?.username,
         nomor: data?.nomor,
         active: data?.active,
         masterUserRoleId: data?.masterUserRoleId,
         idProfile: data?.Profile?.id,
         name: data?.Profile?.name,
         email: data?.Profile?.email,
         alamat: data?.Profile?.alamat,
         jenisKelamin: data?.Profile?.jenisKelamin,
         imageId: data?.Profile?.imageId,
         imageBackgroundId: data?.Profile?.imageBackgroundId

      }

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan data", data: dataFix, }, { status: 200 });

   }
   catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan data, coba lagi nanti ", reason: (error as Error).message, }, { status: 500 });
   }
}