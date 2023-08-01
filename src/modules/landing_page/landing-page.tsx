"use client";

import {
  AspectRatio,
  BackgroundImage,
  Box,
  Card,
  Center,
  Grid,
  Group,
  Image,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { WARNA } from "@/fun/color_tone";
import { useRef } from "react";
import Autoplay from 'embla-carousel-autoplay';
import { Informasi } from ".";
// Data dummy untuk keperluan tampilan awal
const dataDummy = [
  {
    id: 1,
    nama: "I Putu Gede Putra Adnyana, ST.",
    jabatan: "Ketua Umum",
    usaha: "Jasa",
    foto: "/img/dummy/foto_ketum.jpeg",
  },
  {
    id: 2,
    nama: "Ni Putu Asteria Yuniarti,S.Pd,M.I.Kom",
    jabatan: "Wakil Ketua Umum",
    usaha: "Restaurant",
    foto: "/img/dummy/foto_waketum.jpeg",
  },
  {
    id: 3,
    nama: "A.A Bagus Bayu Joni Saputra,SE.MM.",
    jabatan: "Ketua Dewan Pembina",
    usaha: "Supplier",
    foto: "/img/dummy/foto_pembina.jpeg",
  },
  {
    id: 4,
    nama: "I Putu Gede Wirakusuma,SP,MMA.",
    jabatan: "Ketua Dewan Kehormatan",
    usaha: "Restaurant",
    foto: "/img/dummy/foto_dkehormatan.jpeg",
  },
  {
    id: 5,
    nama: "I Ketut Subawa, ST",
    jabatan: "Ketua Bendahara Umum",
    usaha: "Restaurant",
    foto: "/img/dummy/foto_benhum.jpeg",
  },
];

const useStyles = createStyles((theme) => ({
  carousel_: {
    ":hover": {
      cursor: "pointer",
      borderColor: WARNA.hijau_cerah,
      color: WARNA.hijau_muda,
      transition: "0.2s ease",
    },
  },

  sejarah_visimisi: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "lighter",
  },

  text_kuning: {
    ":hover": {
      cursor: "pointer",
      borderColor: WARNA.kuning,
      color: WARNA.kuning,
    },
  },
}));

