"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  Group,
  Loader,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconChevronRight, IconSearch } from "@tabler/icons-react";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { userSearch_getAllUser } from "../fun/get/get_all_user";
import { ComponentGlobal_LoaderAvatar } from "@/app_modules/_global/component";

export function UserSearch_UiView({ listUser }: { listUser: MODEL_USER[] }) {
  const [data, setData] = useState(listUser);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setIsSearch] = useState("");

  async function onSearch(name: string) {
    setIsSearch(name);
    const loadData = await userSearch_getAllUser({
      page: activePage,
      search: name,
    });
    setData(loadData as any);
    setActivePage(1);
  }

  return (
    <>
      <Stack spacing={"xl"}>
        <TextInput
          radius={"xl"}
          style={{ zIndex: 99 }}
          icon={<IconSearch size={20} />}
          placeholder="Masukan username "
          onChange={(val) => onSearch(val.target.value)}
        />
        <Box>
          {_.isEmpty(data) ? (
            <ComponentGlobal_IsEmptyData text="Username tidak ditemukan" />
          ) : (
            <ScrollOnly
              height="84vh"
              renderLoading={() => (
                <Center mt={"lg"}>
                  <Loader color={"yellow"} />
                </Center>
              )}
              data={data}
              setData={setData}
              moreData={async () => {
                const loadData = await userSearch_getAllUser({
                  page: activePage + 1,
                  search: isSearch,
                });
                setActivePage((val) => val + 1);

                return loadData;
              }}
            >
              {(item) => <CardView data={item} />}
            </ScrollOnly>
          )}
        </Box>
      </Stack>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
}

function CardView({ data }: { data: MODEL_USER }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Stack
        spacing={"xs"}
        c="white"
        py={"xs"}
        onClick={() => {
          setLoading(true);
          router.push(RouterProfile.katalogOLD + `${data?.Profile?.id}`);
        }}
      >
        <Group position="apart">
          <Group position="left">
            <ComponentGlobal_LoaderAvatar
              fileId={data.Profile.imageId as any}
              imageSize="100"
            />

            <Stack spacing={0}>
              <Text fw={"bold"} lineClamp={1}>
                {data?.username}
              </Text>
              <Text fz={"sm"} fs={"italic"}>
                +{data?.nomor}
              </Text>
            </Stack>
          </Group>

          <Group position="right">
            <Center>
              <ActionIcon variant="transparent">
                {loading ? (
                  <ComponentGlobal_Loader />
                ) : (
                  <IconChevronRight color="white" />
                )}
              </ActionIcon>
            </Center>
          </Group>
        </Group>
      </Stack>
    </>
  );
}
