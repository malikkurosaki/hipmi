import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import {
  Paper,
  Stack,
  Title,
  Spoiler,
  Center,
  Button,
  Text,
} from "@mantine/core";
import { IconImageInPicture } from "@tabler/icons-react";
import moment from "moment";

import { MODEL_DONASI_PENCAIRAN_DANA } from "../../model/interface";
import { useRouter } from "next/navigation";

export function ComponentDonasi_CardPencairanDana({
  data,
}: {
  data: MODEL_DONASI_PENCAIRAN_DANA;
}) {
  const router = useRouter();

  return (
    <>
      <Paper
        style={{
          padding: "15px",
          border: `2px solid ${AccentColor.blue}`,
          backgroundColor: AccentColor.darkblue,
          borderRadius: "10px",
          color: "white",
        }}
      >
        <Text fz={"xs"}>{moment(data.createdAt).format("ll")}</Text>
        <Stack spacing={"lg"}>
          <Title order={5}>{data.title}</Title>
          <Spoiler
            maxHeight={50}
            hideLabel="Sembunyikan"
            showLabel="Baca Selengkapnya"
          >
            {data.deskripsi}
          </Spoiler>
          <Center>
            <Button
              radius={"xl"}
              leftIcon={<IconImageInPicture />}
              onClick={() => {
                // open();
                // setIdGambar(e.imagesId);
                router.push(RouterDonasi.bukti_transfer + data.imagesId, {
                  scroll: false,
                });
              }}
              bg={MainColor.yellow}
              color="yellow"
              c={"black"}
            >
              Bukti Transfer
            </Button>
          </Center>
        </Stack>
      </Paper>
    </>
  );
}
