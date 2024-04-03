"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import { Card, Stack } from "@mantine/core";
import ComponentColab_CardSectionData from "../../component/card_view/card_section_data";
import ComponentColab_CardSectionHeaderAuthorName from "../../component/card_view/card_section_header_author_name";
import ComponentColab_JumlahPartisipan from "../../component/card_view/jumlah_partisipan";

export default function Colab_ProyekSaya() {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((e, i) => (
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
                colabId={i}
                path={RouterColab.status_publish}
              />
              <ComponentColab_JumlahPartisipan />
            </Stack>
          </Card>
        ))}
    </>
  );
}
