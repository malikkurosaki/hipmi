import { funCheckToken } from "@/app_modules/_global/fun/get";
import { redirect } from "next/navigation";
import { RouterAuth } from "../lib/router_hipmi/router_auth";
import { CheckCookies_UiLayout } from "@/app_modules/check_cookies";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const cekCookies = await funCheckToken();
  // if (cekCookies === false) redirect(RouterAuth.login);

  return (
    <>
      <CheckCookies_UiLayout>{children}</CheckCookies_UiLayout>
    </>
  );
}
