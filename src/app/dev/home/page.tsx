import { HomeView } from "@/app_modules/home";
import { cookies } from "next/headers";
import { unsealData } from "iron-session";
import _ from "lodash";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";
import { User_getOneById } from "@/app_modules/home/fun/get/get_one_user_by_id";

export default async function Page() {
  const userId = await User_getUserId();
  const dataUser = await User_getOneById(userId);
  // await new Promise((a, b) => {
  //   setTimeout(a, 1000);
  // });

  return (
    <>
      <HomeView dataUser={dataUser as any} />
    </>
  );
}
