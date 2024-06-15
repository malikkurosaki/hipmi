"use client";

import { Card } from "@mantine/core";
import ComponentColab_CardSectionData from "../../component/card_view/card_section_data";
import { RouterColab } from "@/app/lib/router_hipmi/router_colab";

export default function Colab_StatusReview() {
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
            // bg={"orange.0.5"}
            style={{ borderColor: "orange", borderWidth: "0.5px" }}
          >
            <ComponentColab_CardSectionData colabId={i} path={RouterColab.status_review} />
          </Card>
        ))}
    </>
  );
}
