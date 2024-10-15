import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Box, Center } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { Investasi_ComponentCardRekapDocument } from "../../_component";
import { investasi_funGetAllDocumentById } from "../../_fun";
import { MODEL_INVESTASI_DOKUMEN } from "../../_lib/interface";
import { useShallowEffect } from "@mantine/hooks";

export function Investasi_ViewRekapDokumen({
  dataDokumen,
  investasiId,
}: {
  dataDokumen: any[];
  investasiId: string;
}) {
  const [data, setData] = useState<MODEL_INVESTASI_DOKUMEN[]>(dataDokumen);
  const [activePage, setActivePage] = useState(1);


  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        <Box>
          <ScrollOnly
            height="90vh"
            renderLoading={() => (
              <Center>
                <ComponentGlobal_Loader size={25} />
              </Center>
            )}
            data={data}
            setData={setData}
            moreData={async () => {
              const loadData = await investasi_funGetAllDocumentById({
                investasiId: investasiId,
                page: activePage + 1,
              });

              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <Investasi_ComponentCardRekapDocument
                data={item}
                onSetData={(val) => setData(val) as any}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
