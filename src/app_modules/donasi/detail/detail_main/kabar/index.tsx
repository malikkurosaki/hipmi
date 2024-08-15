"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { ComponentDonasi_CardDonatur } from "@/app_modules/donasi/component/card_view/ui_card_donatur";
import ComponentDonasi_ListKabar from "@/app_modules/donasi/component/card_view/ui_card_kabar";
import { donasi_funGetListDonaturById } from "@/app_modules/donasi/fun/get/get_list_donatur";
import { donasi_funGetListKabarById } from "@/app_modules/donasi/fun/get/get_list_kabar";
import { MODEL_DONASI_KABAR } from "@/app_modules/donasi/model/interface";
import { Box, Center } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";

export default function KabarDonasi({
  listKabar,
  donasiId,
}: {
  listKabar: MODEL_DONASI_KABAR[];
  donasiId: string;
}) {
  const [data, setData] = useState(listKabar);
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        <Box>
          <ScrollOnly
            height="92vh"
            renderLoading={() => (
              <Center>
                <ComponentGlobal_Loader size={25} />
              </Center>
            )}
            data={data}
            setData={setData}
            moreData={async () => {
              const loadData = await donasi_funGetListKabarById({
                page: activePage + 1,
                donasiId: donasiId,
              });

              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentDonasi_ListKabar
                kabar={item}
                route={RouterDonasi.detail_kabar}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
