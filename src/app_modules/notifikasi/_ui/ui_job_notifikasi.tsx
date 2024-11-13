"use client";

import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Box, Center } from "@mantine/core";
import { useAtom } from "jotai";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { ComponentNotifiaksi_CardView } from "../component";
import notifikasi_getByUserId from "../fun/get/get_notifiaksi_by_id";
import { gs_notifikasi_kategori_app } from "../lib";
import { MODEL_NOTIFIKASI } from "../model/interface";

export default function Notifikasi_UiJob({
  listNotifikasi,
}: {
  listNotifikasi: any[];
}) {
  const [data, setData] = useState<MODEL_NOTIFIKASI[]>(listNotifikasi);
  const [activePage, setActivePage] = useState(1);
  const [categoryPage, setCategoryPage] = useAtom(gs_notifikasi_kategori_app);

  return (
    <>
      <Box>
        {_.isEmpty(data) ? (
          <ComponentGlobal_IsEmptyData text="Tidak ada pemberitahuan" />
        ) : (
          <ScrollOnly
            height="85vh"
            renderLoading={() => (
              <Center mt={"lg"}>
                <ComponentGlobal_Loader />
              </Center>
            )}
            data={data}
            setData={setData}
            moreData={async () => {
              const loadData = await notifikasi_getByUserId({
                page: activePage + 1,
                kategoriApp: categoryPage as any,
              });

              setActivePage((val) => val + 1);
              return loadData;
            }}
          >
            {(item) => (
              <ComponentNotifiaksi_CardView
                data={item}
                onLoadData={setData}
                categoryPage={categoryPage}
              />
            )}
          </ScrollOnly>
        )}
      </Box>
    </>
  );
}
