"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconCirclePlus,
  IconEdit,
  IconEditCircle,
  IconTrash,
} from "@tabler/icons-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MODEL_DONASI_KABAR } from "../../model/interface";
import { useState } from "react";
import ComponentDonasi_ListKabar from "../../component/detail_main/list_kabar";

export default function ListKabarDonasi({
  donasiId,
  listKabar,
}: {
  donasiId: string;
  listKabar: MODEL_DONASI_KABAR[];
}) {
  const router = useRouter();
  const [kabar, setKabar] = useState(listKabar);
  return (
    <>
      <Stack>
        <Button
          leftIcon={<IconCirclePlus />}
          radius={"xl"}
          onClick={() => router.push(RouterDonasi.create_kabar + `${donasiId}`)}
        >
          Tambah Kabar
        </Button>
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
            <ComponentDonasi_ListKabar kabar={e} route={RouterDonasi.update_kabar}/>
           </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
}
