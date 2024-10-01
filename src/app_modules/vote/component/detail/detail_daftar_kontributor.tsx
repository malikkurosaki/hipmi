"use client";
import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import {
  Badge,
  Box,
  Center,
  Group,
  Stack,
  Text,
  Title
} from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { MODEL_VOTE_KONTRIBUTOR } from "../../model/interface";

export default function ComponentVote_DaftarKontributorVoter({
  listKontributor,
}: {
  listKontributor?: MODEL_VOTE_KONTRIBUTOR[];
}) {
  const router = useRouter();
  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack>
          <Center>
            <Title order={5}>Daftar Kontributor</Title>
          </Center>

          {_.isEmpty(listKontributor) ? (
            <ComponentGlobal_IsEmptyData
              height={20}
              text="Tidak ada kontributor"
            />
          ) : (
            <Stack>
              {listKontributor?.map((e, i) => (
                <Box key={e.id}>
                  <ComponentGlobal_AvatarAndUsername
                    profile={e.Author.Profile as any}
                    sizeAvatar={30}
                    component={
                      <Group position="right" align="center" h={"100%"}>
                        <Badge w={130}>
                          <Text
                            lineClamp={1}
                            fz={
                              e.Voting_DaftarNamaVote.value.length > 10 ? 8 : 10
                            }
                          >
                            {e.Voting_DaftarNamaVote.value}
                          </Text>
                        </Badge>
                      </Group>
                    }
                  />
                </Box>
              ))}
            </Stack>
          )}
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
