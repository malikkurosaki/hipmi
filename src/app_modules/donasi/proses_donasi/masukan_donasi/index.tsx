"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  Box,
  Button,
  Grid,
  Group,
  NumberInput,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  IconChevronRight,
  IconMoodSmile,
  IconMoodSmileBeam,
  IconMoodSmileDizzy,
  IconMoodXd,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NotifPeringatan } from "../../component/notifikasi/notif_peringatan";
import { useAtom } from "jotai";
import { gs_proses_donasi } from "../../global_state";

const listNominal = [
  {
    id: 1,
    jumlah: 25000,
    icon: <IconMoodSmile />,
  },
  {
    id: 2,
    jumlah: 50000,
    icon: <IconMoodSmileBeam />,
  },
  {
    id: 3,
    jumlah: 75000,
    icon: <IconMoodSmileDizzy />,
  },
  {
    id: 4,
    jumlah: 100000,
    icon: <IconMoodXd />,
  },
];

export default function MasukanDonasi({ donasiId }: { donasiId: string }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [nominal, setNominal] = useState("");
  const [value, setValue] = useState(0);
  const [prosesDonasi, setProsesDonasi] = useAtom(gs_proses_donasi);

  async function onProses(nominal: number) {
    if (nominal === 0) return NotifPeringatan("Masukan Nominal");
    if (nominal < 10000)
      return NotifPeringatan("Mohon maaf, Minimal donasi Rp. 10.000");
    setProsesDonasi({
      ...prosesDonasi,
      nominal: "" + nominal,
    });
    setLoading(true);
    router.push(RouterDonasi.metode_pembayaran + `${donasiId}`);
  }

  return (
    <>
      <Stack>
        <Box>
          {listNominal.map((e) => (
            <Paper
              key={e.id}
              withBorder
              radius={"md"}
              p={"sm"}
              shadow="lg"
              mb={"md"}
              onClick={() => onProses(e.jumlah)}
            >
              <Group position="apart">
                <Group>
                  {e.icon}
                  <Title order={4}>
                    Rp.{" "}
                    {new Intl.NumberFormat("id-ID", {
                      maximumFractionDigits: 10,
                    }).format(e.jumlah)}
                  </Title>
                </Group>
                <IconChevronRight />
              </Group>
            </Paper>
          ))}
        </Box>
        <Paper p={"sm"} withBorder shadow="lg">
          <Stack>
            <Text>Nominal Lainnya</Text>
            <TextInput
              icon={<Text fw={"bold"}>Rp.</Text>}
              placeholder="0"
              min={0}
              value={nominal}
              onChange={(val) => {
                const match = val.currentTarget.value
                  .replace(/\./g, "")
                  .match(/^[0-9]+$/);

                if (val.currentTarget.value === "") return setNominal(0 + "");

                if (!match?.[0]) return null;

                const nilai = val.currentTarget.value.replace(/\./g, "");
                const target = Intl.NumberFormat("id-ID").format(+nilai);

                setValue(+nilai);
                setNominal(target);
              }}
            />
            <Text c={"gray"} fz={"xs"}>
              Minimal Donasi Rp. 10.000
            </Text>
          </Stack>
        </Paper>
        <Button
          loaderPosition="center"
          loading={isLoading ? true : false}
          style={{ transition: "0.5s" }}
          disabled={value === 0 || value < 10000}
          radius={"xl"}
          onClick={() => onProses(value)}
        >
          Lanjutan Pembayaran
        </Button>
      </Stack>
    </>
  );
}
