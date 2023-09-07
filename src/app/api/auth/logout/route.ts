import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // console.log("ini keluar")
  const data = cookies().delete("session")

  return NextResponse.json({ status: 200, success: true });
}
