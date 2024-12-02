"use client";

import { RouterAdminDashboard } from "@/app/lib/router_hipmi/router_admin";
import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { funGlobal_getUserById } from "@/app_modules/_global/fun/get/fun_get_user_by_id";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import { Avatar, BackgroundImage, Center, Image, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const router = useRouter();

  useShallowEffect(() => {
    // if (!checkCookies) return router.push(RouterAuth.login, { scroll: false });
    // onCheckUser();

    setTimeout(() => {
      router.push("/login", { scroll: false });
    }, 1000);
    // if (!userLoginId) {
    //   setTimeout(() => {
    //     router.push(RouterAuth.login, { scroll: false });
    //   }, 1000);
    // } else {
    //   dataUser.masterUserRoleId === "1"
    //     ? setTimeout(() => {
    //         return router.push(RouterHome.main_home, { scroll: false });
    //       }, 1000)
    //     : setTimeout(() => {
    //         return router.push(RouterAdminDashboard.splash_admin, {
    //           scroll: false,
    //         });
    //       }, 1000);
    // }
  }, []);

  // async function onCheckUser() {
  //   const userLoginId = await funGetUserIdByToken();
  //   const dataUser = await funGlobal_getUserById({ userId: userLoginId });

  //   if (dataUser?.masterUserRoleId == "1")
  //     return router.push(RouterHome.main_home);

  //   return router.push(RouterAdminDashboard.splash_admin);
  // }

  return (
    <>
      <BackgroundImage
        src={"/aset/global/main_background.png"}
        h={"100vh"}
        // pos={"static"}
      >
        <Center h={"100vh"}>
          <Stack align="center" justify="center" p={"md"}>
            {/* <Title c={"#002e59"}>Welcome to</Title> */}
            <Avatar size={300} radius={"100%"}>
              <Image
                height={250}
                width={250}
                alt="Logo"
                src={"/aset/logo/logo-hipmi.png"}
              />
            </Avatar>
          </Stack>
        </Center>
      </BackgroundImage>
    </>
  );
}
