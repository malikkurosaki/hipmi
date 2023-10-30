"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { Box, Center, Loader, Stack, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconCircleCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function CountDownTransaksiInvestasi() {
  const router = useRouter();
  useShallowEffect(() => {
    setTimeout(() => router.push(RouterInvestasi.status_transaksi), 10000);
  }, []);

  return (
    <>
      <Center h={"80vh"}>
        <Stack>
          {/* <Box>
            <Center>
              <Text>Transfer Berhasil</Text>
            </Center>
            <Center>
              <IconCircleCheck size={100} />
            </Center>
          </Box> */}
          <Box>
            <Center>
              <Stack spacing={"sm"}>
                <Text>Xendit sedang memproses transaksimu</Text>
                <Center>
                  <Title order={5}>09:57</Title>
                </Center>
                <Center>
                  <Loader size={"xl"} variant="bars" />
                </Center>
              </Stack>
            </Center>
          </Box>
        </Stack>
      </Center>
    </>
  );
}
