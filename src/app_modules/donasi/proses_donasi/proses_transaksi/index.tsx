"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { Warna } from "@/app/lib/warna";
import {
  Center,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useInterval, useShallowEffect } from "@mantine/hooks";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { useAtom } from "jotai";
import moment from "moment";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Donasi_getOneInvoiceById } from "../../fun/get/get_one_invoice_by_id";
import { gs_donasi_hot_menu } from "../../global_state";
import { MODEL_DONASI_INVOICE } from "../../model/interface";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";

export default function Donasi_ProsesTransaksi({
  dataInvoice,
  nomorAdmin,
}: {
  dataInvoice: MODEL_DONASI_INVOICE;
  nomorAdmin: any;
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
        <Paper
          style={{
            backgroundColor: AccentColor.blue,
            border: `2px solid ${AccentColor.darkblue}`,
            padding: "15px",
            cursor: "pointer",
            borderRadius: "10px",
            color: "white",
          }}
        >
          <Stack spacing={"md"}>
            <Paper
              style={{
                backgroundColor: MainColor.darkblue,
                border: `2px solid ${AccentColor.darkblue}`,
                padding: "15px",
                cursor: "pointer",
                borderRadius: "10px",
                color: "white",
              }}
            >
              <Stack align="center" justify="center">
                <Title order={6}>Admin sedang memproses transaksimu</Title>
                <Paper radius={1000} w={100} h={100}>
                  <Center h={"100%"}>
                    <Loader size={"lg"} color="yellow" variant="bars" />
                  </Center>
                </Paper>
                <Title order={6}>Mohon menunggu !</Title>
              </Stack>
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
          }}
        >
          <Paper
            style={{
              backgroundColor: AccentColor.darkblue,
              border: `2px solid ${AccentColor.darkblue}`,
              padding: "15px",
              cursor: "pointer",
              borderRadius: "10px",
              color: "white",
            }}
          >
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
                href={`https://wa.me/+${nomorAdmin.nomor}?text=Hallo Admin , Saya ada kendala dalam proses transfer donasi!`}
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
