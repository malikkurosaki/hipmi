"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  Stack,
  AspectRatio,
  Paper,
  Title,
  Progress,
  Grid,
  Group,
  Divider,
  ActionIcon,
  Avatar,
  Text,
  Image,
} from "@mantine/core";
import {
  IconClover,
  IconMail,
  IconMoneybag,
  IconCircleChevronRight,
  IconMessageChatbot,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import BoxInformasiDonasi from "../../component/box_informasi";

export default function DetailPublishDonasi() {
  return (
    <>
      <Stack spacing={40}>
        <DetailDonasi />
        <InformasiPenggalangDana />
        <CeritaPenggalangDana />
      </Stack>
    </>
  );
}

function DetailDonasi() {
  const router = useRouter();
  return (
    <>
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
              <Text fz={"xs"}>Sisa hari <Text span inherit fw={"bold"}>100</Text> </Text>
            </Group>
          </Stack>
          <Progress value={50} />
          <Grid>
            <Grid.Col
              span={"auto"}
              onClick={() => router.push(RouterDonasi.donatur)}
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
              onClick={() => router.push(RouterDonasi.kabar)}
            >
              <Stack spacing={"sm"} align="center">
                <IconMessageChatbot color="skyblue" />
                <Text>Kabar Terbaru</Text>
              </Stack>
            </Grid.Col>
            <Divider orientation="vertical" />
            <Grid.Col
              span={"auto"}
              onClick={() => router.push(RouterDonasi.pencairan_dana)}
            >
              <Stack spacing={"sm"} align="center">
                <IconMoneybag color="skyblue" />
                <Text>Pencairan Dana</Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Stack>
    </>
  );
}

function InformasiPenggalangDana() {
  const router = useRouter();
  return (
    <>
      <Stack spacing={"xs"}>
        <Title order={4}>Informasi Penggalang Dana</Title>
        <Paper p={"sm"} withBorder>
          <Stack>
            <Group position="apart">
              <Title order={5}>Penggalang Dana</Title>
              <ActionIcon
                variant="transparent"
                onClick={() => router.push(RouterDonasi.penggalang_dana)}
              >
                <IconCircleChevronRight />
              </ActionIcon>
            </Group>
            <Group>
              <Avatar radius={"xl"} variant="filled" bg={"blue"}>
                U
              </Avatar>
              <Text>Username</Text>
            </Group>
            <BoxInformasiDonasi
              informasi="Semua dana yang terkumpul akan disalurkan ke penggalang dana,
                kabar penyaluran dapat dilihat di halaman kabar terbaru."
            />
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}

function CeritaPenggalangDana() {
  const router = useRouter();
  return (
    <>
      <Stack spacing={"xs"}>
        <Title order={4}>Cerita Penggalang Dana</Title>
        <Paper p={"sm"} withBorder>
          <Stack>
            <Group position="apart">
              <Text>1 Des 2023</Text>
              <ActionIcon
                variant="transparent"
                onClick={() => router.push(RouterDonasi.cerita_penggalang)}
              >
                <IconCircleChevronRight />
              </ActionIcon>
            </Group>
            <Text lineClamp={4}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat
              doloremque perferendis laborum? Cupiditate sed consequatur quasi
              doloremque, consequuntur libero? Vel nam esse fuga, sed et
              repellat commodi nemo quia dignissimos?
            </Text>
            {/* <Text c={"blue"}>Baca selengkapnya</Text> */}
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}
