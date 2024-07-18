"use client";

import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import {
  Stack
} from "@mantine/core";
import ComponentColab_DetailData from "../../component/detail/detail_data";
import ComponentColab_DetailListPartisipasiUser from "../../component/detail/list_partisipasi_user";
import ComponentColab_AuthorNameOnHeader from "../../component/header_author_name";
import { MODEL_COLLABORATION } from "../../model/interface";

export default function Colab_MainDetail({
  dataColab,
  userLoginId,
  listPartisipan,
  cekPartisipan,
}: {
  dataColab?: MODEL_COLLABORATION;
  userLoginId?: string;
  listPartisipan?: any[];
  cekPartisipan: boolean
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
        <ComponentColab_AuthorNameOnHeader
          tglPublish={new Date()}
          authorName={dataColab?.Author?.Profile?.name}
          imagesId={dataColab?.Author?.Profile?.imagesId}
          profileId={dataColab?.Author?.Profile?.id}
        />
        <ComponentColab_DetailData data={dataColab} />
        <ComponentColab_DetailListPartisipasiUser
          listPartisipan={listPartisipan}
          userLoginId={userLoginId}
          authorId={dataColab?.Author.id}
          colabId={dataColab?.id}
          cekPartisipan={cekPartisipan}
        />
      </Stack>
    </>
  );
}
