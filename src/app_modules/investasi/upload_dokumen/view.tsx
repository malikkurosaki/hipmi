"use client";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import {
  AspectRatio,
  Box,
  Button,
  FileButton,
  Group,
  Image,
  Paper,
  Stack,
  TextInput,
} from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const [isLoading, setLoading] = useState(false);

  async function onUpload() {
    const body = {
      idInves: idInves,
      title: title,
    };
    if (_.values(body).includes(""))
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi nama dokumen");
    if (!pdf) return ComponentGlobal_NotifikasiPeringatan("File Kosong");

    const fd = new FormData();
    fd.append("file", pdf as any);

    await funUploadDokumenInvestasi(fd, body).then((res) => {
      // console.log(res);
      if (res.status === 201) {
        setLoading(true);
        ComponentGlobal_NotifikasiBerhasil("Berhasil upload");
        router.back();
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
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
            accept={"application/pdf"}
          >
            {(props) => (
              <Button
                {...props}
                radius={50}
                bg={MainColor.yellow}
                color="yellow"
                c={"black"}
              >
                Upload File
              </Button>
            )}
          </FileButton>
        </Group>

        <Box my={"lg"}>
          {!file ? (
            <Paper
              radius={20}
              style={{
                border: `2px solid gray`,
                backgroundColor: "gray",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <AspectRatio ratio={2 / 4} mah={300} maw={200} mx={"auto"}>
                <Image
                  color="gray"
                  alt=""
                  opacity={0.1}
                  src={"/aset/pdf-icon.png"}
                />
              </AspectRatio>
            </Paper>
          ) : (
            <Paper
              radius={20}
              style={{
                border: `2px solid ${AccentColor.softblue}`,
                backgroundColor: AccentColor.blue,
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <AspectRatio ratio={2 / 4} mah={300} maw={200} mx={"auto"}>
                <Image alt="" src={"/aset/pdf-icon.png"} />
              </AspectRatio>
            </Paper>
          )}
        </Box>
        <TextInput
          styles={{
            label: {
              color: "white",
            },
          }}
          label="Nama dokumen"
          placeholder="Masukan nama dokumen"
          withAsterisk
          onChange={(val) => {
            setTitle(val.target.value);
          }}
        />
        <Stack>
          <Button
            loading={isLoading}
            loaderPosition="center"
            bg={MainColor.yellow}
            color="yellow"
            c={"black"}
            radius={50}
            onClick={() => onUpload()}
          >
            Simpan
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
