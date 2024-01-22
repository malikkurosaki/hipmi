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

export default function CreateDonasi({
  masterKategori,
  masterDurasi,
}: {
  masterKategori: MODEL_DONASI_ALL_MASTER[];
  masterDurasi: MODEL_DONASI_ALL_MASTER[];
}) {
  const router = useRouter();
  const [kategori, setKategori] = useState(masterKategori);
  const [durasi, setDurasi] = useState(masterDurasi);
  const [create, setCreate] = useState({
    kategoriId: "",
    title: "",
    target: "",
    durasiId: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [imageDonasi, setImageDonasi] = useState<any | null>();

  async function onCreate() {
    const body = {
      donasiMaster_KategoriId: create.kategoriId,
      donasiMaster_DurasiId: create.durasiId,
      title: create.title,
      target: create.target,
    };

    if (_.values(body).includes("")) return NotifPeringatan("Lengkapin Data");
    if (!file) return NotifPeringatan("Lengkapi Gambar");

    const gambar = new FormData();
    gambar.append("file", file as any);

    await Donasi_funCreateTemporary(body as any, gambar).then((res) => {
      if (res.status === 201) {
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
            onChange={(val) =>
              setCreate({ ...create, title: val.target.value })
            }
          />
          <TextInput
            type="number"
            withAsterisk
            label="Target Dana"
            placeholder="Masukan nominal angka"
            onChange={(val) =>
              setCreate({ ...create, target: val.target.value })
            }
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
                  // console.log(buffer, "ini buffer");
                  // console.log(files, " ini file");
                  setImageDonasi(buffer);
                  setFile(files);
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
            <AspectRatio ratio={16 / 9}>
              <Paper radius={"md"}>
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
        <Button my={"lg"} radius={"xl"} onClick={() => onCreate()}>
          Selanjutnya
        </Button>
      </Stack>
    </>
  );
}