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
  const [nominal, setNominal] = useState(0);
  const [prosesDonasi, setProsesDonasi] = useAtom(gs_proses_donasi);

  async function onProses(nominal: number) {
    if (nominal === 0) return NotifPeringatan("Masukan Nominal");
    if (nominal < 10000)
      return NotifPeringatan("Mohon maaf, Minimal donasi Rp. 10.000");
    setProsesDonasi({
      ...prosesDonasi,
      nominal: "" + nominal,
    });
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
            <Grid>
              <Grid.Col span={1}>
                <Title order={4}>Rp.</Title>
              </Grid.Col>
              <Grid.Col span={11}>
                <NumberInput
                  min={0}
                  type="number"
                  onChange={(val: number) => setNominal(val)}
                />
              </Grid.Col>
            </Grid>
            <Text c={"gray"} fz={"xs"}>
              Minimal Donasi Rp. 10.000
            </Text>
          </Stack>
        </Paper>
        <Button radius={"xl"} onClick={() => onProses(nominal)}>
          Lanjutan Pembayaran
        </Button>
      </Stack>
    </>
  );
}
