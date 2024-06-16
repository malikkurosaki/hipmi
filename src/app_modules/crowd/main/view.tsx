"use client";

import { RouterCrowd } from "@/app/lib/router_hipmi/router_crowd";
import { Warna } from "@/app/lib/warna";
import { gs_donasi_hot_menu } from "@/app_modules/donasi/global_state";
import { gs_investasiFooter } from "@/app_modules/investasi/g_state";
import {
  AspectRatio,
  Button,
  Center,
  Flex,
  Grid,
  Image,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-simple-toasts";

export default function MainCrowd() {
  const router = useRouter();
  const [changeColor, setChangeColor] = useAtom(gs_investasiFooter);
  const [donasiHotMenu, setDonasiHotMenu] = useAtom(gs_donasi_hot_menu);
  const [loadingInv, setLoadingInv] = useState(false);
  const [loadingDon, setLoadingDon] = useState(false);
  return (
    <>
      <Stack>
        <Paper>
          <AspectRatio ratio={16 / 9}>
            <Paper radius={"md"}>
              <Image alt="" src={"/aset/investasi/logo-crowd-panjang.png"} />
            </Paper>
          </AspectRatio>
        </Paper>
        <Stack>
          <Paper
            shadow="lg"
            p={"md"}
            radius={"md"}
            bg={"teal.4"}
            onClick={() => {
              setLoadingInv(true);
              router.push(RouterCrowd.investasi);
              setChangeColor(0);
            }}
          >
            <Grid>
              <Grid.Col span={10}>
                <Title order={4}> Investasi</Title>
                <Text fz={12}>
                  Buat investasi dan jual beli saham lebih mudah dengan pengguna
                  lain dengan CROWD INVESTASI
                </Text>
              </Grid.Col>
              <Grid.Col span={2}>
                <Stack h={"100%"} justify="center" align="center">
                  {loadingInv ? <Loader /> : <IconChevronRight />}
                </Stack>
              </Grid.Col>
            </Grid>
          </Paper>
          <Paper
            shadow="lg"
            bg={"blue.3"}
            radius={"md"}
            p={"md"}
            onClick={() => {
              setLoadingDon(true);
              router.push(RouterCrowd.donasi);
              setDonasiHotMenu(0);
            }}
          >
            <Grid>
              <Grid.Col span={10}>
                <Title order={4}> Donasi</Title>
                <Text fz={12}>
                  Berbagi info untuk berdonasi lebih luas dan lebih mudah dengan
                  CROWD DONASI
                </Text>
              </Grid.Col>
              <Grid.Col span={2}>
                <Stack h={"100%"} justify="center" align="center">
                  {loadingDon ? <Loader /> : <IconChevronRight />}
                </Stack>
              </Grid.Col>
            </Grid>
          </Paper>
        </Stack>
      </Stack>
    </>
  );
}
