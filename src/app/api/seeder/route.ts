import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import userRole from "../../../bin/seeder/user_role.json";
import bidangBisnis from "../../../bin/seeder/bidang_bisnis.json";

export async function GET(req: Request) {
  const dev = new URL(req.url).searchParams.get("dev");
  if (dev === "DEV-HIPMI") {
    for (let i of userRole) {
      const data = await prisma.masterUserRole.upsert({
        where: {
          id: i.id.toString(),
        },
        update: {
          id: i.id.toString(),
          name: i.name,
        },
        create: {
          id: i.id.toString(),
          name: i.name,
        },
      });
    }

    for (let i of bidangBisnis) {
      await prisma.masterBidangBisnis.upsert({
        where: {
          id: i.id.toString(),
        },
        update: {
          id: i.id.toString(),
          name: i.name,
        },
        create: {
          id: i.id.toString(),
          name: i.name,
        },
      });
    }
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false });
}
