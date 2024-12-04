"use client";

import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import {
  Box,
  Center,
  Loader
} from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { ComponentColab_CardGrup } from "../../component/card_view/crad_grup";
import colab_getListRoomChatByAuthorId from "../../fun/get/room_chat/get_list_room_by_author_id";
import {
  MODEL_COLLABORATION_ANGGOTA_ROOM_CHAT
} from "../../model/interface";

export default function Colab_GrupDiskus({
  listRoom,
}: {
  listRoom: MODEL_COLLABORATION_ANGGOTA_ROOM_CHAT[];
}) {
  const [data, setData] = useState(listRoom);
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      <Box>
        {_.isEmpty(data) ? (
          <ComponentGlobal_IsEmptyData />
        ) : (
          <Box>
            <ScrollOnly
              height="82vh"
              renderLoading={() => (
                <Center mt={"lg"}>
                  <Loader color={"yellow"} />
                </Center>
              )}
              data={data}
              setData={setData}
              moreData={async () => {
                const loadData = await colab_getListRoomChatByAuthorId({
                  page: activePage + 1,
                });

                setActivePage((val) => val + 1);

                return loadData;
              }}
            >
              {(item) => <ComponentColab_CardGrup data={item} />}
            </ScrollOnly>
          </Box>
        )}
      </Box>
    </>
  );
}
