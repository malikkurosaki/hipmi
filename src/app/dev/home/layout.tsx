import { User_getUserId } from "@/app_modules/fun_global/get_user_token";
import { HomeLayout } from "@/app_modules/home";
import { User_getOneById } from "@/app_modules/home/fun/get/get_one_user_by_id";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: any }) {
  const userId = await User_getUserId();
  const dataUser = await User_getOneById(userId);

  return (
    <>
      <HomeLayout dataUser={dataUser as any}>{children}</HomeLayout>
    </>
  );
}
