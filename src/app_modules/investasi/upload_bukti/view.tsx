"use client";

import { Warna } from "@/app/lib/warna";
import {
  AspectRatio,
  Button,
  Center,
  CopyButton,
  FileButton,
  Grid,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-simple-toasts";

export default function UploadBuktiTransferInvestasi() {
  const router = useRouter()
  const [fl, setFl] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>(null);

  const totalHarga = localStorage.getItem("total_harga")
  return (
    <>
      <Grid align="center">
        <Grid.Col span={"auto"}>
          <Text>Rekening</Text>
        </Grid.Col>
        <Grid.Col span={"auto"}>
          <Text>908765467897654567</Text>
        </Grid.Col>
        <Grid.Col span={"auto"}>
          <CopyButton value="908765467897654567">
            {({ copied, copy }) => (
              <Button
                compact
                radius={50}
                color={copied ? "teal" : "blue"}
                onClick={copy}
              >
                {copied ? "Copied url" : "Copy url"}
              </Button>
            )}
          </CopyButton>
        </Grid.Col>
      </Grid>
      <Grid align="center">
        <Grid.Col span={"auto"}>
          <Text>Total Harga</Text>
        </Grid.Col>
        <Grid.Col span={"auto"}>
          <Text>Rp. {totalHarga}</Text>
        </Grid.Col>
        <Grid.Col span={"auto"}></Grid.Col>
      </Grid>

      {/* Upload */}
      <Group position="center" mt="lg" mb={"md"}>
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
              {...props}
              // w={350}
              compact
              radius={50}
              bg={Warna.biru}
              // onClick={() => router.push("/dev/investasi/upload")}
            >
              Upload
            </Button>
          )}
        </FileButton>
      </Group>
      <AspectRatio ratio={16 / 9} mb={"lg"}>
        {img ? (
          <Image alt="" src={img} />
        ) : (
          <Image alt="" src={"/aset/no-img.png"} />
        )}
      </AspectRatio>

      <Center>
        {img === null ? (
          <Button w={350} radius={50} bg={"gray"}
          onClick={() => toast("Masukan Bukti Transfer")}
          >
            Selesai
          </Button>
        ) : (
          <Button w={350} radius={50} bg={"blue"}
          onClick={() => router.push("/dev/investasi/konfirmasi")}
          >
            Selesai
          </Button>
        )}
      </Center>
    </>
  );
}
