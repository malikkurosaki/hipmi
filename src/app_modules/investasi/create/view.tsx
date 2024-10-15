"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_BoxInformation,
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import {
  ComponentGlobal_WarningMaxUpload,
  maksimalUploadFile,
} from "@/app_modules/_global/component/waring_popup";
import { MODEL_DEFAULT_MASTER_OLD } from "@/app_modules/model_global/model_default_master";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  FileButton,
  Grid,
  Group,
  Image,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCamera, IconCircleCheck, IconFileTypePdf, IconUpload } from "@tabler/icons-react";
import _ from "lodash";
import { useState } from "react";
import { Investasi_ComponentButtonCreateNewInvestasi } from "../_component";

export default function InvestasiCreate({
  pencarianInvestor,
  periodeDeviden,
  pembagianDeviden,
}: {
  pencarianInvestor: MODEL_DEFAULT_MASTER_OLD[];
  periodeDeviden: MODEL_DEFAULT_MASTER_OLD[];
  pembagianDeviden: MODEL_DEFAULT_MASTER_OLD[];
}) {
  const [fileImage, setFileImage] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>();
  const [filePdf, setFilePdf] = useState<File | null>(null);
  const [fPdf, setFPdf] = useState<any | null>(null);
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
  const [target, setTarget] = useState("");
  const [harga, setHarga] = useState("");

  async function onTotalLembar({
    target,
    harga,
  }: {
    target?: number | any;
    harga?: number | any;
  }) {
    if (target !== 0 && harga !== 0) {
      const hasil: any = target / harga;
      setTotalLembar(_.floor(hasil === Infinity ? 0 : hasil));
    }
  }

  return (
    <>
      <Stack px={"xs"} spacing={40}>
        {/* Upload Image */}
        <Stack spacing={0}>
          <Box mb={"sm"}>
            <ComponentGlobal_BoxInformation informasi="Gambar investasi bisa berupa ilustrasi, poster atau foto terkait investasi" />
          </Box>
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
          <Group position="center">
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
                    setFileImage(files);
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
        <Stack spacing={"sm"}>
          <ComponentGlobal_BoxInformation informasi="File prospektus wajib untuk diupload, agar calon investor paham dengan prospek investasi yang akan anda jalankan kedepan !" />
          <ComponentGlobal_CardStyles marginBottom={"0px"}>
            {!filePdf ? (
              <Text lineClamp={1} align="center" c={"gray"}>
                Upload File Prospektus
              </Text>
            ) : (
              <Grid align="center">
                <Grid.Col span={2}></Grid.Col>
                <Grid.Col span={"auto"}>
                  <Text lineClamp={1} align="center">
                    {filePdf.name}
                  </Text>
                </Grid.Col>
                <Grid.Col span={2}>
                  <Center>
                    <IconCircleCheck color="green" />
                  </Center>
                </Grid.Col>
              </Grid>
            )}
          </ComponentGlobal_CardStyles>

          {/* {!pdf ? (
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
          )} */}
          {/* {JSON.stringify(filePdf)} */}
          <Group position="center">
            <FileButton
              accept={"application/pdf"}
              onChange={async (files: any) => {
                try {
                  const buffer = URL.createObjectURL(
                    new Blob([new Uint8Array(await files.arrayBuffer())])
                  );
                  setFPdf(buffer);
                  setFilePdf(files);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {(props) => (
                <Button
                  leftIcon={<IconCamera />}
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
        </Stack>

        <Stack>
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

              onTotalLembar({
                target: +nilai,
                harga: +value.hargaLembar,
              });

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
                  harga: +nilai,
                  target: +value.targetDana,
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

          <TextInput
            description="*Total lembar dihitung dari, Target Dana / Harga Perlembar"
            label="Total Lembar"
            value={harga === "0" ? "0" : target === "0" ? 0 : totalLembar}
            readOnly
            styles={{
              label: {
                color: "white",
              },
            }}
          />

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
        </Stack>

        <Investasi_ComponentButtonCreateNewInvestasi
          data={value}
          totalLembar={totalLembar}
          fileImage={fileImage as any}
          filePdf={filePdf as any}
        />
      </Stack>
    </>
  );
}
