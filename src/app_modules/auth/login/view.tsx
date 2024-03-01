"use client";

import { myConsole } from "@/app/fun/my_console";
import { randomOTP } from "@/app_modules/auth/fun/rondom_otp";
import { ApiHipmi } from "@/app/lib/api";
import { Warna } from "@/app/lib/warna";
import {
  Button,
  Center,
  Flex,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { getHotkeyHandler, useFocusTrap, useHotkeys } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAtom } from "jotai";
import { gs_otp, gs_nomor, gs_kodeId } from "../state/state";
import { RouterAdminDashboard } from "@/app/lib/router_hipmi/router_admin";
import { NotifBerhasil } from "@/app_modules/donasi/component/notifikasi/notif_berhasil";
import { NotifGagal } from "@/app_modules/donasi/component/notifikasi/notif_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import { auth_funLogin } from "@/app_modules/auth/fun/fun_login";
import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";

export default function Login() {
  const router = useRouter();
  const [nomor, setNomor] = useState("");
  const [kodeId, setKodeId] = useAtom(gs_kodeId);
  const focusTrapRef = useFocusTrap();

  async function onLogin() {
    if (nomor.length < 10)
      return ComponentGlobal_NotifikasiPeringatan("Nomor minimal 10 digit");
    if (nomor.length > 13)
      return ComponentGlobal_NotifikasiPeringatan("Nomor maximal 13 digit");


    await auth_funLogin(nomor).then((res) => {
      if (res.status === 200) {
        ComponentGlobal_NotifikasiBerhasil(res.message, 2000);
        setKodeId(res.kodeOtpId);
        router.push(RouterAuth.validasi + res.kodeOtpId);
      } else {
        ComponentGlobal_NotifikasiPeringatan(res.message);
      }
    });

    // await fetch(ApiHipmi.login, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(body),
    // })
    //   .then((res) => res.json())
    //   .then((val) => {
    //     // console.log(val);
    //     if (val.success === true) {
    //       router.push(RouterAdminDashboard.splash_admin);
    //     } else {
    //       if (val.status == 200) {
    //         setCode(val.body.otp);
    //         setInputNumber(val.body.nomor);
    //         router.push("/dev/auth/validasi");
    //         return NotifBerhasil("Nomor OTP terkirim");
    //       } else {
    //         NotifGagal(val.message);
    //       }
    //     }
    //   });
  }

  return (
    <>

      <Center h={"80%"}>
        <Stack px={"lg"} spacing={"xl"} w={{ base: 400 }} justify="center">
          <Center h={"100%"}>
            <Image
              mt={"xl"}
              height={130}
              width={130}
              alt="logo"
              src={"/aset/logo/logo-hipmi.png"}
            />
          </Center>
          <Stack spacing={0}>
            <Title order={4}>Selamat Datang di HIPMI App</Title>
            <Text fs={"italic"} fz={"sm"}>
              Silahkan masukan nomor telepon anda untuk masuk !
            </Text>
          </Stack>

          <Grid>
            <Grid.Col span={"content"}>
              <Center h={"100%"}>
                <Text fw={"bold"}>+62</Text>
              </Center>
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <TextInput
                ref={focusTrapRef}
                w={"100%"}
                type="number"
                placeholder="xx xxx xxx xxx"
                onChange={(val) => {
                  setNomor(62 + val.target.value);
                }}
              />
            </Grid.Col>
          </Grid>

          <Button
            radius={"md"}
            compact
            h={40}
            color={"teal"}
            onClick={() => {
              onLogin();
            }}
          >
            <Text>LOGIN</Text>
          </Button>
        </Stack>
      </Center>
    </>
  );
}
