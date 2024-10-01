"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Box, Center, Loader } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { ComponentColab_CardProyekSaya } from "../../component/card_view/card_proyek_saya";
import colab_getListAllProyekSayaByAuthorId from "../../fun/get/pasrtisipan/get_list_proyek_saya_by_author_id";
import { MODEL_COLLABORATION } from "../../model/interface";

export default function Colab_ProyekSaya({
  listProyekSaya,
}: {
  listProyekSaya: MODEL_COLLABORATION[];
}) {
  const [data, setData] = useState(listProyekSaya);
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        // --- Main component --- //
        <Box >
          <ScrollOnly
            height="73vh"
            renderLoading={() => (
              <Center mt={"lg"}>
                <Loader color={"yellow"} />
              </Center>
            )}
            data={data}
            setData={setData}
            moreData={async () => {
              const loadData = await colab_getListAllProyekSayaByAuthorId({
                page: activePage + 1,
              });
              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentColab_CardProyekSaya
                data={item}
                path={RouterColab.detail_proyek_saya}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
