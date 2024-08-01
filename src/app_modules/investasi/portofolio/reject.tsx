import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  AspectRatio,
  Box,
  Grid,
  Image,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentInvestasi_IsEmptyData from "../component/is_empty_data";
import { MODEL_Investasi } from "../model/model_investasi";
import { ComponentInvestasi_CardStatus } from "../component/detail/card_status";

export default function Reject({ data }: { data: MODEL_Investasi[] }) {
  const [investasi, setInvestasi] = useState(data);
  const router = useRouter();

  if (_.isEmpty(data))
    return (
      <>
        <ComponentInvestasi_IsEmptyData text="Tidak ada data" />
      </>
    );

  return (
    <>
      {investasi.map((e) => (
        <Box key={e.id}>
          <ComponentInvestasi_CardStatus
            data={e}
            path={RouterInvestasi.detail_reject}
          />
        </Box>
      ))}
    </>
  );
}
