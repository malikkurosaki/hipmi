"use client";

import { ApiHipmi } from "@/app/lib/api";
import { Warna } from "@/app/lib/warna";
import { MODEL_ALL_MASTER } from "@/app_modules/models/model_AllMaster";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  FileButton,
  Group,
  Image,
  Select,
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
import { gs_investasiFooter } from "../g_state";

export default function InvestasiCreate({
  id,
  pencarianInvestor,
  periodeDeviden,
  pembagianDeviden,
}: {
  id: string;
  pencarianInvestor: MODEL_ALL_MASTER[];
  periodeDeviden: MODEL_ALL_MASTER[];
  pembagianDeviden: MODEL_ALL_MASTER[];
}) {
  const router = useRouter();
  const [fl, setFl] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>();
  const [changeColor, setChangeColor] = useAtom(gs_investasiFooter)
  const [value, setValue] = useState({
    title: "",
    targetDana: "",
    hargaLembar: "",
    totalLembar: "",
    roi: "",
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
      totalLembar: value.totalLembar,
      roi: value.roi,
      masterPeriodeDevidenId: value.periodeDevidenId,
      masterPembagianDevidenId: value.pembagianDevidenId,
      masterPencarianInvestorId: value.pencarianInvestorId,
    };
    // toast("Berhasil disimpan")
    setChangeColor(true)
    return setTimeout(() => router.push(RouterInvestasi.dialog_create), 1000);


    // if (_.values(body).includes("")) return toast("Lengkapi data");
    // if (!fl) return toast("File Kosong");

    // const fd = new FormData();
    // fd.append("file", fl);
    // await funCreateInvestasi(fd, body as any).then((res) => {
    //   if (res.status === 201) {
    //     toast(res.message);
    //     return router.push("/dev/investasi/main");
    //   } else {
    //     return toast(res.message);
    //   }
    // });
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
                {...props}
                w={350}
                radius={50}
                // bg={Warna.biru}
                // onClick={() => router.push("/dev/investasi/upload")}
              >
                <IconCamera />
              </Button>
            )}
          </FileButton>
        </Group>

        <Center>
          <Box mt={"md"} w={350}>
            <TextInput
              label="Judul Proyek"
              onChange={(val) => {
                setValue({
                  ...value,
                  title: val.target.value,
                });
              }}
            />
            <TextInput
              label="Dana Dibutuhan"
              type="number"
              onChange={(val) => {
                setValue({
                  ...value,
                  targetDana: val.target.value,
                });
              }}
            />
            <TextInput
              label="Harga Per Lember"
              type="number"
              onChange={(val) => {
                setValue({
                  ...value,
                  hargaLembar: val.target.value,
                });
              }}
            />
            <TextInput
              label="Total Lembar"
              type="number"
              onChange={(val) => {
                setValue({
                  ...value,
                  totalLembar: val.target.value,
                });
              }}
            />
            <TextInput
              label="Rasio Keuntungan / ROI"
              type="number"
              onChange={(val) => {
                setValue({
                  ...value,
                  roi: val.target.value,
                });
              }}
            />
            <Select
              label="Pencarian Investor"
              data={pencarianInvestor.map((e) => ({
                value: e.id,
                label: e.name,
              }))}
              onChange={(val) => {
                setValue({
                  ...(value as any),
                  pencarianInvestorId: val,
                });
              }}
            />
            <Select
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
              label="Pembagian Deviden"
              data={pembagianDeviden.map((e) => ({
                value: e.id,
                label: e.name,
              }))}
              onChange={(val) => {
                setValue({
                  ...(value as any),
                  pembagianDevidenId: val,
                });
              }}
            />
          </Box>
        </Center>
        <Center my={"lg"}>
          <Button w={200} radius={50} onClick={() => onSubmit()}>
            Simpan
          </Button>
        </Center>
      </Box>
    </>
  );
}
