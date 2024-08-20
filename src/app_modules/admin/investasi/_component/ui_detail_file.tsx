import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";
import {
  SimpleGrid,
  Paper,
  Stack,
  Title,
  Grid,
  Group,
  Button,
  Text,
} from "@mantine/core";
import { IconFileTypePdf } from "@tabler/icons-react";
import _ from "lodash";
import Link from "next/link";

export function ComponentAdminInvestasi_UIDetailFile({
  title,
  dataProspektus,
  listDokumen,
}: {
  title: string;
  dataProspektus: any;
  listDokumen: any[];
}) {
  return (
    <>
      <SimpleGrid
        cols={1}
        spacing="lg"
        breakpoints={[
          { maxWidth: "62rem", cols: 1, spacing: "md" },
          { maxWidth: "48rem", cols: 1, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        <Paper withBorder p={"lg"}>
          <Stack>
            <Title order={3}>File & Dokumen</Title>

            <Stack spacing={50}>
              {/* File */}
              <Grid align="center">
                <Grid.Col span={4}>
                  <Text fw={"bold"}>File:</Text>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Group>
                    <IconFileTypePdf />
                    <Text>Prospek {title}</Text>
                    <Link
                      target="_blank"
                      href={
                        RouterInvestasi_OLD.api_file_prospektus +
                        `${dataProspektus === null ? "" : dataProspektus.id}`
                      }
                    >
                      <Button radius={50}>Lihat</Button>
                    </Link>
                  </Group>
                </Grid.Col>
              </Grid>

              {/* Dokumen */}
              <Grid>
                <Grid.Col span={4}>
                  <Text fw={"bold"}>Dokumen:</Text>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Stack>
                    {_.isEmpty(listDokumen) ? (
                      <Text>-</Text>
                    ) : (
                      listDokumen.map((e: any) => (
                        <Paper key={e.id}>
                          <Group>
                            <IconFileTypePdf />
                            <Text>{e.title}</Text>
                            <Link
                              target="_blank"
                              href={
                                RouterInvestasi_OLD.api_file_dokumen + `${e.id}`
                              }
                            >
                              <Button radius={50}>Lihat</Button>
                            </Link>
                          </Group>
                        </Paper>
                      ))
                    )}
                  </Stack>
                </Grid.Col>
              </Grid>
            </Stack>
          </Stack>
        </Paper>
      </SimpleGrid>
    </>
  );
}
