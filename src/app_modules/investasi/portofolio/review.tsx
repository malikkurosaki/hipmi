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
  Center,
  Text,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import {
  MODEL_Status_investasi,
  MODEL_Investasi,
} from "../model/model_investasi";
import _ from "lodash";

export default function Review({ data }: { data: MODEL_Investasi[] }) {
  const router = useRouter();

  if (_.isEmpty(data))
    return (
      <>
        <Center h={"50vh"}>Tidak ada Review</Center>
      </>
    );
  return (
    <>
      {data.map((e) => (
        <Card
          key={e.id}
          withBorder
          mb={40}
          bg={"gray.5"}
          onClick={() => router.push(RouterInvestasi.detail_review + `${e.id}`)}
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
              <Badge color="yellow" variant="dot">
                Review
              </Badge>
            </Group>
          </CardSection>
        </Card>
      ))}
    </>
  );
}
