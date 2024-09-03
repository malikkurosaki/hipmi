"use client";

import { RouterAdminInvestasi } from "@/app/lib/router_admin/router_admin_investasi";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_TampilanRupiah } from "@/app_modules/_global/component";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Collapse,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconBrandWhatsapp,
  IconMoneybag,
  IconMoodDollar,
  IconZoomMoney,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_INVOICE_INVESTASI } from "../../_lib/interface";
import { Prisma } from "@prisma/client";
import { IconBrandCashapp } from "@tabler/icons-react";

export function Investasi_ViewTransaksiBerhasil({
  dataTransaksi,
}: {
  dataTransaksi: any;
}) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_INVOICE_INVESTASI>(dataTransaksi);
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Stack spacing={"lg"} py={"md"}>
        <Stack
          align="center"
          spacing={"md"}
          style={{
            backgroundColor: AccentColor.blue,
            border: `2px solid ${AccentColor.darkblue}`,
            padding: "15px",
            cursor: "pointer",
            borderRadius: "10px",
            color: "white",
          }}
        >
          <IconBrandCashapp size={100} />
          <Title order={5} align="center">
            Terimakasih telah percaya pada kami untuk mengelola dana anda! Info
            mengenai update Investasi ini bisa di lihat di kolom berita.
          </Title>
        </Stack>

        <Paper
          style={{
            backgroundColor: AccentColor.blue,
            border: `2px solid ${AccentColor.darkblue}`,
            padding: "15px",
            cursor: "pointer",
            borderRadius: "10px",
            color: "white",
            marginBottom: "15px",
          }}
        >
          <Title order={4} align="center" mb={"lg"}>
            Detail Transaksi
          </Title>

          <Stack px={"sm"}>
            <Box>
              <Grid>
                <Grid.Col span={6}>
                  <Text>Bank </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text>: {data?.MasterBank.namaBank}</Text>
                </Grid.Col>
              </Grid>
            </Box>

            <Box>
              <Grid>
                <Grid.Col span={6}>
                  <Text>Nama Rekening </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text>: {data?.MasterBank.namaAkun}</Text>
                </Grid.Col>
              </Grid>
            </Box>

            <Box>
              <Grid>
                <Grid.Col span={6}>
                  <Text>Nomor Rekening </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text>: {data?.MasterBank.norek}</Text>
                </Grid.Col>
              </Grid>
            </Box>

            <Box>
              <Grid>
                <Grid.Col span={6}>
                  <Text>Jumlah Transaksi </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Group spacing={2}>
                    :
                    <Text inherit span>
                      <ComponentGlobal_TampilanRupiah
                        color="white"
                        nominal={+data?.nominal}
                      />
                    </Text>
                  </Group>
                </Grid.Col>
              </Grid>
            </Box>

            <Box>
              <Grid>
                <Grid.Col span={6}>
                  <Text>Lembar Terbeli </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text>: {data?.lembarTerbeli}</Text>
                </Grid.Col>
              </Grid>
            </Box>

            <Box>
              <Grid>
                <Grid.Col span={6}>
                  <Text>Bukti Transfer </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Button
                    radius={"xl"}
                    compact
                    onClick={() => {
                      opened ? setOpened(false) : setOpened(true);
                    }}
                  >
                    {opened ? "Sembunyikan" : "Tampilkan"}
                  </Button>
                </Grid.Col>
              </Grid>
            </Box>

            <Collapse
              mt={"md"}
              in={opened}
              transitionDuration={500}
              transitionTimingFunction="linear"
            >
              <Image
                alt="foto"
                src={RouterAdminInvestasi.api_bukti_transfer + data?.imagesId}
              />
            </Collapse>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}
