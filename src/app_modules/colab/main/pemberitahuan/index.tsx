"use client";

import {
  ActionIcon,
  Center,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import ComponentColab_IsEmptyData from "../../component/is_empty_data";
import _ from "lodash";
import { MODEL_COLLABORATION_NOTIFIKSI } from "../../model/interface";
import { IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import colab_funUpdateIsReadByNotifId from "../../fun/edit/fun_is_read_by_id";

export default function Colab_NotifikasiView({
  listNotifikasi,
}: {
  listNotifikasi?: MODEL_COLLABORATION_NOTIFIKSI[];
}) {
  const router = useRouter();
  const [notifId, setNotifId] = useState("");

  if (_.isEmpty(listNotifikasi))
    return <ComponentColab_IsEmptyData text="Tidak ada data" />;

  async function onRead(notifId: string) {
    await colab_funUpdateIsReadByNotifId(notifId).then((res) => {
      if (res.status === 200) {
        setNotifId(notifId);
        router.push(RouterColab.detail_notifikasi + notifId);
      } else {
        console.log(``);
      }
    });
  }
  return (
    <>
      <Stack>
        {listNotifikasi?.map((e, i) => (
          <Paper
            key={i}
            bg={e?.isRead ? "gray.1" : "gray.4"}
            p={"md"}
            onClick={() => {
              onRead(e?.id);
            }}
          >
            <Group position="apart">
              <Stack spacing={0} w={"80%"}>
                <Text fw={"bold"} fz={"xs"} lineClamp={1}>
                  {e.note}
                </Text>
                <Text lineClamp={1}>{e.ProjectCollaboration.report}</Text>
              </Stack>
              <ActionIcon
                variant="transparent"
                loading={e?.id === notifId ? true : false}
              >
                <IconChevronRight />
              </ActionIcon>
            </Group>
          </Paper>
        ))}
      </Stack>
    </>
  );
}
