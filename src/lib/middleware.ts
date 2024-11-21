import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let cookies = request.cookies.get("mySession");
  console.log(cookies);

  if (
    !cookies ||
    !cookies?.value ||
    _.isEmpty(cookies?.value) ||
    _.isUndefined(cookies?.value)
  ) {
    return NextResponse.redirect(new URL("/dev/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|manifest).*)"],
};
