"use client";

import {
  Box,
  Flex,
  Paper,
  Center,
  Title,
  TextInput,
  PasswordInput,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useShallowEffect } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RegisterPage() {
  const router = useRouter();

  //menunggu rendering client karena tampilan di mulai dirender pada server
  const [waiting, setWaiting] = useState(false);
  useShallowEffect(() => {
    if (window) setWaiting(true);
  }, []);

  const formRegister = useForm({
    initialValues: {
      data: {
        username: "",
        email: "",
        password: "",
      },
      validate: {
        email: (value: string) =>
          /^\S+@\S+$/.test(value) ? null : "Invalid email",
      },
    },
  });

  if (!waiting) return <></>;
  return (
    <>
      <div>
        <Box>
          <Flex
            direction={"column"}
            justify={"center"}
            align={"center"}
            h={100 + "vh"}
          >
            <Paper bg={"gray.5"} p={30} radius={30} w={300}>
              <Center>
                <Title order={3}>Registrasi</Title>
              </Center>
              <TextInput
                label="Username"
                placeholder="my_username"
                type="text"
                onChange={(val) => {
                  formRegister.values.data.username = val.target.value;
                }}
              />
              <TextInput
                label="Email"
                placeholder="user@gmail.com"
                type="email"
                onChange={(val) => {
                  formRegister.values.data.email = val.target.value;
                }}
              />
              <PasswordInput
                label="Password"
                onChange={(val) => {
                  formRegister.values.data.password = val.target.value;
                }}
              />

              <Flex direction={"column"}>
                <Button
                  type="submit"
                  my={10}
                  onClick={() => {
                    console.log(formRegister.values.data);
                  }}
                >
                  Sign Up
                </Button>
                <Link
                  href={"/dev/auth/login"}
                  style={{ textDecorationLine: "none" }}
                >
                  Saya sudah ada akun!
                </Link>
              </Flex>
            </Paper>
          </Flex>
        </Box>
      </div>
    </>
  );
}
