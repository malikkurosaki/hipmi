"use client";

import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
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
import ComponentGlobal_ErrorInput from "@/app_modules/component_global/error_input";
import ComponentGlobal_InputCountDown from "@/app_modules/component_global/input_countdown";
import _ from "lodash";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

import mqtt_client from "@/util/mqtt_client";

export default function Forum_Create() {
  const [value, setValue] = useState("");
  const [totalLength, setTotalLength] = useState(0);

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
        <Paper withBorder shadow="lg" p={"xs"}>
          <ReactQuill
            theme="bubble"
            placeholder="Apa yang sedang ingin dibahas ?"
            style={{ height: 150 }}
            onChange={(val) => {
              setValue(val);
            }}
          />
        </Paper>
        <Group position="right">
          <ComponentGlobal_InputCountDown
            maxInput={500}
            lengthInput={value.length}
          />
        </Group>
        <Group position="right">
          <ButtonAction value={value} />
        </Group>
      </Stack>
    </>
  );
}

function ButtonAction({ value }: { value: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onCreate() {
    if (value.length > 500) {
      return null;
    }

    const create = await forum_funCreate(value);
    if (create.status === 201) {
      setLoading(true);
      ComponentGlobal_NotifikasiBerhasil(create.message);
      setTimeout(() => router.back(), 1000);

      mqtt_client.publish("Forum_create_new", JSON.stringify({isNewPost: true, count: 1 }));

    } else {
      ComponentGlobal_NotifikasiGagal(create.message);
    }
  }
  return (
    <>
      <Button
        style={{
          transition: "0.5s",
        }}
        disabled={
          value === "<p><br></p>" || value === "" || value.length > 500
            ? true
            : false
        }
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
