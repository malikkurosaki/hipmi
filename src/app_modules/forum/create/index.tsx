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
import { forum_funCreate } from "../fun/create/fun_create";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

export default function Forum_Create() {
  const [value, setValue] = useState("");
  const [maxForum, setMaxForum] = useState(0);
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
              // if (val.length > 300) {
              //   setMaxForum(val.length);
              // }
              setValue(val);
            }}
          />
        </Paper>
        <Group position="right">
          {/* <ActionIcon>
            <IconPhotoUp />
          </ActionIcon> */}
          <ButtonAction value={value} />
        </Group>
      </Stack>
      {/* <div dangerouslySetInnerHTML={{ __html: value }} /> */}
    </>
  );
}

function ButtonAction({ value }: { value: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onCreate() {
    await forum_funCreate(value).then((res) => {
      if (res.status === 201) {
        setLoading(true);
        ComponentGlobal_NotifikasiBerhasil(res.message);
        setTimeout(() => router.back(), 1000);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }
  return (
    <>
      <Button
        radius={"xl"}
        loading={loading ? true : false}
        loaderPosition="center"
        onClick={() => onCreate()}
      >
        Posting
      </Button>
    </>
  );
}
