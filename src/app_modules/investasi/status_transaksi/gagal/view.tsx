"use client"

import { Paper, Stack, Center, Flex, Title, Divider, Group, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconAlertHexagon } from "@tabler/icons-react";
import moment from "moment";
import { useState } from "react";

export default function StatusTransaksiInvestasi_Gagal(){
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
                <Title order={5}>Transaksi Gagal</Title>
                <Text fz={10}>{tgl}</Text>
              </Flex>
              <Center>
               <Stack>
                <Center>
                <IconAlertHexagon size={100} color="red"/>
                </Center>
               <Text fw={"bold"} >
                  Rp. 300.000
                </Text>
               </Stack>
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