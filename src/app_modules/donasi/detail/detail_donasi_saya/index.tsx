"use client";

import { Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import ComponentDonasi_CeritaPenggalangMain from "../../component/detail_main/cerita_penggalang";
import { ComponentDonasi_DetailDataMain } from "../../component/detail_main/detail_data_donasi";
import ComponentDonasi_InformasiPenggalangMain from "../../component/detail_main/informasi_penggalang";
import TampilanRupiahDonasi from "../../component/tampilan_rupiah";
import { MODEL_DONASI_INVOICE } from "../../model/interface";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";

export default function DetailDonasiSaya({
  dataDonasi,
  countDonatur,
}: {
  dataDonasi: MODEL_DONASI_INVOICE;
  countDonatur: number;
}) {
  const [invoice, setInvoice] = useState(dataDonasi);
  return (
    <>
      <Stack pb={"lg"}>
        <Stack
          spacing={0}
          style={{
            padding: "15px",
            border: `2px solid ${AccentColor.blue}`,
            backgroundColor: AccentColor.darkblue,
            borderRadius: "10px",
            color: "white",
          }}
          align={"center"}
        >
          <Text>Donasi Saya:</Text>
          <Title order={4} c={"blue"}>
            <TampilanRupiahDonasi nominal={+invoice?.nominal} />
          </Title>
        </Stack>
        <ComponentDonasi_DetailDataMain
          donasi={invoice?.Donasi}
          countDonatur={countDonatur}
        />
        <ComponentDonasi_InformasiPenggalangMain
          author={invoice?.Donasi.Author}
        />
        <ComponentDonasi_CeritaPenggalangMain donasi={invoice?.Donasi} />
      </Stack>
    </>
  );
}
