"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import {
  Affix,
  Box,
  Button,
  Center,
  Loader,
  rem,
  Stack,
  TextInput,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import ComponentVote_CardViewPublish from "../component/card_view_publish";
import { vote_getAllListPublish } from "../fun/get/get_all_list_publish";
import { MODEL_VOTING } from "../model/interface";
import { gs_votingTiggerBeranda } from "@/app/lib/global_state";
import { useAtom } from "jotai";
import { AccentColor } from "@/app_modules/_global/color";

export default function Vote_Beranda({
  dataVote,
}: {
  dataVote: MODEL_VOTING[];
}) {
  const [data, setData] = useState(dataVote);
  const [activePage, setActivePage] = useState(1);

  // Realtime
  const [isTriggerVotingBeranda, setIsTriggerVotingBeranda] = useAtom(
    gs_votingTiggerBeranda
  );
  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useShallowEffect(() => {
    if (isTriggerVotingBeranda) {
      setIsShowUpdate(true);
    }
  }, [isTriggerVotingBeranda, setIsShowUpdate]);

  useShallowEffect(() => {
    onLoad({
      newData(val) {
        setData(val);
      },
    });
    setIsTriggerVotingBeranda(false);
  }, [setData, setIsTriggerVotingBeranda]);

  async function onLoad({ newData }: { newData: (val: any) => void }) {
    const loadData = await vote_getAllListPublish({ page: 1 });
    newData(loadData);
  }

  async function onSearch(s: string) {
    const loadSearch = await vote_getAllListPublish({ page: 1, search: s });
    setData(loadSearch as any);
  }

  async function onLoadData({ onPublish }: { onPublish: (val: any) => void }) {
    setIsLoading(true);
    const loadData = await vote_getAllListPublish({ page: 1 });
    onPublish(loadData);

    setIsShowUpdate(false);
    setIsTriggerVotingBeranda(false);
    setIsLoading(false);
  }

  return (
    <Stack mt={"1vh"}>
      {isShowUpdate && (
        <Affix position={{ top: rem(100) }} w={"100%"}>
          <Center>
            <Button
              style={{
                transition: "0.5s",
                border: `1px solid ${AccentColor.skyblue}`,
              }}
              bg={AccentColor.blue}
              loaderPosition="center"
              loading={isLoading}
              radius={"xl"}
              opacity={0.8}
              onClick={() => {
                onLoadData({
                  onPublish(val) {
                    setData(val);
                  },
                });
              }}
            >
              Update beranda
            </Button>
          </Center>
        </Affix>
      )}

      <TextInput
        radius={"xl"}
        placeholder="Masukan judul voting"
        onChange={(val) => onSearch(val.target.value)}
      />

      <ComponentGlobal_CreateButton path={RouterVote.create} />

      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        <Box>
          <ScrollOnly
            height="75vh"
            renderLoading={() => (
              <Center mt={"lg"}>
                <Loader color={"yellow"} />
              </Center>
            )}
            data={data}
            setData={setData}
            moreData={async () => {
              const loadData = await vote_getAllListPublish({
                page: activePage + 1,
              });

              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentVote_CardViewPublish
                data={item}
                path={RouterVote.main_detail}
                authorName={true}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </Stack>
  );
}
