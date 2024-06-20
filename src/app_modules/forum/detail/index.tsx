"use client";

import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Center,
  Divider,
  Group,
  Paper,
  Spoiler,
  Stack,
  Text,
} from "@mantine/core";
import { IconMessageCircle, IconMessageCircleX } from "@tabler/icons-react";
import ComponentForum_PostingAuthorNameOnHeader from "../component/header/posting_author_header_name";
import ComponentForum_DetailOnHeaderAuthorName from "../component/header/detail_author_header_name";
import { useRouter } from "next/navigation";
import { MODEL_FORUM_KOMENTAR, MODEL_FORUM_POSTING } from "../model/interface";
import ComponentForum_KomentarAuthorNameOnHeader from "../component/header/komentar_author_header_name";
import _ from "lodash";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { forum_funCreateKomentar } from "../fun/create/fun_create_komentar";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);
import "react-quill/dist/quill.bubble.css";
import { forum_getKomentarById } from "../fun/get/get_komentar_by_id";
import ComponentGlobal_InputCountDown from "@/app_modules/component_global/input_countdown";
import ComponentForum_DetailHeader from "../component/detail_component/detail_header";
import { useShallowEffect } from "@mantine/hooks";
import mqtt_client from "@/util/mqtt_client";
import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";
import notifikasiToUser_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_user";

export default function Forum_Detail({
  dataPosting,
  listKomentar,
  userLoginId,
}: {
  dataPosting: MODEL_FORUM_POSTING;
  listKomentar: MODEL_FORUM_KOMENTAR[];
  userLoginId: string;
}) {
  const [data, setData] = useState(dataPosting);
  const [komentar, setKomentar] = useState(listKomentar);

  // useShallowEffect(() => {
  //   onLoadKomentar({
  //     onLoad(val) {
  //       setKomentar(val);
  //     },
  //   });
  // }, [setKomentar]);

  // async function onLoadKomentar({ onLoad }: { onLoad: (val: any) => void }) {
  //   const loadKomentar = await forum_getKomentarById(data.id);
  //   onLoad(loadKomentar);
  // }

  useShallowEffect(() => {
    mqtt_client.subscribe("Forum_detail_ganti_status");

    mqtt_client.on("message", (topic: any, message: any) => {
      const newData = JSON.parse(message.toString());
      if (newData.id === data.id) {
        const cloneData = _.clone(data);

        // console.log(newData.data);
        const updateData = {
          ...cloneData,
          ForumMaster_StatusPosting: {
            id: newData.data.id,
            status: newData.data.status,
          },
        };

        setData(updateData as any);
      }
    });
  }, [data]);

  return (
    <>
      <Stack px={"xs"}>
        <ForumView
          data={data}
          totalKomentar={komentar.length}
          userLoginId={userLoginId}
          onLoadData={(val) => {
            setData(val);
          }}
        />
        {(data?.ForumMaster_StatusPosting?.id as any) === 1 ? (
          <CreateKomentar
            postingId={dataPosting?.id}
            onSetKomentar={(val) => {
              setKomentar(val);
            }}
            data={data}
            userLoginId={userLoginId}
          />
        ) : (
          ""
        )}
        <KomentarView
          listKomentar={komentar}
          setKomentar={setKomentar}
          postingId={data?.id}
          userLoginId={userLoginId}
        />
      </Stack>
    </>
  );
}

function ForumView({
  data,
  totalKomentar,
  userLoginId,
  onLoadData,
}: {
  data: MODEL_FORUM_POSTING;
  totalKomentar: number;
  userLoginId: string;
  onLoadData: (val: any) => void;
}) {
  return (
    <>
      <Card style={{ position: "relative", width: "100%" }}>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

        {/* HEADER */}
        <Card.Section>
          <ComponentForum_DetailHeader
            data={data}
            userLoginId={userLoginId}
            onLoadData={(val) => {
              onLoadData(val);
            }}
          />
        </Card.Section>

        {/* CONTENT */}
        <Card.Section sx={{ zIndex: 0 }} py={"sm"}>
          <Stack spacing={"xs"}>
            <Text fz={"sm"}>
              {data?.diskusi ? (
                <div dangerouslySetInnerHTML={{ __html: data?.diskusi }} />
              ) : (
                ""
              )}
            </Text>
          </Stack>
        </Card.Section>

        {/* FOOTER */}
        <Card.Section>
          <Stack>
            <Group position="apart">
              <Group spacing={"xs"}>
                {(data?.ForumMaster_StatusPosting?.id as any) === 1 ? (
                  <IconMessageCircle color="gray" size={25} />
                ) : (
                  <IconMessageCircleX color="gray" size={25} />
                )}
                <Text c={"gray"}>{totalKomentar}</Text>
              </Group>
              <Group>
                <Text c={"gray"} fz={"sm"}>
                  {new Date(data?.createdAt).toLocaleTimeString()}
                  {/* {new Intl.RelativeTimeFormat("id", {style: "short"}).format(-1,"day")} */}
                </Text>
                <Text c={"gray"} fz={"sm"}>
                  {data?.createdAt
                    ? new Date(data?.createdAt).toLocaleDateString(["id-ID"], {
                        dateStyle: "medium",
                      })
                    : new Date().toLocaleDateString(["id-ID"], {
                        dateStyle: "medium",
                      })}
                </Text>
              </Group>
            </Group>
            <Divider />
          </Stack>
        </Card.Section>
      </Card>
    </>
  );
}

