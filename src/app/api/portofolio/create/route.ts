import { myConsole } from "@/app/fun/my_console";
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const body = await req.json();
    // myConsole(body);

    const data = await prisma.katalog.create({
      data: {
        profileId: body.profileId,
        namaBisnis: body.namaBisnis,
        alamatKantor: body.alamatKantor,
        tlpn: body.tlpn,
        deskripssi: body.deskripssi,
        masterBidangBisnisId: body.masterBidangBisnisId,
      },
    });

    return NextResponse.json({ status: 201, success: true });
  }
  return NextResponse.json({ success: false });
}
