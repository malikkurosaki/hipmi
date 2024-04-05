"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import { Card } from "@mantine/core";
import ComponentColab_CardSectionData from "../../component/card_view/card_section_data";
import ComponentColab_CardSectionHeaderAuthorName from "../../component/card_view/card_section_header_author_name";

export default function Colab_PartisipasiProyek() {
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
            style={{ borderColor: "indigo", borderWidth: "0.5px" }}
          >
            <ComponentColab_CardSectionHeaderAuthorName
              tglPublish={new Date()}
              jumlah_partisipan={[]}
            />
            <ComponentColab_CardSectionData
              colabId={i}
              path={RouterColab.partisipasi_proyek}
            />
          </Card>
        ))}
    </>
  );
}
