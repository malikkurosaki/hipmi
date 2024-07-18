"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { event_getListAllPublish } from "@/app_modules/event/fun/get/get_list_all_publish";
import {
  Box,
  Center,
  Loader
} from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { ComponentColab_CardBeranda } from "../component/card_view/card_beranda";
import { MODEL_COLLABORATION } from "../model/interface";
import colab_getListAllProyek from "../fun/get/get_list_all_proyek";

export default function Colab_Beranda({
  listData,
  userLoginId,
}: {
  listData: MODEL_COLLABORATION[];
  userLoginId: string;
}) {
  const [data, setData] = useState(listData);
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      <Box>
        <ComponentGlobal_CreateButton path={RouterColab.create} />

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
                const loadData = await colab_getListAllProyek({
                  page: activePage + 1,
                });

                setActivePage((val) => val + 1);

                return loadData;
              }}
            >
              {(item) => (
                <ComponentColab_CardBeranda
                  data={item}
                  userLoginId={userLoginId}
                />
              )}
            </ScrollOnly>
          </Box>
        )}
      </Box>
    </>
  );
}
