"use client";

import { Box, Image, Stack, Text } from "@mantine/core";
import moment from "moment";

export default function CeritaPenggalangDonasi() {
  return (
    <>
      <Stack>
        {moment(Date.now()).format("ll")}

        <Text> Halo Orang-orang baik</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias eos
          expedita vitae unde tenetur, veritatis libero doloribus sunt
          temporibus, vel cum, quo odio asperiores quos. Suscipit facilis dolore
          optio quaerat?
        </Text>
        <Image alt="Foto" src={"/aset/no-img.png"}/>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias eos
          expedita vitae unde tenetur, veritatis libero doloribus sunt
          temporibus, vel cum, quo odio asperiores quos. Suscipit facilis dolore
          optio quaerat?
        </Text>
      </Stack>
    </>
  );
}
