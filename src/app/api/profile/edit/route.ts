import { myConsole } from "@/app/fun/my_console";
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const body = await req.json();
    // myConsole(body);

    const data = await prisma.profile.update({
        where: {
            id: body.id
        },
        data: {
            name: body.name,
            email: body.email,
            alamat: body.alamat,
            jenisKelamin: body.jenisKelamin
        }
    })

    if(data) {
        return NextResponse.json({status: 200})
    } else {
        return new Response("Error",{ status :401 });
    }



    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false });
}
