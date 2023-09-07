import prisma from "@/app/lib/prisma";
import { sealData, unsealData } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const body = await req.json();
    // console.log(body)

    const data = await prisma.user.findUnique({
      where: {
        nomor: body.nomor,
      },
      select: {
        id: true,
        username: true,
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

      // const un = await unsealData(res, {password: process.env.PWD as string})
      // console.log(JSON.stringify(un), "route validasi")

      cookies().set({
        name: "session",
        value: res,
        maxAge: 60 * 60 * 24 * 7,
      });

      // console.log(c.get("token"))
      return NextResponse.json({ body, status: 200, data });
    }

    return NextResponse.json({ message: "Berhasil" });
  }
  return NextResponse.json({ message: "Error" });
}
