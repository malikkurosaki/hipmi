import { ComponentGlobal_BoxInformation } from "@/app_modules/_global/component";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Box, Center, Stack } from "@mantine/core";
import { data } from "autoprefixer";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { investasi_funGetAllDocumentById } from "../../_fun";
import { useState } from "react";
import { MODEL_INVESTASI_DOKUMEN } from "../../_lib/interface";
import { Investasi_ComponentCardDaftarDocument } from "../../_component";

export function Investasi_ViewDaftarDokumen({
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
      <Stack>
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
                  <Investasi_ComponentCardDaftarDocument data={item as any} />
                )}
              </ScrollOnly>
            </Box>
          )}
        </>
      </Stack>
    </>
  );
}
