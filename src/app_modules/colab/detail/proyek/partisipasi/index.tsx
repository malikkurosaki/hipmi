"use client";

import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import ComponentColab_DetailData from "@/app_modules/colab/component/detail/detail_data";
import ComponentColab_DetailListPartisipasiUser from "@/app_modules/colab/component/detail/list_partisipasi_user";
import ComponentColab_AuthorNameOnHeader from "@/app_modules/colab/component/header_author_name";
import {
  MODEL_COLLABORATION,
  MODEL_COLLABORATION_PARTISIPASI,
} from "@/app_modules/colab/model/interface";
import { Stack, Text } from "@mantine/core";

export default function Colab_DetailPartisipasiProyek({
  dataColab,
  listPartisipan,
}: {
  dataColab: MODEL_COLLABORATION;
  listPartisipan: MODEL_COLLABORATION_PARTISIPASI[];
}) {
  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack>
          <ComponentColab_AuthorNameOnHeader
            profile={dataColab.Author.Profile}
          />
          <ComponentColab_DetailData data={dataColab} />
          <ComponentColab_DetailListPartisipasiUser
            listPartisipan={listPartisipan}
          />
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
