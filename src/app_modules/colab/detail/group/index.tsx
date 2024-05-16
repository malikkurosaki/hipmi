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
import { useRef, useState } from "react";
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
} from "react-easy-infinite-scroll-hook";
import toast from "react-simple-toasts";
import colab_getOneMessageById from "../../fun/get/room_chat/get_one_message_by_id";

export default function Colab_GroupChatView({
  userLoginId,
  listMsg,
  selectRoom,
}: {
  userLoginId: string;
  listMsg: any;
  selectRoom: MODEL_COLLABORATION_ROOM_CHAT;
}) {
  const router = useRouter();
  const [loadingBack, setLoadingBack] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [msg, setMsg] = useState("");
  const [newMessage, setNewMessage] = useState<any>();
  const [data, setData] = useState<any[]>(listMsg);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isGet, setIsGet] = useState(true);

  const next = async (direction: ScrollDirection) => {
    try {
      setIsLoading(true);
      await new Promise((a) => setTimeout(a, 500));

      const newData = await colab_getMessageByRoomId({
        roomId: selectRoom?.id,
        page: totalPage + 1,
      });
      setTotalPage(totalPage + 1);

      // console.log(newData, "loading baru");

      if (_.isEmpty(newData)) {
        setIsGet(false);
      } else {
        const d =
          direction === "down" ? [...data, ...newData] : [...newData, ...data];
        setData(d);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const ref = useInfiniteScroll({
    next,
    rowCount: data.length,
    hasMore: { up: isGet },
    scrollThreshold: 0.1,
  });

  async function onSend() {
    await colab_funCreateMessageByUserId(msg, selectRoom.id).then(
      async (res) => {
        if (res.status === 200) {
          mqtt_client.publish(selectRoom.id, msg);
          setMsg("");

          // const d = JSON.parse(JSON.stringify(res.data));
          // setData([...data, ...[d]]);

          await colab_getOneMessageById({
            messageId: res.data?.id as any,
          }).then((res) => {
            // setNewMessage(res);
            // console.log(res);
            // const d = JSON.parse(JSON.stringify(res));
            // setData([...data, ...[d]]);

            mqtt_client.on("message", (a,b) => {
              setData([...data, ...[res]])
            })
          });
        } else {
          ComponentGlobal_NotifikasiGagal(res.message);
        }
      }
    );
  }

  useShallowEffect(() => {
    mqtt_client.subscribe(selectRoom.id);

    // mqtt_client.on("message", (a, b) => {
    //   // loadDataNew(b.toString());
    //   // onList(b);
    //   onList2(newMessage);
    // });
  }, []);

  async function onList2(dt: any) {
    console.log(dt);
    setData([...data, ...[dt]]);
  }

  // const loadDataNew = (dt: any) => {
  //   setData([JSON.parse(dt),...data]);
  // };

  async function onList(b: any) {
    await colab_getMessageByRoomId({
      roomId: selectRoom?.id,
      page: 1,
    }).then((val) => {
      const d = JSON.parse(JSON.stringify(val[5]));
      setData([...data, ...[d]]);
      // setTotalPage(totalPage);
    });
  }

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
          h={50}
        >
          <Stack bg={"gray.2"} h={50} justify="center" px={"sm"}>
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
                    {selectRoom?.name}
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
                      router.push(RouterColab.info_grup + selectRoom.id);
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
        <Box py={"xs"} px={"xs"} pos={"static"}>
          {/* Batas atas */}
          <Box
            style={{
              height: 50,
            }}
          />

          {/* Chat View */}
          <Box h={"80vh"}>
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

                              {/* <Group spacing={"xs"}>
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
                              </Group> */}
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
                              {/* <Group spacing={"xs"}>
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
                              </Group> */}
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

          {/* Batas bawah */}
          <Box
            style={{
              height: "10vh",
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
          {/* <Button
            onClick={() => {
              const d: { [key: string]: any } = _.clone(data[0]);
              setData([...data, d]);
            }}
          >
            KIzRIM PESAN
          </Button> */}
          <Stack justify="center" h={"100%"} px={"sm"}>
            <Grid align="center">
              <Grid.Col span={"auto"}>
                <Textarea
                  minRows={1}
                  radius={"md"}
                  placeholder="Ketik pesan anda..."
                  value={msg}
                  onChange={(val) => setMsg(val.currentTarget.value)}
                />
              </Grid.Col>
              <Grid.Col span={"content"}>
                <ActionIcon
                  disabled={msg === "" ? true : false}
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

  // return (
  //   <Stack bg={"dark"}>
  //     <Button
  //       onClick={() => {
  //         const dd = _.clone(data[0]);
  //         dd.message = "apa kabar";
  //         console.log(dd);
  //         mqtt_client.publish(selectRoom.id, JSON.stringify(dd));
  //       }}
  //     >
  //       kirim pesan
  //     </Button>
  //     <div
  //       ref={ref as any}
  //       style={{
  //         overflowY: "auto",
  //       }}
  //     >
  //       {data.map((v, k) => (
  //         <Stack key={k}>
  //           <Card withBorder shadow="md" mt={"md"}>
  //             <Code>
  //               <pre>{JSON.stringify(v, null, 2)}</pre>
  //             </Code>
  //           </Card>
  //         </Stack>
  //       ))}
  //     </div>
  //   </Stack>
  // );
}
