"use client";

import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/component_global/author_name_on_header";
import {
  Affix,
  rem,
  ActionIcon,
  Card,
  CardSection,
  Text,
  Stack,
  Divider,
  Group,
  Box,
  TextInput,
  Center,
} from "@mantine/core";
import { useShallowEffect, useTimeout, useWindowScroll } from "@mantine/hooks";
import {
  IconCirclePlus,
  IconMessageCircle,
  IconPencilPlus,
  IconSearch,
  IconSearchOff,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ComponentForum_PostingAuthorNameOnHeader from "../component/header/posting_author_header_name";
import { useState } from "react";
import ComponentGlobal_V2_LoadingPage from "@/app_modules/component_global/loading_page_v2";
import { useAtom } from "jotai";
import { gs_forum_loading_edit_posting } from "../global_state";
import { MODEL_FORUM_POSTING } from "../model/interface";
import ComponentForum_MainCardView from "../component/main_card_view";
import { forum_getListAllPosting } from "../fun/get/get_list_all_posting";
import { forum_funSearchListPosting } from "../fun/search/fun_search_list_posting";
import _ from "lodash";
import ComponentForum_BerandaCardView from "../component/beranda/beranda_card";

export default function Forum_Beranda({
  listForum,
  userLoginId,
}: {
  listForum: MODEL_FORUM_POSTING[];
  userLoginId: string;
}) {
  const router = useRouter();
  const [data, setData] = useState(listForum);
  const [scroll, scrollTo] = useWindowScroll();

  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingKomen, setLoadingKomen] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  if (loadingDetail) return <ComponentGlobal_V2_LoadingPage />;
  if (loadingKomen) return <ComponentGlobal_V2_LoadingPage />;

  async function onSearch(text: string) {
    await forum_funSearchListPosting(text).then((res: any) => {
      setData(res);
    });
  }

  return (
    <>
      {/* <pre>{JSON.stringify(listForum, null, 2)}</pre> */}
      <Affix position={{ bottom: rem(100), right: rem(30) }}>
        <ActionIcon
          loading={loadingCreate ? true : false}
          opacity={scroll.y > 0 ? 0.5 : ""}
          style={{
            transition: "0.5s",
          }}
          size={"xl"}
          radius={"xl"}
          variant="transparent"
          bg={"blue"}
          onClick={() => {
            setLoadingCreate(true);
            router.push(RouterForum.create);
          }}
        >
          <IconPencilPlus color="white" />
        </ActionIcon>
      </Affix>

      <Stack px={"sm"} spacing={"xl"}>
        <TextInput
          radius={"xl"}
          placeholder="Topik forum apa yang anda cari hari ini ?"
          onChange={(val) => {
            onSearch(val.currentTarget.value);
          }}
        />
        {_.isEmpty(data) ? (
          <Stack align="center" justify="center" h={"80vh"}>
            <IconSearchOff size={80} color="gray" />
            <Stack spacing={0} align="center">
              <Text c={"gray"} fw={"bold"} fz={"xs"}>
                Forum tidak ditemukan
              </Text>
              <Text c={"gray"} fw={"bold"} fz={"xs"}>
                Coba masukan kata yang bebeda
              </Text>
            </Stack>
          </Stack>
        ) : (
          <ComponentForum_BerandaCardView
            data={data}
            setData={setData}
            setLoadingKomen={setLoadingKomen}
            setLoadingDetail={setLoadingDetail}
            userLoginId={userLoginId}
          />
        )}
      </Stack>
    </>
  );
}
