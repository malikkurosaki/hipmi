"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Box, Center, Loader } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { ComponentColab_CardSemuaPartisipan } from "../../component/card_view/card_semua_partisipan";
import colab_getListPartisipasiProyekByAuthorId from "../../fun/get/pasrtisipan/get_list_partisipasi_proyek_by_author_id";
import { MODEL_COLLABORATION_PARTISIPASI } from "../../model/interface";

export default function Colab_PartisipasiProyek({
  listPartisipasiUser,
}: {
  listPartisipasiUser: MODEL_COLLABORATION_PARTISIPASI[];
}) {
  const [data, setData] = useState(listPartisipasiUser);
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        // --- Main component --- //
        <Box>
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
              const loadData = await colab_getListPartisipasiProyekByAuthorId({
                page: activePage + 1,
              });
              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentColab_CardSemuaPartisipan
                data={item}
                path={RouterColab.detail_partisipasi_proyek}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
