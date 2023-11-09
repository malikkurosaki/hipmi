"use client";

import { Warna } from "@/app/lib/warna";
import {
  Paper,
  Grid,
  Center,
  Text,
  Title,
  Button,
  Divider,
  AspectRatio,
  Box,
  FileButton,
  Group,
  Select,
  TextInput,
  Image,
  NumberInput,
  Stack,
  Modal,
} from "@mantine/core";
import { IconCamera, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-simple-toasts";
import { MODEL_Investasi } from "../model/model_investasi";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import _ from "lodash";
import { MODEL_DEFAULT_MASTER } from "@/app_modules/models/model_default_master";
import funEditInvestasi from "../fun/fun_edit_investasi";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";

export default function EditIntroInvestasi({
  dataInvestasi,
  listPencarian,
  listPeriode,
  listPembagian,
}: {
  dataInvestasi: MODEL_Investasi;
  listPencarian: MODEL_DEFAULT_MASTER[];
  listPeriode: MODEL_DEFAULT_MASTER[];
  listPembagian: MODEL_DEFAULT_MASTER[];
}) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [scroll, scrollTo] = useWindowScroll();

  const [edit_inves, setEdit_inves] = useState(dataInvestasi);
  const [img, setImg] = useState<any | null>();
  const [fl, setFl] = useState<File | null>(null);
  const [totalLembar, setTotalLembar] = useState<number | any>(
    edit_inves.totalLembar
  );

  async function onTotalLembar(target: any, harga: any) {
    const hasil: any = target / harga;
    setTotalLembar(_.floor(hasil === Infinity ? 0 : hasil));
  }

  async function onUpdate() {
    const body = edit_inves;
    if (_.values(edit_inves).includes("")) return toast("Lengkapi data");

    const fd = new FormData();
    fd.append("file", fl as any);

    await funEditInvestasi(fd, body).then(async (res) => {
      res.status === 200
        ? (toast(res.message), router.back())
        : toast(res.message);
    });
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        title="Simpan perubahan data ?"
        withCloseButton={false}
      >
        <Group position="center">
          <Button onClick={close} bg={"red"} color="red">
            Batal
          </Button>
          <Button onClick={onUpdate} bg={Warna.hijau_muda} color="green">
            Simpan
          </Button>
        </Group>
      </Modal>

      <Box>
        <AspectRatio ratio={16 / 9}>
          {img ? (
            <Image alt="" src={img} />
          ) : (
            <Image
              alt=""
              src={RouterInvestasi.api_gambar + `${edit_inves.imagesId}`}
            />
          )}
        </AspectRatio>
        <Group position="center" mt={"md"}>
          <FileButton
            onChange={async (files: any) => {
              const buffer = URL.createObjectURL(
                new Blob([new Uint8Array(await files.arrayBuffer())])
              );
              setImg(buffer);
              setFl(files);
            }}
            accept="image/png,image/jpeg"
          >
            {(props) => (
              <Button {...props} radius={50}>
                <IconCamera />
              </Button>
            )}
          </FileButton>
        </Group>

        <Center>
          <Box mt={"md"} w={350}>
            <TextInput
              label="Judul Proyek"
              placeholder={"Masukan Judul"}
              value={edit_inves.title}
              onChange={(val) => {
                setEdit_inves({
                  ...edit_inves,
                  title: val.target.value,
                });
              }}
            />

            <NumberInput
              label="Dana Dibutuhan"
              type="number"
              value={+edit_inves.targetDana}
              onChange={(val) => {
                setEdit_inves({
                  ...edit_inves,
                  targetDana: val as any,
                });
              }}
            />

            <NumberInput
              label="Harga Per Lember"
              type="number"
              value={+edit_inves.hargaLembar}
              onChange={(val) => {
                setEdit_inves({
                  ...edit_inves,
                  hargaLembar: val as any,
                });
                onTotalLembar(edit_inves.targetDana, val);
              }}
            />

            {/* Total Lembar */}
            <Stack spacing={3}>
              <Text fz={"sm"} fw={500}>
                Total Lembar
              </Text>
              <Stack spacing={0}>
                <Text>{totalLembar}</Text>
                <Divider />
              </Stack>
              <Text c={"red"} fz={10}>
                *Total lembar dihitung dari, Target Dana : Harga Perlembar
              </Text>
            </Stack>

            <NumberInput
              label="Rasio Keuntungan / ROI"
              type="number"
              value={+edit_inves.roi}
              onChange={(val) => {
                setEdit_inves({
                  ...edit_inves,
                  roi: val as any,
                });
              }}
            />

            {/* Select Start */}
            <Select
              label="Pencarian Investor"
              data={listPencarian.map((e) => ({
                value: e.id,
                label: e.name + " " + "hari",
              }))}
              value={edit_inves.MasterPencarianInvestor.id}
              onChange={(val) => {
                setEdit_inves({
                  ...(edit_inves as any),
                  MasterPencarianInvestor: {
                    id: val,
                  },
                });
              }}
            />
            <Select
              label="Periode Deviden"
              data={listPeriode.map((e) => ({
                value: e.id,
                label: e.name,
              }))}
              value={edit_inves.MasterPeriodeDeviden.id}
              onChange={(val) => {
                setEdit_inves({
                  ...(edit_inves as any),
                  MasterPeriodeDeviden: {
                    id: val,
                  },
                });
              }}
            />
            <Select
              label="Pembagian Deviden"
              data={listPembagian.map((e) => ({
                value: e.id,
                label: e.name + " " + `${"bulan"}`,
              }))}
              value={edit_inves.MasterPembagianDeviden.id}
              onChange={(val) => {
                setEdit_inves({
                  ...(edit_inves as any),
                  MasterPembagianDeviden: {
                    id: val,
                  },
                });
              }}
            />
            {/* Select End */}
          </Box>
        </Center>
        <Center my={"lg"}>
          <Button
            w={200}
            radius={50}
            bg={Warna.hijau_muda}
            color="green"
            onClick={() => {
              scrollTo({ y: 0 });
              open();
            }}
          >
            Update
          </Button>
        </Center>
      </Box>
    </>
  );
}
