import prisma from "@/app/lib/prisma";
import { ServerEnv } from "@/app/lib/server_env";
import { sealData } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const body = await req.json();
    // MyConsole(body);

    const cekUsername = await prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });

    if (cekUsername)
      return NextResponse.json({ status: 400, message: "Username sudah ada" });

    const data = await prisma.user.create({
      data: {
        username: body.username,
        nomor: body.nomor,
      },
    });

    if (data) {
      const seal = await sealData(
        JSON.stringify({
          id: data.id,
          username: data.username,
        }),
        {
          password: ServerEnv.value?.WIBU_PWD as string,
        }
      );

      cookies().set({
        name: "ssn",
        value: seal,
        maxAge: 60 * 60 * 24 * 7,
      });

      return NextResponse.json({ status: 201 });
    }

    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false });
}
