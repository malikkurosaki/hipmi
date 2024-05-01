"use client";

import {
  ActionIcon,
  Affix,
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Group,
  Loader,
  Paper,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Textarea,
  Transition,
  rem,
} from "@mantine/core";
import {
  useScrollIntoView,
  useShallowEffect,
  useWindowScroll,
} from "@mantine/hooks";
import { useAtom } from "jotai";
import { useCallback, useState } from "react";
import { gs_colab_pesan } from "../../global_state";
import { IconArrowUp, IconCircle, IconSend } from "@tabler/icons-react";
import colab_funCreateMessageByUserId from "../../fun/create/room/fun_create_message_by_user_id";
import _ from "lodash";
import ComponentColab_IsEmptyData from "../../component/is_empty_data";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import colab_getMessageByRoomId from "../../fun/get/room_chat/get_message_by_room_id";
import mqtt_client from "@/util/mqtt_client";
import useInfiniteScroll, {
  ScrollDirection,
} from "react-easy-infinite-scroll-hook";
import ComponentGlobal_V2_LoadingPage from "@/app_modules/component_global/loading_page_v2";

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
  const [scroll, scrollTo] = useWindowScroll();
  const [isGet, setIsGet] = useState(true);

  const next = async (direction: ScrollDirection) => {
    try {
      setIsLoading(true);
      await new Promise((a) => setTimeout(a, 100));

      setPage(page + 1);
      const newData = await colab_getMessageByRoomId(roomId, page + 1);

      console.log(newData);

      if (_.isEmpty(newData)) {
        setIsGet(false);
      } else {
        setData((prev) => (direction === "up" ? [...newData, ...prev] : []));
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
    initialScroll: { top: 100 },
    // initialScroll: { top : -1 },

    // onScroll() {
    //   scrollTo({ y: 100 });
    // },
  });

  // const setRef = useCallback((node: any) => {
  //   if (node) ref.current = node._outerRef
  // }, [ref]);

  useShallowEffect(() => {
    mqtt_client.subscribe(roomId);

    mqtt_client.on("message", (data: any, msg: any) => {
      onList(setData);
    });
  }, [setData]);

  async function onList(setData: any) {
    await colab_getMessageByRoomId(roomId, page).then((val) => setData(val));
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
      <Box h={"80vh"}>
        <Stack justify="flex-end" h={"100%"}>
          <div
            ref={ref as any}
            style={{
              overflow: "scroll",
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

  // const [pesan, setPesan] = useState("");
  // const [obrolan, setObrolan] = useState<any[]>(listMsg);
  // const [scroll, scrollTo] = useWindowScroll();
  // const [isLoading, setIsLoading] = useState(false);

  // const next = async (direction: ScrollDirection) => {
  //   try {
  //     setIsLoading(true);
  //     await new Promise((a) => setTimeout(a, 500));
  //     const newData = await colab_getMessageByRoomId(roomId);

  //     setObrolan((prev) =>
  //       direction === "up" ? [...newData, ...prev] : [...prev, ...newData]
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const ref = useInfiniteScroll({
  //   next,
  //   rowCount: obrolan.length,
  //   hasMore: { up: true },
  // });

  // useShallowEffect(() => {
  //   mqtt_client.subscribe(roomId);

  //   mqtt_client.on("message", (data: any, msg: any) => {
  //     onList(setObrolan);
  //   });
  // }, [setObrolan]);

  // async function onList(setObrolan: any) {
  //   await colab_getMessageByRoomId(roomId).then((val) => setObrolan(val));
  // }

  // async function onSend() {
  //   await colab_funCreateMessageByUserId(pesan, roomId).then(async (res) => {
  //     if (res.status === 200) {
  //       mqtt_client.publish(roomId, pesan);
  //       scrollIntoView();
  //       setPesan("");
  //     } else {
  //       ComponentGlobal_NotifikasiGagal(res.message);
  //     }
  //   });
  // }

  // return (
  //   <>
  //     <Box h={"79vh"}>
  //       {/* <pre>{JSON.stringify(listMsg.map((e) => e.createdAt), null,2)}</pre> */}
  //       {/* <ScrollArea h={"79vh"} scrollbarSize={2}>
  //       </ScrollArea> */}
  //       <Box>
  //         {_.isEmpty(obrolan) ? (
  //           <ComponentColab_IsEmptyData text="Belum Ada Pesan" />
  //         ) : (
  //           <div
  //             ref={ref as any}
  //             style={{
  //               overflowY: "scroll",
  //               height: "80vh",
  //             }}
  //           >
  //             {isLoading ? (
  //               <Center>
  //                 <Loader color="gray" />
  //               </Center>
  //             ) : (
  //               ""
  //             )}
  //             {obrolan.map((e) => (
  //               <Box key={e.id} pt={"lg"}>
  //                 {e?.User.id === userLoginId ? (
  //                   <Group position="right" ref={targetRef as any}>
  //                     <Paper key={e.id} bg={"blue.2"} p={"sm"}>
  //                       <Stack spacing={0}>
  //                         <Text lineClamp={1} fw={"bold"} fz={"xs"}>
  //                           {e.User.Profile.name}
  //                         </Text>
  //                         <Text>{e.message}</Text>
  //                         <Group spacing={"xs"}>
  //                           <Text fz={7}>
  //                             {new Intl.DateTimeFormat("id-ID", {
  //                               timeStyle: "medium",
  //                             }).format(e.createdAt)}
  //                           </Text>
  //                           <IconCircle size={3} />
  //                           <Text fz={7}>
  //                             {new Intl.DateTimeFormat("id-ID", {
  //                               dateStyle: "medium",
  //                             }).format(e.createdAt)}
  //                           </Text>
  //                         </Group>
  //                       </Stack>
  //                     </Paper>
  //                   </Group>
  //                 ) : (
  //                   <Group position="left">
  //                     <Paper key={e.id} bg={"cyan.2"} p={"sm"} mr={"lg"}>
  //                       <Stack spacing={0}>
  //                         <Text lineClamp={1} fw={"bold"} fz={10}>
  //                           {e.User.Profile.name}
  //                         </Text>
  //                         <Text>{e.message}</Text>
  //                         <Group spacing={"xs"}>
  //                           <Text fz={7}>
  //                             {new Intl.DateTimeFormat("id-ID", {
  //                               timeStyle: "medium",
  //                             }).format(e.createdAt)}
  //                           </Text>
  //                           <IconCircle size={3} />
  //                           <Text fz={7}>
  //                             {new Intl.DateTimeFormat("id-ID", {
  //                               dateStyle: "medium",
  //                             }).format(e.createdAt)}
  //                           </Text>
  //                         </Group>
  //                       </Stack>
  //                     </Paper>
  //                   </Group>
  //                 )}
  //               </Box>
  //             ))}
  //           </div>
  //         )}
  //       </Box>
  //     </Box>

  //     <Affix
  //       bg={"gray.2"}
  //       h={"10vh"}
  //       position={{ bottom: rem(0) }}
  //       w={"100%"}
  //       zIndex={99}
  //       p={"xs"}
  //     >
  //       <Stack justify="center" h={"100%"} px={"sm"}>
  //         <Grid align="center">
  //           <Grid.Col span={"auto"}>
  //             <Textarea
  //               minRows={1}
  //               radius={"md"}
  //               placeholder="Ketik pesan anda..."
  //               value={pesan}
  //               onChange={(val) => setPesan(val.currentTarget.value)}
  //             />
  //           </Grid.Col>
  //           <Grid.Col span={"content"}>
  //             <ActionIcon
  //               disabled={pesan === "" ? true : false}
  //               variant="filled"
  //               bg={"cyan"}
  //               radius={"xl"}
  //               size={"xl"}
  //               onClick={() => {
  //                 onSend();
  //               }}
  //             >
  //               <IconSend size={20} />
  //             </ActionIcon>
  //           </Grid.Col>
  //         </Grid>
  //       </Stack>
  //     </Affix>
  //   </>
  // );
}
