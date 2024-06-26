"use client";

import { useState } from "react";
import { MODEL_Transaksi_Investasi } from "../model/model_investasi";
import { Button, Group, Paper, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";

export default function StatusPesananInvetsatsi({
  dataTransaksi,
}: {
  dataTransaksi: MODEL_Transaksi_Investasi;
}) {
    const router = useRouter()
  const [transaksi, setTransaksi] = useState(dataTransaksi);
  
  return (
    <>
      <Stack>
        <Paper withBorder p={"md"}>
          <Stack>
            <Stack spacing={0}>
              <Text fw={"bold"}>Pemilik Investasi</Text>
              <Text>{transaksi.Investasi.author.username}</Text>
            </Stack>
            <Stack spacing={0}>
              <Text fw={"bold"}>Nomor Telephone</Text>
              <Text>{transaksi.Investasi.author.nomor}</Text>
            </Stack>
            <Stack spacing={0}>
              <Text fw={"bold"}>Nama Proyek Investasi </Text>
              <Text>{transaksi.Investasi.title}</Text>
            </Stack>
          </Stack>
        </Paper>
        <Paper withBorder p={"md"}>
          <Stack>
            <Stack spacing={0}>
              <Text fw={"bold"}>Transaksi ID</Text>
              <Text>{transaksi.transaction_id}</Text>
            </Stack>
            <Stack spacing={0}>
              <Text fw={"bold"}>Lembar Terbeli</Text>
              <Text>{new Intl.NumberFormat("id-ID").format(+transaksi.quantity)} lembar</Text>
            </Stack>
            <Stack spacing={0}>
              <Text fw={"bold"}>Total Transfer</Text>
              <Text>Rp. {new Intl.NumberFormat("id-ID", {maximumFractionDigits: 10}).format(+transaksi.gross_amount)}</Text>
            </Stack>
            <Stack spacing={0}>
              <Text fw={"bold"}>Tipe Pembayaran</Text>
              <Text>{transaksi.payment_type.replace('_', " ")}</Text>
            </Stack>
            <Stack spacing={0}>
              <Text fw={"bold"}>Nama Bank</Text>
              <Text>{transaksi.namaBank}</Text>
            </Stack>
            <Stack spacing={0}>
              <Text fw={"bold"}>Status Pembayaran</Text>
              <Text>{transaksi.status_message}</Text>
            </Stack>
          </Stack>
        </Paper>
        <Button radius={"xl"} onClick={() => router.push(RouterInvestasi.main_transaksi)}>
            Kembali ke List Transaksi
        </Button>
      </Stack>
    </>
  );
}
