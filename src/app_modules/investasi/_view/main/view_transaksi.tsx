import {
  NEW_RouterInvestasi,
  RouterInvestasi_OLD,
} from "@/app/lib/router_hipmi/router_investasi";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import {
  Stack,
  Box,
  Paper,
  Group,
  Title,
  Text,
  Center,
  Badge,
  Loader,
} from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_INVOICE_INVESTASI } from "../../_lib/interface";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import _ from "lodash";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { ComponentColab_CardBeranda } from "@/app_modules/colab/component/card_view/card_beranda";
import colab_getListAllProyek from "@/app_modules/colab/fun/get/get_list_all_proyek";
import { ScrollOnly } from "next-scroll-loader";
import { Investasi_ComponentCardDaftarTransaksi } from "../../_component";

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
