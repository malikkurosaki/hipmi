"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Center,
  Code,
  Grid,
  Group,
  Header,
  Loader,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import {
  IconChevronLeft,
  IconCircle,
  IconInfoSquareRounded,
  IconSend,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import router from "next/router";
import React, { useRef, useState } from "react";
import {
  MODEL_COLLABORATION_MESSAGE,
  MODEL_COLLABORATION_ROOM_CHAT,
} from "../../model/interface";
import _ from "lodash";
import ComponentColab_IsEmptyData from "../../component/is_empty_data";
import colab_getMessageByRoomId from "../../fun/get/room_chat/get_message_by_room_id";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import colab_funCreateMessageByUserId from "../../fun/create/room/fun_create_message_by_user_id";
import { useShallowEffect } from "@mantine/hooks";
import mqtt_client from "@/util/mqtt_client";
import useInfiniteScroll, {
  ScrollDirection,
  ScrollDirectionBooleanState,
} from "react-easy-infinite-scroll-hook";
import toast from "react-simple-toasts";
import colab_getOneMessageById from "../../fun/get/room_chat/get_one_message_by_id";
import { List } from "react-virtualized";
import { evnPesan } from "@/util/evn";

const list = Array(100).fill(0);
export default function ColabViewChat({
  userLoginId,
  listMsg,
  dataRoom,
}: {
  userLoginId: string;
  listMsg: MODEL_COLLABORATION_MESSAGE[];
  dataRoom?: MODEL_COLLABORATION_ROOM_CHAT | any;
}) {
  // Tamplate app layout
  const router = useRouter();
  const [loadingBack, setLoadingBack] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(false);

  // State message
  const [msg, setMsg] = useState("");
  const [data, setData] = useState(listMsg);

  // State infinite scroll
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [hasMore, setHasMore] = useState<ScrollDirectionBooleanState>({
    up: true,
    down: false,
  });

  const [topik, setTopic] = useState("")

  useShallowEffect(() => {
    evnPesan.on(topik, (msgg) => {
      let dd: any[] = _.clone(data);
      const a = [...dd, JSON.parse(msgg)];
      // console.log(dd.length);
      setData(a);
    });
  }, [data]);

  

  // Kirim pesan
  async function onSend() {

    // console.log(JSON.stringify(data[0], null, 2));
    const kiriman = {
      id: "clw8glvt4000j12efrecoubug",
      createdAt: "2024-05-15T23:35:05.032Z",
      isActive: true,
      message: msg,
      isFile: false,
      User: {
        id: "clvag8xt10007134j8sapm46n",
        Profile: {
          id: "clvajdger000g134jhhhg21c4",
          name: "malikkurosaki",
        },
      },
    };
    mqtt_client.publish("pesan", JSON.stringify(kiriman));
    // await colab_funCreateMessageByUserId(msg, dataRoom.id).then(async (res) => {
    //   if (res.status === 200) {
    //     const newData = await colab_getMessageByRoomId({
    //       roomId: dataRoom?.id,
    //       page: 1,
    //     });

    //     setData(newData as any);
    //     setHasMore({ up: true });

        setMsg("");
    //   } else {
    //     ComponentGlobal_NotifikasiGagal(res.message);
    //   }
    // });
  }

  const next = async (direction: ScrollDirection) => {
    try {
      setIsLoading(true);
      await new Promise((a) => setTimeout(a, 500));

      const newData = await colab_getMessageByRoomId({
        roomId: dataRoom?.id,
        page: totalPage + 1,
      });
      setTotalPage(totalPage + 1);

      // console.log(newData, "loading baru");

      if (_.isEmpty(newData)) {
        setHasMore({ up: false });
      } else {
        const d: any =
          direction === "down" ? [...data, ...newData] : [...newData, ...data];
        setData(d);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const ref: any = useInfiniteScroll({
    next,
    rowCount: data.length,
    hasMore,
    scrollThreshold: 0.1,
  });

  return (
    <>
      <Box h={"100vh"}>
        {/* Header */}

        <Box
          style={{
            zIndex: 99,
          }}
          w={"100%"}
          pos={"fixed"}
          top={0}
          h={"7vh"}
        >
          <Stack bg={"gray.2"} h={"100%"} justify="center" px={"sm"}>
            <Grid grow gutter={"lg"}>
              <Grid.Col span={2}>
                <ActionIcon
                  loading={loadingBack ? true : false}
                  variant="transparent"
                  radius={"xl"}
                  onClick={() => {
                    setLoadingBack(true);
                    router.back();
                  }}
                >
                  <IconChevronLeft />
                </ActionIcon>
              </Grid.Col>
              <Grid.Col span={8}>
                <Center>
                  <Title order={5} lineClamp={1}>
                    {dataRoom?.name}
                  </Title>
                </Center>
              </Grid.Col>
              <Grid.Col span={2}>
                <Group position="right">
                  <ActionIcon
                    loading={loadingInfo ? true : false}
                    variant="transparent"
                    radius={"xl"}
                    onClick={() => {
                      setLoadingInfo(true);
                      router.push(RouterColab.info_grup + dataRoom?.id);
                    }}
                  >
                    <IconInfoSquareRounded />
                  </ActionIcon>
                </Group>
              </Grid.Col>
            </Grid>
          </Stack>
        </Box>

        {/* Main View */}

        <Box pos={"static"}>
          <Box
            style={{
              height: "7vh",
              display: "flex",
              flexDirection: "column-reverse",
            }}
          />
          {/* Chat View */}
          <Box h={"82vh"} px={"xs"}>
            <Stack justify="flex-end" h={"100%"}>
              <div
                ref={ref as any}
                style={{
                  overflowY: "auto",
                }}
              >
                {isLoading && (
                  <Center>
                    <Loader size={20} color="gray" />
                  </Center>
                )}
                {_.isEmpty(data) ? (
                  <ComponentColab_IsEmptyData text="Belum ada pesan" />
                ) : (
                  data.map((e, i) => (
                    <Box key={i}>
                      {userLoginId === e?.User?.id ? (
                        <Group position="right">
                          <Paper key={e?.id} bg={"blue.2"} p={"sm"} mt={"sm"}>
                            <Stack spacing={0}>
                              <Text lineClamp={1} fw={"bold"} fz={"xs"}>
                                {e?.User?.Profile?.name}
                              </Text>
                              <div
                                dangerouslySetInnerHTML={{ __html: e?.message }}
                              />

                              <Group spacing={"xs"}>
                                <Text fz={7}>
                                  {/* {new Intl.DateTimeFormat("id-ID", {
                                    timeStyle: "medium",
                                  }).format(e.createdAt)} */}
                                </Text>
                                <IconCircle size={3} />
                                <Text fz={7}>
                                  {/* {new Intl.DateTimeFormat("id-ID", {
                                    dateStyle: "medium",
                                  }).format(e.createdAt)} */}
                                </Text>
                              </Group>
                            </Stack>
                          </Paper>
                        </Group>
                      ) : (
                        <Group>
                          <Paper key={e?.id} bg={"cyan.2"} p={"sm"} mt={"sm"}>
                            <Stack spacing={0}>
                              <Text lineClamp={1} fw={"bold"} fz={"xs"}>
                                {e?.User?.Profile?.name}
                              </Text>
                              <div
                                dangerouslySetInnerHTML={{ __html: e?.message }}
                              />
                              <Group spacing={"xs"}>
                                <Text fz={7}>
                                  {/* {new Intl.DateTimeFormat("id-ID", {
                                    timeStyle: "medium",
                                  }).format(e.createdAt)} */}
                                </Text>
                                <IconCircle size={3} />
                                <Text fz={7}>
                                  {/* {new Intl.DateTimeFormat("id-ID", {
                                    dateStyle: "medium",
                                  }).format(e.createdAt)} */}
                                </Text>
                              </Group>
                            </Stack>
                          </Paper>
                        </Group>
                      )}
                    </Box>
                  ))
                )}
              </div>
            </Stack>
          </Box>

          <Box
            style={{
              height: "11vh",
            }}
          />
        </Box>

        {/* Footer */}
        <Box
          style={{
            zIndex: 98,
          }}
          w={"100%"}
          pos={"fixed"}
          bottom={0}
          h={"10vh"}
          bg={"gray.2"}
        >
          <Stack justify="center" h={"100%"} px={"sm"}>
            <Grid align="center">
              <Grid.Col span={"auto"}>
                <Textarea
                  value={msg}
                  minRows={1}
                  radius={"md"}
                  placeholder="Ketik pesan anda..."
                  onChange={(val) => {
                    setMsg(val.currentTarget.value);
                  }}
                />
              </Grid.Col>
              <Grid.Col span={"content"}>
                <ActionIcon
                  disabled={msg ? false : true}
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
        </Box>
      </Box>
    </>
  );
}
