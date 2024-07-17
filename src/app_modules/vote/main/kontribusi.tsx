"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import { Box, Center, Loader, Stack } from "@mantine/core";
import _ from "lodash";
import ComponentVote_CardViewPublish from "../component/card_view_publish";
import ComponentVote_IsEmptyData from "../component/is_empty_data";
import { MODEL_VOTE_KONTRIBUTOR } from "../model/interface";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { data } from "autoprefixer";
import { ScrollOnly } from "next-scroll-loader";
import { vote_getAllListPublish } from "../fun/get/get_all_list_publish";
import { useState } from "react";
import { vote_getAllListKontribusiByAuthorId } from "../fun/get/get_list_kontribusi_by_author_id";

export default function Vote_Kontribusi({
  dataKontribusi,
}: {
  dataKontribusi: MODEL_VOTE_KONTRIBUTOR[];
}) {
  const [data, setData] = useState(dataKontribusi);
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      {_.isEmpty(dataKontribusi) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        <Box >
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
              const loadData = await vote_getAllListKontribusiByAuthorId({
                page: activePage + 1,
              });

              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentVote_CardViewPublish
                path={RouterVote.detail_kontribusi}
                pilihanSaya={true}
                data={item.Voting}
                authorName={true}
                namaPilihan={item.Voting_DaftarNamaVote.value}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
      {/* <pre>{JSON.stringify(dataKontribusi, null, 2)}</pre> */}
    </>
  );
}
