"use client";

import {
  Box,
  Button,
  Center,
  CopyButton,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useAtom } from "jotai";
import { gs_proses_donasi } from "../../global_state";
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

export default function Donasi_InvoiceProses({
  dataInvoice,
}: {
  dataInvoice: MODEL_DONASI_INVOICE;
}) {
  const [invoice, setDataInvoice] = useState(dataInvoice);
  const router = useRouter();
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
                      <TampilanRupiahDonasi
                        nominal={+(+invoice.nominal + 2500)}
                      />
                    </Title>
                  </Group>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Group position="right">
                    <CopyButton value={"" + (+invoice.nominal + 2500)}>
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

        <Paper p={"sm"} withBorder>
          <Stack>
            <Text>Detail donasi</Text>
            <Paper p={"md"} bg={"gray.2"}>
              <Stack spacing={"lg"}>
                <Stack spacing={"xs"}>
                  <Title order={4}>{invoice.Donasi.title}</Title>
                  <Stack spacing={0}>
                    <Group spacing={5}>
                      <Text>Kategori</Text>
                      <Title order={5}>
                        {invoice.Donasi.DonasiMaster_Ketegori.name}
                      </Title>
                    </Group>
                    <ComponentDonasi_TampilanHitungMundur
                      durasi={invoice.Donasi.DonasiMaster_Durasi.name}
                      publishTime={invoice.Donasi.publishTime}
                      textSize={16}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Paper>

        <Button
          radius={"xl"}
          bg={"orange"}
          color="orange"
          onClick={() => onClick(router, invoice.id)}
        >
          Saya Sudah Transfer
        </Button>
      </Stack>
    </>
  );
}

async function onClick(router: AppRouterInstance, invoiceId: string) {
  await Donasi_funUpdateStatusInvoice(invoiceId, "2").then((res) => {
    if (res.status === 200) {
      NotifBerhasil(res.message);
      router.push(RouterDonasi.proses_transaksi + `${invoiceId}`);
    } else {
      NotifGagal(res.message);
    }
  });
}
