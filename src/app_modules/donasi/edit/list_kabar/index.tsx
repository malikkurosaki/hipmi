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
import { MainColor } from "@/app_modules/_global/color/color_pallet";

export default function ListKabarDonasi({
  donasiId,
  listKabar,
}: {
  donasiId: string;
  listKabar: MODEL_DONASI_KABAR[];
}) {
  const router = useRouter();
  const [kabar, setKabar] = useState(listKabar);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Stack>
        <Button
          loaderPosition="center"
          loading={isLoading ? true : false}
          leftIcon={<IconCirclePlus />}
          radius={"xl"}
          onClick={() => {
            setIsLoading(true);
            router.push(RouterDonasi.create_kabar + `${donasiId}`);
          }}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
        >
          Tambah Kabar
        </Button>
        {kabar.map((e, i) => (
          <Box key={i}>
            <ComponentDonasi_ListKabar
              kabar={e}
              route={RouterDonasi.update_kabar}
            />
          </Box>
        ))}
      </Stack>
    </>
  );
}
