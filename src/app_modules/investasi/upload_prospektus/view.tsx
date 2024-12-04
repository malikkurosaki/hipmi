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
  Stack
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import funUploadProspektusInvestasi from "../fun/fun_upload_prospek";

export default function UploadProspektusInvestasi({
  idInves,
}: {
  idInves: string;
}) {
  const router = useRouter();
  const [file, setFile] = useState<any | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);

  async function onUpload() {
    if (!pdf) return ComponentGlobal_NotifikasiPeringatan("File Kosong");

    const fd = new FormData();
    fd.append("file", pdf as any);

    await funUploadProspektusInvestasi(fd, idInves).then((res) => {
      if (res.status === 201) {
        ComponentGlobal_NotifikasiBerhasil("Berhasil upload");
        router.back();
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  return (
    <>
      <Stack px={"md"}>
        <Group position="center" px={"md"}>
          <FileButton
            onChange={async (file: any) => {
              const buffer = URL.createObjectURL(
                new Blob([new Uint8Array(await file.arrayBuffer())])
              );
              // console.log(buffer);
              setFile(buffer);
              setPdf(file);
            }}
            accept="application/pdf"
          >
            {(props) => (
              <Button
                {...props}
                bg={MainColor.yellow}
                color="yellow"
                c={"black"}
                radius={50}
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
        <Stack>
          <Button
            radius={50}
            bg={MainColor.yellow}
            color="yellow"
            c={"black"}
            onClick={() => onUpload()}
          >
            Simpan
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
