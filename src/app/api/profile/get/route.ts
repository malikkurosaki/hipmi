import { NextResponse } from "next/server";

export async function GET(req: Request) {
  if (req.method === "GET") {
    const body = await req.json();
    console.log(body);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false });
}
