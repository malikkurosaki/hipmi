"use client";

import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Center,
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
import AdminDonasi_TombolKembali from "../../component/tombol_kembali";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  IconClover,
  IconMessageChatbot,
  IconMoneybag,
} from "@tabler/icons-react";
import router from "next/router";
import moment from "moment";
import {
  MODEL_DONASI,
  MODEL_DONASI_INVOICE,
} from "@/app_modules/donasi/model/interface";
import { useState } from "react";
import { RouterAdminDonasi } from "@/app/lib/router_hipmi/router_admin";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useInterval, useShallowEffect } from "@mantine/hooks";
import { Donasi_getOneById } from "@/app_modules/donasi/fun/get/get_one_donasi_by_id";

export default function AdminDonasi_DetailPublish({
  dataPublish,
  listDonatur,
  countDonatur,
}: {
  dataPublish: MODEL_DONASI;
  listDonatur: any[];
  countDonatur: number;
}) {
  const [donasi, setDonasi] = useState(dataPublish);
  const [donatur, setDoanutur] = useState(listDonatur);
  const interval = useInterval(() => reloadData(donasi.id), 5000);

  useShallowEffect(() => {
    interval.start();
  }, []);

  async function reloadData(donasiId: string) {
    const data = await Donasi_getOneById(donasiId);
   setDonasi(data as any)
    return data;
  }
  return (
    <>
      {/* <pre>{JSON.stringify(donatur.map((e) => e), null, 2)}</pre> */}
      <Stack>
        <AdminDonasi_TombolKembali />
        <TampilanDetailDonasi donasi={donasi} countDonatur={countDonatur} />
        <TampilanListDonatur donatur={donatur} donasi={donasi} />
      </Stack>
    </>
  );
}

function TampilanDetailDonasi({
  donasi,
  countDonatur,
}: {
  donasi: MODEL_DONASI;
  countDonatur: number;
}) {
  return (
    <>
      <Paper radius={"md"} p={"md"}>
        <Stack>
          <Grid>
            <Grid.Col span={6}>
              <AspectRatio ratio={16 / 9}>
                <Paper radius={"md"}>
                  <Image
                    alt="Foto"
                    src={RouterDonasi.api_gambar + `${donasi.imagesId}`}
                  />
                </Paper>
              </AspectRatio>
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack spacing={7}>
                <Title order={4}>{donasi.title}</Title>
                <Text fz={"xs"}>
                  Durasi: {donasi.DonasiMaster_Durasi.name} hari
                </Text>

                <Group>
                  <Text fz={12}>Dana dibutuhkan</Text>
                  <Title order={5} c="blue">
                    <TampilanRupiahDonasi nominal={+donasi.target} />
                  </Title>
                </Group>
                <Group>
                  <Text fz={12}>Kategori</Text>
                  <Title order={5} c="blue">
                    {donasi.DonasiMaster_Ketegori.name}
                  </Title>
                </Group>
                <Group>
                  <Text fz={12}>Total donatur</Text>
                  <Title order={5} c="blue">
                    {countDonatur}
                  </Title>
                </Group>
                <Group>
                  <Text fz={12}>Progres</Text>
                  <Title order={5} c="blue">
                    {donasi.progres} %
                  </Title>
                </Group>
                <Group>
                  <Text fz={12}>Dana terkumpul</Text>
                  <Title order={5} c="blue">
                    <TampilanRupiahDonasi nominal={+donasi.terkumpul} />
                  </Title>
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>
    </>
  );
}

function TampilanListDonatur({
  donatur,
  donasi,
}: {
  donatur: MODEL_DONASI_INVOICE[];
  donasi: MODEL_DONASI;
}) {
  const router = useRouter();
  const tableRows = donatur.map((e, i) => (
    <tr key={i}>
      <td>{e.Author.username}</td>
      <td>
        <TampilanRupiahDonasi nominal={+e.nominal} />
      </td>
      <td> {`${moment(e.createdAt).format("ll")}`}</td>
      <td>
        <Center>
          <Badge w={150} variant="dot">
            {e.DonasiMaster_StatusInvoice.name}
          </Badge>
        </Center>
      </td>
    </tr>
  ));

  return (
    <>
      <Paper radius={"md"} p={"md"}>
        <Stack>
          <Group position="apart">
            <Title order={3}>Update List Donatur</Title>
            <Button
              radius={"xl"}
              variant="outline"
              onClick={() =>
                router.push(RouterAdminDonasi.proses_transaksi + `${donasi.id}`)
              }
            >
              Proses transaksi
            </Button>
          </Group>

          {_.isEmpty(donatur) ? (
            <Paper bg={"gray.1"} p={"xs"}>
              <Center>BELUM ADA DONATUR</Center>
            </Paper>
          ) : (
            <Paper withBorder p={"xs"}>
              <Table>
                <thead>
                  <tr>
                    <th>Nama Donatur</th>
                    <th>Jumlah Donasi</th>
                    <th>Tanggal</th>
                    <th>
                      <Center>Status</Center>
                    </th>
                    {/* <th>
                      <Center>Aksi</Center>
                    </th> */}
                  </tr>
                </thead>
                <tbody>{tableRows}</tbody>
              </Table>
            </Paper>
          )}

          {/* <Group position="apart">
            {[{ id: 1 }, { id: 2 },{ id: 3 }, { id: 4 }].map((e, i) => (
              <Button key={i}>Status</Button>
            ))}
          </Group> */}
        </Stack>
      </Paper>
    </>
  );
}
