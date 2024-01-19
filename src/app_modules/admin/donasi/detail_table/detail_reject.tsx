"use client";

import { MODEL_DONASI } from "@/app_modules/donasi/model/interface";
import {
  AspectRatio,
  Button,
  Divider,
  Group,
  Image,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { useState } from "react";
import ComponentAdminDonasi_TombolKembali from "../component/tombol_kembali";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import { useDisclosure } from "@mantine/hooks";
import { AdminDonasi_funUpdateCatatanReject } from "../fun/update/fun_update_catatan_reject";
import { NotifBerhasil } from "@/app_modules/donasi/component/notifikasi/notif_berhasil";
import { NotifGagal } from "@/app_modules/donasi/component/notifikasi/notif_gagal";
import { AdminDonasi_getOneById } from "../fun/get/get_one_by_id";

export default function AdminDonasi_DetailReject({
  dataReject,
}: {
  dataReject: MODEL_DONASI;
}) {
  const [donasi, setDonasi] = useState(dataReject);

  return (
    <>
      <Stack>
        <ButtonOnHeader
          catatan={donasi.catatan}
          donasiId={donasi.id}
          setDonasi={setDonasi}
        />
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
          <CatatanReject catatan={donasi.catatan} />
        </SimpleGrid>
      </Stack>
    </>
  );
}

function ButtonOnHeader({
  catatan,
  donasiId,
  setDonasi,
}: {
  catatan: string;
  donasiId: string;
  setDonasi: any;
}) {
  const [catat, setCatat] = useState(catatan);
  const [opened, { open, close }] = useDisclosure(false);

  async function onUpdate() {
    await AdminDonasi_funUpdateCatatanReject(donasiId, catat).then(
      async (res) => {
        if (res.status === 200) {
          NotifBerhasil(res.message);
          close();
          await AdminDonasi_getOneById(donasiId).then((res) => setDonasi(res));
        } else {
          NotifGagal(res.message);
        }
      }
    );
  }

  return (
    <>
      <Stack>
        <Group position="apart">
          <ComponentAdminDonasi_TombolKembali />
          <Button radius={"xl"} bg={"orange"} color="orange" onClick={open}>
            Tambah catatan
          </Button>
        </Group>
        <Divider />
      </Stack>
      <Modal
        opened={opened}
        onClose={close}
        centered
        title="Tambah catatan penolakan"
      >
        <Stack>
          <Textarea
            value={catat}
            onChange={(val) => setCatat(val.target.value)}
          />
          <Group position="right">
            <Button radius="xl" onClick={() => onUpdate()}>
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

function CatatanReject({ catatan }: { catatan: string }) {
  return (
    <>
      <Stack>
        <Title order={6}>Alasan Penolakan</Title>
        <Text>{catatan}</Text>
      </Stack>
    </>
  );
}
