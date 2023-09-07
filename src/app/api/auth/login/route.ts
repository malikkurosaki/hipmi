import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { sealData, unsealData } from "iron-session";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const body = await req.json();
    // console.log(body);

    await fetch(
      `https://wa.makurostudio.my.id/code?nom=${body.nomor}&text=${body.otp}`
    );

    return NextResponse.json({body, success: true });
  }
  return NextResponse.json({ success: false });
}
