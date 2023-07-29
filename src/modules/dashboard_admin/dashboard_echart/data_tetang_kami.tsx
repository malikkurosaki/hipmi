import {
  Box,
  Button,
  Flex,
  Grid,
  Group,
  SimpleGrid,
  Text,
} from "@mantine/core";
import React from "react";

function DataTentangKami() {
  return (
    <>
      <Box pt={10}>
        <Box
          sx={{
            backgroundColor: "#DDE6ED",
            borderRadius: 10,
            padding: 10,
          }}
        >
          <SimpleGrid
            cols={2}
            spacing="lg"
            breakpoints={[
              { maxWidth: "48rem", cols: 2, spacing: "sm" },
              { maxWidth: "36rem", cols: 1, spacing: "sm" },
            ]}
            pt={10}
          >
            <Box>
              <Box>
                <Text pb={10} ta={"center"} fw={"bold"} color="#17594A">
                  Halaman Sejarah
                </Text>

                <Text p={10} style={{textAlign: "justify"}}>
                  Himpunan Pengusaha Muda Indonesia (HIPMI) didirikan pada
                  tanggal 10 Juni 1972. Pendirian organisasi ini dilandasi
                  semangat untuk menumbuhkan wirausaha di kalangan pemuda,
                  karena pada saat itu tidak banyak kaum muda yang bercita –
                  cita menjadi pengusaha. Para pendiri yang rata – rata
                  merupakan pengusaha pemula yang terdiri dari Drs. Abdul
                  Latief, Ir. Siswono Yudo Husodo, Teu ku Sj ahrul, Datuk Hakim
                  Thantawi, Badar Tando, Irawan Djajaatmadja, SH , Hari
                  Sjamsudin Mangaan, Pontjo Sutowo, dan Ir. Mahdi Diah.
                </Text>
              </Box>
            </Box>
            <Box>
              <Box>
                <Text pb={10} ta={"center"} fw={"bold"} color="#17594A">
                  Halaman Visi & Misi
                </Text>
                <Text p={10} style={{textAlign: "justify"}}>
                  HIPMI memiliki motto Pengusaha Pejuang-Pejuang Pengusaha yang
                  bermakna bahwa kader- kader HIPMI tidak saja diharapkan
                  menjadi pengusaha nasional yang tangguh tetapi juga menjadi
                  pengusaha yang berwawasan kebangsaan dan memiliki kepedulian
                  terhadap tuntutan nurani rakyat. Visi dan Misi HIPMI adalah
                  memakmurkan seluruh rakyat Indonesia Raya.
                </Text>
              </Box>
            </Box>
          </SimpleGrid>
        </Box>
        <Box pt={15}>

          <Grid>
            <Grid.Col md={6} lg={6}>
                <Button
                  fullWidth
                  color="green.9"
                  bg="#17594A"
                  radius={"md"}
                  component="a"
                  href={"//dev/dashboard-admin/sejarah"}
                >
                  Halaman Sejarah
                </Button>
            </Grid.Col>
            <Grid.Col md={6} lg={6}>
                <Button
                  fullWidth
                  color="green.9"
                  bg="#17594A"
                  radius={"md"}
                  component="a"
                  href={"//dev/dashboard-admin/visi_misi"}
                >
                  Halaman Visi & Misi
                </Button>
            </Grid.Col>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default DataTentangKami;
