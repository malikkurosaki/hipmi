import { APIs, DIRECTORY_ID } from "@/app/lib";
import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_BoxInformation,
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_LoadImage,
} from "@/app_modules/_global/component";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { MODEL_DEFAULT_MASTER_OLD } from "@/app_modules/model_global/interface";
import {
  AspectRatio,
  Box,
  Button,
  FileButton,
  Group,
  Image,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import _ from "lodash";
import { useState } from "react";
import { MODEL_INVESTASI } from "../../_lib/interface";
import { investasi_funUpdateInvestasi } from "../../_fun";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import { Investasi_ComponentButtonUpdateDataInvestasi } from "../../_component";
import { useShallowEffect } from "@mantine/hooks";

export function Investasi_ViewEditInvestasi({
  dataInvestasi,
  pencarianInvestor,
  periodeDeviden,
  pembagianDeviden,
}: {
  dataInvestasi: any;
  pencarianInvestor: MODEL_DEFAULT_MASTER_OLD[];
  periodeDeviden: MODEL_DEFAULT_MASTER_OLD[];
  pembagianDeviden: MODEL_DEFAULT_MASTER_OLD[];
}) {
  const [data, setData] = useState<MODEL_INVESTASI>(dataInvestasi);
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>();
  const [target, setTarget] = useState("");
  const [harga, setHarga] = useState("");
  const [totalLembar, setTotalLembar] = useState<any>(data.totalLembar);

  async function onTotalLembar({
    target,
    harga,
  }: {
    target?: number | any;
    harga?: number | any;
  }) {
    if (target !== 0 && harga !== 0) {
      const hasil: any = target / harga;
      const result = _.floor(hasil === Infinity ? 0 : hasil);
      setTotalLembar(result.toString());
    }
  }

  return (
    <>
      <Stack px={"sm"}>
        <Stack spacing={0}>
          <Box mb={"sm"}>
            <ComponentGlobal_BoxInformation informasi="Gambar investasi bisa berupa ilustrasi, poster atau foto terkait investasi" />
          </Box>
          <ComponentGlobal_BoxUploadImage>
            {img ? (
              <AspectRatio ratio={1 / 1} mt={5} maw={300} mx={"auto"}>
                <Image style={{ maxHeight: 250 }} alt="Avatar" src={img} />
              </AspectRatio>
            ) : (
              <ComponentGlobal_LoadImage maw={300}  fileId={data.imageId} />
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
                  setImg(buffer);
                  setFile(files);
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

        {/* <Stack c={"white"}>
          <div>{JSON.stringify(data.targetDana)}</div>
          <div>{JSON.stringify(data.hargaLembar)}</div>
          <div>{JSON.stringify(data.totalLembar)}</div>
          <div>{JSON.stringify(totalLembar)}</div>
        </Stack> */}

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
          value={data.title}
          onChange={(val) => {
            setData({
              ...data,
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
          value={target ? target : data.targetDana}
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
              harga: +data.hargaLembar,
            });

            setTarget(targetNilai);
            setData({
              ...data,
              targetDana: nilai as string,
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
          value={harga ? harga : data.hargaLembar}
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
                target: +data.targetDana,
              });

              setHarga(targetNilai);
              setData({
                ...data,
                hargaLembar: nilai as string,
              });
            } catch (error) {
              console.log(error);
            }
          }}
        />

        <TextInput
          description="*Total lembar dihitung dari, Target Dana / Harga Perlembar"
          label="Total Lembar"
          value={harga === "0" ? "0" : target === "0" ? "0" : totalLembar}
          readOnly
          styles={{
            label: {
              color: "white",
            },

            input: {
              backgroundColor: "whitesmoke",
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
          value={data.roi}
          onChange={(val) => {
            setData({
              ...data,
              roi: val.target.value,
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
          value={data.masterPencarianInvestorId}
          onChange={(val) => {
            setData({
              ...(data as any),
              masterPencarianInvestorId: val,
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
          value={data.masterPeriodeDevidenId}
          onChange={(val) => {
            setData({
              ...(data as any),
              masterPeriodeDevidenId: val,
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
          value={data.masterPembagianDevidenId}
          onChange={(val) => {
            setData({
              ...(data as any),
              masterPembagianDevidenId: val,
            });
          }}
        />

        <Investasi_ComponentButtonUpdateDataInvestasi
          data={data as any}
          file={file as any}
          totalLembar={totalLembar}
        />
      </Stack>
    </>
  );
}
