"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import ComponentGlobal_ErrorInput from "@/app_modules/_global/component/error_input";
import {
  ComponentGlobal_WarningMaxUpload,
  maksimalUploadFile,
} from "@/app_modules/_global/component/waring_popup";
import {
  AspectRatio,
  Button,
  Center,
  FileButton,
  Image,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCamera } from "@tabler/icons-react";
import { useAtom } from "jotai";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NotifBerhasil } from "../../component/notifikasi/notif_berhasil";
import { NotifPeringatan } from "../../component/notifikasi/notif_peringatan";
import { Donasi_funUpdateDonasi } from "../../fun/update/fun_update_donasi";
import { gs_donasi_tabs_posting } from "../../global_state";
import { MODEL_DONASI, MODEL_DONASI_ALL_MASTER } from "../../model/interface";
import { AccentColor, MainColor } from "@/app_modules/_global/color/color_pallet";

export default function EditDonasi({
  dataDonasi,
  masterKategori,
  masterDurasi,
}: {
  dataDonasi: MODEL_DONASI;
  masterKategori: MODEL_DONASI_ALL_MASTER[];
  masterDurasi: MODEL_DONASI_ALL_MASTER[];
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const [tabsPostingDonasi, setTabsPostingDonasi] = useAtom(
    gs_donasi_tabs_posting
  );
  const [value, setValue] = useState(dataDonasi);
  const [kategori, setKategori] = useState(masterKategori);
  const [durasi, setDurasi] = useState(masterDurasi);
  const [file, setFile] = useState<File | null>(null);
  const [updateImage, setUpdateImage] = useState<any | null>();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      {/* <pre>{JSON.stringify(donasi, null, 2)}</pre> */}
      <Stack spacing={"md"} px={"md"}>
        <Select
          styles={{
            label: {
              color: "white",
            },
          }}
          label="Kategori"
          placeholder="Pilih kategori penggalangan dana"
          value={value.DonasiMaster_Ketegori.id}
          withAsterisk
          data={kategori.map((e) => ({
            value: e.id,
            label: e.name,
          }))}
          onChange={(val) =>
            setValue({
              ...(value as any),
              DonasiMaster_Ketegori: {
                id: val,
              },
            })
          }
        />
        <Stack>
          <AspectRatio ratio={1 / 1} mah={300}>
            <Paper
              style={{
                border: `2px solid ${AccentColor.blue}`,
                backgroundColor: AccentColor.darkblue,
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <Image
                alt="Foto"
                src={
                  updateImage
                    ? updateImage
                    : RouterDonasi.api_gambar + `${value.imagesId}`
                }
                maw={200}
              />
            </Paper>
          </AspectRatio>
          <Center>
            <FileButton
              onChange={async (files: any | null) => {
                try {
                  const buffer = URL.createObjectURL(
                    new Blob([new Uint8Array(await files.arrayBuffer())])
                  );

                  if (files.size > maksimalUploadFile) {
                    ComponentGlobal_WarningMaxUpload({});
                  } else {
                    setUpdateImage(buffer);
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
                  radius={"xl"}
                  leftIcon={<IconCamera />}
                  bg={MainColor.yellow}
                  color="yellow"
                  c={"black"}
                >
                  Upload
                </Button>
              )}
            </FileButton>
          </Center>
        </Stack>
        <Stack>
          <TextInput
            styles={{
              label: {
                color: "white",
              },
            }}
            withAsterisk
            label="Judul Donasi"
            placeholder="Contoh: Renovasi Masjid pada kampung, dll"
            value={value.title}
            maxLength={100}
            error={
              value.title === "" ? (
                <ComponentGlobal_ErrorInput text="Masukan judul" />
              ) : (
                ""
              )
            }
            onChange={(val) =>
              setValue({
                ...value,
                title: val.target.value,
              })
            }
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
            label="Target Dana"
            placeholder="0"
            value={value.target}
            error={
              value.target === "" || value.target === "0" ? (
                <ComponentGlobal_ErrorInput text="Masukan target dana" />
              ) : (
                ""
              )
            }
            onChange={(val) => {
              const match = val.currentTarget.value
                .replace(/\./g, "")
                .match(/^[0-9]+$/);

              if (val.currentTarget.value === "")
                return setValue({
                  ...value,
                  target: 0 + "",
                });
              if (!match?.[0]) return null;

              const nilai = val.currentTarget.value.replace(/\./g, "");
              const target = Intl.NumberFormat("id-ID").format(+nilai);

              setValue({
                ...value,
                target: target,
              });
            }}
          />
          <Select
            styles={{
              label: {
                color: "white",
              },
            }}
            label="Durasi"
            placeholder="Jangka waktu penggalangan dana"
            withAsterisk
            value={value.DonasiMaster_Durasi.id}
            data={durasi.map((e) => ({
              value: e.id,
              label: e.name + " " + `hari`,
            }))}
            onChange={(val) =>
              setValue({
                ...(value as any),
                DonasiMaster_Durasi: {
                  id: val,
                },
              })
            }
          />
        </Stack>
        <Button
          style={{
            transition: "0.5s",
          }}
          disabled={value.title === "" || value.target === "0" ? true : false}
          loaderPosition="center"
          loading={isLoading ? true : false}
          my={"lg"}
          radius={"xl"}
          onClick={() => {
            onUpdate(value, file as any, router);
          }}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
        >
          Update
        </Button>
      </Stack>
    </>
  );
}

async function onUpdate(value: MODEL_DONASI, file: FormData, router: any) {
  const body = {
    id: value.id,
    donasiMaster_KategoriId: value.DonasiMaster_Ketegori.id,
    donasiMaster_DurasiId: value.DonasiMaster_Durasi.id,
    title: value.title,
    target: value.target,
    imagesId: value.imagesId,
  };

  const gambar = new FormData();
  gambar.append("file", file as any);

  if (_.values(body).includes("")) return NotifPeringatan("Lengkapi Data");

  await Donasi_funUpdateDonasi(body as any, gambar).then((res) => {
    if (res.status === 200) {
      NotifBerhasil(res.message);
      router.back();
    } else {
      NotifPeringatan(res.message);
    }
  });
}
