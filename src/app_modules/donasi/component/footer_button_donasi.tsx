"use client";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { Footer, Center, Button } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function ButtonDonasi() {
  const router = useRouter();
  return (
    <>
      <Footer height={70} px={"md"} sx={{ borderStyle: "none" }}>
        <Center h={70}>
          <Button
            w={"100%"}
            radius={"xl"}
            onClick={() => router.push(RouterDonasi.masukan_donasi)}
          >
            Donasi
          </Button>
        </Center>
      </Footer>
    </>
  );
}
