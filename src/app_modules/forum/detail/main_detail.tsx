"use client";

import {
  Stack
} from "@mantine/core";
import _ from "lodash";
import { MODEL_FORUM_KOMENTAR, MODEL_FORUM_POSTING } from "../model/interface";

import mqtt_client from "@/util/mqtt_client";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import "react-quill/dist/quill.bubble.css";
import ComponentForum_DetailCreateKomentar from "../component/detail_component/detail_create_komentar";
import ComponentForum_ListKomentarView from "../component/detail_component/detail_list_komentar";
import ComponentForum_DetailForumView from "../component/detail_component/detail_view";


export default function Forum_MainDetail({
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
        <ComponentForum_DetailForumView
          data={data}
          totalKomentar={komentar.length}
          userLoginId={userLoginId}
          onLoadData={(val) => {
            setData(val);
          }}
        />

        {(data?.ForumMaster_StatusPosting?.id as any) === 1 ? (
          <ComponentForum_DetailCreateKomentar
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

        <ComponentForum_ListKomentarView
          listKomentar={komentar}
          setKomentar={setKomentar}
          postingId={data?.id}
          userLoginId={userLoginId}
        />
        
      </Stack>
    </>
  );
}






