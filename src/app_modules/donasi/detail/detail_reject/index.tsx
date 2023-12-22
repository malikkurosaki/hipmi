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
  Button,
  Spoiler,
  Modal,
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
import { useAtom } from "jotai";
import { gs_donasi_tabs_posting } from "../../global_state";
import { useDisclosure } from "@mantine/hooks";

export default function DetailRejectDonasi() {
  return (
    <>
      <Stack spacing={"xl"}>
        <AlasanPenolakan />
        <DetailDonasi />
        {/* <InformasiPenggalangDana /> */}
        <CeritaPenggalangDana />
        <ButtonAction />
      </Stack>
    </>
  );
}

function ButtonAction() {
  const [tabsPostingDonasi, setTabsPostingDonasi] = useAtom(
    gs_donasi_tabs_posting
  );
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

  async function onCLick() {
    router.push(RouterDonasi.main_galang_dana);
    setTabsPostingDonasi("Draft");
  }
  async function onDelete() {
    router.push(RouterDonasi.main_galang_dana);
    setTabsPostingDonasi("Reject");
  }
  return (
    <>
      <Group position="center">
        <Button
          radius={"xl"}
          bg={"orange"}
          color="orange"
          onClick={() => onCLick()}
        >
          Ajukan Kembali
        </Button>
        <Button radius={"xl"} bg={"red"} color="red" onClick={() => open()}>
          Hapus Donasi
        </Button>
      </Group>
      <Modal opened={opened} onClose={close} centered title="Yakin menghapus Penggalanagn Dana ini ?">
        <Group position="center">
          <Button radius={"xl"} variant="outline" onClick={close}>
            Batal
          </Button>
          <Button radius={"xl"} variant="outline" color="red" onClick={() => onDelete()}>
            Hapus
          </Button>
        </Group>
      </Modal>
    </>
  );
}

function AlasanPenolakan() {
  return (
    <>
      <Paper bg={"blue.1"} p={"sm"}>
        <Title order={5}>Alasan penolakan</Title>
        <Spoiler
          maxHeight={50}
          hideLabel="Sembunyikan"
          showLabel="Selengkapnya"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam id
          explicabo accusantium consequatur natus ex nisi perferendis rem
          deserunt illo exercitationem illum doloremque, maxime voluptatibus
          nihil rerum provident et? Nobis.
        </Spoiler>
      </Paper>
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
              <Stack spacing={0}>
                <Text fz={12}>Kategori</Text>
                <Title order={4} c="blue">
                  Kesehatan
                </Title>
              </Stack>
            </Group>
          </Stack>
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
