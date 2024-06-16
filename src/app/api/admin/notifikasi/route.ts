import adminNotifikasi_getByUserId from "@/app_modules/admin/notifikasi/fun/get/get_notifikasi_by_user_id";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {


  return NextResponse.json({  success: true });
}
