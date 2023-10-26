"use client";

import { Warna } from "@/app/lib/warna";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Divider,
  Grid,
  Group,
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
  const [count, handlers] = useCounter(0, { min: 1, max: 1000 });
  const [hargaLembar, setHargaLembar] = useState(1000);


  //   const formatter = new Intl.NumberFormat("", {
  //     style: 'currency',
  //     currency: 'RP',

  //   });

  

  return (
    <>
      <Box px={"md"}>
        <Group position="apart" mb={"md"}>
          <Text>Lembar Saham</Text>
          <Group position="center">
            <ActionIcon variant="filled" radius={50} onClick={handlers.reset}>
              <IconRefresh />
            </ActionIcon>

            <ActionIcon
              variant="filled"
              radius={50}
              onClick={handlers.decrement}
            >
              <IconMinus />
            </ActionIcon>
            {/* Jumlah saham  */}
            <Text>{count}</Text>
            <ActionIcon
              variant="filled"
              radius={50}
              onClick={handlers.increment}
            >
              <IconPlus />
            </ActionIcon>
            <ActionIcon
              variant="filled"
              radius={50}
              onClick={() => handlers.set(1000)}
            >
              <IconNumber10Small />
            </ActionIcon>
          </Group>
        </Group>

        <Group position="apart" mb={"md"}>
          <Text>Harga Perlembar</Text>
          <Text fz={23}>Rp.{hargaLembar} </Text>
        </Group>

        <Divider />
        <Group position="apart" mb={"md"}>
          <Text>Total Harga</Text>
          <Text fz={25}>Rp.{hargaLembar * count} </Text>
        </Group>
        <Center>
          <Button
            w={350}
            radius={50}
            bg={Warna.biru}
            onClick={() => {
             
              if(hargaLembar * count === 1000){
                return toast("Minimal pembelian 10.000")
              } else {
                router.push("/dev/investasi/upload_bukti");
                localStorage.setItem("total_harga", (hargaLembar * count) as any)
              }
            }}
          >
            Proses
          </Button>
        </Center>
      </Box>
    </>
  );
}