function CreateKomentar({
  postingId,
  onSetKomentar,
  data,
  userLoginId,
}: {
  postingId: string;
  onSetKomentar: (val: any) => void;
  data: MODEL_FORUM_POSTING;
  userLoginId: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  async function onComment() {
    if (value.length > 500) {
      return null;
    }

    const createComment = await forum_funCreateKomentar(postingId, value);
    if (createComment.status === 201) {
      const loadKomentar = await forum_getKomentarById(data.id);
      onSetKomentar(loadKomentar);

      setValue("");
      setIsEmpty(true);
      ComponentGlobal_NotifikasiBerhasil(createComment.message, 2000);

      if (userLoginId !== data.Author.id) {
        const dataNotif = {
          appId: data.id,
          userId: data.authorId,
          pesan: value,
          kategoriApp: "FORUM",
          title: "Komentar baru",
        };

        const createNotifikasi = await notifikasiToUser_funCreate({
          data: dataNotif as any,
        });

        if (createNotifikasi.status === 201) {
          mqtt_client.publish(
            "USER",
            JSON.stringify({
              userId: dataNotif.userId,
              count: 1,
            })
          );
        }
      }
    } else {
      ComponentGlobal_NotifikasiGagal(createComment.message);
    }
  }

  return (
    <>
      <Stack>
        <Paper withBorder shadow="lg">
          <ReactQuill
            value={value}
            theme="bubble"
            placeholder="Ketik komentar anda?"
            onChange={(val) => {
              setValue(val);
            }}
          />
        </Paper>

        <Group position="apart">
          <ComponentGlobal_InputCountDown
            maxInput={500}
            lengthInput={value.length}
          />
          <Button
            style={{
              transition: "0.5s",
            }}
            disabled={
              value === "" || value === "<p><br></p>" || value.length > 500
                ? true
                : false
            }
            loaderPosition="center"
            loading={loading ? true : false}
            radius={"xl"}
            onClick={() => onComment()}
          >
            Balas
          </Button>
        </Group>
        <Divider />
      </Stack>
    </>
  );
}

function KomentarView({
  listKomentar,
  setKomentar,
  postingId,
  userLoginId,
}: {
  listKomentar: MODEL_FORUM_KOMENTAR[];
  setKomentar: any;
  postingId: string;
  userLoginId: string;
}) {
  return (
    <>
      <Stack>
        {_.isEmpty(listKomentar) ? (
          <Center>
            <Text fw={"bold"} fz={"xs"} c={"gray"}>
              Belum ada komentar
            </Text>
          </Center>
        ) : (
          <Box>
            <Center>
              <Text fz={"xs"} c={"gray"}>
                {" "}
                Komentar
              </Text>
            </Center>
            {listKomentar.map((e, i) => (
              <Card key={i} mt={"xs"}>
                <Card.Section>
                  <ComponentForum_KomentarAuthorNameOnHeader
                    authorName={e?.Author?.Profile?.name}
                    imagesId={e?.Author?.Profile?.imagesId}
                    tglPublish={e?.createdAt}
                    userId={e?.Author?.id}
                    komentarId={e?.id}
                    isMoreButton={true}
                    setKomentar={setKomentar}
                    postingId={postingId}
                    userLoginId={userLoginId}
                  />
                </Card.Section>
                <Card.Section sx={{ zIndex: 0 }} p={"sm"}>
                  <Stack spacing={"xs"}>
                    <Text fz={"sm"} lineClamp={4}>
                      {e.komentar ? (
                        <Spoiler
                          hideLabel="sembunyikan"
                          maxHeight={100}
                          showLabel="tampilkan"
                        >
                          <div
                            dangerouslySetInnerHTML={{ __html: e.komentar }}
                          />
                        </Spoiler>
                      ) : (
                        ""
                      )}
                    </Text>
                  </Stack>
                </Card.Section>
                <Card.Section>
                  <Stack>
                    <Divider />
                  </Stack>
                </Card.Section>
              </Card>
            ))}
          </Box>
        )}
      </Stack>
    </>
  );
}
