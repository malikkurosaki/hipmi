import {
  NEW_RouterInvestasi,
  RouterInvestasi_OLD,
} from "@/app/lib/router_hipmi/router_investasi";
import { AccentColor } from "@/app_modules/_global/color";
import { ActionIcon, Flex, Loader, Paper, Text } from "@mantine/core";
import { IconFileDescription } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Investasi_ComponentBoxDaftarBerita({
  investasiId,
}: {
  investasiId: string;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <Paper
        style={{
          padding: "15px",
          backgroundColor: AccentColor.blue,
          border: `2px solid ${AccentColor.softblue}`,
          borderRadius: "10px",
          color: "white",
        }}
        onClick={() => {
          setLoading(true);
          router.push(NEW_RouterInvestasi.daftar_berita({ id: investasiId }), {
            scroll: false,
          });
        }}
      >
        <Flex direction={"column"} align={"center"} justify={"center"}>
          <Text fz={12}>Berita </Text>
          <ActionIcon radius={"xl"} variant="transparent" size={60}>
            {isLoading ? (
              <Loader color="yellow" />
            ) : (
              <IconFileDescription size={70} color="white" />
            )}
          </ActionIcon>
        </Flex>
      </Paper>
    </>
  );
}