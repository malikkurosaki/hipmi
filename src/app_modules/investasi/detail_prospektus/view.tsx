"use client";

import { Paper, Grid, Center, Text, Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import {
  MODEL_Investasi,
  Model_Prospektus_Investasi,
} from "../model/model_investasi";
import { useState } from "react";

export default function DetailPropektus({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_Investasi;
}) {
  const [prospek, setProspek] = useState(dataInvestasi);


  return (
    <>
      {prospek.ProspektusInvestasi !== null ? (
        <Link
          href={`/file/${prospek.ProspektusInvestasi.url}`}
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
                <Text>Prospektus_{prospek.title}</Text>
              </Grid.Col>
              <Grid.Col span={2}>
                <Center>
                  <IconChevronRight />
                </Center>
              </Grid.Col>
            </Grid>
          </Paper>
        </Link>
      ) : (
        <Center>
          <Title order={6}>Tidak Ada File</Title>
        </Center>
      )}
    </>
  );
}
