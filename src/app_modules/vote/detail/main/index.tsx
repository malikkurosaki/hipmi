"use client";

import {
  Card,
  Stack,
  Center,
  Title,
  Badge,
  Group,
  Radio,
  Grid,
  Text,
} from "@mantine/core";
import moment from "moment";
import ComponentVote_HasilVoting from "../../component/detail/hasil_voting";
import ComponentVote_DaftarVoter from "../../component/detail/daftar_voter";

export default function Vote_MainDetail() {
  return (
    <>
      <Stack>
        <TampilanDataVoting />
        <ComponentVote_HasilVoting />
        <ComponentVote_DaftarVoter />
      </Stack>
    </>
  );
}

function TampilanDataVoting() {
  const listVote = [
    {
      id: 1,
      value: "A",
      label: "A",
    },
    {
      id: 2,
      value: "B",
      label: "B",
    },
  ];
  return (
    <>
      <Card shadow="lg" withBorder p={30}>
        <Card.Section px={"xs"}>
          <Stack spacing={"lg"}>
            <Center>
              <Title order={5}>Judul voting</Title>
            </Center>
            <Text>
              Deskripsi: Lorem, ipsum dolor sit amet consectetur adipisicing
              elit. Mollitia possimus repellendus in, iste voluptatibus sit
              laborum voluptates aliquam nisi? Earum quas ea quaerat veniam
              porro, magni nulla consequuntur distinctio at.
            </Text>

            <Stack spacing={0}>
              <Center>
                <Text fz={10} fw={"bold"}>
                  Batas Voting
                </Text>
              </Center>
              <Badge>
                <Group>
                  <Text>
                    {new Date().toLocaleDateString(["id-ID"], {
                      dateStyle: "medium",
                    })}
                  </Text>
                  <Text>-</Text>
                  <Text>
                    {new Date(
                      moment(Date.now()).add(10, "days").calendar()
                    ).toLocaleDateString(["id-ID"], {
                      dateStyle: "medium",
                    })}
                  </Text>
                </Group>
              </Badge>
            </Stack>
          </Stack>
        </Card.Section>
        <Card.Section py={40}>
          <Stack>
            <Radio.Group>
              <Grid>
                {listVote.map((e) => (
                  <Grid.Col key={e.id} span={"auto"}>
                    <Center>
                      <Radio
                        value={e.value}
                        label={
                          <Text fw={"bold"}>{`Nama Voting ${e.label}`}</Text>
                        }
                      />
                    </Center>
                  </Grid.Col>
                ))}
              </Grid>
            </Radio.Group>
          </Stack>
        </Card.Section>
      </Card>
    </>
  );
}
