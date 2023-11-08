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
import deleteBeritaInvestasi from "../fun/fun_delete_berita";
import getOneInvestasiById from "../fun/get_one_investasi_by_id";
import funLoadDataInvestasi from "../fun/fun_load_data";

export default function ListEditBeritaInvestasi({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_Investasi;
}) {
  const router = useRouter();
  const [investasi, setInvestasi] = useState<MODEL_Investasi>(dataInvestasi);

  async function onDelete(idBerita: string, idInvestasi: string) {
    await deleteBeritaInvestasi(idBerita, idInvestasi).then( async(res) => {
      if (res.status === 200) {
        const loadData = await funLoadDataInvestasi(idInvestasi);
        setInvestasi(loadData as any)
        toast(res.message);
      } else {
        toast(res.message);
      }
    });
  }

  if (!investasi) return <>data kosong</>;
  return (
    <>
      <Box>
        {_.isEmpty(investasi.BeritaInvestasi) ? (
          <Box>
            <Center>
              <Title order={6}>Berita Kosong</Title>
            </Center>
            <Divider />
          </Box>
        ) : (
          ""
        )}
      </Box>
      {investasi.BeritaInvestasi.map((v, k) => (
        <Paper key={k} w={"100%"} bg={"gray"} p={"sm"} mb={"md"}>
          <Stack spacing={"xs"}>
            <Group position="apart">
              <Box>
                <Title order={6}>{v.title}</Title>
                <Text fz={10}>{moment(v.createdAt).local().format("lll")}</Text>
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
                      onDelete(v.id, dataInvestasi.id);
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
      ))}
    </>
  );
}
