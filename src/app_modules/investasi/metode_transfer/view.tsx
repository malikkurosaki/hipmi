"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
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
  MODEL_Investasi,
  MODEL_Transaksi_Investasi,
  Model_Nama_Bank,
} from "../model/model_investasi";
import { useAtom } from "jotai";
import { gs_TransferValue } from "../g_state";
import getNorekInvestasi from "../fun/get_norek";
import _ from "lodash";
import funCreateTransaksiInvestasi from "../fun/fun_create_transaksi";

// const listNoRekening = [
//   {
//     id: 1,
//     name: "BRI",
//     norek: "9065456754325643",
//   },
//   {
//     id: 2,
//     name: "BCA",
//     norek: "2304235678854332",
//   },
//   {
//     id: 3,
//     name: "BNI",
//     norek: "1104786754324564",
//   },
//   {
//     id: 4,
//     name: "BSI",
//     norek: "7076543567898976",
//   },
// ];

export default function MetodeTransferInvestasi({
  dataInvestasi,
  namaBank,
  authorId,
}: {
  dataInvestasi: MODEL_Investasi;
  namaBank: Model_Nama_Bank[];
  authorId: string;
}) {
  const [total, setTotal] = useState<any | null>(null);
  const [investasi, setInvestasi] = useState(dataInvestasi);
  const [bank, setBank] = useState(namaBank);
  const [pilihBank, setPilihBank] = useState("");
  const router = useRouter();
  const [transferValue, setTransferValue] = useAtom(gs_TransferValue);
  const [transaksi, setTransaksi] = useState<MODEL_Transaksi_Investasi>();

  async function onSubmit() {
    // Cek Nomor Rekening
    const getNorek = await getNorekInvestasi(pilihBank).then((res) => {
      if (res.status === 200) {
        setTransferValue({
          ...transferValue,
          namaBank: res.res?.name as any,
          nomorRekening: res.res?.norek as any,
        });
        return res.status;
      } else {
        toast(res.message);
      }
    });

    if (getNorek === 200) {
      // Create Transaksi
      await funCreateTransaksiInvestasi(
        transferValue as any,
        investasi.id,
        authorId
      ).then(async (res) => {
        if (res.status === 201) {
          toast(res.message);
          router.push(RouterInvestasi.transfer + `${res.res?.id}`);
        } else {
          toast(res.message);
        }
      });
    }
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
        onChange={setPilihBank}
      >
        <Flex direction={"column"} gap={"lg"} mt="xs">
          {bank.map((e) => (
            <Box key={e.id}>
              <Radio value={e.id} label={e.name} />
            </Box>
          ))}
        </Flex>
      </Radio.Group>
      <Center>
        {pilihBank === "" ? (
          <Button my={"md"} w={300} disabled radius={50}>
            Pilih
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
