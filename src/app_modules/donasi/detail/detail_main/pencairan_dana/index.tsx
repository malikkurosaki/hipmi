"use client";

import ComponentDonasi_NotedBox from "@/app_modules/donasi/component/noted_box";
import {
  Avatar,
  Button,
  Center,
  Grid,
  Group,
  Image,
  Modal,
  Paper,
  Spoiler,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTransferIn } from "@tabler/icons-react";
import moment from "moment";

export default function PencairanDanaDonasi() {
  return (
    <>
      <Stack>
        <BoxDanaDicarikan />
        <InformasiPencairanDana />
      </Stack>
    </>
  );
}

function BoxDanaDicarikan() {
  return (
    <>
      <Paper bg={"gray.1"} p={"md"}>
        <Stack>
        <Grid>
          <Grid.Col span={6}>
            <Title order={5}>Rp. 10.000.000</Title>
            <Text fz={"xs"}>Dana sudah dicairkan</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Title order={5}>2 kali</Title>
            <Text fz={"xs"}>Pencairan dana</Text>
          </Grid.Col>
        </Grid>
        <ComponentDonasi_NotedBox informasi=" Pencairan dana akan dilakukan oleh Admin HIPMI tanpa campur tangan
            pihak manapun, jika berita pencairan dana dibawah tidak sesuai
            dengan kabar yang diberikan oleh PENGGALANG DANA. Maka pegguna lain
            dapat melaporkannya pada Admin HIPMI !"/>
        </Stack>
      </Paper>
    </>
  );
}

function InformasiPencairanDana() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} fullScreen>
        <Paper>
          <Stack>
            <Center>
              <Title order={5}>Bukti Pencairan Dana</Title>
            </Center>
            <Image alt="Foto" src={"/aset/donasi/bukti.jpg"} />
          </Stack>
        </Paper>
      </Modal>
      {Array(2)
        .fill(0)
        .map((e, i) => (
          <Paper key={i} withBorder p={"md"}>
            <Text fz={"xs"}>{moment(Date.now()).format("ll")}</Text>
            <Stack spacing={"lg"}>
              <Title order={5}>Pencairan Dana Sebesar Rp. 5.000.000</Title>
              <Spoiler
                maxHeight={50}
                hideLabel="Sembunyikan"
                showLabel="Baca Selengkapnya"
              >
                Pencairan Dana kepada pihak Penggalang dana sebesar 5 juta yang
                di transfer pada, {moment(Date.now()).format("lll")}.
              </Spoiler>
              <Center>
                <Button
                  radius={"xl"}
                  variant="outline"
                  leftIcon={<IconTransferIn />}
                  onClick={() => open()}
                >
                  Bukti Transfer
                </Button>
              </Center>
            </Stack>
          </Paper>
        ))}
    </>
  );
}
