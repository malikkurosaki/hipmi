"use client";

import {
  Center,
  Grid,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import ComponentColab_AuthorNameOnHeader from "../../component/header_author_name";
import { IconChevronCompactRight, IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import {
  MODEL_COLLABORATION_ANGGOTA_ROOM_CHAT,
  MODEL_COLLABORATION_ROOM_CHAT,
} from "../../model/interface";
import { useState } from "react";
import _ from "lodash";
import ComponentColab_IsEmptyData from "../../component/is_empty_data";

export default function Colab_GrupDiskus({
  listRoom,
}: {
  listRoom?: MODEL_COLLABORATION_ANGGOTA_ROOM_CHAT[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [idRoom, setIdRoom] = useState("");

  if (_.isEmpty(listRoom))
    return <ComponentColab_IsEmptyData text="Tidak Ada Data" />;

  return (
    <>
      <Stack>
        {listRoom?.map((e, i) => (
          <Paper
            key={i}
            withBorder
            shadow="lg"
            p={"md"}
            onClick={() => {
              router.push(
                RouterColab.group_chat + e?.ProjectCollaboration_RoomChat.id
              );
              setIdRoom(e?.ProjectCollaboration_RoomChat.id);
              setLoading(true);
            }}
          >
            <Grid align="center" h={"100%"}>
              <Grid.Col span={"auto"}>
                <Stack spacing={0}>
                  <Text fw={"bold"} lineClamp={1}>
                    {e?.ProjectCollaboration_RoomChat?.name}
                  </Text>
                  <Text fz={"xs"} c={"gray"}>
                    {
                      e?.ProjectCollaboration_RoomChat
                        ?.ProjectCollaboration_AnggotaRoomChat.length
                    }{" "}
                    Anggota
                  </Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={"content"}>
                <Center>
                  {e?.ProjectCollaboration_RoomChat?.id === idRoom ? (
                    <Loader color="gray" size={20} />
                  ) : (
                    <IconChevronRight color="gray" />
                  )}
                </Center>
              </Grid.Col>
            </Grid>
          </Paper>
        ))}
      </Stack>
    </>
  );
}
