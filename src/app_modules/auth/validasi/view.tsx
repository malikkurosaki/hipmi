"use client";

import {
  Button,
  Center,
  Flex,
  PinInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useAtom } from "jotai";
import { valueNomor, valueOtp, valueStatus } from "../state/s_login";
import _ from "lodash";
import toast from "react-simple-toasts";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { valueCookies } from "../state/s_token";

export default function Validasi() {
  const [inputOtp, setInputOtp] = useState("");
  const [otp, setOtp] = useAtom(valueOtp);
  const [nomor, setNomor] = useAtom(valueNomor);
  const [valToken, setToken] = useAtom(valueCookies);

  const router = useRouter();

  async function onValid() {
    const body = {
      nomor: nomor,
    };

    if (_.isEmpty(inputOtp)) return toast("Masukan Pin");
    if (inputOtp != otp) return toast("Kode Salah");

    await fetch("/api/auth/validasi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((val) => {
        if (val.status == 200) {
          toast("Selamat datang");
          return setTimeout(() => router.push("/dev/home"),2000)
        } else {
          toast("Regis dulu");
          return setTimeout(() => (router.push("/dev/auth/register"), 2000));
        }
      });
  }

  return (
    <>
      {JSON.stringify(otp)}``
      {JSON.stringify(nomor)}
      <Flex
        align={"center"}
        justify={"center"}
        direction={"column"}
        gap={"xl"}
        h={"100vh"}
      >
        <Title>Validasi OTP</Title>
        <PinInput
          onChange={(val) => {
            setInputOtp(val);
          }}
        />
        <Button
          onClick={() => {
            onValid();
          }}
        >
          Submit
        </Button>
      </Flex>
    </>
  );
}
