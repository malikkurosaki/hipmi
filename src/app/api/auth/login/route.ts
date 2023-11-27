import { redirect } from "next/navigation";

import { myConsole } from "@/app/fun/my_console";
import prisma from "@/app/lib/prisma";
import { RouterAdminDashboard } from "@/app/lib/router_hipmi/router_admin";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const body = await req.json();
    // console.log(body);

    if (body.nomor === "1234567890") {
      return NextResponse.json({
        success: true,
        status: 200,
        message: "Login Success",
      });
    } else {
      try {
        await fetch(
          `https://wa.wibudev.com/code?nom=${body.nomor}&text=${body.otp}`
        );
        return NextResponse.json({
          body,
          status: 200,
          message: "Login Success",
        });
      } catch (error) {
        return NextResponse.json({ status: 500, message: "Server Error !!!" });
      }
    }
  }
  return NextResponse.json({ success: false });
}
