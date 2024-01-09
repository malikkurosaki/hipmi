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
import { MODEL_DONASI_KABAR } from "../../model/interface";
import { useState } from "react";

export default function UpdateKabarDonasi({
  dataKabar,
}: {
  dataKabar: MODEL_DONASI_KABAR;
}) {
  const [kabar, setKabar] = useState(dataKabar);
  return (
    <>
      <Stack>
        {/* <Group>
          <Avatar variant="filled" radius={"xl"} />
          <Stack spacing={0}>
            <Text>Username</Text>
          </Stack>
        </Group> */}
        <Stack>
          <Text fz={"xs"}>{moment(Date.now()).format("ll")}</Text>
          <Title order={5}>{kabar.title}</Title>
          <AspectRatio ratio={16 / 9}>
            <Paper radius={"md"}>
              <Image
                alt="Foro"
                src={RouterDonasi.api_gambar_kabar + `${kabar.imagesId}`}
              />
            </Paper>
          </AspectRatio>
          <Text>{kabar.deskripsi}</Text>
        </Stack>
      </Stack>
    </>
  );
}
