"use client";

import { useState } from "react";
import { MODEL_JOB } from "../../model/interface";
import ComponentGlobal_IsEmptyData from "@/app_modules/component_global/is_empty_data";
import { Stack, TextInput, Center, Loader } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import ComponentJob_BerandaCardView from "../../component/beranda/card_view";
import { job_getAllListPublish } from "../../fun/get/get_all_publish";
import ComponentJob_CreateButton from "../../component/button/create_button";

export function Job_UiBeranda({ listData }: { listData: MODEL_JOB[] }) {
  const [data, setData] = useState(listData);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setIsSearch] = useState("");

  async function onSearch(text: string) {
    setIsSearch(text);
    const loadData = await job_getAllListPublish({
      page: activePage,
      search: text,
    });
    setData(loadData as any);
    setActivePage(1);
  }

  return (
    <>
      <Stack my={1} spacing={30}>
        <ComponentJob_CreateButton />

        <TextInput
          style={{
            position: "sticky",
            top: 0,
            zIndex: 99,
          }}
          radius={"xl"}
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
