"use client";

import {
  Button,
  Center,
  Flex,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import _ from "lodash";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-simple-toasts";
import { atom, useAtom } from "jotai";
import { randomOTP } from "../fun/fun-rondom-otp";
import { valueNomor, valueOtp, valueStatus } from "../state/s_login";

export default function Login() {
  const [nomor, setNomor] = useState("");
  const router = useRouter();
  const [otp, setOtp] = useAtom(valueOtp);
  const [inputNomor, setInputNomor] = useAtom(valueNomor)

  async function onLogin() {
    const body = {
      nomor: nomor,
      otp: randomOTP(),
    };

    if (_.values(body).includes("")) return toast("Masukan nomor anda");
    setInputNomor(body.nomor)

    await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((val) => {
        console.log(val)
        setOtp(val.body.otp);

        return router.push("/dev/auth/validasi");
      });
  }
  return (
    <>
      <Flex
        align={"center"}
        justify={"center"}
        direction={"column"}
        gap={"xl"}
        h={"100vh"}
      >
        <Title>Login</Title>
        <Text>abil: 6281339158911</Text>
        <Text>bagas: 6282340374412</Text>

        <TextInput
          type="number"
          placeholder="Nomor"
          onChange={(val) => {
            setNomor(val.target.value);
          }}
        />
        <Button
          onClick={() => {
            onLogin();
            // console.log(nomor)
          }}
        >
          Login
        </Button>
        {/* <Text
          onClick={() => {
            router.push("/dev/auth/register");
          }}
        >
          Register
        </Text> */}
      </Flex>
    </>
  );
}
