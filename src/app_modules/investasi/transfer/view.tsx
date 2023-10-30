"use client";

import { Warna } from "@/app/lib/warna";
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  FileButton,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function TransferInvestasi() {
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
      <Stack spacing={"xl"}>
        <Stack spacing={0} mb={"md"}>
          <Title order={5}>Mohon transfer ke Xendit</Title>
          <Group align="center">
            <Text>untuk diteruskan ke </Text>
            <Title order={5}>Nama Pemilik Proyek</Title>
          </Group>
          <Divider mt={"lg"} />
        </Stack>

        <Stack spacing={"xl"}>
          {/* Nama Rekening */}
          <Stack spacing={5}>
            <Group>
              <Avatar size={"md"} variant="filled" />
              <Stack spacing={0}>
                <Text>Nama Bank</Text>
                <Text>PT. Xendit Jakarta</Text>
              </Stack>
            </Group>
            <Paper
              bg={"gray"}
              sx={{ alignContent: "center" }}
              p={"sm"}
              radius={10}
            >
              <Grid align="center">
                <Grid.Col span={8}>
                  <Text fw={"bold"}>{bank}</Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Center>
                    <Button compact variant="outline" color="dark" radius={50}>
                      Salin
                    </Button>
                  </Center>
                </Grid.Col>
              </Grid>
            </Paper>
          </Stack>

          {/* Nomor rekening */}
          <Stack spacing={5}>
            <Text>Jumlah Transfer</Text>
            <Paper
              bg={"gray"}
              sx={{ alignContent: "center" }}
              p={"sm"}
              radius={10}
            >
              <Grid align="center">
                <Grid.Col span={8}>
                  <Text fw={"bold"}>Rp. {total}</Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Center>
                    <Button compact variant="outline" color="dark" radius={50}>
                      Salin
                    </Button>
                  </Center>
                </Grid.Col>
              </Grid>
            </Paper>
            <Group spacing={5}>
              <IconAlertTriangle color="orange" size={10} />
              <Text fz={"sm"}>Pastikan jumlahnya benar</Text>
            </Group>
          </Stack>
        </Stack>
      </Stack>

      {/* Upload */}
      {/* <Group position="center" mt="lg" mb={"md"}>
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
      </AspectRatio> */}
    </>
  );
}
