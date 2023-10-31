"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  ActionIcon,
  AspectRatio,
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

export default function ListEditBeritaInvestasi({ id }: { id: string }) {
  const router = useRouter();
  return (
    <>
      <Paper w={"100%"} bg={"gray"} p={"sm"}>
        <Stack spacing={"xs"}>
          <Group position="apart">
            <Title order={6}>Judul berita</Title>
            <Menu position="left">
              <Menu.Target>
                <ActionIcon variant="transparent">
                  <IconDots color="black" />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() =>
                    router.push(RouterInvestasi.edit_berita + `${id}`)
                  }
                >
                  Edit
                </Menu.Item>
                <Menu.Item onClick={() => toast("Berita terhapus")}>
                  Hapus
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          <Grid pt={5}>
            <Grid.Col span={8}>
              <Spoiler
                fz={"xs"}
                maxHeight={50}
                showLabel="Selengkapnya"
                hideLabel="Sembunyikan"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                quaerat nulla autem rem rerum modi, saepe blanditiis delectus
                illum sunt repudiandae inventore alias voluptas at! Nisi odio
                eaque explicabo laudantium.
              </Spoiler>
            </Grid.Col>
            <Grid.Col span={4}>
              <AspectRatio ratio={16 / 9} h={50} w={100}>
                <Image alt="" src={"/aset/no-img.png"} />
              </AspectRatio>
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>
    </>
  );
}
