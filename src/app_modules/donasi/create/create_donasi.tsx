"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  ActionIcon,
  AspectRatio,
  Box,
  Button,
  Center,
  FileButton,
  Image,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

import ComponentDonasi_NotedBox from "../component/noted_box";
import { MODEL_DONASI_ALL_MASTER } from "../model/interface";
import { useState } from "react";
import { useShallowEffect } from "@mantine/hooks";
import Donasi_funCreateTemporary from "../fun/create/fun_create_donasi_temporary";
import toast from "react-simple-toasts";
import _ from "lodash";
import { notifications } from "@mantine/notifications";
import { NotifPeringatan } from "../component/notifikasi/notif_peringatan";
import {
  ComponentGlobal_WarningMaxUpload,
  maksimalUploadFile,
} from "@/app_modules/component_global/variabel_global";
import { gs_donasi_tabs_posting } from "../global_state";

export default function CreateDonasi({
  masterKategori,
  masterDurasi,
}: {
  masterKategori: MODEL_DONASI_ALL_MASTER[];
  masterDurasi: MODEL_DONASI_ALL_MASTER[];
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const [kategori, setKategori] = useState(masterKategori);
  const [durasi, setDurasi] = useState(masterDurasi);
  const [create, setCreate] = useState({
    kategoriId: "",
    title: "",
    target: "",
    durasiId: "",
  });
  const [targetDana, setTargetDana] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imageDonasi, setImageDonasi] = useState<any | null>();
  const [tabsPostingDonasi, setTabsPostingDonasi] = useAtom(
    gs_donasi_tabs_posting
  );

  async function onCreate() {
    const body = {
      donasiMaster_KategoriId: create.kategoriId,
      donasiMaster_DurasiId: create.durasiId,
      title: create.title,
      target: targetDana,
    };

    if (_.values(body).includes("")) return NotifPeringatan("Lengkapin Data");
    if (!file) return NotifPeringatan("Lengkapi Gambar");

    const gambar = new FormData();
    gambar.append("file", file as any);

    await Donasi_funCreateTemporary(body as any, gambar).then((res) => {
      if (res.status === 201) {
        setLoading(true);
        setTabsPostingDonasi("Review");
        router.push(RouterDonasi.create_cerita_penggalang + `${res.donasiId}`);
      } else {
        toast(res.message);
      }
    });
  }

  return (
    <>
      <Stack spacing={"md"} px={"md"}>
        <ComponentDonasi_NotedBox informasi="Lengkapi semua data di bawah untuk selanjutnya mengisi cerita Penggalangan Dana!" />
        <Select
          label="Kategori"
          placeholder="Pilih kategori penggalangan dana"
          withAsterisk
          data={kategori.map((e) => ({
            value: e.id,
            label: e.name,
          }))}
          onChange={(val: string) =>
            setCreate({
              ...create,
              kategoriId: val,
            })
          }
        />

        <Stack>
          <TextInput
            withAsterisk
            label="Judul Donasi"
            placeholder="Contoh: Renovasi Masjid pada kampung, dll"
            maxLength={100}
            onChange={(val) => {
              setCreate({ ...create, title: val.target.value });
            }}
          />
          <TextInput
            icon={<Text fw={"bold"}>Rp.</Text>}
            min={0}
            withAsterisk
            label="Target Dana"
            placeholder="0"
            value={create.target}
            onChange={(val) => {
              // console.log(val.currentTarget.value, "nilai");
              const match = val.currentTarget.value
                .replace(/\./g, "")
                .match(/^[0-9]+$/);

              if (val.currentTarget.value === "")
                return setCreate({
                  ...create,
                  target: 0 + "",
                });
              if (!match?.[0]) return null;

              const nilai = val.currentTarget.value.replace(/\./g, "");
              const target = Intl.NumberFormat("id-ID").format(+nilai);

              setTargetDana(nilai);
              setCreate({
                ...create,
                target,
              });
            }}
          />
          <Select
            label="Durasi"
            placeholder="Jangka waktu penggalangan dana"
            withAsterisk
            data={durasi.map((e) => ({
              value: e.id,
              label: e.name + " " + `hari`,
            }))}
            onChange={(val: string) => setCreate({ ...create, durasiId: val })}
          />
        </Stack>

        <Stack>
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
                    setImageDonasi(buffer);
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
                  compact
                  {...props}
                  radius={"xl"}
                  variant="outline"
                  w={150}
                  leftIcon={<IconCamera />}
                >
                  Upload
                </Button>
              )}
            </FileButton>
          </Center>
          {imageDonasi ? (
            <AspectRatio ratio={1 / 1} onChange={(val) => console.log(val)}>
              <Paper radius={"sm"} withBorder>
                <Image
                  alt="Foto"
                  src={imageDonasi ? imageDonasi : "/aset/no-img.png"}
                />
              </Paper>
            </AspectRatio>
          ) : (
            <Center>
              <Text fs={"italic"} fz={10}>
                Upload poster atau gambar penggalangan !
              </Text>
            </Center>
          )}
        </Stack>
        <Button
          style={{
            transition: "0.5s",
          }}
          disabled={
            _.values(create).includes("") || file === null ? true : false
          }
          loaderPosition="center"
          loading={isLoading ? true : false}
          my={"lg"}
          radius={"xl"}
          onClick={() => onCreate()}
        >
          Selanjutnya
        </Button>
      </Stack>
    </>
  );
}
