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
  Button,
  Pagination,
  Loader,
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
import mqtt_client from "@/util/mqtt_client";
import ComponentForum_V2_MainCardView from "../component/main_component/card_view";
import { forum_new_getAllPosting } from "../fun/get/new_get_all_posting";
import forum_v2_getAllPosting from "../fun/get/v2_get_all_posting";
import { ScrollOnly } from "next-scroll-loader";

export default function Forum_Beranda({
  listForum,
  userLoginId,
}: {
  listForum: any;
  userLoginId: string;
}) {
  const router = useRouter();
  const [scroll, scrollTo] = useWindowScroll();

  const [data, setData] = useState<MODEL_FORUM_POSTING[]>(listForum);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setIsSearch] = useState("");

  const [loadingCreate, setLoadingCreate] = useState(false);

  //
  const [isNewPost, setIsNewPost] = useState(false);
  const [countNewPost, setCountNewPost] = useState(0);

  useShallowEffect(() => {
    onLoadAllData({
      onLoad(val) {
        setData(val);
      },
    });
  }, [setData]);

  async function onLoadAllData({ onLoad }: { onLoad: (val: any) => void }) {
    const loadData = await forum_new_getAllPosting({ page: 1 });
    onLoad(loadData);
  }

  useShallowEffect(() => {
    mqtt_client.subscribe("Forum_create_new");
    mqtt_client.subscribe("Forum_ganti_status");
    mqtt_client.subscribe("Forum_hapus_data");
    mqtt_client.subscribe("Forum_detail_ganti_status");

    mqtt_client.on("message", (topic: any, message: any) => {
      // console.log(topic);
      const cloneData = _.clone(data);

      if (topic === "Forum_create_new") {
        const newData = JSON.parse(message.toString());
        setIsNewPost(newData.isNewPost);
        const tambah = countNewPost + newData.count;
        setCountNewPost(tambah);
      }

      if (topic === "Forum_hapus_data") {
        const newData = JSON.parse(message.toString());
        setData(newData.data);
      }

      if (topic === "Forum_ganti_status") {
        const newData = JSON.parse(message.toString());
        setData(newData.data);
      }

      if (topic === "Forum_detail_ganti_status") {
        const newData = JSON.parse(message.toString());

        const updateOneData = cloneData.map((val) => ({
          ...val,
          ForumMaster_StatusPosting: {
            id:
              val.id === newData.id
                ? newData.data.id
                : val.ForumMaster_StatusPosting.id,
            status:
              val.id === newData.id
                ? newData.data.status
                : val.ForumMaster_StatusPosting.status,
          },
        }));

        setData(updateOneData as any);
      }
    });
  }, [countNewPost, data]);

  async function onSearch(text: string) {
    setIsSearch(text);
    const loadSearch = await forum_new_getAllPosting({
      page: activePage,
      search: text,
    });
    setData(loadSearch as any);
    setActivePage(1);
  }

  return (
    <>
      {isNewPost && (
        <Affix position={{ top: rem(70) }} w={"100%"}>
          <ButtonUpdateBeranda
            countNewPost={countNewPost}
            onSetData={(val) => setData(val)}
            onSetIsNewPost={(val) => {
              setIsNewPost(val);
            }}
            onSetCountNewPosting={(val) => {
              setCountNewPost(val);
            }}
          />
        </Affix>
      )}

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
                Tidak ada data
              </Text>
            </Stack>
          </Stack>
        ) : (
          // --- Main component --- //
          <ScrollOnly
            height="80vh"
            renderLoading={() => (
              <Center mt={"lg"}>
                <Loader />
              </Center>
            )}
            data={data}
            setData={setData}
            moreData={async () => {
              const loadData = await forum_new_getAllPosting({
                page: activePage + 1,
                search: isSearch,
              });
              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentForum_V2_MainCardView
                data={item}
                userLoginId={userLoginId}
                onLoadData={(val) => {
                  setData(val);
                }}
                allData={data}
              />
            )}
          </ScrollOnly>
        )}
      </Stack>
    </>
  );
}

function ButtonUpdateBeranda({
  countNewPost,
  onSetData,
  onSetIsNewPost,
  onSetCountNewPosting,
}: {
  countNewPost: number;
  onSetData: (val: any) => void;
  onSetIsNewPost: (val: any) => void;
  onSetCountNewPosting: (val: any) => void;
}) {
  const [scroll, scrollTo] = useWindowScroll();
  const [isLoading, setIsLoading] = useState(false);

  async function onLoadData() {
    setIsLoading(true);
    const loadData = await forum_new_getAllPosting({ page: 1 });

    if (loadData) {
      onSetData(loadData);
      onSetIsNewPost(false);
      setIsLoading(false);
      onSetCountNewPosting(0);
    }
  }

  return (
    <>
      <Center>
        <Button
          loaderPosition="center"
          loading={isLoading ? true : false}
          radius={"xl"}
          opacity={scroll.y > 0 ? 0.5 : 0.8}
          onClick={() => onLoadData()}
        >
          Update beranda + {countNewPost}
        </Button>
      </Center>
    </>
  );
}
