"use client";

import { Paper, Grid, Center, Text, Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { MODEL_Investasi } from "../model/model_investasi";
import { useState } from "react";
import _ from "lodash";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";

export default function DetailDokumenInvestasi({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_Investasi;
}) {
  const [dokumen, setDokumen] = useState(dataInvestasi);
  return (
    <>
      {!_.isEmpty(dokumen.DokumenInvestasi) ? (
       dokumen.DokumenInvestasi.map((e) => (
        <Link 
        key={e.id}
        href={`/file/${e.url}`}
        target="_blank"
        style={{ textDecorationLine: "none" }}
      >
        <Paper w={"100%"} h={50} bg={"gray"} mb={"md"}>
          <Grid
            align="center"
            justify="center"
            h={50}
            px={"sm"}
            onClick={() => ""}
          >
            <Grid.Col span={10}>
              <Text>{e.title}</Text>
            </Grid.Col>
            <Grid.Col span={2}>
              <Center>
                <IconChevronRight />
              </Center>
            </Grid.Col>
          </Grid>
        </Paper>
      </Link>
       ))
      ) : (
       <ComponentGlobal_IsEmptyData/>
      )}
    </>
  );
}
