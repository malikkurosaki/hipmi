"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { Warna } from "@/app/lib/warna";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import {
  Affix,
  AspectRatio,
  Box,
  Button,
  Card,
  CardSection,
  Group,
  Image,
  Progress,
  rem,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect, useWindowScroll } from "@mantine/hooks";
import { IconCircleCheck, IconXboxX } from "@tabler/icons-react";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_Investasi } from "../model/model_investasi";
import mqtt_client from "@/util/mqtt_client";
import { investasi_funGetAllPublish } from "../fun/get_all_investasi";

export default function MainInvestasi({
  listData,
}: {
  listData: MODEL_Investasi[];
}) {
  // console.log(listData)
  const router = useRouter();
  const [data, setData] = useState(listData);
  const [isLoadingDetail, setLoadingDetail] = useState(false);
  const [isNewPost, setIsNewPost] = useState(false);

  //  console.log(dataWaktuHabis)

  useShallowEffect(() => {
    mqtt_client.subscribe("Beranda_Investasi");

    mqtt_client.on("message", (topic, message) => {
      const newPost = JSON.parse(message.toString());
      setIsNewPost(newPost);
    });
  }, []);

  return (
    <>
      {isNewPost && (
        <Affix position={{ top: rem(100) }} w={"100%"}>
          <ButtonUpdateBeranda
            onLoadData={(val) => {
              setData(val.data);
              setIsNewPost(val.isNewPost);
            }}
          />
        </Affix>
      )}

      <ComponentGlobal_CreateButton path={RouterInvestasi.create} />

      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        data.map((e) => (
          <Card
            key={e.id}
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
              router.push(RouterInvestasi.detail + `${e.id}`);
            }}
          >
            <CardSection py={"md"} px={"sm"}>
              <AspectRatio ratio={1 / 1} mah={250}>
                <Box style={{ borderRadius: "7px" }}>
                  {e.imagesId ? (
                    <Image
                      radius={"sm"}
                      alt="Foto"
                      src={RouterInvestasi.api_gambar + `${e.imagesId}`}
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
                  {e.title}
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
                      ((+e.totalLembar - +e.sisaLembar) / +e.totalLembar) *
                      100
                    ).toFixed(1) +
                    "%"
                  }
                  value={
                    +(
                      ((+e.totalLembar - +e.sisaLembar) / +e.totalLembar) *
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
                {e.progress === "100" ? (
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
                    {+e.MasterPencarianInvestor.name -
                      moment(new Date()).diff(new Date(e.countDown), "days") <=
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
                          {Number(e.MasterPencarianInvestor.name) -
                            moment(new Date()).diff(
                              new Date(e.countDown),
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
          </Card>
        ))
      )}
    </>
  );
}

function ButtonUpdateBeranda({
  onLoadData,
}: {
  onLoadData: (val: any) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function onLoaded() {
    const loadData = await investasi_funGetAllPublish();
    onLoadData({
      data: loadData,
      isNewPost: false,
    });

    setIsLoading(true);
  }

  return (
    <>
      <center>
        <Button
          style={{
            transition: "0.5s",
            border: `1px solid ${AccentColor.skyblue}`,
          }}
          bg={AccentColor.blue}
          loaderPosition="center"
          loading={isLoading ? true : false}
          radius={"xl"}
          onClick={() => onLoaded()}
        >
          Update beranda
        </Button>
      </center>
    </>
  );
}
