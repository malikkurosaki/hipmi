import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import { Card, Stack } from "@mantine/core";
import ComponentColab_CardSectionData from "./card_section_data";
import ComponentColab_JumlahPartisipan from "./card_section_jumlah_partisipan";
import { MODEL_COLLABORATION } from "../../model/interface";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";

export function ComponentColab_CardProyekSaya({data, path}: {data: MODEL_COLLABORATION, path: string}) {
    return (
      <>
        <Card
          style={{
            padding: "15px",
            backgroundColor: AccentColor.darkblue,
            borderRadius: "10px",
            border: `2px solid ${AccentColor.blue}`,
            color: "white",
            marginBottom: "15px",
          }}
        >
          <Stack>
            <ComponentColab_CardSectionData
              colabId={data.id}
              path={path}
              data={data}
            />
            <ComponentColab_JumlahPartisipan
              jumlah={data.ProjectCollaboration_Partisipasi}
            />
          </Stack>
        </Card>
      </>
    );
}