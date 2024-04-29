"use client";

import {
  ActionIcon,
  Affix,
  Badge,
  Box,
  Button,
  Grid,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Textarea,
  Transition,
  rem,
} from "@mantine/core";
import { useShallowEffect, useWindowScroll } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useState } from "react";
import { gs_colab_pesan } from "../../global_state";
import { IconArrowUp, IconCircle, IconSend } from "@tabler/icons-react";
import colab_funCreateMessageByUserId from "../../fun/create/room/fun_create_message_by_user_id";
import _ from "lodash";
import ComponentColab_IsEmptyData from "../../component/is_empty_data";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import colab_getMessageByRoomId from "../../fun/get/room_chat/get_message_by_room_id";
import mqtt_client from "@/util/mqtt_client";

export default function Colab_DetailGrupDiskusi({
  roomId,
  listMsg,
  userLoginId,
}: {
  roomId: string;
  listMsg: any[];
  userLoginId: string;
}) {
  const [pesan, setPesan] = useState("");
  const [obrolan, setObrolan] = useState<any[]>(listMsg);
  const [scroll, scrollTo] = useWindowScroll();

  useShallowEffect(() => {
    mqtt_client.subscribe(roomId);

    mqtt_client.on("message", (data: any, msg: any) => {
      onList(setObrolan);
    });
  }, [setObrolan]);

  async function onList(setObrolan: any) {
    await colab_getMessageByRoomId(roomId).then((val) =>
      setObrolan(_.reverse(val))
    );
  }

  async function onSend() {
    await colab_funCreateMessageByUserId(pesan, roomId).then(async (res) => {
      if (res.status === 200) {
        mqtt_client.publish(roomId, pesan);
        setPesan("");
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  // if (_.isEmpty(listMsg))
  //   return <ComponentColab_IsEmptyData text="Belum Ada Pesan" />;

  return (
    <>
      <Box h={"79vh"}>
        {/* <pre>{JSON.stringify(listMsg.map((e) => e.createdAt), null,2)}</pre> */}
        <ScrollArea h={"79vh"} scrollbarSize={2}>
          <Box>
            {_.isEmpty(obrolan) ? (
              <ComponentColab_IsEmptyData text="Belum Ada Pesan" />
            ) : (
              <Stack>
                {obrolan.map((e) => (
                  <Box key={e.id}>
                    {e?.User.id === userLoginId ? (
                      <Group position="right">
                        <Paper key={e.id} bg={"blue.2"} p={"sm"}>
                          <Stack spacing={0}>
                            <Text lineClamp={1} fw={"bold"} fz={"xs"}>
                              {e.User.Profile.name}
                            </Text>
                            <Text>{e.message}</Text>
                            <Group spacing={"xs"}>
                              <Text fz={7}>
                                {new Intl.DateTimeFormat("id-ID", {
                                  timeStyle: "medium",
                                }).format(e.createdAt)}
                              </Text>
                              <IconCircle size={3} />
                              <Text fz={7}>
                                {new Intl.DateTimeFormat("id-ID", {
                                  dateStyle: "medium",
                                }).format(e.createdAt)}
                              </Text>
                            </Group>
                          </Stack>
                        </Paper>
                      </Group>
                    ) : (
                      <Group position="left">
                        <Paper key={e.id} bg={"cyan.2"} p={"sm"} mr={"lg"}>
                          <Stack spacing={0}>
                            <Text lineClamp={1} fw={"bold"} fz={10}>
                              {e.User.Profile.name}
                            </Text>
                            <Text>{e.message}</Text>
                            <Group spacing={"xs"}>
                              <Text fz={7}>
                                {new Intl.DateTimeFormat("id-ID", {
                                  timeStyle: "medium",
                                }).format(e.createdAt)}
                              </Text>
                              <IconCircle size={3} />
                              <Text fz={7}>
                                {new Intl.DateTimeFormat("id-ID", {
                                  dateStyle: "medium",
                                }).format(e.createdAt)}
                              </Text>
                            </Group>
                          </Stack>
                        </Paper>
                      </Group>
                    )}
                  </Box>
                ))}
              </Stack>
            )}
          </Box>
        </ScrollArea>
      </Box>

      <Affix
        bg={"gray.2"}
        h={"10vh"}
        position={{ bottom: rem(0) }}
        w={"100%"}
        zIndex={99}
        p={"xs"}
      >
        <Stack justify="center" h={"100%"} px={"sm"}>
          <Grid align="center">
            <Grid.Col span={"auto"}>
              <Textarea
                minRows={1}
                radius={"md"}
                placeholder="Ketik pesan anda..."
                value={pesan}
                onChange={(val) => setPesan(val.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span={"content"}>
              <ActionIcon
                disabled={pesan === "" ? true : false}
                variant="filled"
                bg={"cyan"}
                radius={"xl"}
                size={"xl"}
                onClick={() => {
                  onSend();
                }}
              >
                <IconSend size={20} />
              </ActionIcon>
            </Grid.Col>
          </Grid>
        </Stack>
      </Affix>
    </>
  );
}
