"use client";

import { Card } from "@mantine/core";
import ComponentColab_CardSectionData from "../../component/card_view/card_section_data";
import { RouterColab } from "@/app/lib/router_hipmi/router_colab";

export default function Colab_StatusReject() {
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
            // bg={"red.1"}

            style={{ borderColor: "red", borderWidth: "0.5px" }}
          >
            <ComponentColab_CardSectionData
              colabId={i}
              path={RouterColab.status_reject}
            />
          </Card>
        ))}
    </>
  );
}
