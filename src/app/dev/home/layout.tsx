import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
import { HomeLayout } from "@/app_modules/home";
import { user_getOneByUserId } from "@/app_modules/home/fun/get/get_one_user_by_id";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: any }) {
  const userId = await user_getOneUserId();
  const dataUser = await user_getOneByUserId(userId);

  return (
    <>
      <HomeLayout dataUser={dataUser as any}>{children}</HomeLayout>
    </>
  );
}
