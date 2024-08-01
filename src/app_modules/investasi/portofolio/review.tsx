import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  Card,
  CardSection,
  AspectRatio,
  Box,
  Title,
  Divider,
  Group,
  Badge,
  Image,
  Center,
  Text,
  Paper,
  Grid,
  Stack,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import {
  MODEL_Status_investasi,
  MODEL_Investasi,
} from "../model/model_investasi";
import _ from "lodash";
import ComponentInvestasi_IsEmptyData from "../component/is_empty_data";
import { ComponentInvestasi_CardStatus } from "../component/detail/card_status";

export default function Review({ data }: { data: MODEL_Investasi[] }) {
  const router = useRouter();

  if (_.isEmpty(data))
    return (
      <>
        <ComponentInvestasi_IsEmptyData text="Tidak ada data" />
      </>
    );
  return (
    <>
      {data.map((e) => (
        <Box key={e.id}>
          <ComponentInvestasi_CardStatus
            data={e}
            path={RouterInvestasi.detail_review}
          />
        </Box>
      ))}
    </>
  );
}
