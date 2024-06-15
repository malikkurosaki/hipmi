import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  cookies().set({
    name: "ssn",
    value: "",
    maxAge: 0,
  });

  return NextResponse.json({ status: 200, message: "Logout" });
}
