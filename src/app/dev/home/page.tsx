import prisma from "@/app/lib/prisma";
import { Logout } from "@/app_modules/auth";
import { ViewHome } from "@/app_modules/home";
import { unsealData } from "iron-session";
import _ from "lodash";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const c = cookies().get("session")
  const token = !c
    ? null
    : JSON.parse(
        await unsealData(c.value as string, {
          password: process.env.PWD as string,
        })
      );

  if (!c || !c.value || _.isEmpty(c.value)) return redirect("/dev/auth/login");
  // const data = await prisma.user.findUnique({
  //   where: {
  //     id: token?.id,
  //   },
  //   select: {
  //     id: true,
  //     nomor: true,
  //     username: true,
  //   },
  // });
  // console.log(token, "home")'


  return (
    <>

      {/* {JSON.stringify(token)}
      <Logout/> */}
      <ViewHome />
    </>
  );
}
