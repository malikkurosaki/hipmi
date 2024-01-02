import { myConsole } from "@/app/fun/my_console";
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sealData, unsealData } from "iron-session";
import { getConfig } from "@/bin/config";
import yaml from "yaml";
import fs from "fs";
import { revalidatePath } from "next/cache";
const config = yaml.parse(fs.readFileSync("config.yaml").toString());

export async function POST(req: Request) {

  if (req.method === "POST") {
    const body = await req.json();


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

    myConsole(data)

    if (!data) return NextResponse.json({ status: 404 });

    if (data) {
      const res = await sealData(
        JSON.stringify({
          id: data.id,
          username: data.username,
        }),
        {
          password: (await config.server.password),
        }
      );

      cookies().set({
        name: "ssn",
        value: res,
        maxAge: 60 * 60 * 24 * 7,
      });

      revalidatePath("/dev/home")

      return NextResponse.json({ status: 200, data });
    }

    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false });
}
