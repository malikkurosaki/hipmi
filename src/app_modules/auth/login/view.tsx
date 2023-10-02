"use client";

import { MyConsole } from "@/app/fun/my_console";
import { randomOTP } from "@/app/fun/rondom_otp";
import { ApiHipmi } from "@/app/lib/api";
import { Warna } from "@/app/lib/warna";
import { Button, Center, Flex, Stack, TextInput, Title } from "@mantine/core";
import { getHotkeyHandler, useHotkeys } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-simple-toasts";
import { useAtom } from "jotai";
import { gs_otp, gs_nomor } from "../state/state";
import { IconCircleLetterH } from "@tabler/icons-react";

export default function Login() {
  const router = useRouter();
  const [nomor, setNomor] = useState("");
  const [inputNumber, setInputNumber] = useAtom(gs_nomor);
  const [code, setCode] = useAtom(gs_otp);

  const onLogin = async () => {
    const body = {
      nomor: nomor,
      otp: randomOTP(),
    };

    if (body.nomor.length < 10) return toast("Nomor minimal 10 digit");
    if (body.nomor.length > 13) return toast("Nomor maximal 13 digit");

    await fetch(ApiHipmi.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((val) => {
        MyConsole(val);
        if (val.status == 200) {
          toast(val.message);
          setCode(val.body.otp);
          setInputNumber(val.body.nomor);
          router.push("/dev/auth/validasi");
        } else {
          toast(val.message);
        }
      });
  };

  return (
    <>
      {/* <pre>
        {JSON.stringify(inputNumber, null, 2)}
        <br />
        {JSON.stringify(code)}
      </pre> */}

      <Flex
        h={"100vh"}
        direction={"column"}
        justify={"center"}
        align={"center"}
        gap={"lg"}
      >
        <>
          <IconCircleLetterH size={150} />
          <Title>Login</Title>

          <TextInput
            label="Phone Number"
            w={250}
            type="number"
            placeholder="62 xx xxx xxx xxx"
            // value={nomor}
            onChange={(val) => {
              setNomor(val.target.value);
            }}
          />

          <Button
            h={30}
            radius={50}
            compact
            bg={Warna.hijau_muda}
            color={"green"}
            onClick={() => {
              onLogin();
            }}
          >
            Login
          </Button>
        </>
      </Flex>
    </>
  );
}
