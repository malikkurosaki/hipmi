"use client";

import {
  AspectRatio,
  Box,
  Divider,
  Grid,
  Group,
  Image,
  Pagination,
  Paper,
  Progress,
  ScrollArea,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import AdminDonasi_TombolKembali from "../component/tombol_kembali";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  IconClover,
  IconMessageChatbot,
  IconMoneybag,
} from "@tabler/icons-react";
import router from "next/router";
import moment from "moment";

export default function AdminDonasi_DetailPublish() {
  return (
    <>
      <Stack>
        <AdminDonasi_TombolKembali />
        <SimpleGrid
          cols={2}
          spacing="lg"
          breakpoints={[
            { maxWidth: "md", cols: 2, spacing: "md" },
            { maxWidth: "sm", cols: 1, spacing: "sm" },
            { maxWidth: "xs", cols: 1, spacing: "xs" },
          ]}
        >
          <TampilanDetailDonasi />
          <TampilanListDonatur />
        </SimpleGrid>
      </Stack>
    </>
  );
}

function TampilanDetailDonasi() {
  return (
    <>
      <Paper radius={"md"} bg={"blue.1"} p={"md"}>
        <Stack>
          <Stack>
            <AspectRatio ratio={16 / 9}>
              <Paper radius={"md"}>
                <Image alt="Foto" src={"/aset/no-img.png"} />
              </Paper>
            </AspectRatio>
            <Title order={4}>Judul Donasi</Title>
            <Stack spacing={0}>
              <Group position="apart">
                <Stack spacing={0}>
                  <Text fz={12}>Dana dibutuhkan</Text>
                  <Title order={4} c="blue">
                    Rp. 50.000.000
                  </Title>
                </Stack>
                <Text fz={"xs"}>
                  Sisa hari{" "}
                  <Text span inherit fw={"bold"}>
                    100
                  </Text>{" "}
                </Text>
              </Group>
            </Stack>
            <Progress size={"lg"} value={50} />
            {/* <Grid>
                <Grid.Col
                  span={"auto"}
                  //   onClick={() => router.push(RouterDonasi.donatur)}
                >
                  <Stack align="center" spacing={"xs"}>
                    <Group>
                      <IconClover color="skyblue" />
                      <Text>50</Text>
                    </Group>
                    <Text>Donatur</Text>
                  </Stack>
                </Grid.Col>
                <Divider orientation="vertical" />
                <Grid.Col
                  span={"auto"}
                  //   onClick={() => router.push(RouterDonasi.kabar)}
                >
                  <Stack spacing={"sm"} align="center">
                    <IconMessageChatbot color="skyblue" />
                    <Text>Kabar Terbaru</Text>
                  </Stack>
                </Grid.Col>
                <Divider orientation="vertical" />
                <Grid.Col
                  span={"auto"}
                  //   onClick={() => router.push(RouterDonasi.pencairan_dana)}
                >
                  <Stack spacing={"sm"} align="center">
                    <IconMoneybag color="skyblue" />
                    <Text>Pencairan Dana</Text>
                  </Stack>
                </Grid.Col>
              </Grid> */}
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}

function TampilanListDonatur() {
  const tableRows = Array(10)
    .fill(0)
    .map((e, i) => (
      <tr key={i}>
        <td>User {`${i + 1}`}</td>
        <td>
          Rp.{" "}
          {`${new Intl.NumberFormat("id-ID", {
            maximumFractionDigits: 10,
          }).format(i + 100000)}`}
        </td>
        <td> {`${moment(Date.now()).format("ll")}`}</td>
      </tr>
    ));

  return (
    <>
      <Paper radius={"md"} bg={"cyan.1"} p={"md"}>
        <Stack>
          <Title order={4}>List Donatur</Title>
          <ScrollArea h={300}>
            <Table>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Jumlah Donasi</th>
                  <th>Tanggal Donasi</th>
                </tr>
              </thead>
              <tbody>{tableRows}</tbody>
            </Table>
          </ScrollArea>
        </Stack>
      </Paper>
    </>
  );
}
