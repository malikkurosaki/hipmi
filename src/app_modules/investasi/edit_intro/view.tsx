"use client";

import { Warna } from "@/app/lib/warna";
import {
  AspectRatio,
  Button,
  Center,
  Divider,
  FileButton,
  Group,
  Image,
  Modal,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  TextInput
} from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import ComponentGlobal_ErrorInput from "@/app_modules/_global/component/error_input";
import {
  ComponentGlobal_WarningMaxUpload,
  maksimalUploadFile,
} from "@/app_modules/_global/component/waring_popup";
import { MODEL_DEFAULT_MASTER_OLD } from "@/app_modules/model_global/model_default_master";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import _ from "lodash";
import { useState } from "react";
import toast from "react-simple-toasts";
import funEditInvestasi from "../fun/fun_edit_investasi";
import { MODEL_Investasi } from "../model/model_investasi";

export default function EditIntroInvestasi({
  dataInvestasi,
  listPencarian,
  listPeriode,
  listPembagian,
}: {
  dataInvestasi: MODEL_Investasi;
  listPencarian: MODEL_DEFAULT_MASTER_OLD[];
  listPeriode: MODEL_DEFAULT_MASTER_OLD[];
  listPembagian: MODEL_DEFAULT_MASTER_OLD[];
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

      <Stack spacing={"xs"} px={"md"}>
        <AspectRatio ratio={16 / 9}>
          <Paper withBorder radius={"md"}>
            {img ? (
              <Image alt="" src={img} />
            ) : (
              <Image
                alt=""
                src={RouterInvestasi.api_gambar + `${edit_inves.imagesId}`}
              />
            )}
          </Paper>
        </AspectRatio>
        <Group position="center" mb={"md"}>
          <FileButton
            onChange={async (files: any) => {
              try {
                const buffer = URL.createObjectURL(
                  new Blob([new Uint8Array(await files.arrayBuffer())])
                );

                if (files.size > maksimalUploadFile) {
                  ComponentGlobal_WarningMaxUpload({});
                } else {
                  setImg(buffer);
                  setFl(files);
                }
              } catch (error) {
                console.log(error);
              }
            }}
            accept="image/png,image/jpeg"
          >
            {(props) => (
              <Button
                {...props}
                radius={50}
                leftIcon={<IconUpload size={12} />}
                compact
                bg={Warna.hijau_muda}
                color="green"
              >
                Upload Gambar
              </Button>
            )}
          </FileButton>
        </Group>

        <TextInput
          label="Judul Proyek"
          placeholder={"Masukan Judul"}
          value={edit_inves.title}
          maxLength={100}
          error={
            edit_inves.title === "" ? (
              <ComponentGlobal_ErrorInput text="Masukan judul" />
            ) : (
              ""
            )
          }
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
          <Text c={"blue"} fz={10}>
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
      </Stack>
    </>
  );
}
