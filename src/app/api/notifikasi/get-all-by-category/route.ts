import { prisma } from "@/app/lib";
import { newFunGetUserId } from "@/app/lib/new_fun_user_id";
import { ICategoryapp } from "@/app_modules/notifikasi/model/interface";
import backendLogger from "@/util/backendLogger";
import _ from "lodash";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (request.method === "GET") {
    try {
      const { searchParams } = new URL(request.url);
      const category = searchParams.get("category") as ICategoryapp;
      const page = searchParams.get("page");

      const userLoginId = await newFunGetUserId();
      const fixPage = _.toNumber(page);
      const takeData = 10;
      const skipData = fixPage * takeData - takeData;

      if (category === "Semua") {
        const data = await prisma.notifikasi.findMany({
          take: takeData,
          skip: skipData,
          orderBy: [
            {
              isRead: "asc",
            },
            { createdAt: "desc" },
          ],
          where: {
            userId: userLoginId,
            userRoleId: "1",
          },
        });

        return NextResponse.json({ success: true, data });
      }

      const allData = await prisma.notifikasi.findMany({
        take: takeData,
        skip: skipData,
        orderBy: [
          {
            isRead: "asc",
          },
          { createdAt: "desc" },
        ],
        where: {
          userId: userLoginId,
          userRoleId: "1",
          kategoriApp: _.upperCase(category),
        },
      });

      return NextResponse.json({ success: true, data: allData });
    } catch (error) {
      backendLogger.error("Error get data notifikasi: " + error);
    }
  } else {
    return NextResponse.json({ success: false, message: "Method not allowed" });
  }
}
