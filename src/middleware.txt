import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { user_getOneByUserId } from "@/app_modules/home/fun/get/get_one_user_by_id";
import { unsealData } from "iron-session";
import _ from "lodash";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { RouterHome } from "./app/lib/router_hipmi/router_home";


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let c = request.cookies.get("mySession");

  if (!c || !c?.value || _.isEmpty(c?.value) || _.isUndefined(c?.value)) {
    console.log("tidak ada user middleware");


    // return NextResponse.redirect(new URL("/dev/auth/login", request.url));
    // return NextResponse.redirect(new URL(RouterAuth.login, request.url));
  } else {
    console.log("ada user middleware");
    return NextResponse.redirect(new URL(RouterHome.main_home, request.url));
  }
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|manifest).*)"],
};
