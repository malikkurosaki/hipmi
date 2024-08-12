"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { ComponentDonasi_InformasiPencairanDana } from "@/app_modules/donasi/component/card_view/box_informasi_pencarian_dana";
import { ComponentDonasi_BoxPencariranDana } from "@/app_modules/donasi/component/card_view/box_pencairan_dana";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import {
  MODEL_DONASI,
  MODEL_DONASI_PENCAIRAN_DANA,
} from "@/app_modules/donasi/model/interface";
import {
  AspectRatio,
  Button,
  Center,
  Grid,
  Image,
  Modal,
  Paper,
  Spoiler,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconImageInPicture } from "@tabler/icons-react";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PencairanDanaDonasi({
  donasiId,
  totalAkumulasi,
  listPencairan,
}: {
  donasiId: string;
  totalAkumulasi: MODEL_DONASI;
  listPencairan: MODEL_DONASI_PENCAIRAN_DANA[];
}) {
  const [akumulasi, setAkumulasi] = useState(totalAkumulasi);
  const [listPD, setListPD] = useState(listPencairan);
  return (
    <>
      <Stack>
        <ComponentDonasi_BoxPencariranDana akumulasi={akumulasi} />
        <ComponentDonasi_InformasiPencairanDana donasiId={donasiId} listPD={listPD} />
      </Stack>
    </>
  );
}
