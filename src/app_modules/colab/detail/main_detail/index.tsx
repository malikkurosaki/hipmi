"use client";

import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/_global/author_name_on_header";
import {
  Box,
  Button,
  Center,
  Grid,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import ComponentColab_AuthorNameOnHeader from "../../component/header_author_name";
import { useState } from "react";
import ComponentColab_ButtonPartisipasi from "../../component/detail/button_partisipasi";
import ComponentColab_DetailListPartisipasiUser from "../../component/detail/list_partisipasi_user";
import ComponentColab_DetailData from "../../component/detail/detail_data";
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
      <Stack px={5} spacing={"xl"}>
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
