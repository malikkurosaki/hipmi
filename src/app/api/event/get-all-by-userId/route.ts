import { NextResponse } from "next/server";

export async function GET(params: Request) {
    const { searchParams } = new URL(params.url);
    const userId = searchParams.get("userId");
    

    return NextResponse.json({ userId });
}