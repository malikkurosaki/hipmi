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
import { MODEL_INVESTASI } from "../_lib/interface";
import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";

export default function EditProspektusInvestasi({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_INVESTASI;
}) {
  const [prospek, setProspek] = useState<MODEL_INVESTASI>(dataInvestasi);

  return (
    <>
      {/* <pre>{JSON.stringify(prospek, null, 2)}</pre> */}

      <Stack>
        {prospek.ProspektusInvestasi != null ? (
          <Link
            href={RouterInvestasi_OLD.api_file_prospektus + `${prospek.ProspektusInvestasi.id}`}
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
                <Grid.Col span={11}>
                  <Group>
                    {/* <IconFileTypePdf /> */}
                    <Text lineClamp={1}>Prospektus_{prospek.title}</Text>
                  </Group>
                </Grid.Col>
                <Grid.Col span={1}>
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
        {/* <Divider my={"lg"} /> */}
      </Stack>
    </>
  );
}
