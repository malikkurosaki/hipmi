import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Box } from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { ComponentInvestasi_CardStatus } from "../component/detail/card_status";
import { MODEL_Investasi } from "../model/model_investasi";

export default function Review({ data }: { data: MODEL_Investasi[] }) {
  const router = useRouter();

  if (_.isEmpty(data)) return <ComponentGlobal_IsEmptyData />;

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
