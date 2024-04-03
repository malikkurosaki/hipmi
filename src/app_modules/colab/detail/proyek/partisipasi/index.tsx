"use client";

import ComponentColab_DetailData from "@/app_modules/colab/component/detail/detail_data";
import ComponentColab_DetailListPartisipasiUser from "@/app_modules/colab/component/detail/list_partisipasi_user";
import ComponentColab_AuthorNameOnHeader from "@/app_modules/colab/component/header_author_name";
import { Stack, Text } from "@mantine/core";

export default function Colab_DetailPartisipasiProyek() {
  return (
    <>
      <Stack px={5} spacing={"xl"}>
        <ComponentColab_AuthorNameOnHeader />
        <ComponentColab_DetailData />
        <ComponentColab_DetailListPartisipasiUser />
      </Stack>
    </>
  );
}
