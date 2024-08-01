"use client";

import { Warna } from "@/app/lib/warna";
import {
  AspectRatio,
  Button,
  Center,
  FileButton,
  Group,
  Image,
  Stack,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { IconCamera, IconUpload } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-simple-toasts";
import funCreateBeritaInvestasi from "../fun/fun_create_berita";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";

export default function CreateBeritaInvestasi({
  idInves,
}: {
  idInves: string;
}) {
  const router = useRouter();
  const [fl, setFl] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>();

  const [value, setValue] = useState({
    title: "",
    deskripsi: "",
    investasiId: idInves,
  });

  async function onCreate() {
    const body = value;

    if (_.values(body).includes("")) return toast("Lengkapi data");
    if (!fl) return ComponentGlobal_NotifikasiPeringatan("File Kosong");

    const fd = new FormData();
    fd.append("file", fl);

    await funCreateBeritaInvestasi(fd, body as any).then((res) => {
      res.status === 201
        ? (ComponentGlobal_NotifikasiBerhasil(res.message), router.back())
        : ComponentGlobal_NotifikasiGagal(res.message);
    });

    // router.back();
    // toast("Berita tersimpan");
  }

  return (
    <>
      <Stack px={"xl"}>
        <AspectRatio ratio={1 / 1} mx={"sm"} mah={300}>
          {img ? (
            <Image alt="" src={img} radius={"sm"} height={300} width={"100%"} />
          ) : (
            <Image
              alt=""
              src={"/aset/no-img.png"}
              radius={"sm"}
              height={300}
              width={"100%"}
            />
          )}
        </AspectRatio>
        <Group position="center" mt={"md"}>
          <FileButton
            onChange={async (files: any) => {
              const buffer = URL.createObjectURL(
                new Blob([new Uint8Array(await files.arrayBuffer())])
              );
              setImg(buffer);
              setFl(files);
            }}
            accept="image/png,image/jpeg"
          >
            {(props) => (
              <Button
                leftIcon={<IconCamera />}
                {...props}
                radius={50}
                bg={MainColor.yellow}
                color="yellow"
                c={"black"}
              >
                Upload
              </Button>
            )}
          </FileButton>
        </Group>
        <TextInput
          withAsterisk
          styles={{
            label: {
              color: "white",
            },
          }}
          label="Judul berita"
          onChange={(val) => {
            setValue({
              ...value,
              title: val.target.value,
            });
          }}
        />

        <Textarea
          withAsterisk
          styles={{
            label: {
              color: "white",
            },
          }}
          label="Deskripsi"
          autosize
          minRows={2}
          maxRows={6}
          onChange={(val) => {
            setValue({
              ...value,
              deskripsi: val.target.value,
            });
          }}
        />
        <Button
          radius={50}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
          onClick={() => {
            onCreate();
          }}
        >
          Simpan
        </Button>
      </Stack>
    
    </>
  );
}
