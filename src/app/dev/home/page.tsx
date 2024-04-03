import { HomeView } from "@/app_modules/home";
import { cookies } from "next/headers";
import { unsealData } from "iron-session";
import _ from "lodash";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";
import { user_getOneById } from "@/app_modules/home/fun/get/get_one_user_by_id";

export default async function Page() {
  const userId = await User_getUserId();
  const dataUser = await user_getOneById(userId);
  // await new Promise((a, b) => {
  //   setTimeout(a, 4000);
  // });

  return (
    <>
      <HomeView dataUser={dataUser as any} />
    </>
  );
}
