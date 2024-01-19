"use client";

import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { Warna } from "@/app/lib/warna";
import funEditInvestasi from "@/app_modules/investasi/fun/fun_edit_investasi";
import funGantiStatusInvestasi from "@/app_modules/investasi/fun/fun_ganti_status";
import { gs_StatusPortoInvestasi } from "@/app_modules/investasi/g_state";
import { MODEL_Investasi } from "@/app_modules/investasi/model/model_investasi";
import { MODEL_PROFILE_OLD } from "@/app_modules/home/model/user_profile";
import {
  Group,
  Flex,
  Avatar,
  Paper,
  AspectRatio,
  Box,
  Title,
  Slider,
  Grid,
  Stack,
  ActionIcon,
  Center,
  Button,
  Text,
  Image,
  Collapse,
  Textarea,
  Divider,
  Mark,
  Modal,
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import {
  IconAlertHexagonFilled,
  IconBan,
  IconBookDownload,
  IconCheck,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconFile,
  IconFileDescription,
  IconFileTypePdf,
  IconPdf,
  IconSpeakerphone,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { toastConfig } from "react-simple-toasts";
import Admin_funRejectInvestasi from "../fun/fun_reject_investasi";
import { RouterAdminInvestasi } from "@/app/lib/router_hipmi/router_admin";
import "react-simple-toasts/dist/theme/dark.css";
import { BeritaInvestasi } from "@/app_modules/investasi";

toastConfig({ theme: "dark" });

export default function Admin_KonfirmasiInvestasi({
  dataInvestasi,
  dataUser,
}: {
  dataInvestasi: MODEL_Investasi;
  dataUser: MODEL_PROFILE_OLD;
}) {
  const router = useRouter();
  const [investasi, setInvestasi] = useState(dataInvestasi);
  const [user, setUser] = useState(dataUser);
  const [publish, setPublish] = useState(true);
  const [opened, { toggle }] = useDisclosure(false);
  const [catatan, setCatatan] = useState<string | number>("");
  const [status, setStatus] = useAtom(gs_StatusPortoInvestasi);

  const listBox = [
    {
      id: 1,
      name: "Prospektus",
      icon: <IconBookDownload size={70} />,
      route: RouterInvestasi.detail_prospektus,
    },
    {
      id: 2,
      name: "Dokumen",
      icon: <IconFileDescription size={70} />,
      route: RouterInvestasi.detail_dokumen,
    },
    {
      id: 3,
      name: "Berita",
      icon: <IconSpeakerphone size={70} />,
      route: RouterInvestasi.berita,
    },
  ];

  useShallowEffect(() => {
    cekStatusPublish();
  }, []);

  async function cekStatusPublish() {
    if (investasi.MasterStatusInvestasi.id === "3") setPublish(false);
  }

  async function onReject() {
    const body = {
      id: investasi.id,
      catatan: investasi.catatan,
      status: "4",
    };
    if (_.isEmpty(body.catatan)) return toast("Lengkapi alasan");
    await Admin_funRejectInvestasi(body).then((res) => {
      if (res.status === 200) {
        toast(res.message);
        router.back();
        toggle();
      } else {
        toast(res.message);
      }
    });
  }

  async function onPublish() {
    await funGantiStatusInvestasi(investasi.id, "3", "1").then((res) => {
      if (res.status === 200) {
        setTimeout(() => setPublish(false), 1000);
        router.push(RouterAdminInvestasi.table_status_review);
        toast("Proyek Investasi Di Publish");
      }
    });
  }

  return (
    <>
      <Group position="apart" px={"md"}>
        <Group>
          <ActionIcon onClick={() => router.back()}>
            <IconChevronLeft />
          </ActionIcon>
          <Flex align={"center"} gap={"xs"} pl={"lg"}>
            {/* <Avatar
              radius={50}
              size={"md"}
              src={
                RouterProfile.api_foto +
                `${user.Profile?.ImageProfile?.url}`
              }
            /> */}
            <Text>{user.username}</Text>
          </Flex>
        </Group>
        <Group>
          {" "}
          <Center>
            {!publish || investasi.MasterStatusInvestasi.id === "4" ? (
              ""
            ) : (
              //    <Button
              //    radius={50}
              //    leftIcon={<IconBan />}
              //    bg={"orange"}
              //    color="orange"
              //    onClick={() => {
              //      setTimeout(() => setPublish(true), 1000);
              //      toast("Proyek Investasi Di Non-Aktifkan");
              //    }}
              //  >
              //    Non - aktifkan
              //  </Button>
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
          {investasi.MasterStatusInvestasi.id === "3" ? (
            ""
          ) : (
            <Button
              radius={50}
              bg={"red"}
              color="red"
              onClick={toggle}
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
                {investasi.title}
              </Title>
            </Center>
            <Paper withBorder mb={"md"} mah={300} maw={400} mx={"auto"} p={5}>
              <AspectRatio ratio={16 / 9}>
                <Image
                  alt=""
                  src={RouterInvestasi.api_gambar + `${investasi.imagesId}`}
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
                      }).format(+investasi.targetDana)}
                    </Text>
                  </Box>
                  <Box>
                    <Text>Harga Per Lembar</Text>
                    <Text>
                      Rp.{" "}
                      {new Intl.NumberFormat("id-ID", {
                        maximumFractionDigits: 10,
                      }).format(+investasi.hargaLembar)}{" "}
                    </Text>
                  </Box>
                  <Box>
                    <Text>Jadwal Pembagian</Text>
                    <Text>{investasi.MasterPembagianDeviden.name} bulan </Text>
                  </Box>
                  <Box>
                    <Text>Pencarian Investor</Text>
                    <Text>{investasi.MasterPencarianInvestor.name} hari </Text>
                  </Box>
                </Stack>
              </Grid.Col>
              <Grid.Col span={6}>
                <Stack>
                  <Box>
                    <Text>ROI</Text>
                    <Text>{investasi.roi} %</Text>
                  </Box>
                  <Box>
                    <Text>Total Lembar</Text>
                    <Text>
                      {" "}
                      {new Intl.NumberFormat("id-ID", {
                        maximumFractionDigits: 10,
                      }).format(+investasi.totalLembar)}{" "}
                      lembar
                    </Text>
                  </Box>
                  <Box>
                    <Text>Pembagian Deviden</Text>
                    <Text>{investasi.MasterPeriodeDeviden.name}</Text>
                  </Box>
                </Stack>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={6}>
            {/* Note */}
            {!publish || investasi.MasterStatusInvestasi.id === "4" ? (
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
            investasi.MasterStatusInvestasi.id === "3" &&
            _.isEmpty(investasi.BeritaInvestasi) ? (
              <BeritaInvestasi dataInvestasi={investasi} />
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
                  {investasi.ProspektusInvestasi === null ? (
                    <Text>Tidak ada file</Text>
                  ) : (
                    <Paper p={"xs"}>
                      <Group>
                        <IconFileTypePdf />
                        <Text>Prospektus_{investasi.title}</Text>
                        <Link
                          target="_blank"
                          href={
                            RouterInvestasi.api_file_prospektus +
                            `${
                              investasi.ProspektusInvestasi === null
                                ? ""
                                : investasi.ProspektusInvestasi.id
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
                  {_.isEmpty(investasi.DokumenInvestasi) ? (
                    <Text>Tidak ada dokumen</Text>
                  ) : (
                    investasi.DokumenInvestasi.map((e) => (
                      <Paper p={"xs"} key={e.id}>
                        <Group>
                          <IconFileTypePdf />
                          <Text>{e.title}</Text>
                          <Link
                            target="_blank"
                            href={RouterInvestasi.api_file_dokumen + `${e.id}`}
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
          opened={opened}
          onClose={toggle}
          // withCloseButton={false}
          title="Masukan alasan penolakan"
        >
          <Textarea
            mb={"md"}
            autosize
            minRows={2}
            maxRows={4}
            value={investasi.catatan === null ? [] : investasi.catatan}
            onChange={(val) =>
              setInvestasi({
                ...investasi,
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
