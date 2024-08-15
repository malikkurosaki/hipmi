"use client";

import { MODEL_Investasi } from "@/app_modules/investasi/model/model_investasi";
import {
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title
} from "@mantine/core";
import ComponentAdminGlobal_BackButton from "../../component_global/back_button";
import { ComponentAdminInvestasi_DetailDataAuthor } from "../_component/detail_data_author";
import { ComponentAdminInvestasi_DetailData } from "../_component/detail_data_investasi";
import { ComponentAdminInvestasi_DetailGambar } from "../_component/detail_gambar_investasi";
import { ComponentAdminInvestasi_UIDetailFile } from "../_component/ui_detail_file";

export function AdminInvestasi_DetailReject({
  data,
}: {
  data: MODEL_Investasi;
}) {
  return (
    <>
      <Stack px={"lg"}>
        <ComponentAdminGlobal_BackButton />
        <SimpleGrid
          cols={3}
          spacing="lg"
          breakpoints={[
            { maxWidth: "62rem", cols: 3, spacing: "md" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          <Paper withBorder p={"lg"}>
            <Stack>
              <Title order={3} c={"red"}>
                #{" "}
                <Text span inherit c={"black"}>
                  Alasan penolakan
                </Text>
              </Title>
              <Text>{data.catatan}</Text>
            </Stack>
          </Paper>
        </SimpleGrid>

        <SimpleGrid
          cols={3}
          spacing="lg"
          breakpoints={[
            { maxWidth: "62rem", cols: 3, spacing: "md" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          {/* Data Author */}
          <ComponentAdminInvestasi_DetailDataAuthor data={data.author} />

          {/* Data Foto */}
          <ComponentAdminInvestasi_DetailGambar imagesId={data.imagesId} />

          {/* Data Detail */}
          <ComponentAdminInvestasi_DetailData data={data} />
        </SimpleGrid>

        <ComponentAdminInvestasi_UIDetailFile
          title={data.title}
          dataProspektus={data.ProspektusInvestasi}
          listDokumen={data.DokumenInvestasi}
        />
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </Stack>
    </>
  );
}
