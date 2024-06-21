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
import {
  AccentColor,
  MainColor,
} from "@/app_modules/component_global/color/color_pallet";
import ComponentGlobal_ErrorInput from "@/app_modules/component_global/error_input";

export default function Login() {
  const router = useRouter();
  const [kodeId, setKodeId] = useAtom(gs_kodeId);
  const focusTrapRef = useFocusTrap();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  async function onLogin() {
    const nomorHp = phone.substring(1);
    console.log(nomorHp);

    if (nomorHp.length <= 4) return setError(true);

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
      <Stack
        align="center"
        justify="center"
        h={"100vh"}
        bg={MainColor.darkblue}
        spacing={100}
      >
        <Stack align="center" spacing={0}>
          <Title order={3} c={MainColor.yellow}>
            WELCOME TO
          </Title>
          <Title c={MainColor.yellow}>HIPMI APPS</Title>
        </Stack>

        <Stack w={300}>
          <Center>
            <Text c={"white"}>Nomor telepon</Text>
          </Center>
          <PhoneInput
            inputStyle={{ width: "100%" }}
            defaultCountry="id"
            onChange={(val) => {
              setPhone(val);
            }}
          />

          {isError ? (
            <ComponentGlobal_ErrorInput text="Masukan nomor telepon anda" />
          ) : (
            ""
          )}

          <Button
            radius={"md"}
            bg={MainColor.yellow}
            loading={loading ? true : false}
            loaderPosition="center"
            c={"black"}
            style={{
              borderColor: AccentColor.yellow,
            }}
            onClick={() => {
              onLogin();
            }}
          >
            LOGIN
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
