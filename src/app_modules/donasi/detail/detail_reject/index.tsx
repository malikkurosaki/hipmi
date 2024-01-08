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
  Spoiler,
  Modal,
} from "@mantine/core";
import {
  IconClover,
  IconMail,
  IconMoneybag,
  IconCircleChevronRight,
  IconMessageChatbot,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ComponentDonasi_NotedBox from "../../component/noted_box";
import { useAtom } from "jotai";
import { gs_donasi_tabs_posting } from "../../global_state";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { MODEL_DONASI } from "../../model/interface";
import { Donasi_funGantiStatus } from "../../fun/update/fun_ganti_status";
import { NotifBerhasil } from "../../component/notifikasi/notif_berhasil";
import { NotifGagal } from "../../component/notifikasi/notif_gagal";
import ComponentDonasi_CeritaPenggalangMain from "../../component/detail_main/cerita_penggalang";
import ComponentDonasi_DetailDataGalangDana from "../../component/detail_galang_dana/detail_data_donasi";

export default function DetailRejectDonasi({
  dataReject,
}: {
  dataReject: MODEL_DONASI;
}) {
  const [donasi, setDonasi] = useState(dataReject);
  return (
    <>
      <Stack spacing={"xl"}>
        <AlasanPenolakan catatan={donasi.catatan} />
        <ComponentDonasi_DetailDataGalangDana donasi={donasi} />
        <ComponentDonasi_CeritaPenggalangMain donasi={donasi} />
        <ButtonAction donasiId={donasi.id} />
      </Stack>
    </>
  );
}

function AlasanPenolakan({ catatan }: { catatan: string }) {
  return (
    <>
      <Paper bg={"blue.1"} p={"sm"}>
        <Title order={5}>Alasan penolakan</Title>
        <Spoiler
          maxHeight={50}
          hideLabel="Sembunyikan"
          showLabel="Selengkapnya"
        >
          {catatan}
        </Spoiler>
      </Paper>
    </>
  );
}

function ButtonAction({ donasiId }: { donasiId: string }) {
  const [tabsPostingDonasi, setTabsPostingDonasi] = useAtom(
    gs_donasi_tabs_posting
  );
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

  async function onCLick() {
    await Donasi_funGantiStatus(donasiId, "3").then((res) => {
      if (res.status === 200) {
        NotifBerhasil(res.message);
        router.push(RouterDonasi.main_galang_dana);
      } else {
        NotifGagal(res.message);
      }
    });
    setTabsPostingDonasi("Draft");
  }
  async function onDelete() {
    router.push(RouterDonasi.main_galang_dana);
    setTabsPostingDonasi("Reject");
  }
  return (
    <>
      <Group position="center">
        <Button
          radius={"xl"}
          bg={"orange"}
          color="orange"
          onClick={() => onCLick()}
          compact
        >
          Edit Donasi
        </Button>
        <Button
          radius={"xl"}
          bg={"red"}
          color="red"
          onClick={() => open()}
          compact
        >
          Hapus Donasi
        </Button>
      </Group>
      <Modal
        opened={opened}
        onClose={close}
        centered
        title="Yakin menghapus Penggalanagn Dana ini ?"
      >
        <Group position="center">
          <Button radius={"xl"} variant="outline" onClick={close}>
            Batal
          </Button>
          <Button
            radius={"xl"}
            variant="outline"
            color="red"
            onClick={() => onDelete()}
          >
            Hapus
          </Button>
        </Group>
      </Modal>
    </>
  );
}
