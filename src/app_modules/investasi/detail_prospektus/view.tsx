"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { Center, Group, Paper, Text, Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import {
  MODEL_Investasi
} from "../model/model_investasi";

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
          href={
            RouterInvestasi.api_file_prospektus +
            `${prospek.ProspektusInvestasi.id}`
          }
          target="_blank"
          style={{ textDecorationLine: "none" }}
        >
          <Paper
            style={{
              padding:"15px",
              backgroundColor: AccentColor.darkblue,
              border: `2px solid ${AccentColor.blue}`,
              borderRadius: "10px",
              color: "white",
            }}
          >
            <Group position="apart">
              <Text w={"80%"} lineClamp={1}>Prospektus_{prospek.title}</Text>
              <Center>
                <IconChevronRight />
              </Center>
            </Group>
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
