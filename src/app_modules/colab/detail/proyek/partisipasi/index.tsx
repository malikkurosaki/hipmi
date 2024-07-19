"use client";

import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import ComponentColab_DetailData from "@/app_modules/colab/component/detail/detail_data";
import ComponentColab_DetailListPartisipasiUser from "@/app_modules/colab/component/detail/list_partisipasi_user";
import ComponentColab_AuthorNameOnHeader from "@/app_modules/colab/component/header_author_name";
import { MODEL_COLLABORATION, MODEL_COLLABORATION_PARTISIPASI } from "@/app_modules/colab/model/interface";
import { Stack, Text } from "@mantine/core";

export default function Colab_DetailPartisipasiProyek({
  dataColab,
  listPartisipan,
}: {
  dataColab: MODEL_COLLABORATION;
  listPartisipan: MODEL_COLLABORATION_PARTISIPASI[]
}) {
  return (
    <>
      <Stack
        px={5}
        spacing={"xl"}
        style={{
          border: `2px solid ${AccentColor.blue}`,
          backgroundColor: AccentColor.darkblue,
          color: "white",
          borderRadius: "10px",
          marginBottom: "20px",
          padding: "15px",
        }}
      >
        {/* <pre>{JSON.stringify(dataColab, null,2)}</pre> */}
        <ComponentColab_AuthorNameOnHeader
          authorName={dataColab?.Author.Profile.name}
          profileId={dataColab?.Author.Profile.id}
          imagesId={dataColab?.Author.Profile.imagesId}
          tglPublish={dataColab?.createdAt}
        />
        <ComponentColab_DetailData data={dataColab} />
        <ComponentColab_DetailListPartisipasiUser
          listPartisipan={listPartisipan}
        />
      </Stack>
    </>
  );
}
