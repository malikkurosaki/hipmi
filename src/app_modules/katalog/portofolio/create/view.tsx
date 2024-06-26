"use client";

import { myConsole } from "@/app/fun/my_console";
import { ApiHipmi } from "@/app/lib/api";
import { Warna } from "@/app/lib/warna";
import {
  BIDANG_BISNIS_OLD,
  MODEL_PORTOFOLIO_OLD,
} from "@/app_modules/model_global/portofolio";
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
  Textarea,
  Title,
} from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-simple-toasts";
import funCreatePortofolio from "../fun/fun_create_portofolio";
import { IconCamera } from "@tabler/icons-react";
import ComponentKatalog_NotedBox from "../../component/noted_box";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { NotifPeringatan } from "@/app_modules/donasi/component/notifikasi/notif_peringatan";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import ComponentGlobal_ErrorInput from "@/app_modules/component_global/error_input";
import ComponentGlobal_InputCountDown from "@/app_modules/component_global/input_countdown";

export default function CreatePortofolio({
  bidangBisnis,
  profileId,
}: {
  bidangBisnis: BIDANG_BISNIS_OLD;
  profileId: any;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    namaBisnis: "",
    masterBidangBisnisId: "",
    alamatKantor: "",
    tlpn: "",
    deskripsi: "",
  });

  const [medsos, setMedsos] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    tiktok: "",
  });

  const [file, setFile] = useState<File | any>(null);
  const [img, setImg] = useState<any | null>(null);
  const [isFile, setIsFile] = useState(false);

  return (
    <>
      {/* {JSON.stringify(profileId)} */}

      <Stack px={"sm"} spacing={50}>
        <Stack spacing={"sm"}>
          <ComponentKatalog_NotedBox informasi="Lengkapi Data Bisnis" />
          <TextInput
            withAsterisk
            label="Nama Bisnis"
            placeholder="Nama bisnis"
            maxLength={100}
            onChange={(val) => {
              setValue({
                ...value,
                namaBisnis: val.target.value,
              });
            }}
          />
          <Select
            withAsterisk
            label="Bidang Bisnis"
            placeholder="Pilih salah satu bidang bisnis"
            data={_.map(bidangBisnis as any).map((e: any) => ({
              value: e.id,
              label: e.name,
            }))}
            onChange={(val) => {
              setValue({
                ...value,
                masterBidangBisnisId: val as any,
              });
            }}
          />
          <TextInput
            withAsterisk
            label="Alamat Kantor"
            placeholder="Alamat kantor"
            maxLength={100}
            onChange={(val) => {
              setValue({
                ...value,
                alamatKantor: val.target.value,
              });
            }}
          />
          <TextInput
            withAsterisk
            label="Nomor Telepon Kantor"
            placeholder="Nomor telepon kantor"
            type="number"
            onChange={(val) => {
              setValue({
                ...value,
                tlpn: val.target.value,
              });
            }}
          />
          <Stack spacing={5}>
            <Textarea
              maxLength={150}
              autosize
              minRows={2}
              maxRows={5}
              withAsterisk
              label="Deskripsi"
              placeholder="Deskripsi singkat mengenai usaha"
              onChange={(val) => {
                setValue({
                  ...value,
                  deskripsi: val.target.value,
                });
              }}
            />
            <ComponentGlobal_InputCountDown
              maxInput={150}
              lengthInput={value.deskripsi.length}
            />
          </Stack>
        </Stack>

        <Stack>
          <ComponentKatalog_NotedBox informasi="Upload Logo Bisnis Anda!" />
          <AspectRatio ratio={16 / 9}>
            <Paper radius={"md"} withBorder>
              <Image alt="Foto" src={img ? img : "/aset/no-img.png"} />
            </Paper>
          </AspectRatio>
          {isFile ? <ComponentGlobal_ErrorInput text="Upload gambar" /> : ""}

          <Center>
            <FileButton
              onChange={async (files: any | null) => {
                try {
                  const buffer = URL.createObjectURL(
                    new Blob([new Uint8Array(await files.arrayBuffer())])
                  );
                  if (files.size > 2000000) {
                    ComponentGlobal_NotifikasiPeringatan(
                      "Maaf, Ukuran file terlalu besar, maximum 2mb",
                      3000
                    );
                  } else {
                    setImg(buffer);
                    setFile(files);
                    setIsFile(false);
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
                  variant="outline"
                  w={150}
                  leftIcon={<IconCamera />}
                  compact
                >
                  Upload
                </Button>
              )}
            </FileButton>
          </Center>
        </Stack>

        <Stack>
          <ComponentKatalog_NotedBox informasi="Isi hanya pada sosial media yang anda miliki" />
          <TextInput
            label="Facebook"
            maxLength={100}
            placeholder="Facebook"
            onChange={(val) => {
              setMedsos({
                ...medsos,
                facebook: val.target.value,
              });
            }}
          />
          <TextInput
            label="Instagram"
            maxLength={100}
            placeholder="Instagram"
            onChange={(val) => {
              setMedsos({
                ...medsos,
                instagram: val.target.value,
              });
            }}
          />
          <TextInput
            label="Tiktok"
            maxLength={100}
            placeholder="Tiktok"
            onChange={(val) => {
              setMedsos({
                ...medsos,
                tiktok: val.target.value,
              });
            }}
          />
          <TextInput
            label="Twitter"
            maxLength={100}
            placeholder="Twitter"
            onChange={(val) => {
              setMedsos({
                ...medsos,
                twitter: val.target.value,
              });
            }}
          />
          <TextInput
            label="Youtube"
            maxLength={100}
            placeholder="Youtube"
            onChange={(val) => {
              setMedsos({
                ...medsos,
                youtube: val.target.value,
              });
            }}
          />
        </Stack>

        <Button
          mt={"md"}
          radius={50}
          bg={Warna.hijau_muda}
          color="green"
          loading={loading ? true : false}
          loaderPosition="center"
          onClick={() => {
            onSubmit(
              router,
              profileId,
              value as any,
              file,
              medsos,
              setLoading,
              setIsFile
            );
          }}
        >
          Simpan
        </Button>
      </Stack>

      {/* <pre> {JSON.stringify(bidangBisnis, null, 2)}</pre> */}
    </>
  );
}

async function onSubmit(
  router: AppRouterInstance,
  profileId: string,
  dataPorto: MODEL_PORTOFOLIO_OLD,
  file: FormData,
  dataMedsos: any,
  setLoading: any,
  setIsFile: any
) {
  const porto = {
    namaBisnis: dataPorto.namaBisnis,
    masterBidangBisnisId: dataPorto.masterBidangBisnisId,
    alamatKantor: dataPorto.alamatKantor,
    tlpn: dataPorto.tlpn,
    deskripsi: dataPorto.deskripsi,
  };

  if (_.values(porto).includes(""))
    return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");
  if (file === null) {
    setIsFile(true);
    return null;
  }

  const gambar = new FormData();
  gambar.append("file", file as any);

  await funCreatePortofolio(profileId, porto as any, gambar, dataMedsos).then(
    (res) => {
      if (res.status === 201) {
        setLoading(true);
        ComponentGlobal_NotifikasiBerhasil("Berhasil disimpan");
        router.back();
      } else {
        ComponentGlobal_NotifikasiGagal("Gagal disimpan");
      }
    }
  );
}
