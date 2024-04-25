"use client";

import {
  ActionIcon,
  Affix,
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
import { IconArrowUp, IconSend } from "@tabler/icons-react";
import colab_funCreateMessageByUserId from "../../fun/create/room/fun_create_message_by_user_id";
import _ from "lodash";
import ComponentColab_IsEmptyData from "../../component/is_empty_data";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import colab_getMessageByRoomId from "../../fun/get/room_chat/get_message_by_room_id";

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

  async function onSend() {
    scrollTo({ y: -0 });

    // await colab_funCreateMessageByUserId(pesan, roomId).then(async (res) => {
    //   if (res.status === 200) {
    //     await colab_getMessageByRoomId(roomId).then((val) => setObrolan(val));
    //     setPesan("");
    //   } else {
    //     ComponentGlobal_NotifikasiGagal(res.message);
    //   }
    // });
  }

  // if (_.isEmpty(listMsg))
  //   return <ComponentColab_IsEmptyData text="Belum Ada Pesan" />;

  return (
    <>
      <Box h={"78vh"}>
        <ScrollArea h={"78vh"} scrollbarSize={2}>
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
                            <Text fw={"bold"} fz={"xs"}>
                              {e.User.Profile.name}
                            </Text>
                            <Text>{e.message}</Text>
                          </Stack>
                        </Paper>
                      </Group>
                    ) : (
                      <Group position="left">
                        <Paper key={e.id} bg={"cyan.2"} p={"sm"} mr={"lg"}>
                          <Stack spacing={0}>
                            <Text fw={"bold"} fz={"xs"}>
                              {e.User.Profile.name}
                            </Text>
                            <Text>{e.message}</Text>
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
                placeholder="Pesan..."
                value={pesan}
                onChange={(val) => setPesan(val.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span={"content"}>
              <ActionIcon
                variant="outline"
                radius={"xl"}
                size={"lg"}
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
