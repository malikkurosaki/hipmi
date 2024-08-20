"use client";

import { RouterAdminInvestasi } from "@/app/lib/router_admin/router_admin_investasi";
import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";
import { BeritaInvestasi } from "@/app_modules/investasi";
import { MODEL_INVESTASI } from "@/app_modules/investasi/_lib/interface"; 
import mqtt_client from "@/util/mqtt_client";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Divider,
  Grid,
  Group,
  Image,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import {
  IconAlertHexagonFilled,
  IconCheck,
  IconFileTypePdf,
} from "@tabler/icons-react";
import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "react-simple-toasts/dist/theme/dark.css";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "../../_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "../../_admin_global/admin_notifikasi/notifikasi_gagal";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "../../_admin_global/admin_notifikasi/notifikasi_peringatan";
import ComponentAdminGlobal_BackButton from "../../_admin_global/back_button";
import adminNotifikasi_funCreateToUser from "../../notifikasi/fun/create/fun_create_notif_user";
import { ComponentAdminInvestasi_DetailDataAuthor } from "../_component/detail_data_author";
import { ComponentAdminInvestasi_DetailData } from "../_component/detail_data_investasi";
import { ComponentAdminInvestasi_DetailGambar } from "../_component/detail_gambar_investasi";
import { ComponentAdminInvestasi_UIDetailFile } from "../_component/ui_detail_file";
import { adminInvestasi_funEditStatusPublishById } from "../fun/edit/fun_status_publish_by_id";
import Admin_funRejectInvestasi from "../fun/fun_reject_investasi";
import getOneInvestasiById from "@/app_modules/investasi/fun/get_one_investasi_by_id";

