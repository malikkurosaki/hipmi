"use client";

import {
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import moment from "moment";
import { useState } from "react";

export default function StatusTransaksiInvestasi() {
  const [tgl, setTgl] = useState<any | Date>(null);

  useShallowEffect(() => {
    onDate();
  }, []);

  async function onDate() {
    const d = Date.now();
    setTgl(moment(d).format("LLL"));
  }

  return (
    <>
      <Paper bg="gray.4" radius={"md"} py={"md"}>
        <Stack>
          <Center>
            <Stack>
              <Flex direction={"column"} align={"center"}>
                <Title order={5}>Transaksi berhasil diproses</Title>
                <Text fz={10}>{tgl}</Text>
              </Flex>
              <Center>
                <Text fw={"bold"} fz={30}>
                  Rp. 300.000
                </Text>
              </Center>
            </Stack>
          </Center>
          <Stack px={"md"}>
            <Divider color="dark.1" />
            <Group position="apart">
              <Text>Penerima</Text>
              <Text fw={"bold"}>Nama Penerima</Text>
            </Group>
            <Group position="apart">
              <Text>Bank Penerima</Text>
              <Text fw={"bold"}>Nama Bank(BNI, BSI, dll)</Text>
            </Group>
            <Group position="apart">
              <Text>Nomor Rekening</Text>
              <Text fw={"bold"}>0000000000000</Text>
            </Group>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}
