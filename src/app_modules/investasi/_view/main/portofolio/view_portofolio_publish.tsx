import { useState } from "react";
import { Investasi_ComponentCardPortofolioPublish } from "../../../_component";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Box, Center } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { investasi_funGetSuccessTransactionById } from "../../../_fun";

export function Investasi_ViewPortofolioPublish({
  listData,
}: {
  listData: any[];
}) {
  const [data, setData] = useState(listData);
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      <Box>
        {_.isEmpty(data) ? (
          <ComponentGlobal_IsEmptyData />
        ) : (
          <ScrollOnly
            height="75vh"
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
            {(item) => (
              <Investasi_ComponentCardPortofolioPublish data={item as any} />
            )}
          </ScrollOnly>
        )}
      </Box>
    </>
  );
}
