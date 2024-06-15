"use client";

import { ApiHipmi } from "@/app/lib/api";
import { Warna } from "@/app/lib/warna";
import { MODEL_DEFAULT_MASTER_OLD } from "@/app_modules/model_global/model_default_master";
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
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Grid,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import {
  IconCamera,
  IconPdf,
  IconQuestionMark,
  IconUpload,
} from "@tabler/icons-react";
import _, { toNumber } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { funCreateInvestasi } from "../fun/fun_create_investasi";
import toast from "react-simple-toasts";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { useAtom } from "jotai";
import { gs_StatusPortoInvestasi, gs_investasiFooter } from "../g_state";
import { useShallowEffect } from "@mantine/hooks";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import {
  ComponentGlobal_WarningMaxUpload,
  maksimalUploadFile,
} from "@/app_modules/component_global/variabel_global";

export default function InvestasiCreate({
  id,
  pencarianInvestor,
  periodeDeviden,
  pembagianDeviden,
}: {
  id: string;
  pencarianInvestor: MODEL_DEFAULT_MASTER_OLD[];
  periodeDeviden: MODEL_DEFAULT_MASTER_OLD[];
  pembagianDeviden: MODEL_DEFAULT_MASTER_OLD[];
}) {
  const router = useRouter();
  const [fl, setFl] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>();
  const [pdf, setPdf] = useState<File | null>(null);
  const [filePdf, setFilePdf] = useState<any | null>(null);

  const [changeColor, setChangeColor] = useAtom(gs_investasiFooter);
  const [activeTab, setActiveTab] = useAtom(gs_StatusPortoInvestasi);
  const [totalLembar, setTotalLembar] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const [value, setValue] = useState({
    title: "",
    targetDana: 0,
    hargaLembar: 0,
    roi: 0,
    pencarianInvestorId: "",
    periodeDevidenId: "",
    pembagianDevidenId: "",
  });
  const [target, setTarget] = useState("");
  const [harga, setHarga] = useState("");

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

    // if (_.values(body).includes("")) return toast("Lengkapi data");
    if (!fl) return ComponentGlobal_NotifikasiPeringatan("Gambar Kosong");
    if (!pdf) return ComponentGlobal_NotifikasiPeringatan("File Kosong");

    const gmbr = new FormData();
    gmbr.append("file", fl as any);

    const flPdf = new FormData();
    flPdf.append("file", fl as any);

    await funCreateInvestasi(gmbr, flPdf, body as any).then((res) => {
      if (res.status === 201) {
        setChangeColor(1);
        setActiveTab("Review");
        setLoading(true);
        router.push(RouterInvestasi.dialog_create);
      } else {
        toast(res.message);
      }
    });
  }

  async function onTotalLembar({
    target,
    harga,
  }: {
    target: number;
    harga: number;
  }) {
    // console.log(target, "ini target");
    // console.log(harga, "ini harga");

    // if (harga === +"Nan") setTotalLembar(0);

    const hasil: any = target / harga;
    setTotalLembar(_.floor(hasil === Infinity ? 0 : hasil));
  }

  return (
    <>
      <Box>
        {/* Inputan Create */}
        <Stack spacing={"sm"} px={"md"}>
          <AspectRatio ratio={16 / 9}>
            <Paper radius={"md"} withBorder>
              {img ? (
                <Image alt="" src={img} />
              ) : (
                <Image alt="" src={"/aset/no-img.png"} />
              )}
            </Paper>
          </AspectRatio>

          {/* Upload Foto */}
          <Group position="center" mb={"md"}>
            <FileButton
              onChange={async (files: any) => {
                try {
                  const buffer = URL.createObjectURL(
                    new Blob([new Uint8Array(await files.arrayBuffer())])
                  );
                  console.log(files.size);

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
                  leftIcon={<IconUpload size={12} />}
                  compact
                  radius={50}
                  bg={Warna.hijau_muda}
                  // onClick={() => router.push("/dev/investasi/upload")}
                >
                  Upload Gambar
                </Button>
              )}
            </FileButton>
          </Group>
          {/* Upload File */}
          <Group position="center">
            {!pdf ? (
              <Paper w={"100%"} bg={"gray.3"} p={"sm"}>
                <Text opacity={"0.3"}>Upload File Prospektus</Text>
              </Paper>
            ) : (
              <Paper w={"100%"} bg={"gray.6"} p={"sm"}>
                <Text truncate>{pdf.name}</Text>
              </Paper>
            )}
            {/* {JSON.stringify(filePdf)} */}
            <FileButton
              accept="application/pdf"
              onChange={async (files: any) => {
                try {
                  const buffer = URL.createObjectURL(
                    new Blob([new Uint8Array(await files.arrayBuffer())])
                  );

                  if (files.size > maksimalUploadFile) {
                    ComponentGlobal_WarningMaxUpload({});
                  } else {
                    setFilePdf(buffer);
                    setPdf(files);
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {(props) => (
                <Button
                  leftIcon={<IconUpload size={12} />}
                  {...props}
                  compact
                  radius={"xl"}
                  bg={Warna.hijau_muda}
                >
                  Upload File
                </Button>
              )}
            </FileButton>
          </Group>
          <TextInput
            withAsterisk
            label="Judul Investasi"
            placeholder="Judul investasi"
            maxLength={100}
            onChange={(val) => {
              setValue({
                ...value,
                title: val.target.value,
              });
            }}
          />

          {/* <NumberInput
            withAsterisk
            type="number"
            label="Dana Dibutuhkan"
            placeholder="Masukan nominal dana"
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
            placeholder="Masukan nominal harga"
            onChange={(val) => {
              setValue({
                ...value,
                hargaLembar: +val,
              });
              onTotalLembar({ target: value.targetDana, harga: +val });
            }}
          /> */}

          <TextInput
            icon={<Text fw={"bold"}>Rp.</Text>}
            min={0}
            withAsterisk
            label="Dana Dibutuhkan"
            placeholder="0"
            value={target}
            onChange={(val) => {
              // console.log(typeof val)
              const match = val.currentTarget.value
                .replace(/\./g, "")
                .match(/^[0-9]+$/);

              if (val.currentTarget.value === "") return setTarget(0 + "");
              if (!match?.[0]) return null;

              const nilai = val.currentTarget.value.replace(/\./g, "");
              const targetNilai = Intl.NumberFormat("id-ID").format(+nilai);

              setTarget(targetNilai);
              setValue({
                ...value,
                targetDana: +nilai,
              });
            }}
          />

          <TextInput
            icon={<Text fw={"bold"}>Rp.</Text>}
            min={0}
            withAsterisk
            label="Harga Per Lembar"
            placeholder="0"
            value={harga}
            onChange={(val) => {
              try {
                // console.log(typeof +val.currentTarget.value);

                const match = val.currentTarget.value
                  .replace(/\./g, "")
                  .match(/^[0-9]+$/);

                if (val.currentTarget.value === "") return setHarga(0 + "");

                if (!match?.[0]) return null;

                const nilai = val.currentTarget.value.replace(/\./g, "");
                const targetNilai = Intl.NumberFormat("id-ID").format(+nilai);

                onTotalLembar({
                  target: value.targetDana,
                  harga: +nilai,
                });

                setHarga(targetNilai);
                setValue({
                  ...value,
                  hargaLembar: +nilai,
                });
              } catch (error) {
                console.log(error);
              }
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
            <Text c={"gray"} fz={10} fs={"italic"}>
              *Total lembar dihitung dari, Target Dana : Harga Perlembar
            </Text>
          </Stack>

          <TextInput
            rightSection={
              <Text fw={"bold"} c={"gray"}>
                %
              </Text>
            }
            withAsterisk
            type="number"
            label={"Rasio Keuntungan / ROI %"}
            placeholder="Masukan rasio keuntungan"
            onChange={(val) => {
              setValue({
                ...value,
                roi: _.toNumber(val.target.value),
              });
            }}
          />

          <Select
            withAsterisk
            label="Pencarian Investor"
            placeholder="Pilih batas waktu"
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
            placeholder="Pilih batas waktu"
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
            placeholder="Pilih batas waktu"
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
            style={{
              transition: "0.5s",
            }}
            loaderPosition="center"
            loading={isLoading ? true : false}
            disabled={
              value.title === "" ||
              value.hargaLembar === 0 ||
              value.targetDana === 0 ||
              value.roi === 0 ||
              value.pencarianInvestorId === "" ||
              value.periodeDevidenId === "" ||
              value.pembagianDevidenId === "" ||
              fl === null ||
              filePdf === null
                ? true
                : false
            }
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
