import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs"

export async function GET({ params }: { params: { id: string } }) {
  const data = await prisma.prospektusInvestasi.findUnique({
    where: { id: params.id },
    select: {
      url: true,
    },
  });

  const file = fs.readFileSync(`./public/file/${data?.url}`)
  return new NextResponse(file, {
    headers: {
      "Content-Type":"application/pdf"
    }
  })
}
