import { myConsole } from "@/app/fun/my_console";
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const body = await req.json();
    myConsole(body);

    const data = await prisma.profile.create({
      data: {
        userId: body.userId,
        name: body.name,
        email: body.email,
        alamat: body.alamat,
        jenisKelamin: body.jenisKelamin,
      },
    });

    if (data) return NextResponse.json({ status: 201 });

    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false });
}
