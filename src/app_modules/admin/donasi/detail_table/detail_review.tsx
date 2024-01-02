"use client";

import {
  AspectRatio,
  Button,
  Divider,
  Group,
  Image,
  Modal,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import AdminDonasi_TombolKembali from "../component/tombol_kembali";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import {
  MODEL_CERITA_DONASI,
  MODEL_DONASI,
} from "@/app_modules/donasi/model/interface";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { AdminDonasi_funUpdateStatusPublish } from "../fun/update/fun_status_publish";
import { NotifBerhasil } from "@/app_modules/donasi/component/notifikasi/notif_berhasil";
import { NotifPeringatan } from "@/app_modules/donasi/component/notifikasi/notif_peringatan";
import toast from "react-simple-toasts";
import { AdminDonasi_funUpdateStatusReject } from "../fun/update/fun_status_reject";
import _ from "lodash";
import { NotifGagal } from "@/app_modules/donasi/component/notifikasi/notif_gagal";

export default function AdminDonasi_DetailReview({
  dataReview,
}: {
  dataReview: MODEL_DONASI;
}) {
  const [donasi, setDonasi] = useState(dataReview);
  return (
    <>
      <Stack>
        <ButtonOnHeader donasi={donasi} />
        <SimpleGrid
          cols={2}
          spacing="lg"
          breakpoints={[
            { maxWidth: "md", cols: 2, spacing: "md" },
            { maxWidth: "sm", cols: 1, spacing: "sm" },
            { maxWidth: "xs", cols: 1, spacing: "xs" },
          ]}
        >
          <TampilanDetailDonasi donasi={donasi} />
          <CeritaPenggalangDana cerita={donasi.CeritaDonasi} />
        </SimpleGrid>
      </Stack>
    </>
  );
}

function ButtonOnHeader({ donasi }: { donasi: MODEL_DONASI }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [catatan, setCatatan] = useState("");

  async function onPulish() {
    await AdminDonasi_funUpdateStatusPublish(donasi.id, "1").then((res) => {
      if (res.status === 200) {
        NotifBerhasil("Berhasil Mengubah Status Donasi");
        router.back();
      } else {
        NotifPeringatan("Gagal Mengubah Status Donasi");
      }
    });
  }

  async function onReject() {
    if (catatan === "") return NotifPeringatan("Lengkapi Alasan Penolakan");

    await AdminDonasi_funUpdateStatusReject(donasi.id, "4", catatan).then(
      (res) => {
        if (res.status === 200) {
          NotifBerhasil(res.message);
          router.back()
        } else {
          NotifGagal(res.message);
        }
      }
    );
  }

  return (
    <>
      <Group position="apart">
        <AdminDonasi_TombolKembali />
        <Group>
          <Button
            radius={"xl"}
            bg={"green"}
            color="green"
            onClick={() => onPulish()}
          >
            Publish
          </Button>
          <Button radius={"xl"} bg={"red"} color="red" onClick={open}>
            Reject
          </Button>
        </Group>
      </Group>
      <Divider />

      <Modal
        opened={opened}
        onClose={close}
        centered
        size={"lg"}
        withCloseButton={false}
      >
        <Stack>
          <Textarea
            autosize
            minRows={3}
            maxRows={5}
            label="Masukan alasan penolakan"
            onChange={(val) => setCatatan(val.target.value)}
          />
          <Group position="right">
            <Button
              radius={"xl"}
              onClick={() => {
                onReject();
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}

function TampilanDetailDonasi({ donasi }: { donasi: MODEL_DONASI }) {
  return (
    <>
      <Paper radius={"md"} p={"md"}>
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
              <Group>
                <Text fz={12}>Dana dibutuhkan</Text>
                <Title order={4} c="blue">
                  <TampilanRupiahDonasi nominal={+donasi.target} />
                </Title>
              </Group>
              <Group>
                <Text fz={12}>Kategori</Text>
                <Title order={4} c="blue">
                  {donasi.DonasiMaster_Ketegori.name}
                </Title>
              </Group>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}

function CeritaPenggalangDana({ cerita }: { cerita: MODEL_CERITA_DONASI }) {
  return (
    <>
      <Stack>
        <Title order={5}>Cerita Penggalang Dana</Title>
        <Text>{cerita.pembukaan}</Text>
        <AspectRatio ratio={16 / 9}>
          <Paper radius={"md"}>
            <Image
              alt="Foto"
              src={RouterDonasi.api_gambar_cerita + `${cerita.imagesId}`}
            />
          </Paper>
        </AspectRatio>
        <Text>{cerita.cerita}</Text>
      </Stack>
    </>
  );
}
