import {
  ComponentGlobal_CardLoadingOverlay,
  ComponentGlobal_CardStyles,
  ComponentGlobal_LoadImageCustom,
} from "@/app_modules/_global/component";
import { Grid, Stack, Text } from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_INVESTASI } from "../../_lib/interface";

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
      {/* <pre style={{color: "white"}}>{JSON.stringify(data, null, 2)}</pre> */}

      <ComponentGlobal_CardStyles
        onClickHandler={() => {
          router.push(path, { scroll: false });
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
            <ComponentGlobal_LoadImageCustom
              fileId={data.imageId}
              height={80}
            />
          </Grid.Col>
        </Grid>
        {visible && <ComponentGlobal_CardLoadingOverlay />}
      </ComponentGlobal_CardStyles>
    </>
  );
}
