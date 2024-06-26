import { sealData } from "iron-session";
import { myConsole } from "@/app/fun/my_console";
import prisma from "@/app/lib/prisma";
import { data } from "autoprefixer";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getConfig } from "@/bin/config";

import fs from "fs";
import yaml from "yaml";
const config = yaml.parse(fs.readFileSync("config.yaml").toString());

export async function POST(req: Request) {
  if (req.method === "POST") {
    const body = await req.json();
    // MyConsole(body);

    const cekUsername = await prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });

    myConsole(cekUsername);

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
          password: await config.server.password,
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