export default function AdminInvestasi_DetailReview({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_INVESTASI;
}) {
  const router = useRouter();
  const [data, setData] = useState(dataInvestasi);
  const [publish, setPublish] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [isLoadingPublish, setIsLoadingPublish] = useState(false);
  const [isLoadingReject, setIsLoadingReject] = useState(false);

  useShallowEffect(() => {
    cekStatusPublish();
  }, []);

  async function cekStatusPublish() {
    if (data.MasterStatusInvestasi.id === "3") setPublish(false);
  }

  async function onReject() {
    const body = {
      id: data.id,
      catatan: data.catatan,
      status: "4",
    };
    if (_.isEmpty(body.catatan))
      return ComponentAdminGlobal_NotifikasiPeringatan("Lengkapi alasan");
    const res = await Admin_funRejectInvestasi(body);
    if (res.status === 200) {
      const dataNotif = {
        appId: res.data?.id,
        userId: res.data?.authorId,
        pesan: res.data?.title,
        status: res.data?.MasterStatusInvestasi?.name,
        kategoriApp: "INVESTASI",
        title: "Investasi anda di tolak !",
      };

      const notif = await adminNotifikasi_funCreateToUser({
        data: dataNotif as any,
      });

      if (notif.status === 201) {
        mqtt_client.publish(
          "USER",
          JSON.stringify({ userId: res?.data?.authorId, count: 1 })
        );
      }

      const loadData = await getOneInvestasiById(data.id);
      setData(loadData as any);

      ComponentAdminGlobal_NotifikasiBerhasil(res.message);
      router.back();
    } else {
      ComponentAdminGlobal_NotifikasiGagal(res.message);
    }
  }

  async function onPublish() {
    const res = await adminInvestasi_funEditStatusPublishById({
      investasiId: data.id,
      statusId: "1",
      progesInvestasiId: "1",
    });
    if (res.status === 200) {
      const dataNotif = {
        appId: res.data?.id,
        userId: res.data?.authorId as any,
        pesan: res.data?.title as any,
        status: res.data?.MasterStatusInvestasi?.name as any,
        kategoriApp: "INVESTASI",
        title: "Investasi publish",
      };

      const notif = await adminNotifikasi_funCreateToUser({
        data: dataNotif as any,
      });

      if (notif.status === 201) {
        mqtt_client.publish(
          "USER",
          JSON.stringify({ userId: res?.data?.authorId, count: 1 })
        );

        mqtt_client.publish(
          "Beranda_Investasi",
          JSON.stringify({ update: true })
        );

        const loadData = await getOneInvestasiById(data.id);
        setData(loadData as any);

        ComponentAdminGlobal_NotifikasiBerhasil("Proyek Investasi Di Publish");
        router.back();
        // router.push(RouterAdminInvestasi_OLD.table_status_review);
      }
    } else {
      ComponentAdminGlobal_NotifikasiGagal(res.message);
    }
  }

  return (
    <>
      <Stack px={"lg"}>
        <Group position="apart">
          <ComponentAdminGlobal_BackButton />

          {data.masterStatusInvestasiId === "2" ? (
            <Group>
              <Button
                loaderPosition="center"
                loading={isLoadingPublish}
                radius={"xl"}
                color="green"
                onClick={() => onPublish()}
              >
                Publish
              </Button>
              <Button
                loaderPosition="center"
                loading={isLoadingReject}
                radius={"xl"}
                color="red"
                onClick={() => onReject()}
              >
                Reject
              </Button>
            </Group>
          ) : (
            ""
          )}
        </Group>
        <SimpleGrid
          cols={3}
          spacing="lg"
          breakpoints={[
            { maxWidth: "62rem", cols: 3, spacing: "md" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          {/* Data Author */}
          <ComponentAdminInvestasi_DetailDataAuthor data={data.author} />

          {/* Data Foto */}
          <ComponentAdminInvestasi_DetailGambar imagesId={data.imagesId} />

          {/* Data Detail */}
          <ComponentAdminInvestasi_DetailData data={data} />
        </SimpleGrid>

        <ComponentAdminInvestasi_UIDetailFile
          title={data.title}
          dataProspektus={data.ProspektusInvestasi}
          listDokumen={data.DokumenInvestasi}
        />
      </Stack>
    </>
  );

  return (
    <>
      <Group position="apart" px={"md"}>
        <ComponentAdminGlobal_BackButton
          path={RouterAdminInvestasi.table_review}
        />
        <Group>
          <Center>
            {!publish || data.MasterStatusInvestasi.id === "4" ? (
              ""
            ) : (
              <Button
                radius={50}
                bg={"green"}
                color="green"
                leftIcon={<IconCheck />}
                onClick={() => {
                  onPublish();
                }}
              >
                Publish
              </Button>
            )}
          </Center>
          {data.MasterStatusInvestasi.id === "3" ? (
            ""
          ) : (
            <Button
              radius={50}
              bg={"red"}
              color="red"
              onClick={() => setOpenModal(true)}
              rightIcon={<IconAlertHexagonFilled />}
            >
              Reject
            </Button>
          )}
        </Group>
      </Group>

      <Divider my={"md"} />

      <Stack spacing={"lg"}>
        <Grid>
          <Grid.Col span={6}>
            {/* Title  */}
            <Center my={"sm"}>
              <Title order={4} mb={"xs"}>
                {data.title}
              </Title>
            </Center>
            <Paper withBorder mb={"md"} mah={300} maw={400} mx={"auto"} p={5}>
              <AspectRatio ratio={16 / 9}>
                <Image
                  alt=""
                  src={RouterInvestasi_OLD.api_gambar + `${data.imagesId}`}
                />
              </AspectRatio>
            </Paper>
          </Grid.Col>

          {/* Rincian Data */}
          <Grid.Col span={6}>
            <Grid mt={"md"}>
              <Grid.Col span={6}>
                <Stack>
                  <Box>
                    <Text>Dana Dibutuhkan</Text>
                    <Text>
                      Rp.{" "}
                      {new Intl.NumberFormat("id-ID", {
                        maximumFractionDigits: 10,
                      }).format(+data.targetDana)}
                    </Text>
                  </Box>
                  <Box>
                    <Text>Harga Per Lembar</Text>
                    <Text>
                      Rp.{" "}
                      {new Intl.NumberFormat("id-ID", {
                        maximumFractionDigits: 10,
                      }).format(+data.hargaLembar)}{" "}
                    </Text>
                  </Box>
                  <Box>
                    <Text>Jadwal Pembagian</Text>
                    <Text>{data.MasterPembagianDeviden.name} bulan </Text>
                  </Box>
                  <Box>
                    <Text>Pencarian Investor</Text>
                    <Text>{data.MasterPencarianInvestor.name} hari </Text>
                  </Box>
                </Stack>
              </Grid.Col>
              <Grid.Col span={6}>
                <Stack>
                  <Box>
                    <Text>ROI</Text>
                    <Text>{data.roi} %</Text>
                  </Box>
                  <Box>
                    <Text>Total Lembar</Text>
                    <Text>
                      {" "}
                      {new Intl.NumberFormat("id-ID", {
                        maximumFractionDigits: 10,
                      }).format(+data.totalLembar)}{" "}
                      lembar
                    </Text>
                  </Box>
                  <Box>
                    <Text>Pembagian Deviden</Text>
                    <Text>{data.MasterPeriodeDeviden.name}</Text>
                  </Box>
                </Stack>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={6}>
            {/* Note */}
            {!publish || data.MasterStatusInvestasi.id === "4" ? (
              ""
            ) : (
              <Stack spacing={0}>
                <Text fw={"bold"}>Note :</Text>
                <Text fw={"lighter"} fs={"italic"}>
                  Cek kembali kelengkapan file prospektus & semua dokumen
                  terkait investasi sebelum mem-publish. Jika kelengkapan file
                  kurang lengkap maka reject dan berikan pesan terkait
                  kekurangnya.
                </Text>
              </Stack>
            )}
            {publish &&
            data.MasterStatusInvestasi.id === "3" &&
            _.isEmpty(data.BeritaInvestasi) ? (
              <BeritaInvestasi dataInvestasi={data} />
            ) : (
              ""
            )}
          </Grid.Col>
          {/* Note dan dokumen */}
          <Grid.Col span={6}>
            <Stack>
              {/* File file */}
              <Stack>
                {/* Prospektus */}
                <Stack spacing={0}>
                  <Title order={6}>Prospektus :</Title>
                  {data.ProspektusInvestasi === null ? (
                    <Text>Tidak ada file</Text>
                  ) : (
                    <Paper p={"xs"}>
                      <Group>
                        <IconFileTypePdf />
                        <Text>Prospektus_{data.title}</Text>
                        <Link
                          target="_blank"
                          href={
                            RouterInvestasi_OLD.api_file_prospektus +
                            `${
                              data.ProspektusInvestasi === null
                                ? ""
                                : data.ProspektusInvestasi.id
                            }`
                          }
                        >
                          <Button compact radius={50}>
                            Buka
                          </Button>
                        </Link>
                      </Group>
                    </Paper>
                  )}
                </Stack>

                {/* Dokumen */}
                <Stack spacing={0}>
                  <Title order={6}>Dokumen :</Title>
                  {_.isEmpty(data.DokumenInvestasi) ? (
                    <Text>Tidak ada dokumen</Text>
                  ) : (
                    data.DokumenInvestasi.map((e) => (
                      <Paper p={"xs"} key={e.id}>
                        <Group>
                          <IconFileTypePdf />
                          <Text>{e.title}</Text>
                          <Link
                            target="_blank"
                            href={
                              RouterInvestasi_OLD.api_file_dokumen + `${e.id}`
                            }
                          >
                            <Button compact radius={50}>
                              Buka
                            </Button>
                          </Link>
                        </Group>
                      </Paper>
                    ))
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>

        <Modal
          centered
          opened={openModal}
          onClose={() => setOpenModal(false)}
          // withCloseButton={false}
          title="Masukan alasan penolakan"
        >
          <Textarea
            mb={"md"}
            autosize
            minRows={2}
            maxRows={4}
            value={data.catatan === null ? [] : data.catatan}
            onChange={(val) =>
              setData({
                ...data,
                catatan: val.target.value,
              })
            }
          />
          <Group position="right">
            <Button radius={50} compact onClick={() => onReject()}>
              Simpan
            </Button>
          </Group>
        </Modal>
      </Stack>
      {/* <pre>{JSON.stringify(investasi, null, 2)}</pre> */}
    </>
  );
}
