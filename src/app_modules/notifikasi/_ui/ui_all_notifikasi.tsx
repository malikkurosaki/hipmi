"use client";

import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import {
  Box,
  Center,
  Divider,
  Grid,
  Group,
  Loader,
  Skeleton,
  Stack,
} from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import {
  ComponentNotifiaksi_CardView,
  Notifikasi_ComponentSkeletonView,
} from "../component";
import notifikasi_getByUserId from "../fun/get/get_notifiaksi_by_id";
import { ICategoryapp, MODEL_NOTIFIKASI } from "../model/interface";
import { useAtom } from "jotai";
import { gs_notifikasi_kategori_app } from "../lib";
import { useShallowEffect } from "@mantine/hooks";
import { API_RouteNotifikasi } from "@/app/lib/api_user_router/route_api_notifikasi";
import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";

export default function Notifikasi_UiAll() {
  const [data, setData] = useState<MODEL_NOTIFIKASI[] | null>(null);
  const [activePage, setActivePage] = useState(1);
  const [categoryPage, setCategoryPage] = useAtom(gs_notifikasi_kategori_app);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    const loadData = await fetch(
      API_RouteNotifikasi.get_all_by_category({
        category: categoryPage as any,
        page: 1,
      })
    );
    const data = await loadData.json().then((res) => res.data as any);
    setData(data);
  }

  return (
    <>
      <Box>
        {_.isNull(data) ? (
          <Notifikasi_ComponentSkeletonView />
        ) : _.isEmpty(data) ? (
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
            setData={setData as any}
            moreData={async () => {
              const loadData = await fetch(
                API_RouteNotifikasi.get_all_by_category({
                  category: categoryPage as any,
                  page: activePage + 1,
                })
              );
              const data = await loadData.json().then((res) => res.data as any);

              setActivePage((val) => val + 1);
              return data;
            }}
          >
            {(item) => (
              <ComponentNotifiaksi_CardView
                data={item}
                onLoadData={setData}
                categoryPage={categoryPage as any}
              />
            )}
          </ScrollOnly>
        )}
      </Box>
    </>
  );
}
