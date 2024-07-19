import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { Card, Stack } from "@mantine/core";
import { MODEL_COLLABORATION } from "../../model/interface";
import ComponentColab_CardSectionData from "./card_section_data";
import ComponentColab_CardSectionHeaderAuthorName from "./card_section_header_author_name";
import ComponentColab_JumlahPartisipan from "./card_section_jumlah_partisipan";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ComponentColab_CardBeranda({
  data,
  userLoginId,
}: {
  data: MODEL_COLLABORATION;
  userLoginId: string;
}) {
  const router = useRouter();
  const [loadingCreate, setLoadingCreate] = useState(false);
  
  return (
    <>
      <Card
        style={{
          border: `2px solid ${AccentColor.blue}`,
          backgroundColor: AccentColor.darkblue,
          color: "white",
          borderRadius: "10px",
          marginBottom: "20px",
          padding: "15px",
        }}
      >
        <Stack>
          <ComponentColab_CardSectionHeaderAuthorName
            authorName={data?.Author?.Profile?.name}
            imagesId={data?.Author?.Profile?.imagesId}
            profileId={data?.Author?.Profile?.id}
            isAuthor={userLoginId === data.Author.id ? true : false}
            colabId={data.id}
          />
          <ComponentColab_CardSectionData
            colabId={data.id}
            path={RouterColab.main_detail}
            data={data}
          />
          <ComponentColab_JumlahPartisipan
            jumlah={data.ProjectCollaboration_Partisipasi}
          />
        </Stack>
      </Card>
    </>
  );
}
