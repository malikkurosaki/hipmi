"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  ActionIcon,
  AspectRatio,
  Box,
  Center,
  Divider,
  Grid,
  Group,
  Image,
  Menu,
  Paper,
  Spoiler,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import toast from "react-simple-toasts";
import { MODEL_Investasi } from "../model/model_investasi";
import { useState } from "react";
import _ from "lodash";
import getOneInvestasiById from "../fun/get_one_investasi_by_id";
import funLoadDataInvestasi from "../fun/fun_load_data";
import funDeleteBeritaInvestasi from "../fun/fun_delete_berita";
import { useShallowEffect } from "@mantine/hooks";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";

export default function ListEditBeritaInvestasi({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_Investasi;
}) {
  const router = useRouter();
  const [investasi, setInvestasi] = useState(dataInvestasi);

  async function onDelete(idBerita: string) {
    await funDeleteBeritaInvestasi(idBerita).then(async (res) => {
      if (res.status === 200) {
        const load = await funLoadDataInvestasi(investasi.id);
        toast(res.message);
        return setInvestasi(load as any);
      } else {
        toast(res.message);
      }
    });
  }

  return (
    <>
      {_.isEmpty(investasi.BeritaInvestasi) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        investasi.BeritaInvestasi.map((v, k) => (
          <Paper key={k} w={"100%"} bg={"gray"} p={"sm"} mb={"md"}>
            <Stack spacing={"xs"}>
              <Group position="apart">
                <Box>
                  <Title order={6}>{v.title}</Title>
                  <Text fz={10}>
                    {moment(v.createdAt).local().format("lll")}
                  </Text>
                </Box>
                <Menu position="left">
                  <Menu.Target>
                    <ActionIcon variant="transparent">
                      <IconDots color="black" />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={() =>
                        router.push(RouterInvestasi.edit_berita + `${v.id}`)
                      }
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        onDelete(v.id);
                      }}
                    >
                      Hapus
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
              <Grid pt={5}>
                <Grid.Col span={8}>
                  <Spoiler
                    fz={"xs"}
                    maxHeight={55}
                    showLabel="Selengkapnya"
                    hideLabel="Sembunyikan"
                  >
                    {v.deskripsi}
                  </Spoiler>
                </Grid.Col>
                <Grid.Col span={4}>
                  <AspectRatio ratio={16 / 9} h={50} w={100}>
                    <Paper radius={10}>
                      <Image
                        alt=""
                        src={RouterInvestasi.api_gambar + `${v.imagesId}`}
                      />
                    </Paper>
                  </AspectRatio>
                </Grid.Col>
              </Grid>
            </Stack>
          </Paper>
        ))
      )}
    </>
  );
}
