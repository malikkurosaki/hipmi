"use client";

import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";
import { Box, Center, Loader, Stack, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconCircleCheck } from "@tabler/icons-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-simple-toasts";
import Countdown from "react-countdown";

export default function CountDownTransaksiInvestasi() {
  const router = useRouter();
  const [count, setCount] = useState<any | null>(10);
  useShallowEffect(() => {
    setTimeout(() => router.push(RouterInvestasi_OLD.status_transaksi), 10000);
  }, []);

  const PopupCD = () => <Text>Sedang di Proses</Text>;
  const countD = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return PopupCD();
    } else {
      return (
        <>
          {minutes}:{seconds}
        </>
      );
    }
  };

  return (
    <>
      <Center h={"80vh"}>
        <Stack>
          <Box>
            <Center>
              <Stack spacing={"sm"}>
                <Text>Xendit sedang memproses transaksimu</Text>
                <Center>
                  <Title order={5}>
                    <Countdown date={Date.now() + 600000} renderer={countD} />
                  </Title>
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
