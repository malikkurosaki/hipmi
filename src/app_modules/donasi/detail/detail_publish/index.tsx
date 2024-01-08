"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  Stack,
  AspectRatio,
  Paper,
  Title,
  Progress,
  Grid,
  Group,
  Divider,
  ActionIcon,
  Avatar,
  Text,
  Image,
} from "@mantine/core";
import {
  IconClover,
  IconMail,
  IconMoneybag,
  IconCircleChevronRight,
  IconMessageChatbot,
} from "@tabler/icons-react";
import { MODEL_DONASI } from "../../model/interface";
import { useState } from "react";
import ComponentDonasi_CeritaPenggalangMain from "../../component/detail_main/cerita_penggalang";
import { ComponentDonasi_DetailDataMain } from "../../component/detail_main/detail_data_donasi";
import _ from "lodash";
import ComponentDonasi_InformasiPenggalangMain from "../../component/detail_main/informasi_penggalang";

export default function DetailPublishDonasi({
  dataPublish,
  countDonatur
}: {
  dataPublish: MODEL_DONASI;
  countDonatur: number
}) {
  const [donasi, setDonasi] = useState(dataPublish);
  return (
    <>
      {/* <pre>{JSON.stringify(donasi,null,2)}</pre> */}
      <Stack spacing={40}>
        <ComponentDonasi_DetailDataMain donasi={donasi} countDonatur={countDonatur} />
        <ComponentDonasi_InformasiPenggalangMain author={donasi.Author}/>
        <ComponentDonasi_CeritaPenggalangMain donasi={donasi} />
      </Stack>
    </>
  );
}


