import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";
import { Warna } from "@/app/lib/warna";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import {
  Card,
  CardSection,
  AspectRatio,
  Box,
  Stack,
  Title,
  Progress,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { IconCircleCheck, IconXboxX } from "@tabler/icons-react";
import moment from "moment";

import { MODEL_INVESTASI } from "../../_lib/interface";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentGlobal_CardLoadingOverlay from "@/app_modules/_global/loading_card";

export function Investasi_ComponentCardBeranda({
  data,
}: {
  data: MODEL_INVESTASI;
}) {
  const router = useRouter();
  const [isLoadingDetail, setLoadingDetail] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Card
        style={{
          padding: "15px",
          backgroundColor: AccentColor.darkblue,
          borderRadius: "10px",
          border: `2px solid ${AccentColor.blue}`,
          color: "white",
          marginBottom: "15px",
          marginInline: "15px",
        }}
        onClick={() => {
          setLoadingDetail(true);
          setVisible(true);
          router.push(RouterInvestasi_OLD.detail + `${data?.id}`);
        }}
      >
        <CardSection py={"md"} px={"sm"}>
          <AspectRatio ratio={1 / 1} mah={250}>
            <Box style={{ borderRadius: "7px" }}>
              {data.imagesId ? (
                <Image
                  radius={"sm"}
                  alt="Foto"
                  src={RouterInvestasi_OLD.api_gambar + `${data?.imagesId}`}
                  w={200}
                />
              ) : (
                <Image alt="" src={"/aset/no-img.png"} />
              )}
            </Box>
          </AspectRatio>
        </CardSection>

        <CardSection p={"md"}>
          <Stack>
            <Title align="center" order={3}>
              {data?.title}
            </Title>
            {/* <Progress
                  label={(+e.progress).toFixed(2) + " %"}
                  value={+e.progress}
                  color="teal"
                  size="xl"
                  radius="xl"
                /> */}
            <Progress
              label={
                "" +
                (
                  ((+data?.totalLembar - +data?.sisaLembar) /
                    +data?.totalLembar) *
                  100
                ).toFixed(1) +
                "%"
              }
              value={
                +(
                  ((+data?.totalLembar - +data?.sisaLembar) /
                    +data?.totalLembar) *
                  100
                ).toFixed(1)
              }
              color="teal"
              size="xl"
              radius="xl"
            />
          </Stack>
        </CardSection>

        <CardSection p={"md"}>
          <Group position="right">
            {data?.progress === "100" ? (
              <Group position="right" spacing={"xs"}>
                <IconCircleCheck color="green" />
                <Text
                  truncate
                  variant="text"
                  c={Warna.hijau_tua}
                  sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                  ta="center"
                  fz="md"
                  fw={700}
                >
                  Selesai
                </Text>
              </Group>
            ) : (
              <Box>
                {+data?.MasterPencarianInvestor.name -
                  moment(new Date()).diff(new Date(data?.countDown), "days") <=
                0 ? (
                  <Group position="right" spacing={"xs"}>
                    <IconXboxX color="red" />
                    <Text
                      truncate
                      variant="text"
                      c={Warna.merah}
                      sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                      ta="center"
                      fz="md"
                      fw={700}
                    >
                      Waktu Habis
                    </Text>
                  </Group>
                ) : (
                  <Group position="right" spacing={"xs"}>
                    <Text truncate>Sisa waktu:</Text>
                    <Text truncate>
                      {Number(data?.MasterPencarianInvestor.name) -
                        moment(new Date()).diff(
                          new Date(data?.countDown),
                          "days"
                        )}
                    </Text>
                    <Text truncate>Hari</Text>
                  </Group>
                )}
              </Box>
            )}
          </Group>
        </CardSection>
        {visible ? <ComponentGlobal_CardLoadingOverlay /> : ""}
      </Card>
    </>
  );
}
