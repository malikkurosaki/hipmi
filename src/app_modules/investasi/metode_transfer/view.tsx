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

const listNoRekening = [
  {
    id: 1,
    name: "BRI",
    norek: "9065456754325643",
  },
  {
    id: 2,
    name: "BCA",
    norek: "2304235678854332",
  },
  {
    id: 3,
    name: "BNI",
    norek: "1104786754324564",
  },
  {
    id: 4,
    name: "BSI",
    norek: "7076543567898976",
  },
];

export default function MetodeTransferInvestasi() {
  const [total, setTotal] = useState<any | null>(null);
  const [checked, setChecked] = useState(false);
  const [bank, setBank] = useState("");
  const router = useRouter();

  useShallowEffect(() => {
    if (typeof window !== undefined) {
      const data = localStorage.getItem("total_harga");
      setTotal(data);
    }
  }, []);

  async function onSubmit() {
    router.push(RouterInvestasi.transfer);
    localStorage.setItem("bank", bank);
  }
  return (
    <>
      {/* Box judul */}
      <Paper h={70} bg={"gray"} p={"xs"} shadow="lg" mb={"md"}>
        <Title order={5}>Judul Proyek Investasi</Title>
        <Text fz={"sm"}>Total Transfer : Rp.{total}</Text>
      </Paper>

      {/* Metode transfer */}
      <Radio.Group
        name="Metode Trf"
        label="Metode Transfer"
        description="Pilih salah satu bank"
        withAsterisk
        my={"md"}
        onChange={setBank}
      >
        <Flex direction={"column"} gap={"lg"} mt="xs">
          {listNoRekening.map((e) => (
            <Box key={e.id}>
             
              <Radio value={e.norek} label={e.name}/>
            </Box>
          ))}
        </Flex>
      </Radio.Group>
      <Center>
        {bank === "" ? (
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
            Pilih
          </Button>
        )}
      </Center>
    </>
  );
}
