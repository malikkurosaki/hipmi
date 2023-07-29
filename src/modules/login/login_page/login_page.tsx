"use client";

import {
  Box,
  Button,
  Flex,
  Grid,
  Group,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginPage() {
  const router = useRouter();

  //menunggu rendering client karena tampilan di mulai dirender pada server
  const [waiting, setWaiting] = useState(false);
  useShallowEffect(() => {
    if (window) setWaiting(true);
  }, []);

  if (!waiting) return <></>;
  return (
    <>
      <Grid justify={"center"} align={"center"} h={"100vh"} w={"100"}>
        <Paper w={300} h={300} bg={"gray"}
       
        >
          
            <Group position="center">
              <Text>LOGIN</Text>
              <TextInput w={250} label="Email / Username" />
              <TextInput w={250} label="Password" />
            </Group>

            <Group position="center">
            </Group>
          
        </Paper>
      </Grid>
      {/* <Button onClick={() =>router.push("/dev/registrasi") }>Register</Button> */}
    </>
  );
}
