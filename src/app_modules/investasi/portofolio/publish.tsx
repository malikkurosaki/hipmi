import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  Card,
  CardSection,
  AspectRatio,
  Box,
  Title,
  Slider,
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
import _ from "lodash";
import moment from "moment";
import { useState } from "react";
import { IconCircleCheck } from "@tabler/icons-react";

export default function Publish({ data }: { data: MODEL_Investasi[] }) {
  const router = useRouter();
  const [sisaWaktu, setSisaWaktu] = useState();
  if (_.isEmpty(data))
    return (
      <>
        <Center h={"50vh"}>Tidak ada Publish</Center>
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
          onClick={() =>
            router.push(RouterInvestasi.detail_publish + `${e.id}`)
          }
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
            <Box mb={"md"}>
              <Title order={4}>{e.title}</Title>
              {/* <Slider
                size={10}
                disabled
                labelAlwaysOn
                value={60}
                marks={[{ value: 60, label: 60 + `%` }]}
              /> */}
            </Box>
          </CardSection>
          <Divider />
          <CardSection p={"md"}>
            {Number(e.MasterPencarianInvestor.name) -
              moment(new Date()).diff(new Date(e.updatedAt), "days") <=
            0 ? (
              <Group position="right">
                <IconCircleCheck color="green" />
                <Text c={"green"}>Selesai</Text>
              </Group>
            ) : (
              <Group position="apart">
                <Badge color="green" variant="dot">
                  Publish
                </Badge>
                <Text>
                  Sisa Waktu :{" "}
                  {Number(e.MasterPencarianInvestor.name) -
                    moment(new Date()).diff(new Date(e.updatedAt), "days")}{" "}
                  hari
                </Text>
              </Group>
            )}
          </CardSection>
        </Card>
      ))}
    </>
  );
}
