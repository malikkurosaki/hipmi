"use client";

import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { Stack } from "@mantine/core";
import ComponentColab_DetailData from "../../component/detail/detail_data";
import ComponentColab_DetailListPartisipasiUser from "../../component/detail/list_partisipasi_user";
import ComponentColab_AuthorNameOnHeader from "../../component/header_author_name";
import { MODEL_COLLABORATION } from "../../model/interface";
import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";

export default function Colab_MainDetail({
  dataColab,
  userLoginId,
  listPartisipan,
  cekPartisipan,
}: {
  dataColab?: MODEL_COLLABORATION;
  userLoginId?: string;
  listPartisipan?: any[];
  cekPartisipan: boolean;
}) {
  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack>
          <ComponentColab_AuthorNameOnHeader
            tglPublish={new Date()}
            profile={dataColab?.Author?.Profile as any}
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
      </ComponentGlobal_CardStyles>
    </>
  );
}
