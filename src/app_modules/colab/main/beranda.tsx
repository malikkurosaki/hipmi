"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import mqtt_client from "@/util/mqtt_client";
import { Affix, Box, Button, Center, Loader, rem } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { ComponentColab_CardBeranda } from "../component/card_view/card_beranda";
import colab_getListAllProyek from "../fun/get/get_list_all_proyek";
import { MODEL_COLLABORATION } from "../model/interface";
import { ComponentColab_ButtonUpdateBeranda } from "../component/button/button_update_beranda";

export default function Colab_Beranda({
  listData,
  userLoginId,
}: {
  listData: MODEL_COLLABORATION[];
  userLoginId: string;
}) {
  const [data, setData] = useState(listData);
  const [activePage, setActivePage] = useState(1);

  const [isNewPost, setIsNewPost] = useState(false);

  useShallowEffect(() => {
    mqtt_client.subscribe("Colab_create");

    mqtt_client.on("message", (topic, message) => {
      if (topic === "Colab_create") {
        setIsNewPost(JSON.parse(message.toString()).isNewPost);
      }
    });
  }, []);

  return (
    <>
      <Box>
        {isNewPost && (
          <ComponentColab_ButtonUpdateBeranda
            onLoad={(val) => {
              setData(val);
            }}
            setIsNewPost={setIsNewPost}
          />
        )}

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
