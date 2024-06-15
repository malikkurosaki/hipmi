"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  ActionIcon,
  AspectRatio,
  Avatar,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Progress,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconClover,
  IconMessageChatbot,
  IconMoneybag,
  IconCircleChevronRight,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ComponentDonasi_NotedBox from "../../component/noted_box";
import { useState } from "react";
import { MODEL_DONASI, MODEL_DONASI_INVOICE } from "../../model/interface";
import TampilanRupiahDonasi from "../../component/tampilan_rupiah";
import { ComponentDonasi_DetailDataMain } from "../../component/detail_main/detail_data_donasi";
import ComponentDonasi_InformasiPenggalangMain from "../../component/detail_main/informasi_penggalang";
import ComponentDonasi_CeritaPenggalangMain from "../../component/detail_main/cerita_penggalang";

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
      <Stack>
        <Stack spacing={0}>
          <Text>Donasi Saya:</Text>
          <Title order={4} c={"blue"}>
            <TampilanRupiahDonasi nominal={+invoice.nominal} />
          </Title>
        </Stack>
        <ComponentDonasi_DetailDataMain
          donasi={invoice.Donasi}
          countDonatur={countDonatur}
        />
        <ComponentDonasi_InformasiPenggalangMain
          author={invoice.Donasi.Author}
        />
        <ComponentDonasi_CeritaPenggalangMain donasi={invoice.Donasi} />
      </Stack>
    </>
  );
}





