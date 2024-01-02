"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  Stack,
  AspectRatio,
  Paper,
  Title,
  Progress,
  Grid,
  Group,
  Divider,
  ActionIcon,
  Avatar,
  Text,
  Image,
  Button,
} from "@mantine/core";
import {
  IconClover,
  IconMail,
  IconMoneybag,
  IconCircleChevronRight,
  IconMessageChatbot,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import BoxInformasiDonasi from "../../component/box_informasi";
import { useAtom } from "jotai";
import { gs_donasi_tabs_posting } from "../../global_state";
import { MODEL_DONASI } from "../../model/interface";
import { useState } from "react";
import TampilanRupiahDonasi from "../../component/tampilan_rupiah";
import ComponentCeritaPenggalangDanaDonasi from "../../component/detail_main/cerita_penggalang";
import { Donasi_funGantiStatus } from "../../fun/update/fun_ganti_status";
import { NotifBerhasil } from "../../component/notifikasi/notif_berhasil";
import { NotifPeringatan } from "../../component/notifikasi/notif_peringatan";
import { useShallowEffect } from "@mantine/hooks";

export default function DetailDraftDonasi({
  dataDonasi,
}: {
  dataDonasi: MODEL_DONASI;
}) {
  return (
    <>
      <Stack spacing={"xl"}>
        <DetailDonasi dataDonasi={dataDonasi} />
        <ComponentCeritaPenggalangDanaDonasi donasi={dataDonasi} />
        <ButtonAjukanPenggalangan dataDonasi={dataDonasi} />
      </Stack>
    </>
  );
}

function ButtonAjukanPenggalangan({
  dataDonasi,
}: {
  dataDonasi: MODEL_DONASI;
}) {
  const router = useRouter();
  const [tabsPostingDonasi, setTabsPostingDonasi] = useAtom(
    gs_donasi_tabs_posting
  );
  async function onCLick() {
    await Donasi_funGantiStatus(dataDonasi.id, "2").then((res) => {
      if (res.status === 200) {
        router.push(RouterDonasi.main_galang_dana);
        setTabsPostingDonasi("Review");
        NotifBerhasil("Berhasil Diajukan");
      } else {
        NotifPeringatan(res.message);
      }
    });
  }
  return (
    <>
      <Button
        radius={"xl"}
        bg={"orange"}
        color="orange"
        onClick={() => onCLick()}
      >
        Ajukan Penggalangan Dana
      </Button>
    </>
  );
}

function DetailDonasi({ dataDonasi }: { dataDonasi: MODEL_DONASI }) {
  const [donasi, setDonasi] = useState(dataDonasi);
  useShallowEffect(() => {
    setDonasi(dataDonasi);
  }, [dataDonasi]);
  return (
    <>
      <Stack>
        <Stack>
          <AspectRatio ratio={16 / 9}>
            <Paper radius={"md"}>
              <Image
                alt="Foto"
                src={RouterDonasi.api_image + `${donasi.imageDonasi.url}`}
              />
            </Paper>
          </AspectRatio>
          <Stack spacing={0}>
            <Title order={4}>{donasi.title}</Title>
            <Text fz={"xs"}>
              Durasi: {donasi.DonasiMaster_Durasi.name} hari
            </Text>
          </Stack>
          <Stack spacing={0}>
            <Group position="apart">
              <Stack spacing={0}>
                <Text fz={12}>Dana dibutuhkan</Text>
                <Title order={4} c="blue">
                  <TampilanRupiahDonasi nominal={+donasi.target} />
                </Title>
              </Stack>
              <Stack spacing={0}>
                <Text fz={12}>Kategori</Text>
                <Title order={4} c="blue">
                  {donasi.DonasiMaster_Ketegori.name}
                </Title>
              </Stack>
            </Group>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
