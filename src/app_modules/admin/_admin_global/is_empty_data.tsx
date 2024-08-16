"use client";

import { Center, Text } from "@mantine/core";

export default function ComponentAdminGlobal_IsEmptyData({
  text,
  marginTop,
}: {
  text?: string;
  marginTop?: number;
}) {
  return (
    <>
      <Center h={"100%"} mt={marginTop ? marginTop : "xl"}>
        <Text c={"gray"} fw={"bold"}>{text ? text : "Tidak Ada Data"}</Text>
      </Center>
    </>
  );
}
