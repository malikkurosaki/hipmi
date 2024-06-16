import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { url: string } }
) {
  if (!fs.existsSync(`./public/profile/foto/${params.url}`)) {
    const notFile = fs.readFileSync("./public/aset/global/avatar.png");
    return new NextResponse(notFile, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  }

  const file = fs.readFileSync(`./public/profile/foto/${params.url}`);
  return new NextResponse(file, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
