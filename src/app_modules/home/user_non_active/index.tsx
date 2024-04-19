"use client";

import { Logout } from "@/app_modules/auth";
import User_Logout from "@/app_modules/auth/logout/view";
import { Center, Group, Skeleton, Stack, Text, Title } from "@mantine/core";

export default function Home_UserNotActive() {
  const listhHuruf = [
    {
      huruf: "H",
    },
    {
      huruf: "I",
    },
    {
      huruf: "P",
    },
    {
      huruf: "M",
    },
    {
      huruf: "I",
    },
  ];
  const customLOader = (
    <Center >
      <Group>
        {listhHuruf.map((e, i) => (
          <Center key={i} h={"100%"}>
            <Skeleton height={50} circle radius={"100%"} />
            <Text sx={{ position: "absolute" }} c={"gray.4"} fw={"bold"}>
              {e.huruf}
            </Text>
          </Center>
        ))}
      </Group>
    </Center>
  );
  return (
    <>
      <Center h={"100vh"}>
        <Stack align="center">
          {customLOader}
          <Title order={4} c={"gray"}>
            Tunggu Konfirmasi Admin !
          </Title>
          <User_Logout />
        </Stack>
      </Center>
    </>
  );
}
