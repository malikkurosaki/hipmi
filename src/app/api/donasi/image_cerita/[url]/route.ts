import { NextRequest, NextResponse } from "next/server";
import fs from "fs"

export async function GET(
  req: NextRequest,
  { params }: { params: { url: string } }
) {

  if (!fs.existsSync(`./public/donasi/image_cerita/${params.url}`)) {
    const notFile = fs.readFileSync("./public/aset/global/no_img.png");
    return new NextResponse(notFile, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  }

  const file = fs.readFileSync(`./public/donasi/image_cerita/${params.url}`);
  return new NextResponse(file, {
    headers: {
      "Content-Type": "image/png",
    },
  });
  
}
