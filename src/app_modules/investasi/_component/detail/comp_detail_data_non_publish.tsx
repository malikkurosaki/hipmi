import {
  ComponentGlobal_CardStyles,
  ComponentGlobal_LoadImageLandscape,
} from "@/app_modules/_global/component";
import { MODEL_INVESTASI } from "@/app_modules/investasi/_lib/interface";
import { Center, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import _ from "lodash";
import { Investasi_ComponentBoxDaftarDokumen } from "./comp_box_daftar_dokumen";
import { Investasi_ComponentBoxProspektus } from "./comp_box_prospektus";
import { Investasi_ComponentTitleAndValueInDetail } from "./comp_title_and_value_in_detail";

export function Investasi_ComponentDetailDataNonPublish({
  data,
}: {
  data: MODEL_INVESTASI;
}) {
  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack spacing={"xl"}>
          <ComponentGlobal_LoadImageLandscape fileId={data.imageId} />

          {/* Title dan Persentase */}
          <Center>
            <Title order={3} align="center">
              {_.startCase(data.title)}
            </Title>
          </Center>

          {/* Rincian Data */}

          <Stack>
            <Investasi_ComponentTitleAndValueInDetail
              title="Target Dana"
              value={
                <Text>
                  Rp.{" "}
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 20,
                  }).format(+data.targetDana)}{" "}
                </Text>
              }
            />

            <Investasi_ComponentTitleAndValueInDetail
              title="Harga Per Lembar"
              value={
                <Text>
                  Rp.{" "}
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+data.hargaLembar)}
                </Text>
              }
            />

            <Investasi_ComponentTitleAndValueInDetail
              title={<Text fs={"italic"}>Return Of Invesment (RoI)</Text>}
              value={<Text>{data.roi} %</Text>}
            />

            <Investasi_ComponentTitleAndValueInDetail
              title="Total Lembar"
              value={
                <Text>
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+data.totalLembar)}{" "}
                  lembar
                </Text>
              }
            />

            <Investasi_ComponentTitleAndValueInDetail
              title="Jadwal Pembagian"
              value={<Text>{data.MasterPembagianDeviden.name} Bulan </Text>}
            />
            <Investasi_ComponentTitleAndValueInDetail
              title="Pembagian Deviden"
              value={<Text>{data.MasterPeriodeDeviden.name}</Text>}
            />
            <Investasi_ComponentTitleAndValueInDetail
              title="Pencarian Investor"
              value={<Text>{data.MasterPencarianInvestor.name} Hari </Text>}
            />
          </Stack>

          {/* List Box */}
          <SimpleGrid
            cols={2}
            breakpoints={[
              { maxWidth: "62rem", cols: 2, spacing: "md" },
              { maxWidth: "48rem", cols: 2, spacing: "sm" },
              { maxWidth: "36rem", cols: 1, spacing: "sm" },
            ]}
          >
            <Investasi_ComponentBoxProspektus
              prospektusFileId={data.prospektusFileId}
            />
            <Investasi_ComponentBoxDaftarDokumen investasiId={data?.id} />
          </SimpleGrid>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
