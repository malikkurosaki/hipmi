"use client";

import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Center,
  CopyButton,
  Grid,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import invoice from "../invoice";
import { MODEL_DONASI_INVOICE } from "../../model/interface";
import { useState } from "react";
import { useInterval, useShallowEffect } from "@mantine/hooks";
import { redirect, useRouter } from "next/navigation";
import { Donasi_getOneInvoiceById } from "../../fun/get/get_one_invoice_by_id";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { useAtom } from "jotai";
import { gs_donasi_hot_menu } from "../../global_state";
import moment from "moment";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { Warna } from "@/app/lib/warna";
import Link from "next/link";

export default function Donasi_ProsesTransaksi({
  dataInvoice,
  nomorAdmin,
}: {
  dataInvoice: MODEL_DONASI_INVOICE;
  nomorAdmin: any
}) {
  const [invoice, setInvoice] = useState(dataInvoice);
  const [hotMenu, setHotMenu] = useAtom(gs_donasi_hot_menu);
  const [countD, setCountD] = useState<Date | any>();
  const interval = useInterval(
    () =>
      reloadData(invoice.id).then((res) =>
        setInvoice(res as MODEL_DONASI_INVOICE)
      ),
    5000
  );

  useShallowEffect(() => {
    interval.start();
  }, [invoice.id]);

  function reloadData(invoiceId: string) {
    const res = Donasi_getOneInvoiceById(invoiceId);
    return res;
  }

  //-------------------------------------------------//

  // const inter2 = useInterval(
  //   () => cekCD().then((res) => console.log(res)),
  //   1000
  // );

  // useShallowEffect(() => {
  //   inter2.start();
  // }, []);

  async function cekCD() {
    const date = new Date().getTime();
    // const jam = date.toTimeString()
    // const cd = moment(jam).diff((invoice.createdAt), "hour")
    var a = moment.duration(date).asSeconds();
    return a;
  }

  if (invoice.donasiMaster_StatusInvoiceId === "1") {
    redirect(RouterDonasi.detail_donasi_saya + `${invoice.id}`);
  }

  return (
    <>
      <Stack>
        <Paper p={"sm"} withBorder>
          <Stack spacing={"md"}>
            <Paper bg={"gray.1"} p={"sm"} radius={"md"}>
              <Stack align="center" justify="center">
                <Title order={6}>Admin sedang memproses transaksimu</Title>
                <Paper radius={1000} w={100} h={100}>
                  <Center h={"100%"}>
                    <Loader size={"lg"} color="orange" variant="bars" />
                  </Center>
                </Paper>
                <Title order={6}>Mohon menunggu !</Title>
              </Stack>
            </Paper>
          </Stack>
        </Paper>
        <Paper p={"sm"} withBorder>
          <Paper bg={"gray.1"} p={5} radius={"md"}>
            <Group position="center">
              <Stack spacing={0}>
                <Text fz={"xs"} fs={"italic"}>
                  Hubungi admin jika tidak kunjung di proses!
                </Text>
                <Text fz={"xs"} fs={"italic"}>
                  Klik pada logo Whatsapp ini.
                </Text>
              </Stack>
              <Link
                color="white"
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
                target="_blank"
                href={
                  `https://wa.me/+${nomorAdmin.nomor}?text=Hallo Admin , Saya ada kendala dalam proses transfer donasi!`
                }
              >
                <IconBrandWhatsapp size={40} color={Warna.hijau_cerah} />
              </Link>
            </Group>
          </Paper>
        </Paper>
      </Stack>
    </>
  );
}