export function LandingPage() {
  const { classes } = useStyles();
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  return (
    <>
      <Box>
        {/*  */}
        <Box mx={-16} my={20}>
          <Image src="/img/landing.jpeg" alt="Random image" />
        </Box>

        {/* Tampilan Pengurus Organisasi */}
        <Box my={40}>
          <Stack spacing={0}>
            <Group position="center">
              <Title order={3}>Pengurus Organisasi</Title>
            </Group>
            <Group position="center">
              <Text fw={"lighter"}>
                Mari Bangun Jaringan Anda Dengan Bergabung Bersama Kami
              </Text>
            </Group>
          </Stack>

          <Carousel
            my={20}
            slideSize="25%"
            height={350}
            controlSize={50}
            slideGap="md"
            loop
            // withIndicators
            align={"start"}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            breakpoints={[
              { maxWidth: "md", slideSize: "50%" },
              { maxWidth: "sm", slideSize: "50%", slideGap: "sm" },
            ]}
          >
            {dataDummy.map((e, i) => (
              <Carousel.Slide key={e.id}>
                <Card
                  shadow="xl"
                  h={350}
                  withBorder
                  className={classes.carousel_}
                >
                  <Card.Section p={15} pt={{ base: 30, sm: 10 }}>
                    <Stack>
                      <AspectRatio
                        ratio={4 / 3}
                        mah={{ base: 500, sm: 200 }}
                        pt={{ base: "xl", sm: "xs" }}
                      >
                        <Image src={e.foto} alt="Foto" />
                      </AspectRatio>
                      <Text fw={"bold"}>{e.nama}</Text>
                    </Stack>
                    <Stack spacing={0}>
                      <Text>Jabatan: {e.jabatan}</Text>
                      <Text>Usaha: {e.usaha}</Text>
                    </Stack>
                  </Card.Section>
                </Card>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Box>

        {/* Sejarah dan Visi Misi */}
        <Box my={40}>
          <SimpleGrid
            cols={2}
            spacing={"md"}
            breakpoints={[
              { maxWidth: "62rem", cols: 3, spacing: "md" },
              { maxWidth: "48rem", cols: 2, spacing: "sm" },
              { maxWidth: "36rem", cols: 1, spacing: "sm" },
            ]}
          >
            <Box>
              <Group position="center">
                <Title order={3}>Sejarah</Title>
              </Group>
              <Paper withBorder p={20} className={classes.sejarah_visimisi}>
                <ScrollArea h={200}>
                  Himpunan Pengusaha Muda Indonesia (HIPMI) didirikan pada
                  tanggal 10 Juni 1972. Pendirian organisasi ini dilandasi
                  semangat untuk menumbuhkan wirausaha di kalangan pemuda,
                  karena pada saat itu tidak banyak kaum muda yang bercita –
                  cita menjadi pengusaha. Para pendiri yang rata – rata
                  merupakan pengusaha pemula yang terdiri dari Drs. Abdul
                  Latief, Ir. Siswono Yudo Husodo, Teu ku Sj ahrul, Datuk Hakim
                  Thantawi, Badar Tando, Irawan Djajaatmadja, SH , Hari
                  Sjamsudin Mangaan, Pontjo Sutowo, dan Ir. Mahdi Diah. Pada
                  saat itu anggapan yang berkembang di masyarakat menempatkan
                  kelompok pengusaha pada strata yang sangat rendah sehingga
                  sebagian besar anak muda terutama kalangan intelektual lebih
                  memilih profesi lain seperti birokrat, TNI / POLRI dan
                  sebagainya. Dalam perjalanannya sampai terjadinya krisis
                  ekonomi di tahun 1998, HIPMI telah sukses mencetak kaderisasi
                  wirausaha, dengan tampilnya tokoh – tokoh muda dalam
                  percaturan dunia usaha nasional maupun internasional. Keadaan
                  itu kemudian dapat merubah pandangan masyarakat terhadap
                  profesi pengusaha pada posisi terhormat. Pada Era Reformasi,
                  terutama pasca krisis ekonomi, di tuntut adanya perubahan
                  visi, dan misi organisasi. HIPMI senantiasa adaptif dengan
                  paradigma baru yakni menjadikan Usaha Kecil – Menengah sebagai
                  pilar utama dan lokomotif pembangunan ekonomi nasional.
                </ScrollArea>
              </Paper>
            </Box>
            <Box>
              <Group position="center">
                <Title order={3}>Visi & Misi</Title>
              </Group>
              <Paper withBorder p={20} className={classes.sejarah_visimisi}>
                <ScrollArea h={200}>
                  HIPMI memiliki motto Pengusaha Pejuang-Pejuang Pengusaha yang
                  bermakna bahwa kader- kader HIPMI tidak saja diharapkan
                  menjadi pengusaha nasional yang tangguh tetapi juga menjadi
                  pengusaha yang berwawasan kebangsaan dan memiliki kepedulian
                  terhadap tuntutan nurani rakyat. Visi dan Misi HIPMI adalah
                  memakmurkan seluruh rakyat Indonesia Raya.
                </ScrollArea>
              </Paper>
            </Box>
          </SimpleGrid>
        </Box>

        {/* <Box  mx={-16} mt={100}>
            <Informasi/>
        </Box> */}

        {/* Footer */}
        <Box
          mt={40}
          bg={"black"}
          p={10}
          h={{ base: 350, sm: 250 }}
          mx={-16}
          mb={{ base: -16, sm: -16 }}
        >
          <Grid color="white" p={"md"} columns={2}>
            <Grid.Col>
              <Title color="white" order={4}>
                Badan Pengurus Cabang Himpunan Pengusaha Muda Indonesia (BPC
                HIPMI) Badung
              </Title>
            </Grid.Col>
            <Grid.Col sx={{ color: "white" }}>
              <Text>
                Alamat: Jl. Raya Sempidi No. 40, 1st Floor Hotel Made Bali,
                Badung-Bali 80351
              </Text>
              <Text>Telepon: +62 8214 7200 021</Text>
              <Text>Email: bpc@hipmibadung.or.id</Text>
            </Grid.Col>
            <Grid.Col sx={{ color: "white" }} pt={50}>
              <Group position="center" sx={{ fontWeight: "lighter" }}>
                <Text>
                  Copyright © 2023 HIPMI Badung. Website by Bali Interaktif
                  Perkasa
                </Text>
              </Group>
            </Grid.Col>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
