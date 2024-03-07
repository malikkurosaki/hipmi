"use client";

import { ActionIcon, Group, Header, Title } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function ComponentForum_HeaderRataKiri({
  title,
}: {
  title: string;
}) {
  const router = useRouter();
  return (
    <>
      <Header height={50} sx={{ borderStyle: "none" }}>
        <Group h={50} px={"md"}>
          <ActionIcon
            variant="transparent"
            onClick={() => {
              router.back();
            }}
          >
            <IconX />
          </ActionIcon>
          <Title order={5}>{title}</Title>
        </Group>
      </Header>
    </>
  );
}
