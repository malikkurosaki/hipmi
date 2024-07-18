import { Card, Stack } from "@mantine/core";
import {
  MODEL_COLLABORATION,
  MODEL_COLLABORATION_PARTISIPASI,
} from "../../model/interface";
import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import ComponentColab_CardSectionData from "./card_section_data";
import ComponentColab_CardSectionHeaderAuthorName from "./card_section_header_author_name";
import ComponentColab_JumlahPartisipan from "./card_section_jumlah_partisipan";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";

export function ComponentColab_CardSemuaPartisipan({
  data,
  path,
}: {
  data: MODEL_COLLABORATION_PARTISIPASI;
  path: string;
}) {
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
          <ComponentColab_CardSectionHeaderAuthorName
            authorName={data?.ProjectCollaboration.Author.Profile.name}
            imagesId={data?.ProjectCollaboration.Author.Profile.imagesId}
            profileId={data?.ProjectCollaboration.Author.Profile.id}
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
      </Card>
    </>
  );
}
