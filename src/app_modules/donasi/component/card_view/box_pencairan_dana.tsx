import { MainColor, AccentColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { Paper, Stack, Grid, Title, Text } from "@mantine/core";
import { MODEL_DONASI } from "../../model/interface";
import TampilanRupiahDonasi from "../tampilan_rupiah";

export function ComponentDonasi_BoxPencariranDana({ akumulasi }: { akumulasi: MODEL_DONASI }) {
  return (
    <>
      <Paper
        style={{
          backgroundColor: MainColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          padding: "15px",
          cursor: "pointer",
          borderRadius: "10px",
          color: "white",
          marginBottom: "10px",
        }}
      >
        <Stack>
          <Grid>
            <Grid.Col span={6}>
              <Title order={5}>
                <TampilanRupiahDonasi nominal={akumulasi.totalPencairan} />
              </Title>
              <Text fz={"xs"}>Dana sudah dicairkan</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Title order={5}>{akumulasi.akumulasiPencairan} kali</Title>
              <Text fz={"xs"}>Pencairan dana</Text>
            </Grid.Col>
          </Grid>
          <ComponentGlobal_BoxInformation
            informasi=" Pencairan dana akan dilakukan oleh Admin HIPMI tanpa campur tangan
            pihak manapun, jika berita pencairan dana dibawah tidak sesuai
            dengan kabar yang diberikan oleh PENGGALANG DANA. Maka pegguna lain
            dapat melaporkannya pada Admin HIPMI !"
          />
        </Stack>
      </Paper>
    </>
  );
}