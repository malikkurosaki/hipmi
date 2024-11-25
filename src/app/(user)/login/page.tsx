import { funCheckCookies } from "@/app_modules/_global/fun/get/fun_check_cookies";
import { Login } from "@/app_modules/auth";
import versionUpdate from "../../../../package.json";

export default async function Page() {
  const version = versionUpdate.version;

  return (
    <>
      <Login version={version} />
    </>
  );
}
