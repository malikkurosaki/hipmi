import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import colab_getListAllProyek from "@/app_modules/colab/fun/get/get_list_all_proyek";
import { Box, Center, Loader } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { Investasi_ComponentCardDaftarTransaksi } from "../../_component";
import { MODEL_INVOICE_INVESTASI } from "../../_lib/interface";

export function Investasi_ViewDaftarTransaksi({
  dataTransaksi,
}: {
  dataTransaksi: MODEL_INVOICE_INVESTASI[];
}) {
  const [data, setData] = useState(dataTransaksi);
  const [activePage, setActivePage] = useState(1);

  return (
    <>
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
            {(item) => <Investasi_ComponentCardDaftarTransaksi data={item} />}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
