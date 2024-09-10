"use client";

import { Warna } from "@/app/lib/warna";
import {
  AspectRatio,
  Button,
  FileButton,
  Grid,
  Group,
  Image,
  Text
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UploadBuktiTransferInvestasi() {
  const router = useRouter();
  const [fl, setFl] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>(null);
  const [total, setTotal] = useState<any | null>(null);
  const [bank, setBank] = useState<any | null>(null);

  useShallowEffect(() => {
    if (typeof window !== undefined) {
      const totalHarga = localStorage.getItem("total_harga");
      const pilihBank = localStorage.getItem("bank");
      setTotal(totalHarga);
      setBank(pilihBank);
    }
  }, []);

  return (
    <>
      {/* Nama Rekening */}
      <Grid align="center">
        <Grid.Col span={5}>
          <Text>Nama Rekening</Text>
        </Grid.Col>
        <Grid.Col span={7}>
          <Text fw={"bold"}>Xendit</Text>
        </Grid.Col>
      </Grid>

      {/* Nomor rekening */}
      <Grid align="center">
        <Grid.Col span={5}>
          <Text>Nomor Rekening</Text>
        </Grid.Col>
        <Grid.Col span={7}>
          <Text fw={"bold"}>{bank}</Text>
        </Grid.Col>
        {/* <Grid.Col span={"auto"}>
          <CopyButton value="908765467897654567">
            {({ copied, copy }) => (
              <Button
                compact
                radius={50}
                color={copied ? "teal" : "indigo"}
                onClick={copy}
              >
                {copied ? "Copied url" : "Copy url"}
              </Button>
            )}
          </CopyButton>
        </Grid.Col> */}
      </Grid>

      {/* Total Bayar */}
      <Grid align="center">
        <Grid.Col span={5}>
          <Text>Total Bayar</Text>
        </Grid.Col>
        <Grid.Col span={7}>
          <Text fw={"bold"}>Rp. {total}</Text>
        </Grid.Col>
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

      {/* <Center>
        {img === null ? (
          <Button
            disabled
            w={350}
            radius={50}
            bg={"gray"}
            onClick={() => toast("Masukan Bukti Transfer")}
          >
            Selesai
          </Button>
        ) : (
          <Button
            w={350}
            radius={50}
            bg={"blue"}
            onClick={() => router.push("/dev/investasi/konfirmasi")}
          >
            Selesai
          </Button>
        )}
      </Center> */}
    </>
  );
}
