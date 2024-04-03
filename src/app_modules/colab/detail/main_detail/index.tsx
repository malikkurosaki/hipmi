"use client";

import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/component_global/author_name_on_header";
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

export default function Colab_MainDetail() {
  return (
    <>
      <Stack px={5} spacing={"lg"}>
        <ComponentColab_AuthorNameOnHeader tglPublish={new Date}/>
        <ComponentColab_DetailData />
        <ComponentColab_ButtonPartisipasi />
        <ComponentColab_DetailListPartisipasiUser />
      </Stack>
    </>
  );
}
