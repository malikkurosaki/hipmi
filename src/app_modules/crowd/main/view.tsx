"use client";

import { Warna } from "@/app/lib/warna";
import { Button, Center, Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import toast from "react-simple-toasts";

export default function MainCrowd() {
  const router = useRouter();
  return (
    <>
      <Center>
        <Stack>
          <Text>Selamat datang di</Text>
          <Text>HIPMI Crowd Funding</Text>
          <Button
            w={300}
            radius={50}
            bg={Warna.hijau_tua}
            onClick={() => router.push("/dev/investasi/main")}
          >
            Investasi
          </Button>
          <Button
            w={300}
            bg={Warna.biru}
            radius={50}
            onClick={() => toast("Cooming Soon Feature...")}
          >
            Donasi
          </Button>
        </Stack>
      </Center>
    </>
  );
}
