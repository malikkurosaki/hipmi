"use client";

import { Box, Button, Group, Paper, SimpleGrid, Text } from "@mantine/core";
import EchartDataStruktur from "./dashboard_echart/echart_data_struktur";
import Link from "next/link";
import EchartTetangKami from "./dashboard_echart/data_tetang_kami";
import EchartInformasi from "./dashboard_echart/echart_informasi";
import EchartDataAset from "./dashboard_echart/echart_data_aset";
import DataTentangKami from "./dashboard_echart/data_tetang_kami";
import { LuLayoutDashboard } from "react-icons/lu";

export function DashboardAdmin() {
  return (
    <>
      <Box>
        <Paper shadow="lg" radius="md" p="md">
          <Box>
            <Group>
              <LuLayoutDashboard size={25} color="#17594A" />
              <Text fw={"bold"} color="#17594A" fz={20}>
                DASHBOARD
              </Text>
            </Group>
          </Box>
        </Paper>
        <Box pt={30}>
          <SimpleGrid
            cols={3}
            spacing="lg"
            breakpoints={[
              { maxWidth: "48rem", cols: 2, spacing: "sm" },
              { maxWidth: "36rem", cols: 1, spacing: "sm" },
            ]}
          >
            <Box>
              <Paper shadow="xl" radius="md" p="md">
                <Box pl={5} pb={5}>
                  <Text fw={"bold"} color="#17594A">
                    DATA STRUKTUR
                  </Text>
                </Box>
                <EchartDataStruktur />
                <Box>
                  <Button
                    fullWidth
                    color="green.9"
                    bg="#17594A"
                    radius={"md"}
                    component="a"
                    href={"/dev/dashboard-admin/data-struktur"}
                  >
                    Lihat Data Struktur
                  </Button>
                </Box>
              </Paper>
            </Box>
            <Box>
              <Paper shadow="xl" radius="md" p="md">
                <Box pl={5} pb={5}>
                  <Text fw={"bold"} color="#17594A">
                    INFORMASI
                  </Text>
                </Box>
                <EchartInformasi />
                <Box>
                  <Button
                    fullWidth
                    color="green.9"
                    bg="#17594A"
                    radius={"md"}
                    component="a"
                    href={"/dev/dashboard-admin/informasi"}
                  >
                    Lihat Informasi
                  </Button>
                </Box>
              </Paper>
            </Box>
            <Box>
              <Paper shadow="xl" radius="md" p="md">
                <Box pl={5} pb={5}>
                  <Text fw={"bold"} color="#17594A">
                    DATA ASET
                  </Text>
                </Box>
                <EchartDataAset />
                <Box>
                  <Button
                    fullWidth
                    color="green.9"
                    bg="#17594A"
                    radius={"md"}
                    component="a"
                    href={"/dev/dashboard-admin/data-aset"}
                  >
                    Lihat Data Aset
                  </Button>
                </Box>
              </Paper>
            </Box>
          </SimpleGrid>
        </Box>
        <Box pt={30}>
          <SimpleGrid
            cols={1}
            spacing="lg"
            breakpoints={[
              { maxWidth: "48rem", cols: 2, spacing: "sm" },
              { maxWidth: "36rem", cols: 1, spacing: "sm" },
            ]}
          >
            <Box>
              <Paper shadow="xl" radius="md" p="md">
                <Box pl={5} pb={5}>
                  <Text fw={"bold"} color="#17594A">
                    TENTANG KAMI
                  </Text>
                </Box>
                <DataTentangKami />
              </Paper>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}
