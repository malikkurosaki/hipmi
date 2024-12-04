"use client";

import { Footer, Center, Button } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function FooterDonasi() {
  const router = useRouter();
  return (
    <>
      <Center h={"100%"}>
        <Button w={"80%"} radius={"xl"} onClick={() => router.back()}>
          Tutup
        </Button>
      </Center>
    </>
  );
}
