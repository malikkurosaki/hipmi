"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import ComponentDonasi_ListKabar from "@/app_modules/donasi/component/detail_main/list_kabar";
import { MODEL_DONASI_KABAR } from "@/app_modules/donasi/model/interface";
import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Paper,
  SimpleGrid,
  Spoiler,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconCircleChevronRight } from "@tabler/icons-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function KabarDonasi({
  listKabar,
}: {
  listKabar: MODEL_DONASI_KABAR[];
}) {
  const router = useRouter();
  const [kabar, setKabar] = useState(listKabar);
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
        {kabar.map((e, i) => (
         <Box key={i}>
          <ComponentDonasi_ListKabar kabar={e} route={RouterDonasi.detail_kabar} />
         </Box>
        ))}
      </SimpleGrid>
    </>
  );
}
