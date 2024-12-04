import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Box, Center } from "@mantine/core";
import { Investasi_ComponentSahamSaya } from "../../_component";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { investasi_funGetAllPublish } from "../../fun/get_all_investasi";
import { investasi_funGetSuccessTransactionById } from "../../_fun";

export function Investasi_ViewSahamSaya({ dataSaham }: { dataSaham: any[] }) {
  const [data, setData] = useState(dataSaham);
  const [activePage, setActivePage] = useState(1);
  return (
    <>
      <Box>
        {_.isEmpty(data) ? (
          <ComponentGlobal_IsEmptyData />
        ) : (
          <ScrollOnly
            height="82vh"
            renderLoading={() => (
              <Center>
                <ComponentGlobal_Loader size={25} />
              </Center>
            )}
            data={data}
            setData={setData}
            moreData={async () => {
              const loadData = await investasi_funGetSuccessTransactionById({
                page: activePage + 1,
              });
              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => <Investasi_ComponentSahamSaya data={item as any} />}
          </ScrollOnly>
        )}
      </Box>
    </>
  );
}
