"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  ActionIcon,
  AspectRatio,
  Avatar,
  Badge,
  Button,
  Center,
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
  IconCircleChevronRight,
  IconClover,
  IconMail,
  IconMailAi,
  IconMessageChatbot,
  IconMoneybag,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ComponentDonasi_NotedBox from "../../component/noted_box";
import { ComponentDonasi_DetailDataMain } from "../../component/detail_main/detail_data_donasi";
import { MODEL_DONASI } from "../../model/interface";
import ComponentDonasi_CeritaPenggalangMain from "../../component/detail_main/cerita_penggalang";
import ComponentDonasi_InformasiPenggalangMain from "../../component/detail_main/informasi_penggalang";

export default function DetailMainDonasi({
  dataDonasi,
  countDonatur
}: {
  dataDonasi: MODEL_DONASI;
  countDonatur: number
}) {
  return (
    <>
      <Stack spacing={40}>
        <ComponentDonasi_DetailDataMain donasi={dataDonasi} countDonatur={countDonatur} />
        <ComponentDonasi_InformasiPenggalangMain author={dataDonasi.Author} />
        <ComponentDonasi_CeritaPenggalangMain donasi={dataDonasi} />
      </Stack>
    </>
  );
}
