"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { Warna } from "@/app/lib/warna";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Divider,
  Grid,
  Group,
  NumberInput,
  Text,
  Title,
} from "@mantine/core";
import { useCounter, useFocusTrap, useShallowEffect } from "@mantine/hooks";
import {
  IconMinus,
  IconNumber10Small,
  IconPlus,
  IconRefresh,
} from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-simple-toasts";
import { MODEL_Investasi } from "../model/model_investasi";
import { error } from "console";
import { useAtom } from "jotai";
import { gs_TransferValue } from "../g_state";

export default function ProsesInvestasi({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_Investasi;
}) {
  const router = useRouter();
  const focusTrapRef = useFocusTrap();

  const [jumlah, setJumlah] = useState(0);
  const [hargaLembar, setHargaLembar] = useState<number>(
    Number(dataInvestasi.hargaLembar)
  );
  const [total, setTotal] = useState(0);
  const [investasi, setInvestasi] = useState(dataInvestasi);
  const [maxPembelian, setMaxPembelian] = useState<number>(
    Number(dataInvestasi.totalLembar)
  );
  const [transferValue, setTransferValue] = useAtom(gs_TransferValue);

  async function onBeli() {
    setTransferValue({
      ...transferValue,
      totalTransfer: total as any,
      lembarTerbeli: jumlah as any,
    }); 
    router.push(RouterInvestasi.metode_transfer + `${investasi.id}`);
  }

  return (
    <>
      {/* <pre>{JSON.stringify(transferValue, null, 2)}</pre> */}
      <Box px={"md"}>
        {/* Sisa Lembar Saham */}
        <Group position="apart" mb={"md"}>
          <Text>Sisa Lembar Saham</Text>
          <Text fz={23}>{investasi.totalLembar} </Text>
        </Group>

        {/* Harga perlembar saham */}
        <Group position="apart" mb={"md"}>
          <Text>Harga Perlembar</Text>
          <Text fz={23}>Rp.{investasi.hargaLembar} </Text>
        </Group>

        {/* Lembar saham */}
        <Group position="apart" mb={"md"}>
          <Box>
            <Text>Jumlah Pembelian</Text>
            <Text c={"orange"} fs={"italic"} fz={10}>
              minimal pembelian 10 lembar
            </Text>
            {/* <Text c={"red"} fs={"italic"} fz={10}>
                maximal pembelian {maxPembelian} lembar
              </Text> */}
          </Box>
          <NumberInput
            type="number"
            ref={focusTrapRef}
            w={100}
            max={maxPembelian}
            onChange={(val: number) => {
              setTotal(val * hargaLembar);
              setJumlah(val);
              // console.log(val);
            }}
          />
        </Group>

        <Divider my={"lg"} />

        <Group position="apart" mb={"md"}>
          <Box>
            <Text>Total Harga</Text>
          </Box>
          <Text fz={25}>Rp.{total} </Text>
        </Group>

        <Center>
          {jumlah < 10 ? (
            <Button w={350} radius={50} bg={"gray"} disabled>
              Beli Saham
            </Button>
          ) : (
            <Button
              w={350}
              radius={50}
              bg={Warna.biru}
              onClick={() => {
                onBeli();
              }}
            >
              Beli Saham
            </Button>
          )}
        </Center>
      </Box>

      {/* <pre>{JSON.stringify(investasi, null, 2)}</pre> */}
    </>
  );
}
