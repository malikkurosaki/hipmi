"use client";

import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";
import { Warna } from "@/app/lib/warna";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import {
  Box,
  Button,
  Center,
  Flex,
  Paper,
  Radio,
  Text,
  Title,
} from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_INVESTASI, MODEL_MASTER_BANK } from "../_lib/interface";
import funCreateTransaksiInvestasi from "../fun/fun_create_transaksi";
import getNorekInvestasi from "../fun/get_norek";
import { gs_TransferValue } from "../g_state";

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
        ComponentGlobal_NotifikasiBerhasil(res.message);
        router.push(RouterInvestasi_OLD.transfer + `${res.res?.id}`);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
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
        ComponentGlobal_NotifikasiGagal(res.message);
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
