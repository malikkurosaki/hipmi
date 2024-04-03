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
  Stack,
  Text,
} from "@mantine/core";
import { IconMessageCircle } from "@tabler/icons-react";
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

export default function Forum_Detail({
  dataPosting,
  listKomentar,
  totalKomentar,
  userLoginId,
}: {
  dataPosting: MODEL_FORUM_POSTING;
  listKomentar: MODEL_FORUM_KOMENTAR[];
  totalKomentar: number;
  userLoginId: string;
}) {
  const [komentar, setKomentar] = useState(listKomentar);

  return (
    <>
      <Stack px={"xs"}>
        <ForumView
          dataPosting={dataPosting}
          totalKomentar={totalKomentar}
          userLoginId={userLoginId}
        />
        {(dataPosting?.ForumMaster_StatusPosting?.id as any) === 1 ? (
          <CreateKomentar
            postingId={dataPosting?.id}
            setKomentar={setKomentar}
          />
        ) : (
          ""
        )}
        <KomentarView
          listKomentar={komentar}
          setKomentar={setKomentar}
          postingId={dataPosting?.id}
          userLoginId={userLoginId}
        />
      </Stack>
    </>
  );
}

function ForumView({
  dataPosting,
  totalKomentar,
  userLoginId,
}: {
  dataPosting: MODEL_FORUM_POSTING;
  totalKomentar: number;
  userLoginId: string;
}) {
  return (
    <>
      <Card style={{ position: "relative", width: "100%" }}>
        <Card.Section>
          {/* <pre>{JSON.stringify(dataPosting, null, 2)}</pre> */}
          <ComponentForum_DetailOnHeaderAuthorName
            authorId={dataPosting?.Author?.id}
            authorName={dataPosting?.Author?.Profile?.name}
            username={dataPosting?.Author?.username}
            imagesId={dataPosting?.Author?.Profile?.imagesId}
            postingId={dataPosting?.id}
            tglPublish={dataPosting?.createdAt}
            userLoginId={userLoginId}
            statusId={dataPosting?.ForumMaster_StatusPosting?.id}
          />
        </Card.Section>
        <Card.Section sx={{ zIndex: 0 }} py={"sm"}>
          <Stack spacing={"xs"}>
            <Text fz={"sm"}>
              {dataPosting?.diskusi ? (
                <div
                  dangerouslySetInnerHTML={{ __html: dataPosting?.diskusi }}
                />
              ) : (
                ""
              )}
            </Text>
          </Stack>
        </Card.Section>
        <Card.Section>
          <Stack>
            <Group position="apart">
              <Group spacing={"xs"}>
                {/* <ActionIcon
                  variant="transparent"
                  sx={{ zIndex: 1 }}
                  onClick={() => {
                    router.push(RouterForum.komentar + dataPosting.id);
                  }}
                >
                </ActionIcon> */}
                <IconMessageCircle color="gray" size={25} />
                <Text c={"gray"}>{totalKomentar}</Text>
              </Group>
              <Group>
                <Text c={"gray"} fz={"sm"}>
                  {new Date(dataPosting?.createdAt).toLocaleTimeString()}
                  {/* {new Intl.RelativeTimeFormat("id", {style: "short"}).format(-1,"day")} */}
                </Text>
                <Text c={"gray"} fz={"sm"}>
                  {dataPosting?.createdAt
                    ? dataPosting?.createdAt.toLocaleDateString(["id-ID"], {
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
  setKomentar,
}: {
  postingId: string;
  setKomentar: any;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  async function onComment() {
    await forum_funCreateKomentar(postingId, value).then(async (res) => {
      if (res.status === 201) {
        await forum_getKomentarById(postingId).then((val) => {
          setKomentar(val);
          // setLoading(true);
          setValue("");
          ComponentGlobal_NotifikasiBerhasil(res.message, 2000);
        });
        // router.replace(RouterForum.main_detail + postingId, { scroll: false });
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
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
        <Group position="right">
          <Button
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
          listKomentar.map((e, i) => (
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
                      <div dangerouslySetInnerHTML={{ __html: e.komentar }} />
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
          ))
        )}
      </Stack>
    </>
  );
}
