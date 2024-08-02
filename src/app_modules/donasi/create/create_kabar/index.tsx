"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  AspectRatio,
  Button,
  Center,
  FileButton,
  Image,
  Paper,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Donasi_funCreateKabar } from "../../fun/create/fun_create_kabar";
import { NotifBerhasil } from "../../component/notifikasi/notif_berhasil";
import { NotifGagal } from "../../component/notifikasi/notif_gagal";
import _ from "lodash";
import { NotifPeringatan } from "../../component/notifikasi/notif_peringatan";
import ComponentDonasi_NotedBox from "../../component/noted_box";
import { Donasi_funCreateNotif } from "../../fun/create/fun_create_notif";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { notifikasiToUser_CreateKabarDonasi } from "@/app_modules/notifikasi/fun/create/create_notif_to_user_kabar_donasi";

export default function Donasi_CreateKabar({ donasiId }: { donasiId: string }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [imageKabar, setImageKabar] = useState<any | null>();
  const [kabar, setKabar] = useState({
    judul: "",
    deskripsi: "",
  });
  return (
    <>
      <Stack px={"lg"} pb={"lg"}>
        <ComponentGlobal_BoxInformation informasi="Gambar tidak wajib di isi ! Hanya upload jika di butuhkan." />

        <TextInput
          maxLength={100}
          styles={{
            label: {
              color: "white",
            },
          }}
          label="Judul"
          withAsterisk
          placeholder="Masukan judul kabar"
          onChange={(val) => {
            setKabar({
              ...kabar,
              judul: _.startCase(val.target.value),
            });
          }}
        />
        <Textarea
          maxLength={500}
          styles={{
            label: {
              color: "white",
            },
          }}
          label="Deskripsi"
          withAsterisk
          placeholder="Masukan deskripsi kabar"
          autosize
          onChange={(val) => {
            setKabar({
              ...kabar,
              deskripsi: val.target.value,
            });
          }}
        />
        <ComponentGlobal_InputCountDown
          lengthInput={kabar.deskripsi.length}
          maxInput={500}
        />

        <Stack>
          {imageKabar ? (
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
                  src={imageKabar ? imageKabar : "/aset/no-img.png"}
                  maw={300}
                />
              </Paper>
            </AspectRatio>
          ) : (
            <Center>
              <Text fs={"italic"} fz={10} c={"white"}>
                Upload gambar kabar !
              </Text>
            </Center>
          )}
          <Center>
            <FileButton
              onChange={async (files: any | null) => {
                try {
                  const buffer = URL.createObjectURL(
                    new Blob([new Uint8Array(await files.arrayBuffer())])
                  );
                  // console.log(buffer, "ini buffer");
                  // console.log(files, " ini file");
                  setImageKabar(buffer);
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
        <Button
          style={{
            transition: "0.5s",
          }}
          disabled={_.values(kabar).includes("") ? true : false}
          radius={"xl"}
          mt={"lg"}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
          onClick={() => onSave(router, donasiId, kabar, file as any)}
        >
          Simpan
        </Button>
      </Stack>
    </>
  );
}

interface Model_Kabar {
  judul: string;
  deskripsi: string;
}

async function onSave(
  router: AppRouterInstance,
  donasiId: string,
  kabar: Model_Kabar,
  file: FormData
) {
  const body = {
    donasiId: donasiId,
    title: kabar.judul,
    deskripsi: kabar.deskripsi,
  };

  if (_.values(body).includes(""))
    return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");
  // if (!file) return NotifPeringatan("Lengkapi Gambar");

  const gambar = new FormData();
  gambar.append("file", file as any);

  const res = await Donasi_funCreateKabar(body as any, gambar);
  if (res.status === 200) {
    await notifikasiToUser_CreateKabarDonasi({
      donasiId: donasiId,
      kabarId: res.kabarId as any,
    });

    ComponentGlobal_NotifikasiBerhasil(res.message);
    router.back();
  } else {
    ComponentGlobal_NotifikasiGagal(res.message);
  }
}
