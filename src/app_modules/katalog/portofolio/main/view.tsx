"use client";

import { Warna } from "@/app/lib/warna";
import { GET_ONE_PORTOFOLIO } from "@/app_modules/models/portofolio";
import { Box, Button, Center, Text, Title } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ViewPortofolio({
  dataPorto,
}: {
  dataPorto: GET_ONE_PORTOFOLIO;
}) {
  const router = useRouter();
  const [porto, setPorto] = useState(dataPorto);

  


  return (
    <>
      <Box>
        <Text>{porto.namaBisnis}</Text>
        <Text>{porto.alamatKantor}</Text>
        <Text>+{porto.tlpn}</Text>
        <Text>{porto.deskripssi}</Text>
        <Text>{porto.MasterBidangBisnis.name}</Text>
      </Box>
      <Center mt={"md"}>
        <Button bg={"red"} color="red" w={300}
        onClick={() => {

        }}
        >
          <IconTrash />
        </Button>{" "}
      </Center>
    </>
  );
}
