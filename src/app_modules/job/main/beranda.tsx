"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/component_global/author_name_on_header";
import ComponentGlobal_HeaderTamplate from "@/app_modules/component_global/header_tamplate";
import {
  ActionIcon,
  Affix,
  Card,
  Grid,
  Image,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Job_Beranda() {
  const router = useRouter();
  return (
    <>
      <Affix position={{ bottom: rem(100), right: rem(30) }}>
        <ActionIcon
          size={"xl"}
          radius={"xl"}
          variant="transparent"
          bg={"blue"}
          onClick={() => {
            router.push(RouterJob.create);
          }}
        >
          <IconCirclePlus color="white" size={40} />
        </ActionIcon>
      </Affix>

      <Stack>
        {Array(5)
          .fill(0)
          .map((e, i) => (
            <Card key={i} shadow="lg" withBorder p={30} radius={"md"}>
              <Card.Section>
                <ComponentGlobal_AuthorNameOnHeader />
              </Card.Section>
              <Card.Section onClick={() => router.push(RouterJob.main_detail)}>
                <Grid>
                  <Grid.Col span={6}>
                    <Image alt="foto" src={"/aset/no-file.png"} />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Stack justify="center" h={"100%"}>
                      <Text fw={"bold"} fz={20} truncate>
                        Judul Lowongan Kerja
                      </Text>
                      <Text lineClamp={3}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Laboriosam est id neque iste voluptatem
                        consequuntur veritatis dolorem illo et, repellat
                        praesentium maiores amet omnis voluptas aliquid tenetur
                        nam sint obcaecati.
                      </Text>
                    </Stack>
                  </Grid.Col>
                </Grid>
              </Card.Section>
            </Card>
          ))}
      </Stack>
    </>
  );
}
