"use client";

import {
  Box,
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
import { useFocusTrap } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAtom } from "jotai";
import { gs_kodeId } from "../state/state";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import { auth_funLogin } from "@/app_modules/auth/fun/fun_login";
import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export default function Login() {
  const router = useRouter();
  const [kodeId, setKodeId] = useAtom(gs_kodeId);
  const focusTrapRef = useFocusTrap();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function onLogin() {
    // if (nomor.length < 10)
    //   return ComponentGlobal_NotifikasiPeringatan("Nomor minimal 10 digit");
    // if (nomor.length > 13)
    //   return ComponentGlobal_NotifikasiPeringatan("Nomor maximal 13 digit");

    const nomorHp = phone.substring(1);
    // console.log(nomorHp)

    await auth_funLogin(nomorHp).then((res) => {
      if (res.status === 200) {
        setLoading(true);
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
      <Stack align="center" justify="center"  h={"100vh"}>
        <Center>
          <Stack spacing={"xl"}>
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

            <PhoneInput
              // ref={focusTrapRef}
              inputStyle={{ width: "100%" }}
              defaultCountry="id"
              onChange={(val) => {
                setPhone(val);
              }}
            />

            <Button
              radius={"md"}
              color={"teal"}
              onClick={() => {
                onLogin();
              }}
              loading={loading ? true : false}
              loaderPosition="center"
            >
              LOGIN
            </Button>
          </Stack>
        </Center>
      </Stack>
    </>
  );
}
