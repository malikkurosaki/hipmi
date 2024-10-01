import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { Stack } from "@mantine/core";
import {
  MODEL_COLLABORATION_PARTISIPASI
} from "../../model/interface";
import ComponentColab_CardSectionData from "./card_section_data";
import ComponentColab_CardSectionHeaderAuthorName from "./card_section_header_author_name";
import ComponentColab_JumlahPartisipan from "./card_section_jumlah_partisipan";

export function ComponentColab_CardSemuaPartisipan({
  data,
  path,
}: {
  data: MODEL_COLLABORATION_PARTISIPASI;
  path: string;
}) {
  return (
    <>
      <ComponentGlobal_CardStyles marginBottom={"15px"}>
        <Stack>
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          <ComponentColab_CardSectionHeaderAuthorName
            profile={data?.ProjectCollaboration.Author.Profile}
          />
          <ComponentColab_CardSectionData
            colabId={data?.ProjectCollaboration.id}
            path={path}
            data={data?.ProjectCollaboration}
          />
          <ComponentColab_JumlahPartisipan
            jumlah={data?.ProjectCollaboration.ProjectCollaboration_Partisipasi}
          />
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
