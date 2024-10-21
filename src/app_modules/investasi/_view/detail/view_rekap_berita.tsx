import { NEW_RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  ComponentGlobal_CardLoadingOverlay,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import { Box, Group, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Investasi_ViewRekapBerita({
  dataBerita,
}: {
  dataBerita: any[];
}) {
  const router = useRouter();
  const [data, setData] = useState(dataBerita);
  const [visible, setVisible] = useState(false);
  const [dataId, setDataId] = useState("");

  return (
    <>
      <Box>
        {data.map((e, i) => (
          <ComponentGlobal_CardStyles
            key={i}
            onClickHandler={() => {
              router.push(NEW_RouterInvestasi.berita({ id: e.id }), {
                scroll: false,
              });
              setVisible(true);
              setDataId(e.id);
            }}
          >
            <Title order={6} lineClamp={1}>
              {e.title}
            </Title>
            {visible && dataId === e.id && (
              <ComponentGlobal_CardLoadingOverlay />
            )}
          </ComponentGlobal_CardStyles>
        ))}
      </Box>
    </>
  );
}
