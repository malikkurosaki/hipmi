import prisma from "@/app/lib/prisma";
import { sealData } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const body = await req.json();
    // console.log(body);

    const data = await prisma.user.create({
      data: {
        username: body.username,
        nomor: body.nomor,
      },
    });

    if (data) {
      const res = await sealData(
        JSON.stringify({
          id: data.id,
          username: data.username,
        }),
        {
          password: process.env.PWD as string,
        }
      );

      cookies().set({
        name: "session",
        value: res,
        maxAge: 60 * 60 * 24 * 7,
      });

      // console.log(c.get("token"))
      return NextResponse.json({ body,status: 201 });
    }

    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false });
}
