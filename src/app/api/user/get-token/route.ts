import { unsealData } from 'iron-session';
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const c = cookies().get("ssn");
  const data = JSON.parse(
    await unsealData(c?.value as string, {password: process.env.PWD as string})
  )

  return NextResponse.json(data);
}
