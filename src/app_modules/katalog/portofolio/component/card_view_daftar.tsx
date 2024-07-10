import { Group, Paper, Stack, Text } from "@mantine/core";
import { MODEL_PORTOFOLIO } from "../model/interface";
import { AccentColor } from "@/app_modules/component_global/color/color_pallet";
import ComponentGlobal_UI_Loader from "@/app_modules/component_global/ui/ui_loader";
import { IconCaretRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RouterPortofolio } from "@/app/lib/router_hipmi/router_katalog";

export function ComponentPortofolio_DaftarBoxView({
  data,
}: {
  data: MODEL_PORTOFOLIO;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Paper
        shadow="sm"
        radius={"md"}
        mb={"lg"}
        onClick={() => {
          setIsLoading(true);
          router.push(RouterPortofolio.main_detail + data.id);
        }}
        style={{
          backgroundColor: AccentColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          borderRadius: "10px ",
          padding: "15px",
          color: "white",
        }}
      >
        <Group position="apart">
          <Text fw={"bold"} lineClamp={1} w={"80%"}>
            {data?.namaBisnis}
          </Text>
          <Stack>
            {isLoading ? (
              <ComponentGlobal_UI_Loader />
            ) : (
              <IconCaretRight color="white" size={25} />
            )}
          </Stack>
        </Group>
      </Paper>
    </>
  );
}
