"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import { Box, Card, Center, Loader, Stack } from "@mantine/core";
import ComponentColab_CardSectionData from "../../component/card_view/card_section_data";
import ComponentColab_CardSectionHeaderAuthorName from "../../component/card_view/card_section_header_author_name";
import ComponentColab_JumlahPartisipan from "../../component/card_view/card_section_jumlah_partisipan";
import { MODEL_COLLABORATION } from "../../model/interface";
import _ from "lodash";
import ComponentColab_IsEmptyData from "../../component/is_empty_data";
import { useState } from "react";
import { ComponentColab_CardProyekSaya } from "../../component/card_view/card_proyek_saya";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { event_getAllDraft } from "@/app_modules/event/fun/get/status/get_all_draft";
import { ScrollOnly } from "next-scroll-loader";
import colab_getListAllProyekSayaByAuthorId from "../../fun/get/pasrtisipan/get_list_proyek_saya_by_author_id";

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
