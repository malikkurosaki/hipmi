"use client";

import ComponentGlobal_UI_Loader from "@/app_modules/component_global/ui/ui_loader";
import { Box, Center } from "@mantine/core";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { ComponentPortofolio_DaftarBoxView } from "../component/card_view_daftar";
import { portofolio_funGetAllDaftarByid } from "../fun/get/get_all_portofolio";
import { MODEL_PORTOFOLIO } from "../model/interface";

export function Portofolio_UiListDetail({
  dataPortofolio,
  profileId,
}: {
  dataPortofolio: MODEL_PORTOFOLIO[];
  profileId: string;
}) {
  const [data, setData] = useState(dataPortofolio);
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      <Box py={5}>
        <ScrollOnly
          height="90vh"
          renderLoading={() => (
            <Center mt={"lg"}>
              <ComponentGlobal_UI_Loader />
            </Center>
          )}
          data={data}
          setData={setData}
          moreData={async () => {
            const loadData = await portofolio_funGetAllDaftarByid({
              profileId,
              page: activePage + 1,
            });
            setActivePage((val) => val + 1);

            return loadData;
          }}
        >
          {(item) => <ComponentPortofolio_DaftarBoxView data={item} />}
        </ScrollOnly>
      </Box>
    </>
  );
}
