"use client";

import {
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

export default function Donasi_ProsesTransaksi({
  dataInvoice,
}: {
  dataInvoice: MODEL_DONASI_INVOICE;
}) {
  const [invoice, setInvoice] = useState(dataInvoice);
  const [hotMenu, setHotMenu] = useAtom(gs_donasi_hot_menu);
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

  if (invoice.donasiMaster_StatusInvoiceId === "1") {
    
    redirect(RouterDonasi.detail_donasi_saya + `${invoice.id}`);
  }

  return (
    <>
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
    </>
  );
}
