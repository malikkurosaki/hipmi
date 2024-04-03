"use client";

import {
  ActionIcon,
  Button,
  Center,
  Group,
  Loader,
  Paper,
  Stack,
} from "@mantine/core";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { IconPhotoUp } from "@tabler/icons-react";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import ComponentGlobal_V2_LoadingPage from "@/app_modules/component_global/loading_page_v2";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useAtom } from "jotai";
import { gs_forum_loading_edit_posting } from "../../global_state";
import { MODEL_FORUM_POSTING } from "../../model/interface";
import { forum_funEditPostingById } from "../../fun/edit/fun_edit_posting_by_id";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

export default function Forum_EditPosting({
  dataPosting,
}: {
  dataPosting: MODEL_FORUM_POSTING;
}) {
  const [value, setValue] = useState(dataPosting);
  const [reload, setReload] = useState(false);
  useShallowEffect(() => {
    if (window && window.document) setReload(true);
  }, []);

  if (!reload)
    return (
      <>
        <ComponentGlobal_V2_LoadingPage />
      </>
    );

  return (
    <>
      <Stack>
        <Paper withBorder shadow="lg">
          <ReactQuill
            theme="bubble"
            placeholder="Apa yang sedang hangat dibicarakan ?"
            style={{ height: 150 }}
            value={value.diskusi}
            onChange={(val) => {
              setValue({
                ...value,
                diskusi: val,
              });
            }}
          />
        </Paper>
        <Group position="right">
          {/* <ActionIcon>
            <IconPhotoUp />
          </ActionIcon> */}
          <ButtonAction diskusi={value.diskusi as any} postingId={value.id} />
        </Group>
      </Stack>
      {/* <div dangerouslySetInnerHTML={{ __html: value }} /> */}
    </>
  );
}

function ButtonAction({
  postingId,
  diskusi,
}: {
  postingId: string;
  diskusi: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onUpdate() {
    await forum_funEditPostingById(postingId, diskusi).then((res) => {
      if (res.status === 200) {
        setLoading(true);
        ComponentGlobal_NotifikasiBerhasil(res.message);
        setTimeout(() => router.back(), 1000)
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  return (
    <>
      <Button
        loaderPosition="center"
        loading={loading ? true : false}
        radius={"xl"}
        onClick={() => {
          onUpdate();
        }}
      >
        Update
      </Button>
    </>
  );
}
