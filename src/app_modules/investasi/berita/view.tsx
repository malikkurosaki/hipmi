"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  AspectRatio,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";

export default function BeritaInvestasi({ id }: { id: string }) {
  const router = useRouter();
  return (
    <>
      <Paper
       
        w={"100%"}
        bg={"gray"}
        p={"sm"}
        onClick={() => router.push(RouterInvestasi.detail_berita + `${id}`)}
      >
       <Stack>
       <Group position="apart">
          <Title order={6}>Judul berita</Title>
          <Text fz={"xs"}>{moment(Date.now()).local().format("LL")}</Text>
        </Group>

        <Grid pt={5}>
          <Grid.Col span={8}>
            <Text fz={12}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit....
            </Text>
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
