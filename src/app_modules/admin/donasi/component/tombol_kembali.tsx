"use client";

import { Group, Button } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function AdminDonasi_TombolKembali() {
  const router = useRouter();
  return (
    <>
      <Group>
        <Button
          c={"gray"}
          leftIcon={<IconChevronLeft />}
          variant="white"
          onClick={() => router.back()}
        >
          Kembali
        </Button>
      </Group>
    </>
  );
}
