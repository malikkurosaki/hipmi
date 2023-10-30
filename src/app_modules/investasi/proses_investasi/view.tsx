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
import { useCounter, useShallowEffect } from "@mantine/hooks";
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

export default function ProsesInvestasi() {
  const router = useRouter();
  // const [count, handlers] = useCounter(0, { min: 1, max: 1000 });
  const [sisaLembar, setSisaLembar] = useState(5000);
  const [hargaLembar, setHargaLembar] = useState(1000);
  const [beli, setBeli] = useState(0);
  const [total, setTotal] = useState(0);

  //   const formatter = new Intl.NumberFormat("", {
  //     style: 'currency',
  //     currency: 'RP',

  //   });

  async function onProses() {
    if (beli === 0) return toast("Masukan jumlah pembelian saham");
    if (beli < 10) return toast("Minimal pemebelian 10 Lembar");
    const hasil = hargaLembar * beli;
    setTotal(hasil);
  }

  async function onBeli() {
    router.push(RouterInvestasi.metode_transfer);
    localStorage.setItem("total_harga", total as any);
  }

  return (
    <>
      <Box px={"md"}>
        {/* Sisa Lembar Saham */}
        <Group position="apart" mb={"md"}>
          <Text>Sisa Lembar Saham</Text>
          <Text fz={23}>{sisaLembar} </Text>
        </Group>

        {/* Harga perlembar saham */}
        <Group position="apart" mb={"md"}>
          <Text>Harga Perlembar</Text>
          <Text fz={23}>Rp.{hargaLembar} </Text>
        </Group>

        {/* Lembar saham */}
        <Group position="apart" mb={"md"}>
          <Box>
            <Text>Jumlah Pembelian</Text>
            <Text fs={"italic"} fz={"xs"}>
              minimal pembelian 10 lembar
            </Text>
          </Box>
          <NumberInput
            w={100}
            value={beli}
            onChange={(val: number) => {
              setTotal(val * hargaLembar);
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
          {total < 10000 ? (
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
    </>
  );
}
