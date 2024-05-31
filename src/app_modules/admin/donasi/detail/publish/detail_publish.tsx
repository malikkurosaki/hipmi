"use client";

import {
  ActionIcon,
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
  Select,
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
  IconReload,
} from "@tabler/icons-react";
import router from "next/router";
import moment from "moment";
import {
  MODEL_DONASI,
  MODEL_DONASI_INVOICE,
  MODEL_DONASI_PENCAIRAN_DANA,
} from "@/app_modules/donasi/model/interface";
import { useState } from "react";
import { RouterAdminDonasi_OLD } from "@/app/lib/router_hipmi/router_admin";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useDisclosure, useInterval, useShallowEffect } from "@mantine/hooks";
import { Donasi_getOneById } from "@/app_modules/donasi/fun/get/get_one_donasi_by_id";
import { AdminDonasi_getOneById } from "../../fun/get/get_one_by_id";
import ComponentGlobalAdmin_BackButton from "@/app_modules/admin/component/back_button";
import { MODEL_NEW_DEFAULT_MASTER } from "@/app_modules/model_global/interface";
import { adminDonasi_getListDonatur } from "../../fun/get/get_list_donatur_by_id";
import { RouterAdminDonasi } from "@/app/lib/router_admin/router_admin_donasi";
import adminDonasi_funUpdateStatusDanTotal from "../../fun/update/fun_update_status_dan_total";
import { ComponentGlobalAdmin_NotifikasiBerhasil } from "@/app_modules/admin/component/admin_notifikasi/notifikasi_berhasil";
import { ComponentGlobalAdmin_NotifikasiGagal } from "@/app_modules/admin/component/admin_notifikasi/notifikasi_gagal";

