"use client"

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
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

export default function Forum_EditPosting() {
  const [value, setValue] = useState("");
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
            onChange={(val) => {
              setValue(val);
            }}
          />
        </Paper>
        <Group position="right">
          {/* <ActionIcon>
            <IconPhotoUp />
          </ActionIcon> */}
          <ButtonAction />
        </Group>
      </Stack>
      <div dangerouslySetInnerHTML={{ __html: value }} />
    </>
  );
}

function ButtonAction() {
  const router = useRouter();
  const [loadingEdit, setLoadingEdit] = useAtom(gs_forum_loading_edit_posting);

  return (
    <>
      <Button radius={"xl"} onClick={() => {
        router.back()

      }}>
        Update
      </Button>
    </>
  );
}
