"use client";

import { useAtom } from "jotai";
import {
  ActionIcon,
  Button,
  Center,
  Flex,
  PinInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { gs_nomor, gs_otp } from "../state/state";
import { Warna } from "@/app/lib/warna";
import { useState } from "react";
import { myConsole } from "@/app/fun/my_console";
import {
  IconChevronLeft,
  IconCircleLetterH,
  IconCloudLockOpen,
} from "@tabler/icons-react";
import toast from "react-simple-toasts";
import { ApiHipmi } from "@/app/lib/api";
import { useRouter } from "next/navigation";
import { funGetUserProfile } from "@/app_modules/fun_global/get_user_profile";
import { useFocusTrap } from "@mantine/hooks";
import { NotifBerhasil } from "@/app_modules/donasi/component/notifikasi/notif_berhasil";
import { NotifGagal } from "@/app_modules/donasi/component/notifikasi/notif_gagal";
import { NotifPeringatan } from "@/app_modules/donasi/component/notifikasi/notif_peringatan";
import Countdown from "react-countdown";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import { auth_funValidasi } from "../fun/fun_validasi";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { auth_funEditAktivasiKodeOtpById } from "../fun/fun_edit_aktivasi_kode_otp_by_id";
import { RouterAdminDashboard } from "@/app/lib/router_hipmi/router_admin";

export default function Validasi({ dataOtp }: { dataOtp: any }) {
  const router = useRouter();
  const [nomor, setnomor] = useState(dataOtp.nomor);
  const [code, setCode] = useState(dataOtp.otp);
  const [inputCode, setInputOtp] = useState("");
  const focusTrapRef = useFocusTrap();
  const [loading, setLoading] = useState(false);

  const onValid = async () => {
    // MyConsole(inputCode)
    const body = {
      nomor: nomor,
      otp: code,
    };

    if (!inputCode) return toast("Lengkapi Kode");
    if (body.otp != inputCode) return toast("Kode Salah");

    // await fetch(ApiHipmi.validasi, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(body),
    // })
    //   .then((res) => res.json())
    //   .then((val) => {
    //     myConsole(val);
    //     if (val.status == 200) {
    //       setTimeout(() => router.push("/dev/home"), 2000);
    //       funGetUserProfile(val.data.id);
    //       NotifBerhasil("Berhasil Login");
    //     } else {
    //       router.push("/dev/auth/register");
    //       NotifPeringatan("Silahkan Registrasi");
    //     }
    //   });
  };

  async function onVerifikasi() {
    if (!inputCode)
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Kode");
    if (code != inputCode)
      return ComponentGlobal_NotifikasiPeringatan("Kode Salah");

    await auth_funValidasi(nomor).then(async (res) => {
      if (res.status === 200) {
        await auth_funEditAktivasiKodeOtpById(dataOtp.id).then((val) => {
          if (val.status === 200) {
            if (res.role === "1") {
              ComponentGlobal_NotifikasiBerhasil(res.message);
              router.push(RouterHome.main_home);
            } else {
              router.push(RouterAdminDashboard.splash_admin)
            }
          } else {
            ComponentGlobal_NotifikasiPeringatan(val.message);
          }
        });
      } else {
        ComponentGlobal_NotifikasiBerhasil(res.message);
        router.push(RouterAuth.register + dataOtp.id);
      }
    });
  }

  return (
    <>
      {/* <Flex
        align={"center"}
        justify={"center"}
        direction={"column"}
        gap={50}
        h={"80vh"}
      >
        <Title order={4}>Validasi Kode OTP</Title>
        <IconCircleLetterH size={150} />
        <Flex direction={"column"} gap={"xl"} align={"center"}>
          <Flex
            justify={"center"}
            gap={1}
            direction={"column"}
            align={"center"}
          >
            <Text>Enter the 4-digit OTP , we’ve just sent</Text>
            <Text>to  +{nomor}</Text>
          </Flex>
          <PinInput
          ref={focusTrapRef}
            spacing={"md"}
            mt={"md"}
            onChange={(val) => {
              setInputOtp(val);
            }}
          />
          <Button
            w={100}
            mt={"md"}
            compact
            radius={50}
            bg={Warna.hijau_tua}
            color="green"
            onClick={() => {
              onValid();
              // myConsole("ok")
            }}
          >
            Submit
          </Button>
        </Flex>
      </Flex> */}

      {/* <pre>{JSON.stringify(code)}</pre> */}

      <Center h={"80%"} bg={"blue"} >
        <Stack px={"lg"} spacing={"xl"} w={{ base: 400 }} justify="center">
          <Center>
            <IconCloudLockOpen size={130} />
          </Center>

          <Stack spacing={50}>
            <Stack spacing={0}>
              <Title order={4}>Verifikasi Kode OTP</Title>
              <Text fs={"italic"} fz={"xs"}>
                Silahkan masukan 4 digit kode otp yang dikirim ke{" "}
                <Text span inherit fw={"bold"}>
                  +{nomor}
                </Text>
              </Text>
            </Stack>

            <Center>
              <PinInput
                ref={focusTrapRef}
                spacing={"md"}
                mt={"md"}
                onChange={(val) => {
                  setInputOtp(val);
                }}
              />
            </Center>
            <Stack>
              <Button
                loading={loading ? true : false}
                loaderPosition="center"
                radius={"md"}
                compact
                h={40}
                color={"teal"}
                onClick={() => {
                  onVerifikasi();
                  setLoading(true);
                }}
              >
                <Text>VERIFIKASI</Text>
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Center>
    </>
  );
}
