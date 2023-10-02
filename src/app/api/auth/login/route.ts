import { MyConsole } from "@/app/fun/my_console";
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const body = await req.json();
    MyConsole(body);

    try {
      await fetch(
        `https://wa.wibudev.com/code?nom=${body.nomor}&text=${body.otp}`
      );
      return NextResponse.json({ body, status: 200, message: "Login Success" });
    } catch (error) {
      return NextResponse.json({ status: 500, message: "Server Error !!!" });
    }
  }
  return NextResponse.json({ success: false });
}
