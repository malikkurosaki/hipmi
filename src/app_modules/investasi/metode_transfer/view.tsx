"use client";

import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";
import { Warna } from "@/app/lib/warna";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Paper,
  Radio,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-simple-toasts";
import {
  MODEL_INVESTASI,
  MODEL_Transaksi_Investasi,
  MODEL_MASTER_BANK,
} from "../_lib/interface";
import { useAtom } from "jotai";
import { gs_TransferValue } from "../g_state";
import getNorekInvestasi from "../fun/get_norek";
import _ from "lodash";
import funCreateTransaksiInvestasi from "../fun/fun_create_transaksi";
import { myConsole } from "@/app/fun/my_console";

export default function MetodeTransferInvestasi({
  dataInvestasi,
  namaBank,
  authorId,
}: {
  dataInvestasi: MODEL_INVESTASI;
  namaBank: MODEL_MASTER_BANK[];
  authorId: string;
}) {
  const [investasi, setInvestasi] = useState(dataInvestasi);
  const [bank, setBank] = useState(namaBank);
  const [pilihBank, setPilihBank] = useState<string | null>(null);
  const router = useRouter();
  const [transferValue, setTransferValue] = useAtom(gs_TransferValue);

  async function onSubmit() {
    // Create Transaksi
    await funCreateTransaksiInvestasi(
      transferValue as any,
      investasi.id,
      authorId
    ).then(async (res) => {
      if (res.status === 201) {
        toast(res.message);
        router.push(RouterInvestasi_OLD.transfer + `${res.res?.id}`);
      } else {
        toast(res.message);
      }
    });
  }

  async function onSelect(id: string) {
    await getNorekInvestasi(id).then((res) => {
      if (res.status === 200) {
        setTransferValue({
          ...transferValue,
          namaBank: res.res?.namaBank as any,
          nomorRekening: res.res?.norek as any,
        });
      } else {
        toast(res.message);
      }
    });
  }

  return (
    <>
      {/* <pre>{JSON.stringify(transferValue, null, 2)}</pre> */}
      {/* Box judul */}
      <Paper bg={"gray"} p={"xs"} shadow="lg" mb={"md"}>
        <Title order={5}>{investasi.title}</Title>
        <Text fz={"sm"}>Total Transfer : Rp.{transferValue.totalTransfer}</Text>
      </Paper>

      {/* Metode transfer */}
      <Radio.Group
        name="Metode Trf"
        label="Metode Transfer"
        description="Pilih salah satu bank"
        withAsterisk
        my={"md"}
        onChange={(val) => {
          setPilihBank(val);
          onSelect(val);
        }}
        value={"" + pilihBank}
      >
        <Flex direction={"column"} gap={"lg"} mt="xs">
          {bank.map((e) => (
            <Box key={e.id}>
              <Radio value={e.id} label={e.namaBank} />
            </Box>
          ))}
        </Flex>
      </Radio.Group>

      <Center>
        {pilihBank === null ? (
          <Button my={"md"} w={300} disabled radius={50}>
            Pilih Bank
          </Button>
        ) : (
          <Button
            my={"md"}
            w={300}
            bg={Warna.biru}
            radius={50}
            onClick={() => {
              onSubmit();
            }}
          >
            Lanjutkan Untuk Transfer
          </Button>
        )}
      </Center>
    </>
  );
}
