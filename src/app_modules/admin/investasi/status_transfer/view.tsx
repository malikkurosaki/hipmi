"use client";

import { Warna } from "@/app/lib/warna";
import {
  AspectRatio,
  Avatar,
  Button,
  Center,
  Group,
  Image,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useRouter } from "next/navigation";

export default function Admin_StatusTransferInvesatasi() {
  const router = useRouter();
  return (
    <>
      <Stack>
        <Group>
          <Avatar variant="outline" radius={50} />
          <Text>Username</Text>
        </Group>

        <Select
          label="Status investor"
          data={[
            { value: "1", label: "Sudah Transfer" },
            { value: "2", label: "Menunggu Transfer" },
          ]}
        />

        <Center>
          <AspectRatio ratio={1 / 1} bg={"blue"} h={400} w={250}>
            <Image alt="" height={400} w={200} src={"/aset/no-img.png"} />
          </AspectRatio>
        </Center>

        <Center mt={"lg"}>
          <Button
            w={300}
            radius={50}
            bg={Warna.biru}
            color="blue"
            onClick={() => {
              router.back();
            }}
          >
            Simpan
          </Button>
        </Center>
      </Stack>
    </>
  );
}
