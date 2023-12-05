"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { Warna } from "@/app/lib/warna";
import {
  ActionIcon,
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Modal,
  Paper,
  Slider,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconArrowBackUpDouble,
  IconBookDownload,
  IconFileDescription,
  IconSpeakerphone,
  IconTrash,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_StatusPortoInvestasi } from "../../g_state";
import toast from "react-simple-toasts";
import { MODEL_Investasi } from "../../model/model_investasi";
import { useState } from "react";
import funGantiStatusInvestasi from "../../fun/fun_ganti_status";
import funDeleteInvestasi from "../../fun/fun_delete_investasi";
import { useDisclosure } from "@mantine/hooks";

export default function DetailRejectInvestasi({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_Investasi;
}) {
  const router = useRouter();
  const [investasi, setInvestasi] = useState(dataInvestasi);
  const [activeTab, setActiveTab] = useAtom(gs_StatusPortoInvestasi);
  const [opened, { toggle }] = useDisclosure(false);

  const listBox = [
    {
      id: 1,
      name: "Prospektus",
      icon: <IconBookDownload size={70} />,
      route: RouterInvestasi.edit_prospektus,
    },
    {
      id: 2,
      name: "Dokumen",
      icon: <IconFileDescription size={70} />,
      route: RouterInvestasi.edit_dokumen,
    },
    // {
    //   id: 3,
    //   name: "Berita",
    //   icon: <IconSpeakerphone size={70} />,
    //   route: RouterInvestasi.edit_berita,
    // },
  ];

  async function onAjukan() {
    await funGantiStatusInvestasi(investasi.id, "1").then((res) => {
      if (res.status === 200) {
        toast("Project Diajukan Kembali");
        setActiveTab("Draft");
        router.push(RouterInvestasi.portofolio);
      } else {
        toast("Gagal Pengajuan");
      }
    });
  }

  async function onBatal() {
    await funDeleteInvestasi(investasi.id).then((res) => {
      if (res.status === 200) {
        toast(res.message);
        toggle();
        router.push(RouterInvestasi.portofolio);
      } else {
        toast(res.message);
      }
    });
    // setActiveTab("Reject");
  }

  return (
    <>
     {/* Pop up */}
      <Modal
        opened={opened}
        onClose={toggle}
        centered
        title="Yakin menghapus data"
      >
        <Group position="center">
          <Button onClick={toggle}>Batal</Button>
          <Button bg={Warna.merah} onClick={() => onBatal()}>
            Hapus
          </Button>
        </Group>
      </Modal>

      {/* Alasan */}
      <Box mb={"xl"}>
        <Title order={6}>Alasan :</Title>
        <Box>
          <Paper>
            <Text>{investasi.catatan}</Text>
          </Paper>
        </Box>
      </Box>

      {/* Tombol Ajukan */}
      <Grid>
        <Grid.Col span={6}>
          <Center>
            <Button
            leftIcon={<IconArrowBackUpDouble/>}
              mb={"xl"}
              radius={50}
              bg={"orange.7"}
              color="yellow"
              compact
              onClick={() => onAjukan()}
            >
              Masuk ke Draft
            </Button>
          </Center>
        </Grid.Col>

        {/* Tombol Hapus  */}
        <Grid.Col span={6}>
          <Center>
            {" "}
            <Button
            leftIcon={<IconTrash size={12}/>}
              compact
              mb={"xl"}
              radius={50}
              bg={"red.7"}
              color="yellow"
              onClick={() => toggle()}
            >
              Hapus Project
            </Button>
          </Center>
        </Grid.Col>
      </Grid>

      <Paper withBorder mb={"md"}>
        <AspectRatio ratio={16 / 9}>
          <Image
            alt=""
            src={RouterInvestasi.api_gambar + `${investasi.imagesId}`}
          />
        </AspectRatio>
      </Paper>

      {/* Title dan Persentase */}
      <Box mb={"md"}>
        <Title order={4} mb={"xs"}>
          {investasi.title}
        </Title>
      </Box>

      {/* Rincian Data */}
      <Grid p={"md"} mb={"md"}>
        <Grid.Col span={6}>
          <Stack>
            <Box>
              <Text>Dana Dibutuhkan</Text>
              <Text>Rp. {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+investasi.targetDana)}</Text>
            </Box>
            <Box>
              <Text>Harga Per Lembar</Text>
              <Text>Rp. {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+investasi.hargaLembar)}</Text>
            </Box>
            <Box>
              <Text>Jadwal Pembagian</Text>
              <Text>{investasi.MasterPembagianDeviden.name} Bulan </Text>
            </Box>
            <Box>
              <Text>Pencarian Investor</Text>
              <Text>{investasi.MasterPencarianInvestor.name} Hari </Text>
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
              <Text>{new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+investasi.totalLembar)} lembar</Text>
            </Box>
            <Box>
              <Text>Pembagian Deviden</Text>
              <Text>{investasi.MasterPeriodeDeviden.name}</Text>
            </Box>
          </Stack>
        </Grid.Col>
      </Grid>

      {/* List Box */}
      <Grid mb={"md"}>
        {listBox.map((e) => (
          <Grid.Col
            span={"auto"}
            key={e.id}
            onClick={() => router.push(e.route + `${investasi.id}`)}
          >
           <Center>
           <Paper h={100} w={100} bg={"gray.4"} withBorder py={"xs"}>
              <Flex direction={"column"} align={"center"} justify={"center"}>
                <Text fz={12}>{e.name}</Text>
                <ActionIcon variant="transparent" size={60}>
                  {e.icon}
                </ActionIcon>
              </Flex>
            </Paper>
           </Center>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}
