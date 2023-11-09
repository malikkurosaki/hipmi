"use client";

import {
  Paper,
  Grid,
  Center,
  Title,
  Divider,
  Button,
  Text,
  Group,
  FileButton,
  FileInput,
  Image,
  AspectRatio,
  Flex,
  Stack,
  Box,
} from "@mantine/core";
import { IconChevronRight, IconFileTypePdf } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { MODEL_Investasi } from "../model/model_investasi";

export default function EditProspektusInvestasi({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_Investasi;
}) {
  const [prospek, setProspek] = useState<MODEL_Investasi>(dataInvestasi);

  return (
    <>
      {/* <pre>{JSON.stringify(prospek, null, 2)}</pre> */}

      <Stack>
        {prospek.ProspektusInvestasi != null ? (
          <Link
            href={`/file/${prospek.ProspektusInvestasi.url}`}
            target="_blank"
            style={{ textDecorationLine: "none" }}
          >
            <Paper w={"100%"} bg={"gray"} mb={"md"}>
              <Grid
                align="center"
                justify="center"
                h={50}
                px={"sm"}
                onClick={() => ""}
              >
                <Grid.Col span={10}>
                  <Group>
                    {/* <IconFileTypePdf /> */}
                    <Text lineClamp={1}>Prospektus_{prospek.title}</Text>
                  </Group>
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
            <Title order={4}>Tidak ada file</Title>
          </Center>
        )}
        <Divider my={"lg"} />
      </Stack>
    </>
  );
}
