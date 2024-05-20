"use client";

import {
  RouterPortofolio,
  RouterProfile,
} from "@/app/lib/router_hipmi/router_katalog";
import { Warna } from "@/app/lib/warna";
import { MODEL_PORTOFOLIO_OLD } from "@/app_modules/model_global/portofolio";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Grid,
  Group,
  Image,
  Modal,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandTwitter,
  IconBrandYoutube,
  IconBuilding,
  IconBuildingSkyscraper,
  IconListDetails,
  IconMapPin,
  IconNotes,
  IconPhoneCall,
  IconPinned,
  IconTrash,
} from "@tabler/icons-react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_PORTOFOLIO } from "../model/interface";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { portofolio_getOneById } from "../fun/get/get_one_portofolio";
import _ from "lodash";
import { Portofolio_funDeletePortofolioById } from "../fun/delete/fun_delete_by_id";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";

export default function ViewPortofolio({
  dataPorto,
  userLoginId,
}: {
  dataPorto: MODEL_PORTOFOLIO;
  userLoginId: string;
}) {
  const router = useRouter();
  const [porto, setPorto] = useState(dataPorto);
  const [opened, { open, close }] = useDisclosure(false);
  const [loadingDel, setLoadingDel] = useState(false);

  return (
    <>
      {/* <pre>{JSON.stringify(porto, null, 2)}</pre> */}
      <Stack>
        <Paper p={"sm"} withBorder shadow="lg">
          <Title order={6}>Data Bisnis</Title>
          <Stack p={"sm"}>
            <Grid>
              <Grid.Col span={2}>
                <IconBuildingSkyscraper />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text>{dataPorto?.namaBisnis}</Text>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={2}>
                <IconPhoneCall />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text>+{dataPorto?.tlpn}</Text>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={2}>
                <IconMapPin />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text>{dataPorto?.alamatKantor}</Text>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={2}>
                <IconListDetails />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text>{dataPorto?.MasterBidangBisnis.name}</Text>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={2}>
                <IconPinned />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text>{dataPorto?.deskripsi}</Text>
              </Grid.Col>
            </Grid>
          </Stack>
        </Paper>
        <Paper p={"sm"} withBorder shadow="lg">
          <Title order={6}>Logo Bisnis</Title>

          <AspectRatio ratio={1 / 1}>
            <Paper>
              <Image
                alt="Foto"
                src={RouterPortofolio.api_logo_porto + `${dataPorto?.logoId}`}
              />
            </Paper>
          </AspectRatio>
        </Paper>
        <Paper p={"sm"} withBorder shadow="lg">
          <Title order={6}>Media Sosial Bisnis</Title>

          <Stack p={"sm"}>
            <Grid>
              <Grid.Col span={2}>
                <IconBrandFacebook />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                {dataPorto?.Portofolio_MediaSosial.facebook ? (
                  <Text>{dataPorto?.Portofolio_MediaSosial.facebook}</Text>
                ) : (
                  "-"
                )}
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={2}>
                <IconBrandInstagram />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                {dataPorto?.Portofolio_MediaSosial.instagram ? (
                  <Text>{dataPorto?.Portofolio_MediaSosial.instagram}</Text>
                ) : (
                  "-"
                )}
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={2}>
                <IconBrandTiktok />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                {dataPorto?.Portofolio_MediaSosial.tiktok ? (
                  <Text>{dataPorto?.Portofolio_MediaSosial.tiktok}</Text>
                ) : (
                  "-"
                )}
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={2}>
                <IconBrandTwitter />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                {dataPorto?.Portofolio_MediaSosial.twitter ? (
                  <Text>{dataPorto?.Portofolio_MediaSosial.twitter}</Text>
                ) : (
                  "-"
                )}
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={2}>
                <IconBrandYoutube />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                {dataPorto?.Portofolio_MediaSosial.youtube ? (
                  <Text>{dataPorto?.Portofolio_MediaSosial.youtube}</Text>
                ) : (
                  "-"
                )}
              </Grid.Col>
            </Grid>
          </Stack>
        </Paper>
        {userLoginId === dataPorto?.Profile?.User?.id ? (
          <Button
            radius={"xl"}
            bg={"red"}
            color="red"
            onClick={() => {
              open();
            }}
          >
            <IconTrash />
          </Button>
        ) : (
          ""
        )}
      </Stack>

      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Stack>
          <Title order={6}>Anda yakin menghapus portofolio ini ?</Title>
          <Group position="center">
            <Button radius={"xl"} onClick={() => close()}>
              Batal
            </Button>
            <Button
              radius={"xl"}
              color="red"
              loaderPosition="center"
              loading={loadingDel ? true : false}
              onClick={() => onDelete(router, dataPorto as any, setLoadingDel)}
            >
              Hapus
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}

async function onDelete(
  router: AppRouterInstance,
  dataPorto: MODEL_PORTOFOLIO,
  setLoadingDel: any
) {
  await Portofolio_funDeletePortofolioById(dataPorto).then((res) => {
    if (res.status === 200) {
      setLoadingDel(true);
      ComponentGlobal_NotifikasiBerhasil(res.message);
      router.back();
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
