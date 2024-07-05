"use client"

import { useState } from "react"
import { MODEL_JOB } from "../../model/interface"
import _ from "lodash";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import ComponentGlobal_IsEmptyData from "@/app_modules/component_global/is_empty_data";
import { Box, Center, Loader } from "@mantine/core";
import { ScrollOnly } from "next-scroll-loader";
import ComponentJob_CardStatus from "../../component/card/card_view";
import job_getAllStatusPublish from "../../fun/get/status/get_list_publish";
import { job_getAllArsipById } from "../../fun/get/get_all_arsip";

export function Job_UI_Arsip({listData}: {listData: MODEL_JOB[]}){
    const [data, setData] = useState(listData)
    const [activePage, setActivePage] = useState(1);

    return (
      <>
        {_.isEmpty(data) ? (
          <ComponentGlobal_IsEmptyData />
        ) : (
          // --- Main component --- //
          <Box >
            <ScrollOnly
              height="85vh"
              renderLoading={() => (
                <Center mt={"lg"}>
                  <Loader color={"yellow"} />
                </Center>
              )}
              data={data}
              setData={setData}
              moreData={async () => {
                const loadData = await job_getAllArsipById({
                  page: activePage + 1,
                });

                setActivePage((val) => val + 1);

                return loadData;
              }}
            >
              {(item) => (
                <ComponentJob_CardStatus
                  data={item}
                  path={RouterJob.detail_arsip}
                />
              )}
            </ScrollOnly>
          </Box>
        )}
      </>
    );
}