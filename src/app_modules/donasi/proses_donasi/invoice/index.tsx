"use client";

import {
  Box,
  Button,
  Center,
  CopyButton,
  FileButton,
  FileInput,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useAtom } from "jotai";
import { gs_donasi_hot_menu, gs_proses_donasi } from "../../global_state";
import { MODEL_DONASI, MODEL_DONASI_INVOICE } from "../../model/interface";
import { useState } from "react";
import TampilanRupiahDonasi from "../../component/tampilan_rupiah";
import ComponentDonasi_TampilanHitungMundur from "../../component/tampilan_hitung_mundur";
import { useRouter } from "next/navigation";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Donasi_funUpdateStatusInvoice } from "../../fun/update/fun_update_status_invoice";
import { NotifBerhasil } from "../../component/notifikasi/notif_berhasil";
import { NotifGagal } from "../../component/notifikasi/notif_gagal";
import { Donasi_funUploadBuktiTransferById } from "../../fun/update/fun_update_invoice";
import { buffer } from "stream/consumers";
import { IconCamera, IconCheck, IconCircleCheck } from "@tabler/icons-react";

export default function Donasi_InvoiceProses({
  dataInvoice,
}: {
  dataInvoice: MODEL_DONASI_INVOICE;
}) {
  const [invoice, setDataInvoice] = useState(dataInvoice);
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<any | null>(null);
  const [active, setActive] = useAtom(gs_donasi_hot_menu);

  return (
    <>
      <Stack spacing={"lg"}>
        <Stack spacing={0}>
          <Title order={5}>Mohon transfer ke rekening dibawah</Title>
          <Group spacing={"xs"}>
            <Text>untuk diteruskan ke </Text>
            <Text fw={"bold"}>{invoice.Donasi.Author.username}</Text>
          </Group>
        </Stack>

        <Paper p={"sm"} withBorder>
          <Stack spacing={"md"}>
            <Stack spacing={0}>
              <Text>Bank {invoice.DonasiMaster_Bank.name}</Text>
              <Text>PT. Himpunan Pengusaha Badung</Text>
            </Stack>
            <Paper bg={"gray.1"} p={"sm"} radius={"md"}>
              <Grid>
                <Grid.Col span={8}>
                  <Group position="left" align="center" h={"100%"}>
                    <Title order={4}>{invoice.DonasiMaster_Bank.norek}</Title>
                  </Group>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Group position="right">
                    <CopyButton value={invoice.DonasiMaster_Bank.norek}>
                      {({ copied, copy }) => (
                        <Button
                          color={copied ? "teal" : "blue"}
                          variant="outline"
                          radius={"xl"}
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

        <Paper p={"sm"} withBorder>
          <Stack spacing={"md"}>
            <Stack spacing={0}>
              <Text>Jumlah transfer</Text>
            </Stack>
            <Paper bg={"gray.1"} p={"sm"} radius={"md"}>
              <Grid>
                <Grid.Col span={8}>
                  <Group position="left" align="center" h={"100%"}>
                    <Title order={4}>
                      <TampilanRupiahDonasi nominal={+(+invoice.nominal)} />
                    </Title>
                  </Group>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Group position="right">
                    <CopyButton value={"" + +invoice.nominal}>
                      {({ copied, copy }) => (
                        <Button
                          color={copied ? "teal" : "blue"}
                          variant="outline"
                          radius={"xl"}
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
            <Text fz={"xs"} c={"gray"}>
              Sudah termasuk biaya admin Rp. 2.500,-
            </Text>
          </Stack>
        </Paper>

        <Paper p={"md"} withBorder>
          <Stack spacing={"sm"}>
            <Center>
              <FileButton
                onChange={async (files: any | null) => {
                  try {
                    // const buffer = URL.createObjectURL(
                    //   new Blob([new Uint8Array(await files.arrayBuffer())])
                    // );
                    // console.log(buffer, "ini buffer");
                    // console.log(files, " ini file");
                    setFile(files);
                    onUpload(invoice.id, files);
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
                    variant="outline"
                    w={150}
                    leftIcon={<IconCamera />}
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
            bg={"orange"}
            color="orange"
            onClick={() => onClick(router, invoice.id, setActive)}
          >
            Saya Sudah Transfer
          </Button>
        ) : (
          <Button
            disabled
            radius={"xl"}
            //  bg={"orange"}
            //  color="orange"
            //  onClick={() => onClick(router, invoice.id)}
          >
            Menunggu Bukti Transfer
          </Button>
        )}
      </Stack>
    </>
  );
}

async function onClick(
  router: AppRouterInstance,
  invoiceId: string,
  setActive: any
) {
  await Donasi_funUpdateStatusInvoice(invoiceId, "2").then((res) => {
    if (res.status === 200) {
      NotifBerhasil(res.message);
      setActive(2);
      router.push(RouterDonasi.proses_transaksi + `${invoiceId}`);
    } else {
      NotifGagal(res.message);
    }
  });
}

async function onUpload(invoiceId: string, file: FormData) {
  const gambar = new FormData();
  gambar.append("file", file as any);

  await Donasi_funUploadBuktiTransferById(invoiceId, gambar).then((res) => {
    if (res.status === 200) {
      NotifBerhasil(res.message);
    } else {
      NotifGagal(res.message);
    }
  });
}
