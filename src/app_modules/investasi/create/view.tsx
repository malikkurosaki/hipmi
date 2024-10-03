"use client";

import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_WarningMaxUpload,
  maksimalUploadFile,
} from "@/app_modules/_global/component/waring_popup";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { MODEL_DEFAULT_MASTER_OLD } from "@/app_modules/model_global/model_default_master";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import mqtt_client from "@/util/mqtt_client";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Divider,
  FileButton,
  Group,
  Image,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCamera, IconUpload } from "@tabler/icons-react";
import { useAtom } from "jotai";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { funCreateInvestasi } from "../fun/fun_create_investasi";
import { gs_investas_menu, gs_investasi_status } from "../g_state";
import { ComponentGlobal_BoxUploadImage } from "@/app_modules/_global/component";

export default function InvestasiCreate({
  pencarianInvestor,
  periodeDeviden,
  pembagianDeviden,
}: {
  pencarianInvestor: MODEL_DEFAULT_MASTER_OLD[];
  periodeDeviden: MODEL_DEFAULT_MASTER_OLD[];
  pembagianDeviden: MODEL_DEFAULT_MASTER_OLD[];
}) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>();
  const [pdf, setPdf] = useState<File | null>(null);
  const [filePdf, setFilePdf] = useState<any | null>(null);

  const [changeColor, setChangeColor] = useAtom(gs_investas_menu);
  const [activeTab, setActiveTab] = useAtom(gs_investasi_status);
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
    if (!file) return ComponentGlobal_NotifikasiPeringatan("Gambar Kosong");
    if (!pdf) return ComponentGlobal_NotifikasiPeringatan("File Kosong");

    const gmbr = new FormData();
    gmbr.append("file", file as any);

    const flPdf = new FormData();
    flPdf.append("file", pdf as any);

    const res = await funCreateInvestasi(gmbr, flPdf, body as any);
    if (res.status === 201) {
      const dataNotif = {
        appId: res.data?.id,
        status: res.data?.MasterStatusInvestasi?.name,
        userId: res.data?.authorId,
        pesan: res.data?.title,
        kategoriApp: "INVESTASI",
        title: "Investasi baru",
      };

      const notif = await notifikasiToAdmin_funCreate({
        data: dataNotif as any,
      });

      if (notif.status === 201) {
        mqtt_client.publish(
          "ADMIN",
          JSON.stringify({
            count: 1,
          })
        );
        setChangeColor(1);
        setActiveTab("Review");
        setLoading(true);
        ComponentGlobal_NotifikasiBerhasil(res.message);
        router.push(RouterInvestasi_OLD.portofolio);
      }
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  }

  async function onTotalLembar({
    target,
    harga,
  }: {
    target: number;
    harga: number;
  }) {
    const hasil: any = target / harga;
    setTotalLembar(_.floor(hasil === Infinity ? 0 : hasil));
  }

  return (
    <>
      <Stack px={"xs"}>
        <Stack spacing={0}>
          <ComponentGlobal_BoxUploadImage>
            {img ? (
              <AspectRatio ratio={1 / 1} mah={265} mx={"auto"}>
                <Image
                  style={{ maxHeight: 250, margin: "auto", padding: "5px" }}
                  alt="Foto"
                  height={250}
                  src={img}
                />
              </AspectRatio>
            ) : (
              <Stack justify="center" align="center" h={"100%"}>
                <IconUpload color="white" />
                <Text fz={10} fs={"italic"} c={"white"} fw={"bold"}>
                  Upload Gambar
                </Text>
              </Stack>
            )}
          </ComponentGlobal_BoxUploadImage>

          {/* Upload Foto */}
          <Group position="center" mb={"md"}>
            <FileButton
              onChange={async (files: any) => {
                try {
                  const buffer = URL.createObjectURL(
                    new Blob([new Uint8Array(await files.arrayBuffer())])
                  );
                  // console.log(files.size);

                  if (files.size > maksimalUploadFile) {
                    ComponentGlobal_WarningMaxUpload({});
                  } else {
                    setImg(buffer);
                    setFile(files);
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
                  leftIcon={<IconCamera color="black" />}
                  radius={50}
                  bg={MainColor.yellow}
                  color="yellow"
                  c={"black"}
                >
                  Upload Gambar
                </Button>
              )}
            </FileButton>
          </Group>
        </Stack>

        {/* Upload File */}
        <Group position="center">
          {!pdf ? (
            <Paper
              w={"100%"}
              style={{
                border: `2px solid gray`,
                backgroundColor: "gray.1",
                padding: "10px",
                borderRadius: "10px",
                color: "gray",
              }}
            >
              <Text>Upload File Prospektus</Text>
            </Paper>
          ) : (
            <Paper
              w={"100%"}
              style={{
                border: `2px solid ${AccentColor.softblue}`,
                backgroundColor: AccentColor.blue,
                padding: "10px",
                borderRadius: "10px",
                color: "white",
              }}
            >
              <Text lineClamp={1}>{pdf.name}</Text>
            </Paper>
          )}
          {/* {JSON.stringify(filePdf)} */}
          <FileButton
            accept={"application/pdf"}
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
                radius={"xl"}
                bg={MainColor.yellow}
                color="yellow"
                c={"black"}
              >
                Upload File
              </Button>
            )}
          </FileButton>
        </Group>
        <TextInput
          styles={{
            label: {
              color: "white",
            },
          }}
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

        <TextInput
          styles={{
            label: {
              color: "white",
            },
          }}
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
          styles={{
            label: {
              color: "white",
            },
          }}
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

        <Stack spacing={3} style={{ color: "white" }}>
          <Text fz={"sm"} fw={500}>
            Total Lembar
          </Text>
          <Stack spacing={0}>
            <Text>{totalLembar}</Text>
            <Divider />
          </Stack>
          <Text fz={10} fs={"italic"}>
            *Total lembar dihitung dari, Target Dana : Harga Perlembar
          </Text>
        </Stack>

        <TextInput
          styles={{
            label: {
              color: "white",
            },
          }}
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
          styles={{
            label: {
              color: "white",
            },
          }}
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
          styles={{
            label: {
              color: "white",
            },
          }}
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
          styles={{
            label: {
              color: "white",
            },
          }}
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

        <Button
          my={"xl"}
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
            file === null ||
            filePdf === null
              ? true
              : false
          }
          radius={50}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
          onClick={() => onSubmit()}
        >
          Simpan
        </Button>
      </Stack>
    </>
  );
}
