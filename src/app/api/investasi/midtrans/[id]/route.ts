import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, {params}: {params: {id: any}}) {

  const body = await req.json()
  console.log(body)

  return NextResponse.json({ status: 200, message: "OK", data: body });
}
