"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import { Card, Stack } from "@mantine/core";
import ComponentColab_CardSectionData from "../../component/card_view/card_section_data";
import ComponentColab_CardSectionHeaderAuthorName from "../../component/card_view/card_section_header_author_name";
import { MODEL_COLLABORATION_PARTISIPASI } from "../../model/interface";
import ComponentColab_JumlahPartisipan from "../../component/card_view/card_section_jumlah_partisipan";
import ComponentColab_IsEmptyData from "../../component/is_empty_data";
import _ from "lodash";

export default function Colab_PartisipasiProyek({
  listPartisipasiUser,
}: {
  listPartisipasiUser: MODEL_COLLABORATION_PARTISIPASI[];
}) {
  if (_.isEmpty(listPartisipasiUser))
    return <ComponentColab_IsEmptyData text="Tidak ikut berpartisipasi" />;

  return (
    <>
      {listPartisipasiUser.map((e, i) => (
        <Card
          key={i}
          withBorder
          shadow="lg"
          mb={"lg"}
          radius={"md"}
          style={{ borderColor: "indigo", borderWidth: "0.5px" }}
        >
          <Stack>
            <ComponentColab_CardSectionHeaderAuthorName
              authorName={e?.ProjectCollaboration.Author.Profile.name}
              imagesId={e?.ProjectCollaboration.Author.Profile.imagesId}
              profileId={e?.ProjectCollaboration.Author.Profile.id}
            />
            <ComponentColab_CardSectionData
              colabId={e?.ProjectCollaboration.id}
              path={RouterColab.detail_partisipasi_proyek}
              data={e?.ProjectCollaboration}
            />
            <ComponentColab_JumlahPartisipan
              jumlah={e?.ProjectCollaboration.ProjectCollaboration_Partisipasi}
            />
          </Stack>
        </Card>
      ))}
    </>
  );
}
