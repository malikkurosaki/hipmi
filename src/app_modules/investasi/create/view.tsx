"use client";

import { ApiHipmi } from "@/app/lib/api";
import { Warna } from "@/app/lib/warna";
import { MODEL_DEFAULT_MASTER } from "@/app_modules/models/model_default_master";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Divider,
  FileButton,
  Group,
  Image,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { funCreateInvestasi } from "../fun/fun_create_investasi";
import toast from "react-simple-toasts";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { useAtom } from "jotai";
import { gs_TabPortoInvestasi, gs_investasiFooter } from "../g_state";
import { useShallowEffect } from "@mantine/hooks";

export default function InvestasiCreate({
  id,
  pencarianInvestor,
  periodeDeviden,
  pembagianDeviden,
}: {
  id: string;
  pencarianInvestor: MODEL_DEFAULT_MASTER[];
  periodeDeviden: MODEL_DEFAULT_MASTER[];
  pembagianDeviden: MODEL_DEFAULT_MASTER[];
}) {
  const router = useRouter();
  const [fl, setFl] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>();
  const [changeColor, setChangeColor] = useAtom(gs_investasiFooter);
  const [activeTab, setActiveTab] = useAtom(gs_TabPortoInvestasi);
  const [totalLembar, setTotalLembar] = useState(0);

  const [value, setValue] = useState({
    title: "",
    targetDana: 0,
    hargaLembar: 0,
    roi: 0,
    pencarianInvestorId: "",
    periodeDevidenId: "",
    pembagianDevidenId: "",
  });

  async function onSubmit() {
    const body = {
      authorId: id,
      title: value.title,
      targetDana: value.targetDana,
      hargaLembar: value.hargaLembar,
      totalLembar: totalLembar,
      roi: value.roi,
      masterPeriodeDevidenId: value.periodeDevidenId,
      masterPembagianDevidenId: value.pembagianDevidenId,
      masterPencarianInvestorId: value.pencarianInvestorId,
    };
    // toast("Berhasil disimpan")


    if (_.values(body).includes("")) return toast("Lengkapi data");
    if (!fl) return toast("File Kosong");

    const fd = new FormData();
    fd.append("file", fl);
    await funCreateInvestasi(fd, body as any).then((res) => {
      if (res.status === 201) {
        // toast(res.message);
        setChangeColor(1);
        setActiveTab("Draft");
        return router.push(RouterInvestasi.dialog_create)
      } else {
        return toast(res.message);
      }
    });
  }

  async function onTotalLembar(target: any, harga: any) {
    const hasil: any = target / harga;
    setTotalLembar(_.floor(hasil === Infinity ? 0 : hasil));
  }

  return (
    <>
      <Box>
        <AspectRatio ratio={16 / 9}>
          {img ? (
            <Image alt="" src={img} />
          ) : (
            <Image alt="" src={"/aset/no-img.png"} />
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
              <Button
                compact
                {...props}
                w={100}
                radius={50}
                bg={Warna.hijau_muda}
                // onClick={() => router.push("/dev/investasi/upload")}
              >
                <IconCamera />
              </Button>
            )}
          </FileButton>
        </Group>

        <Stack spacing={"sm"} px={"md"}>
          <TextInput
            withAsterisk
            label="Judul Investasi"
            onChange={(val) => {
              setValue({
                ...value,
                title: val.target.value,
              });
            }}
          />
          <NumberInput
            withAsterisk
            type="number"
            label="Dana Dibutuhkan"
            onChange={(val: any) => {
              setValue({
                ...value,
                targetDana: val,
              });
            }}
          />

          <NumberInput
            label="Harga Per Lembar"
            type="number"
            onChange={(val) => {
              //console.log(val)
              setValue({
                ...value,
                hargaLembar: +val,
              });
              onTotalLembar(value.targetDana, val);
            }}
          />

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
            withAsterisk
            type="number"
            label="Rasio Keuntungan / ROI"
            onChange={(val: any) => {
              setValue({
                ...value,
                roi: val,
              });
            }}
          />
          <Select
            withAsterisk
            label="Pencarian Investor"
            data={pencarianInvestor.map((e) => ({
              value: e.id,
              label: e.name + " " + "hari",
            }))}
            onChange={(val) => {
              setValue({
                ...(value as any),
                pencarianInvestorId: val,
              });
            }}
          />
          <Select
            withAsterisk
            label="Periode Deviden"
            data={periodeDeviden.map((e) => ({ value: e.id, label: e.name }))}
            onChange={(val) => {
              setValue({
                ...(value as any),
                periodeDevidenId: val,
              });
            }}
          />
          <Select
            withAsterisk
            label="Pembagian Deviden"
            data={pembagianDeviden.map((e) => ({
              value: e.id,
              label: e.name + " " + "bulan",
            }))}
            onChange={(val) => {
              setValue({
                ...(value as any),
                pembagianDevidenId: val,
              });
            }}
          />
        </Stack>

        <Center my={"lg"}>
          <Button
            w={300}
            radius={50}
            bg={Warna.biru}
            onClick={() => onSubmit()}
          >
            Simpan
          </Button>
        </Center>
      </Box>
    </>
  );
}
