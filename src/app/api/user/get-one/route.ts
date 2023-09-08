import prisma from "@/app/lib/prisma";
import { unsealData } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
const c = cookies().get("session")

const un = await unsealData(c?.value as string, {password: process.env.PWD as string})
const val =  await JSON.parse(un as any)
const token = val?.id

//   const id = new URL(req.url).searchParams.get("id");
//   console.log(id)

  const data = await prisma.user.findUnique({
    where: {
      id: token
    },
    select: {
      id: true,
      username: true,
      nomor: true,
      active: true,
      Profile: true,
    },
  })

  if (!data) return NextResponse.json({ status: 404 });

  return NextResponse.json({ data, success: true });
}
