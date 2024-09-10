import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";
import { Grid, Stack, AspectRatio, Paper, Text, Image } from "@mantine/core";
import _ from "lodash";
import { MODEL_INVESTASI } from "../../_lib/interface";
import { Investasi_ComponentStylesCard } from "../comp_card_border_and_background";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ComponentGlobal_CardLoadingOverlay } from "@/app_modules/_global/component";

export function Investasi_ComponentCardPortofolio_NotPublish({
  data,
  path,
}: {
  data: MODEL_INVESTASI;
  path: string;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Investasi_ComponentStylesCard
        onClickHandler={() => {
          router.push(path + data?.id);
          setVisible(true);
        }}
      >
        <Grid>
          <Grid.Col span={8}>
            <Text fw={"bold"} lineClamp={1}>
              {" "}
              {_.startCase(data.title)}
            </Text>
            <Stack spacing={0}>
              <Text fz={10}>Target Dana:</Text>
              <Text>
                Rp.{" "}
                {new Intl.NumberFormat("id-ID", {
                  maximumSignificantDigits: 10,
                }).format(+data.targetDana)}
              </Text>
            </Stack>
          </Grid.Col>

          <Grid.Col span={4}>
            <AspectRatio ratio={16 / 9}>
              <Paper radius={"md"}>
                <Image
                  alt=""
                  src={RouterInvestasi_OLD.api_gambar + `${data.imagesId}`}
                />
              </Paper>
            </AspectRatio>
          </Grid.Col>
        </Grid>
        {visible && <ComponentGlobal_CardLoadingOverlay />}
      </Investasi_ComponentStylesCard>
    </>
  );
}
