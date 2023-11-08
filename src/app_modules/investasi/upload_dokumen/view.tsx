"use client";

import { Warna } from "@/app/lib/warna";
import {
  Group,
  FileButton,
  Button,
  Box,
  Paper,
  AspectRatio,
  Image,
  Stack,
  Center,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-simple-toasts";
import funUploadProspektusInvestasi from "../fun/fun_upload_prospek";
import funLoadDataInvestasi from "../fun/fun_load_data";
import _ from "lodash";
import funUploadDokumenInvestasi from "../fun/fun_upload_dokumen";

export default function UploadDokumenInvestasi({
  idInves,
}: {
  idInves: string;
}) {
  const router = useRouter();
  const [file, setFile] = useState<any | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [title, setTitle] = useState("");

  async function onUpload() {
    const body = {
      idInves: idInves,
      title: title,
    };
    if (_.values(body).includes("")) return toast("Lengkapi nama dokumen");
    if (!pdf) return toast("File Kosong");

    const fd = new FormData();
    fd.append("file", pdf as any);

    await funUploadDokumenInvestasi(fd, body).then((res) => {
      console.log(res);
      if (res.status === 201) {
        toast("Berhasil upload");
        router.back();
      } else {
        toast(res.message);
      }
    });
  }

  return (
    <>
      <Stack>
        <Group position="center" px={"md"}>
          <FileButton
            onChange={async (file: any) => {
              const buffer = URL.createObjectURL(
                new Blob([new Uint8Array(await file.arrayBuffer())])
              );
              setFile(buffer);
              setPdf(file);
            }}
            accept={"/pdf"}
          >
            {(props) => (
              <Button
                {...props}
                bg={Warna.hijau_muda}
                color="green"
                radius={50}
              >
                Upload File
              </Button>
            )}
          </FileButton>
        </Group>

        <Box my={"lg"}>
          {!file ? (
            <Paper radius={20}>
              <AspectRatio ratio={2 / 4} mah={300} maw={200} mx={"auto"}>
                <Image alt="" src={"/aset/no-file.png"} />
              </AspectRatio>
            </Paper>
          ) : (
            <Paper radius={20}>
              <AspectRatio ratio={2 / 4} mah={300} maw={200} mx={"auto"}>
                <Image alt="" src={"/aset/pdf-icon.png"} />
              </AspectRatio>
            </Paper>
          )}
        </Box>
        <TextInput
          label="Nama dokumen"
          withAsterisk
          onChange={(val) => {
            setTitle(val.target.value);
          }}
        />
        <Center>
          <Button
            w={300}
            radius={50}
            bg={Warna.biru}
            onClick={() => onUpload()}
          >
            Simpan
          </Button>
        </Center>
      </Stack>
    </>
  );
}
