"use client";

import { Warna } from "@/app/lib/warna";
import { Flex, Title, TextInput, Button, Text } from "@mantine/core";
import { IconCircleLetterH } from "@tabler/icons-react";
import { gs_nomor } from "../state/state";
import { useAtom } from "jotai";
import { useState } from "react";
import { MyConsole } from "@/app/fun/my_console";
import toast from "react-simple-toasts";
import { ApiHipmi } from "@/app/lib/api";
import { useRouter } from "next/navigation";

export default function Register() {
  const route = useRouter();
  const [nomor, setNomor] = useAtom(gs_nomor);
  const [value, setValue] = useState("");

  const onRegister = async () => {
    MyConsole(value);

    const body = {
      username: value,
      nomor: nomor,
    };

    if (!body) return toast("Lengkapi username");
    if (body.username.length < 5) return toast("Username minimal 5 karakter");

    await fetch(ApiHipmi.register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((val) => {
        MyConsole(val);
        if (val.status == 201) {
          toast("Pendaftaran Berhasil");
          return route.push("/dev/home");
        } else {
          return toast(val.message);
        }
      });
  };

  return (
    <>
      <Flex
        align={"center"}
        justify={"center"}
        direction={"column"}
        gap={50}
        h={"100vh"}
      >
        <Title order={4}>Registrasi</Title>
        <IconCircleLetterH size={150} />
        <Flex direction={"column"} gap={"xl"} align={"center"}>
          <Flex direction={"column"}>
            <TextInput
              label="Username"
              placeholder="Username"
              onChange={(val) => {
                setValue(val.target.value);
              }}
            />

            <Text>Nomor : {nomor}</Text>
          </Flex>
          <Button
            radius={50}
            bg={Warna.biru}
            color="cyan"
            compact
            onClick={() => {
              onRegister();
            }}
          >
            Register
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
