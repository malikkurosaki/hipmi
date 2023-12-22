"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  Paper,
  Stack,
  Group,
  Avatar,
  Title,
  Text,
  AspectRatio,
  Image,
  Divider,
} from "@mantine/core";
import moment from "moment";

export default function DetailKabarDonasi() {
  return (
    <>
      <Stack>
        <Group>
          <Avatar variant="filled" radius={"xl"} />
          <Stack spacing={0}>
            <Text>Username</Text>
            <Text fz={"xs"}>{moment(Date.now()).format("ll")}</Text>
          </Stack>
        </Group>
        <Stack>
          <Title order={5}>Judul Berita</Title>
         

          <Text>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam
            nostrum vitae eum facilis similique minus exercitationem assumenda,
            quidem dolores illum ducimus fuga rem molestias? Numquam id
            praesentium dolor qui amet.
          </Text>

          <AspectRatio ratio={16 / 9}>
            <Image alt="Foro" src={"/aset/no-img.png"} />
          </AspectRatio>
          <Text>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam
            nostrum vitae eum facilis similique minus exercitationem assumenda,
            quidem dolores illum ducimus fuga rem molestias? Numquam id
            praesentium dolor qui amet.
          </Text>
        </Stack>
      </Stack>
    </>
  );
}
