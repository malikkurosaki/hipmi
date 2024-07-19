"use client";

import {
  Box,
  Center,
  Grid,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import ComponentColab_AuthorNameOnHeader from "../../component/header_author_name";
import { IconChevronCompactRight, IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import {
  MODEL_COLLABORATION_ANGGOTA_ROOM_CHAT,
  MODEL_COLLABORATION_ROOM_CHAT,
} from "../../model/interface";
import { useState } from "react";
import _ from "lodash";
import ComponentColab_IsEmptyData from "../../component/is_empty_data";
import { ComponentColab_CardGrup } from "../../component/card_view/crad_grup";
import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { ScrollOnly } from "next-scroll-loader";
import colab_getListAllProyek from "../../fun/get/get_list_all_proyek";
import colab_getListRoomChatByAuthorId from "../../fun/get/room_chat/get_list_room_by_author_id";

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
