"use client";

import { ActionIcon, Button, Group, Header, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function ViewKatalog() {
  const router = useRouter();
  return (
    <>
      <Header height={50} px={"sm"}>
        <Group position="apart" align="center" h={50}>
          <div>
            <Button
              compact
              onClick={() => {
                router.push("/dev/home");
              }}
            >
              Back
            </Button>
          </div>
          <Title order={3}>Katalog</Title>
          <div></div>
        </Group>
      </Header>
    </>
  );
}
