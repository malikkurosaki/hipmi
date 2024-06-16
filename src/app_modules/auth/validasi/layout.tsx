"use client";

import { ActionIcon, Box, Stack } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function LayoutValidasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Stack >
      <Box
        bg={"white"}
        p={"md"}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 99,
        }}
      >
        <ActionIcon variant="transparent" onClick={() => router.back()}>
          <IconChevronLeft />
        </ActionIcon>
      </Box>
      {children}
    </Stack>
  );
}

