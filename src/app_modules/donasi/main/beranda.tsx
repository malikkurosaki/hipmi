"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Box, Center } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import ComponentDonasi_CardPublish from "../component/card_view/card_publish";
import { donasi_funGetAllPublish } from "../fun/get/get_list_beranda";
import { MODEL_DONASI } from "../model/interface";

export default function MainDonasi({
  listDonasi,
}: {
  listDonasi: MODEL_DONASI[];
}) {
  const [data, setData] = useState(listDonasi);
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      <Box>
        <ComponentGlobal_CreateButton path={RouterDonasi.create_donasi} />
        {_.isEmpty(data) ? (
          <ComponentGlobal_IsEmptyData />
        ) : (
          <ScrollOnly
            height="82vh"
            renderLoading={() => (
              <Center>
                <ComponentGlobal_Loader size={25} />
              </Center>
            )}
            data={data}
            setData={setData}
            moreData={async () => {
              const loadData = await donasi_funGetAllPublish({
                page: activePage + 1,
              });

              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentDonasi_CardPublish
                data={item as any}
                path={RouterDonasi.detail_main}
              />
            )}
          </ScrollOnly>
        )}
      </Box>
    </>
  );
}
