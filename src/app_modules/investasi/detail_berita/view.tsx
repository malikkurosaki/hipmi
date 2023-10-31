"use client";

import { AspectRatio, Image, Stack, Text, Title } from "@mantine/core";

export default function DetailBeritaInvestasi() {
  return (
    <>
      <Stack>
      <Title>Judul berita</Title>
      <AspectRatio ratio={16/9}>
        <Image src={"/aset/no-img.png"} alt=""/>
      </AspectRatio>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum eaque sint
        consequuntur consectetur ratione nostrum quasi aspernatur quae? Facere
        repudiandae illum laborum eum recusandae, id cumque in quaerat eveniet
        beatae.
      </Text>
      </Stack>
    </>
  );
}
