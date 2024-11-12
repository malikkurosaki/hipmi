"use client";

import { gs_job_trigger } from "@/app/lib/global_state";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Center, Loader, Stack, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useAtom } from "jotai";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import ComponentJob_BerandaCardView from "../../component/beranda/card_view";
import { job_getAllListPublish } from "../../fun/get/get_all_publish";
import { MODEL_JOB } from "../../model/interface";

export function Job_UiBeranda({ listData }: { listData: MODEL_JOB[] }) {
  const [data, setData] = useState(listData);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setIsSearch] = useState("");
  // const [isNewPost, setIsNewPost] = useState(false);
  const [triggerJob, setTriggerJob] = useAtom(gs_job_trigger);

  useShallowEffect(() => {
    if (triggerJob) {
      // setIsNewPost(true);
      setTriggerJob(false);
      onLoadNewData({
        onLoad(val) {
          setData(val);
        },
      });
    }
  }, [triggerJob, setData]);

  async function onSearch(text: string) {
    setIsSearch(text);
    const loadData = await job_getAllListPublish({
      page: activePage,
      search: text,
    });
    setData(loadData as any);
    setActivePage(1);
  }

  async function onLoadNewData({ onLoad }: { onLoad: (val: any) => void }) {
    const loadData = await job_getAllListPublish({ page: 1 });
    onLoad(loadData);
  }

  return (
    <>
      <Stack my={1} spacing={30}>
        {/* {isNewPost && (
          <Job_ComponentButtonUpdateBeranda
            onSetIsNewPost={(val) => {
              setIsNewPost(val);
            }}
            onSetData={(val: { data: any[] }) => {
              setData(val.data);
            }}
          />
        )} */}

        <ComponentGlobal_CreateButton path={RouterJob.create} />

        <TextInput
          style={{
            position: "sticky",
            top: 0,
            zIndex: 99,
          }}
          radius={"xl"}
          icon={<IconSearch />}
          placeholder="Pekerjaan apa yang anda cari ?"
          onChange={(val) => {
            onSearch(val.currentTarget.value);
          }}
        />

        {_.isEmpty(data) ? (
          <ComponentGlobal_IsEmptyData />
        ) : (
          // --- Main component --- //
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
              const loadData = await job_getAllListPublish({
                page: activePage + 1,
                search: isSearch,
              });
              console.log(loadData, "load daat");

              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => <ComponentJob_BerandaCardView data={item} />}
          </ScrollOnly>
        )}
      </Stack>
    </>
  );
}
