import { RouterPortofolio } from "@/app/lib/router_hipmi/router_katalog";
import { Paper, Title, AspectRatio, Image } from "@mantine/core";
import { MODEL_PORTOFOLIO } from "../model/interface";
import { AccentColor } from "@/app_modules/component_global/color/color_pallet";

export function Portofolio_UiDetailLogo({
  dataPorto,
}: {
  dataPorto: MODEL_PORTOFOLIO;
}) {
  return (
    <>
      <Paper
        p={"sm"}
        style={{
          backgroundColor: AccentColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          borderRadius: "10px ",
          padding: "15px",
          color: "white",
        }}
      >
        <Title mb={"lg"} order={6}>Logo Bisnis</Title>

        <AspectRatio ratio={1 / 1}>
          <Paper>
            <Image
              alt="Foto"
              src={RouterPortofolio.api_logo_porto + `${dataPorto?.logoId}`}
            />
          </Paper>
        </AspectRatio>
      </Paper>
    </>
  );
}