import prisma from "@/app/lib/prisma";
import { ServerEnv } from "@/app/lib/server_env";
import { sealData } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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

    if (!data) return NextResponse.json({ status: 404 });

    if (data) {
      const res = await sealData(
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
        value: res,
        maxAge: 60 * 60 * 24 * 7,
        
      });

      revalidatePath("/dev/home");

      return NextResponse.json({ status: 200, data });
    }

    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false });
}
