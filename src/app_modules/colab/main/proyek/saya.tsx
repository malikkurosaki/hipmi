"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import { Card, Stack } from "@mantine/core";
import ComponentColab_CardSectionData from "../../component/card_view/card_section_data";
import ComponentColab_CardSectionHeaderAuthorName from "../../component/card_view/card_section_header_author_name";
import ComponentColab_JumlahPartisipan from "../../component/card_view/card_section_jumlah_partisipan";
import { MODEL_COLLABORATION } from "../../model/interface";
import _ from "lodash";
import ComponentColab_IsEmptyData from "../../component/is_empty_data";

export default function Colab_ProyekSaya({
  listProyekSaya,
}: {
  listProyekSaya: MODEL_COLLABORATION[];
}) {
  if (_.isEmpty(listProyekSaya))
    return <ComponentColab_IsEmptyData text="Tidak ada data" />;

  return (
    <>
      {listProyekSaya.map((e, i) => (
        <Card
          key={i}
          withBorder
          shadow="lg"
          mb={"lg"}
          radius={"md"}
          style={{ borderColor: "violet", borderWidth: "0.5px" }}
        >
          <Stack>
            <ComponentColab_CardSectionData
              colabId={e.id}
              path={RouterColab.detail_proyek_saya}
              data={e}

            />
            <ComponentColab_JumlahPartisipan
              jumlah={e.ProjectCollaboration_Partisipasi}
            />
          </Stack>
        </Card>
      ))}
    </>
  );
}