export default function AdminDonasi_DetailPublish({
  dataPublish,
  listDonatur,
  countDonatur,
  listPencairan,
  listMasterStatus,
}: {
  dataPublish: MODEL_DONASI;
  listDonatur: any[];
  countDonatur: number;
  listPencairan: MODEL_DONASI_PENCAIRAN_DANA[];
  listMasterStatus: MODEL_NEW_DEFAULT_MASTER[];
}) {
  const [dataDonasi, setDataDonasi] = useState(dataPublish);
  const [pencairan, setPencairan] = useState(listPencairan);
  const selectedData = _.omit(dataDonasi, [
    "Author",
    "imageDonasi",
    "CeritaDonasi",
    "DonasiMaster_Ketegori",
    "DonasiMaster_Durasi",
    "DonasiMaster_Status",
  ]);

  // fungsi manggil serveraction

  return (
    <>
      {/* <pre>{JSON.stringify(pencairan, null, 2)}</pre> */}
      <Stack>
        <ComponentGlobalAdmin_BackButton />
        <TampilanDetailDonasi donasi={dataDonasi} countDonatur={countDonatur} />
        <TampilanListDonatur
          donatur={listDonatur}
          listMasterStatus={listMasterStatus}
          dataDonasi={selectedData as any}
          onSuccessDonasi={(val) => {
            setDataDonasi(val);
          }}
        />
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
          <SimpleGrid
            cols={3}
            spacing="lg"
            breakpoints={[
              { maxWidth: "62rem", cols: 3, spacing: "md" },
              { maxWidth: "48rem", cols: 2, spacing: "sm" },
              { maxWidth: "36rem", cols: 1, spacing: "sm" },
            ]}
          >
            <Paper withBorder>
              <AspectRatio ratio={1 / 1}>
                <Image
                  // mah={500}
                  // mx={"auto"}
                  alt="Foto"
                  src={RouterDonasi.api_gambar + `${donasi.imagesId}`}
                />
              </AspectRatio>
            </Paper>

            <Paper withBorder p={"sm"}>
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

            <Paper withBorder p={"sm"}>
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
                      <Title order={6}>{donasi.akumulasiPencairan} Kali</Title>
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
                      RouterAdminDonasi_OLD.pencairan_dana + `${donasi.id}`
                    )
                  }
                >
                  Cairkan Dana
                </Button>
              </Stack>
            </Paper>
          </SimpleGrid>
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
  listMasterStatus,
  dataDonasi,
  onSuccessDonasi,
}: {
  donatur: any;
  listMasterStatus: MODEL_NEW_DEFAULT_MASTER[];
  dataDonasi: MODEL_DONASI;

  onSuccessDonasi: (val: any) => void;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [idData, setIdData] = useState("");
  const [lisDonatur, setListDonatur] = useState<MODEL_DONASI_INVOICE[]>(
    donatur.data
  );
  const [isNPage, setNPage] = useState(donatur.nPage);
  const [isActivePage, setActivePage] = useState(1);
  const [isSelect, setSelect] = useState("");

  async function onRelaod() {
    const loadData = await adminDonasi_getListDonatur({
      donasiId: dataDonasi?.id,
      page: 1,
    });
    setSelect("");
    setListDonatur(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onSelect(s: any) {
    setSelect(s);
    const loadData = await adminDonasi_getListDonatur({
      donasiId: dataDonasi?.id,
      page: 1,
      selectStatusId: s,
    });
    setListDonatur(loadData.data as any);
    setNPage(loadData.nPage);
    setActivePage(1);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminDonasi_getListDonatur({
      donasiId: dataDonasi?.id,
      page: p,
      selectStatusId: isSelect,
    });
    setListDonatur(loadData.data as any);
    setNPage(loadData.nPage);
  }

  const tableRows = lisDonatur.map((e, i) => (
    <tr key={i}>
      <td>
        <Center>{e?.Author.username}</Center>
      </td>
      <td>
        <Center>{e?.DonasiMaster_Bank?.name}</Center>
      </td>
      <td>
        <Center>
          <TampilanRupiahDonasi nominal={+e?.nominal} />
        </Center>
      </td>
      <td>
        <Center>
          {new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(
            e?.createdAt
          )}
        </Center>
      </td>
      <td>
        <Center>
          <Badge w={150} variant="dot">
            {e?.DonasiMaster_StatusInvoice?.name}
          </Badge>
        </Center>
      </td>
      <td>
        <Center>
          {e?.donasiMaster_StatusInvoiceId === "1" ||
          e?.donasiMaster_StatusInvoiceId === "2" ? (
            <Button
              radius={"xl"}
              onClick={() =>
                router.push(
                  RouterAdminDonasi.transfer_invoice + `${e?.imagesId}`
                )
              }
            >
              Cek
            </Button>
          ) : (
            "-"
          )}
        </Center>
      </td>
      <td>
        <Center>
          {e?.donasiMaster_StatusInvoiceId === "1" ? (
            <Button radius={"xl"} disabled>
              Selesai
            </Button>
          ) : e?.DonasiMaster_StatusInvoice?.id === "2" ? (
            <ButtonAccept
              invoiceId={e?.id}
              donasiId={dataDonasi?.id}
              nominal={+e?.nominal}
              danaTerkumpul={+dataDonasi?.terkumpul}
              target={+dataDonasi?.target}
              onSuccessDonasi={(val) => {
                onSuccessDonasi(val);
              }}
              onSuccessDonatur={(val) => {
                setListDonatur(val.data);
                setNPage(val.nPage);
              }}
            />
          ) : (
            <Text>-</Text>
          )}
        </Center>
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        {/* <pre>{JSON.stringify(dataDonasi, null, 2)}</pre> */}
        <Group
          position="apart"
          bg={"gray.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Daftar Donatur</Title>
          <Group>
            <ActionIcon
              size={"lg"}
              radius={"xl"}
              variant="light"
              onClick={() => {
                onRelaod();
              }}
            >
              <IconReload />
            </ActionIcon>
            <Select
              placeholder="Pilih status"
              value={isSelect}
              data={listMasterStatus.map((e) => ({
                value: e.id,
                label: e.name,
              }))}
              onChange={(val) => {
                onSelect(val);
              }}
            />
          </Group>
        </Group>

        <Paper p={"md"} withBorder shadow="lg" h={"80vh"}>
          <ScrollArea w={"100%"} h={"90%"}>
            <Table
              verticalSpacing={"xl"}
              horizontalSpacing={"md"}
              p={"md"}
              w={1500}
              striped
              highlightOnHover
            >
              <thead>
                <tr>
                  <th>
                    <Center>Nama Donatur</Center>
                  </th>
                  <th>
                    <Center>Nama Bank</Center>
                  </th>
                  <th>
                    <Center>Jumlah Donasi</Center>
                  </th>
                  <th>
                    <Center>Tanggal</Center>
                  </th>
                  <th>
                    <Center>Status</Center>
                  </th>
                  <th>
                    <Center>Bukti Transfer</Center>
                  </th>
                  <th>
                    <Center>Aksi</Center>
                  </th>
                </tr>
              </thead>
              <tbody>{tableRows}</tbody>
            </Table>
          </ScrollArea>

          <Center mt={"xl"}>
            <Pagination
              value={isActivePage}
              total={isNPage}
              onChange={(val) => {
                onPageClick(val);
              }}
            />
          </Center>
        </Paper>
      </Stack>
    </>
  );
}

function ButtonAccept({
  invoiceId,
  donasiId,
  nominal,
  danaTerkumpul,
  target,
  onSuccessDonasi,
  onSuccessDonatur,
}: {
  invoiceId: string;
  donasiId: string;
  nominal: number;
  danaTerkumpul: number;
  target: number;
  onSuccessDonasi: (val: any) => void;
  onSuccessDonatur: (val: any) => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  async function onAccept() {
    let nominalDonasi = nominal;
    let jumlahTerkumpul = danaTerkumpul;

    const updateStatus = await adminDonasi_funUpdateStatusDanTotal({
      invoiceId: invoiceId,
      donasiId: donasiId,
      jumlahTerkumpul: jumlahTerkumpul,
      nominal: nominalDonasi,
      statusInvoiceId: "1",
      target: target,
    });
    if (updateStatus.status == 200) {
      const updateData = await AdminDonasi_getOneById(donasiId);
      onSuccessDonasi(updateData as any);
      const updatelistDonatur = await adminDonasi_getListDonatur({
        donasiId: donasiId,
        page: 1,
      });
      onSuccessDonatur(updatelistDonatur);

      ComponentGlobalAdmin_NotifikasiBerhasil(updateStatus.message);
    } else {
      ComponentGlobalAdmin_NotifikasiGagal(updateStatus.message);
    }

    close();
  }

  return (
    <>
      <Button
        color="green"
        radius={"xl"}
        onClick={() => {
          open();
        }}
      >
        Terima
      </Button>

      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Paper>
          <Stack align="center">
            <Title
              order={6}
            >{`${"Anda yakin sudah melihat bukti transfer ?"}`}</Title>
            <Group position="center">
              <Button radius={"xl"} onClick={() => close()}>
                Batal
              </Button>
              <Button
                radius={"xl"}
                onClick={() => {
                  onAccept();
                }}
              >
                Terima
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Modal>
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
