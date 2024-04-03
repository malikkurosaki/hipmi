"use client";

import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import {
  ActionIcon,
  Button,
  Card,
  Group,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import ComponentForum_PostingAuthorNameOnHeader from "../component/header/posting_author_header_name";

import dynamic from "next/dynamic";
import React, { useState } from "react";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);
import "react-quill/dist/quill.bubble.css";
import { IconPhotoUp } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { MODEL_FORUM_POSTING } from "../model/interface";
import { forum_funCreateKomentar } from "../fun/create/fun_create_komentar";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";

export default function Forum_Komentar({
  dataPosting,
  userLoginId,
}: {
  dataPosting: MODEL_FORUM_POSTING;
  userLoginId: any
}) {
  return (
    <>
      <Stack px={"sm"}>
        <Card>
          <Card.Section>
            {/* <pre>{JSON.stringify(dataPosting, null, 2)}</pre> */}
            <ComponentForum_PostingAuthorNameOnHeader
              authorId={dataPosting?.Author?.id}
              authorName={dataPosting?.Author?.Profile?.name}
              imagesId={dataPosting?.Author?.Profile?.imagesId}
              postingId={dataPosting?.id}
              tglPublish={dataPosting?.createdAt}
              statusId={dataPosting?.ForumMaster_StatusPosting?.id}
              userLoginId={userLoginId}
            />
          </Card.Section>
          <Card.Section sx={{ zIndex: 0 }} p={"sm"}>
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
        </Card>
        <CreateKomentar postingId={dataPosting?.id} />
      </Stack>
    </>
  );
}

function CreateKomentar({ postingId }: { postingId: string }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  async function onComment() {
    await forum_funCreateKomentar(postingId, value).then((res) => {
      if (res.status === 201) {
        setLoading(true);
        ComponentGlobal_NotifikasiBerhasil(res.message);
        router.replace(RouterForum.main_detail + postingId, { scroll: false });
        router.refresh();
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
            theme="bubble"
            placeholder="Ketik komentar anda?"
            //   style={{ height: 150 }}
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
      </Stack>
    </>
  );
}
