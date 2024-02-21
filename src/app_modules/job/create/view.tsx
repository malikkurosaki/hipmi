"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { useAtom } from "jotai";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { gs_job_hot_menu, gs_job_status } from "../global_state";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";

export default function Job_Create() {
  const [value, setValue] = useState<any>();
  const [ambil, setAmbil] = useState<String[]>([]);

  return (
    <>
      {/* <Stack px={"sm"}>
        <Stack align="center">
          <Image alt="" src={"/aset/no-file.png"} mah={500} maw={200} />
          <Button radius={"xl"} w={100}>
            <IconCamera />
          </Button>
        </Stack>
        <Stack>
          {ambil.map((v, k) => (
            <Text key={k}> {v}</Text>
          ))}
        </Stack>
        <Stack>
          <TextInput
            withAsterisk
            label="Judul"
            placeholder="Masukan judul lowongan"
            onChange={(val) => {}}
          />
          <Textarea
            minRows={5}
            withAsterisk
            label="Syarat dan Ketentuan"
            placeholder={`Contoh ${"\n"}- Minimal lulusan SMA ${"\n"}- Pasif berbahasa inggris ${"\n"}- Dll,`}
            onChange={(val) => {
              const data = val.currentTarget.value.split("\n");
              if (!_.isEmpty(data)) {
                setAmbil(data);
              }
            }}
          />
          <Textarea
            minRows={5}
            withAsterisk
            label="Deskripsi"
            placeholder="Lokasi, Alamat Email, Nomor yang dapat dihubungi"
            onChange={(val) => {}}
          />
        </Stack>

        <ButtonAction />
      </Stack> */}
    </>
  );
}

function ButtonAction() {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_job_hot_menu);
  const [status, setStatus] = useAtom(gs_job_status);

  return (
    <>
      <Button
        radius={"xl"}
        mt={"lg"}
        mb={70}
        onClick={() => {
          router.replace(RouterJob.status);
          setHotMenu(2);
          setStatus("Review");
          ComponentGlobal_NotifikasiBerhasil("Tambah Lowongan Berhasil");
        }}
      >
        Simpan
      </Button>
    </>
  );
}
