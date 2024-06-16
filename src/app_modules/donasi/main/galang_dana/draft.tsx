"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  Center,
  Divider,
  Grid,
  Image,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useRouter } from "next/navigation";

import toast from "react-simple-toasts";
import { MODEL_DONASI } from "../../model/interface";
import TampilanRupiahDonasi from "../../component/tampilan_rupiah";
import ComponentDonasi_IsEmptyData from "../../component/is_empty_data";
import _ from "lodash";

export default function PostingDraftDonasi({
  listDraft,
}: {
  listDraft: MODEL_DONASI[];
}) {
  const { height, width } = useViewportSize();
  const router = useRouter();

  if (_.isEmpty(listDraft))
    return <ComponentDonasi_IsEmptyData text="Tidak ada data" />;

  return (
    <>
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: "62rem", cols: 3, spacing: "md" },
          { maxWidth: "48rem", cols: 2, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        {listDraft.map((e, i) => (
          <Box
            key={i}
            onClick={() => router.push(RouterDonasi.detail_draft + `${e.id}`)}
          >
            <Stack>
              <Grid>
                <Grid.Col span={7}>
                  <AspectRatio ratio={16 / 9}>
                    <Paper radius={"md"}>
                      <Image
                        alt="Foto"
                        src={RouterDonasi.api_gambar + `${e.imagesId}`}
                        radius={"md"}
                      />
                    </Paper>
                  </AspectRatio>
                </Grid.Col>
                <Grid.Col span={5}>
                  <Stack spacing={"xs"}>
                    <Text fz={"sm"} fw={"bold"} lineClamp={2}>
                      {e.title}
                    </Text>
                    <Stack spacing={0}>
                      <Text fz={"sm"}>Terget Dana</Text>
                      <Text fz={"sm"} fw={"bold"} c={"orange"} truncate>
                        <TampilanRupiahDonasi nominal={+e.target} />
                      </Text>
                    </Stack>
                  </Stack>
                </Grid.Col>
              </Grid>
              {width > 575 ? "" : <Divider />}
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
}
