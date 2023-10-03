"use client";

import { useAtom } from "jotai";
import {
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
import { IconCircleLetterH } from "@tabler/icons-react";
import toast from "react-simple-toasts";
import { ApiHipmi } from "@/app/lib/api";
import { useRouter } from "next/navigation";

export default function Validasi() {
  const router = useRouter();
  const [nomor, setnomor] = useAtom(gs_nomor);
  const [code, setCode] = useAtom(gs_otp);

  const [inputCode, setInputOtp] = useState("");

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
          toast("Berhasil Login");
          return router.push("/dev/home");
        } else {
          toast("Silahkan Registrasi");
          return router.push("/dev/auth/register");
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
        h={"100vh"}
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
            <Text>Enter the 6-digit OTP , we’ve just sent</Text>
            <Text>to {nomor}</Text>
          </Flex>
          <PinInput
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
