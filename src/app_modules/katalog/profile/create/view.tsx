"use client";

import { myConsole } from "@/app/fun/my_console";
import { ApiHipmi } from "@/app/lib/api";
import { Warna } from "@/app/lib/warna";
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  FileButton,
  Image,
  Paper,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useAtom } from "jotai";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-simple-toasts";
import funCreateNewProfile from "../fun/fun_create_profile";
import { IconCamera } from "@tabler/icons-react";
import ComponentKatalog_NotedBox from "../../component/noted_box";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MODEL_PROFILE } from "../model/interface";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";

export default function CreateProfile({ userId }: { userId: any }) {
  const router = useRouter();
  const [filePP, setFilePP] = useState<File | null>(null);
  const [imgPP, setImgPP] = useState<any | null>();
  const [fileBG, setFileBG] = useState<File | null>(null);
  const [imgBG, setImgBG] = useState<any | null>();

  const [value, setValue] = useState({
    name: "",
    email: "",
    alamat: "",
    jenisKelamin: "",
  });

  return (
    <>
      <Stack px={"sm"} spacing={"xl"}>
        <Box>
          <Stack>
            <ComponentKatalog_NotedBox informasi="Upload foto profile anda." />
            <Center>
              <Avatar
                sx={{
                  borderStyle: "solid",
                  borderColor: "black",
                  borderWidth: "1px",
                }}
                src={imgPP ? imgPP : "/aset/global/avatar.png"}
                size={150}
                radius={"100%"}
              />
            </Center>
            <Center>
              <FileButton
                onChange={async (files: any | null) => {
                  try {
                    const buffer = URL.createObjectURL(
                      new Blob([new Uint8Array(await files.arrayBuffer())])
                    );
                    // console.log(buffer, "ini buffer");
                    // console.log(files, " ini file");
                    setImgPP(buffer);
                    setFilePP(files);
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
        </Box>

        <Box>
          <Stack>
            <ComponentKatalog_NotedBox informasi="Upload foto latar belakang profile anda." />
            <AspectRatio ratio={16 / 9}>
              <Paper
                radius={"md"}
                sx={{
                  borderStyle: "solid",
                  borderColor: "black",
                  borderWidth: "1px",
                }}
              >
                <Image alt="Foto" src={imgBG ? imgBG : "/aset/no-img.png"} />
              </Paper>
            </AspectRatio>

            <Center>
              <FileButton
                onChange={async (files: any | null) => {
                  try {
                    const buffer = URL.createObjectURL(
                      new Blob([new Uint8Array(await files.arrayBuffer())])
                    );
                    // console.log(buffer, "ini buffer");
                    // console.log(files, " ini file");
                    setImgBG(buffer);
                    setFileBG(files);
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
        </Box>

        <TextInput
          label="Nama"
          onChange={(val) => {
            setValue({
              ...value,
              name: val.target.value,
            });
          }}
        />
        <TextInput
          label="Email"
          onChange={(val) => {
            setValue({
              ...value,
              email: val.target.value,
            });
          }}
        />
        <TextInput
          label="Alamat"
          onChange={(val) => {
            setValue({
              ...value,
              alamat: val.target.value,
            });
          }}
        />
        <Select
          label="Jenis Kelamin"
          data={[
            { value: "Laki-laki", label: "Laki-laki" },
            { value: "Perempuan", label: "Perempuan" },
          ]}
          onChange={(val) => {
            setValue({
              ...value,
              jenisKelamin: val as string,
            });
          }}
        />
        <Button
          mt={"md"}
          radius={50}
          bg={Warna.hijau_muda}
          color="green"
          onClick={() =>
            onSubmit(router, value as any, userId, filePP as any, fileBG as any)
          }
        >
          Simpan
        </Button>
      </Stack>
    </>
  );
}

async function onSubmit(
  router: AppRouterInstance,
  value: MODEL_PROFILE,
  userId: string,
  filePP: FormData,
  fileBg: FormData
) {
  const body = {
    userId: userId,
    name: value.name,
    email: value.email,
    alamat: value.alamat,
    jenisKelamin: value.jenisKelamin,
  };
  if(_.values(body).includes("")) return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data")

  const gambarPP = new FormData();
  gambarPP.append("filePP", filePP as any);

  const gambarBG = new FormData();
  gambarBG.append("fileBG", fileBg as any);

  
  if(!gambarPP) return ComponentGlobal_NotifikasiPeringatan("Lengkapi foto profile")
  if(!gambarBG) return ComponentGlobal_NotifikasiPeringatan("Lengkapi background profile")
  
  
  await funCreateNewProfile(body as any, gambarPP, gambarBG).then((res) => {
    if (res.status === 201) {
      ComponentGlobal_NotifikasiBerhasil("Berhasil Membuat Profile")
      router.push(RouterProfile.katalog + `${userId}`);
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });

}
