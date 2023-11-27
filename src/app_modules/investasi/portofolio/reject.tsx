import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  Card,
  CardSection,
  AspectRatio,
  Box,
  Title,
  Divider,
  Group,
  Badge,
  Image,
  Text,
  Center,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import {
  MODEL_Investasi,
  MODEL_Status_investasi,
} from "../model/model_investasi";
import { useState } from "react";
import _ from "lodash";

export default function Reject({ data }: { data: MODEL_Investasi[] }) {
  const [investasi, setInvestasi] = useState(data);
  const router = useRouter();

  if (_.isEmpty(data))
    return (
      <>
        <Center h={"50vh"}>Tidak ada Reject</Center>
      </>
    );

  return (
    <>

      {investasi.map((e) => (
        <Card
          key={e.id}
          withBorder
          mb={40}
          bg={"gray.5"}
          onClick={() => router.push(RouterInvestasi.detail_reject + `${e.id}`)}
        >
          <CardSection p={"xs"}>
            <AspectRatio ratio={16 / 9}>
              <Image
                alt=""
                src={RouterInvestasi.api_gambar + `${e.imagesId}`}
              />
            </AspectRatio>
          </CardSection>

          <CardSection p={"lg"}>
            <Box>
              <Title order={4}>{e.title}</Title>
            </Box>
          </CardSection>
          <Divider />
          <CardSection p={"md"}>
            <Group position="center">
              <Badge color="red" variant="dot">
                Reject
              </Badge>
            </Group>
          </CardSection>
        </Card>
      ))}
    </>
  );
}
