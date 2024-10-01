import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { Card, Stack } from "@mantine/core";
import { MODEL_COLLABORATION } from "../../model/interface";
import ComponentColab_CardSectionData from "./card_section_data";
import ComponentColab_JumlahPartisipan from "./card_section_jumlah_partisipan";
import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";

export function ComponentColab_CardProyekSaya({data, path}: {data: MODEL_COLLABORATION, path: string}) {
    return (
      <>
        <ComponentGlobal_CardStyles marginBottom={"15px"}>
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
        </ComponentGlobal_CardStyles>
      </>
    );
}