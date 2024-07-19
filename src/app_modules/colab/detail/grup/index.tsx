"use client";

import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import mqtt_client from "@/util/mqtt_client";
import {
  ActionIcon,
  Affix,
  Box,
  Center,
  Grid,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Textarea,
  rem
} from "@mantine/core";
import {
  useShallowEffect
} from "@mantine/hooks";
import { IconCircle, IconSend } from "@tabler/icons-react";
import _ from "lodash";
import { useState } from "react";
import ComponentColab_IsEmptyData from "../../component/is_empty_data";
import colab_funCreateMessageByUserId from "../../fun/create/room/fun_create_message_by_user_id";
import colab_getMessageByRoomId from "../../fun/get/room_chat/get_message_by_room_id";

export default function Colab_DetailGrupDiskusi({
  roomId,
  listMsg,
  userLoginId,
}: {
  roomId: string;
  listMsg?: any[];
  userLoginId: string;
}) {
  const [msg, setMsg] = useState("");
  const [data, setData] = useState<any[]>(listMsg as any);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isGet, setIsGet] = useState(true);

  // const next = async (direction: ScrollDirection) => {
  //   try {
  //     setIsLoading(true);
  //     await new Promise((a) => setTimeout(a, 100));

  //     setPage(page + 1);
  //     const newData = await colab_getMessageByRoomId(roomId, page + 1);

  //     console.log(newData);

  //     if (_.isEmpty(newData)) {
  //       setIsGet(false);
  //     } else {
  //       setData((prev) => (direction === "up" ? [...newData, ...prev] : []));
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const ref = useInfiniteScroll({
  //   next,
  //   rowCount: data.length,
  //   hasMore: { up: isGet },
  //   scrollThreshold: 0.1,
  //   initialScroll: { top: 100 },
  // });

  useShallowEffect(() => {
    mqtt_client.subscribe(roomId);

    mqtt_client.on("message", (data: any, msg: any) => {
      onList(setData);
    });
  }, [setData]);

  async function onList(setData: any) {
    await colab_getMessageByRoomId({ page: page, roomId: roomId }).then((val) =>
      setData(val)
    );
  }

  async function onSend() {
    await colab_funCreateMessageByUserId(msg, roomId).then(async (res) => {
      if (res.status === 200) {
        mqtt_client.publish(roomId, msg);
        setMsg("");
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }



  return (
    <>
      <Box h={"80vh"} bg={"blue.1"}>
        <Stack justify="flex-end" h={"100%"}>
          <div
            style={{
              // overflow: "scroll",
              overflowY: "auto",
              // height: "100vh",
              // justifyContent: "flex-end",
              // flexDirection: "column",
              // display: "flex",
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
                      <Paper key={e.id} bg={"blue.2"} p={"sm"} mt={"sm"}>
                        <Stack spacing={0}>
                          <Text lineClamp={1} fw={"bold"} fz={"xs"}>
                            {e.User.Profile.name}
                          </Text>
                          <div
                            dangerouslySetInnerHTML={{ __html: e.message }}
                          />

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
                    <Group>
                      <Paper key={e.id} bg={"cyan.2"} p={"sm"} mt={"sm"}>
                        <Stack spacing={0}>
                          <Text lineClamp={1} fw={"bold"} fz={"xs"}>
                            {e.User.Profile.name}
                          </Text>
                          <div
                            dangerouslySetInnerHTML={{ __html: e.message }}
                          />
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
              ))
            )}
            {/* {isLoading && (
              <Center>
                <Loader variant="bars" size={20} color="gray" />
              </Center>
            )} */}
          </div>
        </Stack>
      </Box>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

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
      </Affix>
    </>
  );

  // "use client";

  // import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
  // import {
  //   ActionIcon,
  //   Box,
  //   Button,
  //   Card,
  //   Center,
  //   Code,
  //   Grid,
  //   Group,
  //   Header,
  //   Loader,
  //   Paper,
  //   ScrollArea,
  //   Stack,
  //   Text,
  //   Textarea,
  //   Title,
  // } from "@mantine/core";
  // import {
  //   IconChevronLeft,
  //   IconCircle,
  //   IconInfoSquareRounded,
  //   IconSend,
  // } from "@tabler/icons-react";
  // import { useRouter } from "next/navigation";
  // import router from "next/router";
  // import { useRef, useState } from "react";
  // import {
  //   MODEL_COLLABORATION_MESSAGE,
  //   MODEL_COLLABORATION_ROOM_CHAT,
  // } from "../../model/interface";
  // import _ from "lodash";
  // import ComponentColab_IsEmptyData from "../../component/is_empty_data";
  // import colab_getMessageByRoomId from "../../fun/get/room_chat/get_message_by_room_id";
  // import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
  // import colab_funCreateMessageByUserId from "../../fun/create/room/fun_create_message_by_user_id";
  // import { useShallowEffect } from "@mantine/hooks";
  // import mqtt_client from "@/util/mqtt_client";
  // import useInfiniteScroll, {
  //   ScrollDirection,
  // } from "react-easy-infinite-scroll-hook";
  // import toast from "react-simple-toasts";
  // import colab_getOneMessageById from "../../fun/get/room_chat/get_one_message_by_id";

  // const list = Array(100).fill(0);
  // export default function ColabViewChat({
  //   userLoginId,
  //   listMsg,
  //   dataRoom,
  // }: {
  //   userLoginId: string;
  //   listMsg: any;
  //   dataRoom?: MODEL_COLLABORATION_ROOM_CHAT;
  // }) {
  //   // Tamplate app layout
  //   const router = useRouter();
  //   const [loadingBack, setLoadingBack] = useState(false);
  //   const [loadingInfo, setLoadingInfo] = useState(false);

  //   // State message
  //   const [msg, setMsg] = useState("");
  //   const [data, setData] = useState(listMsg);

  //   const [ls, setLs] = useState(list);

  //   const viewport = useRef<HTMLDivElement>(null);

  //   const scrollBottom = () => {
  //     viewport.current?.scrollTo({
  //       top: viewport.current.scrollHeight,
  //       behavior: "smooth",
  //     });
  //   };

  //   // Kirim pesan
  //   async function onSend() {
  //     setMsg("");
  //     setLs([...[msg], ...ls]);
  //     scrollBottom();
  //   }

  //   return (
  //     <>
  //       <Box h={"100vh"}>
  //         {/* Header */}

  //         <Box
  //           style={{
  //             zIndex: 99,
  //           }}
  //           w={"100%"}
  //           pos={"fixed"}
  //           top={0}
  //           h={"7vh"}
  //         >
  //           <Stack bg={"gray.2"} h={"100%"} justify="center" px={"sm"}>
  //             <Grid grow gutter={"lg"}>
  //               <Grid.Col span={2}>
  //                 <ActionIcon
  //                   loading={loadingBack ? true : false}
  //                   variant="transparent"
  //                   radius={"xl"}
  //                   onClick={() => {
  //                     setLoadingBack(true);
  //                     router.back();
  //                   }}
  //                 >
  //                   <IconChevronLeft />
  //                 </ActionIcon>
  //               </Grid.Col>
  //               <Grid.Col span={8}>
  //                 <Center>
  //                   <Title order={5} lineClamp={1}>
  //                     {dataRoom?.name}
  //                   </Title>
  //                 </Center>
  //               </Grid.Col>
  //               <Grid.Col span={2}>
  //                 <Group position="right">
  //                   <ActionIcon
  //                     loading={loadingInfo ? true : false}
  //                     variant="transparent"
  //                     radius={"xl"}
  //                     onClick={() => {
  //                       setLoadingInfo(true);
  //                       router.push(RouterColab.info_grup + dataRoom?.id);
  //                     }}
  //                   >
  //                     <IconInfoSquareRounded />
  //                   </ActionIcon>
  //                 </Group>
  //               </Grid.Col>
  //             </Grid>
  //           </Stack>
  //         </Box>

  //         {/* Main View */}

  //         <Box pos={"static"}>
  //           <Box
  //             style={{
  //               height: "7vh",
  //             }}
  //           />
  //           {/* Chat View */}
  //           <Box h={"83vh"} bg={"blue"}>
  //             <ScrollArea h={"100%"} viewportRef={viewport}>
  //               {ls.map((e, i) => (
  //                 <Text key={i}>{`${e + 1 + i++}`}</Text>
  //               ))}
  //             </ScrollArea>
  //           </Box>

  //           <Box
  //             style={{
  //               height: "10vh",
  //             }}
  //           />
  //         </Box>

  //         {/* Footer */}
  //         <Box
  //           style={{
  //             zIndex: 98,
  //           }}
  //           w={"100%"}
  //           pos={"fixed"}
  //           bottom={0}
  //           h={"10vh"}
  //           bg={"gray.2"}
  //         >
  //           <Stack justify="center" h={"100%"} px={"sm"}>
  //             <Grid align="center">
  //               <Grid.Col span={"auto"}>
  //                 <Textarea
  //                   minRows={1}
  //                   radius={"md"}
  //                   placeholder="Ketik pesan anda..."
  //                   onChange={(val) => {
  //                     setMsg(val.currentTarget.value);
  //                   }}
  //                 />
  //               </Grid.Col>
  //               <Grid.Col span={"content"}>
  //                 <ActionIcon
  //                   disabled={msg ? false : true}
  //                   variant="filled"
  //                   bg={"cyan"}
  //                   radius={"xl"}
  //                   size={"xl"}
  //                   onClick={() => {
  //                     onSend();
  //                   }}
  //                 >
  //                   <IconSend size={20} />
  //                 </ActionIcon>
  //               </Grid.Col>
  //             </Grid>
  //           </Stack>
  //         </Box>
  //       </Box>
  //     </>
  //   );
  // }

}
