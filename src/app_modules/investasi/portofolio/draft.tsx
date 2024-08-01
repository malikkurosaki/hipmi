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
  Text,
  Center,
  Paper,
  Grid,
  Flex,
  Stack,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { MODEL_Investasi } from "../model/model_investasi";
import _ from "lodash";
import ComponentInvestasi_IsEmptyData from "../component/is_empty_data";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentInvestasi_CardStatus } from "../component/detail/card_status";

export default function Draft({ data }: { data: MODEL_Investasi[] }) {
  const router = useRouter();
  // console.log(data)

  if (_.isEmpty(data))
    return (
      <>
        <ComponentGlobal_IsEmptyData />
      </>
    );

  return (
    <>
      {/* <pre> {JSON.stringify(data,null, 2)}</pre> */}
      {data.map((e) => (
         <Box key={e.id}>
          <ComponentInvestasi_CardStatus
            data={e}
            path={RouterInvestasi.detail_draft}
          />
        </Box>

       
      ))}
    </>
  );
}
