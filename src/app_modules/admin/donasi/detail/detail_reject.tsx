"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import { MODEL_DONASI } from "@/app_modules/donasi/model/interface";
import {
  AspectRatio,
  Button,
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
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "../../_admin_global/admin_notifikasi/notifikasi_berhasil";
import ComponentAdminGlobal_BackButton from "../../_admin_global/back_button";
import ComponentAdminDonasi_CeritaPenggalangDana from "../component/tampilan_detail_cerita";
import ComponentAdminDonasi_TampilanDetailDonasi from "../component/tampilan_detail_donasi";
import { AdminDonasi_getOneById } from "../fun/get/get_one_by_id";
import { AdminDonasi_funUpdateCatatanReject } from "../fun/update/fun_update_catatan_reject";
import { ComponentAdminGlobal_NotifikasiGagal } from "../../_admin_global/admin_notifikasi/notifikasi_gagal";

export default function AdminDonasi_DetailReject({
  dataReject,
}: {
  dataReject: MODEL_DONASI;
}) {
  const [data, setData] = useState(dataReject);

  return (
    <>
      <Stack>
        <ButtonOnHeader
          catatan={data.catatan}
          donasiId={data.id}
          setDonasi={setData}
        />
        <CatatanReject catatan={data.catatan} />
        <SimpleGrid
          cols={2}
          spacing="lg"
          breakpoints={[
            { maxWidth: "md", cols: 2, spacing: "md" },
            { maxWidth: "sm", cols: 1, spacing: "sm" },
            { maxWidth: "xs", cols: 1, spacing: "xs" },
          ]}
        >
          <ComponentAdminDonasi_TampilanDetailDonasi donasi={data} />
          <ComponentAdminDonasi_CeritaPenggalangDana
            cerita={data.CeritaDonasi}
          />
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
  const [report, setReport] = useState(catatan);
  const [opened, { open, close }] = useDisclosure(false);

  async function onUpdate() {
    await AdminDonasi_funUpdateCatatanReject(donasiId, report).then(
      async (res) => {
        if (res.status === 200) {
          ComponentAdminGlobal_NotifikasiBerhasil(res.message);
          close();
          await AdminDonasi_getOneById(donasiId).then((res) => setDonasi(res));
        } else {
          ComponentAdminGlobal_NotifikasiGagal(res.message);
        }
      }
    );
  }

  return (
    <>
      <Stack>
        <Group position="apart">
          <ComponentAdminGlobal_BackButton />
          <Button radius={"xl"} bg={"orange"} color="orange" onClick={open}>
            Tambah catatan
          </Button>
        </Group>
      </Stack>

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
            maxLength={300}
            label="Update alasan penolakan"
            placeholder="Masukan alasan penolakan"
            value={report}
            onChange={(val) => setReport(val.target.value)}
          />
          <ComponentGlobal_InputCountDown
            maxInput={300}
            lengthInput={report.length}
          />

          <Group position="right">
            <Button
              radius={"xl"}
              onClick={() => {
                close();
              }}
            >
              Batal
            </Button>
            <Button
              radius={"xl"}
              onClick={() => {
                onUpdate();
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

function CatatanReject({ catatan }: { catatan: string }) {
  return (
    <>
      <Paper p={"md"} bg={"gray.1"}>
        <Stack>
          <Title order={5}>Alasan Penolakan :</Title>
          <Text>{catatan}</Text>
        </Stack>
      </Paper>
    </>
  );
}
