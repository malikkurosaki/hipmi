"use client";

import { useState } from "react";
import { MODEL_DONASI_NOTIF } from "../../model/interface";
import {
  Box,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import moment from "moment";

import kabar from "../../detail/detail_main/kabar";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Donasi_funUpdateNotifById } from "../../fun/update/fun_update_notif_by_user_id";
import { NotifGagal } from "../../component/notifikasi/notif_gagal";
import { useRouter } from "next/navigation";
import _ from "lodash";
import ComponentDonasi_IsEmptyData from "../../component/is_empty_data";

export default function Donasi_NotifPage({
  dataNotif,
}: {
  dataNotif: MODEL_DONASI_NOTIF[];
}) {
  const router = useRouter();
  const [notif, setNotif] = useState(dataNotif);

  if (_.isEmpty(dataNotif)) {
    return <ComponentDonasi_IsEmptyData text="Tidak ada data" />;
  }

  return (
    <>
      <Box>
        {/* <pre>{JSON.stringify(notif, null, 2)}</pre> */}
        <SimpleGrid
          cols={4}
          spacing="lg"
          breakpoints={[
            { maxWidth: "md", cols: 3, spacing: "md" },
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "xs", cols: 1, spacing: "sm" },
          ]}
        >
          {notif.map((e) => (
            <Paper
              key={e.id}
              bg={e.isRead === false ? "gray.5" : "gray.1"}
              p={"sm"}
            >
              <Stack spacing={"xs"}>
                <Stack>
                  <Group position="apart">
                    <Text fw={"bold"} truncate>
                      {e.Donasi_Kabar?.title}
                    </Text>
                    <Text fz={"xs"}>{moment(e.createdAt).format("ll")}</Text>
                  </Group>
                  <Stack spacing={0}>
                    <Text lineClamp={2}>{e.Donasi_Kabar?.deskripsi}</Text>
                    <Text
                      c={"blue"}
                      onClick={() =>
                        onClick(router as any, e.Donasi_Kabar?.id, e.id)
                      }
                    >
                      Buka Kabar
                    </Text>
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}

async function onClick(
  router: AppRouterInstance,
  kabarId: string,
  notifId: string
) {
  await Donasi_funUpdateNotifById(notifId).then((res) => {
    if (res.status === 200) {
      router.push(RouterDonasi.detail_notif + `${kabarId}`);
    } else {
      NotifGagal("Server Error");
    }
  });
}
