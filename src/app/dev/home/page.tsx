import { HomeView } from "@/app_modules/home";
import { cookies } from "next/headers";
import { unsealData } from "iron-session";
import _ from "lodash";
import { redirect } from "next/navigation";

export default async function Page() {
  const c = cookies().get("ssn");
  // const tkn = !c
  //   ? null
  //   : JSON.parse(
  //       await unsealData(c.value as string, {
  //         password: process.env.PWD as string,
  //       })
  //     );

  if (!c?.value) return redirect("/dev/auth/login");

  return (
    <>
      {/* {JSON.stringify(tkn)} */}
      <HomeView />
    </>
  );
}
