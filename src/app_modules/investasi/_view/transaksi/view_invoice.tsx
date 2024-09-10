"use client";

import { NEW_RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import {
  Stack,
  Title,
  Group,
  Paper,
  Grid,
  CopyButton,
  Button,
  Center,
  FileButton,
  Text,
} from "@mantine/core";
import { IconCamera, IconCircleCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_INVOICE_INVESTASI } from "../../_lib/interface";
import { investasi_funUploadBuktiTransferById } from "../../_fun";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";

export function Investasi_ViewInvoice({
  dataInvoice,
}: {
  dataInvoice: MODEL_INVOICE_INVESTASI;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(dataInvoice);
  const [file, setFile] = useState<File | null>(null);

  async function onUpload() {
    const gambar = new FormData();
    gambar.append("file", file as any);

    const res = await investasi_funUploadBuktiTransferById({
      invoiceId: data.id,
      file: gambar,
    });
    if (res.status !== 200) return ComponentGlobal_NotifikasiGagal(res.message);
    ComponentGlobal_NotifikasiBerhasil(res.message);
    setLoading(true);
    router.push(NEW_RouterInvestasi.proses_transaksi + data.id, {
      scroll: false,
    });
  }

  return (
    <>
      <Stack spacing={"lg"} py={"md"}>
        <Stack
          spacing={0}
          style={{
            backgroundColor: AccentColor.blue,
            border: `2px solid ${AccentColor.darkblue}`,
            padding: "15px",
            cursor: "pointer",
            borderRadius: "10px",
            color: "white",
          }}
        >
          <Title order={5}>Mohon transfer ke rekening dibawah</Title>
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
          <Stack spacing={"md"}>
            <Stack spacing={0}>
              <Text>Bank {data?.MasterBank?.namaBank}</Text>
              <Text>{data?.MasterBank?.namaAkun}</Text>
            </Stack>
            <Paper
              style={{
                backgroundColor: AccentColor.darkblue,
                border: `2px solid ${AccentColor.blue}`,
                padding: "15px",
                cursor: "pointer",
                borderRadius: "10px",
                color: "white",
              }}
            >
              <Grid>
                <Grid.Col span={8}>
                  <Group position="left" align="center" h={"100%"}>
                    <Title order={4} color={MainColor.yellow}>
                      {data?.MasterBank?.norek}
                    </Title>
                  </Group>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Group position="right">
                    <CopyButton value={data?.MasterBank?.norek}>
                      {({ copied, copy }) => (
                        <Button
                          style={{
                            transition: "0.5s",
                          }}
                          radius={"xl"}
                          onClick={copy}
                          color={copied ? "teal" : "yellow"}
                          c={"black"}
                        >
                          {copied ? "Berhasil" : "Salin"}
                        </Button>
                      )}
                    </CopyButton>
                  </Group>
                </Grid.Col>
              </Grid>
            </Paper>
          </Stack>
        </Paper>

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
          <Stack spacing={"md"}>
            <Stack spacing={0}>
              <Text>Jumlah transfer</Text>
            </Stack>
            <Paper
              style={{
                backgroundColor: AccentColor.darkblue,
                border: `2px solid ${AccentColor.blue}`,
                padding: "15px",
                cursor: "pointer",
                borderRadius: "10px",
                color: "white",
              }}
            >
              <Grid>
                <Grid.Col span={8}>
                  <Group position="left" align="center" h={"100%"}>
                    <Title order={4} color="white">
                      <TampilanRupiahDonasi nominal={+(+data.nominal)} />
                    </Title>
                  </Group>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Group position="right">
                    <CopyButton value={"" + +data.nominal}>
                      {({ copied, copy }) => (
                        <Button
                          style={{
                            transition: "0.5s",
                          }}
                          variant="filled"
                          radius={"xl"}
                          color={copied ? "teal" : "yellow"}
                          c={"black"}
                          onClick={copy}
                        >
                          {copied ? "Berhasil" : "Salin"}
                        </Button>
                      )}
                    </CopyButton>
                  </Group>
                </Grid.Col>
              </Grid>
            </Paper>
          </Stack>
        </Paper>

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
          <Stack spacing={"sm"}>
            <Center>
              <FileButton
                onChange={async (files: any | null) => {
                  try {
                    setFile(files);
                    // onUpload({ invoiceId: data.id, file: files });
                  } catch (error) {
                    console.log(error);
                  }
                }}
                accept="image/png,image/jpeg"
              >
                {(props) => (
                  <Button
                    {...props}
                    radius={"xl"}
                    leftIcon={<IconCamera />}
                    bg={MainColor.yellow}
                    color="yellow"
                    c={"black"}
                  >
                    Upload
                  </Button>
                )}
              </FileButton>
            </Center>
            {file ? (
              <Center>
                <Group spacing={"xs"}>
                  <Text fz={"xs"} fs={"italic"}>
                    Upload berhasil{" "}
                  </Text>
                  <IconCircleCheck color="green" />
                </Group>
              </Center>
            ) : (
              <Center>
                <Text fz={"xs"} fs={"italic"}>
                  Upload bukti transfer anda !
                </Text>
              </Center>
            )}
          </Stack>
        </Paper>

        {file !== null ? (
          <Button
            radius={"xl"}
            bg={MainColor.yellow}
            color="yellow"
            c={"black"}
            loaderPosition="center"
            loading={isLoading}
            onClick={() => {
              onUpload();
            }}
          >
            Saya Sudah Transfer
          </Button>
        ) : (
          <Button disabled radius={"xl"}>
            Menunggu Bukti Transfer
          </Button>
        )}
      </Stack>
    </>
  );
}
