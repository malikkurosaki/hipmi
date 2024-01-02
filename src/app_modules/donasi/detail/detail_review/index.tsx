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
import { NotifPeringatan } from "../../component/notifikasi/notif_peringatan";
import { NotifBerhasil } from "../../component/notifikasi/notif_berhasil";

export default function DetailReviewDonasi({
  dataDonasi,
}: {
  dataDonasi: MODEL_DONASI;
}) {
  const [donasi, setDonasi] = useState(dataDonasi);
  return (
    <>
      <Stack spacing={"xl"}>
        <DetailDonasi donasi={donasi} />
        <ComponentCeritaPenggalangDanaDonasi donasi={donasi} />
        <ButtonBatalReview donasi={donasi} />
      </Stack>
    </>
  );
}

function ButtonBatalReview({ donasi }: { donasi: MODEL_DONASI }) {
  const router = useRouter();
  const [tabsPostingDonasi, setTabsPostingDonasi] = useAtom(
    gs_donasi_tabs_posting
  );

  async function onCLick() {
    await Donasi_funGantiStatus(donasi.id, "3").then((res) => {
      if (res.status === 200) {
        router.push(RouterDonasi.main_galang_dana);
        setTabsPostingDonasi("Draft");
        NotifBerhasil("Berhasil Dibatalkan");
      } else {
        NotifPeringatan(res.message);
      }
    });
  }
  return (
    <>
      <Button radius={"xl"} bg={"red"} color="red" onClick={() => onCLick()}>
        Batalkan Review
      </Button>
    </>
  );
}

function DetailDonasi({ donasi }: { donasi: MODEL_DONASI }) {
  const router = useRouter();
  return (
    <>
      <Stack>
        <Stack>
          <AspectRatio ratio={16 / 9}>
            <Paper radius={"md"}>
              <Image
                alt="Foto"
                src={RouterDonasi.api_gambar + `${donasi.imagesId}`}
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
