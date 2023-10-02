import { MyConsole } from "@/app/fun/my_console";
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sealData, unsealData } from "iron-session";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const body = await req.json();
    MyConsole(body);

    const data = await prisma.user.findUnique({
      where: {
        nomor: body.nomor,
      },
      select: {
        id: true,
        nomor: true,
        username: true,
        active: true,
      },
    });

    if (!data) return NextResponse.json({ status: 404 });

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

      const un = await unsealData(res, { password: process.env.PWD as string });
      //   console.log(JSON.stringify(un), "route validasi")

      cookies().set({
        name: "ssn",
        value: res,
        maxAge: 60 * 60 * 24 * 7,
      });

      return NextResponse.json({ status: 200, data });
    }

    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false });
}
