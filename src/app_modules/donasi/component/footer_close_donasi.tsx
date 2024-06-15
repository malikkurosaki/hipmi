"use client";

import { Footer, Center, Button } from "@mantine/core";
import { useRouter } from "next/navigation";


export default function FooterDonasi() {
    const router = useRouter()
  return (
    <>
      <Footer height={70} px={"md"}>
        <Center h={"100%"}>
          <Button w={"100%"} radius={"xl"} onClick={() => router.back()}>
            Tutup
          </Button>
        </Center>
      </Footer>
    </>
  );
}
