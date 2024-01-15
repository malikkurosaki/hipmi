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
import { IconChevronLeft, IconCircleLetterH } from "@tabler/icons-react";
import toast from "react-simple-toasts";
import { ApiHipmi } from "@/app/lib/api";
import { useRouter } from "next/navigation";
import { funGetUserProfile } from "@/app_modules/fun/get_user_profile";
import { useFocusTrap } from "@mantine/hooks";
import { NotifBerhasil } from "@/app_modules/donasi/component/notifikasi/notif_berhasil";
import { NotifGagal } from "@/app_modules/donasi/component/notifikasi/notif_gagal";
import { NotifPeringatan } from "@/app_modules/donasi/component/notifikasi/notif_peringatan";

export default function Validasi() {
  const router = useRouter();
  const [nomor, setnomor] = useAtom(gs_nomor);
  const [code, setCode] = useAtom(gs_otp);

  const [inputCode, setInputOtp] = useState("");
  const focusTrapRef = useFocusTrap();

  const onValid = async () => {
    // MyConsole(inputCode)
    const body = {
      nomor: nomor,
      otp: code,
    };

    if (!inputCode) return toast("Lengkapi Kode");
    if (body.otp != inputCode) return toast("Kode Salah");

    await fetch(ApiHipmi.validasi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((val) => {
        myConsole(val);
        if (val.status == 200) {
          setTimeout(() => router.push("/dev/home"), 2000);
          funGetUserProfile(val.data.id);
          NotifBerhasil("Berhasil Login");
        } else {
          router.push("/dev/auth/register");
          NotifPeringatan("Silahkan Registrasi");
        }
      });
  };

  return (
    <>
      {/* {JSON.stringify(nomor)}
      {JSON.stringify(code)} */}
     

      <Flex
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
      </Flex>
    </>
  );
}
