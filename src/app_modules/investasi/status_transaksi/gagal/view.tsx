"use client";

import {
  Paper,
  Stack,
  Center,
  Flex,
  Title,
  Divider,
  Group,
  Text,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconAlertHexagon } from "@tabler/icons-react";
import moment from "moment";
import { useState } from "react";
import { MODEL_Transaksi_Investasi } from "../../_lib/interface";

export default function StatusTransaksiInvestasi_Gagal({
  dataTransaksi,
}: {
  dataTransaksi: MODEL_Transaksi_Investasi;
}) {
  const [transaksi, setTransaksi] = useState(dataTransaksi)

  return (
    <>
      <Paper bg="gray.4" radius={"md"} py={"md"}>
        <Stack>
          <Center>
            <Stack>
              <Flex direction={"column"} align={"center"}>
                <Title order={5}>Transaksi Gagal</Title>
                <Text fz={10}>{moment(transaksi.createdAt).format('lll')}</Text>
              </Flex>
              <Center>
                <Stack>
                  <Center>
                    <IconAlertHexagon size={100} color="red" />
                  </Center>
                  {/* <Text fw={"bold"}>Rp. {transaksi.totalTransfer}</Text> */}
                </Stack>
              </Center>
            </Stack>
          </Center>
          <Stack px={"md"}>
            <Divider color="dark.1" />
            <Group position="apart">
              <Text>Nama Investasi</Text>
              <Text fw={"bold"}>{transaksi.Investasi.title}</Text>
            </Group>
            <Group position="apart">
              <Text>Bank Tujuan</Text>
              <Text fw={"bold"}>{transaksi.namaBank}</Text>
            </Group>
            <Group position="apart">
              <Text>Jumlah Transfer</Text>
              {/* <Text fw={"bold"}>Rp. {transaksi.totalTransfer}</Text> */}
            </Group>
            <Group position="apart">
              <Text>Jumlah Lembar</Text>
              {/* <Text fw={"bold"}>{transaksi.lembarTerbeli}</Text> */}
            </Group>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}
