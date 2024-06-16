"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import ComponentDonasi_NotedBox from "@/app_modules/donasi/component/noted_box";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import {
  MODEL_DONASI,
  MODEL_DONASI_PENCAIRAN_DANA,
} from "@/app_modules/donasi/model/interface";
import {
  AspectRatio,
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
import { useState } from "react";

export default function PencairanDanaDonasi({
  totalAkumulasi,
  listPencairan,
}: {
  totalAkumulasi: MODEL_DONASI;
  listPencairan: MODEL_DONASI_PENCAIRAN_DANA[];
}) {
  const [akumulasi, setAkumulasi] = useState(totalAkumulasi);
  const [listPD, setListPD] = useState(listPencairan);
  return (
    <>
      <Stack>
        <BoxDanaDicarikan akumulasi={akumulasi} />
        <InformasiPencairanDana listPD={listPD} />
      </Stack>
    </>
  );
}

function BoxDanaDicarikan({ akumulasi }: { akumulasi: MODEL_DONASI }) {
  return (
    <>
      <Paper bg={"gray.1"} p={"md"}>
        <Stack>
          <Grid>
            <Grid.Col span={6}>
              <Title order={5}>
                <TampilanRupiahDonasi nominal={akumulasi.totalPencairan} />
              </Title>
              <Text fz={"xs"}>Dana sudah dicairkan</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Title order={5}>{akumulasi.akumulasiPencairan} kali</Title>
              <Text fz={"xs"}>Pencairan dana</Text>
            </Grid.Col>
          </Grid>
          <ComponentDonasi_NotedBox
            informasi=" Pencairan dana akan dilakukan oleh Admin HIPMI tanpa campur tangan
            pihak manapun, jika berita pencairan dana dibawah tidak sesuai
            dengan kabar yang diberikan oleh PENGGALANG DANA. Maka pegguna lain
            dapat melaporkannya pada Admin HIPMI !"
          />
        </Stack>
      </Paper>
    </>
  );
}

function InformasiPencairanDana({
  listPD,
}: {
  listPD: MODEL_DONASI_PENCAIRAN_DANA[];
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [idGambar, setIdGambar] = useState("");
  return (
    <>
      <Modal opened={opened} onClose={close} size={"xl"}>
        <AspectRatio ratio={9 / 16}>
          <Paper>
            <Image
              alt="Foto"
              src={RouterDonasi.api_gambar_pencairan + `${idGambar}`}
            />
          </Paper>
        </AspectRatio>
      </Modal>
      {listPD.map((e, i) => (
        <Paper key={i} withBorder p={"md"}>
          <Text fz={"xs"}>{moment(e.createdAt).format("ll")}</Text>
          <Stack spacing={"lg"}>
            <Title order={5}>{e.title}</Title>
            <Spoiler
              maxHeight={50}
              hideLabel="Sembunyikan"
              showLabel="Baca Selengkapnya"
            >
              {e.deskripsi}
            </Spoiler>
            <Center>
              <Button
                radius={"xl"}
                variant="outline"
                leftIcon={<IconTransferIn />}
                onClick={() => {
                  open();
                  setIdGambar(e.imagesId);
                }}
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
