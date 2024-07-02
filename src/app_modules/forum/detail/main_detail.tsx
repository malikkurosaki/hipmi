"use client";

import { Center, Loader, Stack } from "@mantine/core";
import _ from "lodash";
import { MODEL_FORUM_KOMENTAR, MODEL_FORUM_POSTING } from "../model/interface";

import mqtt_client from "@/util/mqtt_client";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import "react-quill/dist/quill.bubble.css";
import ComponentForum_DetailCreateKomentar from "../component/detail_component/detail_create_komentar";
import ComponentForum_KomentarView from "../component/detail_component/detail_list_komentar";
import ComponentForum_DetailForumView from "../component/detail_component/detail_view";
import { ScrollOnly } from "next-scroll-loader";
import { forum_funGetAllKomentarById } from "../fun/get/get_all_komentar_by_id";

export default function Forum_MainDetail({
  dataPosting,
  listKomentar,
  userLoginId,
  countKomentar,
}: {
  dataPosting: MODEL_FORUM_POSTING;
  listKomentar: MODEL_FORUM_KOMENTAR[];
  userLoginId: string;
  countKomentar: number
}) {
  const [data, setData] = useState(dataPosting);
  const [lsKomentar, setLsKomentar] = useState(listKomentar);

  const [activePage, setActivePage] = useState(1);

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
      <Stack>
        <ComponentForum_DetailForumView
          data={data}
          totalKomentar={countKomentar}
          userLoginId={userLoginId}
          onLoadData={(val) => {
            setData(val);
          }}
        />

        {(data?.ForumMaster_StatusPosting?.id as any) === 1 ? (
          <ComponentForum_DetailCreateKomentar
            postingId={dataPosting?.id}
            onSetKomentar={(val) => {
              setLsKomentar(val);
            }}
            data={data}
            userLoginId={userLoginId}
          />
        ) : (
          ""
        )}

        <ScrollOnly
          height={lsKomentar.length < 5 ? "50vh" : "70vh"}
          renderLoading={() => (
            <Center mt={"lg"}>
              <Loader color={"yellow"} />
            </Center>
          )}
          data={lsKomentar}
          setData={setLsKomentar}
          moreData={async () => {
            const loadData = await forum_funGetAllKomentarById({
              postingId: data.id,
              page: activePage + 1,
            });
            setActivePage((val) => val + 1);

            return loadData;
          }}
        >
          {(item) => (
            <ComponentForum_KomentarView
              data={item}
              setKomentar={setLsKomentar}
              postingId={data?.id}
              userLoginId={userLoginId}
            />
          )}
        </ScrollOnly>
      </Stack>
    </>
  );
}
