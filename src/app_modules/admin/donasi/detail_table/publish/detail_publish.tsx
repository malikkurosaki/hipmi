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
  Modal,
  Pagination,
  Paper,
  Progress,
  ScrollArea,
  SimpleGrid,
  Spoiler,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import ComponentAdminDonasi_TombolKembali from "../../component/tombol_kembali";
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
  MODEL_DONASI_PENCAIRAN_DANA,
} from "@/app_modules/donasi/model/interface";
import { useState } from "react";
import { RouterAdminDonasi } from "@/app/lib/router_hipmi/router_admin";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useDisclosure, useInterval, useShallowEffect } from "@mantine/hooks";
import { Donasi_getOneById } from "@/app_modules/donasi/fun/get/get_one_donasi_by_id";
import { AdminDonasi_getOneById } from "../../fun/get/get_one_by_id";

export default function AdminDonasi_DetailPublish({
  dataPublish,
  listDonatur,
  countDonatur,
  listPencairan,
}: {
  dataPublish: MODEL_DONASI;
  listDonatur: any[];
  countDonatur: number;
  listPencairan: MODEL_DONASI_PENCAIRAN_DANA[];
}) {
  const [donasi, setDonasi] = useState(dataPublish);
  const [donatur, setDoanutur] = useState(listDonatur);
  const interval = useInterval(() => reloadData(donasi.id), 5000);
  const [pencairan, setPencairan] = useState(listPencairan);

  useShallowEffect(() => {
    interval.start();
  }, []);

  async function reloadData(donasiId: string) {
    const data = await AdminDonasi_getOneById(donasiId);
    setDonasi(data as any);
    return data;
  }
  return (
    <>
      {/* <pre>{JSON.stringify(pencairan, null, 2)}</pre> */}
      <Stack>
        <ComponentAdminDonasi_TombolKembali />
        <TampilanDetailDonasi donasi={donasi} countDonatur={countDonatur} />
        <TampilanListDonatur donatur={donatur} donasi={donasi} />
        <TampilanListPencairan pencairan={pencairan} />
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
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  return (
    <>
      <Paper radius={"md"} p={"md"}>
        <Stack>
          <Grid>
            <Grid.Col md={6} lg={4}>
              <AspectRatio ratio={16 / 9}>
                <Paper radius={"md"} h={{ lg: 200, md: 200, sm: 200 }}>
                  <Image
                    alt="Foto"
                    src={RouterDonasi.api_gambar + `${donasi.imagesId}`}
                  />
                </Paper>
              </AspectRatio>
            </Grid.Col>
            <Grid.Col md={6} lg={4}>
              <Paper withBorder p={"sm"} mah={250} h={250}>
                <Stack spacing={5}>
                  <Title order={4}>{donasi.title}</Title>
                  <Group>
                    <Text fz={"xs"}>Penggalang Dana</Text>
                    <Title order={5} c="blue">
                      {donasi.Author.username}
                    </Title>
                  </Group>
                  <Group>
                    <Text fz={12}>Durasi</Text>
                    <Title order={5} c="blue">
                      {donasi.DonasiMaster_Durasi.name} hari
                    </Title>
                  </Group>

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
                  {/* <Button w={200} bg={"green.5"} color="green">Pencairan Dana</Button> */}
                </Stack>
              </Paper>
            </Grid.Col>

            <Grid.Col md={6} lg={4}>
              <Paper withBorder p={"sm"} mah={250} h={250}>
                <Stack spacing={"xl"}>
                  <Center>
                    <Title order={4}>Pencairan Dana</Title>
                  </Center>
                  <Grid>
                    <Grid.Col span={"auto"}>
                      <Stack spacing={0}>
                        <Text fz={"xs"}>Total Dana Dicairkan</Text>
                        <Title>
                          <TampilanRupiahDonasi
                            nominal={donasi.totalPencairan}
                            fontSize={14}
                          />
                        </Title>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={"auto"}>
                      <Stack spacing={0}>
                        <Text fz={"xs"}>Bank Tujuan</Text>
                        <Title order={6}>{donasi.namaBank}</Title>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                  <Grid>
                    <Grid.Col span={"auto"}>
                      <Stack spacing={0}>
                        <Text fz={"xs"}>Akumulasi Pencairan</Text>
                        <Title order={6}>
                          {donasi.akumulasiPencairan} Kali
                        </Title>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={"auto"}>
                      <Stack spacing={0}>
                        <Text fz={"xs"}>Nomor Rekening</Text>
                        <Title order={6}>{donasi.rekening}</Title>
                      </Stack>
                    </Grid.Col>
                  </Grid>

                  <Button
                    radius={"xl"}
                    onClick={() =>
                      router.push(
                        RouterAdminDonasi.pencairan_dana + `${donasi.id}`
                      )
                    }
                  >
                    Cairkan Dana
                  </Button>
                </Stack>
              </Paper>
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>
      <Modal opened={opened} onClose={close} centered>
        <PencairanDana />
      </Modal>
    </>
  );
}

function PencairanDana() {
  return (
    <>
      <Stack>
        <TextInput label="Masukan nominal" />
      </Stack>
    </>
  );
}

//######################## LIST DONATUR #####################//
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

//######################## LIST PENCAIRAN #####################//
function TampilanListPencairan({
  pencairan,
}: {
  pencairan: MODEL_DONASI_PENCAIRAN_DANA[];
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [gambarId, setGambarId] = useState("");

  const rowTable = pencairan.map((e) => (
    <tr key={e.id}>
      <td>
        <TampilanRupiahDonasi nominal={e.nominalCair} />
      </td>
      <td>{moment(e.createdAt).format("ll")}</td>
      <td>
        <Text>{e.title}</Text>
      </td>
      <td width={500}>
        <Box w={"100%"}>
          <Spoiler hideLabel="Sembunyikan" maxHeight={70} showLabel="Lihat">
            {e.deskripsi}
          </Spoiler>
        </Box>
      </td>
      <td>
        {
          <Box>
            <Center>
              <Button
                radius={"xl"}
                compact
                bg={"green"}
                color="green"
                onClick={() => {
                  open();
                  setGambarId(e.imagesId);
                }}
              >
                Detail
              </Button>
            </Center>
          </Box>
        }
      </td>
    </tr>
  ));

  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        <AspectRatio ratio={9 / 16}>
          <Image
            src={RouterDonasi.api_gambar_pencairan + `${gambarId}`}
            alt="Foto"
          />
        </AspectRatio>
      </Modal>

      <Stack p={"md"}>
        <Title order={3}>Rincian Pencairan Dana</Title>
        {/* <pre>{JSON.stringify(pencairan, null, 2)}</pre> */}
        {_.isEmpty(pencairan) ? (
          <Paper bg={"gray.1"} p={"xs"}>
            <Center>BELUM ADA PENCAIRAN DANA</Center>
          </Paper>
        ) : (
          <Paper withBorder p={"xs"}>
            <Table horizontalSpacing={"md"} verticalSpacing={"md"}>
              <thead>
                <tr>
                  <th>Nominal</th>
                  <th>Tanggal</th>
                  <th>Judul</th>
                  <th>
                    <Center>Deskripsi</Center>
                  </th>
                  <th>
                    <Center>Bukti Transfer</Center>
                  </th>
                </tr>
              </thead>
              <tbody>{rowTable}</tbody>
            </Table>
          </Paper>
        )}
      </Stack>
    </>
  );
}
