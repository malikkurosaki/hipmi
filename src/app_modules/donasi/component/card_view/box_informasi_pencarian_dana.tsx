import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Box, Center } from "@mantine/core";
import _ from "lodash";

import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { ScrollOnly } from "next-scroll-loader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { donasi_funGetListPencairanDanaById } from "../../fun/get/get_list_pencairan_dana_by_id";
import { MODEL_DONASI_PENCAIRAN_DANA } from "../../model/interface";
import { ComponentDonasi_CardDonatur } from "./ui_card_donatur";
import { ComponentDonasi_CardPencairanDana } from "./card_pencairan_dana";

export function ComponentDonasi_InformasiPencairanDana({
  donasiId,
  listPD,
}: {
  donasiId: string;
  listPD: MODEL_DONASI_PENCAIRAN_DANA[];
}) {
  const router = useRouter();
  const [data, setData] = useState(listPD);
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      {_.isEmpty(listPD) ? (
        <ComponentGlobal_IsEmptyData height={20} />
      ) : (
        <Box>
          <ScrollOnly
            height="62vh"
            renderLoading={() => (
              <Center>
                <ComponentGlobal_Loader size={25} />
              </Center>
            )}
            data={data}
            setData={setData}
            moreData={async () => {
              const loadData = await donasi_funGetListPencairanDanaById({
                page: activePage + 1,
                donasiId: donasiId,
              });

              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => <ComponentDonasi_CardPencairanDana data={item} />}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
