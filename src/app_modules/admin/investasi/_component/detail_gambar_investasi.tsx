import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";
import { Paper, Stack, Title, AspectRatio, Center, Image } from "@mantine/core";

export function ComponentAdminInvestasi_DetailGambar({imagesId}: {imagesId: any}) {
    return (
      <>
        <Paper withBorder p={"lg"}>
          <Stack>
            <Title align="center" order={3}>
              Gambar Proyek
            </Title>

            <AspectRatio ratio={1 / 1} mah={300}>
              <Center>
                <Image
                  style={{ borderRadius: "10px" }}
                  radius={"md"}
                  width={200}
                  alt=""
                  src={RouterInvestasi_OLD.api_gambar + `${imagesId}`}
                />
              </Center>
            </AspectRatio>
          </Stack>
        </Paper>
      </>
    );
}