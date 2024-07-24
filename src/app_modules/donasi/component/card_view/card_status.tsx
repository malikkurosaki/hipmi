import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import {
  Box,
  Stack,
  Grid,
  AspectRatio,
  Paper,
  Image,
  Text,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { MODEL_DONASI } from "../../model/interface";

export function ComponentDonasi_CardStatus({
  data,
  path,
}: {
  data: MODEL_DONASI;
  path: string;
}) {
  const router = useRouter();
  return (
    <>
      <Box
        style={{
          padding: "15px",
          backgroundColor: AccentColor.darkblue,
          borderRadius: "10px",
          border: `2px solid ${AccentColor.blue}`,
          color: "white",
          marginBottom: "15px",
        }}
        onClick={() => router.push(path + `${data.id}`)}
      >
        <Stack>
          <Grid>
            <Grid.Col span={7}>
              <AspectRatio ratio={16 / 9}>
                <Paper radius={"sm"} bg={"gray.1"}>
                  <Image
                    alt="Foto"
                    src={RouterDonasi.api_gambar + `${data.imagesId}`}
                    radius={"md"}
                  />
                </Paper>
              </AspectRatio>
            </Grid.Col>
            <Grid.Col span={5}>
              <Stack spacing={"xs"}>
                <Text fz={"sm"} fw={"bold"} lineClamp={2}>
                  {data.title}
                </Text>
                <Stack spacing={0}>
                  <Text fz={"sm"}>Terget Dana</Text>
                  <Text fz={"sm"} fw={"bold"} c={"yellow"} lineClamp={1}>
                    Rp.{" "}
                    {new Intl.NumberFormat("id-ID", {
                      maximumFractionDigits: 10,
                    }).format(+data.target)}
                  </Text>
                </Stack>
              </Stack>
            </Grid.Col>
          </Grid>
          {/* {width > 575 ? "" : <Divider />} */}
        </Stack>
      </Box>
    </>
  );
}
