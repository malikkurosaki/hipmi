"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  AspectRatio,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { MODEL_DONASI_INVOICE } from "../model/interface";
import { useState } from "react";
import TampilanRupiahDonasi from "../component/tampilan_rupiah";
import ComponentDonasi_TampilanHitungMundur from "../component/tampilan_hitung_mundur";
import moment from "moment";
import toast from "react-simple-toasts";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import _ from "lodash";

export default function DonasiSayaDonasi({
  listInvoice,
}: {
  listInvoice: MODEL_DONASI_INVOICE[];
}) {
  const [invoice, setInvoice] = useState(listInvoice);
  const router = useRouter();
  const { height, width } = useViewportSize();
  if (_.isEmpty(invoice))
    return (
      <>
        <Center h={"80vh"}>Belum Ada Donasi</Center>
      </>
    );
  return (
    <>
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: "62rem", cols: 3, spacing: "md" },
          { maxWidth: "48rem", cols: 2, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        {invoice.map((e, i) => (
          <Box
            key={i}
            onClick={() =>
              onClick(router, e.donasiMaster_StatusInvoiceId, e.id, e.Donasi.id)
            }
          >
            <Stack>
              <Grid>
                <Grid.Col span={5}>
                  <Stack spacing={5}>
                    <Stack spacing={0}>
                      <Text fz={"xs"} fw={"bold"} truncate>
                        {e.Donasi.title}
                      </Text>
                      <ComponentDonasi_TampilanHitungMundur
                        durasi={e.Donasi.DonasiMaster_Durasi.name}
                        publishTime={e.Donasi.publishTime}
                        textSize={10}
                      />
                    </Stack>
                    <Progress value={+e.Donasi.progres} color="orange" />
                    <Group position="apart">
                      <Stack spacing={0}>
                        <Text fz={10}>Donasi Saya</Text>
                        <Text fz={10} fw={"bold"} c={"orange"} truncate>
                          <TampilanRupiahDonasi nominal={+e.nominal} />
                        </Text>
                      </Stack>
                    </Group>
                    <Badge size="xs" variant="dot">
                      <Text>{e.DonasiMaster_StatusInvoice.name}</Text>
                    </Badge>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={7}>
                  <AspectRatio ratio={16 / 9}>
                    <Paper radius={"md"}>
                      <Image
                        alt="Foto"
                        src={RouterDonasi.api_gambar + `${e.Donasi.imagesId}`}
                        radius={"md"}
                      />
                    </Paper>
                  </AspectRatio>
                </Grid.Col>
              </Grid>
              {width > 575 ? "" : <Divider />}
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
}

function HitungMundur({
  durasi,
  publishTime,
}: {
  durasi: string;
  publishTime: Date;
}) {
  return (
    <>
      <Stack spacing={0} align="center">
        <Text fz={"xs"}>Sisa hari </Text>
        <Text span inherit fw={"bold"} fz={"xs"}>
          {Number(durasi) -
            moment(new Date()).diff(new Date(publishTime), "days") <=
          0
            ? 0
            : Number(durasi) -
              moment(new Date()).diff(new Date(publishTime), "days")}
        </Text>
      </Stack>
    </>
  );
}

async function onClick(
  router: AppRouterInstance,
  status: string,
  invoiceId: string,
  donasiId: string
) {
  if (status === "1") {
    return router.push(RouterDonasi.detail_donasi_saya + `${invoiceId}`);
  } else {
    if (status === "2") {
      return router.push(RouterDonasi.proses_transaksi + `${invoiceId}`);
    } else {
      if (status === "3") {
        return router.push(RouterDonasi.invoice + `${invoiceId}`);
      } else {
        toast("gagal");
      }
    }
  }
}
