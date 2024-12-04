"use client";

import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { ComponentDonasi_CardDonatur } from "@/app_modules/donasi/component/card_view/ui_card_donatur";
import { donasi_funGetListDonaturById } from "@/app_modules/donasi/fun/get/get_list_donatur";
import { MODEL_DONASI_INVOICE } from "@/app_modules/donasi/model/interface";
import { Box, Center } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";

export default function DonaturDonasi({
  listDonatur,
  donasiId,
}: {
  listDonatur: MODEL_DONASI_INVOICE[];
  donasiId: string;
}) {
  const [data, setData] = useState(listDonatur);
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
              const loadData = await donasi_funGetListDonaturById({
                page: activePage + 1,
                donasiId: donasiId,
              });

              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => <ComponentDonasi_CardDonatur data={item} />}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
