"use client";

import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import notifikasiToUser_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_user";
import { Stack, Paper, Group, Button, Divider } from "@mantine/core";
import { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);
import { forum_funCreateKomentar } from "../../fun/create/fun_create_komentar";
import { forum_funGetAllKomentarById } from "../../fun/get/get_all_komentar_by_id";
import { MODEL_FORUM_POSTING } from "../../model/interface";
import { useRouter } from "next/navigation";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import mqtt_client from "@/util/mqtt_client";
export default function ComponentForum_DetailCreateKomentar({
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
      // const loadKomentar = await forum_funGetAllKomentarById(data.id);

      const loadData = await forum_funGetAllKomentarById({
        postingId: data.id,
        page: 1,
      });
      onSetKomentar(loadData);

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
            bg={MainColor.yellow}
            color={"yellow"}
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
