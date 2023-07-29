"use client";

import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {AiOutlinePlusCircle} from "react-icons/ai"
import {useForm} from "@mantine/form"


export function LoginPage() {
  const router = useRouter();
  const formLogin = useForm({
    initialValues: {
      data: {
        // username: "",
        email: "",
        password: "",
      },
    },
  });


  //menunggu rendering client karena tampilan di mulai dirender pada server
  const [waiting, setWaiting] = useState(false);
  useShallowEffect(() => {
    if (window) setWaiting(true);
  }, []);

  if (!waiting) return <></>;
  return (
    <>
       <Box>
        <Flex
          direction={"column"}
          justify={"center"}
          align={"center"}
          h={100 + "vh"}
        >
          <Paper bg={"gray.3"} p={30} radius={30} w={300}>
            <Stack>
              <Center>
                <Title order={3}>Login</Title>
              </Center>
              <TextInput
                // label="Email / Username"
                placeholder="Email or username"
                onChange={(val) => {
                  formLogin.values.data.email = val.target.value;
                }}
              />
              <PasswordInput
                placeholder="Password"
                onChange={(val) => {
                  formLogin.values.data.password = val.target.value;
                }}
              />
              <Flex justify="center" direction={"column"} align={"center"}>
                <Button
                  color="blue.4"
                  onClick={() => {
                    console.log(formLogin.values.data)
                    router.push("/dev/landing-page")
                  }}
                >
                  Login
                </Button>
                <Link
                  href={"/dev/auth/registrasi"}
                  style={{
                    textDecorationLine: "none",
                    textDecorationColor: "GrayText",
                  }}
                >
                  <Text mt={20} fz={12}>
                    Registrasi ?
                  </Text>
                </Link>
              </Flex>
            </Stack>
          </Paper>
        </Flex>
      </Box>

    </>
  );
}
