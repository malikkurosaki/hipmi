"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import {
  AspectRatio,
  Badge,
  Box,
  Center,
  Grid,
  Group,
  Image,
  Paper,
  Progress,
  Stack,
  Text
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import _ from "lodash";
import moment from "moment";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-simple-toasts";
import ComponentDonasi_TampilanHitungMundur from "../component/tampilan_hitung_mundur";
import TampilanRupiahDonasi from "../component/tampilan_rupiah";
import { MODEL_DONASI_INVOICE } from "../model/interface";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { ScrollOnly } from "next-scroll-loader";
import ComponentDonasi_CardPublish from "../component/card_view/card_publish";
import { donasi_funGetAllPublish } from "../fun/get/get_list_beranda";
import { donasi_funGetAllInvoiceByAuthorId } from "../fun/get/get_all_invoice_by_author_id";
import { ComponentDonasi_CardInvoice } from "../component/card_view/card_invoice";

export default function DonasiSayaDonasi({
  listInvoice,
}: {
  listInvoice: MODEL_DONASI_INVOICE[];
}) {
  const router = useRouter();
  const [data, setData] = useState(listInvoice);
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
              const loadData = await donasi_funGetAllInvoiceByAuthorId({
                page: activePage + 1,
              });

              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentDonasi_CardInvoice
                data={item as any}
              />
            )}
          </ScrollOnly>
        )}
      </Box>
    </>
  );
}

async function onClick(
  router: AppRouterInstance,
  status: string,
  invoiceId: string,
  donasiId: string
) {
  if (status === "1") {
    return router.push(RouterDonasi.detail_donasi_saya + `${invoiceId}`);
  } else {
    if (status === "2") {
      return router.push(RouterDonasi.proses_transaksi + `${invoiceId}`);
    } else {
      if (status === "3") {
        return router.push(RouterDonasi.invoice + `${invoiceId}`);
      } else {
        ComponentGlobal_NotifikasiGagal("Gagal Melihat Invoice");
      }
    }
  }
}
