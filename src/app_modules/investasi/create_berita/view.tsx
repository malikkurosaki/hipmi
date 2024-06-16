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

export default function CreateBeritaInvestasi({idInves}: {idInves: string}) {
  const router = useRouter();
  const [fl, setFl] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>();

  const [value, setValue] = useState({
    title: "",
    deskripsi: "",
    investasiId: idInves
  });

  async function onCreate() {
    const body = value;

    if (_.values(body).includes("")) return toast("Lengkapi data");
    if (!fl) return toast("File Kosong");

    const fd = new FormData();
    fd.append("file", fl);

    await funCreateBeritaInvestasi(fd, body as any).then((res) => {
      res.status === 201
        ? (toast(res.message), router.back())
        : toast(res.message);
    });

    // router.back();
    // toast("Berita tersimpan");
  }

  return (
    <>
      <Stack>
        <AspectRatio ratio={16 / 9}>
          {img ? (
            <Image alt="" src={img} />
          ) : (
            <Image alt="" src={"/aset/no-img.png"} />
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
                compact
                {...props}
                w={100}
                radius={50}
                bg={Warna.hijau_muda}
                // onClick={() => router.push("/dev/investasi/upload")}
              >
                <IconCamera />
              </Button>
            )}
          </FileButton>
        </Group>
        <TextInput
          label="Judul berita"
          onChange={(val) => {
            setValue({
              ...value,
              title: val.target.value,
            });
          }}
        />

        <Textarea
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
      </Stack>
      <Center mt={100}>
        <Button
          w={300}
          radius={50}
          bg={Warna.biru}
          onClick={() => {
            onCreate();
          }}
        >
          Simpan
        </Button>
      </Center>
    </>
  );
}
